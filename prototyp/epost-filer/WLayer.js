//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
function WLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency)
{
this.id=id;this.parentWindow=(parentWindow ? parentWindow : self);this.scrollable=(scrollable ? scrollable : false);this.sizeToContent=(sizeToContent ? sizeToContent : true);this.allowTransparency=(allowTransparency ? allowTransparency : false);this.containerGUID=WUtilities.getGUID(this.id + '_container');this.rendered=false;this.timeout=-1;this.timeoutType="destroy";this.setEventListeners=false;this.timer=null;this.dimension=new Dimension(200, 100);this.html=null;this.htmlElement=null;this.position=new Position(0, 0, 0);this.visible=true;this.init=WLayer_init;this.getContentDimension=WLayer_getContentDimension;this.sizeContainerToContent=WLayer_sizeContainerToContent;this.setHTML=WLayer_setHTML;this.setHTMLElement=WLayer_setHTMLElement;this.setDimension=WLayer_setDimension;this.setPosition=WLayer_setPosition;this.setVisible=WLayer_setVisible;this.setTimeout=WLayer_setTimeout;this.clearTimeout=WLayer_clearTimeout;this.getID=WLayer_getID;this.isRendered=WLayer_isRendered;this.getDimension=new Function("", "return this.dimension;");this.getPosition=new Function("", "return this.position;");this.isVisible=new Function("", "return this.visible;");this.isSizeToContent=new Function("", "return this.sizeToContent;");this.isScrollable=new Function("", "return this.scrollable;");this.getContainer=WLayer_getContainer;this.render=WLayer_render;this.update=WLayer_update;this.destroy=WLayer_destroy;this.init();};function WLayer_init()
{
};function WLayer_getContentDimension()
{
var contentDimension=null;var container=this.getContainer();if (container)
{
container.style.width="0px";container.style.height="0px";var contentElement=container.childNodes.item(0);if (contentElement)
{
contentDimension=new Dimension(contentElement.offsetWidth, contentElement.offsetHeight);}}return contentDimension;};function WLayer_setDimension(dimension)
{
this.dimension=(dimension ? dimension : new Dimension(200, 100));this.sizeToContent=false;var container=this.getContainer();if (container)
{
container.style.width=this.dimension.getWidth() + "px";container.style.height=this.dimension.getHeight() + "px";}};function WLayer_setHTML(html)
{
this.html=html;};function WLayer_setHTMLElement(htmlElement)
{
this.htmlElement=htmlElement;};function WLayer_setPosition(position)
{
this.position=(position ? position : new Position(0, 0, 100));var container=this.getContainer();if (container)
{
container.style.left=this.position.getX() + "px";container.style.top=this.position.getY() + "px";container.style.zIndex=this.position.getZ();}};function WLayer_setVisible(visible)
{
if (this.visible != visible)
{
this.visible=(visible && visible == true ? true : false);var container=this.getContainer();if (container)
{
container.style.visibility=(this.visible ? "visible" : "hidden");}}};function WLayer_getID()
{
return this.id;};function WLayer_isRendered()
{
return this.rendered;};function WLayer_getContainer()
{
return this.parentWindow.document.getElementById(this.containerGUID);};function WLayer_render()
{
};function WLayer_update()
{
};function WLayer_destroy()
{
};function WLayer_sizeContainerToContent()
{
var contentDimension=this.getContentDimension();if (contentDimension != null)
{
var tempSizeToContent=this.sizeToContent;this.setDimension(contentDimension);this.sizeToContent=tempSizeToContent;}};function WLayer_setTimeout(milliseconds, type, setEventListeners)
{
this.timeout=milliseconds;this.timeoutType=(type ? type : "destroy");this.setEventListeners=(setEventListeners ? setEventListeners : false);if (!this.isRendered())
{
if (this.setEventListeners)
{
var container=this.getContainer();container.onmouseover=new Function("", "WLayer_stopTimer('" + this.id + "');");container.onfocus=new Function("", "WLayer_stopTimer('" + this.id + "');");container.onmouseout=new Function("", "WLayer_startTimer('" + this.id + "');");container.onblur=new Function("", "WLayer_startTimer('" + this.id + "');");}}if (this.timeout >= 0)
{
clearTimeout(this.timer);this.timer=setTimeout('WLayer_handleTimeout("' + this.id + '")', this.timeout);}};function WLayer_clearTimeout()
{
if (this.timer != null)
{
clearTimeout(this.timer);this.timer=null;this.timeout=-1;}};function WLayer_stopTimer(id)
{
var layer=WLayerManager.getWLayerByID(id);if (layer)
{
layer.tempTimeout=new Number(layer.timeout);layer.clearTimeout();}};function WLayer_startTimer(id)
{
var layer=WLayerManager.getWLayerByID(id);if (layer)
{
var timeout=(layer.tempTimeout ? layer.tempTimeout : layer.timeout);layer.setTimeout(timeout);}};function WLayer_handleTimeout(id)
{
var layer=WLayerManager.getWLayerByID(id);if (layer)
{
layer.clearTimeout();if (this.timeoutType == "destroy")
{
layer.destroy();}else
{
layer.setVisible(false);};}};