//http://www.learningjquery.com/2009/02/slide-elements-in-different-directions
jQuery(document).ready(

    /*
     * This function gets loaded when all the HTML, not including the portlets, is loaded.
     */
        function() {
            var hideSlide = jQuery.cookie('hideSlide');

            toggleNotifications(hideSlide == 'true');

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

