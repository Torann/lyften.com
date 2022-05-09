---
title: Get Started
template: documentation.twig::content_inner
chapter: 2
---
## Upgrade to 2.0 from 1.5

### Updating Dependencies

**PHP 8.0.2 Required**

MediaSort now requires PHP 8.0.2 or greater.

**Composer Dependencies**

You should update the following dependencies in your application's composer.json file:

`torann/mediasort` to ^2.0

### Models

The `Torann\MediaSort\Eloquent` namespace was deprecated and will removed in version 2.5

- `Torann\MediaSort\Eloquent\HasMediaTrait` replace by `Torann\MediaSort\HasMedia`
- `Torann\MediaSort\Eloquent\MediaSortInterface` replace by `Torann\MediaSort\SupportsMedia`

### Disks

The `Torann\MediaSort\Disks\AbstractDisk` class was removed and in its place an interface is being used.

New interface `Torann\MediaSort\Contracts\Disk`.

Example:

```php
<?php

namespace App\MediaDisks;

use Torann\MediaSort\Contracts\Disk;

class Local implements Disk
{
    //
}
```

