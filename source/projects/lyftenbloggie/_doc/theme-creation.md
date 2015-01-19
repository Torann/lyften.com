---
title: Theme Creation
template: documentation.twig::content_inner
chapter: 6
---
### Files and Directories
This is the basic file/directory setup for a theme.

```
YOURTHEME
  ├─── yourtheme.xml <-- parameters, author and install data
  ├─── index.tpl <-- blog main view
  ├─── entry.tpl <-- single entry view
  ├─── comments.tpl <-- entry’s comments view
  ├─── CSS
  │    ├─── style.css <-- themes style
  │    ├─── ie6.css <-- Internet Explorer 6 tweaks
  │    ├─── ie7.css <-- Internet Explorer 7 tweaks
  │    ├─── ie8.css <-- Internet Explorer 8 tweaks
  │    └─── green.css <-- theme variation
  └─── IMAGES
       └─── default_entry.png <-- default image for entries
```

### XML Parameters
The following parameters are set within the theme’s XML file.

* **style**: used for theme color variations
* **left_object**: change left column object (avatar, image, none, etc.)
* **leftobj_width**: left column object width
* **leftobj_height**: left column object height
* **leftcol_width**: left column’s width
