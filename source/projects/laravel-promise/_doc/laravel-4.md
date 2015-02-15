---
title: Laravel 4 Installation
template: documentation.twig::content_inner
chapter: 4
---
To get the latest version of Promise simply require it in your `composer.json` file.

~~~
"torann/promise": "dev-master"
~~~

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Promise is installed you need to register the service provider with the application. Open up `app/config/app.php` and find the `providers` key.

~~~php
'providers' => array(

    'Torann\Promise\PromiseServiceProvider',

)
~~~

### Publish the config

Run this on the command line from the root of your project:

~~~
$ php artisan config:publish torann/promise
~~~

This will publish Promise's config to ``app/config/packages/torann/promise/``.

### Migration

Now migrate the database tables for Promise. Run this on the command line from the root of your project:

~~~
$ php artisan migrate --package=torann/promise
~~~