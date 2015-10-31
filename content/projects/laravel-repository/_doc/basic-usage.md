---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
The repository classes come with some standard methods for common operations out of the box. First of all some terminology.

Methods starting with "find" is for fetching a single row in the database. Any method calling find will return an object representing a single row or null if it is not found.

Methods starting with "get" is for fetching multiple rows. It will always return an array or array-like object, which may or may not be empty.

### Query methods

- find($key)
- findByAttributes(array $attributes)
- getAll()
- getByAttributes(array $attributes)
- getManyIn($column, array $keys)
- getList($column = 'id', $key = null)

### Persistence methods

- create(array $attributes)
- update(object $entity, array $attributes)
- updateOrCreate($column, $params)
- delete(object $entity)
- deleteManyIn($column, array $keys)

### Other public methods

- getNew(array $attributes) - gets a new entity object
- getErrors()
- paginate($perPage = 15)

### Protected methods

- newQuery() - instantiate a new query builder
- fetchSingle($query) - fetch the first row from a query builder
- fetchMany($query) - fetch all the rows from a query builder
- fetchList($query, $column = 'id', $key = null) - perform a lists() call on a query builder

## Hooks

To make it easy to always apply the same operation to every query ran, the repository has various hooks you can use to modify queries being ran, preparing entities before they're inserted into the database and more. Define these methods on your repository class and they will be invoked automatically.

- beforeQuery($query, boolean $many)
- afterQuery($results)
- beforeCreate($model, array $attributes)
- afterCreate($model, array $attributes)
- beforeUpdate($model, array $attributes)
- afterUpdate($model, array $attributes)

## Validation

While it can be discussed whether validation in a repository is appropriate, often it is very handy, especially in smaller applications.

For each action done by the repository ("create" and "update" out of the box), the method `valid($action, array $attributes)` is called on the validator object. This is made to work with the built in validator.

## Examples

Make sure the repository only ever returns rows related to a specific user.

```
public function setUser($user)
{
    $this->user = $user;
}

protected function beforeQuery($query, $many)
{
    if (isset($this->user)) {
        $query->where('user_id', '=', $this->user->id);
    }
}
```

Add a custom method that fetches all rows related to a specific user.

```
public function getForUser($user)
{
    $query = $this->newQuery();
    $query->where('user_id', '=', $user->id);
    return $this->fetchMany($query);
}
```
