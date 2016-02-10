---
title: Methods
template: documentation.twig::content_inner
chapter: 2
---
The following methods are available:

### Torann\LaravelRepository\Repositories\RepositoryInterface

- getModel()
- find($id, $columns = ['*'])
- findBy($field, $value, $columns = ['*'])
- findAllBy($attribute, $value, $columns = ['*'])
- findWhere(array $where, $columns = ['*'])
- all($columns = ['*'])
- lists($value, $key = null)
- paginate($limit = null, $columns = ['*'])
- create(array $attributes)
- update(Model $entity, array $attributes)
- delete($entity)
- with(array $relations)
- toSql()
- getErrors()
- getErrorMessage($default = '')

### Torann\LaravelRepository\RepositoryFactory

- create($name)
- createWithCache($name, array $tags = [])

### Torann\LaravelRepository\Repositories\AbstractCacheDecorator

- getModel()
- find($id, $columns = ['*'])
- findBy($field, $value, $columns = ['*'])
- findAllBy($attribute, $value, $columns = ['*'])
- findWhere(array $where, $columns = ['*'])
- all($columns = ['*'])
- lists($value, $key = null)
- paginate($limit = null, $columns = ['*'])
- create(array $attributes)
- update(Model $entity, array $attributes)
- delete($entity)
- with(array $relations)
- toSql()
- getErrors()
- isSkippedCache()
- getCache($method, array $args = [], Closure $callback, $time = null)
