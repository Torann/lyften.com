---
template: blog.twig::content_inner
title: Polymorphic Comments
author: Daniel Stainback
image: /uploads/posts/polymorphic-comments.png
date: 2015-11-11 15:10
---
<!--excerpt-->
When going over the data model for commenting, you might consider managing each type of comment separately. This approach would however be repetitive because each comment model would most likely consist of the same data structure. At this point you might consider using a polymorphic relation. This would result in all comments being managed via a single model and thereby eliminating the need for multiple comment models.
<!--endexcerpt-->

In our example we will use polymorphic relations to add commenting capabilities to the `Post` and `Product` models.

## Comment Model

Let's being by creating a new comments database table and a model.

**Create migration:**

```bash
php artisan make:migration --create=comments create_comments_table\
```

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table)
        {
            $table->increments('id');
            $table->text('body');
			$table->integer('user_id')->unsigned();
            $table->integer('commentable_id')->unsigned();
            $table->string('commentable_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('comments');
    }
}
```

**Create the new model:**

```bash
php artisan make:model Comment
```

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * Return the user associated with this resource.
     *
     * @return array
     */
    public function author()
    {
        return $this->hasOne('\App\User', 'id', 'user_id');
    }

    /**
     * Get all of the owning commentable models.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function commentable() 
    {
        return $this->morphTo();
    }
}
```

## Commentable Trait

By using a trait we are able to add commenting to other models.
 
```php
<?php

namespace App\Traits;

use App\Comment;
use Illuminate\Database\Eloquent\Model;

trait CommentableTrait
{
    /**
     * Return all comments.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function comments()
    {
        return $this->morphMany('\App\Comment', 'commentable');
    }

    /**
     * Add comment a new comment.
     *
     * @param  string $body
     * @param  Model  $user
     * @return bool
     */
    public function addComment($body, Model $user)
    {
        $comment = new Comment;

        // Populate comment
        $comment->user_id = $user->id;
        $comment->body = $body;

        return $this->comments()->save($comment);
    }
}
```

Now we simple add the `CommentableTrait` to our models:

```php
<?php

namespace App;

use App\Traits\CommentableTrait;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use CommentableTrait;
}
```

```php
<?php

namespace App;

use App\Traits\CommentableTrait;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use CommentableTrait;
}
```

## Create a Comment

Now that we have included the `CommentableTrait` trait in our `Post` and `Product` models, we inherit access to the `addComment` helper method from the trait. With this we can simple create a comment on a post from a controller this way:

```php
/**
 * Store a newly created post comment in storage.
 *
 * @param  int $post_id
 * @param  \Illuminate\Http\Request $request
 */
public function store($post_id, Request $request)
{
    // Get post
    $post = Post::find($post_id);

    // Get comment attributes
    $body = $request->get('comment'); // Get comment provided by user
    $user = Auth::user();             // Get posting user

    // Create comment
    $post->addComment($body, $user);
}
```

## Getting Comments

The posts's comments are just a collection, so you can easily iterate over it. You’ll retrieve the list within the controller per usual:

```php
/**
 * Show given post.
 *
 * @param int $post_id
 */
public function show($post_id)
{
    // Get post
    $post = Post::find($post_id);

    return view('posts.show')->with('post', $post);
}
```

In the corresponding view you'll iterate over the comments collection:

```php
@foreach ($post->comments as $comment)
    <p>
        {{ $comment->body }}
    </p>
@endforeach
```