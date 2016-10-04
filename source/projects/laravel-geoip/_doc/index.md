---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---

[![Build Status](https://travis-ci.org/Torann/laravel-geoip.svg?branch=master)](https://travis-ci.org/Torann/laravel-geoip)
[![Latest Stable Version](https://poser.pugx.org/torann/geoip/v/stable.png)](https://packagist.org/packages/torann/geoip)
[![Total Downloads](https://poser.pugx.org/torann/geoip/downloads.png)](https://packagist.org/packages/torann/geoip)
[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/torann)
[![Donate weekly to this project using Gratipay](https://img.shields.io/badge/gratipay-donate-yellow.svg)](https://gratipay.com/~torann)
[![Donate to this project using Flattr](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/torann)
[![Donate to this project using Paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4CJA2A97NPYVU)

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

## Configuration

Quick breakdown of the two main options in the configuration file. To find out more simple open the `config/geoip.php` file.

### Service Configuration

To simplify and keep things clean, all third party composer packages, that are needed for a service, are installed separately.

For further configuration options checkout the [services](/projects/laravel-geoip/doc/services.html) page.

### Caching Configuration

GeoIP uses Laravel's default caching to store queried IP locations. This is done to reduce the number of calls made to the selected service, as some of them are rate limited.

**Options:**

- `all` all location are cached
- `some` cache only the requesting user
- `none` caching is completely disable
