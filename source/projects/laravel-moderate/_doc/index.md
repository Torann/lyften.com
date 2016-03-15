---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
## Installation

From the command line run:

```bash
composer require torann/moderate
```

### Laravel

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

```php
'providers' => [

    Torann\Moderate\ModerateServiceProvider::class,

]
```

This package also comes with a facade, which provides an easy way to call the the class. Open up `config/app.php`` and find the aliases key.

```php
'aliases' => [

    'Moderate' => Torann\Moderate\Facades\Moderate::class,

];
```

### Publish the configurations

Run this on the command line from the root of your project:

```bash
php artisan vendor:publish --provider="Torann\Moderate\ModerateServiceProvider"
```

A configuration file will be publish to `config/moderate.php`.

### Migration

If blacklists are going to be stored in the database. Run migrate to setup the database table [see [Blacklist Drivers](/projects/laravel-moderate/doc/blacklist-drivers.html)]. Run this on the command line from the root of your project:

```bash
$ php artisan migrate --package=torann/moderate
```