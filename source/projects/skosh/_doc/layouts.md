---
title: Layouts
template: documentation.twig::content_inner
chapter: 4
---
With Skosh, a layout is more or less a wrapper or shell around your pages content. Layouts live in any of the view `_templates` directory.

For a layout to work, it must be able to render a source's content block.

```twig
{% block content %}{% endblock %}
```

## Inheritance

Skosh utilizes the inheritance capabilities that are built into Twig by wrapping each source in a block named "content." So, given the following file:

```markdown
---
layout: default
---

# This is a markdown file with YAML formatter
```

Internally, Skosh treats this file like the following:

```twig
{% extends "default" %}

{% block content %}

# This is a markdown file with YAML formatter
{% endblock %}
```
