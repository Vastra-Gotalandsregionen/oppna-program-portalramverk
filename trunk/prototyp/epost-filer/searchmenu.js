//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
function searchWriteBaseInfo(suffix, queryName, scopeName, generateFields, isInPortlet, isBidi, defId, defTitle, defDesc, defIcon, menuUrl, searchLabel, scopeLabel, actionsIcon, tabIndex) {
if (tabIndex == null) {
tabIndex="";}if (tabIndex != "") {
tabIndex=" tabindex=\"" + tabIndex + "\" ";}searchMenuUrl=menuUrl;var imgOffset="-7px";var dirRTL="";if (isBidi) {
dirRTL=" dir=\"rtl\" ";imgOffset="7px";}searchSetDefaultScopeMenuItem(defId, defTitle, defDesc, defIcon);document.write("<table " + dirRTL + " border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td " + dirRTL + " nowrap=\"nowrap\">");document.write("<a " + tabIndex + " id=\"searchMenuAnchor" + suffix + "\" href=\"javascript: void showAsyncSearchMenu(&quot;" + suffix + "&quot;,&quot;" + queryName + "&quot;,&quot;" + scopeName + "&quot;," + isInPortlet + ")\">");document.write("<img width=\"" + searchIconWidth + "\" height=\"" + searchIconHeight + "\" alt=\"" + defDesc + "\" id=\"searchMenuIconAnchor" + suffix + "\" border=\"0\" src=\"" + defIcon + "\" />");document.write("<img title=\"" + scopeLabel + "\" alt=\"" + scopeLabel + "\" style=\"position: relative; top: 4px; left: " + imgOffset + ";\" border=\"0\" src=\"" + actionsIcon + "\" />");document.write("</a>");document.write("</td><td " + dirRTL + " nowrap=\"nowrap\">");if (generateFields) {
document.write("<input value=\"\" type=\"hidden\" name=\"" + queryName + "\" id=\"" + queryName + "\" />");document.write("<input value=\"\" type=\"hidden\" name=\"" + scopeName + "\" id=\"" + scopeName + "\" />");}document.write("<input value=\"\" type=\"hidden\" name=\"scopeDisplayFieldName" + suffix + "\" id=\"scopeDisplayFieldName" + suffix + "\" />");document.write("<label style=\"display:none\" for=\"searchDisplayFieldName" + suffix + "\">" + searchLabel + "</label>");document.write("<input " + tabIndex + " value=\"\" class=\"" + searchDisabledFieldClass + "\" size=\"30\" id=\"searchDisplayFieldName" + suffix + "\"  name=\"searchDisplayFieldName" + suffix + "\"  type=\"text\" onfocus=\"searchClearText(this, &quot;" + queryName + "&quot;, &quot;" + suffix + "&quot;);\" onclick=\"searchClearText(this, &quot;" + queryName + "&quot;, &quot;" + suffix + "&quot;);\" onBlur=\"searchSetQuery(this, &quot;" + queryName + "&quot;, &quot;" + suffix + "&quot;);searchSetText(this, &quot;" + queryName + "&quot;, &quot;" + suffix + "&quot;);\" onkeypress=\"return searchDisplayKeyPress(event)\" />");document.write("</td></tr></table>");document.write("<script type=\"text/javascript\" language=\"Javascript\">");document.write("searchInitJsControlField(\"" + queryName + "\", \"" + scopeName + "\", \"" + suffix + "\");");document.write("</script>");};var searchDynMenu=function() {return false};function showAsyncSearchMenu(uniqueId, queryName, scopeName, isInPortlet) {
searchDynMenu=function (){searchShowMenu("searchMenuAnchor" + uniqueId, uniqueId, queryName, scopeName, isInPortlet);};if (searchLoadDynamicMenus(false)) {
searchDynMenu();}};function searchInitJsControlField(queryName, scopeName, uniqueId) {
var elquery=searchGetField(queryName);var elscope=searchGetField(scopeName);var elquerydisp=searchGetField("searchDisplayFieldName" + uniqueId);var elscopedisp=searchGetField("scopeDisplayFieldName" + uniqueId);var elanchor=searchGetField("searchMenuIconAnchor" + uniqueId);var xitm;var ret=true;if (elscope && elscopedisp) {
if (elscope.value =="") {
xitm=getSearchScopeMenuItem(searchAllScopeMenuArray[0].id);} else {
ret=searchLoadDynamicMenus(true);if (ret) {
xitm=getSearchScopeMenuItem(elscope.value);} else {
xitm=getSearchScopeMenuItem(searchAllScopeMenuArray[0].id);};};}if (elscope) elscope.value=xitm.id;if (elscopedisp) elscopedisp.value=xitm.title;searchSetScope(xitm.id, queryName, scopeName, uniqueId);searchClearText(null, queryName, uniqueId);if (elquery && elquerydisp && elquery.value !="") {
elquerydisp.value=elquery.value;}if (elquery && elquerydisp && elquery.value !="") {
elquerydisp.className=searchEnabledFieldClass;} else {
elquerydisp.className=searchDisabledFieldClass;}searchSetText(null, queryName, uniqueId);if (arrSearchMenuControls) {
} else {
arrSearchMenuControls=new Array();}arrSearchMenuControls[arrSearchMenuControls.length]=new searchMenuControl(elquery, elscope, elquerydisp, elscopedisp, elanchor);var populatedMenuControl;for (var i=0; i < arrSearchMenuControls.length; i++) {
var menucontrol=arrSearchMenuControls[i];if (menucontrol.queryfield.value != "") {
populatedMenuControl=arrSearchMenuControls[i];break;}};if (populatedMenuControl) {
for (var i=0; i < arrSearchMenuControls.length; i++) {
var menucontrol=arrSearchMenuControls[i];if (menucontrol.queryfield.value == "") {
menucontrol.queryfield.value=populatedMenuControl.queryfield.value;menucontrol.scopefield.value=populatedMenuControl.scopefield.value;menucontrol.querydisplayfield.value=populatedMenuControl.querydisplayfield.value;menucontrol.scopedisplayfield.value=populatedMenuControl.scopedisplayfield.value;menucontrol.querydisplayfield.className=populatedMenuControl.querydisplayfield.className;menucontrol.anchorfield.src=populatedMenuControl.anchorfield.src;menucontrol.anchorfield.title=populatedMenuControl.anchorfield.title;}};}};var searchHttpRequest=false;function searchLoadDynamicMenus(loadnow) {
if (searchNeedsMenuItems()) {
searchScopeMenuArray=new Array();searchLinkMenuArray=new Array();document.body.style.cursor="progress";if (loadnow) {
return searchRunHttpRequest(true);} else {
setTimeout("searchRunHttpRequest(false)",1);};return false;} else {
return true;};};function searchRunHttpRequest(loadnow) {
if (window.XMLHttpRequest) {
searchHttpRequest=new XMLHttpRequest();} else if (window.ActiveXObject) {
try {
searchHttpRequest=new ActiveXObject("Msxml2.XMLHTTP");} catch (ex) {
try {
searchHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");} catch (ex) {
};};}if (!searchHttpRequest) {
document.body.style.cursor="auto";return false;}searchHttpRequest.open("GET", searchMenuUrl, !loadnow);if (!loadnow) {
searchHttpRequest.onreadystatechange=searchProcessDynamicMenus;}searchHttpRequest.send(null);if (loadnow) {
searchProcessDynamicMenus(true);return !searchNeedsMenuItems();} else {
return true;};};function searchProcessDynamicMenus(loadnow) {
if (loadnow == null) loadnow=false;if (searchHttpRequest.readyState == 4) {
if (searchHttpRequest.status == 200) {
searchEvalResults(searchHttpRequest.responseText);if (!loadnow) {
searchDynMenu();}}document.body.style.cursor="auto";}};function searchNeedsMenuItems() {
return (!searchEditMenuItem);};function searchSetDefaultScopeMenuItem(sid, stext, sdesc, sicon) {
if (!searchAllScopeMenuArray) {
searchAllScopeMenuArray=new Array();searchAllScopeMenuArray[searchAllScopeMenuArray.length]=new searchScopeMenuItem(sid, stext, sdesc, sicon);}};function searchEvalResults(txt) {
var startscript="<MENUSCRIPT>";var endscript="</MENUSCRIPT>";var idxCheck=0;if (txt.indexOf(startscript) > -1) {
txt=txt.substring(txt.indexOf(startscript) + startscript.length);idxCheck++;}if (txt.indexOf(endscript) > -1) {
txt=txt.substring(0, txt.indexOf(endscript));idxCheck++;}if (idxCheck == 2) {
eval(txt);}};function searchClearText(elem, queryName, uniqueId) {
var elquery=searchGetField(queryName, elem);var eldisp=searchGetField("searchDisplayFieldName" + uniqueId,elem);if (elquery && eldisp) {
if (elquery.value == "") {
eldisp.value="";eldisp.className=searchEnabledFieldClass;}}};function searchSetText(elem, queryName, uniqueId) {
var elquery=searchGetField(queryName,elem);var elquerydisp=searchGetField("searchDisplayFieldName" + uniqueId,elem);var elscopedisp=searchGetField("scopeDisplayFieldName" + uniqueId,elem);if (elquerydisp && elscopedisp && elquery) {
if (elquery.value == "") {
elquerydisp.value=elscopedisp.value;elquerydisp.className=searchDisabledFieldClass;}}};function getSearchScopeMenuItem(sid) {
for (var iSearchLoop=0; iSearchLoop < searchAllScopeMenuArray.length; iSearchLoop++) {
if (searchAllScopeMenuArray[iSearchLoop].id == sid) {
return searchAllScopeMenuArray[iSearchLoop];}};};function searchSetQuery(elem, queryName, uniqueId) {
var elquery=searchGetField(queryName, elem);var eldisp=searchGetField("searchDisplayFieldName" + uniqueId,elem);if (elquery && eldisp) {
var queryvalue=eldisp.value;elquery.value=queryvalue.trim();if (elquery.value == "") searchSetText();}};var isSearchMenuOpen=false;var searchCurrentField="";function searchShowMenu(reftagid, uniqueId, queryName, scopeName, isInPortlet) {
searchBuildMenu("searchMenuId" + uniqueId, queryName, scopeName, uniqueId, isInPortlet);if (!isSearchMenuOpen) {
getTop_orig=getTop;getLeft_orig=getLeft;getTop=searchGetTop;getLeft=searchGetLeft;onmousedown_prev=document.onmousedown;isSearchMenuOpen=true;searchCurrentField="searchDisplayFieldName" + uniqueId;searchShowContextMenu("searchMenuId" + uniqueId, reftagid);document.onmousedown=searchHideCurrentContextMenu;} else {
searchHideCurrentContextMenu();setTimeout("searchShowMenu(\"" + reftagid + "\",\"" + uniqueId + "\",\"" + queryName + "\",\"" + scopeName + "\"," + isInPortlet + ");",100);};};function searchHideCurrentContextMenu() {
if (isSearchMenuOpen) {
onmousedown_prev();document.onmousedown=onmousedown_prev;getTop=getTop_orig;getLeft=getLeft_orig;if (window.event) {
var evt=window.event;var elem=(evt.srcElement) ? evt.srcElement : evt.target;elem.focus();}isSearchMenuOpen=false;searchCurrentField="";}};function searchGetField(id,elem) {
var ret;if (elem == null && window.event) {
var evt=window.event;elem=(evt.srcElement) ? evt.srcElement : evt.target;}if (elem && elem.form) {
ret=elem.form[id];}if (ret == null) {
ret=document.getElementById(id);}if (ret == null) {
var els=document.getElementsByTagName("INPUT");for (var i=0; i < els.length; i++) {
if (els[i].name == id) {
ret=els[i];break;}};}return ret;};function openExternalSearch(url, queryName) {
var querytext="";var elquery=searchGetField(queryName);if (elquery) {
if (window.URLEncoder) {
querytext=URLEncoder(elquery.value);} else {
querytext=escape(elquery.value);};}window.open(url + querytext);};function searchSetScope(id, queryName, scopeName, uniqueId) {
var itm=getSearchScopeMenuItem(id);var val=itm.title;var icon=itm.icon;var desc=itm.description;var elscopedisp=searchGetField("scopeDisplayFieldName" + uniqueId);var elanchor=searchGetField("searchMenuIconAnchor" + uniqueId);var elquery=searchGetField(queryName, elscopedisp);var elscope=searchGetField(scopeName, elscopedisp);if (elscopedisp) elscopedisp.value=val;if (elscope) elscope.value=id;if (elquery && elquery.value == "") searchSetText(null, queryName, uniqueId);if (elanchor) {
elanchor.src=icon;elanchor.title=desc;}};function searchAddMenuItem(menu, text, id, callback, icon) {
var menuItm=new UilMenuItem(text, true,"",callback , null, icon, false, "main-menu-item", "main-menu-item-selected");menuItm.create_orig=menuItm.create;menuItm.create=UilMenuItemCreate_search;menu.add(menuItm);};function UilMenuItemCreate_search(menuHasIcon, menuHasSubmenu) {
this.create_orig();searchFixImageAlt(this.itemTag);};function searchFixImageAlt(elem) {
if (elem.childNodes && elem.childNodes.length) {
for (var i=0; i < elem.childNodes.length; i++) {
searchFixImageAlt(elem.childNodes[i]);};} else {
if (elem.src && elem.src.indexOf(searchCheckmarkIcon) > -1) {
elem.alt=searchAdjustImageAlt(elem.alt);elem.title=searchAdjustImageAlt(elem.title);}};};function searchAdjustImageAlt(src) {
src=searchRemoveTags(src);if (searchCheckmarkAlt && searchCheckmarkAlt.indexOf("{0}") > -1) {
src=searchCheckmarkAlt.replace("{0}", src);}return src;};function searchRemoveTags(src) {
while (src.indexOf("<") > -1 && src.indexOf(">")) {
src=src.substring(0, src.indexOf("<")) + src.substring(src.indexOf(">") + 1);};while (src.indexOf("&nbsp;") > -1) {
src=src.replace("&nbsp;"," ");};return src.trim();};function searchAddScopeMenuItem(menu, text, id, callback, icon, scopeName, uniqueId) {
var elscope=searchGetField(scopeName, searchGetField("scopeDisplayFieldName" + uniqueId));if (elscope && elscope.value == id) {
icon=searchCheckmarkIcon;} else {
}searchAddMenuItem(menu, text, id, callback , icon);};function searchGetMenuText(sText, sIcon, sDesc) {
if (sDesc == null) sDesc=sText;sText=sText.replace(" ", "&nbsp;");var ret="<img width=\"" + searchIconWidth + "\" height=\"" + searchIconHeight + "\" alt=\"" + sDesc + "\" title=\"" + sDesc + "\" src=\"" + sIcon + "\" border=\"0\" /> ";return ret + sText;};function searchBuildMenu(menuID, queryName, scopeName, uniqueId, isInPortlet) {
var isLTR=searchIsLTR
var menu=getContextMenu(menuID);if (menu && menu.name) {
uncacheContextMenu(menu);}menu=createContextMenu(menuID, isLTR, null, "main-menu-border", "main-menu");var scid;var sctitle;var scdesc
var scicon;var sclink;for (var iSearchLoop=0; iSearchLoop < searchAllScopeMenuArray.length; iSearchLoop++) {
scid=searchAllScopeMenuArray[iSearchLoop].id;sctitle=searchAllScopeMenuArray[iSearchLoop].title;scdesc=searchAllScopeMenuArray[iSearchLoop].description;scicon=searchAllScopeMenuArray[iSearchLoop].icon;scmenutext=searchGetMenuText(sctitle, scicon, scdesc);searchAddScopeMenuItem(menu, scmenutext, scid, "javascript:searchSetScope(\"" + scid + "\",\"" + queryName + "\",\"" + scopeName + "\",\"" + uniqueId + "\")" , null, scopeName, uniqueId);};if ((searchHelpUrl != "") || ((searchUserDN != "") && (searchEditUrl != ""))) {
menu.addSeparator();}if ((searchUserDN != "") && (searchEditUrl != "")) {
searchAddMenuItem(menu, searchGetMenuText(searchEditMenuItem.title, searchEditMenuItem.icon), searchEditMenuItem.id, searchEditMenuItem.link , null);}if (searchHelpUrl != "") {
searchAddMenuItem(menu, searchGetMenuText(searchHelpMenuItem.title, searchHelpMenuItem.icon), searchHelpMenuItem.id, searchHelpMenuItem.link , null);}var isFirst=true;for (var iSearchLoop=0; iSearchLoop < searchLinkMenuArray.length; iSearchLoop++) {
if (isFirst) {
menu.addSeparator();isFirst=false;}scid=searchLinkMenuArray[iSearchLoop].id;sctitle=searchLinkMenuArray[iSearchLoop].title;scdesc=searchLinkMenuArray[iSearchLoop].description;scicon=searchLinkMenuArray[iSearchLoop].icon;sclink=searchLinkMenuArray[iSearchLoop].link;scmenutext=searchGetMenuText(sctitle, scicon);searchAddScopeMenuItem(menu, scmenutext, scid, "javascript:openExternalSearch(\"" + sclink + "\",\"" + queryName + "\")" , null, scopeName, uniqueId);};if ((searchReturnUrl!="") && (!isInPortlet)) {
if (!isFirst) {
menu.addSeparator();}scid=searchReturnMenuItem.id;sctitle=searchReturnMenuItem.title;scdesc=searchReturnMenuItem.description;scicon=searchReturnMenuItem.icon;sclink=searchReturnMenuItem.link;scmenutext=searchGetMenuText(sctitle, scicon);searchAddMenuItem(menu, scmenutext, scid, sclink , null);}return menu;};function searchShowContextMenu(name, reftagid) {
var reftag;var offtag;if (reftagid == null) {
reftag=window.event.srcElement;} else {
reftag=searchGetField(reftagid);}if (reftag) contextMenuShow(name, null, null, reftag, true);clearMenuTimer();};function searchGetTop(tag, recurse, istop) {
if (istop == null) istop=true;var size=0;if (recurse && tag.offsetParent != null) {
size+=getTop(tag.offsetParent, recurse, false);}if (tag != null) {
size+=tag.offsetTop;}if (istop) {
return size + getHeight(tag);} else {
return size;};};function searchGetLeft(tag, recurse, istop) {
if (istop == null) istop=true;var size=0;if (recurse && tag.offsetParent != null) {
size+=getLeft(tag.offsetParent, recurse, false);}if (tag != null) {
size+=tag.offsetLeft;}if (istop) {
return size - getWidth(tag);} else {
return size;};};function searchDisplayKeyPress(evt) {
var kcode;evt=(evt) ? evt : ((window.event) ? window.event : null);if (evt) {
var kcode=(evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : evt.charCode);if (kcode == 13) {
var elem=(evt.srcElement) ? evt.srcElement : evt.target;elem.blur();setTimeout("var frm=document." + elem.form.name + ";if (frm.onsubmit) {if (frm.onsubmit() == true) {frm.submit();}} else {frm.submit();};",200);return false;}}};function searchGetThemeForm() {
return document.forms["searchFromThemeForm"];};function searchSubmitThemeForm(notextmsg) {
var frm=searchGetThemeForm();var fld=frm["clearifblank"];if (fld.value == "0") {
return true;} else {
fld=frm["query"];if (fld.value == "") {
alert(notextmsg);return false;} else {
return true;};}};function searchReturn_To_Results() {
searchShow_Location(searchReturnUrl);};function searchShow_Prefs() {
searchShow_Popup(searchEditUrl, "portletEditWindow", null, 300);};function searchShow_Help() {
searchShow_Popup(searchHelpUrl, "portletHelpWindow");};function searchShow_Location(surl) {
if (typeof searchGetThemeForm == "function") {
var frm=searchGetThemeForm();if (frm) {
var fld=frm["clearifblank"];if (fld) {fld.value="0";}frm.action=surl;frm.submit();}} else {
window.location.href=surl;};};function searchShow_Popup(surl, windowname, newwidth, newheight, newtop, newleft) {
if (newwidth == null) newwidth=815;if (newheight == null) newheight=600;if (newtop == null) newtop=10;if (newleft == null) newleft=10;var newWindow=window.open(surl,windowname,"resizable=yes,scrollbars=yes,menubar=no,toolbar=yes,status=no,width=" + newwidth + ",height=" + newheight + ",screenX=" + newtop + ",screenY=" + newleft + ",top=" + newtop + ",left=" + newleft + "");newWindow.focus();return false;};String.prototype.trim=function() {
return this.replace(/^\s+|\s+$/, '');};function searchMenuControl(queryfield, scopefield, querydisplayfield, scopedisplayfield, anchorfield) {
this.queryfield=queryfield;this.scopefield=scopefield;this.querydisplayfield=querydisplayfield;this.scopedisplayfield=scopedisplayfield;this.anchorfield=anchorfield;};function searchScopeMenuItem(sid, stext, sdesc, sicon) {
this.id=sid;this.title=stext;this.description=sdesc;this.icon=sicon;};function searchLinkMenuItem(sid, stext, sdesc, sicon, slink) {
this.id=sid;this.title=stext;this.description=sdesc;this.icon=sicon;this.link=slink;};var onmousedown_orig;var getTop_orig;var getLeft_orig;var arrSearchMenuControls;var searchAllScopeMenuArray;var searchScopeMenuArray;var searchDefaultScopeMenuItem;var searchLinkMenuArray;var searchEditMenuItem;var searchEditUrl;var searchHelpMenuItem;var searchHelpUrl;var searchReturnMenuItem;var searchReturnUrl;var searchMenuUrl;var searchIsLTR;var searchCheckmarkIcon;var searchCheckmarkAlt;var searchUserDN;var searchEnabledFieldClass="wpsPortletToolbarText";var searchDisabledFieldClass="wpsPortletToolbarDisabledText";var searchIconWidth="16";var searchIconHeight="16";