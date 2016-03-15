---
title: Blacklist Management
template: documentation.twig::content_inner
chapter: 4
---
Using the default Database Driver you can setup your model and controller like below.

### Model

Adding the BlacklistTrait will register the **saved** and **deleted** events that trigger cache flushing. This is only needed is caching is turned on.

```php
<?php

use Torann\Moderate\BlacklistTrait;

class Blacklist extends Eloquent
{
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
    protected $fillable = [
        'title',
        'element'
    ];
}
```

### Controller

```php
<?php

use Blacklist;
use Illuminate\Http\Request;

class BlacklistsController extends Eloquent
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin/blacklists/index')->with([
            'blacklists' => Blacklist::paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin/blacklists/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // New Blacklist
        $blacklist = new Blacklist();
        $blacklist->title = $request->get('title');
        $blacklist->element = $request->get('element');

        // Was the blacklist created?
        if ($blacklist->save()) {
            return redirect()
                ->route('admin.blacklists.index')
                ->with('success', 'Blacklist created successfully');
        }

        // Redirect to the new blacklist page
        return redirect()
            ->route('admin.blacklists.create')
            ->with('error', 'Error creating blacklist');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Request $request
     * @param  int     $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $blacklist = Blacklist::findOrFail($id);

        // Show the page
        return view('admin/blacklists/edit')->with([
           'blacklists' => $blacklist
       ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int     $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $blacklist = Blacklist::findOrFail($id);

        // Update the blacklist data
        $blacklist->title = $request->get('title');
        $blacklist->element = $request->get('element');

        // Was the blacklist updated?
        if ($blacklist->save()) {
            return redirect()
                ->route('admin.blacklists.edit', $id)
                ->with('success', 'Blacklist updated successfully.');
        }

        // Redirect to the blacklist page
        return redirect()
            ->route('admin.blacklists.edit', $id)
            ->with('error', 'Error updating blacklist');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blacklist = Blacklist::findOrFail($id);

        // Delete the blacklist
        if ($blacklist->delete()) {
            return redirect()
                ->route('admin.blacklists.index')
                ->with('success', 'Blacklist removed successfully.');
        }

        // Redirect to the blacklist page
        return redirect()
            ->route('admin.blacklists.index')
            ->with('error', 'Error removing blacklist');
    }
}
```
