---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---

## Installation

- [Laravel Repository on Packagist](https://packagist.org/packages/torann/laravel-repository)
- [Laravel Repository on GitHub](https://github.com/torann/laravel-repository)

### Composer

From the command line run:

```
$ composer require torann/laravel-repository
```

> **NOTE** The Service Provider and configuration file is not required for regular use. It is only required when using the [caching](#cache) feature.

### Laravel (optional)

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

```php
'providers' => [

    \Torann\LaravelRepository\RepositoryServiceProvider::class,

]
```

### Lumen (optional)

For Lumen register the service provider in `bootstrap/app.php`.

```php
$app->register(\Torann\LaravelRepository\RepositoryServiceProvider::class);
```

### Publish the configurations (optional)

Run this on the command line from the root of your project:

```
$ php artisan vendor:publish --provider="Torann\LaravelRepository\RepositoryServiceProvider" --tag=config
```

A configuration file will be publish to `config/repositories.php`.
