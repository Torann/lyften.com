---
title: Configuration
template: documentation.twig::content_inner
chapter: 2
---
Ensure the configuration file is published using:

```bash
$ php artisan config:publish torann/duct
```

This will create the **app/config/packages/torann/duct/config.php** file.

### Paths

```php
'paths' => [
    'app/assets/javascripts',
    'app/assets/stylesheets',
    'provider/assets',
    'public/packages'
],
```

These are the directories we search for files in. You can think of this like PATH environment variable on your OS. We search for files in the path order listed above.

### LESS Import Directories

By default, Duct will look for @imports in the directory of the file passed. If @imports reside in different directories, this will tell Duct where to look.

```php
'less_import_dirs' => [
    'provider/assets'    => '/provider/',
    'public/packages'    => '/packages/',
],
```

### Asset File Extensions

This setting maps a file extensions to its mime type.

```php
'contentTypes' => [
    '.css'  => 'text/css',
    '.less' => 'text/css',
    '.js'   => 'application/javascript',
    '.jpeg' => 'image/jpeg',
    '.jpg'  => 'image/jpeg',
    '.png'  => 'image/png',
    '.gif'  => 'image/gif'
],
```

### Post Processors

Post processors are used to process assets before they're compiled. Each processor is mapped to one or more file extension (e.g. LESS to `.less`). Which processors are used on the asset and their order is determined by the asset's file extensions. For more info see [Custom Processors](custom-processors.html)

```php
'postprocessors' => [
    'text/css' => '\\Torann\\Duct\\Processors\\LessParser',
],
```

### Asset compressors

Matches a mime type to a compressor. For more info see [Custom Compressors](custom-compressors.html)


```php
'compressors' => [
    'text/css'                => '\\Torann\\Duct\\Compressor\\UglifyCss',
    'application/javascript'  => '\\Torann\\Duct\\Compressor\\UglifyJs'
],
```

### Local assets directory

Override default prefix folder for local assets. They are relative to your public folder.

```php
'asset_dir' => 'assets',
```

### Production Environment

The production environment is used to determine how the collection will be served. Use this to set the different production environments.


### Fingerprints

If enabled this will append a fingerprint to the static files when copied in production. And will require the asset to be called using the helper function `get_asset` (i.e. get_asset('/images/logo.png) )

### Static files

An array of destinations and sources of static files to publish to the public assets directory

```php
'static_files' => [
    'images' => [
        'app/assets/images'
    ],
],
```