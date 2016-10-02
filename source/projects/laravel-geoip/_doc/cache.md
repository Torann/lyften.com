---
title: Cache Drivers
template: documentation.twig::content_inner
chapter: 6
---
Cache drivers are used to cache current user locations in an attempt to limit the number of calls made to a [service](/projects/laravel-geoip/doc/services.html).

> **Note:** The only time a user's location is stored is when a request is made use the `getLocation()` method without an argument.

### Sync (default)

This cache driver essential turns off caching.

```php
'cache' => 'sync',
```

### Laravel Application Cache

Selecting laravel cache will store the user's location in the default cache storage of your Laravel application. Using this option also gives you the option to set an expiration (default 30 minutes), along with the ability clear the cache using the [clear command](/projects/laravel-geoip/doc/commands.html).

```php
'cache' => 'laravel',
```

> **Note**: This caching option requires [Cache Tags](https://laravel.com/docs/cache#cache-tags), so caching is not supported when using the `file` or `database` cache drivers. This is done to better support cache flushing.

### Session

Using the session cache will store the user's location in their session.

```php
'cache' => 'session',
```

## Custom Cache

Services are stored in the GeoIP's config file `config/geoip.php`. Simply update the `service` with the name of your custom service and add it to the `services` specific configuration section with the `class` value as the custom classname.

**Example service**

```php
<?php

namespace App\GeoIP\Cache;

use SomeCacherService\FooBarCache;
use Torann\GeoIP\Cache\AbstractCache;

class FooBar extends AbstractCache
{
    /**
     * Cache instance.
     *
     * @var \SomeCacherService\FooBarCache
     */
    protected $cache;

    /**
     * The "booting" method of the service.
     *
     * @return void
     */
    public function boot()
    {
        $this->cache = new FooBarCache();
    }

    /**
     * {@inheritdoc}
     */
    public function get($name)
    {
        $value = $this->cache->get($name);

        return $this->hydrate($value);
    }

    /**
     * {@inheritdoc}
     */
    public function set($name, Location $location)
    {
        return $this->cache->set($name, $location->toArray());
    }

    /**
     * {@inheritdoc}
     */
    public function flush()
    {
        return $this->cache->flush();
    }
}
```

**In the config file**

```php
'cache' => 'foobar',

'cache_drivers' => [

    ...

    'foobar' => [
        'class' => \App\GeoIP\Cache\FooBar::class,
        'some_option'  => 'some_option_value',
    ],

],
```