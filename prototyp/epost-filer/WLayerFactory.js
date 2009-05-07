//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
if (!self.WLayerFactory)
{
self.WLayerFactory=new WLayerFactoryImpl();}function WLayerFactoryImpl()
{
this.init=WLayerFactory_init;this.createWLayer=WLayerFactory_createWLayer;this.init();};function WLayerFactory_init()
{
};function WLayerFactory_createWLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency, secureURL)
{
var layer=null;if (WClient.isBrowserInternetExplorer())
{
layer=new WIEDivLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency, secureURL);}else if (WClient.isBrowserNetscape())
{
layer=new WNSDivLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency);}else if (WClient.isBrowserMozilla())
{
layer=new WNSDivLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency);}else
{
layer=new WDivLayer(id, parentWindow, scrollable, sizeToContent, allowTransparency);};WLayerManager.addWLayer(layer);return layer;};