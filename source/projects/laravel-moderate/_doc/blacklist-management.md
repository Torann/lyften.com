---
title: Blacklist Management
template: documentation.twig::content_inner
chapter: 4
---
Using the default Database Driver you can setup your model and controller like below.

### Model

Adding the BlacklistTrait will register the **saved** and **deleted** events that trigger cache flushing. This is only needed is caching is turned on.

~~~php
<?php

use Torann\Moderate\BlacklistTrait;

class Blacklist extends Eloquent {

    use BlacklistTrait;

    /**
     * @var string
     */
    protected $table = 'blacklists';

    /**
     * The attributes on the model which are mass-assignable.
     *
     * @var string
     */
    protected $fillable = ['title', 'element'];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::bootBlacklist();
    }
}
~~~

### Controller

~~~php
<?php

use Blacklist;

class BlacklistsController extends Eloquent {

    /**
     * Display a listing of the resource.
     *
     * @return View
     */
    public function index()
    {
        return View::make('admin/blacklists/index')->with([
            'blacklists' => Blacklist::paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return View
     */
    public function create()
    {
        return View::make('admin/blacklists/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Redirect
     */
    public function store()
    {
        // New Blacklist
        $blacklist = new Blacklist;
        $blacklist->title = Input::get('title');
        $blacklist->element = Input::get('element');

        // Was the blacklist created?
        if ($blacklist->save())
        {
            // Redirect to the new blacklist page
            return Redirect::route('admin.blacklists.index')
                ->with('success', 'Blacklist created successfully');
        }

        // Redirect to the new blacklist page
        return Redirect::route('admin.blacklists.create')
            ->with('error', 'Error creating blacklist');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return View
     */
    public function edit($id = null)
    {
        $blacklist = Blacklist::find($id)

        // Show the page
        return View::make('admin/blacklists/edit', compact('blacklist'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Redirect
     */
    public function update($id = null)
    {
        if( ! $blacklist = Blacklist::find($id))
        {
            // Redirect to the blacklists management page
            return Redirect::route('admin.blacklists.index')
                ->with('error', 'Blacklist not found');
        }

        // Update the blacklist data
        $blacklist->title = Input::get('title');
        $blacklist->element = Input::get('element');

        // Was the blacklist updated?
        if ($blacklist->save())
        {
            // Redirect to the blacklist page
            return Redirect::route('admin.blacklists.edit', $id)
                ->with('success', 'Blacklist updated successfully.');
        }

        // Redirect to the blacklist page
        return Redirect::route('admin.blacklists.edit', $id)
            ->with('error', 'Error updating blacklist');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Redirect
     */
    public function destroy($id = null)
    {
        if( ! $blacklist = Blacklist::find($id))
        {
            // Redirect to the blacklists management page
            return Redirect::route('admin.blacklists.index')
                ->with('error', 'Blacklist not found');
        }

        // Delete the blacklist
        if ($blacklist->delete())
        {
            // Redirect to the blacklist page
            return Redirect::route('admin.blacklists.index')
                ->with('success', 'Blacklist removed successfully.');
        }

        // Redirect to the blacklist page
        return Redirect::route('admin.blacklists.index')
            ->with('error', 'Error removing blacklist');
    }
}
~~~
