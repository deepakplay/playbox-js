/*
     Project    : PlayBox  HTML, CSS, Javascript (jQuery version)
     Description: This library helps to displays HTML, image slider by filling the screen and dimming out the web page.
     Created by : K. Deepak Kumar
     Contact at : deepakplay14@gmail.com
     Licence    : MIT License

     Modified by: Sergey Shugaev
*/

"use strict";
(function ($) {
    function fadeSlideIn($element, duration=100, callback=function () {})
    {
        $element.removeClass('playbox-fade-out');
        $element.css({'display': '', 'animation': 'fadeIn ' + duration + 'ms ease'});
        $element.addClass('playbox-fade-in');
        $element.find('.container').css({'animation': 'slideIn ' + duration + 'ms ease'});
        setTimeout(function () {
            callback();
        }, duration);
    }

    function fadeSlideOut($element, duration, callback=function () {})
    {
        $element.removeClass('playbox-fade-in');
        $element.css({'display': '', 'animation': 'fadeOut ' + duration + 'ms ease'});
        $element.addClass('playbox-fade-out');
        $element.find('.container').css({'animation': 'slideOut ' + duration + 'ms ease'});
        setTimeout(function () {
            $element.css({'display': 'none'});
            callback();
        }, duration);
    }

    $.fn.playbox = function ($boxTarget, options) {
        // State Management through HashMap
        const state = new Map();
        // Options
        const o = $.extend({
            'enter': 300,
            'exit': 300,
            'slideIn': 1000,
            'slideOut': 100,
            'imageList': []
        }, options);
        // Keyboard navigation
        const keyboardHandler = function (e) {
            switch (e.keyCode) {
                case 27:    // Escape
                    $boxTarget.find('.exit').click();
                    break;
                case 37:    // Left
                    $boxTarget.find('.leftarrow').click();
                    break;
                case 39:    // Right
                    $boxTarget.find('.rightarrow').click();
                    break;
                default:
                    break;
            }
        };
        let setActive = function (index) {};

        function loadBox($boxButton, $boxTarget, enter, exit)
        {
            // Open PlayBox
            $boxButton.click(function (e) {
                const imageId = $(e.target).data('playbox-img');

                fadeSlideIn($boxTarget, enter);
                if (typeof imageId !== 'undefined') {
                    setActive(imageId);
                }

                $boxTarget.closest('body').on('keydown', keyboardHandler);

                return false;
            });

            // Add Event handlers to the PlayBox
            $boxTarget.click(function (e) {
                if ($(e.target).hasClass('exit')) {
                    fadeSlideOut($boxTarget, exit);
                    $boxTarget.closest('body').off('keydown', keyboardHandler);
                }
            });
        }

        $boxTarget.prepend($('<div>', {'class': 'exit', 'text': '×'}));
        if (o['imageList'].length === 0) {
            // PlayBox Open
            return this.each(function () {
                loadBox($(this), $boxTarget, o['enter'], o['exit']);
            });
        } else {
            // PlayBox Image Slider
            $boxTarget.prepend(
                $('<div>', {'class': 'container'}).append(
                    $('<span>', {'class': 'leftarrow arrow', 'text': '<'}),
                    $('<img>', {'class': 'bg-image'}),
                    $('<span>', {'class': 'rightarrow arrow', 'text': '>'}),
                ),
                $('<div>', {'class': 'image-list'})
            );

            const $result = this.each(function () {
                loadBox($(this), $boxTarget, o['enter'], o['exit']);
            });

            state.set($boxTarget, 0);
            // Image list container
            const $imgListElement = $boxTarget.find('.image-list');

            // Adding Image to the list
            o['imageList'].forEach(function (item) {
                $imgListElement.append($('<img>', {'src': item}));
            });
            // Active Image
            setActive = function (index) {
                const $image = $boxTarget.find('.bg-image');

                $image.fadeOut(o['slideOut'], function () {
                    $image.attr('src', o['imageList'][index]);
                    $image.fadeIn(o['slideIn']);
                });
                state.set($boxTarget, index);
                $imgListElement.trigger('to.owl.carousel', [index]);
            }
            $imgListElement.owlCarousel({
                center: true,
                autoWidth: true,
                loop: true,
                rewind: false,
                margin: 10,
                dots: false,
                onDragged: function (e) {
                    const carousel = $imgListElement.data('owl.carousel');

                    setActive(carousel.relative(e.item.index));
                }
            });

            setActive(0);
            // Item List Arrow Click Handler function
            $boxTarget.click(function (e) {
                const $target = $(e.target);

                if ($target.hasClass('leftarrow')) {
                    if (state.get($boxTarget) - 1 < 0) {
                        setActive(o['imageList'].length - 1);
                    } else {
                        setActive(state.get($boxTarget) - 1);
                    }
                } else if ($target.hasClass('rightarrow')) {
                    if (state.get($boxTarget) + 1 >= o['imageList'].length) {
                        setActive(0);
                    } else {
                        setActive(state.get($boxTarget) + 1);
                    }
                }
            });
            // Item List Click Handler
            $imgListElement.click(function (e) {
                const $target = $(e.target);
                const carousel = $imgListElement.data('owl.carousel');

                if ($target.is('img')) {
                    setActive(carousel.relative($target.parent().index()));
                }
            });

            return $result;
        }
    };
}(jQuery));