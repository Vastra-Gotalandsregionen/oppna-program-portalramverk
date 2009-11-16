/**
 * @fileoverview
 * Functions used for Vårdaktörsportalen.
 */

/* Create VGR namespace if it doesn't already exist */
if (typeof VGR === "undefined") { var VGR = {}; }

/* Check for browser support. */
VGR.browserOK = document.getElementById && document.createTextNode;

/**
 * Enables autocomplete for text search
 * @requires YUI
 */
VGR.moduleSearchAC = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sContId:'text-search-autocomplete', // id of the element containing the autocomplete field
		sFieldId:'query', // id of the text input
		sLabelId:'query-label', // id of the input's label
		sResponseContainerId:'query-response-container', // id of the element containing the autocomplete responses
		sStructuralClass:'structural', // Positions elements off-screen to hide them visually
		sScreenReaderText:'Använd piltangenterna för att bläddra bland förslag.' // Text displayed for screen readers
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oInputContainer = document.getElementById(config.sContId);
		if (!oInputContainer) { return; }
		// Create a container element for the autocomplete response
		var oResponseContainer = document.createElement("div");
		oResponseContainer.id = config.sResponseContainerId;
		oInputContainer.appendChild(oResponseContainer);
        // Use an XHRDataSource
        var oDS = new YAHOO.util.LocalDataSource(VGR.autocompleteData);

        // Optional to define fields for single-dimensional array
        oDS.responseSchema = {fields : ["word"]};

        // Instantiate the AutoComplete
        var oAC = new YAHOO.widget.AutoComplete(config.sFieldId, config.sResponseContainerId, oDS);
        oAC.minQueryLength = 1;

        // Set up span element with screenreader text
        var elLabel = YAHOO.util.Dom.get(config.sLabelId);
        var origLabel = elLabel.innerHTML;
        var screenreaderLabel = '<span class="' + config.sStructuralClass + '">' + config.sScreenReaderText + '</span>';

        // Insert the screenreader text whenever user starts an AutoComplete interaction
        oAC.textboxFocusEvent.subscribe(function(){elLabel.innerHTML += screenreaderLabel;});
        oAC.textboxBlurEvent.subscribe(function(){elLabel.innerHTML = origLabel;});

        // The typeAhead feature must also be set to true for screenreader support
        oAC.typeAhead = true;

        // Turn off autoHighlight for less confusion
        oAC.autoHighlight = false;

        return {
            oDS: oDS,
            oAC: oAC
        };
	}
	return {
		init:init
	};
}();

/**
 * Autocomplete data used in this prototype
 */
VGR.autocompleteData = [
    "Datortomografi",
    "Demokratiska republiken Kongo",
    "Den nya influensan, svininfluensan",
    "Den nya influensan, svininfluensan - frågor och svar",
    "Denguefeber",
    "Depression",
    "Depression hos äldre",
    "Diabetes typ 1",
    "Diabetes typ 2",
    "Diabetesretinopati",
    "Diarré hos barn",
    "Diatermi",
    "Difteri",
    "Diskbråck",
    "Djibouti",
    "Dominica",
    "Dominikanska Republiken",
    "Dricka lagom"
];

/**
 * Toggle visibility of search form/info navigation contents
 * @requires YUI
 */
VGR.moduleSearchTC = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sToggleId:'toggle-form',
		sContentId:'form-content',
		sClosedClass:'closed', // Form contents hidden when the page loads
		sMore:'Visa',
		sLess:'Dölj',
		sHiddenClass:'hidden'
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oContent = document.getElementById(config.sContentId);
		if (!oContent) { return; }
		oTrigger = document.createElement('a');
		oTrigger.href = "#";
		oTrigger.id = config.sToggleId;
		oTrigger.appendChild(document.createTextNode(config.sLess));
        YUE.addListener(oTrigger, 'click', function() {
    		if (YUD.hasClass(oContent, config.sHiddenClass)) {
    			YUD.removeClass(oContent, config.sHiddenClass);
    			oTrigger.innerHTML = config.sLess;
    		} else {
    			YUD.addClass(oContent, config.sHiddenClass);
    			oTrigger.innerHTML = config.sMore;
    		}
		});
		oContent.parentNode.insertBefore(oTrigger, oContent);
		if (YUD.hasClass(oContent, config.sClosedClass)) {
			YUD.addClass(oContent, config.sHiddenClass);
			oTrigger.innerHTML = config.sMore;
		}
	}
	return {
		init:init
	};
}();

/**
 * Navigate to different documents depending on which search term was entered.
 * For demo purposes only. This should be handled server-side.
 * @requires YUI
 */
