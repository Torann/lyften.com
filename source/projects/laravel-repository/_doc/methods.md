---
title: Methods
template: documentation.twig::content_inner
chapter: 2
---
The following methods are part of the `Torann\LaravelRepository\Contracts\RepositoryContract`.

### `getModel()`

Return model instance.

### `getNew(array $attributes = [])`

Get a new entity instance

**Arguments:**

- `$attributes` - The array of attributes to fill the new model instance.


### `newQuery()`

Get a new query builder instance

### `find($id, $columns = ['*'])`


Find data by its primary key.

**Arguments:**

- `$id` - Entity's unique identifier.
- `$columns` - Columns to return.

### `findOrFail($id)`

Find a model by its primary key or throw an exception.

**Arguments:**

- `$id` - Entity's unique identifier.

### `findBy($field, $value, $columns = ['*'])`

Find data by field and value

**Arguments:**

- `$field` - Table column name.
- `$value` - Table column value to search.
- `$columns` - Columns to return.

### `findAllBy($attribute, $value, $columns = ['*'])`

Find data by field

**Arguments:**

- `$attribute` - The attribute key to query.
- `$value` - A single value or an array of values.
- `$columns` - Columns to return.

### `findWhere(array $where, $columns = ['*'])`

Find data by multiple fields

**Arguments:**

- `$where` - An array of key value pairs.
- `$columns` - Columns to return.

### `orderBy($column, $direction)`

Order results by. For setup and more complex uses, see the **[Ordering](/projects/laravel-repository/doc/ordering.html)** section.

**Arguments:**

- `$column` - The column name used for ordering.
- `$direction` - Must be **desc** or **asc**.

### `search($queries)`

Filter results by given query params. For setup and more complex uses, see the **[Searching](/projects/laravel-repository/doc/searching.html)** section.

**Arguments:**

- `$queries` - A single string term used to search or an array of params.

### `all($columns = ['*'])`

Retrieve all data of repository

**Arguments:**

- `$columns` - Columns to return.

### `pluck($value, $key = null)`

Get an array with the values of a given column(s).

**Arguments:**

- `$value` - Columns value to retrieve.
- `$key` - Option third value to retrieve.

### `paginate($limit = null, $columns = ['*'])`

Retrieve all data of repository, paginated

**Arguments:**

- `$limit` - When null it uses the system default.
- `$columns` - Columns to return.

### `simplePaginate($limit = null, $columns = ['*'])`

Retrieve all data of repository, paginated using the `simplePaginate` method.

**Arguments:**

- `$limit` - When null it uses the system default.
- `$columns` - Columns to return.

### `create(array $attributes)`

Save a new entity in repository

**Arguments:**

- `$attributes` - The new entity's attributes.

### `update(Model $entity, array $attributes)`

Update an entity with the given attributes and persist it

**Arguments:**

- `$entity` - The entity to update.
- `$attributes` - The attributes to update.

### `delete($entity)`

Delete a entity in repository

**Arguments:**

- `$entity` - The entity to delete.

### `makeModel()`

Create model instance.

### `toSql()`

Get the raw SQL statements for the request

### `getScopeQuery()`

Return query scope.

### `addScopeQuery(Closure $scope)`

Add query scope.

### `addError($message)`

Add a message to the repository's error messages.

**Arguments:**

- `$message` - The message to add.

### `getErrors()`

Get the repository's error messages.

### `getErrorMessage($default = '')`

Get the repository's first error message.

**Arguments:**

- `$default` - Which message bag to return.