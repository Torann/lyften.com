---
title: Examples
template: documentation.twig::content_inner
chapter: 6
---
Create a media item named 'picture', with both thumbnail (100x100) and large (300x300) styles, using custom url and default_url configurations.

```php
public function __construct(array $attributes = [])
{
    $this->hasMediaFile('picture', [
        'styles' =>  [
            'thumbnail' => '100x100',
            'large' => '300x300'
        ],
        'url' => '/system/{media}/{style}/{filename}',
        'default_url' => '/{media}/{style}/missing.jpg'
    ]);

    parent::__construct($attributes);
}
```

Create a media item named 'picture', with both thumbnail (100x100) and large (300x300) styles, using custom url and default_url configurations, with the keep_old_files flag set to true (so that older file uploads aren't deleted from the file system) and image cropping turned on.

```php
public function __construct(array $attributes = [])
{
    $this->hasMediaFile('picture',  [
        'styles' =>  [
            'thumbnail' => '100x100#',
            'large' => '300x300#'
        ],
        'url' => '/system/{media}/{style}/{filename}',
        'default_url' => '/{media}/{style}/missing.jpg',
        'keep_old_files' => true
    ]);

    parent::__construct($attributes);
}
```

MeidaSort makes it easy to manage multiple file uploads as well.  In MeidaSort, media items (and the uploaded file objects they represent) are tied directly to database records.  Because of this, processing multiple file uploads is simply a matter of defining the correct Eloquent relationships between models.

As an example of how this works, let's assume that we have a system where users need to have multiple profile pictures (let's say 3).  Also, let's assume that users need to have the ability to upload all three of their photos from the user creation form. To do this, we'll need two tables (users and profile_pictures) and we'll need to set their relationships such that profile pictures belong to a user and a user has many profile pictures.  By doing this, uploaded images can be attached to the ProfilePicture model and instances of the User model can in turn access the uploaded files via their hasMany relationship to the ProfilePicture model.  Here's what this looks like:

In models/user.php:

```php
// A user has many profile pictures.
public function profilePictures(){
    return $this->hasMany('ProfilePicture');
}
```

In models/ProfilePicture.php:
```php
public function __construct(array $attributes = [])
{
    // Profile pictures have an attached file (we'll call it photo).
    $this->hasMediaFile('photo',  [
        'styles' =>  [
            'thumbnail' => '100x100#'
        ]
    ]);

    parent::__construct($attributes);
}

// A profile picture belongs to a user.
public function user(){
    return $this->belongsTo('User');
}
```

In the user create view:

```php
<form role="form" method="POST" action="/users" enctype="multipart/form-data">
	<input type="text" name="first_name">
	<input type="text" name="last_name">

	<input type="file" name="photos[]">
	<input type="file" name="photos[]">
	<input type="file" name="photos[]">

    <button type="submit">Create</button>
</form>
```

In controllers/UsersController.php
```php
public function store()
{
    // Create the new user
    $user = new User(Input::get());
    $user->save();

    // Loop through each of the uploaded files:
    // 1. Create a new ProfilePicture instance.
    // 2. Attach the file to the new instance (MeidaSort will process it once it's saved).
    // 3. Attach the ProfilePicture instance to the user and save it.
    foreach(Input::file('photos') as $photo)
    {
        $profilePicture = new ProfilePicture();             // (1)
        $profilePicture->photo = $photo;                    // (2)
        $user->profilePictures()->save($profilePicture);    // (3)
    }
}
```

Displaying uploaded files is also easy.  When working with a model instance, each media item can be accessed as a property on the model.  a media item object provides methods for seamlessly accessing the properties, paths, and urls of the underlying uploaded file object.  As an example, for a media item named 'photo', the path(), url(), createdAt(), contentType(), size(), and originalFilename() methods would be available on the model to which the file was attached.  Continuing our example from above, we can loop through a user's profile pictures display each of the uploaded files like this:

```html
// Display a resized thumbnail style image belonging to a user record:
<img src="{{ asset($profilePicture->photo->url('thumbnail')) }}">

// Display the original image style (unmodified image):
<img src="{{  asset($profilePicture->photo->url('original')) }}">

// This also displays the unmodified original image (unless the :default_style interpolation has been set to a different style):
<img src="{{  asset($profilePicture->photo->url()) }}">
```

We can also retrieve the file path, size, original filename, etc of an uploaded file:
```php
$profilePicture->photo->path('thumbnail');
$profilePicture->photo->size();
$profilePicture->photo->originalFilename();
```
