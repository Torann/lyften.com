---
title: Services
template: documentation.twig::content_inner
chapter: 5
---
## Service Prerequisites

Before using the MaxMind driver, you will need to install the appropriate package via Composer:

 - MaxMind: `geoip2/geoip2 ~2.1`

### IP-API (default)

They offer a free and pro service [ip-api.com](http://ip-api.com)

```php
'service' => 'ipapi',
```

### MaxMind Database

The database location to used is specified in the config file in the **services** section under `maxmind_database`. Along with the URL of where to download the database from when running the `php artisan geoip:update`. **Note:** The `geoip:update` command will need to be ran before the package will work.

```php
'service' => 'maxmind_database',
```

> **Optimization Tip**: When using the database option I don't like having the downloaded database in my git repository, so I have my deploy system run the `geoip:update` during the build process before it's deployed to the servers.

### MaxMind API

Register for a license key and user ID at [www.maxmind.com](https://www.maxmind.com)

```php
'service' => 'maxmind_api',
```

### IPGEOLOCATION API

Register at [ipgeolocation.io/](https://ipgeolocation.io/signup) to get api key and add it into your env file as:
IPGEOLOCATION_KEY = YOUR_API_KEY


```php
'service' => 'ipgeolocation',
```

## Custom Service

Services are stored in the GeoIP's config file `config/geoip.php`. Simply update the `service` with the name of your custom service and add it to the `services` specific configuration section with the `class` value as the custom classname.

**Example service**

```php
<?php

namespace App\GeoIP\Services;

use Exception;
use Torann\GeoIP\Support\HttpClient;
use Torann\GeoIP\Services\AbstractService;

class FooBar extends AbstractService
{
    /**
     * Http client instance.
     *
     * @var HttpClient
     */
    protected $client;

    /**
     * The "booting" method of the service.
     *
     * @return void
     */
    public function boot()
    {
        $this->client = new HttpClient([
            'base_uri' => 'http://api.foobar-ip-to-location.com/',
            'query' => [
                'some_option' => $this->config('some_option'),
            ],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function locate($ip)
    {
        // Get data from client
        $data = $this->client->get('find', [
            'ip' => $ip,
        ]);

        // Verify server response
        if ($this->client->getErrors() !== null) {
            throw new Exception('Request failed (' . $this->client->getErrors() . ')');
        }

        // Parse body content
        $json = json_decode($data[0]);

        return [
            'ip' => $ip,
            'iso_code' => $json->iso_code,
            'country' => $json->country,
            'city' => $json->city,
            'state' => $json->state,
            'state_name' => $json->state_name,
            'postal_code' => $json->postal_code,
            'lat' => $json->lat,
            'lon' => $json->lon,
            'timezone' => $json->timezone,
            'continent' => $json->continent,
        ];
    }

    /**
     * Update function for service.
     *
     * @return string
     */
    public function update()
    {
        // Optional artisan command line update method
    }
}
```

**In the config file**

```php
'service' => 'foobar',

'services' => [

    ...

    'foobar' => [
        'class' => \App\GeoIP\Services\FooBar::class,
        'some_option'  => 'some_option_value',
    ],

],
```
