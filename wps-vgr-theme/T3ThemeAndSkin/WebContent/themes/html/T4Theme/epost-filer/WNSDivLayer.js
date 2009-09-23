//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
function WNSDivLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency)
{
this.superclass=WDivLayer;this.superclass(id, parentWindow, scrollable, sizeToContent, allowTransparency);delete this.superclass;this.sizeContainerToContent=WNSDivLayer_sizeContainerToContent;this.sizeContainerToContentImpl=WNSDivLayer_sizeContainerToContentImpl;this.getContentDimension=WNSDivLayer_getContentDimension;this.setVisible=WNSDivLayer_setVisible;};function WNSDivLayer_sizeContainerToContent()
{
if (this.isRendered() || this.html == null)
{
this.sizeContainerToContentImpl();}else
{
this.sizeContainerToContentImpl();this.setVisible(false);var originalHTML=this.html;var tempHTML="<div>temporary content</div>";setTimeout("WLayerManager.getWLayerByID('" + this.id + "').setHTML('" + tempHTML + "')", 100);setTimeout("WLayerManager.getWLayerByID('" + this.id + "').setHTML('" + originalHTML + "')", 200);setTimeout("WLayerManager.getWLayerByID('" + this.id + "').setVisible(true)", 210);};};function WNSDivLayer_sizeContainerToContentImpl()
{
var contentDimension=this.getContentDimension();if (contentDimension != null)
{
var tempSizeToContent=this.sizeToContent;this.setDimension(contentDimension);this.sizeToContent=tempSizeToContent;}};function WNSDivLayer_getContentDimension()
{
var contentDimension=null;var container=this.getContainer();if (container)
{
var containerWidth=container.style.width;container.style.width="";var contentElement=container.childNodes.item(0);if (contentElement)
{
if (this.scrollable)
{
container.style.overflow="visible";var width=parseInt(Math.max(contentElement.offsetWidth, container.offsetWidth));var containerHeight=0;if (this.isRendered())
{
containerHeight=container.style.height;container.style.height="0px";}var height=parseInt(Math.max(contentElement.offsetHeight, container.offsetHeight));container.style.overflow="auto";contentDimension=new Dimension(width, height);if (this.isRendered())
{
container.style.height=containerHeight;}}else
{
contentDimension=new Dimension(contentElement.offsetWidth, contentElement.offsetHeight);}}container.style.width=containerWidth;}return contentDimension;};function WNSDivLayer_setVisible(visible)
{
if (this.visible != visible)
{
this.visible=(visible && visible == true ? true : false);var container=this.getContainer();if (container)
{
if (this.visible)
{
container.style.visibility="visible";}else
{
container.style.visibility="hidden";}}}};