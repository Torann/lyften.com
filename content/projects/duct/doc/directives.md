title: Directives
template: documentation.twig::content_inner
chapter: 4
----
Each file with content type `application/javascript` or `text/css` is
processed by the `DirectiveProcessor`. The `DirectiveProcessor` parses
the head of these files for special comments starting with an equals
sign.

```
/* CSS
 *= require foo.css
 *= depend_on bar.css
 */

# CoffeeScript
#= require foo.coffee

// Javascript
//= require foo.js
```

The arguments for each directive are split by the Bourne Shell's
rules. This means you have to quote arguments which contain spaces
with either single or double quotes.

```
//= require "some name with spaces.js"
```

#### require

Usage:

    require <path>

The require directive takes an asset path as argument, processes the
asset and puts the dependency's contents before the asset's contents.

The path can also start with `./`, which skips the load path for the
path resolution and looks up the file in the same path as the current
asset.

#### depend\_on

Usage:

    depend_on <path>

Defines that the `path` is a dependency of the current asset, but does
not process anything. Assets defined this way get considered when the
last modified time is calculated, but the contents get not prepended.

#### require\_tree

Usage:

    require_tree <path>

Requires all files found in the directory specified by `path`.

For example, if you have a directory for all individual widgets and a
widget base prototype, then you could `require_tree` the `widgets/`
directory. This way every developer can just drop a file into the
`widgets/` directory without having to maintain a massive list of
individual assets.

    // index.js
    //= require ./widget_base
    //= require_tree ./widgets