VGR.moduleSearchNavigate = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sFormId:'vap-search',
		sTextfieldId:'query',
		URLs:{
		    'diabetesretiopati':'sokresultat-menade-du.html'
		}
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oForm = document.getElementById(config.sFormId);
		if (!oForm) { return; }
		var oField = document.getElementById(config.sTextfieldId);
		if (!oField) { return; }
        YUE.addListener(oField.form, 'submit', function(e) {
            for (var key in config.URLs) {
    			if (key == oField.value.toLowerCase()) {
                    YUE.preventDefault(e);
    			    document.location.href = config.URLs[key];
    			    break;
    			}
    		}
		});
	}
	return {
		init:init
	};
}();

/**
 * If a page with a search form is loaded due to a form submit, populate the search field with the query used.
 * For demo purposes only. This should be handled server-side.
 * @requires YUI
 */
VGR.moduleSearchPopulate = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sFormId:'vap-search',
		sTextfieldId:'query'
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oForm = document.getElementById(config.sFormId);
		if (!oForm) { return; }
		var oField = document.getElementById(config.sTextfieldId);
		if (!oField) { return; }
	    var sQueryString = location.search.substring(1, location.search.length);
	    if (sQueryString.length == 0) { return; }
	    sQueryString = sQueryString.replace(/\+/g, ' ');
	    var aPairs = sQueryString.split('&');
	    var aPair;
        for (var i=0;i<aPairs.length;i++) {
            aPair = aPairs[i].split('=');
            if (aPair[0] == config.sTextfieldId) {
                document.getElementById(config.sTextfieldId).value = aPair[1];
            }
        }
	}
	return {
		init:init
	};
}();

/**
 * Hide the submit button in the search results sort form.
 * Add onchange handler for the select element to submit the form.
 * @requires YUI
 */
VGR.moduleSearchHideSortButton = function() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sFormId:'sort-search-hits',
		sSelectId:'sort',
		sSubmitClass:'submit-area',
		sHiddenClass:'hidden'
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oForm = document.getElementById(config.sFormId);
		var oSelect = document.getElementById(config.sSelectId);
		if (!oForm || !oSelect) { return; }
		var oSubmitArea = YUD.getElementsByClassName(config.sSubmitClass, 'span', oForm)[0];
		if (!oSubmitArea) { return; }
		YUD.addClass(oSubmitArea, config.sHiddenClass);
		// Onchange disabled in the demo
        // YUE.addListener(oSelect, 'change', function () {
        //     oForm.submit();
        // });
	}
	return {
		init:init
	};
}();

/**
 * Initialise JIT
 * @requires YUI
 */
