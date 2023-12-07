---
title: Scopes
template: documentation.twig::content_inner
chapter: 6
---
Scopes are a way to change the repository of the query by applying specific conditions according to your needs. You can add multiple scopes in your repository.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repository;

class UsersRepository extends Repository
{
    /**
     * Specify Model class name
     */
    protected string $model = \App\User::class;

    /**
     * Filter by author attribute
     *
     * @return static
     */
    public function scopeAuthorsOnly(): static
    {
        return $this->addScopeQuery(function($query) {
            return $query->where('is_author', '=', true);
        });
    }
}
```

### Using the Scope in a Controller

```php
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UsersController extends Controller
{
    protected UserRepository $repository;

    /**
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of authors.
     *
     * @return \Response
     */
    public function index()
    {
        $authors = $this->repository->authorsOnly()->all();

        return \Response::json($authors);
    }
}
```

## Global Scopes

To help extend searching and ordering we use global scope setup. Out of the box searching and ordering will be as explain in [Searching](/projects/laravel-repository/doc/searching.html) and [Ordering](/projects/laravel-repository/doc/ordering.html), but this logic can be switch out per repository based on your needs.

If you wish to use your own global scopes for all of your repositories without manually setting it on each repository; update the `scopes` configuration in `config/repositories.php`.

### Ordering Global Scope

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repository;
use App\Support\Repository\Scopes\OrderBy;

class UsersRepository extends Repository
{
    /**
     * Specify Model class name
     */
    protected string $model = \App\User::class;

    /**
     * {@inheritDoc}
     */
    public function boot(): void
    {
        parent::boot();

        $this->addGlobalScope('order_by', OrderBy::class);
    }
}
```

**NOTE:** Use `Torann\LaravelRepository\Scopes\OrderBy` as a reference for building your own scope. 

### Searching Global Scope

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repository;
use App\Support\Repository\Scopes\Search;

class UsersRepository extends Repository
{
    /**
     * Specify Model class name
     */
    protected string $model = \App\User::class;

    /**
     * {@inheritDoc}
     */
    public function boot(): void
    {
        parent::boot();

        $this->addGlobalScope('search', Search::class);
    }
}
```

**NOTE:** Use `Torann\LaravelRepository\Scopes\Search` as a reference for building your own scope.

### Helpful Methods

#### `addGlobalScopes(array $scopes): static`

Override both _Search_ and _Order By_.

```php
$this->addGlobalScopes([
    'order_by' => OrderBy::class,
    'search' => Search::class,
]);
```

#### `removeGlobalScope(...$names): static`

Remove custom global scope and go back to using the system default.

```php
$this->removeGlobalScope('order_by', 'search');
```

