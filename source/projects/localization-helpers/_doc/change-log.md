---
title: Change Log
template: documentation.twig::content_inner
chapter: 4
---
### v1.3.3

- Add the ability to import and export language files in CSV format

### v1.3.2

- Added the ability to support periods in sentences using the `&period;`
- Converted to PSR-4 format
- Removed support for Laravel 4
- Rorked from `potsky/laravel-localization-helpers`

### v1.3.1

- add resource folder for Laravel 5

### v1.3

- add full support for Laravel 5

### v1.2.2

- add support for @lang and @choice in Blade templates (by Jesper Ekstrand)

### v1.2.1

- add `lang_folder_path` parameter in configuration file to configure the custom location of your lang files
- check lang files in `app/lang` by default for Laravel 4.x
- check lang files in `app/resources/lang` by default for Laravel 5

### v1.2

- support for Laravel 5 (4.3)
- add `ignore_lang_files` parameter in configuration file to ignore lang files (useful for `validation` file for example)