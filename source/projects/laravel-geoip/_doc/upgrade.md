---
title: Upgrade
template: documentation.twig::content_inner
chapter: 6
---
## Upgrading to 1.1 from 1.0

### Updating Dependencies

Update your `composer.json` file to point to `torann/geoip 1.1.*`.

### Config

The `update_url` for the `maxmind_database` service has changed to support the new endpoint that requires authentication. Read [more about this change and how to get the required licence key on the MaxMind blog](https://blog.maxmind.com/2019/12/18/significant-changes-to-accessing-and-using-geolite2-databases/). Then update your configuration with the following URL, or reference the latest [geoip.php](https://github.com/Torann/laravel-geoip/blob/master/config/geoip.php).

```
'update_url' => sprintf('https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=%s&suffix=tar.gz', env('MAXMIND_LICENSE_KEY')),
```

Note that the `MAXMIND_LICENCE_KEY` environment variable name is shared with the `maxmind_api` service should you be using both.

## Upgrading To 1.0 From 0.2

### Updating Dependencies

Update your `composer.json` file to point to `torann/geoip 1.0.*`.

### Get location

The location return when using the `getLocation()` method now returns an array accessible `Torann\GeoIP\Location` object.

### Facade

The namespace for the facade has changed to `\Torann\GeoIP\Facades\GeoIP::class`. This was done to help clean up the package folder. Though you may want to consider using the helper function `geoip`. [See basic usage](/projects/laravel-geoip/doc/basic-usage.html)

### Config

The config file has completely changed [geoip.php](https://github.com/Torann/laravel-geoip/blob/master/config/geoip.php).

### Service Changes

To simplify and keep things clean, all third party composer packages, that are needed for a service, are installed separately.

If you are using the MaxMind service you must require the following composer package:

```bash
$ composer require geoip2/geoip2 ~2.1
```

### Environment Variable Changes

- `GEOIP_USER_ID` to `MAXMIND_USER_ID`
- `GEOIP_LICENSE_KEY` to `MAXMIND_LICENSE_KEY`
