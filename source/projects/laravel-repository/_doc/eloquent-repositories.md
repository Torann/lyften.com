---
title: Eloquent repositories
template: documentation.twig::content_inner
chapter: 5
---
To create an Eloquent repository we need to override the constructor and type-hint against our own model and validator and then call the parent's constructor.

```php
use Torann\LaravelRepository\EloquentRepository;

class MyRepository extends EloquentRepository
{
    public function __construct(MyModel $model, MyValidator $validator)
    {
        parent::__construct($model, $validator);
    }
}
```

Two additional hooks are available for eloquent repositories:

- beforeSave($model, array $attributes)
- afterSave($model, array $attributes)

These are called "inside" of the create/update actions. So the order of methods being called is as follows:

1. beforeCreate OR beforeUpdate
2. beforeSave
3. save() is called on the model
4. afterSave
5. afterCreate OR afterUpdate

## Examples

Automatically attach a relationship. `BelongsTo` relationships should be set in beforeCreate/beforeUpdate.

```php
public function beforeCreate($model, array $attributes)
{
    if (isset($this->user)) {
        $model->user()->associate($user);
    }
}
```

All other types in afterCreate/afterUpdate.

```php
public function afterCreate($model, array $attributes)
{
    if (isset($this->user)) {
        $model->users()->attach($user);
    }
}

public function afterSave($model, array $attributes) {
    if (isset($attributes['related'])) {
        $model->related()->sync($attributes['related']);
    }
}
```

Advanced queries

```php
public function getForUser(User $user)
{
    $query = $this->newQuery()
        ->join('users', 'users.id', '=', 'mytable.user_id')
        ->where('users.id', '=', $user->getKey());

    return $this->fetchMany($query);
}
```