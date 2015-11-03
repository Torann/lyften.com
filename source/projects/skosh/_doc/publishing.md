---
title: Publishing
template: documentation.twig::content_inner
chapter: 3
---
Update the `remote.yml` file to setup you remote server.

```bash
$ php skosh publish [server]
```

**Options:**

```bash
 --env,-e            Which environment to publish. (default: "production")
```

### Dependencies:

* [lftp](http://lftp.yar.ru/) is required to publish to a FTP server.
* [rsync](http://rsync.samba.org/) is required to publish to a SSH server.

## Protecting Sensitive Configuration

It is advisable to keep all of your sensitive configuration out of your configuration files. Things such as FTP passwords, API keys, and encryption keys should be kept out of your configuration files whenever possible. So, where should we place them? Thankfully, Skosh provides a very simple solution to protecting these types of configuration items using "dot" files.

The `.remote.yml` file within the root of your project contains the FTP/SSH credentials for the remote production server. To create a remote configuration file for a another server, simple create a "dot" remote file with the remote server's name in it `.remote_staging.yml`. This will be used when publishing to the remove staging server `skosh publish ftp --env=staging`;
