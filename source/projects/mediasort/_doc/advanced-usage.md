---
title: Advanced Usage
template: documentation.twig::content_inner
chapter: 7
---
When working with media items, there may come a point where you wish to do things outside of the normal workflow.  For example, suppose you wish to clear out a media item (empty the media item fields in the underlying table record and remove the uploaded file from storage) without having to destroy the record itself.  In situations where you wish to clear the uploaded file from storage without saving the record, you can use the media's destroy method:

```php
// Remove all of the media's uploaded files and empty the media attributes on the model:

$profilePicture->photo->destroy();

// For finer grained control, you can remove thumbnail files only (media attributes in the model will not be emptied).
$profilePicture->photo->destroy(['thumbnail']);
```

You may also reprocess uploaded images on a media item by calling the reprocess() command (this is very useful for adding new styles to an existing media type where records have already been uploaded).

```php
// Programmatically reprocess a media's uploaded images:
$profilePicture->photo->reprocess();
```

This may also be achieved via a call to the `media:refresh` command.

Reprocess all media items for the ProfilePicture model:

```bash
php artisan media:refresh ProfilePicture
```

Reprocess only the photo media on the ProfilePicture model:

```bash
php artisan media:refresh TestPhoto --media="photo"
```

Reprocess a list of media items on the ProfilePicture model:

```bash
php artisan media:refresh TestPhoto --media="foo, bar, baz, etc"
```

### Queued Processing
For larger files that may timeout the server when trying to upload them we can use a queue. This was added for for a project I did that used chunk uploading for podcast files that needed to be stored on S3. Note below are just snippets, the chunk uploading part is not here.

Files in my queue are stored using a custom variable added to my `app.php` configuration file. This was helpful in keeping the location stored in one place and not scattered around my code. This path is needed for MediaSort to know where to look for the file that needs processing.

```
[
	/*
	|--------------------------------------------------------------------------
	| File Queue Path
	|--------------------------------------------------------------------------
	|
	| Used to temporarily store large files for queuing.
	|
	*/
	
    'queue_path' => public_path() . '/uploads/queue',

];
```

After creation send the media to queue:

```php
$media  = Media::create([
    'video' => Input::file('video')
]);

// Send to queue for processing
Queue::push('\MyApp\Workers\MediaProcessor', [
    'media_id' => $media->id
]);
```

This is the worker file. 
```php
<?php namespace MyApp\Workers;

class MediaProcessor {

    public function fire($job, $data)
    {
        // Remove Job
        $job->delete();

        // Find media
        $media = Media::find(array_get($data, 'media_id'));
        
        // Get queue path from config
        $queue_path = Config::get('app.queue_path');

        // Set as published
        $media->updateState('processing');

        // Process media
        foreach ($media->getMediaFiles() as $file)
        {
            $file->processQueue($media, $queue_path);
        }

        // Set as published
        $media->updateState('published');
    }
}
```

The `updateState` method on my Media model is used for the front-end. It displays what step in the progress the media item is in.

```php
    /**
     * Change media state
     *
     * @param  string $state
     * @return bool
     */
    public function updateState($state)
    {
        $this->state = $state;

        return $this->save();
    }
```
