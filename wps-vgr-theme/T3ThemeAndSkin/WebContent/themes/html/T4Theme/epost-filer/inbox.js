// (C) Copyright IBM Corp. 2002, 2006  All Rights Reserved
var g_aDivsToAlign=(!g_aDivsToAlign) ? new Array() : g_aDivsToAlign;inbox=function(msgSearchString, msgEmptyTrash, msgEmptyJunk, mailboxActionURL, callbackFormName, msgNoSelection, mailboxFormName,  urlCompose, switchFolderForm, idQueryString, idHeaderSelect, searchActionUrl, mailSearchFormHeaders,  queryStringValueName, mailboxcheckmail, mailboxnewmail, mailboxmovetofolder, mailboxdelete, mailboxEmptyjunk, mailboxRestoretoFolder, doNotShowAgain, msgDeleteAsJunk, msgNotJunk, emptyTrashForm, moveToFolderUrl, blockSenderUrl, msgRestoreMessages, dangerousUrlProtectionNonceName, saveUrl,saveAttach)
{
this.msgSearchString=msgSearchString;this.msgEmptyTrash=msgEmptyTrash;this.msgEmptyJunk=msgEmptyJunk;this.mailboxActionURL=mailboxActionURL;this.callbackFormName=callbackFormName;this.msgNoSelection=msgNoSelection;this.mailboxFormName=mailboxFormName;this.urlCompose=urlCompose;this.switchFolderForm=switchFolderForm;this.idQueryString=idQueryString;this.idHeaderSelect=idHeaderSelect;this.searchActionUrl=searchActionUrl;this.mailSearchFormHeaders=mailSearchFormHeaders;this.queryStringValueName=queryStringValueName;this.mailboxcheckmail=mailboxcheckmail;this.mailboxnewmail=mailboxnewmail;this.mailboxmovetofolder=mailboxmovetofolder;this.mailboxdelete=mailboxdelete;this.mailboxEmptyjunk=mailboxEmptyjunk;this.mailboxRestoretoFolder=mailboxRestoretoFolder;this.doNotShowAgain=doNotShowAgain;this.msgDeleteAsJunk=msgDeleteAsJunk;this.msgNotJunk=msgNotJunk;this.emptyTrashForm=emptyTrashForm;this.moveToFolderUrl=moveToFolderUrl;this.blockSenderUrl=blockSenderUrl;this.msgRestoreMessages=msgRestoreMessages;this.dangerousUrlProtectionNonceName=dangerousUrlProtectionNonceName;this.saveUrl=saveUrl;this.saveUrlAttach=saveAttach;};inbox.prototype.validateSearchString=function(inputElementId)
{
var aEl=document.getElementsByName(inputElementId);var sStr=aEl[0].value.replace(/\s/g, '');var isBlank=(sStr.length < 1);if (isBlank) alert(this.msgSearchString);return !isBlank;};inbox.prototype.confirmEmptyTrash=function ()
{
return (confirm(this.msgEmptyTrash));};inbox.prototype.emptyTrashWithConfirm=function ()
{
if (this.confirmEmptyTrash())
{
var form=pageGetElementById(this.emptyTrashForm);if (form) {
form.submit();}}return false;};inbox.prototype.confirmEmptyJunk=function ()
{
return confirm(this.msgEmptyJunk);};inbox.prototype.genericCallback=function (url, action, result, callbackformName, mailboxForm)
{
var callbackform=document.forms[callbackformName];if (result.confirmed) {
if (result.checked) {
callbackform.dontShow.value='true';}callbackform.action=url;if (action.length > 0)
{
callbackform.elements["mailbox.action"].value=action;}var output="";var children=document.forms[mailboxForm].elements;for(var i=0; i < children.length; i++)
{
var child=children[i];if(child != null &&
child.name != null &&
child.name.indexOf("client-select") >= 0)
{
if(child.checked) output=output + child.value + "*";}};callbackform.callbackSelectedKeys.value=output;callbackform.submit();}return false;};inbox.prototype.confirmNotJunkCallback=function (result)
{
var inboxTemp=inbox.inboxTemp;return(inboxTemp.genericCallback(inboxTemp.mailboxActionURL, "notJunk", result, inboxTemp.callbackFormName, inboxTemp.mailboxFormName));};inbox.prototype.confirmRestoreMessagesCallback=function (result)
{
if (inbox.inboxTemp == null)
inbox.inboxTemp=this;var inboxTemp=inbox.inboxTemp;return(inboxTemp.genericCallback(inboxTemp.mailboxActionURL, "restore", result, inboxTemp.callbackFormName, inboxTemp.mailboxFormName));};inbox.prototype.validateSelection=function (inputElementId)
{
var aEl=document.getElementsByName(inputElementId);if(!lwpTableCheckSelection(aEl[0]))
{
alert(this.msgNoSelection);return false;}return true;};inbox.prototype.confirmDeleteAsJunkCallback=function (result)
{
var inboxTemp=inbox.inboxTemp;return(inboxTemp.genericCallback(inboxTemp.mailboxActionURL, "deleteAsJunk", result, inboxTemp.callbackFormName, inboxTemp.mailboxFormName));};inbox.prototype.moveToFolderCallback=function (result)
{
var inboxTemp=inbox.inboxTemp;return inboxTemp.genericCallback(inboxTemp.moveToFolderUrl, "", result, inboxTemp.callbackFormName, inboxTemp.mailboxFormName);};inbox.prototype.composeNewMail=function ()
{
self.location.href=this.urlCompose;return false;};inbox.prototype.onHighlight=function (thisObj, odcEvent)
{
var eObj=odcEvent.eobject;if (eObj != null && typeof(eObj) != 'undefined')
{
folderKey=eObj.eGet("keyString");var s1=thisObj.rootItem.generateUIStateString();var s2="";for(var i=0; i<s1.length; i++)
{
var ch=s1.charAt(i);if(ch == '"')
s2+='\\"';else
s2+=ch;};var form=pageGetElementById(this.switchFolderForm);if (form) {
form.fkey.value=folderKey;form.uIStateString.value=s2;form.submit();}}};inbox.prototype.openPreferences=function (location)
{
self.location.href=location;return false;};inbox.prototype.doSearch=function (querystr)
{
if (this.validateSearchString(this.idQueryString)) {
var form=document.createElement("form");form.method="POST";form.target="_self";form.action=this.searchActionUrl;var hdrs=document.getElementsByName(this.idHeaderSelect)[0];var html='<input type="hidden" name="headers" value="' + hdrs.value + '">';html+='<input type="hidden" name="queryString" value="' + querystr + '">';form.innerHTML=html;document.documentElement.appendChild(form);form.submit();}};inbox.prototype.doSrchKeyDown=function (event, qstr)
{
if (event.keyCode==13)
{
this.doSearch(qstr);eventCancel();return false;}return true;};inbox.prototype.switchFolder=function (fkey)
{
var form=pageGetElementById(this.switchFolderForm);if (form) {
form.fkey.value=fkey;form.submit();eventCancel();}return false;};inbox.prototype.setSearchFormValues=function ()
{
var queryStrInput=document.getElementsByName(this.idQueryString)[0];queryStrInput.value=document.getElementById(this.queryStringValueName).innerHTML;if (queryStrInput.value=="null") queryStrInput.value="";var headerSelectMenu=document.getElementsByName(this.idHeaderSelect)[0];var headerVal=this.mailSearchFormHeaders;var currIdx=0;var selectedIdx=-1;while (currIdx < headerSelectMenu.options.length && selectedIdx < 0) {
if (headerSelectMenu.options[currIdx].value == headerVal) selectedIdx=currIdx;currIdx++;};if (selectedIdx < 0) selectedIdx=0;headerSelectMenu.selectedIndex=selectedIdx;};inbox.prototype.alignTreeControl=function ()
{
if (!isGecko())
{
var but=document.getElementsByName(this.mailboxcheckmail)[0];if (but)
{
but.style.width=10;}but=document.getElementsByName(this.mailboxnewmail)[0];if (but)
{
but.style.width=10;}but=document.getElementsByName(this.mailboxmovetofolder)[0];if (but)
{
but.style.width=10;}but=document.getElementsByName(this.mailboxdelete)[0];if (but)
{
but.style.width=10;}}for(var i=0; i < g_aDivsToAlign.length; i++)
{
var aID=g_aDivsToAlign[i];if(!aID) continue;var divL=document.getElementById(aID[0]);var divR=document.getElementById(aID[1]);var divTree=document.getElementById(aID[2]);var hL=0;var hR=0;if(divL != null)
{
var nLWidth=0;if (isGecko)
{
nLWidth=divL.parentNode.offsetWidth;}hL=divL.scrollHeight;hR=divR.scrollHeight;if(hL != hR)
{
divL.style.overflow="hidden";divL.style.height=hR + "px";if (!isGecko())
{
if (divL.scrollHeight > divL.offsetHeight)
{
divL.style.height=divL.offsetHeight - (divL.scrollHeight - divL.offsetHeight);divL.style.overflow="";}}if(hL > hR)
{
var n=divTree.scrollHeight;divTree.style.overflowY="scroll";divTree.style.height=(n - (hL - hR)) + "px";}}if (isGecko && (divL.parentNode.offsetWidth != nLWidth))
{
divL.parentNode.style.width=nLWidth+ "px";;}}};};inbox.prototype.confirmNotJunk=function (notJunk)
{
if (this.validateSelection(this.mailboxEmptyjunk))
{
inbox.inboxTemp=this;if (notJunk != null && notJunk.indexOf("true") > -1)
{
var messageBox=new NG.messageBox();messageBox.confirm(
this.msgNotJunk,
this.doNotShowAgain,
this.confirmNotJunkCallback);}else
{
var result=new Object();result.confirmed=true;result.checked=false;this.confirmNotJunkCallback(result);};return false;}};inbox.prototype.confirmDeleteJunk=function(deleteAsJunk)
{
if (this.validateSelection(this.mailboxmovetofolder))
{
inbox.inboxTemp=this;if (deleteAsJunk == "true")
{
var messageBox=new NG.messageBox();messageBox.confirm(
this.msgDeleteAsJunk,
this.doNotShowAgain,
this.confirmDeleteAsJunkCallback);}else if (deleteAsJunk != "true")
{
var result=new Object();result.confirmed=true;result.checked=false;this.confirmDeleteAsJunkCallback(result);}}return false;};inbox.prototype.confirmRestoreMessages=function()
{
if (this.validateSelection(this.mailboxRestoretoFolder))
{
inbox.inboxTemp=this;var messageBox=new NG.messageBox();messageBox.confirm(
this.msgRestoreMessages,
this.doNotShowAgain,
this.confirmRestoreMessagesCallback);}return false;};inbox.prototype.moveToFolder=function (isspam, notjunk)
{
if (this.validateSelection(this.mailboxmovetofolder))
{
inbox.inboxTemp=this;if(isspam == "true" && notjunk == "true")
{
var messageBox=new NG.messageBox();messageBox.confirm(
this.msgNotJunk,
this.doNotShowAgain,
this.moveToFolderCallback);return false;}else
{
var result=new Object();result.confirmed=true;result.checked=false;this.moveToFolderCallback(result);};}return false;};inbox.prototype.showQuickFindDialog=function (strOK, strCancel, strTitle, strDateColumn, strSizeColumn,
strDlgUrl, strActionUrl, idMainDiv, idScriptsDiv, idDatePickerDiv, idHeaderSelect,
idQueryString, idDatePicker, idMoveToClosest, strWarningInvalidNum)
{
var args=new Object();args.okText=strOK;args.cancelText=strCancel;args.title=strTitle;var oDivQFUI=document.getElementById(idMainDiv);args.innerHTML=oDivQFUI.innerHTML;args.styleSheets=new Array();for (var i=0; i < document.styleSheets.length; i++) {
args.styleSheets[i]=document.styleSheets[i].href;};args.scripts=new Array();var oDivScript=document.getElementById(idScriptsDiv);for (var i=0; i < oDivScript.childNodes.length; i++)
{
var obj=oDivScript.childNodes[i];if (obj.tagName == "SCRIPT" && obj.src)
args.scripts[args.scripts.length]=obj.src;};var oDivDatePicker=document.getElementById(idDatePickerDiv);for (var i=0; i < oDivDatePicker.childNodes.length; i++)
{
var obj=oDivDatePicker.childNodes[i];if (obj.tagName == "SCRIPT" && obj.src)
args.scripts[args.scripts.length]=obj.src;};args.width=480;args.dir=document.body.dir;args.idField=idHeaderSelect;args.idQuery=idQueryString;args.idDatePickerDiv=idDatePickerDiv;args.idDatePicker=idDatePicker;args.sDateColumn=strDateColumn;args.sSizeColumn=strSizeColumn;args.idMoveToNext=idMoveToClosest;args.sWarningInvalidNum=strWarningInvalidNum;args.strActionUrl=strActionUrl;args.caller=this;openModalDialogWithArgs(strDlgUrl, args, this.doQuickFindCallback);return false;};inbox.prototype.doQuickFind=function (strField, strQuery, strExactmatch, strActionUrl)
{
var form=document.createElement("form");form.method="POST";form.target="_self";form.action=strActionUrl;var html='<input type="hidden" name="quickFindHeaders" value="' + strField + '">';html+='<input type="hidden" name="quickFindQueryString" value="' + strQuery + '">';html+='<input type="hidden" name="quickFindIsExactMatch" value="' + strExactmatch + '">';form.innerHTML=html;document.documentElement.appendChild(form);form.submit();};inbox.prototype.doQuickFindCallback=function (data)
{
if (data)
{
data.caller.doQuickFind(data.FieldVal, data.QueryVal, data.ExactMatchVal, data.strActionUrl);data.caller=null;}};inbox.prototype.deleteSelected=function()
{
if (this.validateSelection(this.mailboxdelete))
{
var result=new Object();result.confirmed=true;result.checked=false;document.forms[this.callbackFormName].DangerousUrlProtectionNonce.value=document.forms[this.mailboxFormName].elements[this.dangerousUrlProtectionNonceName].value;return this.genericCallback(this.mailboxActionURL, "delete", result, this.callbackFormName, this.mailboxFormName);}return false;};inbox.prototype.markUnread=function(inputElementId)
{
if(this.validateSelection(inputElementId))
{
var result=new Object();result.confirmed=true;result.checked=false;document.forms[this.callbackFormName].DangerousUrlProtectionNonce.value=document.forms[this.mailboxFormName].elements[this.dangerousUrlProtectionNonceName].value;return this.genericCallback(this.mailboxActionURL , "markUnread", result, this.callbackFormName, this.mailboxFormName);}return false;};inbox.prototype.blockSender=function(inputElementId)
{
if(this.validateSelection(inputElementId))
{
var result=new Object();result.confirmed=true;result.checked=false;return this.genericCallback(this.blockSenderUrl, "", result, this.callbackFormName, this.mailboxFormName);}return false;};inbox.prototype.saveToFile=function(inputElementId, bAttach)
{
if(this.validateSelection(inputElementId))
{
var result=new Object();result.confirmed=true;result.checked=false;var url=this.saveUrl ;if(bAttach == true){
url=this.saveUrlAttach;}else{
url=this.saveUrl;}document.forms[this.callbackFormName].DangerousUrlProtectionNonce.value=document.forms[this.mailboxFormName].elements[this.dangerousUrlProtectionNonceName].value;return this.genericCallback(url , "", result, this.callbackFormName, this.mailboxFormName);}return false;};