function JITinit() {
	var YUE = YAHOO.util.Event;
	var YUD = YAHOO.util.Dom;
	var config = {
		sJITId:'infovis',
		sNodeLinkClass:'info',
		sNodeImg:'/i/icons/text_list_bullets.png',
		sNodeImgAlt:'Visa info för'
	};
	if (!VGR.browserOK) { return; }
	var oCont = document.getElementById(config.sJITId);
	if (!oCont) { return; }
	//init data
    var json = {
    	"id": "node1",
    	"name": "Start",
    	"data": {},
    	"children": [{
    		"id": "node1-1",
    		"name": "Barns hälsa",
    		"data": {},
    		"children": [{
    			"id": "node1-1-1",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-1-2",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}]
    	}, {
    		"id": "node1-2",
    		"name": "Erik",
    		"data": {},
    		"children": [{
    			"id": "node1-2-1",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-2-2",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": [{
    				"id": "node1-2-2-1",
    				"name": "Lorem ipsum",
    				"data": {},
    				"children": []
    			}, {
    				"id": "node1-2-2-2",
    				"name": "Lorem ipsum",
    				"data": {},
    				"children": [{
    					"id": "node1-2-2-2-1",
    					"name": "Lorem ipsum",
    					"data": {},
    					"children": []
    				}]
    			}, {
    				"id": "node1-2-2-3",
    				"name": "Lorem ipsum",
    				"data": {},
    				"children": []
    			}, {
    				"id": "node1-2-2-4",
    				"name": "Lorem ipsum",
    				"data": {},
    				"children": []
    			}, {
    				"id": "node1-2-2-5",
    				"name": "Lorem ipsum",
    				"data": {},
    				"children": []
    			}]
    		}, {
    			"id": "node1-2-3",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": [{
    				"id": "node1-2-3-1",
    				"name": "Lorem ipsum",
    				"data": {},
    				"children": []
    			}]
    		}]
    	}, {
    		"id": "node1-3",
    		"name": "Graviditet",
    		"data": {},
    		"children": [{
    			"id": "node1-3-1",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-3-2",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-3-3",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-3-4",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-3-5",
    			"name": "Lorem ipsum",
    			"data": {},
    			"children": []
    		}]
    	}, {
    		"id": "node1-4",
    		"name": "Läkemedel",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-5",
    		"name": "Medicinteknik",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-6",
    		"name": "Prioriteringar",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-7",
    		"name": "Sjukdomar",
    		"data": {},
    		"children": [{
    			"id": "node1-7-1",
    			"name": "Andningsorganen",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-2",
    			"name": "Cancer",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-3",
    			"name": "Endokrina sjukdomar",
    			"data": {},
    			"children": [{
    				"id": "node1-7-3-1",
    				"name": "Diabetes",
    				"data": {
    				    "url": "associativ-navigering-diabetes.html"
    				},
    				"children": [{
        				"id": "node1-7-3-1-1",
        				"name": "Diabetes typ 1",
        				"data": {},
        				"children": []
        			}, {
    			    	"id": "node1-7-3-1-2",
        				"name": "Diabetes typ 2",
        				"data": {
        				    "url": "associativ-navigering-diabetes.html"
        				},
        				"children": [{
        			    	"id": "node1-7-3-1-2-1",
            				"name": "Diagnos",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-2",
            				"name": "Symtom",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-3",
            				"name": "Behandling",
            				"data": {},
            				"children": [{
            			    	"id": "node1-7-3-1-2-3-1",
                				"name": "Sårbehandling / Fotsår hos personer med diabetes",
                				"data": {
                				    "url": "http://www.1177.se/handboken/06_article.asp?CategoryId=3013&amp;ParentId=3000&amp;ChapterId=3013&amp;Preview=&amp;From=MENU&amp;sString=diabetes"
                				},
                				"children": []
            				}, {
            			    	"id": "node1-7-3-1-2-3-2",
                				"name": "Benamputation - vård och behandling / Att förlora ett ben",
                				"data": {
                				    "url": "http://www.1177.se/handboken/06_article.asp?CategoryId=3189&amp;ParentId=3188&amp;ChapterId=3189&amp;Preview=&amp;From=MENU&amp;sString=diabetes"
                				},
                				"children": []
            				}, {
            			    	"id": "node1-7-3-1-2-3-3",
                				"name": "Patientens personliga hygien / Fotvård",
                				"data": {
                				    "url": "http://www.1177.se/handboken/06_article.asp?CategoryId=4309&amp;ParentId=4300&amp;ChapterId=4309&amp;Preview=&amp;From=MENU&amp;sString=diabetes"
                				},
                				"children": []
            				}, {
            			    	"id": "node1-7-3-1-2-3-4",
                				"name": "Sårbehandling / Allmänt om sårbehandling",
                				"data": {
                				    "url": "http://www.1177.se/handboken/06_article.asp?CategoryId=3001&amp;ParentId=3000&amp;ChapterId=3001&amp;Preview=&amp;From=MENU&amp;sString=diabetes"
                				},
                				"children": []
            				}, {
            			    	"id": "node1-7-3-1-2-3-5",
                				"name": "Sårbehandling / Läkningshämmande faktorer",
                				"data": {
                				    "url": "http://www.1177.se/handboken/06_article.asp?CategoryId=3002&amp;ParentId=3000&amp;ChapterId=3002&amp;Preview=&amp;From=MENU&amp;sString=diabetes"
                				},
                				"children": []
            				}, {
            			    	"id": "node1-7-3-1-2-3-6",
                				"name": "Sårbehandling / Bedömning, dokumentation",
                				"data": {
                				    "url": "http://www.1177.se/handboken/06_article.asp?CategoryId=3003&amp;ParentId=3000&amp;ChapterId=3003&amp;Preview=&amp;From=MENU&amp;sString=diabetes"
                				},
                				"children": []
            				}]
        			    }, {
        			    	"id": "node1-7-3-1-2-4",
            				"name": "Läkemedel",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-5",
            				"name": "Epidemiologi",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-6",
            				"name": "Medicinska prioriteringar",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-7",
            				"name": "Kvalitetsregister",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-8",
            				"name": "Vetenskapliga artiklar",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-9",
            				"name": "Wiki",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-10",
            				"name": "Forum",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-11",
            				"name": "Patientinformation",
            				"data": {},
            				"children": []
        			    }, {
        			    	"id": "node1-7-3-1-2-12",
            				"name": "Administrativa rutiner",
            				"data": {},
            				"children": []
        			    }]
        			}]
    			}, {
    				"id": "node1-7-3-1",
    				"name": "Fetma",
    				"data": {},
    				"children": []
    			}]
    		}, {
    			"id": "node1-7-4",
    			"name": "Hjärta och kärl",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-5",
    			"name": "Infektioner",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-6",
    			"name": "Psykisk sjukdom",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-7",
    			"name": "Rörelseorganen",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-8",
    			"name": "Huden",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-9",
    			"name": "Matsmältningsorganen",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-10",
    			"name": "Nervsystemet",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-11",
    			"name": "Skador och olycksfall",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-12",
    			"name": "Urinvägar",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-13",
    			"name": "Ögon",
    			"data": {},
    			"children": []
    		}, {
    			"id": "node1-7-14",
    			"name": "Öron",
    			"data": {},
    			"children": []
    		}]
    	}, {
    		"id": "node1-8",
    		"name": "Äldres hälsa",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-9",
    		"name": "Symtom",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-10",
    		"name": "Riktlinjer och PM",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-11",
    		"name": "Epidemiologi",
    		"data": {},
    		"children": []
    	}, {
    		"id": "node1-12",
    		"name": "Kvalitetsregister",
    		"data": {},
    		"children": []
    	}]
    };
    //end

	var infovis = document.getElementById('infovis');
	var w = infovis.offsetWidth, h = infovis.offsetHeight;
	//init canvas
	//Create a new canvas instance.
	var canvas = new Canvas('mycanvas', {
		'injectInto': config.sJITId,
		'width': w,
		'height': h
	});
	//end

    //init Hypertree
    var ht = new Hypertree(canvas, {
        //Change node and edge styles such as
        //color, width and dimensions.
        Node: {
            type: "circle",
            dim: 4,
            color: "#6c9ac1",
            transform: false
        },
        Edge: {
            lineWidth: 1,
            color: "#bbb"
        },
        //Attach event handlers and add text to the
        //labels. This method is only triggered on label
        //creation
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = '<a href="#">' + node.name + "</a>";
            if (node.data.url) {
                var oLink = document.createElement('a');
                oLink.href = node.data.url;
                oLink.className = config.sNodeLinkClass;
                var oImg = document.createElement('img');
                oImg.src = config.sNodeImg;
                oImg.alt = oImg.title = config.sNodeImgAlt + ' ' + node.name;
                oLink.appendChild(oImg);
                domElement.appendChild(oLink);
            }
            YUE.addListener(domElement.getElementsByTagName('a')[0], 'click', function(e) {
                YUE.preventDefault(e);
                ht.onClick(node.id, {
                    hideLabels: false
                });
            });
        },
        //Change node styles when labels are placed
        //or moved.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            if (node._depth > 2) {
                style.display = 'none';
            }
            var left = parseInt(style.left, 10);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
}

