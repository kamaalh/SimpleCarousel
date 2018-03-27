// JavaScript Document
"use strict";

var jsonObj, slideIndex = 0, slideImg;


function initCarousal() {
    var i, li_in;
    slideImg = document.createElement('img');
    document.getElementById('content').appendChild(slideImg);
    slideImg.setAttribute("src", jsonObj.imagePath[slideIndex]);


    //create indicator
    for (i = 0; i < jsonObj.imagePath.length; i++) {
        li_in = document.createElement("li");
        document.getElementById("indicator").appendChild(li_in);
        li_in.setAttribute("id", "li_" + (i + 1));
        li_in.addEventListener('click', function (event) {
            var targetId = event.target.id;
            slideIndex = targetId.split('_')[1] - 1;
            showSlide();
        });
    }
    document.querySelector("#li_" + (slideIndex + 1)).setAttribute("class", "active");

    //setting interval for slide change
    setInterval(function () {
        slideIndex++;
        if (slideIndex === jsonObj.imagePath.length) {
            slideIndex = 0;
        }
        showSlide();
    }, 2000);
}

function showSlide() {
    slideImg.setAttribute("src", jsonObj.imagePath[slideIndex]);
    document.querySelector('.active').setAttribute("class", "");
    document.querySelector('#li_' + (slideIndex + 1)).setAttribute("class", "active");
}


function loadJSON() {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/slider.json', false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            jsonObj = JSON.parse(xobj.responseText);
            initCarousal();
        }
    };
    xobj.send(null);
}

function next() {
    if (slideIndex < jsonObj.imagePath.length - 1) {
        slideIndex++;
        showSlide();
    }
}


function Prevoius() {
    if (slideIndex > 0) {
        slideIndex--;
        showSlide();
    }
}


/*
function pager() {

    for (i = 0; i < jsonObj.imagePath.length; i++) {
        var li = document.createElement("li");
        var pageNumber = document.createTextNode(i + 1);
        li.appendChild(pageNumber);
        document.getElementById("paging").appendChild(li);
        var id = li.setAttribute("id", (i + 1));

        li.addEventListener('click', function (event) {
            var targetSrc = event.target.id;
            src = slideImg.setAttribute("src", jsonObj.imagePath[targetSrc - 1]);
        });
    }

}
*/
//window.onload = pager();


