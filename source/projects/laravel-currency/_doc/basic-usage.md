---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
The simplest way to use these method is though the helper function `currency()` or by using the facade. For the examples below we will use the helper method.

## Converting

This is a shortcut to the most commonly used `convert` method. Which converts the given amount into the provided currency.

```php
currency($amount, $from = null, $to = null, $format = true)
```

**Arguments:**

`$amount` - The float amount to convert
`$from` - The current currency code of the amount. If not set the application default will be used (see `config/currency.php` file).
`$to` - The currency code to convert the amount to. If not set the user set currency is used.
`$format` - Defines if the function is going to return the converted amount formatted or not.

**Usage:**

```php
echo currency(12.00);               // Will format the amount using the user selected currency
echo currency(12.00, 'USD', 'EUR'); // Will format the amount from the default currency to EUR
echo currency(12.00, 'USD', 'EUR', false); // Will format the amount from the default currency to EUR without applying any format to the result
```

## Formatting

Quickly parse a given amount into the proper currency format. This is a shortcut to the most commonly used `format` method.

```php
currency_format($amount, $code = null)
```

**Arguments:**

`$amount` - The float amount to convert
`$code` - The current currency code of the amount. If not set the application default will be used (see `config/currency.php` file).

**Usage:**

```php
echo currency_format(12.00);        // Will format the amount using the application default currency
echo currency_format(12.00, 'EUR'); // Will format the amount from the default currency to EUR
```
