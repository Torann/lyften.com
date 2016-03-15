---
title: Blacklist Drivers
template: documentation.twig::content_inner
chapter: 3
---
By default blacklists are stored in a local file. To support multiple locales, set the `support_locales` value to true in the config file.

### Local (default)

Which database table to used is specified in the config file in the **drivers** section under `local`.

```php
'driver' => 'local',
```

> **Multiple Locale Support**
>
> For this to work your files will need to prefixed with the locale that system is using. For example the file for english will look like this `blacklist_en.txt`.

### Database

Which database table to used is specified in the config file in the **drivers** section under `database`.

```php
'driver' => 'database',
```

> **Multiple Locale Support**
>
> The database contains a column called `locale` which corresponds to the system locale. This is used to load the required blacklist data.

### Custom Driver

Drivers are stored in the Moderate's config file `config/moderate.php`. Simple update the `driver` with the name of you custom driver and add it to the `drivers` specific configuration section with the `class` value as the custom classname.

**Example driver**

```php
<?php

namespace App\Moderation\Drivers;

use Torann\Moderate\Drivers\AbstractDriver;

class Filesystem extends AbstractDriver
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
    'driver' => 'filesystem',

    'drivers' => [

        ...

        'filesystem' => [
            'class' => \App\Moderation\Drivers\FileSystem::class,
            'path'  => base_path('blacklist.json'),
        ],

    ],
```