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
        $element.css({'display': 'block', 'opacity': '1', 'animation': 'fadeIn ' + duration + 'ms ease'});
        $element.find('.container').css({'animation': 'slideIn ' + duration + 'ms ease'});
        setTimeout(function () {
            callback();
        }, duration);
    }

    function fadeSlideOut($element, duration, callback=function () {})
    {
        $element.css({'display': 'block', 'opacity': '0', 'animation': 'fadeOut ' + duration + 'ms ease'});
        $element.find('.container').css({'animation': 'slideOut ' + duration + 'ms ease'});
        setTimeout(function () {
            $element.css({'display': 'none'});
            callback();
        }, duration);
    }

    $.fn.playbox = function ($boxTarget, options) {
        // State Management through HashMap
        const state = new Map();
        const o = $.extend({
            'enter': 300,
            'exit': 300,
            'slideIn': 1000,
            'slideOut': 100,
            'imageList': []
        }, options);

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

                return false;
            });

            // Add Event handlers to the PlayBox
            $boxTarget.click(function (e) {
                if ($(e.target).hasClass('exit')) {
                    fadeSlideOut($boxTarget, exit);
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

            // Active Image
            const $imgListElement = $boxTarget.find('.image-list');

            // Adding Image to the list
            o['imageList'].forEach(function (item) {
                $imgListElement.append($('<img>', {'src': item}));
            });

            const $imgList = $imgListElement.children();
            // Active Image
            setActive = function (index) {
                $imgList.eq(state.get($boxTarget)).removeClass('active');
                $imgList.eq(index).addClass('active');

                const $image = $boxTarget.find('.bg-image');

                $image.fadeOut(o['slideOut'], function () {
                    $image.attr('src', o['imageList'][index]);
                    $image.fadeIn(o['slideIn']);
                });
                state.set($boxTarget, index);
            }

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
            //Item List Click Handler
            $imgListElement.click(function (e) {
                const $target = $(e.target);

                if ($target.is('img')) {
                    setActive($target.index());
                }
            });

            return $result;
        }
    };
}(jQuery));