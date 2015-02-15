---
title: User Model
template: documentation.twig::content_inner
chapter: 2
---

To setup your User model to support roles, use must use the `HasRole` trait in your existing `User` model. For example:

~~~php
<?php namespace App;

use Torann\Promise\HasRole;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {
	
	use Authenticatable, CanResetPassword;

    use HasRole; // Add this trait to your user model
    
...
~~~
    
This will do the trick to enable the relation with `Role` and the following methods within your `User` model:

**roles()** 
Roles assigned to a user

**assignRole(:name)** 
Assign a role to a user

~~~php
$user->assignRole('manager');
~~~

**revokeRole(:name)** 
Revoke a role from the user

~~~php
$user->revokeRole('manager');
~~~

**hasRole(:name)** 
Determine if a user has a given role

~~~php
$user->hasRole('manager');
$user->hasRole('admin,manager,editor'); // Multiple roles
~~~

**can(:name)** 
Check if user has a permission by its name

~~~php
$user->can('edit_posts');
$user->can('edit_posts,edit_comments'); // Multiple permissions
~~~