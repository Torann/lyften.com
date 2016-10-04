---
title: Upgrade
template: documentation.twig::content_inner
chapter: 6
---
## Upgrading To 1.0 From 0.2

### Updating Dependencies

Update your `composer.json` file to point to `torann/geoip 1.0.*`.

### Get location

The location return when using the `getLocation()` method now returns an array accessible `Torann\GeoIP\Location` object.

### Facade

The namespace for the facade has changed to `\Torann\GeoIP\Facades\GeoIP::class`. This was done to help clean up the package folder. Though you may want to consider using the helper function `geoip`. [See basic usage](/projects/laravel-geoip/doc/basic-usage.html)

### Config

The config file has completely changed [geoip.php](https://github.com/Torann/laravel-geoip/tree/master/src/config/geoip.php).

### Service Changes

To simplify and keep things clean, all third party composer packages, that are needed for a service, are installed separately.

If you are using the MaxMind service you must require the following composer package:

```bash
$ composer require geoip2/geoip2 ~2.1
```

### Environment Variable Changes

- `GEOIP_USER_ID` to `MAXMIND_USER_ID`
- `GEOIP_LICENSE_KEY` to `MAXMIND_LICENSE_KEY`