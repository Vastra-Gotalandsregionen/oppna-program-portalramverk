/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Toggle additional info in search results.
 * @requires YUI
 */
VGR.moduleSearchHits = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sContId:'module-search-hits',
		sMoreInfoText:'Mer information',
		sTriggerEl:'dd',
		sInfoClass:'info',
		sMoreInfoClass:'more-info',
		sLinkClass:'info-toggle',
		sHiddenClass:'hidden'
	};
	/**
	 * Loop through the search results, insert trigger elements, and set up
	 * event handlers by using the class VGR.Toggle.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(config.sContId);
		if (!oCont) { return; }
		YUD.addClass(YUD.getElementsByClassName(config.sMoreInfoClass), config.sHiddenClass);
		var arrInfo = YUD.getElementsByClassName(config.sInfoClass, config.sTriggerEl, oCont);
		var oInfo;
		var oMoreInfo;
		var oTrigger;
		var arrTogglers = [];
		for (var i=0, l=arrInfo.length; i<l; i++) {
			oInfo = arrInfo[i];
			if (YUD.hasClass(YUD.getNextSibling(oInfo), config.sMoreInfoClass)) {
				oMoreInfo = YUD.getNextSibling(oInfo);
				oTrigger = document.createElement('span');
				oTrigger.className = config.sLinkClass;
				oTrigger.title = config.sMoreInfoText;
				oTrigger.appendChild(document.createTextNode(config.sMoreInfoText));
				oInfo.insertBefore(oTrigger, YUD.getFirstChild(oInfo));
				arrTogglers.push(new VGR.Toggler(oTrigger, oMoreInfo, {bAnimated:true}));
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
	VGR.moduleSearchHits.init();
});