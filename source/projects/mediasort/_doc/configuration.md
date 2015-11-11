---
title: Configuration
template: documentation.twig::content_inner
chapter: 3
---
Configuration is available on both a per media item basis or globally through the configuration file settings.  MeidaSort is very flexible about how it processes configuration; global configuration options can be overwritten on a per media item basis so that you can easily cascade settings you would like to have on all media items while still having the freedom to customize an individual media item's configuration. To get started, the first thing you'll probably want to do is publish the default configuration options to your app/config directory. 

```bash
php artisan config:publish torann/mediasort
``` 
Having done this, you should now be able to configure MeidaSort however you see fit without fear of future updates overriding your configuration files. 

### MeidaSort-Configuration
The following configuration settings apply to MeidaSort in general.

* **url**: The url where files will be stored. It is composed of 'interpolations' that will be replaced their corresponding values during runtime. It's unique in that it functions as both a configuration option and an interpolation.
* **local_root**: Similar to the url, the path option is the location where your files will be stored at on disk.
* **prefix_url**: Prefix URL used when displaying a media item. This is helpful for cloud storage or a subdomain location. If left blank the URL will be the same as the requesting domain.
*   **image_processing**: The underlying image processing library being used.  Defaults to `\\Imagine\\Gd\\Imagine` but can also be set to `\\Imagine\\Imagick\\Imagine` or `\\Imagine\\Gmagick\\Imagine`.
*   **default_url**: The default file returned when no file upload is present for a record.
* **visibility**: Here you may configure the visibility of the newly uploaded file. This primarily pertains to cloud based file storage. Options are `public` or `private`.
* **styles**: An array of image sizes defined for the file attachment. MeidaSort will attempt to use to format the file upload into the defined style.
*   **keep_old_files**: Set this to true in order to prevent older file uploads from being deleted from the file system when a record is updated.
*   **preserve_files**: Set this to true in order to prevent a media item's file uploads from being deleted from the file system when an the media item object is destroyed (media item's are destroyed when their corresponding models are deleted/destroyed from the database).