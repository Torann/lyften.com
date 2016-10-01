---
title: Artisan Commands
template: documentation.twig::content_inner
chapter: 3
---
### Updating Service Data

Some services may need to update local files. For example the [MaxMind Database service](https://github.com/Torann/laravel-geoip/tree/master/src/Services/MaxMindDataBase.php) fetches a remote database and saves it to the local file system.

```bash
php artisan geoip:update
```