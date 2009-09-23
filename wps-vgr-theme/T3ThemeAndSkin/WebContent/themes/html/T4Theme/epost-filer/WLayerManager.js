//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
if (!self.WLayerManager)
{
self.WLayerManager=new WLayerManagerImpl();}function WLayerManagerImpl()
{
this.layers=new Object();this.addWLayer=WLayerManager_addWLayer;this.removeWLayer=WLayerManager_removeWLayer;this.getWLayerByID=WLayerManger_getWLayerByID;};function WLayerManager_addWLayer(wLayer)
{
var oldLayer=null;if (wLayer != null)
{
oldLayer=this.layers[wLayer.getID()];this.layers[wLayer.getID()]=wLayer;}return oldLayer;};function WLayerManager_removeWLayer(wLayer)
{
var oldLayer=null;if (wLayer != null)
{
oldLayer=this.layers[wLayer.getID()];this.layers[wLayer.getID()]=null;}return oldLayer;};function WLayerManger_getWLayerByID(id)
{
return this.layers[id];};