$(document).ready(function () {
    'use strict';

    var menu_closed = true;

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    // Simple alerts
    var msg = getUrlParameter('msg');
    if (msg) {
        var $alert = $('<div class="snackbar notice"><div class="container"><i class="icon-megaphone"></i> ' + msg + '<a href="#" title="Close" class="close">×</a></div></div>').prependTo('body');

        $alert.find('.close').bind('click', function (ev) {
            $alert.remove();
        });
    }

    // Social Share
    $('a[data-share]').bind('click', function (e) {
        e && e.preventDefault();

        var $this = $(this),
            site = $this.data('share'),
            url = $this.attr('href');

        var shareWindow = window.open(url, '', 'resizable=yes,scrollbars=yes,' + (site === 'facebook' ? 'width=660,height=300' : 'width=580,height=420'));

        // Popup was blocked
        if (!shareWindow) {
            window.location = url;
        }
    });

    $('.show-tweets').tweet({
        modpath: '/skosh.php?dispatch=twitter',
        username: 'lyften',
        join_text: 'auto',
        loading_text: 'loading tweet...',
        template: "<div class=\"tweet\">{text}<div class=\"date-tweet\">{time}</div></div>"
    });

    $('.mobile-menu').on('touchend', function (ev) {
        ev && ev.preventDefault();

        $(this).toggleClass('open', menu_closed);
        $('header nav').toggleClass('open', menu_closed);
        $('body').toggleClass('menu-open', menu_closed);

        menu_closed = !menu_closed;
    });

    // Waypoints
    var $stickyShare = $('.sidebar-sticky');
    $stickyShare.waypoint('sticky', {
        offset: 30
    });

    $('#documentation .aside').waypoint('sticky', {
        offset: 10
    });

    // Fixes waypoint
    $('iframe.snapwidget-widget').on('load', function () {
        $(window).trigger('resize');
    });

    // Fix sticky width
    $(window).on('resize', function () {
        $stickyShare.width($stickyShare.parent().width());
    }).trigger('resize');
});

$(window).load(function () {
    'use strict';

    $('.masonry-container').isotope({
        itemSelector: '[class^="col-"], [class*=" col-"]'
    });

    $(function () {
        var $filters = $('.filters');

        // init Isotope
        var $container = $('.masonry-container').isotope({
            itemSelector: '.item'
        });

        // Filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function () {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },

            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };

        // Bind filter button click
        $filters.on('click', 'li', function () {
            var filterValue = $(this).attr('data-filter');

            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $container.isotope({
                filter: filterValue
            });
        });

        // Change is-checked class on buttons
        $filters.each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);

            $buttonGroup.on('click', 'li', function () {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });
    });
});

function dd() {
    if (typeof(console) === 'object') {
        console.log.apply(console, arguments);
    }
}