/**
 * Make headings in long documents toggle the display of their next sibling
 * If a cookie is set, close all sections that are not selected (this should be handled by the server)
 * @requires YUI
 */
VGR.toggleDocumentSections = function() {
	var YUD = YAHOO.util.Dom;
	var config = {
	    sContId:'module-vap-document',
	    sIdPrefix:'info-type-',
		sClass:'foldable',
		sHiddenClass:'hidden',
		sTag:'*',
		bSeparateLink:true, // Whether the entire text should be clickable or not
		sCookieName:'infoTypes',
		bAnimated:false
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(config.sContId);
		if (!oCont) { return; }
    	// Initialise togglable elements
    	var oTriggers = YUD.getElementsByClassName(config.sClass, config.sTag, oCont);
    	var arrTogglers = [];
    	var oTrigger;
    	var oFoldable;
    	// If a cookie is set, modify its contents to match section ids
    	if (config.sCookieName != '') {
    	    var sCookie = VGR.cookies.getCookie(config.sCookieName);
    	    if (sCookie && (sCookie != '-1')) {
                var arrChecked = sCookie.split(',');
                for (var i=0, l=arrChecked.length; i<l; i++) {
                    arrChecked[i] = config.sIdPrefix + arrChecked[i].split(';')[0];
                }
            }
    	}
    	for (var i=0, l=oTriggers.length; i<l; i++) {
    		oTrigger = oTriggers[i];
    		oFoldable = YUD.getNextSibling(oTrigger);
    		// Close all sections that do not exist in the cookie
    		if (arrChecked) {
    		    var bHidden = true;
                for (var j=0, m=arrChecked.length; j<m; j++) {
                    if ((arrChecked[j] == oTrigger.id) || (oTrigger.id.substring(0,config.sIdPrefix.length) != config.sIdPrefix)) {
                        bHidden = false;
                        break;
                    }
                }
                if (bHidden) {
                    YUD.addClass(oFoldable, config.sHiddenClass);
                }
            }
    		arrTogglers.push(new VGR.Toggler(oTriggers[i], oFoldable, {
    		    bSeparateLink:config.bSeparateLink,
    		    bAnimated:config.bAnimated
    		}));
    	}
    }
	return {
		init:init
	};
}();

/**
 * Make headings in search results toggle the display of their next sibling
 * If a cookie is set, close all sections that are not selected (this should be handled by the server)
 * @requires YUI
 */
