---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
**Retrieve an item from the registry**

```php
Registry::get('foo'); \\will return null if key does not exists
Registry::get('foo.bar'); \\will return null if key does not exists

Registry::get('foo', 'undefined') \\will return undefined if key does not exists
```

**Store item into registry**

```php
Registry::set('foo', 'bar');
Registry::set('foo', array('bar' => 'foobar'));

Registry::get('foo'); \\bar
Registry::get('foo.bar'); \\foobar
```

**Remove item from registry**

```php
Registry::forget('foo');
Registry::forget('foo.bar');
```

**Flush registry**

```php
Registry::flush();
```

**Mass update**

```php
$settings = array(
    'site_name' => 'FooBar, Inc.', 
    'address'   => '11 Bean Street', 
    'email'     => 'foo@bar.com'
);

Registry::store($settings);
```