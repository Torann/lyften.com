---
title: Moderations
template: documentation.twig::content_inner
chapter: 5
---
### Rules

- `blacklist` flags a string if it contains any of one or more words that has been added to the black list.

- `links` checks if a field contains too many links based on the max links allowed. The default can be set in the config file or in the rule as seen above.

### Black Lists

The black list is stored in a number of places using the [Blacklist Drivers](/projects/laravel-moderate/doc/blacklist-drivers.html). Black list elements can be formed from Regular Expressions or a Character Sequence.

**Examples:**

- 10.0.2.2
- spammingsite.com
- [suck(er|ers|s|ing)|ugly|buttface]
- [\d{3}\.\d{3}\.\d{3}\.\d{3}]

or using newlines:

```
suck(er|ers|s|ing)
ugly
buttface
```

### Events

- `blacklist.updated` must be fired when updating the black list table. This is only needed if caching is turned on. This can be automatically done if using the `BlacklistTrait` on your blacklist model [See Models in [Blacklist Management](/projects/laravel-moderate/doc/blacklist-management.html)].

- `\Torann\Moderate\Events\Moderated` fired with an item is flagged. This can be used to send an email to the site admin.