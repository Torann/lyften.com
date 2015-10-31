---
title: Writing a Plugin
template: documentation.twig::content_inner
chapter: 7
---
### Introduction
LyftenBloggie Component Plugins allow easy modification, customization, and enhancement to a LyftenBloggie powered blog. Instead of changing the core programming of LyftenBloggie, you can add functionality with LyftenBloggie Component Plugins. Here is a basic definition:

LyftenBloggie Component Plugin: A LyftenBloggie Component Plugin is a program/function that is used internally by LyftenBloggie and is written in the PHP scripting language. It adds a specific set of features or services to the LyftenBloggie, which can be seamlessly integrated with the weblog using methods provided by the LyftenBloggie Plugin Application Program Interface (API).

Wishing that LyftenBloggie had some new or modified functionality? The first thing to do is to search various LyftenBloggie Plugin repositories and sources to see if someone has already created a plugin that suits your needs. If not, this article will guide you through the process of creating your own LyftenBloggie Plugins.

This article assumes you are already familiar with the basic functionality of LyftenBloggie, and PHP programming.

### Creating a Plugin
This section of the article goes through the steps you need to follow, and things to consider when creating a well-structured LyftenBloggie Plugin.

**Plugin Name**

The first task in creating a LyftenBloggie Plugin is to think about what the Plugin will do, and make a (hopefully unique) name for your Plugin. Check out Plugins and the other repositories it refers to, to verify that your name is unique; you might also do a Google search on your proposed name. Most Plugin developers choose to use names that somewhat describe what the Plugin does. The name can be multiple words but must not contain spaces.

**Plugin Files**

The next step is to create a PHP file with a name derived from your chosen Plugin name. For instance, if your Plugin will be called "Kitty Comments", you might call your PHP file kitcomm.php. Again, try to choose a unique name. People who install your Plugin will be putting this PHP file into the LyftenBloggie Plugin directory in their installation, `components/com_lyftenbloggie/addons/plugins/`, so no two Plugins they are using can have the same PHP file name.

### Programming Your Plugin
Now, it's time to make your Plugin actually do something. This section describes the methods called for each type of Plugin.

* [Avatar Plugins](/projects/lyftenbloggie/doc/avatar-plugins.html)
* [Comment Plugins](/projects/lyftenbloggie/doc/comment-plugins.html)