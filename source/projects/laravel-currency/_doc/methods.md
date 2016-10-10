---
title: Methods
template: documentation.twig::content_inner
chapter: 5
---

When the `currency()` helper function is used without arguments it will return the `\Torann\Currency\Currency` instance, and with this we can do all types of amazing things.

### `hasCurrency($code)`

Determine if given currency exists.

```php
currency()->hasCurrency('EUR');
```

### `isActive($code)`

Determine if the provided currency is active.

```php
currency()->isActive('EUR');
```

### `setUserCurrency($code)`

Set user's currency.

```php
currency()->setUserCurrency('EUR');
```

### `getUserCurrency()`

Return the user's currency code.

```php
currency()->getUserCurrency();
```

### `getCurrency($code = null)`

Return the current currency if the one supplied is not valid

```php
currency()->getCurrency();
```

### `getCurrencies()`

Return the all currencies.

```php
currency()->getCurrencies();
```

### `getActiveCurrencies()`

Return the all **active** currencies.

```php
currency()->getActiveCurrencies();
```

### `clearCache()`

Clear all cached currencies.

```php
currency()->clearCache();
```

### `config($key, $default = null)`

The `config` method gets the value of a configuration variable. The configuration values may be accessed using "dot" syntax. A default value may be specified and is returned if the configuration option does not exist:

```php
currency()->config('default');
```

## Managing Currencies

This can be helpful when manually managing currencies. The following methods access the default [storage driver](/projects/laravel-currency/doc/storage-drivers.html).

### `create(array $params)`

Create a currency using the default driver.

```php
currency()->create([
    'currency_name' => 'U.S. Dollar',
    'currency_code' => 'USD',
    'currency_symbol' => '$',
    'currency_format' => '$1,0.00',
    'exchange_rate' => 1.00000000,
    'active' => 1,
]);
```

### `find($code)`

Get the provided currency using the default driver.

```php
currency()->find('USD');
```

### `update($code, $value, DateTime $timestamp = null)`

Update the provided currency's value using the default driver

```php
currency()->update('USD', 1.22);
```

### `delete($code)`

Delete the provided currency using the default driver.

```php
currency()->delete('USD');
```

### `getDriver()`

This method returns the default storage driver instance used.

```php
currency()->getDriver();
```