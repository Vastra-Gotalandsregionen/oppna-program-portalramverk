/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Display only certain parts of the search result list.
 * @requires YUI
 */
VGR.filterSearch = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sShowAllClass:'cat-all',
		sHiddenClass:'hidden',
		sHitsContainer:'module-search-hits',
		sFilterContainer:'module-search-filter'
	};
	/**
	 * Find the search hits that match the activated filter's class and display them.
	 * Hide all other search hits.
	 */
	function filter(e) {
		YUE.preventDefault(e);
		var sCategory = this.parentNode.className;
		var oHitsContainer = document.getElementById(config.sHitsContainer);
		var tagNames = ['h3','dl','dt','dd'];
		var tag;
		var tags;
		for (var i=0, l=tagNames.length; i<l; i++) {
			tags = oHitsContainer.getElementsByTagName(tagNames[i]);
			for (var j=0, l2=tags.length; j<l2; j++) {
				tag = tags[j];
				if (sCategory === config.sShowAllClass) {
					YUD.removeClass(tag, config.sHiddenClass);
				}
				else {
					if (YUD.hasClass(tags[j],sCategory) && !(YUD.hasClass(tags[j], 'more-info'))) {
						YUD.removeClass(tag, config.sHiddenClass);
					}
					else {
						YUD.addClass(tag, config.sHiddenClass);
					}
				}
			}
		}
	}
	/**
	 * Set up event handlers for filter links.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		var oFilterContainer = document.getElementById(config.sFilterContainer);
		var oHitsContainer = document.getElementById(config.sHitsContainer);
		if (!oFilterContainer || !oHitsContainer) { return; }
		var arrFilters = oFilterContainer.getElementsByTagName('li');
		var oFilter;
		for (var i=0, l=arrFilters.length; i<l; i++) {
			oFilter = arrFilters[i].getElementsByTagName('a')[0];
			if (oFilter) {
				YUE.addListener(oFilter, 'click', filter);
			}
		}
	}
	return {
		init:init
	};
}();

/**
 * Initialise scripts when the DOM is ready
 * @requires YAHOO.util.Event
 * @requires VGR
 */
YAHOO.util.Event.onDOMReady(function() {
	VGR.filterSearch.init();
});