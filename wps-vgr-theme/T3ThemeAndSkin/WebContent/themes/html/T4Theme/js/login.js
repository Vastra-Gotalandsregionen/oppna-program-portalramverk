/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Create a very simple (and completely insecure) login function.
 * @requires YUI
 */
VGR.prototypeLogin = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	function checkLogin(e) {
		YUE.preventDefault(e);
		var sName = this.name.value;
		switch (sName) {
			case 'annie':
				this.action = 'profil_annie/index.html';
				break;
		 	case 'leif':
				this.action = 'profil_leif/index.html';
				break;
			case 'lena':
				this.action = 'profil_lena/index.html';
				break;
			case 'leo':
				this.action = 'profil_leo/index.html';
				break;
			case 'per':
				this.action = 'profil_per/index.html';
				break;
		 	case 'sara':
				this.action = 'profil_sara/index.html';
				break;
			default:
				alert("Fel inloggningsuppgifter.");
				return;
		}
		this.submit();
	}
	function init() {
		if (!VGR.browserOK) { return; }
		var loginForm = document.getElementById('loginform');
		if (!loginForm) { return; }
		YUE.addListener(loginForm, 'submit', checkLogin);
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
	VGR.prototypeLogin.init();
});