---
title: Cache
template: documentation.twig::content_inner
chapter: 7
---
> **Note**: Caching uses [Cache Tags](http://laravel.com/docs/master/cache#cache-tags), so caching is not supported when using the `file` or `database` cache drivers. This makes the Laravel Repository super scalable.

Caching is meant more for custom repository methods. Standard `find`, `paginate`, `all` and so on do not use caching. The reason for this is that I believe caching should be for more complex queries, such as those that join multiple tables. For such a case we use the following code in our method:

```php
return $this->cacheCallback(__FUNCTION__, func_get_args(), function () use ($id, $columns) {
    return $this->query->find($id, $columns);
});
```

#### Example

This is just a simple example of how caching could work for you.

``` php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UserRepository extends AbstractRepository
{
    /**
     * Find user by thier email.
     *
     * @param mixed $id
     *
     * @return Model|Collection
     */
    public function findByEmail($email)
    {
        return $this->cacheCallback(__FUNCTION__, func_get_args(), function () use ($email) {
            return $this->query->join('user_emails', 'user_emails.user_id', '=', 'users.id')
                ->where('user_emails.email', $email)
                ->first();
        });
    }
}
```

And that's it! Now we just call

``` php
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UsersController extends Controller
{
    /**
     * @var UserRepository
     */
    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of users.
     *
     * @return Response
     */
    public function index()
    {
        $user = $this->repository->findByEmail('foo@bar.com');

        return \Response::json($user);
    }
}
```

The repository cache is cleared whenever an item is created, modified or deleted.

#### Cache Config

Enabling and disabling the cache globally can be done in the settings file `config/repositories.php`.

It is also possible to override the default settings directly in the repository.

``` php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UserRepository extends AbstractRepository
{
    /**
     * Lifetime of the cache.
     *
     * @var int
     */
    protected $cacheMinutes = 10;

    ...
}
```
