---
title: Scopes
template: documentation.twig::content_inner
chapter: 4
---
Scopes are a way to change the criteria of the query by applying specific conditions according to your needs. You can add multiple Criteria in your repository.

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
     * Filter by author attribute
     *
     * @return self
     */
    public function scopeAuthorsOnly()
    {
        return $this->addScopeQuery(function($query) {
            return $query->where('is_author', '=', true);
        });
    }
}
```

### Using the Scope in a Controller

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

    /**
     * Create a new Controller instance.
     *
     * @param UsersInterface $repository
     */
    public function __construct(UsersInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of authors.
     *
     * @return Response
     */
    public function index()
    {
        $authors = $this->repository->authorsOnly()->all();

        return \Response::json($authors);
    }
}
```
