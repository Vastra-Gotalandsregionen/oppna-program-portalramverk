//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
function WDivLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency)
{
this.superclass=WLayer;this.superclass(id, parentWindow, scrollable, sizeToContent, allowTransparency);delete this.superclass;this.render=WDivLayer_render;this.update=WDivLayer_update;this.destroy=WDivLayer_destroy;this.setHTML=WDivLayer_setHTML;this.setHTMLElement=WDivLayer_setHTMLElement;};function WDivLayer_render()
{
var container=this.getContainer();if (!container)
{
container=this.parentWindow.document.createElement("DIV");with (container)
{
id=this.containerGUID;innerHTML=(this.html != null ? this.html : "");dir="LTR";  // @01
with (style)
{
position="absolute";overflow=(this.scrollable ? "auto" : "hidden");left=this.position.getX() + "px";top=this.position.getY() + "px";zIndex=this.position.getZ();width=this.dimension.getWidth() + "px";height=this.dimension.getHeight() + "px";visibility=(this.visible ? "visible" : "hidden");if (this.sizeToContent)
{
whiteSpace="nowrap";}if (!this.allowTransparency)
{
backgroundColor="#ffffff";}};};this.parentWindow.document.body.appendChild(container);if (this.htmlElement != null)
{
container=this.parentWindow.document.getElementById(this.containerGUID);container.appendChild(this.htmlElement);}if (this.sizeToContent)
{
this.sizeContainerToContent();}this.setTimeout(this.timeout, this.timeoutType);this.rendered=true;}};function WDivLayer_update()
{
if (this.sizeToContent)
{
this.sizeContainerToContent();}};function WDivLayer_destroy()
{
var container=this.getContainer();if (container)
{
this.parentWindow.document.body.removeChild(container);}WLayerManager.removeWLayer(this);};function WDivLayer_setHTML(html)
{
if (this.html != html)
{
this.html=html;this.htmlElement=null;if (this.isRendered())
{
var container=this.getContainer();var currentElement=container.childNodes.item(0);if (currentElement != null)
{
container.removeChild(currentElement);}container.innerHTML=(this.html != null ? this.html : "");if (this.sizeToContent)
{
this.sizeContainerToContent();}else if (parseInt(WClient.getBrowserVersion()) == 6)
{
var tempPosition=this.position;this.setPosition(new Position(this.position.getX()+1, this.position.getY()+1, this.position.getZ()+1));this.setPosition(tempPosition);}}}};function WDivLayer_setHTMLElement(htmlElement)
{
if (this.htmlElement != htmlElement)
{
this.htmlElement=htmlElement;this.html=null;if (this.isRendered())
{
var container=this.getContainer();var currentElement=container.childNodes.item(0);if (currentElement != null)
{
container.removeChild(currentElement);}container.appendChild(this.htmlElement);if (this.sizeToContent)
{
this.sizeContainerToContent();}else if (parseInt(WClient.getBrowserVersion()) == 6)
{
var tempPosition=this.position;this.setPosition(new Position(this.position.getX()+1, this.position.getY()+1, this.position.getZ()+1));this.setPosition(tempPosition);}}}};