VGR.toggleSearchSections = function() {
	var YUD = YAHOO.util.Dom;
	var config = {
        sContId:'module-search-hits',
	    sContClass:'search-hits-vap',
	    sIdPrefix:'info-type-',
		sClass:'foldable',
		sHiddenClass:'hidden',
		sTag:'h3',
		sCookieName:'infoTypes',
		bAnimated:false
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(config.sContId);
		if (!oCont) { return; }
		if ((config.sContClass != '') && (!YUD.hasClass(oCont, config.sContClass))) { return; }
    	// Initialise togglable elements
    	var oTriggers = YUD.getElementsByClassName(config.sClass, config.sTag, oCont);
    	var arrTogglers = [];
    	var oTrigger;
    	var oFoldable;
    	// If a cookie is set, modify its contents to match section ids
    	if (config.sCookieName != '') {
    	    var sCookie = VGR.cookies.getCookie(config.sCookieName);
    	    if (sCookie && (sCookie != '-1')) {
                var arrChecked = sCookie.split(',');
                for (var i=0, l=arrChecked.length; i<l; i++) {
                    arrChecked[i] = config.sIdPrefix + arrChecked[i].split(';')[0];
                }
            }
    	}
    	for (var i=0, l=oTriggers.length; i<l; i++) {
    		oTrigger = oTriggers[i];
    		oFoldable = YUD.getNextSibling(oTrigger);
    		// Close all sections that do not exist in the cookie
    		if (arrChecked) {
    		    var bHidden = true;
                for (var j=0, m=arrChecked.length; j<m; j++) {
                    if (arrChecked[j].split(';')[0] == oTrigger.id) {
                        bHidden = false;
                        break;
                    }
                }
                if (bHidden) {
                    YUD.addClass(oFoldable, config.sHiddenClass);
                }
            }
    		arrTogglers.push(new VGR.Toggler(oTriggers[i], oFoldable, {
    		    bAnimated:config.bAnimated
    		}));
    	}
    }
	return {
		init:init
	};
}();

/**
 * Highlight selected information types in the sub menu
 * Print the selected information types in the #marked-info container
 * For demo purposes only. This should be handled by the server.
 * @requires YUI
 */
VGR.highLightInfoTypes = function() {
	var YUD = YAHOO.util.Dom;
	var config = {
	    sContClass:'info-type-nav',
	    sIdPrefix:'nav-info-type-',
		sCookieName:'infoTypes',
		sKeywordContId:'marked-info',
		sKeywordContClass:'keywords',
		sNoKeywordsText:'Inga informationstyper valda.'
	};
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oCont = YUD.getElementsByClassName(config.sContClass)[0];
        var oKeyWordContainer = YUD.getElementsByClassName(config.sKeywordContClass,'*',document.getElementById(config.sKeywordContId))[0];
    	if (config.sCookieName != '') {
    	    // If a cookie is set, modify its contents to match nav item ids
    	    var sCookie = VGR.cookies.getCookie(config.sCookieName);
    	    if (oKeyWordContainer) {
    	        oKeyWordContainer.innerHTML = '';
    	    }
    	    if (sCookie && (sCookie != '-1')) {
                var arrHighlighted = sCookie.split(',');
                var oEl, oWrap, oStrong, oText, oSpan;
                for (var i=0, l=arrHighlighted.length; i<l; i++) {
                    if (oCont) {
                        oEl = document.getElementById(config.sIdPrefix + arrHighlighted[i].split(';')[0]);
                        if (oEl) {
                            YUD.addClass(oEl, 'fav');
                            oWrap = oEl.getElementsByTagName('a')[0] || oEl.getElementsByTagName('strong')[0];
                            oStrong = document.createElement('strong');
    	                    while (oWrap.childNodes.length > 0) {
                                oStrong.appendChild(oWrap.firstChild);
    	                    }
    	                    oWrap.appendChild(oStrong);
                        }
                    }
                    if (oKeyWordContainer) {
                        oText = arrHighlighted[i].split(';')[1];
                        if (i > 0) {
                            oKeyWordContainer.appendChild(document.createTextNode(', '));
                        }
                        oSpan = document.createElement('span');
                        oSpan.className = 'type';
                        oSpan.appendChild(document.createTextNode(oText));
                        oKeyWordContainer.appendChild(oSpan);
                        if (i + 1 == l) {
                            oKeyWordContainer.appendChild(document.createTextNode('.'));
                        }
                    }
                }
            } else {
                oKeyWordContainer.appendChild(document.createTextNode(config.sNoKeywordsText));
            }
    	}
    }
	return {
		init:init
	};
}();

/**
 * Update cookies that save settings for highlighted information types
 * @requires YUI
 * @requires VGR.cookies
 */
