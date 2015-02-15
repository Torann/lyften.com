---
title: Laravel 4 Installation
template: documentation.twig::content_inner
chapter: 4
---

## Installation

To get the latest version of Registry simply require it in your `composer.json` file.

~~~
"torann/registry": "0.1.*@dev"
~~~

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Registry is installed you need to register the service provider with the application. Open up `app/config/app.php` and find the `providers` key.

```php
'providers' => array(
    'Torann\Registry\RegistryServiceProvider',
)
```

Registry also ships with a facade which provides the static syntax for creating collections. You can register the facade in the aliases key of your `app/config/app.php` file.

```php
'aliases' => array(
    'Registry' => 'Torann\Registry\Facades\Registry',
)
```

### Publish the config

Run this on the command line from the root of your project:

~~~
$ php artisan config:publish torann/registry
~~~

This will publish Moderate's config to ``app/config/packages/torann/moderate/``.

### Migration

Run this on the command line from the root of your project:

~~~
$ php artisan migrate --package="torann/registry"
~~~