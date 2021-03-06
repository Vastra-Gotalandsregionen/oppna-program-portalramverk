jQuery(document).ready(

/*
 * This function gets loaded when all the HTML, not including the portlets, is loaded.
 */
function() {
});

Liferay.Portlet.ready(

/*
 * This function gets loaded after each and every portlet on the page.
 * 
 * portletId: the current portlet's id jQueryObj: the jQuery wrapped object of the current portlet
 */

function(portletId, jQueryObj) {
});

jQuery(document).last(

/*
 * This function gets loaded when everything, including the portlets, is on the page.
 */
function() {
    // Load custom VGR scripts
        loadjscssfile("/gothia-forum-theme/javascript/yui/yahoo-min.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/utilities.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/yahoo-dom-event.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/element-beta-min.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/container-min.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/tabview-min.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/calendar-min.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/connection.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/yui/event-min.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/login.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/gothia-forum.global.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-address-book.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-calendar-full.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-calendar.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-calendars.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-messages.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-profile.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-search-filter.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-search-hits.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-todos-latest.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-todos.js", "js");
        loadjscssfile("/gothia-forum-theme/javascript/module-tracker.js", "js");
    });

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { // if filename is a external JavaScript file
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css") { // if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
