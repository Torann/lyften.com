---
title: Usage
template: documentation.twig::content_inner
chapter: 3
---
## Example

The following example will be for a User repository using the default namespace for all repositories `\App\Repositories\`, this can be changed in the configuration file. 

### Create a Model

Create your model normally, but it is important to define the attributes that can be filled from the input form data.

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'title',
        'username',
        ...
     ];

     ...
}
```

### Create a Repository

```php
<?php

namespace App\Repositories;

use Torann\LaravelRepository\Repositories\AbstractRepository;

class UsersRepository extends AbstractRepository
{
    /**
     * Specify Model class name
     */
    protected string $model = \App\User::class;
}
```

### Use in a Controller

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

    ....
}
```

Find all results in Repository

```php
$users = $this->repository->all();
```

Find all results in Repository with pagination

```php
$users = $this->repository->paginate($limit = null, $columns = ['*']);
```

> **Tip** For more uses see the [Methods](/projects/laravel-repository/doc/methods.html) section.