VGR.updateInfoTypes = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
	    sCookieName:'infoTypes',
	    sResetCookieName:'infoTypesReset',
	    sFormId:'info-types',
	    sCheckboxGroup:'source',
	    sSubmitButtonId:'infotypes-submit'
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
        var sCookie = VGR.cookies.getCookie(config.sCookieName);
        var oCheckboxGroup = document.forms[config.sFormId].elements[config.sCheckboxGroup];
        if (oCheckboxGroup) {
            if (sCookie && sCookie != '-1') {
                var arrChecked = sCookie.split(',');
                var sId;
                for (var i=0; i<arrChecked.length; i++) {
                    sId = arrChecked[i].split(';')[0];
                    document.getElementById('source' + sId).checked = true;
                }
            }
            if (document.getElementById(config.sSubmitButtonId)) {
                YUE.addListener(document.getElementById(config.sSubmitButtonId), 'click', function() {
                    var arrChecked = [];
                    var arrLabels;
                    var sLabel = 'none';
                    for (var j=0; j<oCheckboxGroup.length; j++) {
                        if (oCheckboxGroup[j].checked) {
                            arrLabels = document.getElementsByTagName('label');
                            for (var k=0; k<arrLabels.length; k++) {
                                if (arrLabels[k].htmlFor == oCheckboxGroup[j].id) {
                                    sLabel = arrLabels[k].innerHTML;
                                    break;
                                }
                            }
                            arrChecked.push(oCheckboxGroup[j].id.substring(6) + ';' + sLabel);
                        }
                    }
                    if (arrChecked.length == 0) {
                        VGR.cookies.setCookie(config.sResetCookieName, '1', 365, '/');
                        VGR.cookies.setCookie(config.sCookieName, '-1', 365, '/');
                    } else {
                        VGR.cookies.setCookie(config.sCookieName, arrChecked.join(), 365, '/');
                    }
        		});
        	}
        }
    }
	return {
		init:init
	};
}();

/**
 * Lets the user edit subjects
 * Changes are not stored in this prototype
 * @requires YUI
 */
VGR.updateSubjects = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
	    sFormId:'subjects-form',
	    sContId:'subject-search-autocomplete',
	    sTextId:'subject',
	    sAddButtonId:'add-subject',
	    sRemoveButtonId:'remove-subject',
	    sSelectId:'subjects'
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
	 * Delete selected option elements
	 */
	function deleteOptions(theSel) {
		var oOption;
		// Find the selected Options in reverse order
		// and delete them from the Select.
		for (var i=theSel.length-1; i>=0; i--) {
			oOption = theSel.options[i];
			if(oOption.selected) {
				deleteOption(theSel, i);
			}
		}
	}
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oInputContainer = document.getElementById(config.sContId);
		if (!oInputContainer) { return; }
		// Check that the required elements exist
		var addSubject = document.getElementById(config.sAddButtonId);
		var removeSubject = document.getElementById(config.sRemoveButtonId);
		if (!addSubject || !removeSubject) { return; }
		YUE.addListener(addSubject, 'click', function(e) {
		    YUE.preventDefault(e);
			addOption(this.form[config.sSelectId], this.form[config.sTextId].value, '1');
		});
		YUE.addListener(removeSubject, 'click', function(e) {
		    YUE.preventDefault(e);
			deleteOptions(this.form[config.sSelectId]);
		});
		// Create a container element for the autocomplete response
		var oResponseContainer = document.createElement("div");
		oResponseContainer.id = "subject-response-container";
		oInputContainer.appendChild(oResponseContainer);
        // Use an XHRDataSource
        var oDS = new YAHOO.util.LocalDataSource(VGR.autocompleteData);
        // Optional to define fields for single-dimensional array
        oDS.responseSchema = {fields : ["word"]};
        // Instantiate the AutoComplete
        var oAC = new YAHOO.widget.AutoComplete("subject", "subject-response-container", oDS);
        oAC.minQueryLength = 1;
        // Set up span element with screenreader text
        var elLabel = YUD.get("subject-label");
        var origLabel = elLabel.innerHTML;
        var screenreaderLabel = '<span style="position:absolute;left:-999em;">Use the arrow keys to navigate suggestions.</span>';
        // Insert the screenreader text whenever user starts an AutoComplete interaction
        oAC.textboxFocusEvent.subscribe(function(){elLabel.innerHTML += screenreaderLabel;});
        oAC.textboxBlurEvent.subscribe(function(){elLabel.innerHTML = origLabel;});
        // The typeAhead feature must also be set to true for screenreader support
        oAC.typeAhead = true;
        // Turn off autoHighlight for less confusion
        oAC.autoHighlight = false;
        return {
            oDS: oDS,
            oAC: oAC
        };
    }

	return {
		init:init
	};
}();

