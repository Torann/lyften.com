---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
## Installation

From the command line run:

```bash
composer require torann/localization-helpers
```

Once installed you need to register the service provider with the application. Open up `config/app.php` and find the `providers` key.

```php
'providers' => [

    \Torann\LocalizationHelpers\LocalizationHelpersServiceProvider::class,

]
```

### Publish the configurations

Run this on the command line from the root of your project:

```bash
artisan vendor:publish --provider="Torann\LocalizationHelpers\LocalizationHelpersServiceProvider"
```

#### Options

All of the configuration files are stored in `config/localization-helpers.php` file and are documented inline.