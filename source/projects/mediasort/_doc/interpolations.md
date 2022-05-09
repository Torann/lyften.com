---
title: Interpolations
template: documentation.twig::content_inner
chapter: 5
---
With MeidaSort, uploaded files are accessed by configuring/defining `path`, `url`, and `default_url` strings which point to you uploaded file assets. This is done via string interpolations.

## Global Interpolations

* **{media}** - The name of the file media as declared in the `hasMediaFile` function, e.g 'avatar'.
* **{class}**  - The classname of the model containing the file media item, e.g User. MeidaSort can handle namespacing of classes.
* **{basename}** - The basename portion of the media file, e.g 'file' for file.jpg.
* **{extension}** - The file extension type of the media file, e.g 'jpg' or 'png'
* **{filename}** - The name of the uploaded file, e.g 'some_file.jpg'
* **{id}** - The id of the corresponding database record for the uploaded file.
* **{style}** - The resizing style of the file (images only), e.g 'thumbnail' or 'original'.
* **{laravel_root}** - The path to the root of the laravel project.
* **{app_url}** - Base URL for the application.

## Model Attributes

The Interpolator can also interpolate model attributes.