/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Turn a specific set of elements into a tab widget.
 * @requires YUI
 */
VGR.moduleCalendar = function() {
	var YUD = YAHOO.util.Dom;
	var config = {
		sContId:'module-calendar',
		sHiddenClass:'hidden',
		sTabClass:'tab',
		sTabElement:'div',
		sTabHeaderElement:'h3',
		sTabContentClass:'tab-bd',
		sTabContentElement:'div'
	};
	function init() {
		if (!VGR.browserOK) { return; }
		var oCont = YUD.get(config.sContId);
		if (!oCont) { return; }
		// Add tabs
		var tabView = new YAHOO.widget.TabView();
		var modules = YUD.getElementsByClassName(config.sTabClass, config.sTabElement, oCont);
		YUD.batch(modules, function(module) {
			tabView.addTab(new YAHOO.widget.Tab({
				label: module.getElementsByTagName(config.sTabHeaderElement)[0].innerHTML,
				contentEl: YUD.getElementsByClassName(config.sTabContentClass, config.sTabContentElement, module)[0]
			}));
			// Hide modules
			YUD.addClass(module, config.sHiddenClass);
		});
		// Make the first tab active
		tabView.set('activeIndex', 0);
		tabView.appendTo(oCont);
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
	VGR.moduleCalendar.init();
	VGR.ajaxDialog.init('module-calendar');
});