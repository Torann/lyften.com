---
title: Template Markup - Objects
template: documentation.twig::content_inner
chapter: 5
---
<a id="blog_value"></a>
### &lt;blog:value>
Evaluates the value of select attribute and is a self closing tag.

**Attributes:**
* select [string] - expression to evaluate

**Example**

```xml
<blog:value select="{category.category_name}" />
```

<a id="blog_if"></a>
### &lt;blog:if>
Code inside `<blog:if>` is evaluated and displayed if test condition is satisfied.

**Attributes**
* text - required

**Operators**
`=` is equal to
`and` equivalent to PHP's &&
`or` equivalent to PHP's ||
`!=` does not equal
`&lt;` less than
`&gt;` greater than
`in` checks if a value exists in an array

**Example #1**
```xml
<blog:if test="{var}">
    Var is not empty
</blog:if>
```

**Example #2**
```xml
<blog:if test="!{var}">
    Var is empty
</blog:if>
```

**Example #3**
```xml
<blog:if test="{tag.count} &lt; {cat.count}">
    tag. count is smaller than cat. count.
<blog:else>
    tag. count is larger or equal than cat. count.
</blog:else>
</blog:if>
```

**Example #4**
```xml
<blog:if test="{tag.name} or {cat.name}>
    cat or tag set
</blog:if>
```

**Example #5**
```xml
<blog:if test="{tag.name} != {cat.name} ">
    <blog:value select="{tag.name}" />
</blog:if>
```
<a id="blog_else"></a>
### &lt;blog:else>
When used inside `<blog:if>` value it is evaluated and displayed if `<blog:if>` test is not satisfied. When used inside `<blog:foreach>` value it is evaluated and displayed if `<blog:foreach>` has nothing to loop trough.

The `<blog:else>` tag must be within a `<blog:if>` or `<blog:foreach>` tag.

**Example #1**
```xml
<blog:if test="{tag.name} = {cat.name}">
    tag.name is equal to cat.name.
<blog:else>
    tag.name is not equal to cat.name.
</blog:else>
</blog:if>
```

**Example #2**
```xml
<blog:foreach from="{tags_list}" item="tag">
    <blog:value select="{tag.title}">
<blog:else>
    No tags.
</blog:else>
</blog:foreach>
```
<a id="blog_foreach"></a>
### &lt;blog:foreach>
This tag is used to loop through an array.

**Attributes:**
* from [array] - The array you are looping through (required)
* item [integer] - The name of the variable to assign the current array element (required)
* loop [integer] - The number of iterations
* start [integer] - The number to start from
* step [integer] - Step increment, default 1
* key [string] - The name of the variable to hold current index

**Example**
```xml
<blog:foreach from="{tag_list}" item="tag">
    <blog:value select="{tag.title}" />
</blog:foreach>
```
<a id="blog_jdate"></a>
### &lt;blog:jdate>
This tag is used to format a date using Joomla's date function.

**Attributes:**
* date [string] - The date you are formatting (required)
* format [string] – The date format

**Example**
```xml
<blog:value date="{tag.date}" format=” %b %d, %Y”/>
```
<a id="blog_jroute"></a>
### &lt;blog:jroute>
This tag is used to format a URL using Joomla's JRoute function.

**Attributes:**
* url[string] - The date you are formatting (required)

**Example**
```xml
<blog:jroute url="index.php?&option=com_content&id={article.slug}" class=”link” title="{ article.title }">
    <blog:value select="{ article.title }" />
</blog:jroute>
```
<a id="blog_commentbox"></a>
### &lt;blog:commentbox>
Used to create a new comment form.

**Attributes:**
* id[string] – Comment form unique identifier (required)
* allow [string] - Are comments allowed? (required)
* total [string] – Total comments (required)

**Example**
```xml
<blog:commentbox id="{entry.id}" allow="{entry.allowComments}" total="{totalcoms}" />
```
<a id="blog_comments"></a>
### &lt;blog:comments>
Used for displaying an entry's comments.

**Attributes:**
* id[string] – Comment form unique identifier (required)
* title [string] – Entry's title (required)

**Example**
```xml
<blog:comments id="{entry.id}" title="{entry.title}" />
```