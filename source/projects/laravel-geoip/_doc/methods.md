---
title: Methods
template: documentation.twig::content_inner
chapter: 4
---
When the `geoip()` helper function is used without arguments it will return the `\Torann\GeoIP\GeoIP` instance, and with this we can do all types of amazing things.

### `getLocation($ip = null)`

Get the location from the provided IP.

**Arguments:**

`$ip` - The Ip to look up. If not set the application default to the remote address.

```php
geoip()->getLocation('27.974.399.65');
```

### `getService()`

Will return the default service used for determining location.

### `getClientIP()`

Will return the user IP address.