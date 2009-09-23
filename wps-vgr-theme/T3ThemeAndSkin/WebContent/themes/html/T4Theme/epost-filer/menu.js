//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
var is=new Is();var yesText="yes";var okText="ok";var cancelText="cancel";var noText="no";var yesAllUsersText="yes, all users";var automateActionText="automate action?";var removeAutomateActionText="remove automate action?";var noAutomatePermissionText="no automate permission";var noRemoveAutomatePermissionText="no remove automate permission";var cannotWirePropertyText="cannot wire property";var cannotWireOneOrMorePropertiesText="cannot wire one or more properties";var hiddenItems=new Array(0);var hideCount=0;window.c2a_bind_to_cursor=false;function setYesText(text) {
window.yesText=text;};function setOKText(text) {
window.okText=text;};function setCancelText(text) {
window.cancelText=text;};function setNoText(text) {
window.noText=text;};function setYesAllUsersText(text) {
window.yesAllUsersText=text;};function setAutomateActionText(text) {
window.automateActionText=text;};function setRemoveAutomateActionText(text) {
window.removeAutomateActionText=text;};function setNoAutomatePermissionText(text) {
window.noAutomatePermissionText=text;};function setNoRemoveAutomatePermissionText(text) {
window.noRemoveAutomatePermissionText=text;};function setCannotWirePropertyText(text) {
window.cannotWirePropertyText=text;};function setCannotWireOneOrMorePropertiesText(text) {
window.cannotWireOneOrMorePropertiesText=text;};var portletMenuClass="portlet-menu";var portletMenuItemClass="portlet-menu-item";var portletMenuItemSelectedClass="portlet-menu-item-selected";var wpsButtonTextClass="wpsButtonText";function c2a_Menu() {
this.type="Menu";this.items=new Array();this.actions=new Array();this.c2a_addMenuItem=c2a_addMenuItem;};function c2a_addMenuItem(label, action) {
this.items[this.items.length]=label;this.actions[this.actions.length]=action;};function c2a_modifyMenuBehavior(event) {
if (event.ctrlKey) {
if (!is.nav) {
return true;}}if (event.altKey) {
if (is.nav) {
return true;}}return false;};function c2a_showMenu(menu, menuReqd, noPersonalizePermission, hasAllUsersPermission, showCannotWireDialog, event) {
if (window.c2a_currMenu) {
document.body.removeChild(window.c2a_currMenu);window.c2a_currMenuHideOk=false;}window.c2a_noPersonalizePermission=noPersonalizePermission;window.c2a_hasAllUsersPermission=hasAllUsersPermission;window.c2a_currGlobalWireSelection="false";window.c2a_clickX=event.pageX;window.c2a_clickY=event.pageY;if (!menuReqd) {
window.c2a_promptUser=false;if (c2a_modifyMenuBehavior(event) && showCannotWireDialog == "NONE") {
window.c2a_promptUser=true;window.c2a_promptType="forget";} else {
window.c2a_promptUser=false;}eval(menu.actions[0]);} else {
if (c2a_modifyMenuBehavior(event)) {
if (showCannotWireDialog == "NONE") {
window.c2a_promptUser=true;window.c2a_promptType="remember";}else {
window.c2a_promptUser=true;window.c2a_promptType=showCannotWireDialog;}} else {
window.c2a_promptUser=false;}window.c2a_currMenu=document.createElement("div");window.c2a_currMenu.style.position="absolute";if (is.nav) {
if (window.c2a_bind_to_cursor == true) {
window.c2a_currMenu.style.left=event.pageX + 5 + "px";window.c2a_currMenu.style.top=event.pageY + 5 + "px";}else{
window.c2a_currMenu.style.left=getLeft(event.target) + event.target.offsetWidth + 5 + "px";window.c2a_currMenu.style.top=getTop(event.target) + event.target.offsetHeight + 5 + "px";}} else if (is.ie) {
if (window.c2a_bind_to_cursor == true) {
window.c2a_currMenu.style.left=window.event.clientX + 2 + document.body.scrollLeft;window.c2a_currMenu.style.top=window.event.clientY + 2 + document.body.scrollTop;}else{
window.c2a_currMenu.style.left= getLeft(window.event.srcElement) + window.event.srcElement.offsetWidth + 2;window.c2a_currMenu.style.top=getTop(window.event.srcElement) + window.event.srcElement.offsetHeight + 2;}} else {
return;};table="";table=table + "<table class='" + portletMenuClass + "' onMouseout='javascript:c2a_hideMenu(false, event)' onClick='javascript:c2a_hideMenu(true, event)'>";for (var i=0; i<menu.items.length; i++) {
table=table + "<tr id='c2a_table_row" + i + "' class='" + portletMenuItemClass + "' onMouseover='javascript:c2a_highlightRow(this, event);";if (i > 0) {
table=table + "c2a_unhighlightRow_noTimeout(document.getElementById(\"c2a_table_row0\"),event);";}table=table + "' onMouseout='javascript:c2a_unhighlightRow(this, event)' ";table=table + "onClick='" + menu.actions[i] + "'><td>";table=table + "<a href='" + menu.actions[i] + "' onFocus='javascript:c2a_highlightRow(document.getElementById(\"c2a_table_row" + i + "\"), event)' onBlur='javascript:c2a_unhighlightRow(document.getElementById(\"c2a_table_row" + i + "\"), event)'";if (i == 0){
table=table + "id='C2A_first_table_row' ";}table=table + "></a>";table=table + menu.items[i];table=table + "</td></tr>";};table=table + "</table>";window.c2a_currMenu.innerHTML=table;document.body.appendChild(window.c2a_currMenu);c2a_hideSelectsIfOverlapping(window.c2a_currMenu);window.c2a_currTimeout=window.setTimeout(c2a_cleanMenu, 2000);};var elem=document.getElementById("C2A_first_table_row");if (elem != null) {
elem.focus();}event.cancelBubble=true;event.returnValue=false;};function getLeft(tag) {
var curLeft=0;if (tag.offsetParent) {
while (tag.offsetParent) {
curLeft+=tag.offsetLeft;tag=tag.offsetParent;};}else if (tag.x) {
curLeft+=tag.x;}return curLeft;};function getTop(tag) {
var curTop=0;if (tag.offsetParent) {
while (tag.offsetParent) {
curTop+=tag.offsetTop;tag=tag.offsetParent;};}else if (tag.y) {
curTop+=tag.y;}return curTop;};function c2a_cleanMenu() {
if (window.c2a_currMenu) {
document.body.removeChild(window.c2a_currMenu);c2a_restoreHiddenSelects();}if (window.c2a_currTimeout) {
window.clearTimeout(window.c2a_currTimeOut);window.c2a_currTimeout=null;}window.c2a_currMenu=null;window.c2a_currMenuHideOk=false;};function c2a_hideSelectsIfOverlapping(popup) {
if (is.ie) {
window.hideCount++;var coll=document.getElementsByTagName("SELECT");if (coll!=null)
{
for (i=0; i<coll.length; i++)
{
if (c2a_intersect(popup, coll[i]) == true) {
if (coll[i].style.visibility != "hidden")
{
coll[i].style.visibility="hidden";window.hiddenItems.push(coll[i]);}}};}}};function c2a_restoreHiddenSelects() {
if (is.ie) {
window.hideCount--;if (window.hideCount == 0) {
items=window.hiddenItems;for(i=0; i < items.length; i++) {
items[i].style.visibility="visible";};window.hiddenItems=new Array(0);}}};function c2a_hideMenu(force, event) {
if (force) {
c2a_cleanMenu();} else {
if (window.c2a_currMenu && window.c2a_currMenuHideOk) {
if (!window.event) {
targetName=event.target.nodeName;} else {
targetName=window.event.srcElement.nodeName;}if (targetName == "table") {
c2a_cleanMenu();}}};};function c2a_highlightRow(row, event) {
row.className=portletMenuItemSelectedClass;window.c2a_currMenuHideOk=false;if (window.c2a_currTimeout) {
window.clearTimeout(window.c2a_currTimeout);window.c2a_currTimeout=null;}};function c2a_unhighlightRow(row, event) {
row.className=portletMenuItemClass;window.c2a_currMenuHideOk=true;window.c2a_currTimeout=window.setTimeout(c2a_cleanMenu, 1000);};function c2a_unhighlightRow_noTimeout(row, event) {
row.className=portletMenuItemClass;};function c2a_showForgetDialog(event) {
window.c2a_currForgetDialog=document.createElement("div");window.c2a_currForgetDialog.style.position="absolute";if (is.nav) {
window.c2a_currForgetDialog.style.left=window.c2a_clickX + 5 + "px";window.c2a_currForgetDialog.style.top=window.c2a_clickY + 5 + "px";} else if (is.ie) {
window.c2a_currForgetDialog.style.left=window.event.clientX + 2 + document.body.scrollLeft + "px";window.c2a_currForgetDialog.style.top=window.event.clientY + 2 + document.body.scrollTop + "px";} else {
return;}form="";if (window.c2a_noPersonalizePermission && window.c2a_hasAllUsersPermission) {
form="<form class='" + portletMenuClass + "' name='c2a-forget-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td colspan='2'>" + removeAutomateActionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes, all users' value='" + window.yesAllUsersText + "' onClick='javascript:c2a_forgetDialogYesGlobal()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='No' value='" + window.noText + "' onClick='javascript:c2a_forgetDialogNo()'/>&nbsp;</td>";form=form + "</tr>";form=form + "</table></form>";} else if (window.c2a_noPersonalizePermission && !window.c2a_hasAllUsersPermission) {
form="<form class='" + portletMenuClass + "' name='c2a-forget-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td>" + noRemoveAutomatePermissionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td align='center'>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='OK' value='" + window.okText + "' onClick='javascript:c2a_forgetDialogNo()'/>&nbsp;</td></tr>";form=form + "</table></form>";} else
if (!window.c2a_noPersonalizePermission && window.c2a_hasAllUsersPermission) {
form="<form class='" + portletMenuClass + "' name='c2a-forget-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td colspan='3'>" + removeAutomateActionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes' value='" + window.yesText + "' onClick='javascript:c2a_forgetDialogYes()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes, all users' value='" + window.yesAllUsersText + "' onClick='javascript:c2a_forgetDialogYesGlobal()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='No' value='" + window.noText + "' onClick='javascript:c2a_forgetDialogNo()'/>&nbsp;</td>";form=form + "</tr>";form=form + "</table></form>";} else {
form="<form class='" + portletMenuClass + "' name='c2a-forget-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td colspan='2'>" + removeAutomateActionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes' value='" + window.yesText + "' onClick='javascript:c2a_forgetDialogYes()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='No' value='" + window.noText + "' onClick='javascript:c2a_forgetDialogNo()'/>&nbsp;</td>";form=form + "</tr>";form=form + "</table></form>";};window.c2a_currForgetDialog.innerHTML=form;document.body.appendChild(window.c2a_currForgetDialog);c2a_hideSelectsIfOverlapping(window.c2a_currForgetDialog);};function c2a_hideForgetDialog() {
if (window.c2a_currForgetDialog) {
document.body.removeChild(window.c2a_currForgetDialog);c2a_restoreHiddenSelects();}window.c2a_currForgetDialog=null;};function c2a_showRememberDialog(event) {
window.c2a_currRememberDialog=document.createElement("div");window.c2a_currRememberDialog.style.position="absolute";if (is.nav) {
window.c2a_currRememberDialog.style.left=window.c2a_clickX + 5 + "px";window.c2a_currRememberDialog.style.top=window.c2a_clickY + 5 + "px";} else if (is.ie) {
window.c2a_currRememberDialog.style.left=window.event.clientX + 2 + document.body.scrollLeft;window.c2a_currRememberDialog.style.top=window.event.clientY + 2 + document.body.scrollTop;} else {
return;}form="";if (window.c2a_noPersonalizePermission && window.c2a_hasAllUsersPermission) {
form="<form class='" + portletMenuClass + "' name='c2a-remember-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td colspan='2'>" + automateActionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes, all users' value='" + window.yesAllUsersText + "' onClick='javascript:c2a_rememberDialogYesGlobal()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='No' value='" + window.noText + "' onClick='javascript:c2a_rememberDialogNo()'/>&nbsp;</td>";form=form + "</tr>";form=form + "</table></form>";} else
if (window.c2a_noPersonalizePermission && !window.c2a_hasAllUsersPermission) {
form="<form class='" + portletMenuClass + "'><form name='c2a-remember-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td>" + noAutomatePermissionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td align='center'>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='OK' value='" + window.okText + "' onClick='javascript:c2a_rememberDialogNo()'/>&nbsp;</td></tr>";form=form + "</table></form>";} else
if (!window.c2a_noPersonalizePermission && window.c2a_hasAllUsersPermission) {
form="<form class='" + portletMenuClass + "' name='c2a-remember-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td colspan='3'>" + automateActionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes' value='" + window.yesText + "' onClick='javascript:c2a_rememberDialogYes()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes, all users' value='" + window.yesAllUsersText + "' onClick='javascript:c2a_rememberDialogYesGlobal()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='No' value='" + window.noText + "' onClick='javascript:c2a_rememberDialogNo()'/>&nbsp;</td>";form=form + "</tr>";form=form + "</table></form>";form=form + "</table></form></div>";} else {
form="<form class='" + portletMenuClass + "' name='c2a-remember-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td colspan='2'>" + automateActionText + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='Yes' value='" + window.yesText + "' onClick='javascript:c2a_rememberDialogYes()'/>&nbsp;</td>";form=form + "<td>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='No' value='" + window.noText + "' onClick='javascript:c2a_rememberDialogNo()'/>&nbsp;</td>";form=form + "</tr>";form=form + "</table></form>";};window.c2a_currRememberDialog.innerHTML=form;document.body.appendChild(window.c2a_currRememberDialog);c2a_hideSelectsIfOverlapping(window.c2a_currRememberDialog);};function c2a_hideRememberDialog() {
if (window.c2a_currRememberDialog) {
document.body.removeChild(window.c2a_currRememberDialog);c2a_restoreHiddenSelects();}window.c2a_currRememberDialog=null;};function c2a_invokeMenuAction(formName, paramArray, event) {
window.c2a_currFormName=formName;window.c2a_currParamArray=paramArray;if (window.c2a_promptUser) {
if (window.c2a_promptType == "forget")
c2a_showForgetDialog(event);else if (window.c2a_promptType == "CANNOT_WIRE_PROPERTY")
c2a_showCannotWirePropertyDialog(event, cannotWirePropertyText);else if (window.c2a_promptType == "CANNOT_WIRE_ONE_OR_MORE_PROPERTIES")
c2a_showCannotWirePropertyDialog(event, cannotWireOneOrMorePropertiesText);else
c2a_showRememberDialog(event);} else {
c2a_postForm();};};function c2a_rememberDialogYes() {
window.c2a_currRememberDialogSelection="true";c2a_hideRememberDialog();c2a_postForm();};function c2a_rememberDialogYesGlobal() {
window.c2a_currGlobalWireSelection="true";c2a_rememberDialogYes();};function c2a_rememberDialogNo() {
window.c2a_currRememberDialogSelection="false";c2a_hideRememberDialog();c2a_postForm();};function c2a_forgetDialogYesGlobal() {
window.c2a_currGlobalWireSelection="true";c2a_forgetDialogYes();};function c2a_forgetDialogYes() {
window.c2a_currForgetDialogSelection="true";c2a_hideRememberDialog();c2a_postForm();};function c2a_forgetDialogNo() {
window.c2a_currForgetDialogSelection="false";c2a_hideRememberDialog();c2a_postForm();};function c2a_cannotWirePropertyDialogOK() {
c2a_hideCannotWirePropertyDialog();c2a_postForm();};function c2a_postForm() {
formName=window.c2a_currFormName;paramArray=window.c2a_currParamArray;form=document.forms[formName];for (var i=0; i < paramArray.length; i++) {
form.elements[i].value=paramArray[i];};if (window.c2a_promptUser) {
for (var i=0; i < form.elements.length; i++) {
if (form.elements[i].name == "c2a-remember-action") {
form.elements[i].value=window.c2a_currRememberDialogSelection;} else
if (form.elements[i].name == "c2a-forget-action") {
form.elements[i].value=window.c2a_currForgetDialogSelection;}if (form.elements[i].name == "c2a-global-wire") {
form.elements[i].value=window.c2a_currGlobalWireSelection;}};}form.submit();};function c2a_intersect(obj1, obj2)
{
var rect1=obj1.getBoundingClientRect();var rect2=obj2.getBoundingClientRect();if (c2a_lineIntersect(rect1.top, rect1.bottom, rect2.top, rect2.bottom) &&
c2a_lineIntersect(rect1.left, rect1.right, rect2.left, rect2.right)) {
return true;}return false;};function c2a_lineIntersect(a, b, c, d)
{
if ((a <= c  && c <= b) ||
(a <= d && d <= b) ||
(c <= a && d >= b))
{
return true;} else {
return false;}};function Is()
{
var agt=navigator.userAgent.toLowerCase()
this.major=parseInt(navigator.appVersion)
this.minor=parseFloat(navigator.appVersion)
this.nav=((agt.indexOf('mozilla')!=-1) && ((agt.indexOf('spoofer')==-1)
&& (agt.indexOf('compatible') == -1)))
this.nav2=(this.nav && (this.major == 2))
this.nav3=(this.nav && (this.major == 3))
this.nav4=(this.nav && (this.major == 4))
this.nav4up=this.nav && (this.major >= 4)
this.navonly=(this.nav && (agt.indexOf(";nav") != -1))
this.ie=(agt.indexOf("msie") != -1)
this.ie3=(this.ie && (this.major == 2))
this.ie4=(this.ie && (this.major == 4))
this.ie4up=this.ie  && (this.major >= 4)
this.opera=(agt.indexOf("opera") != -1)
if (this.nav2 || this.ie3) this.js=1.0
else if (this.nav3 || this.opera) this.js=1.1
else if (this.nav4 || this.ie4) this.js=1.2
else if ((this.nav && (this.minor > 4.05)) || (this.ie && (this.major > 4)))
this.js=1.2
else this.js=0.0
this.win=((agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1))
this.win95=((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1))
this.win16=((agt.indexOf("win16")!=-1)
|| (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1)
|| (agt.indexOf("windows 16-bit")!=-1))
this.win31=(agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
(agt.indexOf("windows 16-bit")!=-1)
this.win98=((agt.indexOf("win98")!=-1)||(agt.indexOf("windows 98")!=-1))
this.winnt=((agt.indexOf("winnt")!=-1)||(agt.indexOf("windows nt")!=-1))
this.win32=this.win95 || this.winnt || this.win98 ||
((this.major >= 4) && (navigator.platform == "Win32")) ||
(agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1)
this.os2=(agt.indexOf("os/2")!=-1)
|| (navigator.appVersion.indexOf("OS/2")!=-1)
|| (agt.indexOf("ibm-webexplorer")!=-1)
this.mac=(agt.indexOf("mac")!=-1)
this.mac68k=this.mac && ((agt.indexOf("68k")!=-1) ||
(agt.indexOf("68000")!=-1))
this.macppc=this.mac && ((agt.indexOf("ppc")!=-1) ||
(agt.indexOf("powerpc")!=-1))
this.sun=(agt.indexOf("sunos")!=-1)
this.sun4=(agt.indexOf("sunos 4")!=-1)
this.sun5=(agt.indexOf("sunos 5")!=-1)
this.suni86= this.sun && (agt.indexOf("i86")!=-1)
this.irix=(agt.indexOf("irix") !=-1)    // SGI
this.irix5=(agt.indexOf("irix 5") !=-1)
this.irix6=((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1))
this.hpux=(agt.indexOf("hp-ux")!=-1)
this.hpux9=this.hpux && (agt.indexOf("09.")!=-1)
this.hpux10= this.hpux && (agt.indexOf("10.")!=-1)
this.aix=(agt.indexOf("aix")  !=-1)      // IBM
this.aix1=(agt.indexOf("aix 1")  !=-1)
this.aix2=(agt.indexOf("aix 2")  !=-1)
this.aix3=(agt.indexOf("aix 3")  !=-1)
this.aix4=(agt.indexOf("aix 4")  !=-1)
this.linux=(agt.indexOf("inux")!=-1)
this.sco=(agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1)
this.unixware=(agt.indexOf("unix_system_v")!=-1)
this.mpras=(agt.indexOf("ncr")!=-1)
this.reliant=(agt.indexOf("reliantunix")!=-1)
this.dec=(agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1)
|| (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1)
|| (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1)
this.sinix=(agt.indexOf("sinix")!=-1)
this.freebsd=(agt.indexOf("freebsd")!=-1)
this.bsd=(agt.indexOf("bsd")!=-1)
this.unix=(agt.indexOf("x11")!=-1) || this.sun || this.irix || this.hpux ||
this.sco ||this.unixware || this.mpras || this.reliant ||
this.dec || this.sinix || this.aix || this.linux || this.freebsd
this.vms=(agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1)
};function c2a_showCannotWirePropertyDialog(event, message) {
window.c2a_currCannotWireDialog=document.createElement("div");window.c2a_currCannotWireDialog.style.position="absolute";if (is.nav) {
window.c2a_currCannotWireDialog.style.left=window.c2a_clickX + 5 + "px";window.c2a_currCannotWireDialog.style.top=window.c2a_clickY + 5 + "px";} else if (is.ie) {
window.c2a_currCannotWireDialog.style.left=window.event.clientX + 2 + document.body.scrollLeft;window.c2a_currCannotWireDialog.style.top=window.event.clientY + 2 + document.body.scrollTop;} else {
return;}form="";form="<form class='" + portletMenuClass + "' name='c2a-no-wire-dialog'><table>";form=form + "<tr class='" + portletMenuItemClass + "'><td>" + message + "</td></tr>";form=form + "<tr class='" + portletMenuItemClass + "'><td align='center'>&nbsp;<input class='" + wpsButtonTextClass + "' type='button' name='OK' value='" + window.okText + "' onClick='javascript:c2a_cannotWirePropertyDialogOK()'/>&nbsp;</td></tr>";form=form + "</table></form>";window.c2a_currCannotWireDialog.innerHTML=form;document.body.appendChild(window.c2a_currCannotWireDialog);c2a_hideSelectsIfOverlapping(window.c2a_currCannotWireDialog);};function c2a_hideCannotWirePropertyDialog() {
if (window.c2a_currCannotWireDialog) {
document.body.removeChild(window.c2a_currCannotWireDialog);c2a_restoreHiddenSelects();}window.c2a_currCannotWireDialog=null;};