---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
## Installation

From the command line run:

```bash
composer require torann/mediasort
```

### Laravel

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

``` php
'providers' => [

    \Torann\MediaSort\MediaSortServiceProvider::class,

]
```

### Lumen

For Lumen register the service provider in `bootstrap/app.php`.

``` php
$app->register(\Torann\MediaSort\MediaSortServiceProvider::class);
```

### Publish the configurations

Run this on the command line from the root of your project:

```bash
php artisan vendor:publish --provider="Torann\MediaSort\MediaSortServiceProvider"
```

A configuration file will be publish to `config/mediasort.php`.
