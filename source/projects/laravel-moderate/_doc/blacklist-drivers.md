---
title: Blacklist Drivers
template: documentation.twig::content_inner
chapter: 3
---
By default blacklists are stored in the database

**Database (default)**

Which database table to used is specified in the config file under `blacklistTable`. By default all blacklist items are cached, to disable this update `cacheBlacklist` in the `app/config/packages/torann/moderate/` file.

```php
'driver' => '\\Torann\\Moderate\\Drivers\\Database',
```

### Custom Driver

Drivers are stored in the Moderate's config file `app/config/packages/torann/moderate/`. Simple update the `driver` value to your own custom driver class.


**Example driver**

```php
<?php namespace MyAppModeration\Drivers;

class FileSystem extends AbstractDriver {

    /**
     * @return array
     */
    public function getList()
    {
        return json_decode(file_get_contents('blacklist.json'), true);
    }

}
```

**In the config file**
```php
'driver' => '\\MyAppModeration\\Drivers\\FileSystem',
```