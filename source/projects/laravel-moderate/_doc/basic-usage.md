---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
### Example Model

Use the `HasModerateTrait` trait in a existing model. For example:

```php
<?php

use Torann\Moderate\HasModerateTrait;

class Comment extends Eloquent
{
    use HasModerateTrait;

    /**
     * The attributes on the model which are moderated.
     *
     * @var array
     */
    private $moderate = [
        'title' => 'blacklist|links:2'
    ];
}
```

The table will need to have a column called `moderated`, this is set to true or false during creation.

```php
$table->boolean('moderated')->default(false);
```

### Moderated Resources

Checking to see if an resource is moderated is simple. The trait carries with it a simple method called `isModerated`, calling this will tell you if the resource has been moderated or not.

```php
if ($post->isModerated()) {
    // Something...
}
```