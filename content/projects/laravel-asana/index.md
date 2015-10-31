---
title: Laravel Asana
template: default.twig
images: /uploads/projects/laravel-asana
github: http://github.com/torann/laravel-asana
---
{% include 'project_header.twig' with {'intro': 'Asana API wrapper for Laravel, supporting workspaces, projects, tasks, tags, users and stories'} %}

<div class="wrapper">
    <h2>Why Laravel Asana?</h2>
    <p>Asana puts conversations & tasks together, so you can get more done with less ... Run your day, your team, and your company with Asana—from everywhere. With this simple package you will be able to bring this same tool into you Laravel application.</p>

    <h2>Installation</h2>

    <p>To get the latest version of Laravel Asana simply require it in your <code>composer.json</code> file.</p>

    <pre><code>"torann/laravel-asana": "0.1.*@dev"</code></pre>

    <p>You'll then need to run <code>composer install</code> to download it and have the autoloader updated.</p>

    <h3>Create configuration file using artisan</h3>

    <pre><code>$ php artisan config:publish torann/laravel-asana</code></pre>

    <p>Now add Asana in your providers array <code>app/config/app.php</code></p>

    <pre><code>'Torann\LaravelAsana\ServiceProvider'</code></pre>

    <h2>Quick Examples</h2>

    <h4>Creating a task</h4>

<pre><code>Asana::createTask(array(
    'workspace' => '176825', // Workspace ID
    'name'      => 'Hello World!', // Name of task
    'assignee'  => 'foo@bar.com', // Assign task to...
    'followers' => array('3714136', '5900783') // We add some followers to the task... (this time by ID)
));
</code></pre>

    <h4>Adding task to project</h4>

    <pre><code>Asana::addProjectToTask(:task_id, :project_id);</code></pre>

    <h4>Commenting on a task</h4>

    <pre><code>Asana::commentOnTask(:task_id, 'Please please! Don't assign me this task!');</code></pre>

    <h4>Getting projects in all workspaces</h4>

    <pre><code>Asana::getProjects();</code></pre>

    <h4>Updating project info</h4>

<pre><code>Asana::updateProject(:project_id, array(
    'name' => 'This is a new cool project!',
    'notes' => 'At first, it wasn't cool, but after this name change, it is!'
));</code></pre>

</div>