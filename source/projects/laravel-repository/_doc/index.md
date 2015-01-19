---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---

## Installation

- [Laravel Repository on Packagist](https://packagist.org/packages/torann/laravel-repository)
- [Laravel Repository on GitHub](https://github.com/torann/laravel-repository)

To get the latest version of Laravel Repository simply require it in your `composer.json` file.

~~~
"torann/laravel-repository": "0.1.*@dev"
~~~

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Laravel Repository is installed you need to register the service provider with the application. Open up `app/config/app.php` and find the `providers` key.

Then register the service provider

```php
'Torann\LaravelRepository\ServiceProvider'
```

### Publish configuration file using artisan

```
$ php artisan config:publish torann/laravel-repository
```
