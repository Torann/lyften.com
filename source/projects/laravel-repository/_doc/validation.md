---
title: Validation
template: documentation.twig::content_inner
chapter: 3
---
This validation class is a layer on top of Laravel's own Validation class (the one you create by calling Validator::make), meant to be injected into a repository or controller. It allows for more advanced rulesets and more dynamic rules.

## Example

```php
use Torann\LaravelRepository\AbstractValidator;

class MyValidator extends AbstractValidator
{
    protected $rules = array(
        'title'  => 'required',
        'status' => 'required'
    );

    protected $createRules = array(
        'user_id' => 'required'
    );

    protected $updateRules = array(
        'id' => 'required|exists:users,id'
    );
}
```

## Rules

The `$rules` array are common validation rules and are used on every action. They can be overwritten with the action specific rules.

Action events have a suffix of `Rules`.