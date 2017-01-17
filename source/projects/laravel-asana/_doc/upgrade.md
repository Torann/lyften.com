---
title: Upgrade
template: documentation.twig::content_inner
chapter: 3
---
## Upgrading To 0.3 From 0.2

Asana stopped supporting API keys, so now we must use a Personal Access Token. See Asana's directions for generating a [personal access tokens](https://asana.com/guide/help/api/api#gl-access-tokens). Then update the `config/asana.php` config file with the new token:

```php
'accessToken' => env('ASANA_TOKEN'),
```