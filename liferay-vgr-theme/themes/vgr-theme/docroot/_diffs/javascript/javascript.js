//http://www.learningjquery.com/2009/02/slide-elements-in-different-directions
jQuery(document).ready(

/*
 * This function gets loaded when all the HTML, not including the portlets, is loaded.
 */
function() {
  var hideSlide = jQuery.cookie('hideSlide');
  
  toggleNotifications(hideSlide=='true');
  
  jQuery('#slide-buttons #hide').click(function() {
    toggleNotifications(true)
  });
  jQuery('#slide-buttons #show').click(function() {
    toggleNotifications(false)
  });
  
});

function toggleNotifications(hide) {
  var $main = jQuery('#main-container');
  var $slide = jQuery('#slide-container');
  $slide.animate({
    right: hide ? -$slide.outerWidth() : 0
  });
  $main.animate({
    width: hide ? "100%" : "80%"
  });
  jQuery('#slide-buttons #hide').css("display", hide ? "none" : "inline");
  jQuery('#slide-buttons #show').css("display", hide ? "inline" : "none");
  jQuery.cookie('hideSlide', hide);
}

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
        loadjscssfile("/vgr-theme/javascript/yui/yahoo-min.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/utilities.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/yahoo-dom-event.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/element-beta-min.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/container-min.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/tabview-min.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/calendar-min.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/connection.js", "js");
        loadjscssfile("/vgr-theme/javascript/yui/event-min.js", "js");
        loadjscssfile("/vgr-theme/javascript/login.js", "js");
        loadjscssfile("/vgr-theme/javascript/vgr.global.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-address-book.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-calendar-full.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-calendar.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-calendars.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-messages.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-profile.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-search-filter.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-search-hits.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-todos-latest.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-todos.js", "js");
        loadjscssfile("/vgr-theme/javascript/module-tracker.js", "js");
        loadjscssfile("/vgr-theme/javascript/jquery.cookie.js", "js");
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
