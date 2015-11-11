---
title: Commands
template: documentation.twig::content_inner
chapter: 2
---
### Command `localization:missing`

This command parses all your code and generate according lang files in all `lang/XXX/` directories.

Use `php artisan help localization:missing` for more information about options.

#### Examples

##### Generate all lang files

```bash
php artisan localization:missing
```

##### Generate all lang files without prompt

```bash
php artisan localization:missing -n
```

##### Generate all lang files without backuping old files

```bash
php artisan localization:missing -b
```

##### Generate all lang files without keeping obsolete lemmas

```bash
php artisan localization:missing -o
```

##### Generate all lang files without any comment for new found lemmas

```bash
php artisan localization:missing -c
```

##### Generate all lang files without header comment

```bash
php artisan localization:missing -d
```

##### Generate all lang files and set new lemma values

3 commands below produce the same output:

```bash
php artisan localization:missing
php artisan localization:missing -l
php artisan localization:missing -l "%LEMMA"
```

You can customize the default generated values for unknown lemmas.

The following command let new values empty:

```bash
php artisan localization:missing -l ""
```

The following command prefixes all lemmas values with "Please translate this : "

```bash
php artisan localization:missing -l "Please translate this : %LEMMA"
```

The following command prefixes all lemmas values with "Please translate this !"

```bash
php artisan localization:missing -l 'Please translate this !'
```

##### Silent option for shell integration

```bash
#!/bin/bash

php artisan localization:missing -s
if [ $? -eq 0 ]; then
  echo "Nothing to do dude, GO for release"
else
  echo "I will not release in production, lang files are not clean"
fi
```

##### Simulate all operations (do not write anything) with a dry run

```bash
php artisan localization:missing -r
```

##### Open all must-edit files at the end of the process

```bash
php artisan localization:missing -e
```

You can edit the editor path in your configuration file. By default, editor is *Sublime Text* on *Mac OS X* :

```bash
'editor_command_line' => '/Applications/Sublime\\ Text.app/Contents/SharedSupport/bin/subl'
```

### Command `localization:find`

This command will search in all your code for the argument as a lemma.

Use `php artisan help localization:find` for more information about options.

#### Examples

##### Find regular lemma

```bash
php artisan localization:find Search
```

##### Find regular lemma with verbose

```bash
php artisan localization:find -v Search
```

##### Find regular lemma with short path displayed

```bash
php artisan localization:find -s "Search me"
```

##### Find lemma with a regular expression

```bash
php artisan localization:find -s -r "@Search.*@"
php artisan localization:find -s -r "/.*me$/"
```

> PCRE functions are used