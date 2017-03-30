---
title: Formatting
template: documentation.twig::content_inner
chapter: 3
---
With the robust way formatting works, the currency symbol or any text can be placed at the beginning or end of the format.

Example format for USD:
```
$1,0.00
```

The first character `,` in the example above represents the thousands separator, the second one represents the decimals separator, digits after the second separator represent the number of decimals to show.

If a currency doesn't have a thousands separator, an exclamation mark (`!`) is used as an override.

For example, a value of `2030.52` with the format `$ 1!0.00` would output to `$ 2030.52`.

## Custom Formatters

The reason custom formatters were added is because not all PHP installations have [Internationalization Functions](http://php.net/manual/en/book.intl.php) installed or activated. Making the formatting custom gives the ability to pick what system we want to do the formatting.

Formatters are stored in the Currency's config file `config/currency.php`. Simply update the `formatter` with the name of your custom formatter and add it to the `formatters` specific configuration section with the `class` value as the custom classname.

**Example formatter**

```php
<?php

namespace App\Currency\Formatters;

use Torann\Currency\Contracts\FormatterInterface;

class FooBar implements FormatterInterface
{
    /**
     * Config options.
     *
     * @var array
     */
    protected $config;

    /**
     * Create a new instance.
     */
    public function __construct(array $config = [])
    {
        $this->config = $config;
    }

    /**
     * {@inheritdoc}
     */
    public function format($value, $code = null)
    {
        return $value . ($this->config['append_code'] === true ? $code : '');
    }
}
```

**In the config file**

```php

    'formatter' => 'foo_bar',

    'formatters' => [

        ...

        'foo_bar' => [
            'class' => \App\Currency\Formatters\FooBar::class,
            'append_code' => true,
        ],

    ],
```
