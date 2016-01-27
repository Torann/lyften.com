---
title: Authorization
template: documentation.twig::content_inner
chapter: 5
---
Out of the box your repositories can support Laravel's build in authorization checks when a **create**, **update**, or **delete** method is performed. You may specify a what is authorized by defining it in the `authorization` property on your repository:

``` php
<?php

namespace App\Repositories\Users;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UsersRepository extends AbstractRepository implements UsersInterface
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\User::class;
  
    /**
     * Array of actions that require authorization.
     *
     * @var array
     */
    protected $authorization = [
        'create',
        'update',
        'destroy',
    ];
}
```

When an authorization fails the method will return `false`. To get the error message bag simple call `getErrors()` on your repository.