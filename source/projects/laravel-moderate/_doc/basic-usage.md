---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
### Example Model

Use the `HasModerations` trait in a existing model. For example:

~~~php
<?php

use Torann\Moderate\HasModerations;

class Comment extends Eloquent {

    use HasModerations;

    /**
     * The attributes on the model which are moderated.
     *
     * @var array
     */
    private $moderations = array(
        'title' => 'blacklist|links:2'
    );
...
~~~

The table will need to have a column called `moderated`, this is set to true or false during creation.

~~~php
$table->boolean('moderated')->default(false);
~~~