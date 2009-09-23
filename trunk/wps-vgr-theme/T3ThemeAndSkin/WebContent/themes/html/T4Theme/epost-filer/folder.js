// (C) Copyright IBM Corp. 2002, 2006  All Rights Reserved
var g_xslUrl=NG.Util.makeWebContextURL("/xsl/folderListScript.xsl", false);NG.isSessionValid=function()
{
var response=NG.invokeAction("folderList", "objname=tempList", false);if(response == null)
return false;else
return true;};NG.makeParamString=function(params) {
var paramString="";if (params) {
var count=0;for (name in params) {
if (count > 0) {
paramString+="&";}paramString+=name + "=" + encodeURIComponent(params[name]);count++;};}return paramString;};NG.invokeAction=function(action, params, isDangerous) {
var url=NG.Util.makeWebContextURL(action + ".do", isDangerous);var paramString="";if (typeof(params) == "string") {
paramString=params;}else if (typeof(params) == "object") {
paramString=NG.makeParamString(params);}var post=NG.ServerRequest.postRequest(url, paramString);if (NG.ServerRequest.checkSessionExpiration(post)) {
return null;}var error=NG.ServerRequest.checkForError(post);if (error) {
throw new Error(""+error, ""+error);}return post.responseText ? post.responseText : true;};NG.integerToString=function(n) {
return n + '';};NG.reportError=function(e) {
if (e) {
if (e.description) {
alert(e.description);}else if (e.message) {
alert(e.message);}}};NG.folderIconOverride={
'$(Inbox)' : 's-ng-folder-icon-inbox',
'$(Drafts)' : 's-ng-folder-icon-drafts',
'$(Sent)' : 's-ng-folder-icon-sent',
'$(Trash)' : 's-ng-folder-icon-trash'
};NG.stockFolderOrder={
"$(Inbox)" : 1,
"$(Drafts)" : 2,
"$(Sent)" : 3,
"$(Trash)" : 4
};NG.isStockFolder=function(alias) {
if (alias == NG.INBOX ||
alias == NG.DRAFTS ||
alias == NG.SENT ||
alias == NG.TRASH) {
return true;}else {
return false;}};NG.isValidFolderName=function(folderName) {
if (folderName == null || folderName.length == 0) {
return false;}if (folderName.charAt(0).match(/\s/) ||
folderName.charAt(folderName.length - 1).match(/\s/)) {
return false;}if (folderName.match(/^(\s*)$(\s*)/)) {
return false;}if (folderName.match(/[\/\\<>]/)) {
return false;}return true;};NG.htmlPrepareFolderName=function(folderName) {
if (folderName) {
return folderName.replace(/\s/g, '&nbsp;');}return null;};NG.FolderList=function(objName, contentDivId) {
this.objName=objName;this.contentDiv=document.getElementById(contentDivId);this.entries=null;this.outline=null;this.inboxKey=null;};NG.FolderList.prototype.init=function(xml) {
this.refresh(xml);};NG.FolderList.prototype.makeClickUrl=function(key) {
return this.objName+".handleFolderClick('"+key+"');";};NG.FolderList.prototype.handleFolderClick=function(key) {
var ev=eventGet();if (ev && (ev.ctrlKey || ev.shiftKey)) {
ev.returnValue=false;}this.setSelectedFolder(key);};NG.myFoldersGenerateHTML=function(nMaxLevels)  {
var s='<tr class="s-ng-fsize s-ng-myfolders ' + this.oOutline.sRowStyleName + '" position="' + this.sPosition + '">';s+='<td>' + this.sTitle + '</td>';s+='</tr>';return s;};NG.noStatusBarMessage=function(evt) {
NG.Util.showStatus(window.status, window, true);evt=eventGet(evt);if (evt) evt.returnValue=true;};NG.clone=function(what) {
for (i in what) {
this[i]=what[i];};};NG.FolderList_entryCompare=function(a, b) {
if (NG.isStockFolder(a.alias) && NG.isStockFolder(b.alias)) {
return NG.stockFolderOrder[a.alias] - NG.stockFolderOrder[b.alias];}else if (NG.isStockFolder(a.alias) && !NG.isStockFolder(b.alias)) {
return -1;}else if (!NG.isStockFolder(a.alias) && NG.isStockFolder(b.alias)) {
return 1;}else if (a.name == b.name) {
return 0;}else {
return a.name < b.name ? -1 : 1;}};NG.FolderList.prototype.getSortedIndexedEntries=function() {
var indexedEntries=new Array();for (key in this.entries) {
indexedEntries[indexedEntries.length]=new NG.clone(this.entries[key]);indexedEntries[indexedEntries.length - 1].key=key;};indexedEntries.sort(NG.FolderList_entryCompare);return indexedEntries;};NG.FolderList.prototype.getSortedEntries=function() {
var indexedEntries=this.getSortedIndexedEntries();sortedEntries=new Array();for (i in indexedEntries) {
sortedEntries[indexedEntries[i].key]=new NG.clone(indexedEntries[i]);};return sortedEntries;};NG.FolderList.prototype.addFolder=function(name, key, alias) {
if (this.entries == null) {
this.entries=new Array();}this.entries[key]={ "name":decodeURIComponent(name), "alias":decodeURIComponent(alias) };if (alias == NG.INBOX) {
this.inboxKey=key;}};NG.FolderList.prototype.getMoveToFolderList=function(sourceFolderKey) {
if (this.entries) {
var list=new Array();for (i in this.entries) {
if (typeof sourceFolderKey == 'undefined' || sourceFolderKey != i) {
list[i]=this.entries[i].name;}};return list;}return null;};NG.FolderList.prototype.getCustomFolderList=function() {
if (this.entries) {
var list=new Array();for (i in this.entries) {
if (!NG.isStockFolder(this.entries[i].alias)) {
list[i]=this.entries[i].name;}};return list;}return null;};NG.FolderList.prototype.createFolder=function(folderName) {
if (folderName != null && folderName.length > 0) {
return NG.invokeAction("folderCreate", {"folderName":folderName}, false);}};NG.FolderList.prototype.renameFolder=function(folderKey, newFolderName) {
if (folderKey != null && folderKey.length > 0 &&
newFolderName != null && newFolderName.length > 0) {
var params={
"folderKey": folderKey,
"newFolderName" : newFolderName
};var response=NG.invokeAction("folderRename", params);return response;}};NG.FolderList.prototype.deleteFolder=function(folderKey) {
if (folderKey != null && folderKey.length > 0) {
var params={
"folderKey" : folderKey
};return NG.invokeAction("folderDelete", params, true);}};NG.FolderList.prototype.findFolder=function(folderName) {
for (i in this.entries) {
if (this.entries[i].name.toUpperCase() == folderName.toUpperCase()) {
return i;}};return null;};NG.FolderList.prototype.getFolderName=function(folderKey) {
if (this.entries) {
return this.entries[folderKey].name;}return null;};NG.FolderList.prototype.getFolderAlias=function(folderKey) {
if (this.entries) {
return this.entries[folderKey].alias;}return null;};NG.FolderList.prototype.getSelectedFolder=function() {
if (this.outline && this.outline.oEntrySelected) {
for (i in this.entries) {
if (this.entries[i].position == this.outline.oEntrySelected.sPosition) {
return i;}};}return null;};NG.FolderList.prototype.setSelectedFolder=function(folderKey) {
if (folderKey && this.entries && this.entries[folderKey]) {
if (this.outline) {
this.outline.selectEntryByPosition(this.entries[folderKey].position, false);}NG.EventManager.triggerEvent(this.objName, "onSelectedFolderChange");return true;}return false;};NG.FolderList.prototype.isSelectedFolder=function(sAlias) {
if (this.entries && this.entries[this.getSelectedFolder()])
return (this.entries[this.getSelectedFolder()].alias == sAlias);else return false;};NG.FolderList.prototype.setSelectedFolderToInbox=function() {
this.setSelectedFolder(this.inboxKey);};NG.FolderList.prototype.getPreviousFolder=function(folderKey) {
if (this.entries) {
var sorted=this.getSortedIndexedEntries();for (i=0; i < sorted.length; i++) {
if (sorted[i].key == folderKey) {
if (i > 0) {
return sorted[i - 1].key;}else {
break;}}};}return null;};NG.FolderList.prototype.doCreateFolder=function() {
var results=showModalDialog(
NG.Util.makeWebContextURL("/folderCreatePrompt.jsp", false), {"wndParent":window},
"dialogHeight:130px;dialogWidth=400px;center:yes;status:no;edge:raised;help:no;resizable:no;scroll:no;");if (results == null || !results.ok) {
return;}if (NG.isValidFolderName(results.folderName)) {
try {
if (this.createFolder(results.folderName)) {
this.refresh();}}catch (error) {
NG.reportError(error);};}else {
alert(NG.Resource.getString('err.folder.invalid.name'));};};NG.FolderList.prototype.doRenameFolder=function() {
var selKey=this.getSelectedFolder();if (selKey != null && selKey.length > 0) {
if (NG.isStockFolder(this.entries[selKey].alias)) {
alert(NG.Resource.getString("err.folder.rename.disallowed", this.entries[selKey].name));return;}var results=showModalDialog(
NG.Util.makeWebContextURL("/folderRenamePrompt.jsp", false),
{ "key":selKey, "list":this.getCustomFolderList(), "wndParent":window },
"dialogHeight:175px;dialogWidth=400px;center:yes;status:no;edge:raised;help:no;resizable:no;scroll:no;");if (results == null || !results.ok) {
return;}if (NG.isValidFolderName(results.name)) {
try {
if (this.renameFolder(results.key, results.name)) {
this.refresh();}}catch (error) {
NG.reportError(error);};}else {
alert(NG.Resource.getString('err.folder.invalid.name'));};}else {
alert(NG.Resource.getString("err.folder.select"));};};NG.FolderList.prototype.doDeleteFolder=function() {
var key=this.getSelectedFolder();if (key != null && key.length > 0) {
if (NG.isStockFolder(this.entries[key].alias)) {
alert(NG.Resource.getString("err.folder.delete.disallowed", this.entries[key].name));return;}var commonStatus="center:yes;status:no;edge:raised;help:no;resizable:no;scroll:no;";key=showModalDialog(
NG.Util.makeWebContextURL("/folderDeletePrompt.jsp", false),
{ "key":key, "list":this.getCustomFolderList(),"wndParent":window },
"dialogHeight:120px;dialogWidth:350px;" + commonStatus);if (key != null && key.length > 0) {
var confirmText=NG.Resource.getString("folder.confirm.delete", this.entries[key].name);if (confirm(confirmText)) {
try {
if (this.deleteFolder(key)) {
this.refresh();}}catch (error) {
NG.reportError(error);};}}}else {
alert(NG.Resource.getString("err.folder.select"));};};
function OutlineEntry(oOutline, sPosition, nLevel, sTitle, sUrl, bHideFocus)
{
this.oOutline=oOutline;this.sPosition=sPosition;this.nLevel=nLevel;this.sTitle=sTitle;this.hideFocus=bHideFocus;this.sUrl=sUrl;this.aChildren=null;this.bIsExpanded=false;this.fSelected=typeof(h_FolderDoc) != "undefined" && (this.sTitle == h_FolderDoc.h_Name);this.sParPosition="";this.sUrl=EscapePresetFieldsValue(this.sUrl, "s_ViewLabel");this.sUrl=EscapePresetFieldsValue(this.sUrl, "s_ViewName");};OutlineEntry.prototype.generateHTML=function(nMaxLevels)
{
var i;var s='<tr class="' + (this.fSelected ? this.oOutline.sRowSelStyleName : this.oOutline.sRowStyleName) + ' " position="' + this.sPosition + '"' + (this.fSelected ? ' id="'+this.oOutline.id+'SelRow"':'') +'>';for(i=0; i<this.nLevel; i++)
s+='<td>&nbsp;</td>';s+='<td class="s-outlineControl">';if(this.aChildren != null)
s+='<span class="' + (this.bIsExpanded ? "s-outline-minus" : "s-outline-plus") + '"></span>';else
s+='&nbsp;';s+='</td><td colspan="' + (nMaxLevels+1 - this.nLevel) + '" width=100%>';if (this.sUrl.length > 0){
if (!this.hideFocus)
s+='<a class="' + (this.fSelected ? this.oOutline.sEntrySelStyleName : this.oOutline.sEntryStyleName) + '" href="' + this.sUrl + '"'+ (this.fSelected ? ' id="'+this.oOutline.id+'SelCell"':'') + '>';else
s+='<span class="' + (this.fSelected ? this.oOutline.sEntrySelStyleName : this.oOutline.sEntryStyleName) + '" onclick="' + this.sUrl + '" style="height:100%;width:100%;" onmouseover="OutlineEntry_ChangeColor(this,1)" onmouseout="OutlineEntry_ChangeColor(this,0)"' + (this.fSelected ? ' id="'+this.oOutline.id+'SelCell"':'')+ '>';}else
s+='<span class="'+ this.oOutline.sEntryStyleName +'" dummy=true>';s+=this.sTitle + ((this.sUrl.length>0 && !this.hideFocus)? '</a>':'</span>') + '</td></tr>';if(this.bIsExpanded && this.aChildren)
{
for(i=0; i<this.aChildren.length; i++)
s+=this.aChildren[i].generateHTML(nMaxLevels);}return s;};OutlineEntry.prototype.addEntry=function(oEntry)
{
if(this.aChildren)
{
if(this.nLevel + 1 == oEntry.nLevel)
{
this.aChildren[this.aChildren.length]=oEntry;oEntry.sParPosition=this.sPosition;}else
{
this.aChildren[this.aChildren.length-1].addEntry(oEntry);}}else
{
this.aChildren=new Array(oEntry);oEntry.sParPosition=this.sPosition;};if (oEntry.fSelected)
this.bIsExpanded=true;};function OutlineComparePositions(sPos1, sPos2)
{
var aPos1Nums=sPos1.split(".");var aPos2Nums=sPos2.split(".");var nMaxLevels=Math.max(aPos1Nums.length, aPos2Nums.length);var n1, n2;for(i=0; i<nMaxLevels; i++)
{
n1=aPos1Nums.length >= i+1 ? parseInt(aPos1Nums[i]) : 0;n2=aPos2Nums.length >= i+1 ? parseInt(aPos2Nums[i]) : 0;if(n1 > n2)
return 1;if(n2 > n1)
return -1;};return 0;};function OutlineFindEntry(sPosition)
{
var i;var oEntry=null;var nCompareResult;for(i=0; i<this.aChildren.length; i++)
{
oEntry=this.aChildren[i];nCompareResult=OutlineComparePositions(sPosition, oEntry.sPosition);if(nCompareResult < 0)
{
if(i==0)
return null;else
return this.aChildren[i-1].findEntry(sPosition);}if(0 == nCompareResult)
return oEntry;};if(oEntry && (nCompareResult > 0))
{
return this.aChildren[i-1].findEntry(sPosition);}};OutlineEntry.prototype.findEntry=OutlineFindEntry;function OutlineEntry_ChangeColor(oSpan,bOver){
if (bOver)
elSetRuntimeStyle(oSpan, 'color', getShimmerColor(D_COLORS_HYPERTEXT_HOVER));else
elSetRuntimeStyle(oSpan, 'color', '');};function Outline(doc, sUniqueSuffix, browserCaps, destroyChainProvider)
{
this.document=doc;if (!doc) this.document=window.document;this.aChildren=null;this.bHasIEDOM=browserCaps.hasCapability(D_BrowserCap_IE4DOM);this.bHasLayers=browserCaps.hasCapability(D_BrowserCap_Layers);this.nMaxLevels=0;this.id="Outline"+sUniqueSuffix; // Navigator doesn't like "_" in ID
this.fnEntryPicked=null;this.fnRMouseEntryPicked=null;this.fnDragDropEventHandler=null;this.sRowStyleName="s-outlineRow";this.sRowSelStyleName="s-outlineRowSelected s-ng-bgcolor-skyblue";this.sEntryStyleName="s-outlineEntry s-ng-fsize";this.sEntrySelStyleName="s-outlineEntrySelected s-ng-bgcolor-skyblue s-ng-fsize";this.oEntrySelected=null;this.destroyChainProvider=destroyChainProvider;if(this.destroyChainProvider.oDestroyChain) this.destroyChainProvider.oDestroyChain.add(this);};Outline.prototype.drawOutline=function()
{
var s='<table border="0" cellspacing="0" cellpadding="0" width="100%" height="100%">';if(this.aChildren)
{
for(i=0; i<this.aChildren.length; i++){
s+=this.aChildren[i].generateHTML(this.nMaxLevels);};}s+='</table>';return s;};Outline.prototype.generateHTML=function(bNoFrame)
{
var i;var s="";if(!bNoFrame)
{
if(!this.bHasLayers)
s+='<div width="100%" class="s-outlineFrame" id="' + this.id + 'Frame"><div';else
s+='<layer visibility="hidden"';s+=' class="s-outline" ID="' + this.id + '">';}s+=this.drawOutline();if(!bNoFrame)
{
if(!this.bHasLayers)
s+='</div></div>';else
s+='</layer><ilayer id="OutlineLayer" width="112" height="180" above="' + this.id + '"></ilayer>';}this.document.write(s);if(this.bHasIEDOM)
{
var el=this.document.getElementById(this.id);eventSetHandler(el, "click", OutlineOnClick);el.oOutline=this;eventSetHandler(el, "contextmenu", OutlineOnContextMenu);eventSetHandler(el, "dragenter", OutlineOnDragDropEvent);eventSetHandler(el, "dragover", OutlineOnDragDropEvent);eventSetHandler(el, "drop", OutlineOnDragDropEvent);}};Outline.prototype.getHTMLContent=function(bNoFrame)
{
var s="";if(!bNoFrame)
{
if(!this.bHasLayers)
s+='<div width=100% class="s-outlineFrame" ID="' + this.id + 'Frame"><div';else
s+='<layer visibility="hidden"';s+=' class="s-outline" ID="' + this.id + '">';}s+=this.drawOutline();if(!bNoFrame)
{
if(!this.bHasLayers)
s+='</div></div>';else
s+='</layer><ilayer id="OutlineLayer" width="112" height="180" above="' + this.id + '"></ILAYER>';}return s;};Outline.prototype.addDefaultEvent=function()
{
var el=this.document.getElementById(this.id);eventSetHandler(el, "click", OutlineOnClick, false);eventSetHandler(el, "contextmenu", OutlineOnContextMenu, false);el.oOutline=this;eventSetHandler(el, "dragenter", OutlineOnDragDropEvent, false);eventSetHandler(el, "dragover", OutlineOnDragDropEvent, false);eventSetHandler(el, "drop", OutlineOnDragDropEvent, false);};Outline.prototype.update=function()
{
var s=this.drawOutline();var el=document.getElementById(this.id);el.innerHTML=s;this.fireEvent("update");};Outline.prototype.addEntry=function(sPosition, nLevel, sTitle, sUrl, bHideFocus)
{
oEntry=new OutlineEntry(this, sPosition, nLevel, sTitle, sUrl, bHideFocus);if(this.aChildren)
{
if(nLevel == 0)
this.aChildren[this.aChildren.length]=oEntry;else {
this.aChildren[this.aChildren.length-1].addEntry(oEntry);}}else
this.aChildren=new Array(oEntry);if(nLevel > this.nMaxLevels)
this.nMaxLevels=nLevel;return oEntry;};Outline.prototype.findEntry=OutlineFindEntry;Outline.prototype.selectEntryByPosition=function(sPosition, bClickOnIt)
{
if (typeof(bClickOnIt) == "undefined")
bClickOnIt=true;var oEntry=this.findEntry(sPosition);if (oEntry)
{
this.clearSelection();oEntry.fSelected=true;this.oEntrySelected=oEntry;var oChildEntry=oEntry;while (oChildEntry && oChildEntry.nLevel != 0 && oChildEntry.sParPosition != "")
{
var sParPos=oChildEntry.sParPosition;var oParEntry=this.findEntry(sParPos);if (oParEntry)
{
oParEntry.bIsExpanded=true;}oChildEntry=oParEntry;};this.update();if (bClickOnIt)
{
oSelCell=this.getSelectedCell();if (oSelCell)
{
oSelCell.click();}}}};Outline.prototype.clearSelection=function()
{
if (this.oEntrySelected)
this.oEntrySelected.fSelected=false;this.oEntrySelected=null;var oPreSelRow=this.getSelectedRow();if (oPreSelRow)
{
oPreSelRow.className=this.sRowStyleName;oPreSelRow.id="";var oPreSelCell=this.getSelectedCell();if (oPreSelCell)
{
oPreSelCell.className=this.sEntryStyleName;oPreSelCell.id="";}}};Outline.prototype.getSelectedRow=function()
{
var oPreSelRow=this.document.getElementById(this.id+"SelRow");return oPreSelRow;};Outline.prototype.getSelectedCell=function()
{
var oPreSelCell=this.document.getElementById(this.id+"SelCell");return oPreSelCell;};Outline.prototype.setEntryPickedCB=function(fn)
{
this.fnEntryPicked=fn;};Outline.prototype.setEventListener=function(fn)
{
if (!this.aListeners) this.aListeners=new Array();this.aListeners[this.aListeners.length]=fn;};Outline.prototype.fireEvent=function(sEvent, aParms)
{
if (this.aListeners){
var iMax=this.aListeners.length;for (var i=0; i< iMax; i++){
if ("function"==typeof(this.aListeners[i]))
this.aListeners[i](sEvent,aParms);else
eval(this.aListeners[i] + '("' + sEvent + '")');};}};function FolderObject(LabelsArray, SysNamesArray)
{
this.aLabels=LabelsArray;this.aSysNames=SysNamesArray;};function OutlineOnClick(ev)
{
var el=eventGetTarget(ev);var oEntry;var isDummyTopFolder=false;var isSelChanged=false;if (el.dummy)
isDummyTopFolder=true;else if (el.className == this.oOutline.sEntryStyleName)
isSelChanged=true;if(el.tagName == "IMG" || el.tagName == "SPAN")
el=el.parentNode;if (el.tagName == "A")
el=el.parentNode;if(el.tagName == "TD")
{
var elParent=el.parentNode;var sAttrib=elParent.getAttribute("POSITION");if(sAttrib)
{
oEntry=this.oOutline.findEntry(sAttrib);if(oEntry && (el.className == "s-outlineControl" || isDummyTopFolder))
{
if(oEntry.aChildren)
oEntry.bIsExpanded=!oEntry.bIsExpanded;this.oOutline.update();}else if (oEntry && isSelChanged)
{
this.oOutline.clearSelection();oEntry.fSelected=true;this.oOutline.oEntrySelected=oEntry;oSelRow=elParent;oSelRow.className=this.oOutline.sRowSelStyleName;oSelRow.id=this.oOutline.id+"SelRow";var oel=el;if (oel)
{
oel.id=this.oOutline.id+"SelCell";oel.className=this.oOutline.sEntrySelStyleName;}}if(this.oOutline.fnEntryPicked){
var oSelRow=this.oOutline.document.getElementById(this.id+"SelRow");var oSelCell=this.oOutline.document.getElementById(this.id+"SelCell");if (oSelRow && oSelCell)
{
if (this.oOutline.fnEntryPicked(oEntry, oSelRow, oSelCell))
eventCancel(ev);}}}}};Outline.prototype.setRMouseEntryPickedCB=function(fn)
{
this.fnRMouseEntryPicked=fn;};function OutlineOnContextMenu()
{
return false;};Outline.prototype.destroy=function()
{
var i;if(this.oRMM) {
this.oRMM.oOutline=null;this.oRMM.destroy();this.oRMM=null;}if (this.aChildren) {
for(i=0;i<this.aChildren.length;i++) {
this.aChildren[i].oOutline=null;};}this.oEntrySelected=null;this.aChildren=null;};Outline.prototype.setDragDropEventHandlerCB=function(fn)
{
this.fnDragDropEventHandler=fn;};function OutlineOnDragDropEvent(ev)
{
if(!ev) ev=window.event;var elSrc=eventGetTarget(ev);var el=null;var bRet=false;var oEntry;if (this.oOutline && this.oOutline.fnDragDropEventHandler && (elSrc.tagName == "A" || elSrc.tagName == "SPAN"))
{
el=elSrc.parentNode;if(el.tagName == "TD")
{
var elParent=el.parentNode;var sAttrib=elParent.getAttribute("POSITION");if(sAttrib)
{
oEntry=this.oOutline.findEntry(sAttrib);if(oEntry && (el.className == "s-outlineControl" || elSrc.dummy))
{
if(oEntry.aChildren && !oEntry.bIsExpanded)
{
oEntry.bIsExpanded=true;this.oOutline.update();}}else if (oEntry)
bRet=this.oOutline.fnDragDropEventHandler(oEntry, ev);}}}if (!bRet)
{
eventCancel(ev);if (ev.dataTransfer) ev.dataTransfer.dropEffect ="none";}};
