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