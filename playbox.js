/*
     Project    : PlayBox  HTML, CSS, Javascript
     Description: This library helps to displays images and videos by filling the screen, and dimming out the web page
     Created by : K. Deepak Kumar
     Contact at : deepakplay14@gmail.com
*/

// IIFE Function Execution
"use strict";

const PlayBox = (function(){
    (function(){
        var style = document.createElement('style');
        style.innerHTML = ` 
            .playbox *{
                margin:0px;
                border:0px;
                padding:0px;
                box-sizing:border-box;
            }

            .playbox{
                position:fixed; 
                top:0;
                left:0;
                width:100%;
                height:100%;
                z-index:1000;
                overflow:auto;
                background-color:rgba(0,0,0,.6);
                display:none;
            }
                        
            .playbox .exit{
                position:absolute;
                top:10px;
                right:10px;
                font-size:2.5rem;
                color:#FFF;
                width:40px;
                height:40px;
                overflow:hidden;
                cursor:pointer;
                text-align:center;
                line-height:40px;
                background-color:rgb(255,0,0);
                font-family: "Times New Roman", Times, serif;
                border-radius:50%;
                z-index:10;
            }

            .playbox .exit::selection {
                color: none;
                background: none;
            }
                        
            .playbox .container{
                position:relative;
                top:100px;
                width:95%;
                min-height:200px;
                background-color:#FFF;
                box-shadow:0 0 5px rgba(0,0,0,.5);
                margin:0 auto 50px;
                max-width:800px;
                padding:30px 20px;
                border-radius:4px;
            }
                        
            @media (max-width:700px){
                .playbox .container{
                    top:65px;
                    width:92%;
                }
            
                .playbox .exit{
                    top:8px;
                    right:8px;
                    width:30px;
                    height:30px;
                    font-size:2rem;
                    line-height:28px;
                }
            }

            @keyframes slideIn{
                0% {transform:translateY(-50px);}
                100%{transform:translateY(0);}
            }

            @keyframes slideOut{
                0% {transform:translateY(0);}
                100%{transform:translateY(-50px);}
            }

            @keyframes fadeIn{
                0% {opacity:0;}
                100%{opacity:1;}
            }
                        
            @keyframes fadeOut{
                0% {opacity:1;}
                100%{opacity:0;}
            }
        `
        document.getElementsByTagName('head')[0].appendChild(style);
    })();

    /*var fadeIn = function(element, duration, myfun= ()=>{}){
        const updateInterval = 30;
        element  = getElement(element);
        element.style.opacity = 0;
        element.style.display = 'block';
        let current = updateInterval;
        let animation = setInterval(function(){
            element.style.opacity = current/duration;
            current += updateInterval;
            if(current>duration){
                element.style.opacity = 1;
                clearInterval(animation);
                myfun();
            }
        }, updateInterval);
    }
    
    var fadeOut = function(element, duration, myfun= ()=>{}){
        const updateInterval = 30;
        element  = getElement(element);
        element.style.opacity = 1;
        element.style.display = 'block';
        let current = updateInterval;
        let animation = setInterval(function(){
            element.style.opacity = 1-(current/duration);
            current += updateInterval;
            if(current>duration){
                element.style.opacity = 0;
                clearInterval(animation);
                myfun();
                element.style.display = 'none';
            }
        }, updateInterval);
    }*/
    
    var getElement = function(element){
        if(!(element instanceof Element)){
            return document.querySelector(element);
        }
        return element;
    }

    var fadeIn = function(element, duration, myfun=()=>{}){
        element = getElement(element);
        element.setAttribute("style", `display:block; animation: fadeIn ${duration}ms ease;`);
        element.querySelector('.container').setAttribute("style", `animation: slideIn ${duration}ms ease;`);
        setTimeout(function(){
            myfun();
        },duration);
    }

    var fadeOut = function(element, duration, myfun=()=>{}){
        element = getElement(element);
        element.setAttribute("style", `display:block; opacity:0; animation:fadeOut ${duration}ms ease`);
        element.querySelector('.container').setAttribute("style", `animation: slideOut ${duration}ms ease;`);
        setTimeout(function(){
            element.setAttribute("style", "display:none;");
            myfun();
        },duration);
    }
    
    var click = function(element, clickFunction){
        element  = getElement(element);
        element.addEventListener('click',clickFunction);
    }

    var prepend = function(element, html){
        element  = getElement(element);
        element.insertAdjacentHTML('afterbegin',html);
    }

    var hasClass = function(element, classname){
        return getElement(element).classList.contains(classname);
    }

    return function(boxButton, boxTarget, enter=300, exit=300){
        prepend(boxTarget, '<div class="exit">&times;</div>')
        
        // Open PlayBox
        click(boxButton, function(event){
            fadeIn(boxTarget, enter);
            event.preventDefault();
        })
    
        // Add Event handlers to the PlayBox
        click(boxTarget, function(event){
            if(hasClass(event.target, 'exit')){
                fadeOut(boxTarget, exit);
            }          
       });
    }
})();