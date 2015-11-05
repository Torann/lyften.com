---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---

## Installation

To get the latest version of Promise simply require it in your `composer.json` file.

~~~
"torann/promise": "0.2.*@dev"
~~~

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Promise is installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

~~~php
'providers' => [

    'Torann\Promise\PromiseServiceProvider',

]
~~~

### Publish the configurations and migration

Run this on the command line from the root of your project:

~~~
$ php artisan vendor:publish
~~~

A configuration file will be publish to `config/promise.php` and a migration file to `database/migrations/`
