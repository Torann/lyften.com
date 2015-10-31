---
title: Timestamp Managers
template: documentation.twig::content_inner
chapter: 3
---
For instance when multiple web servers are sharing a database we need to ensure the settings are all in sync. To accomplish this we use timestamp managers. The master timestamp is held in **Redis** and compared against the cached registry's timestamp, if the cached version is expired the system reloads the registry from the database and caches them.

To write a custom timestamp manager implement `Torann\Registry\Timestamps\TimestampInterface` and include your class in the registry settings `timestamp_manager`.