//Skeleton code from a class I was in
/* Copyright (c) 2018 MIT 6.813/6.831 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */


//constants


// Holds DOM elements that don’t change, to avoid repeatedly querying the DOM
var dom = {};


// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
    // Final initalization entry point: the Javascript code inside this block
    // runs at the end of start-up when the DOM is ready
    "DOMContentLoaded": function () {

        //code here

        // Element refs go here (Probs won't need)


        // Add events
        //Util.one("#buttonIDhere").addEventListener("click", { /* Your code here */ }); // example

    },


    // Click events arrive here
    "click": function (evt) {
        // code


    },

    //Input events arrive here
    "input": function(evt) {

    }

});

function searchClick() {
    window.location.href ="./question.html"
}

