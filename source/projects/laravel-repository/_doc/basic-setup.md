---
title: Basic Setup
template: documentation.twig::content_inner
chapter: 3
---
The following example will be for a User repository using the default namespace for all repositories `\App\Repositories\`, this can be changed in the configuration file. 

Bellow is the naming scheme for a user repository located `\App\Repositories\Users`:

| Name            | Description                              |
| --------------- | ---------------------------------------- |
| UsersRepository | The main model repository                |
| UsersInterface  | Repository interface                     |
| CacheDecorator  | Cache decorator used for caching repository methods |

As you can see the repository and interface are prefixed with _User_, the name of the repository.

### Create a Model

Create your model normally, but it is important to define the attributes that can be filled from the input form data.

``` php
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

### Create Repository Interface

``` php
<?php

namespace App\Repositories\Users;

use Torann\LaravelRepository\Repositories\RepositoryInterface;

interface UsersInterface extends RepositoryInterface
{
    //
}
```

### Create a Repository

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
}
```

### Register the Repository

Using the provided `RepositoryFactory`, we can quickly instantiate our repository. The factory class uses the namespace provided in the configuration file to find the repository. The reason for the factory class is to help keep the repository service provider slim, especially when we get into cache decorators.

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
            return RepositoryFactory::create('Users');
        });
    }
}
```

### Use in a Controller

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

    ....
}
```

Find all results in Repository

``` php
$users = $this->repository->all();
```

Find all results in Repository with pagination

``` php
$users = $this->repository->paginate($limit = null, $columns = ['*']);
```

Find by result by id

``` php
$user = $this->repository->find($id);
```

Get a single row by a single column criteria.

``` php
$this->repository->findBy('name', $name);
```

Or you can get all rows by a single column criteria.

``` php
$this->repository->findAllBy('author_id', $author_id);
```

Or you can get all rows by a single column criteria and set of ids.

``` php
$this->repository->findAllBy('author_id', [1, 22, 45]);
```

Get all results by multiple fields

``` php
$this->repository->findWhere([
    'author_id' => $author_id,
    ['year', '>', $year]
]);
```

Create new entry in Repository

``` php
$user = $this->repository->create(Input::all());
```

Update entry in Repository

``` php
$user = $this->repository->find($id);
$user = $this->repository->update($user, $attributes);
```

Delete entry in Repository

``` php
$this->repository->delete($id)
```

Or delete entry in Repository by model object

``` php
$user = $this->repository->find($id);
$this->repository->delete($user)
```