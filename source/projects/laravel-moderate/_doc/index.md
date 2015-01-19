---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
## Installation

- [Moderate on Packagist](https://packagist.org/packages/torann/moderate)
- [Moderate on GitHub](https://github.com/torann/laravel-moderate)

To get the latest version of Moderate simply require it in your `composer.json` file.

~~~
"torann/moderate": "dev-master"
~~~

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Moderate is installed you need to register the service provider with the application. Open up `app/config/app.php` and find the `providers` key.

~~~php
'providers' => array(
    'Torann\Moderate\ModerateServiceProvider',
)
~~~

### Publish the config

Run this on the command line from the root of your project:

~~~
$ php artisan config:publish torann/moderate
~~~

This will publish Moderate's config to ``app/config/packages/torann/moderate/``.

### Migration

Now migrate the database tables for Moderate. Run this on the command line from the root of your project:

~~~
$ php artisan migrate --package=torann/moderate
~~~