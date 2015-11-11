---
title: Quick Start
template: documentation.twig::content_inner
chapter: 2
---
In the document root of your application (most likely the public folder), create a folder named system and 
grant your application write permissions to it.

In your model:

```php
use Torann\MediaSort\Eloquent\MediaSortInterface;
use Torann\MediaSort\Eloquent\HasMediaTrait;

class User extends Eloquent implements MediaSortInterface 
{
    use HasMediaTrait;

    /**
     * Create a new Eloquent model instance.
     */
    public function __construct(array $attributes = []) 
    {
        $this->hasMediaFile('avatar', [
            'styles' => [
                'large' => '450x450#',
                'thumb' => '50x50#'
            ]
        ]);
    
        parent::__construct($attributes);
    }
}
```

> Make sure that the `hasMediaFile()` method is called right before `parent::__construct()` of your model.

From the command line, use the migration generator:

```bash
php artisa media:fasten users avatar
php artisan migrate
```

In your new view:

```php
<form role="form" method="POST" action="/users/123" enctype="multipart/form-data">
	<input type="file" name="avatar">
    <button type="submit">Save</button>  
</form>
```
In your controller:

```php
/**
 * Store a newly created resource in storage.
 *
 * @param  \Illuminate\Http\Request  $request
 */
public function store(Request $request)
{
	// Create a new user, assigning the uploaded file field ('named avatar in the form')
    // to the 'avatar' property of the user model.   
    $user = User::create([
        'avatar' => $request->file('avatar')
    ]);	
}
```

In your show view:
```php
<img src="{{ $user->avatar->url() }}" >
<img src="{{ $user->avatar->url('medium') }}" >
<img src="{{ $user->avatar->url('thumb') }}" >
```

To detach (reset) a file, simply call the clear() method of the media item attribute before saving:

```php
$user->avatar->clear();
$user->save();
```

This will ensure the the corresponding media item fields in the database table record are cleared and the current file is removed from storage.  The database table record itself will not be destroyed and can be used normally (or even assigned a new file upload) as needed.