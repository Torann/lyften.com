---
title: Basic usage
template: documentation.twig::content_inner
chapter: 2
---
The simplest way to use these method is though the helper function `asana()` or by using the facade. For the examples below we will use the helper method.

#### Get a specific user

```php
asana()->getUserInfo($user_id);
```

#### Get current user

Will return the user's info of the owner of the Personal Access Token.

```php
asana()->getCurrentUser();
```

#### Get all users in all workspaces

Will return the user's info of the owner of the Personal Access Token.

```php
asana()->getUsers();
```

#### Get task

```php
asana()->getTask($task_id);
```

#### Get a task's sub-tasks

```php
asana()->getSubTasks($task_id);
```

#### Creating a task

```php
asana()->createTask([
   'workspace' => '176825', // Workspace ID
   'name'      => 'Hello World!', // Name of task
   'assignee'  => 'foo@bar.com', // Assign task to...
   'followers' => ['3714136', '5900783'] // We add some followers to the task... (this time by ID)
]);
```

#### Delete a task

```php
asana()->deleteTask($task_id);
```

#### Add a task attachment

```php
asana()->addTaskAttachment($task_id, '/tmp/location/image.jpg');
asana()->addTaskAttachment($task_id, $request->file('image'));
```

#### Adding task to project

```php
asana()->addProjectToTask($task_id, $project_id);
```

#### Remove task from a project

```php
asana()->removeProjectToTask($task_id, $project_id);
```

#### Get task stories

```php
asana()->getTaskStories($task_id);
```

#### Commenting on a task

```php
asana()->commentOnTask($task_id, "Please please! Don't assign me this task!");
```

#### Add a tag to a task

```php
asana()->addTagToTask($task_id, $tag_id);
```

#### Remove a tag from a task

```php
asana()->removeTagFromTask($task_id, $tag_id);
```

#### Create a project

```php
asana()->createProject([
    "workspace" => "1768",
    "name"      => "Foo Project!",
    "notes"     => "This is a test project"
]);
```

#### Getting projects in all workspaces

```php
asana()->getProjects();
```

#### Get projects in a workspace

```php
$archived = false;

asana()->getProjectsInWorkspace($workspace_id, $archived);
```

#### Updating project info

```php
asana()->updateProject($project_id, [
    'name' => 'This is a new cool project!',
    'notes' => 'At first, it wasn't cool, but after this name change, it is!'
]);
```

#### Get project tasks

```php
asana()->getProjectTasks($project_id);
```

#### Get project stories

```php
asana()->getProjectStories($project_id);
```

#### Get a specific story

```php
asana()->getSingleStory($story_id);
```

#### Comment on a project

```php
$text = "Such fun!";

asana()->commentOnProject($project_id, $text)
```

#### Get a specific tag

```php
asana()->getTag($tag_id);
```

#### Get tags

```php
asana()->getTags();
```

#### Update tag

```php
// $data - array - An array containing fields to update, see Asana API if needed.

asana()->updateTag($tag_id, $data);
```

#### Get tasks with tag

```php
asana()->getTasksWithTag($tag_id);
```

#### Get workspaces

```php
asana()->getWorkspaces();
```

#### Update workspace

```php
$data = ['name' => ''];

asana()->updateWorkspace($workspace_i, $data);
```

#### Get workspace tasks

```php
// Assignee can either be 'me' or a user's ID

asana()->getWorkspaceTasks($workspace_id, $assignee);
```

#### Get workspace tags

```php
asana()->getWorkspaceTags($workspace_id);
```

#### Get workspace users

```php
asana()->getWorkspaceUsers($workspace_id);
```

#### Filtering

If you specify an assignee, you must also specify a workspace to filter on.

```php
asana()->getTasksByFilter([
    'assignee'  => 1121,
    'project'   => 37373729,
    'workspace' => 111221
]);
```