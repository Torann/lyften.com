---
title: Moderations
template: documentation.twig::content_inner
chapter: 3
---
### Rules

- `blacklist` flags a string if it contains any of one or more words that has been added to the black list.

- `links` checks if a field contains too many links based on the max links allowed. The default can be set in the config file or in the rule as seen above.

### Black Lists

The black list is stored in a database. Which database table to used is specified in the config file under `blacklistTable`. Black list elements can be formed from Regular Expressions or a Character Sequence.

**Examples:**

- 10.0.2.2
- spammingsite.com
- [suck|ugly]
- [\d{3}\.\d{3}\.\d{3}\.\d{3}]


### Events

`blacklist.updated` must be fired when updating the black list table. This clears the cache. Add this to your black list model or controller.

`moderations.moderated` fired with an item is flagged. This can be used to send an email to the site admin.