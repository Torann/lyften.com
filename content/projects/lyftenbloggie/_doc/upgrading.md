---
title: Upgrading
template: documentation.twig::content_inner
chapter: 11
---
From time to time you may want to update your LyftenBloggie installation to the latest version. You might want to do this because you've seen a message in your Dashboard telling you that a new release is available, because you've been made aware of some useful new functionality, or because a security fix has been released.

#### Check Requirements
Whatever the reason for updating, before getting started it is best to **check the [features section](/projects/lyftenbloggie/#features)** first to make sure that your web host has the required versions of PHP and MySQL.

#### Take a Backup
The next thing to do is to **make a backup of your database**. All your posts and settings are held in the database, a backup is not needed but it is alwasy a good idea to have a copy of it just in case.

#### Automatic Update
Current versions of LyftenBloggie (1.1+) sports an Automatic Update system. You can launch the automatic Update by going to the **Settings** > **Check** for Updates in the backend.

Once you are on the " Check for Updates" page, click the button "Upgrade Automatically" located at the top of the page to start the process off. You shouldn't need to do anything else and, once it's finished, you will be up-to-date.

If the automatic upgrade doesn't work for you, don't panic, just try a manual update.

#### Manual Update
Simple visit LyftenBloggie's homepage and download the component to your desktop and install it as you would any other Joomla Component. Keep in mind that you **DO NOT** have to uninstall you old version to upgrade, the new version is identified as updates by Joomla so it will be installed over the old version.

#### Got Disabled Modules?
During major upgrades some or all of the old LyftenBloggie Modules/Plugins will be disabled, this keeps Joomla from experiencing errors that some out of date modules may cause. Check the install progress for this information. This message will be displayed in red. Follow one of the steps below to update them:

**Automatic (Super Easy)**

Simply go to **Settings** > **Install Addons** in LyftenBloggie's back end and select from the list which modules you wish to update.

**Manually (Also Easy)**

Visit LyftenBloggie's Extensions directory to download the updated version of the modules you need and install them as you would any other module for Joomla. As a side note: they are identified as updates by Joomla so the uninstalling of the old version is not needed. Joomla will install the new version on top of the old one.

