---
title: Sources
template: documentation.twig::content_inner
chapter: 3
---

By default, sources are objects represented by each file under `source/`. Sources that have YAML formatter are considered special in that they can be formatted.

What is YAML formatter? It is best to compare examples:

```markdown
# This is a markdown file without YAML formatter
```

... compared to...

```markdown
---
layout: default.twig
title: Example Page
---

# This is a markdown file with YAML formatter
```

As you can see, there is a chunk of YAML in the second example. It is delimited by `---`. The YAML formatter is parsed and injected into every page rendering and is accessible as `page.KEY`.

For example we can reference the page's title by using `page.title`.

### Post Excerpts

Sometimes all you need is an excert of the post when displaying a list of them. For this reason you can use the syntax below to achieve this. When displaying the full post the excerpt is displayed normally. This helps cutback on typing.

```markdown
<!--excerpt-->
This can be the beginning of the article.
<!--endexcerpt-->
```