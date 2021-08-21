# PlayBox JS
PlayBox is a JavaScript library created by Deepak Kumar, This library helps to displays HTML, image slider by filling the screen and dimming out the web page. 

This modified PlayBox Library uses jQuery, and doesn't contain any polyfill function.

> #### Visit : [Original PlayBox JS Demo](https://www.deepakplay.com/playbox_js_demo/)

## Getting Started 
Download the Latest version of PlayBox from the GitHub release page 

> Download from: [PlayBox GitHub Release](https://github.com/CheJam/playbox-js/releases)


## How to use

1. Include the `playbox.js` and `playbox.css` into your document.

    ```
    <link rel="stylesheet" href="playbox.css">
    <script src='playbox.js'></script>
    ```

2. Create a `div` tag in the body section mentioned below.

    ### **HTML PlayBox**
    ```
        <div class="playbox">
            <div class="container">
                ...
                ...
                ...
            </div>
        </div>

        <button class="buttonName">Click Me</button>

        <script type="text/javascript">
            $('.buttonName').playbox($('.playbox'), {
                'enter': 200,
                'exit': 300
            });
        </script>
    ```

    ### **Image Slider PlayBox**
    ```
        <div class="playboximage">
            ...
            ... <!-- If you like your other elements here -->            
            ...
        </div>

        <button class="buttonName">Click Me</button>
        <button data-playbox-img="2">Open image 3</button>

        <script type="text/javascript">
            $('.buttonName').playbox($('.playbox'), {
                'slideIn': 200,
                'slideOut': 300,
                'enter': 400,
                'exit': 500,
                'imageList': [
                    'image1.jpg',
                    'image2.jpg',
                    'image3.jpg'
                ]
            });
        </script>
    ```

## Options

|Option     |Type           |Default|Description                                  |
|-----------|---------------|-------|---------------------------------------------|
|`enter`    |integer        |`300`  |`fadeIn` animation duration in milliseconds  |
|`exit`     |integer        |`300`  |`fadeOut` animation duration in milliseconds |
|`slideIn`  |integer        |`1000` |`slideIn` animation duration in milliseconds |
|`slideOut` |integer        |`100`  |`slideOut` animation duration in milliseconds|
|`imageList`|array of string|`[]`   |Array of links to gallery images             |

## Attributes

|Attribute         |Type   |Default    |Description                                                                                           |
|------------------|-------|-----------|------------------------------------------------------------------------------------------------------|
|`data-playbox-img`|integer|`undefined`|If an array of image links is specified, set the active image by array index after showing the gallery|