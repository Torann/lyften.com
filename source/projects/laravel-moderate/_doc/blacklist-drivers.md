---
title: Blacklist Drivers
template: documentation.twig::content_inner
chapter: 3
---
By default blacklists are stored in a local file

### Local (default)

Which database table to used is specified in the config file in the **drivers** section under `local`.

```php
'driver' => \Torann\Moderate\Drivers\Local::class,
```

#### Multiple locales

To support multiple locales for the local driver, set `locales` to **true** it in the local driver specific configuration. For this to work your files will need to prefixed with the locale that system is using. For example the file for english will look like this `blacklist_en.txt`.

### Database

Which database table to used is specified in the config file in the **drivers** section under `database`.

```php
'driver' => \Torann\Moderate\Drivers\Database::class,
```

#### Multiple locales

To support multiple locales for the database driver,  set `locales` to **true** it in the database driver specific configuration. The database contains a column called `locale` which corresponds to the system locale. This is used to load the required blacklist data.

### Custom Driver

Drivers are stored in the Moderate's config file `config/moderate.php`. Simple update the `driver` value to your own custom driver class and add it to the `drivers` specific configuration section.

**Example driver**

```php
<?php

namespace App\Moderation\Drivers;

use Torann\Moderate\Drivers\AbstractDriver;

class FileSystem extends AbstractDriver
{
    /**
     * {@inheritdoc}
     */
    public function getList()
    {
        $path = $this->getConfig('path');

        return json_decode(file_get_contents($path), true);
    }

}
```

**In the config file**

```php
    'driver' => \App\Moderation\Drivers\FileSystem::class,

    'drivers' => [

        ...

        'filesystem' => [
            'path'    => base_path('blacklist.json'),
        ],

    ],
```