/**
 * Create default cookies used for demo purposes
 * @requires YUI
 * @requires VGR.cookies
 */
VGR.createDefaultCookies = function() {
	var YUD = YAHOO.util.Dom;
	function init() {
		if (!VGR.browserOK) { return; }
		if ((!VGR.cookies.getCookie('infoTypes')) && (!VGR.cookies.getCookie('infoTypesReset'))) {
            VGR.cookies.setCookie('infoTypes', '1;Diagnos,2;Symtom,3;Behandling', 365, '/');
        }
    }
	return {
		init:init
	};
}();

/**
 * Prevent elements from scrolling out of the viewport
 * @requires YUI
 */
VGR.stickyMenu = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
		sClass:'sticky' // Class name of affected elements
	};
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
	    var elms = YUD.getElementsByClassName(config.sClass);
	    if (!elms) { return; }
	    var oldPos = [];
	    for (var i=0, l=elms.length; i<l; i++) {
	        oldPos[i] = YUD.getXY(elms[i])[1];
	    }
    	YUE.addListener(window, 'scroll', function() {
    	    var pos, w, h;
        	var cur = YUD.getDocumentScrollTop();
    	    for (var j=0, m=elms.length; j<m; j++) {
        		pos = YUD.getXY(elms[j])[1];
    			if (YAHOO.env.ua.ie) {
    				w = YAHOO.util.Region.getRegion(elms[j]).width;
    				h = YAHOO.util.Region.getRegion(elms[j]).height;
    			} else {
    				w = YUD.getStyle(elms[j], 'width');
    				h = YUD.getStyle(elms[j], 'height');
    			}
    			// Do not make the element sticky if it is taller than the viewport
    			if (parseInt(h, 10) < YUD.getViewportHeight()) {
            		YUD.setStyle(elms[j], "position", "absolute");
            		YUD.setStyle(elms[j], "top", pos+"px");
            		YUD.setStyle(elms[j], "width", w);
            		if (cur > oldPos[j]) {
            			YUD.setStyle(elms[j], "position", "fixed");
            			YUD.setStyle(elms[j], "top", "0px");
            		} else if (cur <= oldPos[j]) {
            			YUD.setStyle(elms[j], "position", "static");
            			YUD.setStyle(elms[j], "width", '');
            			YUD.setStyle(elms[j], "top", '');
            		}
            	} else {
                    YUD.setStyle(elms[j], "position", "static");
            		YUD.setStyle(elms[j], "width", '');
            		YUD.setStyle(elms[j], "top", '');
            	}
        	}
    	});
    }
	return {
		init:init
	};
}();

/**
 * Create a menu with internal links to document sections
 * @requires YUI
 */
VGR.internalLinks = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
	    sHiddenClass:'hidden',
	    sActiveClass:'active',
	    sContId:'document-tools',
	    sTargetClass:'foldable',
	    sText:'Gå till avsnitt…',
	    sInternalClass:'internal',
	    sInternalLinksId:'internal-links',
	    sShowLinksId:'toggle-links'
	};
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(config.sContId);
		if (!oCont) { return; }
		var oInternalLinks = document.createElement('div');
		oInternalLinks.id = config.sInternalLinksId;
		var oShowLinks = document.createElement('a');
		oShowLinks.id = config.sShowLinksId;
		oShowLinks.href = "#";
		oShowLinks.appendChild(document.createTextNode(config.sText));
		oInternalLinks.appendChild(oShowLinks);
		var oUl = document.createElement('ul');
		YUD.batch(YUD.getElementsByClassName(config.sTargetClass), function(el) {
			var oLi = document.createElement('li');
			var oLink = document.createElement('a');
			oLink.href = "#" + el.id;
			var oCurrLink = YUD.getElementsByClassName(config.sInternalClass, 'a', el)[0];
			var oText;
			// If the target contains a link, use the link's text
			if (oCurrLink) {
			    oText = oCurrLink.innerHTML;
			} else {
		    // Else use the target's content after removing any HTML
                var re = /<\S[^>]*>/g; 
			    oText = el.innerHTML.replace(re,"");
			}
			oLink.appendChild(document.createTextNode(oText));
			YUE.addListener(oLink, 'click', function () {
                YUD.addClass(oUl, config.sHiddenClass);
			    YUD.removeClass(oShowLinks, config.sActiveClass);
			});
			oLi.appendChild(oLink);
			oUl.appendChild(oLi);
		});
		oUl.className = config.sHiddenClass;
		oInternalLinks.appendChild(oUl);
		YUD.insertAfter(oInternalLinks, oCont.getElementsByTagName('h2')[0]);
		YUE.addListener(oShowLinks, 'click', function (e) {
		    YUE.preventDefault(e);
		    if (YUD.hasClass(oUl, config.sHiddenClass)) {
                YUD.removeClass(oUl, config.sHiddenClass);
			    YUD.addClass(oShowLinks, config.sActiveClass);
			} else {
			    YUD.addClass(oUl, config.sHiddenClass);
			    YUD.removeClass(oShowLinks, config.sActiveClass);
			}
		});
	}
	return {
		init:init
	};
}();

