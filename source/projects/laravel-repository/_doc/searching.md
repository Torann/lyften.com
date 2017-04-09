---
title: Searching
template: documentation.twig::content_inner
chapter: 4
---
Searching is one of the most basic functions that is used on websites. Because of this Laravel Repository comes a simple yet powerful way of performing this.

### Repository Search Method

Within your repository sits a variable called **searchable**, it holds the table columns you wish to make searchable to the user. The reason for the array is for security reason, it restricts what is searchable by the user.

In the example bellow we are stating that we want the parameter *query* to search the table columns `name` and `email`.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UsersRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\User::class;

    /**
     * Valid searchable columns
     *
     * @return array
     */
    protected $searchable = [
        'query' => [
            'name',
            'email',
        ],
    ];
}
```

The set in the controller is very simple as you can see from here:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $this->repository
            ->search($request->get('query'))
            ->paginate();

        return view('users.index')->with([
            'users' => $users,
        ]);
    }
}
```

### More Complex Searching

For a more complex search, we added the columns `confirmed` and `user_role_id` to the searchable array.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UsersRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\User::class;

    /**
     * Valid searchable columns
     *
     * @return array
     */
    protected $searchable = [
        'confirmed',
        'role' => 'user_role_id',
        'query' => [
            'name',
            'email',
        ],
    ];
}
```

As you can see this is set as a key value pair. Where the _key_ is used to get the database query parameter from the array of parameters sent to the `search` method. And the _value_ is the name of the table column to perform the query on.

But a value is not always needed, in this case the key is also used as missing value. So in the example we are expecting the parameter from the user to be `role` and the corresponding table column name to be `user_role_id`. This is done to better hide the table columns from the user.

So let's see this in a controller:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $this->repository
            ->search($request->only('role', 'confirmed', 'query'))
            ->paginate();

        return view('users.index')->with([
            'users' => $users,
        ]);
    }
}
```

### Searching Joined Tables

The columns names can also include joined tables. To do this simple prefix the column with the table name.

For example let's say we have a table that is called `profiles` and it is joined using a [Global Scope](https://laravel.com/docs/master/eloquent#global-scopes). We are searching the user's name, we can also search their profile's slug for the same value.

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UsersRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    protected $model = \App\User::class;

    /**
     * Valid searchable columns
     *
     * @return array
     */
    protected $searchable = [
        'query' => [
            'name',
            'profiles.slug',
        ],
    ];
}
```
