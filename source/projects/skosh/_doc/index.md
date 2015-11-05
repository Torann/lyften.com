---
title: Get Started
template: documentation.twig::content_inner
chapter: 1
---
## Installation

### Server Requirements

Skosh has a few system requirements:

- PHP >= 5.4.0
- Node

### Installing Skosh

Skosh utilizes Composer to manage its dependencies. So, before using Skosh, make sure you have Composer installed on your machine.

You may also install Laravel by issuing the Composer `create-project` command in your terminal:

```bash
composer create-project torann/skosh --prefer-dist
```

### Gulp

Next, you'll want to pull in Gulp as a global NPM package

```bash
npm install --global gulp
```

This will put the Gulp command in your system path, allowing it to be run from any directory.

The only remaining step is to install the Node dependencies. Within a fresh installation of Skosh, you'll find a `package.json` file in the root. Think of this like your `composer.json` file, except it defines Node dependencies instead of PHP. You may install the dependencies it references by running:

```bash
npm install
```