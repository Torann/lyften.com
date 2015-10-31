---
title: Template Markup
template: documentation.twig::content_inner
chapter: 4
---
### Variables

Template variables start without the $dollar sign and must be contained within curly braces. They can contain numbers, letters and underscores, much like a PHP variable. You can reference arrays by index numerically or non-numerically.

**System Variables:**

`{SETTING.foo|bar}` display LyftenBloggie setting "foo" or "bar" if "foo" is empty

`{PARAM.foo}` display the template's parameter "foo"

`{JTEXT.Foo Bar}` display the JText value to "Foo Bar"

`{SYSTEM.foo}` display system variable (base_url, blog_assets, theme_url, view, limitstart)

**Example Variables**

`{foo}` displaying a simple variable (non array/object)

`{foo[4]}` display the 5th element of a zero-indexed array

`{foo.bar}` display the "bar" key value of an array, similar to PHP $foo['bar']

`{foo->bar}` display the object property "bar"

`{foo->bar()}` display the return value of object method "bar"

`{foo.bar[baa]}` display the "baa" key value of an array, similar to PHP $foo['bar']['baa']

### Built-in Functions

Since BLOG is embedded inside the template `.tpl` files, that must be valid XHTML transitional documents. For debugging simple enable Joomla's debug option.

**BLOG Tags Explained**
* foreach [&lt;blog:foreach>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_foreach)
* if [&lt;blog:if>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_if)
* else [&lt;blog:else>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_else)
* value [&lt;blog:value>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_value)
* JDate [&lt;blog:jdate>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_jdate)
* JRoute [&lt;blog:jroute>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_jroute)
* commentbox [&lt;blog:commentbox>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_commentbox)
* comments [&lt;blog:comments>](/projects/lyftenbloggie/doc/template-markup-objects.html#blog_comments)

