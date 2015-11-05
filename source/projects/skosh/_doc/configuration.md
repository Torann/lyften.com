---
title: Configuration
template: documentation.twig::content_inner
chapter: 2
---
### Basic Configuration

All of the configuration files for the Skosh are stored in `config` directory.

### Environment Aware Configuration

Environment specific meta data overrides generic meta data so same defaults can be added to `config.yml` and overridden on an environment-by-environment basis. This can be useful for things like Google Analytics identifiers. Set the default development version in `config.yml` and set the production value in `config_production.yml`.

### Options

 - **timezone**: Used to set the system timezone.

 - **title**: Website title.

 - **url**: This URL is used by the console to properly generate URLs

 - **target**: The build directory, relative to the root directory.

 - **max_per_page**: Pagination setting for the max number of post per page.

 - **exclude**: Files extensions to exclude when copying static files.

 - **copy**: Folders and files to copy.