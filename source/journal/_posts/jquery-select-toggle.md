---
template: blog.twig::content_inner
title: jQuery Select Toggle
author: Daniel Stainback
image: /uploads/posts/jquery-select-toggle.png
date: 2016-02-25 12:10
---
<!--excerpt-->
A snippet to toggle a DOM element based on the value of an select element.
<!--endexcerpt-->

Primary jQuery file (`jquery.select-toggle.js`):

```js
/**
 * @file jquery.select-toggle.js
 * @brief Toggle secondary items in a form.
 * @author Daniel Stainback (Torann)
 * @site http://lyften.com/journal/jquery-select-toggle.html
 * @version 0.1
 * @license BSD 2-Clause
 */

;(function ($) {
    $(document).on('change', 'select[data-toggles]', function () {
        var $this = $(this),
            $form = $this.closest('form'),
            value = $(this).val(),
            toggle = $this.data('toggles').split('|');

        $.each(toggle, function (i, item) {
            var values = item.split(':'),
                state = (values[0] === '*') ? value === '' : (value != values[0]);

            $form.find(values[1]).toggleProp('hidden', state);
        });
    });

    $(document).on('change', 'select[data-filters]', function () {
        var $this = $(this),
            $target = $($this.data('filters')),
            value = $this.find(':selected').data('filter-val');

        $target.closest('.input-field')
            .toggleProp('hidden', value === undefined);

        $target.find('option').each(function (i, item) {
            var $item = $(item),
                hidden = item.value > value;

            $item.toggleProp('hidden', hidden);

            if (hidden) {
                $item.removeProp('selected');
            }
        });
    });
})(jQuery);
```

Using the data attribute `data-toggles` we can toggle the element with the id `#schedule-input` when the user selected the option with the value **2**.

Syntax for `data-toggles` attribute:

```
{option value}:{element to toggle}
```

HTML example:

```html
<div class="form-group">
    <div class="simple-select">
        <label for="post-status">
         Status
        </label>
        <select id="post-status" name="status" data-toggles="2:#schedule-input">
            <option value="1">
                Published
            </option>
            <option value="2">
                Scheduled
            </option>
            <option value="3">
                Draft
            </option>
        </select>
    </div>
</div>

<div id="schedule-input" class="form-group" hidden>
    <label for="post-publish-at">
        Schedule
    </label>
    <input type="date" id="post-publish-at" name="publish_at" value="">
</div>
```