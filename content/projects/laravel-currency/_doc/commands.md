---
title: Artisan Commands
template: documentation.twig::content_inner
chapter: 3
---
The commands are meant to be ran as cron jobs. This way the rates are always up to date.

### Updating Exchange

By default exchange rates are updated from Finance Yahoo.com.

~~~
php artisan currency:update
~~~

To upate from OpenExchangeRates.org

~~~
php artisan currency:update --openexchangerates
~~~

 > Note: An API key is needed to use [OpenExchangeRates.org](http://OpenExchangeRates.org). Add yours to the config file.

### Cleanup

Used to clean the Laravel cached exchanged rates and refresh it from the database. Note that cached exchanged rates are cleared after they are updated using one of the command above.

~~~
php artisan currency:cleanup
~~~