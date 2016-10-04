---
title: Upgrade
template: documentation.twig::content_inner
chapter: 7
---
## Upgrading To 1.0 From 0.3

There was a move to simplify the entire package, it was getting a little to crazy.

### Updating Dependencies

Update your `composer.json` file to point to `torann/currency 1.0.*`.

### Preset Currencies

The preset currencies that once shipped with the package inside of the migration file have been moved to an [artisan command](/projects/laravel-currency/doc/commands.html) where you can pick and choose which currencies to support. Where as the old method installed all of them.

See the [manage artisan command](/projects/laravel-currency/doc/commands.html) for more.

### Database Changes

The database columns names were changed see [/migrations/2013_11_26_161501_create_currency_table.php](https://github.com/Torann/laravel-currency/blob/master/src/migrations/2013_11_26_161501_create_currency_table.php)

**Changes:**

- `title` changed to `name`
- `symbol_left` removed
- `symbol_right` removed
- `code` changed to `code`
- `decimal_place` removed
- `value` changed to `exchange_rate`
- `decimal_point` removed
- `thousand_point` removed
- `status` changed to `active`

**Additions:**

- `symbol`: The currency symbol
- `format`: Contains formatting syntax for the currency

### Methods

Many of the methods have changed. Have a look over the [basic usage](/projects/laravel-currency/doc/basic-usage.html) and the [methods](/projects/laravel-currency/doc/methods.html) pages.

## Upgrading To 0.3 From 0.2

There was a move to middleware in v0.3 for handling user currency switching. Using the middleware, this fixes [Bug 33](https://github.com/Torann/laravel-currency/issues/33).

### Add Middleware

Append the middleware class to the `$middleware` variable within `app/Http/Kernel.php`.

```php
protected $middleware = [

    \Torann\Currency\Middleware\CurrencyMiddleware::class,

]
```