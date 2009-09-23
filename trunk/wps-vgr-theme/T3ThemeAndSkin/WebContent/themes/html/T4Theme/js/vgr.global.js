/**
 * @fileoverview
 * Global js functions used on most pages.
 */

/* Create VGR namespace if it doesn't already exist. */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Cookie manipulation functions.
 * Adapted from http://www.dustindiaz.com/top-ten-javascript/.
 */
VGR.cookies = function() {
	/**
	 * Gets a cookie.
	 * @param {String} name The name of the cookie to retrieve.
	 */
	function getCookie(name) {
		var start = document.cookie.indexOf(name + "=");
		var len = start + name.length + 1;
		if ((!start) && (name !== document.cookie.substring( 0, name.length))) {
			return null;
		}
		if (start === -1) {
			return null;
		}
		var end = document.cookie.indexOf(';', len);
		if (end === -1) {
			end = document.cookie.length;
		}
		return unescape( document.cookie.substring(len, end));
	}
	/**
	 * Sets a cookie.
	 * @param {String} name The name of the cookie to set.
	 * @param {String} value The value of the cookie.
	 * @param {Integer} expires Number of days until the cookie expires.
	 * @param {String} path The path for which the cookie is valid.
	 * @param {String} domain The domain name for which the cookie is valid.
	 * @param {Boolean} secure Whether or not the cookie is secure.
	 */
	function setCookie(name, value, expires, path, domain, secure) {
		var today = new Date();
		today.setTime(today.getTime());
		if (expires) {
			expires = expires * 1000 * 60 * 60 * 24;
		}
		var expires_date = new Date(today.getTime() + (expires));
		document.cookie = name+'='+escape(value) +
			((expires) ? ';expires=' + expires_date.toGMTString() : '') +
			((path) ? ';path=' + path : '') +
			((domain) ? ';domain=' + domain : '') +
			((secure) ? ';secure' : '');
	}
	/**
	 * Deletes a cookie.
	 * @param {String} name The name of the cookie to delete.
	 * @param {String} path The path for which the cookie is valid.
	 * @param {String} domain The domain name for which the cookie is valid.
	 */
	function deleteCookie(name, path, domain) {
		if (VGR.cookies.getCookie(name)) {
			document.cookie = name + '=' +
			((path) ? ';path=' + path : '') +
			((domain) ? ';domain=' + domain : '') +
			';expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	}
	return {
		getCookie:getCookie,
		setCookie:setCookie,
		deleteCookie:deleteCookie
	};
}();

/**
 * Creates a modal dialog with content injected via Ajax.
 * @requires YUI
 */
VGR.ajaxDialog = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var oDialog;
	// Default configuration
	var config = {
		sDialogTriggerClass:'dialog',
		sDialogContainerId:'vgr-dialog',
		sDialogWidth:'400px',
		sDialogHeader:'VGR-dialog',
		sDialogError:'Ett fel uppstod vid kommunikationen med servern. Var vänlig kontakta systemansvarig om felet kvarstår.',
		sDialogInit:null
	};
	/**
	 * Runs when the Ajax request is successful.
	 * Injects the Ajax response into the body of the dialog.
	 * Optionally runs a supplied function after the dialog is rendered.
	 * @param {Object} o The HTTP request object.
	 */
	function handleSuccess(o) {
		if (o.responseText !== undefined) {
			oDialog.setBody(o.responseText);
			oDialog.render();
			if (config.sDialogInit) {
				config.sDialogInit();
			}
			oDialog.show();
		}
	}
	/**
	 * Runs when the Ajax request fails.
	 * Displays an error message in an alert dialog.
	 * @param {Object} o The HTTP request object.
	 */
	function handleFailure(o) {
		if (o.responseText !== undefined) {
			alert(config.sDialogError);
		}
	}
	/**
	 * Initialise the dialog.
	 * @param {String} sContId The id of the element to look for dialog triggers in.
	 * @param {Object} props Optional list of configuration properties in the format
	 * {property1:value, property2:value}
	 */
	function init(sContId, props) {
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(sContId);
		if (!oCont) { return; }
		// If any properties were supplied, apply them to the config Object.
		for (key in props) {
			if (config.hasOwnProperty(key)) {
				config[key] = props[key];
			}
		}
		var oDialogContainer = document.createElement('div');
		oDialogContainer.id = config.sDialogContainerId;
		oCont.insertBefore(oDialogContainer, oCont.firstChild);
		oDialog = new YAHOO.widget.Dialog(oDialogContainer, {
				width:config.sDialogWidth,
				fixedcenter:true,
				visible:false, 
				constraintoviewport:true,
				modal:true,
				dragOnly:true,
				postmethod:'form'
	 	});
		// Make it possible to close the dialog by pressing the ESC key.
		var kl = new YAHOO.util.KeyListener(document, {
			keys:27
		}, {
			fn:oDialog.cancel,
			scope:oDialog,
			correctScope:true
		}, 'keyup');
		oDialog.cfg.queueProperty('keylisteners', kl);
		// Find the links that should open a dialog and assign event handlers.
		var dialogLinks = YUD.getElementsByClassName(config.sDialogTriggerClass, 'a', oCont);
		var oLink, sUrl, callback, request;
		for (var i=0, l=dialogLinks.length; i<l; i++) {
			oLink = dialogLinks[i];
			YUE.addListener(oLink, 'click',	function(e) {
				YUE.preventDefault(e);
				sUrl = this.href;
				// The dialog's header text is taken from the link's title attribute.
				oDialog.setHeader(this.title || config.sDialogHeader);
				callback = {
					success:handleSuccess,
					failure:handleFailure
				};
				request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
			});
		}
	}
	return {
		init:init
	};
}();

/**
 * A class that contains visual effects.
 * @requires YUI
 * @class VGR.Effect
 * @constructor
 * @param {String or Object} el The element for which to add functionality.
 */
VGR.Effect = function(el) {
	this.oEl = YAHOO.util.Dom.get(el);
	this.height = parseInt(YAHOO.util.Dom.getStyle(this.oEl,'height'), 10);
	this.width = parseInt(YAHOO.util.Dom.getStyle(this.oEl,'width'), 10);
	if (isNaN(this.height)) {
		this.height = this.oEl.offsetHeight;
	}
	if (isNaN(this.width)) {
		this.width = this.oEl.offsetWidth;
	}
};
/**
 * Hides an object by animating its height from its default to 0.
 * @requires YUI
 * @member VGR.Effect
 * @param {Number} iTimer The duration of the animation.
 * @param onComplete A function to run when the animation is complete.
 */
VGR.Effect.prototype.BlindUp = function(iTimer, onComplete) {
	var timer = iTimer || 1;
	this.oEl.style.overflow = 'hidden';
	var blind = new YAHOO.util.Anim(this.oEl, { height: { to:0} }, timer, YAHOO.util.Easing.easeOut);
	if (onComplete) {
		blind.onComplete.subscribe(onComplete);
	}
	blind.animate();
};
/**
 * Reveals an object by animating its height from 0 to its default.
 * @requires YUI
 * @member VGR.Effect
 * @param {Number} iTimer The duration of the animation.
 * @param onComplete A function to run when the animation is complete.
 */
VGR.Effect.prototype.BlindDown = function(iTimer, onComplete) {
	this.oEl.style.position = 'absolute';
	this.oEl.style.left = '-9999px';
	this.oEl.style.visibility = 'hidden';
	this.oEl.style.overflow = 'hidden';
	this.oEl.style.height = '';
	var height = parseInt(YAHOO.util.Dom.getStyle(this.oEl,'height'), 10);
	if (isNaN(height)) {
		height = this.oEl.offsetHeight;
	}
	this.oEl.style.height = '0';
	this.oEl.style.position = 'static';
	this.oEl.style.left = '';
	this.oEl.style.visibility = 'visible';
	var timer = iTimer || 1;
	var blind = new YAHOO.util.Anim(this.oEl, { height: { to:height, from:0} }, timer, YAHOO.util.Easing.easeOut);
	if (onComplete) {
		blind.onComplete.subscribe(onComplete);
	}
	blind.animate();
};

/**
 * A class that makes the elements it is applied to togglable.
 * @requires YUI
 * @class VGR.Toggler
 * @constructor
 * @param {String or Object} trigger The element that triggers the toggle effect.
 * @param {String or Object} target The element that is toggled by the trigger.
 * @param {Object} props Optional list of configuration properties in the format
 * {property1:value, property2:value}
 */
VGR.Toggler = function(trigger, target, props) {
	this.config = {
		sHiddenClass:'hidden',
		sOpenClass:'open',
		sClosedClass:'closed',
		bAnimated:true,
		fSpeed:0.5
	};
	for (key in props) {
		if (this.config.hasOwnProperty(key)) {
			this.config[key] = props[key];
		}
	}
	this.oTrigger = YAHOO.util.Dom.get(trigger);
	this.oTarget = YAHOO.util.Dom.get(target);
	this.effect = new VGR.Effect(this.oTarget);
	this.animationActive = false;
	this.init();
};
/**
 * Initialises the toggle functionality by inserting a link element inside the
 * element that triggers the toggle effect and assigning an event handler to
 * that link. Ensures keyboard accessibility.
 * @requires YUI
 * @member VGR.Toggler
 */
VGR.Toggler.prototype.init = function() {
	if (!VGR.browserOK) { return; }
	var self = this;
	this.isClosed = YAHOO.util.Dom.hasClass(this.oTarget, this.config.sHiddenClass);
	YAHOO.util.Dom.addClass(this.oTrigger, this.isClosed ? this.config.sClosedClass : this.config.sOpenClass);
	var oLink = document.createElement('a');
	oLink.href = '#';
	while (this.oTrigger.childNodes.length > 0) {
		oLink.appendChild(this.oTrigger.firstChild);
	}
	this.oTrigger.appendChild(oLink);
	YAHOO.util.Event.addListener(oLink, 'click', function(e) {
		YAHOO.util.Event.preventDefault(e);
		self.Toggle();
	});
};
/**
 * Checks which state the togglable element is in and changes it.
 * @requires YUI
 * @member VGR.Toggler
 */
VGR.Toggler.prototype.Toggle = function() {
	if (this.isClosed) {
		this.Expand();
	} else {
		this.Collapse();
	}
};
/**
 * Expands the togglable element.
 * @requires YUI
 * @member VGR.Toggler
 */
VGR.Toggler.prototype.Expand = function() {
	var self = this;
	if (!self.animationActive) {
		self.animationActive = true;
		YAHOO.util.Dom.replaceClass(self.oTrigger, this.config.sClosedClass, this.config.sOpenClass);
		YAHOO.util.Dom.removeClass(self.oTarget, this.config.sHiddenClass);
		if (this.config.bAnimated) {
			this.effect.BlindDown(this.config.fSpeed, function() {
				self.animationActive = false;
			});
		}
		this.isClosed = false;
	}
};
/**
 * Collapses the togglable element.
 * @requires YUI
 * @member VGR.Toggler
 */
VGR.Toggler.prototype.Collapse = function() {
	var self = this;
	if (!self.animationActive) {
		YAHOO.util.Dom.replaceClass(self.oTrigger, self.config.sOpenClass, self.config.sClosedClass);
		if (this.config.bAnimated) {
			self.animationActive = true;
			this.effect.BlindUp(this.config.fSpeed, function() {
				self.oTarget.className += ' ' + self.config.sHiddenClass;
				self.animationActive = false;
			});
		} else {
			YAHOO.util.Dom.addClass(self.oTarget, this.config.sHiddenClass);
		}
		this.isClosed = true;
	}
};

/**
 * Creates a group of connected elements expandable and collapsable.
 * @requires YUI
 */
VGR.accordion = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sContainerClass:'accordion',
		sTriggerEl:'h3',
		sHiddenClass:'hidden',
		sOpenClass:'sel',
		bSingle:true,
		bAnimated:true
	};
	/**
	 * Expands the togglable element.
	 * @param {Object} el The togglable element.
	 */
	function expand(el) {
		el.setAttribute('isOpen', 'true');
		YUD.addClass(el, config.sOpenClass);
		el = YUD.getNextSibling(el);
		while (el && (el.tagName.toLowerCase() !== config.sTriggerEl)) {
			if (config.bAnimated) {
				var effect = new VGR.Effect(el);
				YUD.removeClass(el, config.sHiddenClass);
				effect.BlindDown(0.5);
			}
			else {
				YUD.removeClass(el, config.sHiddenClass);
			}
			el = YUD.getNextSibling(el);
		}		
	}
	/**
	 * Collapses the togglable element.
	 * @param {Object} el The togglable element.
	 * @param {Boolean} useAnimation Whether the effect should be animated or not.
	 */
	function collapse(el, useAnimation) {
		if (useAnimation == null || useAnimation == 'undefined') { useAnimation = config.bAnimated; }
		el.setAttribute('isOpen', 'false');
		YUD.removeClass(el, config.sOpenClass);
		el = YUD.getNextSibling(el);
		while (el && (el.tagName.toLowerCase() !== config.sTriggerEl)) {
			if (useAnimation) {
				var effect = new VGR.Effect(el);
				effect.BlindUp(0.5, function() {
					//console.log(this);
					YAHOO.util.Dom.addClass(this.oEl, config.sHiddenClass);
				});
			}
			else {
				YUD.addClass(el, config.sHiddenClass);
			}
			el = YUD.getNextSibling(el);
		}
	}
	/**
 	 * Checks which state the togglable element is in and changes it.
	 * @param {Object} el The togglable element.
	 */
	function toggle(el) {
		var oElm = el;
		// Toggle
		if (oElm.getAttribute('isOpen') == 'false') {
			expand(el);
		} else {
			collapse(el);
		}
		// If only one element at a time can be expanded.
		if (config.bSingle) {
			var siblings = oElm.parentNode.getElementsByTagName(config.sTriggerEl);
			for (var i=0, l=siblings.length; i<l; i++) {
				if (siblings[i] !== oElm) {
					// If the clicked option was open, close it
					collapse(siblings[i]);
				}
			}
		}
	}
	/**
	 * Sets up the accordion object.
	 * @param {String or Object} sContId The element that contains the elements to connect.
	 * @param {Object} props Optional list of configuration properties in the format
	 * {property1:value, property2:value}
	 */
	function init(sContId, props) {
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(sContId);
		if (!oCont) { return; }
		for (key in props) {
			if (config.hasOwnProperty(key)) {
				config[key] = props[key];
			}
		}

		// Find all elements that contain toggle triggers
		var arrContainers = YUD.getElementsByClassName(config.sContainerClass, '*', oCont);
		var oTrigger;
		var oLink;
		var arrTriggerEls;
		for (var i=0, l=arrContainers.length; i<l; i++) {
			// Find all toggle triggers
			arrTriggerEls = arrContainers[i].getElementsByTagName(config.sTriggerEl);
			for (var j=0, l2=arrTriggerEls.length; j<l2; j++) {
				oTrigger = arrTriggerEls[j];
				oLink = document.createElement('a');
				oLink.href = '#';
				// Move the contents of the trigger inside the link
				while (oTrigger.childNodes.length > 0) {
					oLink.appendChild(oTrigger.firstChild);
				}
				YUE.addListener(oLink, 'click', function(e) {
					YUE.preventDefault(e);
					toggle(this.parentNode);
				});
				oTrigger.appendChild(oLink);
				// If the element is set to be open on page load
				if (YUD.hasClass(oTrigger, config.sOpenClass)) {
					oTrigger.setAttribute('isOpen', 'true');
				}
				// For all other triggers, hide their sibling elements
				else {
					collapse(oTrigger, false);
					oTrigger.setAttribute('isOpen', 'false');
				}
			}
		}
	}
	return {
		init:init
	};
}();

/**
 * Clear read emails and completed TODOs on logout.
 * @requires YUI
 */
VGR.clearCookies = function() {
	function init() {
		if (!VGR.browserOK) { return; }
		var loginLink = document.getElementById('login-status').getElementsByTagName('a')[0];
		if (!loginLink) { return; }
		YAHOO.util.Event.addListener(loginLink,'click', function() {
			VGR.cookies.deleteCookie("readEmail","/");
			VGR.cookies.deleteCookie("doneTODO","/");
		});
	}
	return {
		init:init
	};
}();

/**
 * Display an alert dialog when inactive links are clicked.
 */
VGR.linkInfo = function() {
	var sInfoText = 'Denna länk är inte aktiv i prototypen.';
	function init() {
		if (!VGR.browserOK) { return; }
		var links = document.getElementsByTagName('a');
		var re = /inactive/;
		var oLink;
		for (var i=0, l=links.length; i<l; i++) {
			oLink = links[i];
			/* The second parameter is needed for IE to return the actual value of the href attribute */
			if (re.test(oLink.getAttribute('href',2))) {
				oLink.onclick = function() {
					alert(sInfoText);
					return false;
				};
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
	VGR.clearCookies.init();
	VGR.linkInfo.init();
});