---
title: Artisan Commands
template: documentation.twig::content_inner
chapter: 3
---
### Updating Service Data

Some services may need to update local files. For example the [MaxMind Database service](https://github.com/Torann/laravel-geoip/blob/master/src/Services/MaxMindDatabase.php) fetches a remote database and saves it to the local file system.

```bash
php artisan geoip:update
```

### Clearing Cached Locations

Some cache drivers offer the ability to clear stored location.

```bash
php artisan geoip:clear
```

> **Note**: Cache clearing requires [Cache Tags](https://laravel.com/docs/cache#cache-tags), so is not supported when using the `file` or `database` cache drivers.
