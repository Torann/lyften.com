---
title: Ordering
template: documentation.twig::content_inner
chapter: 5
---
Ordering can be setup by using the `$orderable` variable in your repository. The `$orderable` variable contains the names of the table columns that are used for ordering.

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
     * Valid orderable columns.
     *
     * @return array
     */
    protected $orderable = [
        'name',
        'confirmed',
        'user_role_id',
        'created_at',
    ];
}
```

How this works in our controller:

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
            ->orderBy($request->get('sort'), $request->get('dir'))
            ->paginate();

        return view('users.index')->with([
            'users' => $users,
        ]);
    }
}
```

### Masking Table Columns

To hide the true name of the table column, we simple create a _key/value_ pair. Where the _key_ is the name of the parameter the user sees and the _value_ is the name of the table column.

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
     * Valid orderable columns.
     *
     * @return array
     */
    protected $orderable = [
        'name',
        'confirmed',
        'role' => 'user_role_id',
        'created_at',
    ];
}
```

Another benefit of doing this is that it allow us to sort by joined tables as well. Just simply prefix the column name with the table name.