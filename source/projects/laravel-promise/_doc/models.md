---
title: Models
template: documentation.twig::content_inner
chapter: 3
---
You add can Roles and Permissions like any other Model.

~~~php
$role = new Torann\Promise\Models\Role;
$permission = new Torann\Promise\Models\Permission;
~~~

Relationships are handled via the Eloquent ORM:

~~~php
$user->roles()->sync([:role_id, :role_id]);
$role->permissions()->sync([:permission_id, :permission_id]);
~~~