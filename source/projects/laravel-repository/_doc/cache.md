---
title: Cache
template: documentation.twig::content_inner
chapter: 7
---
> **Note**: Caching uses [Cache Tags](http://laravel.com/docs/master/cache#cache-tags), so caching is not supported when using the `file` or `database` cache drivers. This makes the Laravel Repository super scalable.

Caching is meant more for custom repository methods. Standard `find`, `paginate`, `all` and so on do not use caching. The reason for this is that I believe caching should be for more complex queries, such as those that join multiple tables. For such a case we use the following code in our method:

```php
return $this->cacheCallback(__FUNCTION__, func_get_args(), function () use ($id, $columns) {
    $this->newQuery();

    return $this->query->find($id, $columns);
});
```

#### Example

This is just a simple example of how caching could work for you.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repository;

class UserRepository extends Repository
{
    /**
     * Find user by their email.
     *
     * @param mixed $id
     *
     * @return Model|null
     */
    public function findByEmail(mixed $email): Model|null
    {
        return $this->cacheCallback(__FUNCTION__, func_get_args(), function () use ($email) {
            $this->newQuery();

            return $this->query->join('user_emails', 'user_emails.user_id', '=', 'users.id')
                ->where('user_emails.email', $email)
                ->first();
        });
    }
}
```

And that's it! Now we just call

```php
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UsersController extends Controller
{
    protected UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of users.
     *
     * @return \Response
     */
    public function index()
    {
        $user = $this->repository->findByEmail('foo@bar.com');

        return \Response::json($user);
    }
}
```

#### Cache Config

Enabling and disabling the cache globally can be done in the configuration file `config/repositories.php`.

It is also possible to override the default configuration directly in the repository.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repository;

class UserRepository extends Repository
{
    /**
     * Lifetime of the cache.
     */
    protected int $cacheMinutes = 10;

    ...
}
```

#### Clearing the Cache

The repository cache can be automatically cleared whenever an item is created, modified or deleted. To do this you must set the `$eventFlushCache` value to `true` on in each repository that utilizes the caching method.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repository;

class UserRepository extends Repository
{
    /**
     * Flush the cache after create/update/delete events.
     */
    protected bool $eventFlushCache = true;

    ...
}
```

> This basically runs the `flushCache()` method on the repository after the item was created, modified or deleted.