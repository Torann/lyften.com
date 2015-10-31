$(document).ready(function () {

    var $window = $(window),
        $body = $('body'),
        page_number = 1,
        load_more_button_text = '',
        $preloader = $('#preloader'),
        $blog_load_more_button = $('.btn-load-more'),
        tile_base_height;

    function getUrlParameter(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return decodeURIComponent(sParameterName[1]);
            }
        }
    }

    // Simple alerts
    var msg = getUrlParameter('msg');
    if (msg) {
        var $alert = $('<div class="alert blue"><i class="icon-megaphone"></i> '+msg+'</div>').prependTo($body);
        $alert.bind('click', function() {
            $alert.remove();
        });
    }

    // sidebar right
    $('a.ck').click(function () {
        if ($(".asideright").hasClass("block")) {
            $(".asideright").removeClass("block");
            $("a.ck").css({"right": "0px"});
            $(".px1").removeClass("block");
            $("body").removeClass("o-hidden");
        }
        else {
            $(".asideright").addClass("block");
            $("a.ck").css({"right": "300px"});
            $(".px1").addClass("block");
            $("body").addClass("o-hidden");
        }
    });

    $('.px1').click(function () {
        $(".asideright").removeClass("block");
        $("a.ck").css({"right": "0px"});
        $(".px1").removeClass("block");
        $("body").removeClass("o-hidden");
    });

    // slider
    //$('.slider').nivoSlider();

    $('.sidebar-sticky').waypoint('sticky', {
        offset: 30
    });

    // Mobile Sidenav
    var sidebarDisplay = function(display) {

        $('#container').toggleClass('active', display);

        if (display)
        {
            $('body').addClass('active-menu');

            setTimeout(function() {
                $('#asideleft').addClass('active');
            }, 50);
        }

        else {
            $('#asideleft').removeClass('active');

            setTimeout(function() {
                $('body').removeClass('active-menu');
            }, 400);
        }
    };

    // Toggle mobile menu
    $('.ss-mobile-menu-button').click(function (e) {
        e && e.preventDefault();
        sidebarDisplay($('body').hasClass('active-menu') === false);
    });

    // Allow whitespace to close nav
    $('#asideleft').bind('click', function(e) {
        if ($(e.target).is('#asideleft')) {
            sidebarDisplay(false);
        }
    });

    // // tabs
    // $('ul.tabs').delegate('li:not(.current)', 'click', function () {
    //     $(this).addClass('current').siblings().removeClass('current')
    //         .parents('div#content').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();
    // });

    // // toggle
    // $(".toggle span").click(function () {
    //     $(this).toggleClass("active");
    //     $(this).next("div").stop('true', 'true').slideToggle("slow");
    // });

    // Social Share
    $('a[data-share]').bind('click', function(e) {
        e && e.preventDefault();

        var $this = $(this),
            site = $this.data('share'),
            url = $this.attr('href');

        var shareWindow = window.open(url,'','resizable=yes,scrollbars=yes,'+(site === 'facebook' ? 'width=660,height=300' : 'width=580,height=420'));

        // Popup was blocked
        if(! shareWindow) {
            window.location = url;
        }
    });

    $(".show-tweets").tweet({
        modpath: "/skosh.php?dispatch=twitter",
        username: "lyften",
        join_text: "auto",
        loading_text: "loading tweet...",
        template: "<div class=\"tweet\">{text}<div class=\"date-tweet\">{time}</div></div>"
    });

    // Blog masonry
    var $blog_container_masonry = $('.blog-container.masonry');

    // var load_blog_masonry_items = function () {

    //     $body.css({
    //         'overflow': 'hidden',
    //         'overflow-y': 'scroll'
    //     });

    //     $.ajax({
    //         type: "GET",
    //         dataType: "html",
    //         url: '/page/'+page_number,
    //         success: function (data) {

    //             var $data = $(data);

    //             $data.find('.blog-item').each(function (index) {

    //                 var $blog_item = $(this);

    //                 // Get Isotope Instance
    //                 // var iso = $blog_container_masonry.data('isotope');
    //                 $blog_item.hide().appendTo($blog_container_masonry);

    //                 var imageLoader = imagesLoaded($blog_container_masonry[0]);
    //                 imageLoader.on('always', function (instance) {
    //                     $blog_container_masonry.isotope('appended', $blog_item);
    //                     $blog_container_masonry.isotope('layout');
    //                 });
    //             });

    //             // Update button
    //             if ($data.find('.btn-load-more').length === 0) {
    //                 $blog_load_more_button.find('a').removeClass('loading').attr('disabled', 'disabled').text('Done');
    //             }
    //             else {
    //                 $blog_load_more_button.find('a').removeClass('loading').text(load_more_button_text);
    //             }

    //             window.history.pushState({"html":data, "pageTitle": 'data.pageTitle'}, '', '/page/'+page_number);
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);
    //             $blog_load_more_button.text('Error! Check the console for more information.');
    //         }
    //     });
    // }

    if ($blog_container_masonry.length) {

        $preloader.show();

        imagesLoaded($blog_container_masonry[0], function (instance) {

            $blog_container_masonry.isotope({
                itemSelector: '.blog-item',
                layoutMode: 'masonry',
                columnWidth: '.grid-sizer'
            });

            $blog_container_masonry.isotope('layout');

            $preloader.hide();
        });

        // $blog_load_more_button.children('a').click(function (e) {
        //     e && e.preventDefault();

        //     load_more_button_text = $(this).text();
        //     $(this).text('').addClass('loading');
        //     page_number++;

        //     load_blog_masonry_items();
        // });
    }

    // Cache Selectors
    var $tiles_container = $('.tiles-container');

    if ($tiles_container.length) {

        $preloader.show();

        var $tiles_inner = $tiles_container.find('.tiles-inner-container'),
            $tiles_container_width = $tiles_container.find('.tiles-inner-container').width(),
            $tiles_container_width_ajax = $tiles_container_width;

        function update_tiles_container_width() {
            $tiles_container_width = $tiles_container.find('.tiles-inner-container').width();
            $tiles_container_width_ajax = $tiles_container_width;
        }

        var _update_tiles_container_width = $.throttle(100, update_tiles_container_width);
        $window.resize(_update_tiles_container_width);

        //sizing the width
        var tiles_container_resize = $.throttle(100, function () {
            content_width = $('main#content').width();

            if (content_width > 992) {
                $tiles_container.width(content_width);
            }
            else {
                $tiles_container.width(content_width);//inner-wrapper padding
            }
        });

        $window.bind('resize', tiles_container_resize).trigger('resize');

        // When Images are loaded
        imagesLoaded($tiles_container[0], function () {

            var $tile1 = $tiles_container.find('.tile.size-1'),
                $tile2 = $tiles_container.find('.tile.size-2'),
                $tile3 = $tiles_container.find('.tile.size-3'),
                $tile4 = $tiles_container.find('.tile.size-4'),
                $tile5 = $tiles_container.find('.tile.size-5');

            if (matchMedia('(max-width: 380px)').matches) {
                //calculate tile base height
                if ($tile1.length) {
                    tile_base_height = $tile1.width();
                } else if ($tile2.length) {
                    tile_base_height = $tile2.width();
                } else if ($tile3.length) {
                    tile_base_height = $tile3.width();
                } else if ($tile4.length) {
                    tile_base_height = $tile4.width();
                } else if ($tile5.length) {
                    tile_base_height = $tile5.width();
                }
                //calculate each tiles height size
                $tile1.height(tile_base_height);
                $tile2.height(tile_base_height / 2);
                $tile3.height(tile_base_height * 2);
                $tile4.height(tile_base_height);
                $tile5.height(tile_base_height);
            }
            else {
                //calculate tile base height
                if ($tile1.length) {
                    tile_base_height = $tile1.width();
                } else if ($tile2.length) {
                    tile_base_height = Math.floor($tile2.width() / 2);
                } else if ($tile3.length) {
                    tile_base_height = $tile3.width();
                } else if ($tile4.length) {
                    tile_base_height = Math.floor($tile4.width() / 2);
                } else if ($tile5.length) {
                    tile_base_height = Math.floor($tile5.width() / 2);
                }
                //calculate each tiles height size
                $tile1.height(tile_base_height);
                $tile2.height(tile_base_height);
                $tile3.height(tile_base_height * 2);
                $tile4.height(tile_base_height * 2);
                $tile5.height(tile_base_height * 2);
            }

            var layout_base_resize = $.throttle(100, function () {

                if (matchMedia('(max-width: 380px)').matches) {//if media query max-width < 380
                    //calculate tile base height
                    if ($tile1.length) {
                        tile_base_height = $tile1.width();
                    } else if ($tile2.length) {
                        tile_base_height = $tile2.width();
                    } else if ($tile3.length) {
                        tile_base_height = $tile3.width();
                    } else if ($tile4.length) {
                        tile_base_height = $tile4.width();
                    } else if ($tile5.length) {
                        tile_base_height = $tile5.width();
                    }
                    //calculate each tiles height size
                    $tile1.height(tile_base_height);
                    $tile2.height(tile_base_height / 2);
                    $tile3.height(tile_base_height * 2);
                    $tile4.height(tile_base_height);
                    $tile5.height(tile_base_height);
                }
                else {//if media query max-width > 380
                    //calculate tile base height
                    if ($tile1.length) {
                        tile_base_height = $tile1.width();
                    } else if ($tile2.length) {
                        tile_base_height = Math.floor($tile2.width() / 2);
                    } else if ($tile3.length) {
                        tile_base_height = $tile3.width();
                    } else if ($tile4.length) {
                        tile_base_height = Math.floor($tile4.width() / 2);
                    } else if ($tile5.length) {
                        tile_base_height = Math.floor($tile5.width() / 2);
                    }
                    //calculate each tiles height size
                    $tile1.height(tile_base_height);
                    $tile2.height(tile_base_height);
                    $tile3.height(tile_base_height * 2);
                    $tile4.height(tile_base_height * 2);
                    $tile5.height(tile_base_height * 2);
                }

                $masonry_tiles_container.isotope({
                    masonry: {
                        columnWidth: '.tile:last-child'
                    }
                });

            });
            $window.resize(layout_base_resize);

            // //hover color size
            // $tiles_inner.find('.tile').each(function () {
            //     var hover_bg_color = $(this).find('.tile-caption').data('hover-bg-color');
            //     var hover_color = $(this).find('.tile-caption').data('hover-color');

            //     $(this).find('.caption-wrapper').css('background-color', hover_bg_color);
            //     $(this).find('.separator').css('background-color', hover_color);

            //     $(this).find('h1').css('color', hover_color);
            //     $(this).find('.caption-content > div').css('color', hover_color);
            //     $(this).find('a').css('color', hover_color);

            //     $(this).find('.caption-content').css('border-color', hover_color);
            // });

            //init masonry
            if ($tiles_inner.length > 0) {
                var $masonry_tiles_container = $tiles_inner.isotope({
                    resizable: false, // disable normal resizing
                    masonry: {
                        columnWidth: '.tile:last-child',
                        gutter: 0,
                        layoutMode: 'masonry'
                    }
                });

                // update columnWidth on window resize
                $window.resize(layout_base_resize);
            }

            $preloader.hide();
        });
    };
});


