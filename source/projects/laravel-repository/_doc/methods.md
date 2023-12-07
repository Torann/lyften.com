---
title: Methods
template: documentation.twig::content_inner
chapter: 2
---
The following methods are part of the `Torann\LaravelRepository\Contracts\Repository`.

### `public function boot(): void`

The boot method is called when a repository is instantiated. This method provides a convenient place to register global scopes or perform other setup tasks.

### `public function getModel(): Model`

Return model instance.

### `getNew(array $attributes = []): Model`

Get a new entity instance

**Arguments:**

- `$attributes` - The array of attributes to fill the new model instance.

### `public function newQuery(bool $skipOrdering = false): static`

Get a new query builder instance with the applied the order by and scopes.

**Arguments:**

- `$skipOrdering` - Skip the preset order by options.

### `find(mixed $id, $columns = ['*'])`

Find data by its primary key.

**Arguments:**

- `$id` - Entity's unique identifier.
- `$columns` - Columns to return.

### `findOrFail(mixed $id, array $columns = ['*']): Model|null`

Find a model by its primary key or throw an exception.

**Arguments:**

- `$id` - Entity's unique identifier.
- `$columns` - Columns to return.

### `findBy(string $field, mixed $value, array $columns = ['*'])`

Find data by field and value

**Arguments:**

- `$field` - Table column name.
- `$value` - Table column value to search.
- `$columns` - Columns to return.

### `findAllBy(string $attribute, mixed $value, array $columns = ['*'])`

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

### `orderBy(mixed $column, string|null $direction)`

Order results by. For setup and more complex uses, see the **[Ordering](/projects/laravel-repository/doc/ordering.html)** section.

**Arguments:**

- `$column` - The column name used for ordering.
- `$direction` - Must be **desc** or **asc**.

### `search(string|array|null $queries)`

Filter results by given query params. For setup and more complex uses, see the **[Searching](/projects/laravel-repository/doc/searching.html)** section.

**Arguments:**

- `$queries` - A single string term used to search or an array of params.

### `all(array $columns = ['*']): Collection`

Retrieve all data of repository

**Arguments:**

- `$columns` - Columns to return.

### `count(array $columns = ['*']): int`

Get an array with the values of a given column(s).

### `pluck(string $value, string $key = null): array`

Get an array with the values of a given column(s).

**Arguments:**

- `$value` - Columns value to retrieve.
- `$key` - Option third value to retrieve.

### `paginate(mixed $per_page = null, string|array $columns = ['*'], string $page_name = 'page', mixed $page = null)`

Retrieve all data of repository, paginated

**Arguments:**

- `$per_page` - When null it uses the system default.
- `$columns` - Columns to return.
- `$page_name` - Page name used for pagincation.
- `$page` - Current page.

### `simplePaginate($perPage = null, $columns = ['*'], $pageName = 'page', $page = null)`

Retrieve all data of repository, paginated using the `simplePaginate` method.

**Arguments:**

- `$per_page` - When null it uses the system default.
- `$columns` - Columns to return.
- `$page_name` - Page name used for pagincation.
- `$page` - Current page.

### `create(array $attributes): Model|bool`

Save a new entity in repository

**Arguments:**

- `$attributes` - The new entity's attributes.

### `update(Model $entity, array $attributes): Model|bool`

Update an entity with the given attributes and persist it

**Arguments:**

- `$entity` - The entity to update.
- `$attributes` - The attributes to update.

### `delete(mixed $entity): bool`

Delete an entity in repository

**Arguments:**

- `$entity` - The entity to delete.

### `makeModel(): model`

Create model instance.

### `getBuilder(bool $skipOrdering = false): Builder`

Get a new query builder instance with the applied order by and scopes.

### `toSql(): string`

Get the raw SQL statements for the request

### `getScopeQuery(): array`

Return query scope.

### `addScopeQuery(Closure|Scope $scope): static`

**Arguments:**

- `$scope` - A closure or instance of `Torann\LaravelRepository\Contracts\Scope`.

### `addJoin(string $alias, Closure $callback): string`

Perform a join if the alias is not already set.

**Arguments:**

- `$alias` - Join alias to use.
- `$callback` - Callback to actually perform the join.

Add query scope.

### `getMessageBag(): MessageBag`

Get the message bag instance.


### `addMessage(string $message, string $key = 'message'): static`

Add a message to the repository's message bag.

**Arguments:**

- `$message` - The message to add.
- `$key` - Message key.

### `hasMessage(string $key = 'message'): bool`

Determine of the repository has a message.

**Arguments:**

- `$key` - Message key.

### `getMessage(string $key = null, string $format = null, string $default = ''): string`

Get the first message matching the provided criteria.

**Arguments:**

- `$key` - Message key.
- `$format` - Message format.
- `$default` - Default message to return if the provided message criteria didn't return anything.

### `addError(string $message): static`

Add an error to the message bag.

**Arguments:**

- `$message` - Which message bag to return.


### `hasErrors(): bool`

Determine of the repository has any error messages.

### `getErrors(string $format = null): array`

Get all the repository's error messages.

**Arguments:**

- `$format` - Message format.
- 
### `getErrorMessage(string $default = ''): string`

Return the repository's first error message.

**Arguments:**

- `$format` - Message format.
