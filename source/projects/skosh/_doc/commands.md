---
title: Commands
template: documentation.twig::content_inner
chapter: 2
---
### php skosh init

Create the skeleton for a new site.

**Options:**

```bash
 --force,-f          Force creation even if the project directory already exists.
 --gulp,-g           Reinitialize Gulp if the project directory already exists.
```

### php skosh build

To generate an existing site, in the site folder.

**Options:**

```bash
 --env,-e            Which environment to build for. (default: "local")
 --part,-p           Which part of the site to build pages, assets, or
                     all. (default: "all")
```

### php skosh serve

To serve a site using Gulp.

**Options:**

```bash
 --port,-p           Port to listen on. (default: 8000)
 --host,-H           Host to listen on. (default: "localhost")
```
