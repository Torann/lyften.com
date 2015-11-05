---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---

## Installation

To get the latest version of Registry simply require it in your `composer.json` file.

```js
"torann/registry": "0.2.*@dev"
```

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Registry is installed you need to register the service provider with the application. Open up `app/config/app.php` and find the `providers` key.

```php
'providers' => [
    'Torann\Registry\RegistryServiceProvider',
]
```

Registry also ships with a facade which provides the static syntax for creating collections. You can register the facade in the aliases key of your `app/config/app.php` file.

```php
'aliases' => [
    'Registry' => 'Torann\Registry\Facades\Registry',
]
```

### Publish the configurations and migration

Run this on the command line from the root of your project:

```bash
$ php artisan vendor:publish
```

A configuration file will be publish to `config/registry.php` and a migration file to `database/migrations/`