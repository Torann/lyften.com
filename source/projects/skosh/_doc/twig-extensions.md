---
title: Twig Extensions
template: documentation.twig::content_inner
chapter: 6
---
The main motivation for writing an extension is to move often used code into a reusable class like adding support for internationalization. An extension can define tags, filters, tests, operators, global variables, functions, and node visitors.

Creating an extension also makes for a better separation of code that is executed at compilation time and code needed at runtime. As such, it makes your code faster.

> Before writing your own extensions, have a look at the [Twig official extension repository](https://github.com/twigphp/Twig-extensions).

## Registering a Twig Extension

The `config/config.yml` included with your Skosh application provides a convenient place to register all Twig extensions. The `twig_extensions` property contains an array of all Twig extensions. All Twig extensions should extend the base extension `Skosh\Twig\AbstractExtension` included with the Skosh. 

For an example, let's add our **Metadata** extension:

```ymal
# Register twig extensions
twig_extensions: ['\App\TwigExtension\Metadata']
```

```php
<?php

namespace App\TwigExtension;

use Skosh\Twig\AbstractExtension;

class Metadata extends AbstractExtension
{
    /**
     * Returns a list of functions to add to the existing list.
     *
     * @return array
     */
    public function getFunctions()
    {
        return [
            'metaDesc' => new \Twig_Function_Method($this, 'getMetaDesc')
        ];
    }

    /**
     * Process description.
     *
     * @param  object $page
     * @return string
     */
    public function getMetaDesc($page)
    {
        // Get site root page
        $root = $this->getBuilder()->getParent('root');

        // Get given page title, default to root page description
        $description = $page ? $page->description : $root->description;

        // Clean description of all tags and whitespace.
        return clean_string($description);
    }
}
```
 
## Creating an Extension

#### Functions

Functions can be registered in an extension via the `getFunctions()` method:

```php
class ProjectTwigExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new Twig_SimpleFunction('lipsum', 'generate_lipsum'),
        ];
    }

    // ...
}
```

#### Filters

To add a filter to an extension, you need to override the `getFilters()` method. This method must return an array of filters to add to the Twig environment:

```php
class ProjectTwigExtension extends AbstractExtension
{
    public function getFilters()
    {
        return [
            new Twig_SimpleFilter('rot13', 'str_rot13'),
        ];
    }

    // ...
}
```

#### Tags
Adding a tag in an extension can be done by overriding the `getTokenParsers()` method. This method must return an array of tags to add to the Twig environment:

```php
class ProjectTwigExtension extends AbstractExtension
{
    public function getTokenParsers()
    {
        return [
            new ProjectSetTokenParser()
        ];
    }

    // ...
}
```

In the above code, we have added a single new tag, defined by the `ProjectSetTokenParser` class. The `ProjectSetTokenParser` class is responsible for parsing the tag and compiling it to PHP.


#### Operators

The `getOperators()` methods lets you add new operators. Here is how to add `!`, `||`, and `&&` operators:

```php
class ProjectTwigExtension extends AbstractExtension
{
    public function getOperators()
    {
        return [
            [
                '!' => ['precedence' => 50, 'class' => 'Twig_Node_Expression_Unary_Not'],
            ],
            [
                '||' => ['precedence' => 10, 'class' => 'Twig_Node_Expression_Binary_Or', 'associativity' => Twig_ExpressionParser::OPERATOR_LEFT],
                '&&' => ['precedence' => 15, 'class' => 'Twig_Node_Expression_Binary_And', 'associativity' => Twig_ExpressionParser::OPERATOR_LEFT],
            ],
        ];
    }

    // ...
}
```

#### Tests

The `getTests()` method lets you add new test functions:

```php
class ProjectTwigExtension extends AbstractExtension
{
    public function getTests()
    {
        return [
            new Twig_SimpleTest('even', 'twig_test_even'),
        ];
    }

    // ...
}
```