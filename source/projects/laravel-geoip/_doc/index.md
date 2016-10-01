---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---

## Installation

- [GeoIP for Laravel 5 on Packagist](https://packagist.org/packages/torann/geoip)
- [GeoIP for Laravel 5 on GitHub](https://github.com/Torann/laravel-geoip)
- [Laravel 5.0/Pre-5.5 PHP Installation](https://github.com/Torann/laravel-geoip/tree/0.2.2)
- [Laravel 4 Installation](https://github.com/Torann/laravel-geoip/tree/0.1.1)

### Composer

From the command line run:

```bash
$ composer require torann/geoip
```

### Laravel

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

```php
'providers' => [

    \Torann\GeoIP\GeoIPServiceProvider::class,

]
```

This package also comes with an optional facade, which provides an easy way to call the the class. Open up `config/app.php` and find the aliases key.

```php
'aliases' => [

    'GeoIP' => \Torann\GeoIP\Facades\GeoIP::class,

];
```

### Publish the configurations

Run this on the command line from the root of your project:

```bash
php artisan vendor:publish --provider="Torann\GeoIP\GeoIPServiceProvider" --tag=config
```

A configuration file will be publish to `config/geoip.php`.

## Service Configuration

To simplify and keep things clean, all third party composer packages, that are needed for a service, are installed separately.

For further configuration options checkout the [services](/projects/laravel-geoip/doc/services.html) page.
