---
template: blog.twig::content_inner
title: User Settings Using Laravel 5 Eloquent Global Scopes
author: Daniel Stainback
image: /uploads/posts/user-settings-using-laravel-5-eloquent-global-scopes.png
date: 11/08/2015
---
<!--excerpt-->
While working with user settings, I noticed that when retrieving a user from the database it was performing two queries. So I decided to play with the Eloquent global scopes to see if I could cut the query down to just one and this is what happened.
<!--endexcerpt-->

Below is what our basic user model will look like before we create the global scope.

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['settings'];

    /**
     * Return user settings.
     *
     * @return array
     */
    public function settings()
    {
        return $this->hasOne(\App\UserSetting::class);
    }
}
```

## User's Settings Table

Just to give you an idea of what the user settings table looks like:

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_settings', function (Blueprint $table)
        {
            $table->increments('id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->boolean('profile_private')->default(false);
            $table->boolean('send_new_friend_email')->default(true);
            $table->boolean('send_email_newsletter')->default(true);

            // Foreign Keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_settings');
    }
}
```

## Global Settings Scope

Applying global scope requires just 2 simple steps:

- Create a class `SettingsScope` that implements `ScopeInterface`
- Boot that class in your Eloquent model calling `static::addGlobalScope(new SettingsScope)`

So basically you could just create the scope and then boot it in the model, which should use the scope. However this is not very clean, so instead let’s take a bit longer path (and this is how `SoftDeleting` is implemented in the Eloquent core):

- Create the scope
- Create a trait that will boot the scope and implement some handy methods
- Add single use `SettingsScope` line to the user model that will use the scope

So what does this do? It basically takes the values in `$setting_names` (column name => cast value) and creates a select array that is used by the query builder to populate the user model with the user's settings. While doing this, it also sets the cast for each settings value.

```php
<?php

namespace App\Support\Eloquent\Scopes\Users;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ScopeInterface;

class SettingsScope implements ScopeInterface
{
    /**
     * Array of active setting column names.
     *
     * @var array
     */
    private $setting_names = [
        'profile_private' => 'bool',
        'send_new_friend_email' => 'bool',
        'send_email_newsletter' => 'bool',
    ];

    /**
     * Apply scope on the query.
     *
     * @param \Illuminate\Database\Eloquent\Builder  $builder
     * @param \Illuminate\Database\Eloquent\Model  $model
     *
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        // Select columns
        $selects = [
            'users.*'
        ];

        // Create the select array from setting column names
        foreach ($this->setting_names as $setting=>$cast)
        {
            // Create name
            $name = $model->getSettingsKey($setting);

            // Add column to selects
            $selects[] = "user_settings.{$setting} as {$name}";

            // Add to casts
            $model->addCast($name, $cast);
        }

        // Join settings table
        $builder
            ->join('user_settings', 'users.id', '=', 'user_settings.user_id')
            ->select($selects);
    }

    /**
     * Remove scope from the query.
     *
     * @param \Illuminate\Database\Eloquent\Builder  $builder
     * @param \Illuminate\Database\Eloquent\Model  $model
     *
     * @return void
     */
    public function remove(Builder $builder, Model $model)
    {
        // ...
    }
}
```

## Settings Trait

The settings trait is used to boot the scope within the model and provides a few extra methods to help with getting of settings value.

```php
<?php

namespace App\Support\Eloquent\Scopes\Users;

trait SettingsTrait
{
    /**
     * Boot the scope.
     *
     * @return void
     */
    public static function bootSettingsTrait()
    {
        static::addGlobalScope(new SettingsScope);
    }

    /**
     * Add cast to model.
     *
     * @param string $name
     * @param string $type
     */
    public function addCast($name, $type)
    {
        $this->casts[$name] = $type;
    }

    /**
     * Return settings key.
     *
     * @param  string $name
     * @return mixed
     */
    public function getSettingsKey($name)
    {
        return "settings_{$name}";
    }

    /**
     * Check user setting
     *
     * @param  string $name
     * @param  mixed  $default
     * @return mixed
     */
    public function getSetting($name, $default = null)
    {
        $name = $this->getSettingsKey($name);

        // Get settings value
        if (array_key_exists($name, $this->attributes)) {
            return $this->getAttributeValue($name);
        }

        return $default;
    }
}
```

## Our New User Model

Apply the scope for the user model:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Support\Eloquent\Scopes\Users\SettingsTrait;

class User extends Model
{
    use SettingsTrait;

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [];

    /**
     * Return user settings.
     *
     * @return array
     */
    public function settings()
    {
        return $this->hasOne(\App\UserSetting::class);
    }
}
```

By using the `SettingsTrait` we no longer need to eager load the `settings` relation on every query, thereby cutting the retrieval of a user down to one query.

### Helpful Method

This trait provides the method `getSetting()` for retrieving setting values on the user model.

```php
$user = Auth::user();
$user->getSetting('profile_private', false);
```

**Arguments**:

- The settings key
- The default value returned if the key value is not found