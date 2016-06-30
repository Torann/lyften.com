---
title: Cache
template: documentation.twig::content_inner
chapter: 6
---
Add a layer of cache easily to your repository by using the a cache decorator.

### Cache Usage

> **Note**: Caching uses [Cache Tags](http://laravel.com/docs/5.1/cache#cache-tags), so caching is not supported when using the `file` or `database` cache drivers. This makes the Laravel Repository super scalable.

We will create a cache decorator for our repository `App\Repositories\Users\UsersRepository` from the [Basic Setup](basic-setup.html) section. **Note:** you must implement you `UsersInterface` on the decorator.

``` php
<?php

namespace App\Repositories\Users;

use Torann\LaravelRepository\Repositories\AbstractCacheDecorator;

class CacheDecorator extends AbstractCacheDecorator implements UsersInterface
{
    /**
     * Methods to skip when caching.
     *
     * @var array
     */
    protected $skipCache = [
        'find',
        'findBy',
        'findAllBy',
        'findWhere',
        'all',
        'lists',
        'paginate',
    ];
}
```

> **NOTE:** Caching for all methods by default are disabled. This is to ensure that things don't get out of hand. To enable simple remove all or some from the `$skipCache` array in your cache decorator class.

Before our repository is cached we must update the repository service provider so that it will use the `createWithCache` method:

``` php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Torann\LaravelRepository\RepositoryFactory;

class RepositoriesServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App\Repositories\Users\UsersInterface', function ($app) {
            return RepositoryFactory::createWithCache('Users');
        });
    }
}
```

Done, your repository will be cached and the repository cache is cleared whenever an item is created, modified or deleted.

``` php
<?php

namespace App\Http\Controllers;

use App\Repositories\Users\UsersInterface;

class UsersController extends Controller
{
    /**
     * @var UsersInterface
     */
    protected $repository;

    public function __construct(UsersInterface $repository)
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
        $users = $this->repository->all();

        return \Response::json($users);
    }
}
```

The repository cache is cleared whenever an item is created, modified or deleted.

### Cache Config

Enabling and disabling the cache globally can be done in the settings file `config/repositories.php`.

It is possible to override the default settings directly in the repository.

``` php
<?php

namespace App\Repositories\Users;

use Torann\LaravelRepository\Repositories\AbstractCacheDecorator;

class CacheDecorator extends AbstractCacheDecorator implements UsersInterface
{
    /**
     * Lifetime of the cache.
     *
     * @var int
     */
    protected $cacheMinutes = 30;

    ...
}
```

The cacheable methods are: `all`, `lists`, `paginate`, `find`, `findBy`, `findAllBy`, and `findWhere`.

### Caching Custom Methods

This is a quick example showing how to cache a custom repository method called `getRecent`

``` php
<?php

namespace App\Repositories\Users;

use Torann\LaravelRepository\Repositories\AbstractCacheDecorator;

class CacheDecorator extends AbstractCacheDecorator implements UsersInterface
{
    /**
     * Get recent users and cache array
     *
     * @param  int $limit
     *
     * @return null|\Illuminate\Support\Collection
     */
    public function getRecent($limit = 15)
    {
        return $this->getCache('getRecent', func_get_args(), function () use ($limit) {
            return $this->repo->getRecent($limit);
        });
    }
}
```
