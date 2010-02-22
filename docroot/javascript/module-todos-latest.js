/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Toggle todo items on and off. Save their state in a cookie.
 * @requires YUI
 */
VGR.moduleTodosLatest = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	/**
	 * Toggle the clicked todo item's state. Set a cookie to indicate whether it is checked or not.
	 */
	function toggle() {
		var oLi = this.parentNode;
		var sID = this.id;
		if (YUD.hasClass(oLi,'done')) {
			VGR.cookies.setCookie('doneTodo' + sID, 'false', 1, '/');
			YUD.removeClass(oLi, 'done');
		} else {
			VGR.cookies.setCookie('doneTodo' + sID, 'true', 1, '/');
			YUD.addClass(oLi, 'done');
		}
	}
	/**
	 * Look for TODOs whose id contains a name stored in a cookie
	 * and sets the class of their containing li to "done".
	 * Executed on page load.
	 */
	function markAsDone(oCont) {
		var arrTodos = YUD.getElementsByClassName('todo', '*', oCont);
		var oTodo;
		var oLi;
		var sID;
		var sCookie;
		for (var i=0, l=arrTodos.length; i<l; i++) {
			oTodo = arrTodos[i];
			oLi = oTodo.parentNode;
			sID = oTodo.id;
			sCookie = VGR.cookies.getCookie('doneTodo' + sID);
			if (sCookie === 'true') {
				YUD.replaceClass(oLi, 'todo' , 'done');
				oTodo.checked = true;
			} else if (sCookie) {
				YUD.replaceClass(oLi, 'done' , 'todo');
				oTodo.checked = false;
			}
		}
	}
	/**
	 * Initialises the function and sets up event handlers.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById('module-todos-latest');
		if (!oCont) { return; }
		var arrInputs = oCont.getElementsByTagName('input');
		for (var i=0, l=arrInputs.length; i<l; i++) {
			YUE.addListener(arrInputs[i],'click',toggle);
		}
		YUD.addClass(YUD.getElementsByClassName('submit-area','*',oCont)[0], 'hidden');
		markAsDone(oCont);
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
	VGR.moduleTodosLatest.init();
});