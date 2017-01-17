---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
[![Latest Stable Version](https://poser.pugx.org/torann/laravel-asana/v/stable.png)](https://packagist.org/packages/torann/laravel-asana)
[![Total Downloads](https://poser.pugx.org/torann/laravel-asana/downloads.png)](https://packagist.org/packages/torann/laravel-asana)
[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/torann)
[![Donate weekly to this project using Gratipay](https://img.shields.io/badge/gratipay-donate-yellow.svg)](https://gratipay.com/~torann)
[![Donate to this project using Flattr](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/torann)
[![Donate to this project using Paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4CJA2A97NPYVU)

## Installation

- [Laravel Asana on Packagist](https://packagist.org/packages/torann/laravel-asana)
- [Laravel Asana on GitHub](https://github.com/torann/laravel-asana)

### Composer

From the command line run:

```
$ composer require torann/laravel-asana
```

### Laravel

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

``` php
'providers' => [

    \Torann\LaravelAsana\ServiceProvider::class,

]
```

### Lumen

For Lumen register the service provider in `bootstrap/app.php`.

``` php
$app->register(\Torann\LaravelAsana\ServiceProvider::class);
```

### Facade

This package also ships with a facade (or you can simply is the `asana()` helper function). To register the facade, add it to the aliases array in your `config/app.php` file.

```php
'aliases' => [
    'Asana' => 'Torann\LaravelAsana\Facade\Asana',
]
```

### Publish the configurations

Run this on the command line from the root of your project:

```
$ php artisan vendor:publish --provider="Torann\LaravelAsana\ServiceProvider" --tag=config
```

A configuration file will be publish to `config/asana.php`.