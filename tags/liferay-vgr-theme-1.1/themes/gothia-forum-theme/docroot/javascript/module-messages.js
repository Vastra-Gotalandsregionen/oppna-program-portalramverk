/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Initialises VGR.accordion for the messages module.
 * Marks messages as read/unread when they are toggled and saves the state in a cookie.
 * @requires YUI
 */
VGR.moduleMessages = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	/**
	 * Looks for messages whose URL contains a file name stored in a cookie,
	 * and sets the class of their containing li to "read".
	 */
	function markAsRead(oCont) {
		var arrRead;
		var arrUnread = YUD.getElementsByClassName('unread', '*', oCont);
		var oUnread;
		var strHref;
		var strFileName;
		var strCookie = VGR.cookies.getCookie('readEmail');
		for (var i=0, l=arrUnread.length; i<l; i++) {
			oUnread = arrUnread[i];
			if (strCookie) {
				strHref = oUnread.getElementsByTagName('a')[0].href;
				strFileName = strHref.substring(strHref.lastIndexOf('/') + 1);
				if (strCookie.indexOf(strFileName) !== -1) {
					YUD.replaceClass(oUnread, 'unread' , 'read');
				}
			}
			// Update the cookie when a message is clicked.
			YUE.addListener(oUnread, 'click', function() {
				var strHref = this.getElementsByTagName('a')[0].href;
				var strFileName = strHref.substring(strHref.lastIndexOf('/') + 1);
				var strCookie = VGR.cookies.getCookie('readEmail');
				if (strCookie) {
					if (strCookie.indexOf(strFileName) === -1) {
						VGR.cookies.setCookie('readEmail', strCookie + ',' + strFileName, 1, '/');
					}
				}
				else {
					VGR.cookies.setCookie('readEmail', strFileName, 1, '/');
				}
			});
		}
	}
	/**
	 * Hides the submit-area element that contains the submit button used when JavaScript is off.
	 * Initialises VGR.accordion for this module.
	 */
	function init() {
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById('module-messages');
		if (!oCont) { return; }
		YUD.addClass(oCont, 'accordion');
		YUD.addClass(YUD.getElementsByClassName('submit-area','*',oCont)[0], 'hidden');
		markAsRead(oCont);
		VGR.accordion.init('module-messages', {bAnimated:false});
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
	VGR.moduleMessages.init();
});