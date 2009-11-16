/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Sets up functionality to move options between two multiple select elements.
 * @requires YUI
 */
VGR.updateOptions = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sSelect1Id:'lang1',
		sSelect2Id:'lang2',
		sButton1Id:'add-lang',
		sButton2Id:'remove-lang'
	};
	/**
	 * Adds an option element to a select element.
	 * @param {Object} theSel The select element.
	 * @param {String} theText The text of the new option element.
	 * @param {String} theValue The value of the new option element.
	 */
	function addOption(theSel, theText, theValue) {
		var newOpt = new Option(theText, theValue);
		var selLength = theSel.length;
		theSel.options[selLength] = newOpt;
	}
	/**
	 * Deletes an option element from a select element.
	 * @param {Object} theSel The select element.
	 * @param {Integer} theText The index of the option element to delete.
	 */
	function deleteOption(theSel, theIndex) { 
		var selLength = theSel.length;
		if(selLength>0) {
			theSel.options[theIndex] = null;
		}
	}
	/**
	 * Moves selected option elements from one select element to another.
	 * @param {Object} theSelFrom The select element to move from.
	 * @param {Object} theSelTo The select element to move from.
	 */
	function moveOptions(theSelFrom, theSelTo) {
		var selectedText = [];
		var selectedValues = [];
		var selectedCount = 0;
		var oOption;
		// Find the selected Options in reverse order
		// and delete them from the 'from' Select.
		for (var i=theSelFrom.length-1; i>=0; i--) {
			oOption = theSelFrom.options[i];
			if(oOption.selected) {
				selectedText[selectedCount] = oOption.text;
				selectedValues[selectedCount] = oOption.value;
				deleteOption(theSelFrom, i);
				selectedCount++;
			}
		}
		// Add the selected text/values in reverse order.
		// This will add the Options to the 'to' Select
		// in the same order as they were in the 'from' Select.
		for (i=selectedCount-1; i>=0; i--) {
			addOption(theSelTo, selectedText[i], selectedValues[i]);
		}
	}
	/**
	 * Sets up event handlers.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		// Check that the required elements exist
		var addLang = document.getElementById(config.sButton1Id);
		var removeLang = document.getElementById(config.sButton2Id);
		if (!addLang || !removeLang) { return; }
		YUE.addListener(addLang, 'click', function() {
			moveOptions(this.form[config.sSelect1Id], this.form[config.sSelect2Id]);
		});
		YUE.addListener(removeLang, 'click', function() {
			moveOptions(this.form[config.sSelect2Id], this.form[config.sSelect1Id]);
		});
	}
	return {
		init:init,
		moveOptions:moveOptions
	};
}();

/**
 * Initialise scripts when the DOM is ready
 * @requires YAHOO.util.Event
 * @requires VGR
 */
YAHOO.util.Event.onDOMReady(function() {
	if (!VGR.browserOK) { return; }
	var YUD = YAHOO.util.Dom;
	// Initialise modal dialogs
	VGR.ajaxDialog.init('module-profile-1', {sDialogInit:VGR.updateOptions.init});
	VGR.ajaxDialog.init('module-profile-3', {sDialogInit:null});
	// Initialise togglable elements
	var oCont = document.getElementById('module-profile');
	var oTriggers = YUD.getElementsByClassName('foldable', 'h2', oCont);
	var arrTogglers = [];
	var oTrigger;
	var oFoldable;
	for (var i=0, l=oTriggers.length; i<l; i++) {
		oTrigger = oTriggers[i];
		oFoldable = YUD.getNextSibling(oTrigger);
		arrTogglers.push(new VGR.Toggler(oTriggers[i], oFoldable, {bAnimated:true}));
	}
});