---
title: Commands
template: documentation.twig::content_inner
chapter: 5
---
### $ php skosh build

To generate an existing site, in the site folder.

**Options:**

```bash
 --env,-e            Which environment to build for. (default: "local")
 --part,-p           Which part of the site to build pages, assets, or
                     all. (default: "all")
 --skip,-s           Which part of the site to skip [config, static, pages, or assets]
```

### $ php skosh serve

To serve a site using Gulp.

**Options:**

```bash
 --port,-p           Port to listen on. (default: 8000)
 --host,-H           Host to listen on. (default: "localhost")
```
