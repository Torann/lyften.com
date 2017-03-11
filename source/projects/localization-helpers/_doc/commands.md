---
title: Commands
template: documentation.twig::content_inner
chapter: 2
---
### Command `localization:missing`

This command parses all your code and generate according lang files in all `lang/XXX/` directories.

Use `php artisan localization:missing` for more information about options.

#### Examples

##### Generate all lang files

```bash
php artisan localization:missing
```

##### Generate all lang files and backup the old files

```bash
php artisan localization:missing --backup
```

##### Generate all lang files and set new lemma values

3 commands below produce the same output:

```bash
php artisan localization:missing
php artisan localization:missing --new-value
php artisan localization:missing --new-value="%LEMMA"
```

You can customize the default generated values for unknown lemmas.

The following command let new values empty:

```bash
php artisan localization:missing --new-value=""
```

The following command prefixes all lemmas values with "Please translate this : "

```bash
php artisan localization:missing --new-value="Please translate this : %LEMMA"
```

The following command prefixes all lemmas values with "Please translate this !"

```bash
php artisan localization:missing --new-value='Please translate this!'
```

##### Dirty option for shell integration

```bash
#!/bin/bash

php artisan localization:missing --dirty
if [ $? -eq 0 ]; then
  echo "Nothing to do, GO for release"
else
  echo "I will not release in production, lang files are not clean"
fi
```