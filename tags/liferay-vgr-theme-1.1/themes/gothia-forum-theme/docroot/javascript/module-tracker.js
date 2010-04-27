/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Expand and collapse more info for tracked items.
 * Enables delete/undo delete of tracked items.
 * @requires YUI
 * @requires VGR.Toggler
 */
VGR.moduleTracker = function() {
	var config = {
		sHiddenClass:'hidden',
		sContainerId:'module-tracker',
		sMoreInfoClass:'more-info',
		sRemoveClass:'remove',
		sRemoveText:'Ta bort',
		sUndoClass:'undo',
		sUndoText:'Ångra',
		sDeletedClass:'faded'
	};
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var YUC = YAHOO.util.Connect;
	var oCont;
	/**
	 * Toggle trackers to deleted (undoable) state or normal state.
	 * This needs to communicate with the server.
	 */
	function toggleTracker(el) {
		var oSpan = el.getElementsByTagName('span')[0];
		if (!oSpan) { return; }
		if (YUD.hasClass(el, config.sRemoveClass)) {
			YUD.removeClass(el, config.sRemoveClass);
			YUD.addClass(el, config.sUndoClass);
			YUD.addClass(el.parentNode.parentNode, config.sDeletedClass);
			oSpan.innerHTML = config.sUndoText;
		}
		else {
			YUD.addClass(el, config.sRemoveClass);
			YUD.removeClass(el, config.sUndoClass);
			YUD.removeClass(el.parentNode.parentNode, config.sDeletedClass);
			oSpan.innerHTML = config.sRemoveText;
		}
	}
	/**
	 * Initialise toggling of more info.
	 * Initialise tracker delete function.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		oCont = document.getElementById(config.sContainerId);
		if (!oCont) { return; }
		// Enable toggling of more info
		var arrMoreInfo = YUD.getElementsByClassName(config.sMoreInfoClass, '*', oCont);
		var oMoreInfo;
		var oTrigger;
		var arrTogglers = [];
		for (var i=0, l=arrMoreInfo.length; i<l; i++) {
			oMoreInfo = arrMoreInfo[i];
			oTrigger = oMoreInfo.parentNode.getElementsByTagName('em')[0];
			if (!oTrigger) { continue; }
			YUD.addClass(oMoreInfo, config.sHiddenClass);
			arrTogglers.push(new VGR.Toggler(oTrigger, oMoreInfo));
		}

		// Enable removal of trackers
		var arrRemoveButtons = YUD.getElementsByClassName(config.sRemoveClass, 'button', oCont);
		var oRemoveButton;
		for (var i=0, l=arrRemoveButtons.length; i<l; i++) {
			oRemoveButton = arrRemoveButtons[i];
			YUE.addListener(oRemoveButton, 'click', function(e) {
				YUE.preventDefault(e);
				toggleTracker(this);
			});
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
	VGR.moduleTracker.init();
	VGR.ajaxDialog.init('module-tracker');
});