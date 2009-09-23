//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
function fMgr(framePath, reloadURL)
{
if (framePath != null && reloadURL != null) {
var frame=eval(framePath);if (frame != null && frame.location != null) {
var useReload=false;try {
var hashLength=0;if (frame.location.hash != null)
hashLength=frame.location.hash.length;if (hashLength > 0) {
var offset=frame.location.href.length - (hashLength + reloadURL.length);if ((offset >= 0) && (frame.location.href.indexOf(reloadURL) == offset)) {
useReload=true;}}}catch(e) { };if (useReload)
frame.location.reload(true);else
frame.location.replace(reloadURL);}}};function frmAct(action, formName, wclhidden) {
if (document != null && document.forms != null && formName != null) {
var form=document.forms[formName];if (form != null) {
eval("form." + wclhidden + ".value='" + action + "'");}}};function editbx(textfield, value, addOption, comboImg, textImg, statusName) {
if (textfield != null) {
if (value != addOption) {
textfield.disabled=true;textfield.className="te1";if (comboImg != null) {
comboImg.style.display="inline";}if (textImg != null) {
textImg.style.display="none";}} else {
textfield.disabled=false;if (statusName != null) {
textfield.className=statusName;}if (comboImg != null) {
comboImg.style.display="none";}if (textImg != null) {
textImg.style.display="inline";}}}};function chgEvt(selObj, event) {
if(WClient.isBrowserMozilla() && WClient.isBrowserVersion7Up())
{
var wEvent=new WEvent(event);if(wEvent.getKeyCode() == 38 || wEvent.getKeyCode() == 40)
{
selObj.blur();selObj.focus();}}};function msgAct(name, ids, formName, wclhidden, wclMessageClosed) {
if (document != null && document.forms != null && formName != null) {
var form=document.forms[formName];if (form != null) {
eval("form." + wclhidden + ".value='" + name + "'");eval("form." + wclMessageClosed + ".value='" + ids + "'");form.submit();}}return false;};function doNb(formName, actionName, actionValue, actionNameEnc, wclhidden, wclanchor) {
return doSubmit(formName, actionName, actionValue, null, actionNameEnc, wclhidden, wclanchor);};function doWiz(formName, actionName, actionValue, actionNameEnc, wclhidden, wclanchor) {
return doSubmit(formName, actionName, actionValue, null, actionNameEnc, wclhidden, wclanchor);};function doTree(formName, actionName, actionValue, anchorName, actionNameEnc, wclhidden, wclanchor, idName){
if (document != null && document.forms != null && formName != null) {
var form=document.forms[formName];if (form != null) {
if(idName != null){
eval("form." + idName + ".value='" + idName + "'");}}}return doSubmit(formName, actionName, actionValue, anchorName, actionNameEnc, wclhidden, wclanchor);};function doSubmit(formName, actionName, actionValue, anchorName, actionNameEnc, wclhidden, wclanchor) {
if (document != null && document.forms != null && formName != null) {
var form=document.forms[formName];if (form != null) {
if (actionName != null) {
eval("form." + actionNameEnc + ".value='" + actionValue + "'");eval("form." + wclhidden + ".value='" + actionName + "'");}if (anchorName != null) {
var aDate=new Date();eval("form." + wclanchor + ".value='" + anchorName + '_' + aDate.getTime() + "'");var idx=form.action.indexOf('#');if (idx > -1) {
form.action=form.action.substring(0, idx);}form.action+='#' + anchorName;}form.submit();}}return false;};function doPop(formName, actionName, actionValue, actionNameEnc, menuID, menuCmd, wclhidden)
{
if (document != null && document.forms != null && formName != null) {
var form=document.forms[formName];if (form != null) {
if (actionName != null && actionNameEnc != null && wclhidden != null) {
eval("form['" + actionNameEnc + "'].value='" + actionValue + "'");eval("form['" + wclhidden + "'].value='" + actionName + "'");}if (menuID != null) {
eval("form['" + menuID + "'].value='" + menuCmd + "'");}form.submit();}}return false;};function doAnchor(formName, anchorName, wclanchor) {
var form=document.forms[formName];if (form != null && anchorName != null && wclanchor != null) {
var aDate=new Date().getTime();eval("form." + wclanchor + ".value='" + aDate + "'");var index=form.action.indexOf("#");if (index != -1)
{
form.action=form.action.substring(0, index);}form.action+='#' + anchorName;var inputName="wclAnchorHash";var input=document.getElementById(inputName);if (!input)
{
input=document.createElement("INPUT");with (input)
{
type="hidden";id=inputName;name=inputName;};form.appendChild(input);}input.value=anchorName;}return true;};function doTbl(formName, actionName, actionValue, anchorName, actionNameEnc, wclhidden, wclanchor) {
if (document != null && document.forms != null && formName != null) {
var form=document.forms[formName];if (form != null) {
if (actionName != null) {
eval("form." + actionNameEnc + ".value='" + actionValue + "'");eval("form." + wclhidden + ".value='" + actionName + "'");}doAnchor(formName, anchorName, wclanchor);form.submit();}return false;}};function doTgl(inputElement) {
if (inputElement != null)
{
var cells=inputElement.parentNode.parentNode.parentNode.childNodes;if (cells != null)
{
var suffix=cells[0].className.substring(cells[0].className.indexOf("s") > -1 ? 4 : 3);var style="tbl" + (inputElement.checked ? "s" : "") + suffix;for (var i=0; i<cells.length; i++)
{
cells[i].className=style;};}}return true;};function doRTgl(radioElement) {
if (radioElement != null) {
var radioGroup=radioElement.form.elements[radioElement.name];var done=false;if (!radioGroup.length)
radioGroup=new Array(radioElement);for (var i=0; !done && i<radioGroup.length; i++) {
if (radioGroup[i].parentNode.parentNode.className.indexOf("tbls2") == 0) {
done=doTgl(radioGroup[i]);if (radioGroup[i] == radioElement)
radioElement.checked=false;}};doTgl(radioElement);}return true;};function numUpdate(formName, conditionsName, startNumberName, endNumberName) {
var form=document.forms[formName];if (form != null) {
var index=eval("form." + conditionsName + ".selectedIndex;");eval("form." + startNumberName+ ".parentNode.parentNode.parentNode.style.visibility=index == 0 ? 'hidden' : 'visible'");eval("form." + endNumberName + ".parentNode.parentNode.parentNode.style.visibility=index !=7 && index != 8? 'hidden' : 'visible'");}return true;};function dateUpdate(formName, conditionsName, startDateName, startTimeName, endDateName, endTimeName) {
var form=document.forms[formName];if (form != null) {
var index=eval("form." + conditionsName + ".selectedIndex;");eval("form." + startDateName+ ".parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility=index == 0 ? 'hidden' : 'visible'");eval("form." + startTimeName+ ".parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility=index == 0 ? 'hidden' : 'visible'");eval("form." + endDateName+ ".parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility=index !=3 ? 'hidden' : 'visible'");eval("form." + endTimeName+ ".parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility=index !=3 ? 'hidden' : 'visible'");}return true;};function fdaState(fdaId, defaultId) {
this.fdaId=fdaId;this.defaultId=defaultId;this.currentId=this.defaultId;};function fdaDesc(fdaState, contentId) {
if (fdaState != null) {
if (fdaState.currentId != null) {
var hideMe=document.getElementById(fdaState.currentId);if (hideMe != null) {
hideMe.style.display="none";fdaState.currentId=null;}}var nextId=(contentId != null) ? contentId + "Div" : fdaState.defaultId;if (nextId != null) {
var showMe=document.getElementById(nextId);if (showMe != null) {
showMe.style.display="inline";fdaState.currentId=nextId;}}}return true;};function dlState(dualListId, formName, leftBoxName, rightBoxName, addButtonName, removeButtonName, upButtonName, downButtonName) {
this.dualListId=dualListId;this.formName=formName;this.leftBoxName=leftBoxName;this.rightBoxName=rightBoxName;this.addButtonName=addButtonName;this.removeButtonName=removeButtonName;this.upButtonName=upButtonName;this.downButtonName=downButtonName;};function dlSelAll(dualListState, isLeftBox) {
if (dualListState != null) {
var listName=(isLeftBox) ? dualListState.leftBoxName : dualListState.rightBoxName;var listBox=eval("document.forms['" + dualListState.formName + "']." + listName);if (listBox != null) {
for (i=0; i < listBox.options.length; i++) {
listBox.options[i].selected=true;};}}};function dlMove(dualListState, isLeftBox) {
if (dualListState != null) {
var fromName=(isLeftBox) ? dualListState.leftBoxName : dualListState.rightBoxName;var toName=(isLeftBox) ? dualListState.rightBoxName : dualListState.leftBoxName;var fromList=eval("document.forms['" + dualListState.formName + "']." + fromName);var toList=eval("document.forms['" + dualListState.formName + "']." + toName);if (toList != null && fromList != null) {
toList.selectedIndex=-1;var lastIndex=-1;var index=fromList.selectedIndex;while (-1 != index) {
lastIndex=index;var selectedOption=fromList.options[index];var newOption=new Option(selectedOption.text, selectedOption.value);toList.options[toList.options.length]=newOption;toList.options[toList.options.length - 1].selected=true;fromList.options[index]=null;index=fromList.selectedIndex;};if ((-1 != lastIndex) && (0 < fromList.options.length)) {
if (lastIndex >= fromList.options.length) {
lastIndex--;}fromList.options[lastIndex].selected=true;}}}};function dlUpdate(dualListState, isAddButton, isLeftBox) {
if (dualListState != null) {
var listName=(isLeftBox) ? dualListState.leftBoxName : dualListState.rightBoxName;var listBox=eval("document.forms['" + dualListState.formName + "']." + listName);var buttonName=(isAddButton) ? dualListState.addButtonName : dualListState.removeButtonName;var button=eval("document.forms['" + dualListState.formName + "']." + buttonName);if (button != null && listBox != null) {
button.disabled=(-1 == listBox.selectedIndex);if (button.disabled) {
button.className='b3';}else {
button.className='b1';}}}};function dlReorder(dualListState, isLeftBox, direction) {
if (dualListState != null) {
var listName=(isLeftBox) ? dualListState.leftBoxName : dualListState.rightBoxName;var listBox=eval("document.forms['" + dualListState.formName + "']." + listName);if (listBox != null) {
var start=(direction < 0) ? 0 : listBox.options.length - 1;var end=(direction < 0) ? listBox.options.length : -1;while ((start != end) &&
(0 <= start) &&
(start < listBox.options.length) &&
listBox.options[start].selected)
{
start -= direction;};for (var i=start; (i != end) && (0 <= i) && (i < listBox.options.length); i -= direction) {
if (listBox.options[i].selected) {
var partner=i + direction;if ((0 <= partner) && (listBox.options.length > partner)) {
var temp1=listBox.options[i];var tempText=temp1.text;var tempValue=temp1.value;var tempSelect=temp1.selected;var temp2=listBox.options[partner];temp1.text=temp2.text;temp1.value=temp2.value;temp1.selected= temp2.selected;temp2.text=tempText;temp2.value=tempValue;temp2.selected=tempSelect;}}};}}};