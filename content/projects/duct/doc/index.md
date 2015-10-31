title: Get Started
template: documentation
----

## Requirement

* PHP 5.4 or great.
* Laravel 4 or great.
* Linux, Unix or Mac OS X.

## Installation

- [Asset Duct on Packagist](https://packagist.org/packages/torann/duct)
- [Asset Duct on GitHub](https://github.com/torann/asset-duct)

To get the latest version of Asset Duct simply require it in your `composer.json` file.

~~~
"torann/duct": "0.1.*@dev"
~~~

You'll then need to run `composer install` to download it and have the autoloader updated.

Once Asset Duct is installed you need to register the service provider with the application. Open up `app/config/app.php` and find the `providers` key.

Then register the service provider

```php
'Torann\Duct\ServiceProvider'
```

> There is no need to add the Facade, the package will add it for you.

### Publish configuration file using artisan

```
$ php artisan config:publish torann/duct
```

### Add to .gitignore

The local assets directory needs to be added to the **.gitignore** file. This reflects the `asset_dir` variable in the config file.

```
public/assets/*
```