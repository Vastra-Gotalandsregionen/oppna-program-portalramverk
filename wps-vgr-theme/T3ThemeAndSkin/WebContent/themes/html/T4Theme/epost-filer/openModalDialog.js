// (C) Copyright IBM Corp. 2002, 2006  All Rights Reserved
if (typeof(window.BrowserWindowClose)=="undefined"){
window.BrowserWindowClose=window.close;}function isGecko() {
return (document.all) ? false : true;};function openModalDialog(sUrl, fCallback) {
window.modalCallback=fCallback;var args=new Object();args.window=window;var retVal=window.showModalDialog(sUrl, args, 'resizable: Yes;status: No;help: No;');if (retVal) window.modalCallback(retVal);};function openModalDialogWithArgs(sUrl,args, fCallback)
{
window.modalCallback=fCallback;var retVal=window.showModalDialog(sUrl, args, 'resizable: Yes;status: No;');if (retVal) window.modalCallback(retVal);};function closeModalDialog(data) {
if (data) {
window.returnValue=data;if (isGecko() && window.opener && window.opener.modalCallback) {
window.opener.removeEventListener("focus", resetFocus, false);window.opener.removeEventListener("click", resetFocus, false);window.opener.removeEventListener("change", resetFocus, false);window.opener.modalCallback(data);}}window.close();};if(isGecko())
{
window.showModalDialog=Gecko_showModalDialog;}oGeckoDlgArg=null;oGeckoDlgRet=null;function Gecko_showModalDialog(url, args, opt)
{
var title="";if(typeof args == "object")
if(args && args.dlgTitle)
title=args.dlgTitle;else
title="";else
if(typeof args == "string")
title=args;var aOpts;if (opt) aOpts=opt.split(";");else aOpts=new Array();aOpts[aOpts.length]="dialog:yes";aOpts[aOpts.length]="modal:yes";for(var i=0;i<aOpts.length;i++)
{
var aPair=aOpts[i].split(":");switch(aPair[0])
{
case "dialogHeight":
aPair[0]="height";break;case "dialogWidth":
aPair[0]="width";break;case "center":
aPair[0]="centerscreen";break;};aOpts[i]=aPair.join("=");};var sOpts=aOpts.join(",");oGeckoDlgArg=args;oGeckoDlgRet=null;window.modalWin=this.open(url, title, sOpts);window.addEventListener("focus", resetFocus, false);window.addEventListener("click", resetFocus, false);window.addEventListener("change", resetFocus, false);return oGeckoDlgRet;};if(isGecko())
{
Gecko_InitDialog();if(top.opener && top.opener.oGeckoDlgArg && !window.closeSwap) {
window.closeSwap=true;window.closeOrgLwp=window.close;window.close=Gecko_CloseWindow;}}function Gecko_InitDialog()
{
if(top.opener && top.opener.oGeckoDlgArg)
self.dialogArguments=top.opener.oGeckoDlgArg;};function Gecko_EndDialog()
{
if(top.opener)
top.opener.oGeckoDlgRet=self.returnValue;};function Gecko_CloseWindow()
{
Gecko_EndDialog();window.closeOrgLwp();};function resetFocus(event) {
window.modalWin.focus();};function resizeDialog(contentWidth, contentHeight, gWidth, gHeight) {
if (isGecko()) {
window.innerWidth=(gWidth == null) ? contentWidth : gWidth;window.innerHeight=(gHeight == null) ? contentHeight : gHeight;} else {
var dialogHeight=parseInt(window.dialogHeight.substring(0, window.dialogHeight.length-2));var dialogWidth=parseInt(window.dialogWidth.substring(0, window.dialogWidth.length-2));var chromeHeight=dialogHeight - document.body.offsetHeight;var chromeWidth=dialogWidth - document.body.offsetWidth;window.dialogHeight="" + (contentHeight + chromeHeight) + "px";window.dialogWidth="" + (contentWidth + chromeWidth) + "px";};};
