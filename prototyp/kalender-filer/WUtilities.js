//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
if (!self.WUtilities)
{
self.WUtilities=new WUtilitiesImpl();}function WUtilitiesImpl()
{
this.events=null;this.cloneHTMLElement=WUtilities_cloneHTMLElement;this.mergeAttributes=WUtilities_mergeAttributes;this.mergeEventHandlers=WUtilities_mergeEventHandlers;this.getElementById=WUtilities_getElementById;this.getOwnerWindow=WUtilities_getOwnerWindow;this.getOuterHTML=WUtilities_getOuterHTML;this.getGUID=WUtilities_getGUID;this.containsFrames=WUtilities_containsFrames;this.appendHTMLElement=WUtilities_appendHTMLElement;this.getOffsetWidth=WUtilities_getOffsetWidth;this.getWidth=WUtilities_getWidth;this.getHeight=WUtilities_getHeight;this.getLeft=WUtilities_getLeft;this.getTop=WUtilities_getTop;this.alert=WUtilities_alert;this.debug=WUtilities_debug;this.status=WUtilities_status;this.init=WUtilities_init;this.init();};function WUtilities_init()
{
this.events=[
"activate",
"afterupdate",
"beforeactivate",
"beforecopy",
"beforecut",
"beforedeactivate",
"beforeeditfocus ",
"beforepaste",
"beforeupdate",
"blur",
"change",
"click",
"close",
"contextmenu",
"controlselect",
"copy",
"cut",
"dblclick",
"deactivate",
"drag",
"dragend",
"dragenter",
"dragleave",
"dragover",
"dragstart",
"drop",
"error",
"errorupdate",
"filterchange",
"focus",
"focusin",
"focusout",
"help",
"keydown",
"keypress",
"keyup",
"layoutcomplete",
"load",
"losecapture",
"mousedown",
"mouseenter",
"mouseleave",
"mousemove",
"mouseout",
"mouseover",
"mouseup",
"mousewheel",
"move",
"moveend",
"movestart",
"paste",
"propertychange",
"readystatechange",
"reset",
"resize",
"resizeend",
"resizestart",
"scroll",
"selectstart",
"submit",
"timeerror",
"unload"
];};function WUtilities_alert(text)
{
alert(text);};function WUtilities_debug(message)
{
if (WLayerConstants.DEBUG)
{
this.alert("DEBUG: " + message);}};function WUtilities_status(text)
{
window.status="" + text;};function WUtilities_getOuterHTML(element)
{
var outerHTML="";if (WClient.isBrowserInternetExplorer())
{
outerHTML=element.outerHTML;}else
{
var doc=element.ownerDocument;var tempDIV=doc.createElement("DIV");tempDIV.style.visibility="hidden";doc.body.appendChild(tempDIV);tempDIV.appendChild(element);outerHTML=tempDIV.innerHTML;}return outerHTML;};function WUtilities_getGUID(baseID)
{
var date=(new Date()).valueOf();var random=parseInt(1000*Math.random());return('' + baseID + date + random);};function WUtilities_cloneHTMLElement(doc, element, cloneIdentity)
{
var clone=null;if (element.tagName)
{
clone=doc.createElement(element.tagName);if (element.tagName == "INPUT")
{
clone.type=element.type;}this.mergeAttributes(element, clone, cloneIdentity);this.mergeEventHandlers(element, clone);var children=element.childNodes;for (var i=0; i < children.length; i++)
{
clone.appendChild(this.cloneHTMLElement(doc, children[i], true));};}else if (element.data)
{
clone=doc.createTextNode(element.data);}else
{
clone=doc.createTextNode("");};return clone;};function WUtilities_mergeAttributes(source, target, mergeIdentity)
{
for (var i=0; i < source.attributes.length; i++)
{
var attribute=source.attributes[i];if (attribute.nodeValue != "" && (mergeIdentity || (attribute.nodeName != "id" && attribute.nodeName != "name")))
{
target.setAttribute(attribute.nodeName, attribute.nodeValue);}};if (source.style != null && source.style.cssText != null)
{
target.style.cssText=source.style.cssText;}if (source.className != null)
{
target.className=source.className;}};function WUtilities_mergeEventHandlers(source, target)
{
for (var i=0; i < this.events.length; i++)
{
var onEvent="on" + this.events[i];if (eval("source." + onEvent))
{
var sourceScript="" + eval("source." + onEvent);if (WClient.isBrowserInternetExplorer() &&
sourceScript.toLowerCase().indexOf("function") != 0)
{
eval('target.' + onEvent + '=new Function("", "' + source.getAttribute(onEvent) + '")');}else
{
eval("target." + onEvent + "=source." + onEvent);};}};};function WUtilities_getOwnerWindow(element)
{
var ownerWindow=null;if (element != null)
{
var tempElement=element;if (WClient.isBrowserInternetExplorer() && tempElement.ownerDocument)
{
ownerWindow=tempElement.ownerDocument.parentWindow;}else if (!tempElement.ownerWindow)
{
var tempID=tempElement.id;var guid=this.getGUID(tempElement.id);tempElement.id=guid;var updatedElement=this.getElementById(top, guid);if (updatedElement && updatedElement.ownerDocument)
{
tempElement=updatedElement;}tempElement.id=tempID;ownerWindow=tempElement.ownerWindow;}}return ownerWindow;};function WUtilities_getElementById(root, id)
{
var element=null;if (root != null)
{
var rootDocument=root.document;if (rootDocument != null)
{
var tempElement=rootDocument.getElementById(id);if (tempElement)
{
if (!tempElement.ownerDocument)
{
tempElement.ownerDocument=rootDocument;}if (!tempElement.ownerWindow)
{
tempElement.ownerWindow=root;}element=tempElement;}else if (root.frames)
{
for (var i=0; i < root.frames.length; i++)
{
var frame=root.frames[i];element=this.getElementById(frame, id);if (element != null)
{
break;}};}}}return element;};function WUtilities_containsFrames(windowElement)
{
var containsFrames=false;if (windowElement != null)
{
containsFrames=(windowElement.frames && windowElement.frames.length != 0);}return containsFrames;};function WUtilities_appendHTMLElement(source, target)
{
var success=false;try
{
target.appendChild(source);success=true;}catch (e)
{
success=false;};if (!success)
{
try
{
var doc=this.getOwnerWindow(target).document;var clone=this.cloneHTMLElement(doc, source, true);target.appendChild(clone);success=true;}catch (e)
{
success=false;};}if (!success)
{
try
{
var elementHTML=this.getOuterHTML(source);target.innerHTML=elementHTML;success=true;}catch (e)
{
success=false;};}return success;};function WUtilities_getWidth(element)
{
return element.offsetWidth;};function WUtilities_getHeight(element)
{
return element.offsetHeight;};function WUtilities_getLeft(element, recurse)
{
var value=0;if (recurse && element.offsetParent != null)
{
value+=this.getLeft(element.offsetParent, recurse);}if (element != null)
{
value+=element.offsetLeft;}return value;};function WUtilities_getTop(element, recurse)
{
var value=0;if (recurse && element.offsetParent != null)
{
value+=this.getTop(element.offsetParent, recurse);}if (element != null)
{
value+=element.offsetTop;}return value;};function WUtilities_getOffsetWidth(element, document)
{
var offsetW=element.parentNode.offsetWidth;if (WClient.isBrowserMozilla() && offsetW == 0) {
offsetW=parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("width"));if (isNaN(offsetW))
offsetW=0;}return offsetW;};function WEvent(eventObject)
{
this.eventObject=(eventObject ? eventObject : window.event);this.cancelBubble=false;this.returnValue=true;this.getEventType=new Function("", "return this.eventObject.type;");this.getDispatchElement=WEvent_getDispatchElement;this.getTargetElement=WEvent_getTargetElement;this.getCancelBubble=new Function("", "return this.cancelBubble;");this.setCancelBubble=WEvent_setCancelBubble;this.getReturnValue=new Function("", "return this.returnValue;");this.setReturnValue=WEvent_setReturnValue;this.isMouseEvent=WEvent_isMouseEvent;this.getOffsetPosition=WEvent_getOffsetPosition;this.getPagePosition=WEvent_getPagePosition;this.getScreenPosition=new Function("", "return new Position(this.eventObject.screenX,this.eventObject.screenY,0);");this.getButtonCode=new Function("", "return this.eventObject.button;");this.isKeyEvent=WEvent_isKeyEvent;this.isAltKeyPressed=new Function("", "return this.eventObject.altKey;");this.isCtrlKeyPressed=new Function("", "return this.eventObject.ctrlKey;");this.isShiftKeyPressed=new Function("", "return this.eventObject.shiftKey;");this.getKeyCode=WEvent_getKeyCode;};function WEvent_getDispatchElement()
{
if (WClient.isBrowserInternetExplorer())
{
return (this.eventObject.srcElement ? this.eventObject.srcElement : window.document);}else if (WClient.isBrowserMozilla())
{
var element=this.eventObject.target;if (element)
{
if (element.frames)
{
return element.document;}else
{
return element;}}else
{
return null;}}else
{
return null;}};function WEvent_getTargetElement()
{
if (WClient.isBrowserInternetExplorer())
{
return (this.eventObject.srcElement ? this.eventObject.srcElement : window.document);}else if (WClient.isBrowserMozilla())
{
var element=this.eventObject.currentTarget;if (element)
{
if (element.frames)
{
return element.document;}else
{
return element;}}else
{
return null;}}else
{
return null;}};function WEvent_setCancelBubble(cancelBubble)
{
this.cancelBubble=cancelBubble;this.eventObject.cancelBubble=this.cancelBubble;};function WEvent_setReturnValue(returnValue)
{
this.returnValue=returnValue;if (WClient.isBrowserInternetExplorer())
{
this.eventObject.returnValue=this.returnValue;}};function WEvent_isMouseEvent()
{
return (this.getKeyCode() == 0);};function WEvent_getOffsetPosition()
{
if (WClient.isBrowserInternetExplorer())
{
return new Position(this.eventObject.offsetX, this.eventObject.offsetY, 0);}else if (WClient.isBrowserMozilla())
{
return new Position(this.eventObject.clientX, this.eventObject.clientY, 0);}else
{
return null;};};function WEvent_getPagePosition()
{
if (WClient.isBrowserInternetExplorer())
{
return new Position(this.eventObject.clientX, this.eventObject.clientY, 0);}else if (WClient.isBrowserMozilla())
{
return new Position(this.eventObject.pageX, this.eventObject.pageY, 0);}else
{
return null;};};function WEvent_isKeyEvent()
{
return (this.getKeyCode() != 0);};function WEvent_getKeyCode()
{
if (WClient.isBrowserInternetExplorer())
{
return this.eventObject.keyCode;}else if (WClient.isBrowserMozilla())
{
return (this.eventObject.keyCode != 0 ? this.eventObject.keyCode : this.eventObject.charCode);}else
{
return null;};};function WImage(srcLTR, srcRTL, width, height, alt)
{
this.srcLTR=srcLTR;this.srcRTL=srcRTL;this.width=width;this.height=height;this.alt=alt;this.createElement=WImage_createElement;this.preloadImage=WImage_preloadImage;this.getSrc=WImage_getSrc;this.preloadImage(this.srcLTR);this.preloadImage(this.srcRTL);};function WImage_getSrc(isLTR)
{
if (isLTR != null && isLTR == false && this.srcRTL != null)
{
return this.srcRTL;}else
{
return this.srcLTR;}};function WImage_createElement(isLTR)
{
var img=document.createElement("IMG");img.src=this.getSrc(isLTR);img.width=this.width;img.height=this.height;img.alt=(this.alt ? this.alt : "");img.border=0;img.style.display="block";return img;};function WImage_preloadImage(src)
{
if (src != null)
{
var preload=new Image();preload.src=src;}};function WStyle(styleLTR, styleRTL)
{
this.styleLTR=styleLTR;this.styleRTL=styleRTL;if (this.styleRTL == null)
{
this.styleRTL=this.styleLTR;}this.applyStyle=WStyle_applyStyle;};function WStyle_applyStyle(tag, isLTR)
{
if (tag != null)
{
if (isLTR != null && isLTR == false)
{
if (this.styleRTL != null)
{
tag.style.cssText=this.styleRTL;tag.setAttribute("style", this.styleRTL);}}else
{
if (this.styleLTR != null)
{
tag.style.cssText=this.styleLTR;tag.setAttribute("style", this.styleLTR);}};tag.className=null;}};if (!self.WConnectionManager)
{
self.WConnectionManager=new Object();}function WConnection()
{
this.id=WUtilities.getGUID("WConnection");this.downloadId=WUtilities.getGUID("WConnection_download");this.downloadCallback=null;this.maxDownloadWaitTime= -1;this.downloadStartTime=0;this.downloadTimer=null;this.downloadTimeoutTimer=null;this.downloadComplete=false;this.destroy=WConnection_destroy;this.isDestroyed=WConnection_isDestroyed;this.download=WConnection_download;this.isDownloadComplete=WConnection_isDownloadComplete;WConnectionManager[this.id]=this;};function WConnection_destroy()
{
WConnectionManager[this.id]=null;};function WConnection_isDestroyed()
{
return (WConnectionManager[this.id] == null);};function WConnection_download(url, callback, maxWaitTime)
{
this.downloadCallback=callback;this.maxDownloadWaitTime=(maxWaitTime ? maxWaitTime : -1);this.downloadStartTime=(new Date()).valueOf();this.downloadComplete=false;var commFrame=document.getElementById(this.id);if (commFrame != null)
{
if (WClient.isBrowserInternetExplorer())
{
document.body.removeChild(commFrame);}else
{
this.downloadId=WUtilities.getGUID("WConnection_download");};}commFrame=document.createElement("IFRAME");with (commFrame)
{
id=this.downloadId;name=this.downloadId;src=url;frameBorder=0;marginHeight=0;marginWidth=0;with (style)
{
position="absolute";visibility="hidden";};};document.body.appendChild(commFrame);if (WClient.isBrowserInternetExplorer())
{
WConnection_waitForDownload(this.id);}else
{
WConnection_checkDownloadTimeout(this.id);var frame=window.frames[this.downloadId];frame.onload=new Function("", "WConnection_waitForDownload('" + this.id + "');");};};function WConnection_downloadCompleted(connectionId)
{
var connection=(connectionId ? WConnectionManager[connectionId] : this);var frame=window.frames[connection.downloadId];var root=frame.document.documentElement;var content=null;clearTimeout(connection.downloadTimer);clearTimeout(connection.downloadTimeoutTimer);var currentTime=(new Date()).valueOf();var elapsedTime=(currentTime - connection.downloadStartTime);if (WClient.isBrowserMozilla())
{
var startTag="<" + root.tagName;var endTag="</" + root.tagName + ">";for (var i=0; i < root.attributes.length; i++)
{
var attribute=root.attributes.item(i);startTag+=" " + attribute.name + "=\"" + attribute.value + "\"";};startTag+=">";content=startTag + root.innerHTML + endTag;var commFrame=document.getElementById(connection.id);if (commFrame != null)
{
commFrame.disabled=true;}}else
{
content=root.outerHTML;}connection.downloadComplete=true;connection.downloadCallback(content, elapsedTime);};function WConnection_downloadFailed(connectionId)
{
var connection=(connectionId ? WConnectionManager[connectionId] : this);var currentTime=(new Date()).valueOf();var elapsedTime=(currentTime - connection.downloadStartTime);clearTimeout(connection.downloadTimer);clearTimeout(connection.downloadTimeoutTimer);connection.downloadComplete=true;connection.downloadCallback(null, elapsedTime);};function WConnection_waitForDownload(connectionId)
{
var connection=(connectionId ? WConnectionManager[connectionId] : this);var currentTime=(new Date()).valueOf();var elapsedTime=(currentTime - connection.downloadStartTime);clearTimeout(connection.downloadTimer);if (!connection.downloadComplete)
{
if (connection.maxDownloadWaitTime != -1 &&
elapsedTime > connection.maxDownloadWaitTime)
{
WConnection_downloadFailed(connection.id);}else if (!connection.isDownloadComplete())
{
connection.downloadTimer=setTimeout("WConnection_waitForDownload('" + connectionId + "')", 20);}else
{
WConnection_downloadCompleted(connection.id);};}};function WConnection_checkDownloadTimeout(connectionId)
{
var connection=(connectionId ? WConnectionManager[connectionId] : this);var currentTime=(new Date()).valueOf();var elapsedTime=(currentTime - connection.downloadStartTime);clearTimeout(connection.downloadTimeoutTimer);if (!connection.downloadComplete)
{
if (connection.maxDownloadWaitTime != -1 &&
elapsedTime > connection.maxDownloadWaitTime)
{
WConnection_downloadFailed(connection.id);}else
{
connection.downloadTimeoutTimer=setTimeout("WConnection_checkDownloadTimeout('" + connection.id + "')", 20);};}};function WConnection_isDownloadComplete(connectionId)
{
var connection=(connectionId ? WConnectionManager[connectionId] : this);var isComplete=false;if (connection.downloadComplete)
{
isComplete=true;}else
{
try
{
var frame=window.frames[connection.downloadId];if (WClient.isBrowserInternetExplorer())
{
isComplete=(frame && frame.document && frame.document.documentElement && frame.document.readyState == 'complete');}else
{
isComplete=(frame && frame.document && frame.document.documentElement);};}catch (e)
{
WConnection_downloadFailed(connection.id);};}return isComplete;};function Position(x, y, z)
{
this.x=(x ? x : 0);this.y=(y ? y : 0);this.z=(z ? z : 100);this.getX=new Function("", "return this.x");this.getY=new Function("", "return this.y");this.getZ=new Function("", "return this.z");this.toString=new Function('', 'return ("[x="+this.x+",y="+this.y+",z="+this.z+"]")');};function Dimension(width, height)
{
this.width=(width ? width : 0);this.height=(height ? height : 0);this.getWidth=new Function("", "return this.width");this.getHeight=new Function("", "return this.height");this.toString=new Function('', 'return ("[width="+this.width+",height="+this.height+"]")');};function Size(width, height)
{
this.width=(width ? width : 0);this.height=(height ? height : 0);this.toString=new Function('', 'return ("[width="+this.width+",height="+this.height+"]")');};function getEvent(event) {
if (event != null) {
return event;}else if (window.event != null) {
return window.event;}else {
for (var i=0; i<document.frames.length; i++) {
if (document.frames[i].window.event != null) {
return document.frames[i].window.event;}};}return null;};function getEventTarget(event) {
var aEvent=getEvent(event);if (aEvent != null) {
if (aEvent.target != null) {
return aEvent.target;}else if (aEvent.srcElement != null) {
return aEvent.srcElement;}}return null;};function getEventDocument(event) {
var target=getEventTarget(event);if (target != null) {
return target.ownerDocument;}return null;};