/**
 * Create a link to the current page that opens in a new window
 * @requires YUI
 */
VGR.duplicateWindow = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
	    sClass:'new-window',
	    sContId:'document-tools',
	    sContClass:'tools',
	    sText:'Öppna i nytt fönster'
	};
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(config.sContId);
		if (!oCont) { return; }
		var oTools = YUD.getElementsByClassName(config.sContClass,'ul',oCont)[0];
		if (!oTools) { return; }
		var oLink = document.createElement('a');
		oLink.href = document.location.href;
		oLink.target = "_blank";
		oLink.className = config.sClass;
		oLink.appendChild(document.createTextNode(config.sText));
		var oLi = document.createElement('li');
		oLi.appendChild(oLink);
		oTools.insertBefore(oLi, oTools.firstChild);
	}
	return {
		init:init
	};
}();

/**
 * Hide tag suggestion form on page load.
 * Reveal the form on user request.
 * @requires YUI
 */
VGR.suggestTags = function() {
	var YUD = YAHOO.util.Dom;
	var YUE = YAHOO.util.Event;
	var config = {
	    sContId:'tags',
	    sTriggerId:'tags-suggest',
		sHiddenClass:'hidden',
		sHideText:'Dölj etikettformulär'
	};
	/**
	 *
	 */
	function init(opts) {
		// If options were supplied, apply them to the option Object.
		for (var key in opts) {
			if (config.hasOwnProperty(key)) {
				config[key] = opts[key];
			}
		}
		if (!VGR.browserOK) { return; }
		var oCont = document.getElementById(config.sContId);
		if (!oCont) { return; }
		var oForm = oCont.getElementsByTagName('form')[0];
		if (!oForm) { return; }
		var oHeading = oForm.getElementsByTagName('h3')[0];
		if (!oHeading) { return; }
		// Create the container element for the link that shows the form
		var oTrigger = document.createElement('div');
		oTrigger.id = config.sTriggerId;
		var oLink = document.createElement('a');
		oLink.href = '#';
		oLink.innerHTML = oHeading.innerHTML; // Get the link text from the heading inside the form
		YUE.addListener(oLink, 'click', function (e) {
		    YUE.preventDefault(e);
		    if (YUD.hasClass(oForm, config.sHiddenClass)) {
		        YUD.removeClass(oForm, config.sHiddenClass);
                oLink.innerHTML = config.sHideText;
		    } else {
		        YUD.addClass(oForm, config.sHiddenClass);
		        oLink.innerHTML = oHeading.innerHTML;
		    }
		});
		oTrigger.appendChild(oLink);
		oCont.insertBefore(oTrigger, oForm);
		oHeading.parentNode.removeChild(oHeading); // Remove the heading
		YUD.addClass(oForm, config.sHiddenClass);
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
    // Create default cookies
    VGR.createDefaultCookies.init();
    // Modal dialogs
	VGR.ajaxDialog.init('marked-info', {sDialogInit:VGR.updateInfoTypes.init});
	VGR.ajaxDialog.init('module-my-subjects', {sDialogInit:VGR.updateSubjects.init});
	VGR.ajaxDialog.init('module-profile-subjects', {sDialogInit:VGR.updateSubjects.init});
	VGR.ajaxDialog.init('module-profile-infotypes', {sDialogInit:VGR.updateInfoTypes.init});
	VGR.ajaxDialog.init('module-profile-glossary', {sDialogInit:null});
	// Autocomplete
	VGR.moduleSearchAC.init();
	// Toggle visibility of form contents
    VGR.moduleSearchTC.init();
    // JIT
    JITinit();
    // Hide the sort results submit button
    VGR.moduleSearchHideSortButton.init();
    // Make document sections togglable
    VGR.toggleDocumentSections.init();
    // Make search result sections togglable
    VGR.toggleSearchSections.init();
	// Highlight selected information types in the sub menu
	VGR.highLightInfoTypes.init({
	    sContId:'module-vap-search-filter'
	});
    // Make the left menu sticky
    VGR.stickyMenu.init();
    // Create internal link menu
    VGR.internalLinks.init();
    // Load different pages depending on what was entered in the search form
    VGR.moduleSearchNavigate.init();
    // Populate the search field with the query used
    VGR.moduleSearchPopulate.init();
    // Create a link that opens the current page in a new window
    VGR.duplicateWindow.init();
    // Hide tag suggestion form and reveal it on user request
    VGR.suggestTags.init();
});