---
title: Importing and Exporting
template: documentation.twig::content_inner
chapter: 3
---
Importing and exporting is helpful when using a third party service such as [OneSkyApp.com](http://www.oneskyapp.com).

### Command `localization:export`

This command will create a CSV file based on the given locale and group. You have to pass the **locale** and the **group** as arguments. The group is the name of the language file without its extension. You may define options for your desired CSV format.

#### Examples

##### Export the navigation translation for english (en) 

```bash
php artisan localization:export en navigation
```

##### Optional example 

```bash
php artisan localization:export en navigation --path=/some/file
php artisan localization:export en navigation --delimiter=";" --enclosure='"' --path=/some/file
```

### Command `localization:import`

This command import a CSV file based on the given locale and group. You have to pass  the **locale**, the **group** and the **path to the CSV file** as arguments. The group is the name of the language file without its extension. You may define options to match the CSV format of your input file.

#### Examples

##### Import the navigation translation for english (en) 

```bash
php artisan localization:import en navigation
```

##### Optional example 

```bash
php artisan localization:import en navigation --path=/some/file
php artisan localization:import en navigation --delimiter=";" --enclosure='"' --escape='\\' --path=/some/file
```