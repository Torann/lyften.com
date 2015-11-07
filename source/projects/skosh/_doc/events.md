---
title: Extending
template: documentation.twig::content_inner
chapter: 7
---
Skosh's events provides a simple observer implementation, allowing you to listen for events in your application. Event classes are typically stored in the `app/Events` directory.

#### Registering Events

The `config/config.yml` included with your Skosh application provides a convenient place to register all event listeners. The `events` property contains an array of all events (keys) and their listeners (values). Of course, you may add as many events to this array as your application requires. For example, let's add our `BuilderBootedEvent` event:

```ymal
# Register custom events
events:
  builder.booted: ['\App\Events\BuilderBootedEvent']
```

#### Event Class

```php
<?php

namespace App\Events;

use Skosh\Builder;

class BuilderBootedEvent
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \Skosh\Builder  $builder
     * @return void
     */
    public function handle(Builder $builder)
    {
        //
    }
}
```

#### Supported Events

- `builder.booted` Called after builder in initialized. Arguments (Builder `$builder`)

- `pages.sorted` Called after builder sorts pages. Arguments (Builder `$builder`)

- `pages.rendered` Called after builder has generaed all of the pages. Arguments (Builder `$builder`)

- `copy.before` Called before builder copies the static files. Will return new array of files to copy. Arguments (Builder `$builder`, array `$to_copy`)
 
- `paginate.before` Called before the given content is paginated. Arguments (Builder `$builder`, `&$target`, `&$html`)
 
- `target.cleaned` Called after target directory is cleaned. Arguments (Builder `$builder`)

- `assets.built` Called just after a assets are built. Arguments ()
 
