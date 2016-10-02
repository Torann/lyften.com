---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
The simplest way to use these method is though the helper function `geoip()` or by using the facade `\Torann\GeoIP\Facades\GeoIP`. For the examples below we will use the helper method.

Get the location data for a website visitor:

```php
geoip($ip = null);
```

**Arguments:**

`$ip` - The Ip to look up. If not set the application default to the remote address.

### Example Location Object

```php
\Torann\GeoIP\Location {

    #attributes:array [
        'ip'           => '232.223.11.11',
        'iso_code'     => 'US',
        'country'      => 'United States',
        'city'         => 'New Haven',
        'state'        => 'CT',
        'state_name'   => 'Connecticut',
        'postal_code'  => '06510',
        'lat'          => 41.28,
        'lon'          => -72.88,
        'timezone'     => 'America/New_York',
        'continent'    => 'NA',
        'currency'     => 'USD',
        'default'      => false,
    ]
}
```

#### Default Location

In the case that a location is not found the fallback location will be returned with the `default` parameter set to `true`. To set your own default change it in the configurations `config/geoip.php`