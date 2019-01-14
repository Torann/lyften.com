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

For larger files that may timeout the server when trying to upload them we can use a queue. This was added for a project I did that allowed for multiple images to be uploaded at once, and some of those images needed further processing.

To handing this the MediaSort config needs to be set to allow for queuing. This can be done globally in the `mediasort.php` or on a per attachment passes. See `loading_url`, `queueable`, and `queue_path` options in the config file.

After creation send the media to queue:

```php
$media  = Media::create([
    'video' => Input::file('video')
]);

dispatch(
    new ProcessAttachments($media)
);
```

This is the what a basic job file would look like:
 
```php
<?php 

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Queue\ShouldQueue;

class ProcessAttachments implements ShouldQueue
{
    use Queueable;

    /**
     * @var Model
     */
    public $model;

    /**
     * Create a new job instance.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /** @var \Torann\MediaSort\Manager $attachment */
        foreach ($this->model->getQueuedAttachments() as $attachment) {
            $attachment->processQueue($this->model);
        }
    }
}
```
