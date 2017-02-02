---
template: blog.twig::content_inner
title: jQuery Multi-select
author: Daniel Stainback
image: /uploads/posts/jquery-multiselect.png
date: 2016-05-19 22:41
---
<!--excerpt-->
Quick and simple way to support multi-select using Bootstrap's dropdown component.
<!--endexcerpt-->

Primary jQuery file (`jquery.multiselect.js`):

```js
/**
 * @file jquery.multiselect.js
 * @brief Support for multi-select dropdowns.
 * @author Daniel Stainback (Torann)
 * @version 0.1
 * @site http://lyften.com/journal/jquery-multiselect.html
 * @license BSD 2-Clause
 */

!function ($) {
    "use strict";// jshint ;_;

    /**
     * Constructor to create a new multi-select using the given select.
     *
     * @param {jQuery} element
     * @param {Object} options
     * @returns {MultiSelect}
     */
    var MultiSelect = function (element, options) {
        this.$element = $(element);
        this.limit = this.$element.data('limit');

        this.options = $.extend(true, {
            name: this.$element.prop('name'),
            disabled: this.$element.is(':disabled')
        }, MultiSelect.DEFAULTS, options);

        // Ensure the option name is an array
        if (this.options.name.slice(-2) !== '[]') {
            this.options.name = this.options.name + '[]';
        }

        // Limit attribute
        var data_limit = this.limit ? ' data-limit="' + this.limit + '"' : '';

        // Create elements
        this.$plaeholder = $('<a href="#" data-toggle="dropdown" aria-expanded="true"/>').insertAfter(this.$element);
        this.$dropdown = $('<ul class="dropdown-menu" role="menu"' + data_limit + '/>').insertAfter(this.$plaeholder);

        // Text
        var txt = this.$element.find('option[value=""]').text() || 'Select one';
        this.$plaeholder.data('plaeholder', txt).html(txt);

        // Build select all if enabled.
        this.build();

        this.$element.remove();
    };

    MultiSelect.DEFAULTS = {
        disabled: false
    };

    MultiSelect.prototype.build = function () {
        this.$element.find('option').each($.proxy(function (index, element) {
            this.createOptionValue(index, element);
        }, this));

        this.updatePlaceHolder();
    };

    MultiSelect.prototype.createOptionValue = function (index, element) {
        var $element = $(element);

        if ($element.val() === '') return;

        // Support the label attribute on options.
        var label = $.trim($element.text());
        var input = '<input type="checkbox" id="option-checkbox-' + index + '" name="' + this.options.name + '" data-label="'+ label +'"><label for="option-checkbox-'+index+'">' + label + '</label>';

        var $option = $('<li role="presentation"><div class="form-group">' + input + '</div></li>');
        var $checkbox = $option.find('[type="checkbox"]');

        // Set value
        $checkbox.val($element.val());

        // Add option to dropdown
        this.$dropdown.append($option);

        if (this.options.disabled === true || $element.is(':disabled')) {
            $checkbox.attr('disabled', 'disabled');
        }

        $checkbox.prop('checked', $element.prop('selected') || false).on('change', $.proxy(function (ev) {
            this.updatePlaceHolder();
        }, this));
    };

    MultiSelect.prototype.updatePlaceHolder = function () {
        var txt = '',
            $inputs = this.$dropdown.find('input:checked');

        $inputs.each(function () {
            txt += $(this).data('label') + ', ';
        });

        // Restrict the number of selected items
        if (this.limit) {
            this.$dropdown
                .find('input:not(:checked)')
                .toggleProp('disabled', ($inputs.length >= this.limit));
        }

        this.$plaeholder.text(txt ? $.trim(txt).replace(/(^,)|(,$)/g, '') : this.$plaeholder.data('plaeholder'));
    };

    $.fn.multiselect = function (option, parameter) {
        return this.each(function () {
            var data = $(this).data('multi-select');
            var options = typeof option === 'object' && option;

            // Initialize the multi-select.
            if (!data) {
                data = new MultiSelect(this, options);
                $(this).data('multi-select', data);
            }

            // Call multi-select method.
            if (typeof option === 'string') {
                data[option](parameter);

                if (option === 'destroy') {
                    $(this).data('multi-select', false);
                }
            }
        });
    };

    $.fn.multiselect.Constructor = MultiSelect;

    $(function () {
        $('select[multiple]').multiselect();
    });

}(window.jQuery);
```