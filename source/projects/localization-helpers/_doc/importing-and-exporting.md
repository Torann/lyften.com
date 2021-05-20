---
title: Importing and Exporting
template: documentation.twig::content_inner
chapter: 3
---
Importing and exporting makes use of a Driver based approach to help simply the managing of different formats and remote services. Look under the Driver section of the config file for more information on setting this up. 

Supported drivers are: `json`, `csv`, and `one_sky`

## Commands

### Export

```bash
artisan localization:export [options] [--] <locale> <group>
```

**Arguments**

- `locale` - The application locale to be exported
- `group` - The group or comma separated groups.

**Options**

- `--driver[=DRIVER]` - Driver to use for exporting (default is pulled from the config).

#### Examples

Export the navigation translation for english (en) using the default driver.

```bash
artisan localization:export en navigation
```

Export the navigation translation for english (en) using the JSON driver.

```bash
artisan localization:export en navigation --driver=json
```

Upload the navigation translation for english (en) to OneSky.

```bash
artisan localization:export en navigation --driver=one_sky
```

> **Note** make sure you have [OneSky](http://www.oneskyapp.com). configured with your project ID and API key & secret

### Import

```bash
artisan localization:import [options] [--] <locale> <group>
```

**Arguments**

- `locale` - The application locale to be exported
- `group` - The group or comma separated groups.

**Options**

- `--driver[=DRIVER]` - Driver to use for exporting (default is pulled from the config).

#### Examples

Import the navigation translation for english (en) using the default driver.

```bash
artisan localization:import en navigation
```

Import the navigation translation for english (en) using the JSON driver.

```bash
artisan localization:import en navigation --driver=json
```

Download the navigation translation for english (en) from OneSky.

```bash
artisan localization:import en navigation --driver=one_sky
```

> **Note** make sure you have [OneSky](http://www.oneskyapp.com) configured with your project ID and API key & secret