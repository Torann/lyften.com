---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
[![Latest Stable Version](https://poser.pugx.org/torann/currency/v/stable.png)](https://packagist.org/packages/torann/currency)
[![Total Downloads](https://poser.pugx.org/torann/currency/downloads.png)](https://packagist.org/packages/torann/currency)
[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/torann)
[![Donate weekly to this project using Gratipay](https://img.shields.io/badge/gratipay-donate-yellow.svg)](https://gratipay.com/~torann)
[![Donate to this project using Flattr](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/torann)
[![Donate to this project using Paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4CJA2A97NPYVU)

## Installation

- [Currency on Packagist](https://packagist.org/packages/torann/currency)
- [Currency on GitHub](https://github.com/torann/laravel-currency)

### Composer

From the command line run:

```bash
$ composer require torann/currency
```

### Laravel's >=5.5 Auto-Discovery

Simply install the package and let Laravel do its magic.

### Manual Setup

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

```php
'providers' => [

    \Torann\Currency\CurrencyServiceProvider::class,

]
```

This package also comes with a facade, which provides an easy way to call the the class. Open up `config/app.php` and find the `aliases` key.

```php
'aliases' => [

    'Currency' => \Torann\Currency\Facades\Currency::class,

];
```

### Publish the configurations

Run this on the command line from the root of your project:

```bash
php artisan vendor:publish --provider="Torann\Currency\CurrencyServiceProvider" --tag=config
```

A configuration file will be published to `config/currency.php`.

### Migration

If currencies are going to be stored in the database. Run migrate to setup the database table [see [Storage Drivers](/projects/laravel-currency/doc/storage-drivers.html)].

```bash
php artisan vendor:publish --provider="Torann\Currency\CurrencyServiceProvider" --tag=migrations
```

Run this on the command line from the root of your project to generate the table for storing currencies:

```bash
$ php artisan migrate
```

### Preset Currencies

The package comes with a set of preset currencies. To add them use the [artisan manage command](/projects/laravel-currency/doc/commands.html).

### Middleware

Once installed you need to append the middleware class within the Http kernel. This allows visitors to change the viewed currency using the query parameter `?currency=usd`.

Open up `app/Http/Kernel.php` and find the `$middleware` variable.

```php
protected $middleware = [

    \Torann\Currency\Middleware\CurrencyMiddleware::class,

]
```

> **Note:** The currency middleware uses the session to store the user selected currency, because of this the middleware will need to be added somewhere after `\Illuminate\Session\Middleware\StartSession::class`.
