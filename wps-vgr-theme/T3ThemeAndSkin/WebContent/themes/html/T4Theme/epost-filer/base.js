// (C) Copyright IBM Corp. 2002, 2006  All Rights Reserved
NG={};NG.XmlUtil={};NG.Util={};NG.EventManager={};NG.ServerRequest={};NG.Resource={};NG.INBOX="$(Inbox)";NG.DRAFTS="$(Drafts)";NG.SENT="$(Sent)";NG.TRASH="$(Trash)";NG.ServerRequest.sAcceptLanguage="";NG.ServerRequest.postRequest=function (sActionUrl, sParameter) {
var method="POST";if (typeof(sParameter) == "undefined")
method="GET";var oXml=xmlGetRequest();oXml.open(method, sActionUrl, false);if (NG.ServerRequest.sAcceptLanguage.length > 0) {
oXml.setRequestHeader("Accept-language", NG.ServerRequest.sAcceptLanguage);}oXml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");try
{
oXml.send(sParameter);if(oXml.responseText ==  ""){
oXml.open("POST", sActionUrl, false);oXml.setRequestHeader("Accept-language", "*");oXml.send(sParameter);}} catch(e) {
oXml.open(method, sActionUrl, false);oXml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");oXml.setRequestHeader("Accept-language", "*");oXml.send(sParameter);};return oXml;};NG.ServerRequest.getResponseHeader=function (oXml, sHeader) {
var result;try { result=oXml.getResponseHeader(sHeader); }catch (exc) { result=null; };return result;};NG.ServerRequest.checkSessionExpiration=function(xmlHttpPost) {
if(NG.ServerRequest.getResponseHeader(xmlHttpPost, "X-Nagano-Login"))
{
alert(NG.Resource.getString('info.session.expired'));NG.Util.handleTimeout(false, true);return true;}return false;};NG.ServerRequest.updateState=function (sActionUrl, sParameter)
{
var oXml=NG.ServerRequest.postRequest(sActionUrl, sParameter);if (NG.ServerRequest.checkSessionExpiration(oXml))
{
return;}var sErrMsg=NG.ServerRequest.checkForError(oXml);if (sErrMsg) throw new Error(""+sErrMsg, ""+sErrMsg);return oXml.responseText;};NG.ServerRequest.checkForError=function (oXml) {
var sErrMsg=null;var sError=NG.ServerRequest.getResponseHeader(oXml, "X-Nagano-Error");if(sError)
{
var sErrMsg='', sArg=NG.ServerRequest.getResponseHeader(oXml, "X-Nagano-MsgArg1");if (sArg)
{
sErrMsg=NG.Resource.getString(sError, window.decodeURIComponent(sArg));} else {
sErrMsg=NG.Resource.getString(sError);};}return sErrMsg;};NG.ServerRequest.setAsync=function(sUrl, sParameter, oCaller, bfirstime) {
var oXml=xmlGetRequest();oXml.open("POST", sUrl, true);oXml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");if(! bfirstime)
{
oXml.setRequestHeader("Accept-language", "*");}try {
oXml.onreadystatechange=function()  {
if (oXml.readyState == 4)
{
if (NG.ServerRequest.checkSessionExpiration(oXml))
{
return;}oCaller.startUpdate();sError=NG.ServerRequest.checkForError(oXml);if (sError)
{
oCaller.handleError(""+NG.Resource.getString(sError));} else {
var data=oXml.responseText;oCaller.handleData(data);};}};oXml.send(sParameter);} catch(e) {
throw new Error("", "");};};NG.ServerRequest.asyncRequest=function(sActionUrl, sParameter, oCaller) {
try
{
NG.ServerRequest.setAsync(sActionUrl, sParameter, oCaller, true);} catch(e) {
NG.ServerRequest.setAsync(sActionUrl, sParameter, oCaller, false);};};NG.ServerRequest.setAcceptLanguage=function(sLanguage) {
NG.ServerRequest.sAcceptLanguage=sLanguage;};NG.EventManager.getName=function () { return 'NG.EventManager'; };NG.EventManager.eventMappings=[];NG.EventManager.addEventHandler=function (eventSourceName, eventHandlerName, eventHandlerFunction) {
var index=0, eventMap=null, e=null;for (index=0; index < NG.EventManager.eventMappings.length; index++) {
e=NG.EventManager.eventMappings[index];if (e.eventSourceName &&
e.eventSourceName == eventSourceName &&
e.eventHandlerFunction &&
e.eventMappings[index].eventHandlerFunction == eventHandlerFunction) {
eventMap=NG.EventManager.eventMappings[index];break;}};if (eventMap == null) {
NG.EventManager.eventMappings[NG.EventManager.eventMappings.length]={
"eventSourceName": eventSourceName,
"eventHandlerFunction": eventHandlerFunction,
"eventHandlerNames": []
};}eventMap.eventHandlerNames[eventMap.eventHandlerNames.length]=eventHandlerName;};NG.EventManager.triggerEvent=function (eventSourceName, eventHandlerFunction) {
var index=0;for (index=0; index < NG.EventManager.eventMappings.length; index++) {
if (NG.EventManager.eventMappings[index].eventSourceName &&
NG.EventManager.eventMappings[index].eventSourceName == eventSourceName &&
(!eventHandlerFunction ||
(NG.EventManager.eventMappings[index].eventHandlerFunction &&
NG.EventManager.eventMappings[index].eventHandlerFunction == eventHandlerFunction))) {
var eventMap=NG.EventManager.eventMappings[index];var handlerNames=eventMap.eventHandlerNames;var index2=0;for (index2=0; index2 < handlerNames.length; index2++) {
var expression=handlerNames[index2] + "." + eventMap.eventHandlerFunction +
"(" + eventMap.eventSourceName + ")";eval(expression);};}};};NG.Errors={};NG.Errors.listeners=[];NG.Errors.errors=[];NG.Errors.Error=function(property, msg) {
this.property=property;this.msg=msg;};NG.Errors.clearErrors=function(property) {
newErrors=[];for (i=0; i < NG.Errors.errors.length; i++) {
if (NG.Errors.errors[i].property != property) {
newErrors[newErrors.length]=NG.Errors.errors[i];}};NG.Errors.errors=newErrors;};NG.Errors.clearAllErrors=function() {
NG.Errors.errors=[];};NG.Errors.callListeners=function() {
for (i in NG.Errors.listeners) {
if ((NG.Errors.listeners[i] != null) &&
typeof(NG.Errors.listeners[i]) != 'undefined') {
eval(NG.Errors.listeners[i]);}};};NG.Errors.addError=function(property, msg) {
NG.Errors.errors[NG.Errors.errors.length]=new NG.Errors.Error(property, msg);NG.Errors.callListeners();};NG.Errors.addListener=function(listener) {
for (i=0; i < NG.Errors.listeners.length; i++) {
if (NG.Errors.listeners[i] == listener) {
return;}};NG.Errors.listeners[NG.Errors.listeners.length]=listener;};NG.Errors.getErrorStringAll=function() {
var str='', first=true;for (i=0; i < NG.Errors.errors.length; i++) {
if (!first) {
str+='\n';}else {
first=false;}str+=NG.Errors.errors[i].msg;};return str;};NG.Errors.getErrorString=function(property) {
var str='', first=true;for (i=0; i < NG.Errors.errors.length; i++) {
if (NG.Errors.errors[i].property == property) {
if (!first) {
str+='\n';}else {
first=false;}str+=NG.Errors.errors[i].msg;}};return str;};NG.XmlUtil.loadXml=function (sUrl)
{
try { return xmlLoad(sUrl); }catch (exc) {
var sMsg=NG.Resource.getString('err.messagelist.loadxmlfile')+'\n'+sUrl;throw new Error(""+sMsg, ""+sMsg);};};NG.XmlUtil.loadXsl=function(sUrl)
{
try { return xslLoad(sUrl); }catch (exc) {
var sMsg=NG.Resource.getString('err.messagelist.loadxslfile')+'\n'+sUrl;throw new Error(""+sMsg, ""+sMsg);};};NG.XmlUtil.loadXmlString=function (sXml)
{
try { return xmlLoadString(sXml); }catch (exc) {
var sMsg=NG.Resource.getString('err.messagelist.loadxmldata');throw new Error(""+sMsg, ""+sMsg);};};NG.XmlUtil.transformXmlString=function (xml, xsl, sXslMode, aXslParams)
{
try { return xmlTransformString(xml, xsl, sXslMode, aXslParams); }catch (exc) {
var sMsg=NG.Resource.getString('err.messagelist.xsltransform');throw new Error(""+sMsg, ""+sMsg);};};NG.XmlUtil.transformXmlFile=function (xml, xsl, sXslMode, aXslParams)
{
try { return xmlTransform(xml, xsl, sXslMode, aXslParams); }catch (exc) {
var sMsg=NG.Resource.getString('err.messagelist.xsltransform');throw new Error(""+sMsg, ""+sMsg);};};NG.XmlUtil.transformXmlDoc=function (xml, xsl, sXslMode, aXslParams)
{
try { return xmlTransformDoc(xml, xsl, sXslMode, aXslParams); }catch (exc) {
var sMsg=NG.Resource.getString('err.messagelist.xsltransform');throw new Error(""+sMsg, ""+sMsg);};};NG.XmlUtil.setLayerContentByXml=function (layer, xml, xsl) {
var result=NG.XmlUtil.transformXmlDoc(xml,xsl);if (layer.innerHTML) layer.innerHTML=result;else {
var obj=document.getElementById(layer);obj.innerHTML=result;}};NG.Util.webContextName=null;NG.Util.addOptionToSelect=function (selectInput, text, value) {
if (!selectInput.options) {
selectInput=NG.Util.findObject(selectInput);if (!selectInput.options) {
alert(NG.Resource.getString('err.NG.addOptionToSelect',selectInput));return;}}var newElem=document.createElement("option");newElem.text=text;newElem.value=value;selectInput.options.add(newElem);};NG.Util.findObject=function (name, doc) {
var p,i,x;if (!doc) {
x=NG.Util.findObject(name, document);for (p=0; !x &&  p < parent.frames.length; p++) {
x=NG.Util.findObject(name, parent.frames[p].document, false);};doc=document;}if (x) return x;if (!(x=doc[name]) && doc.all) x=doc.all[name];for (i=0; !x && i < doc.forms.length; i++) {
x=doc.forms[i][name];};for (i=0; !x && doc.layers && i < doc.layers.length; i++) {
x=NG.Util.findObject(name, doc.layers[i].document);};return x;};NG.Util.findLayer=function (name) {
return NG.Util.findObject(name,document);};NG.Util.showLayers=function () {
var i, obj, args=NG.Util.showLayers.arguments;for (i=0; i < args.length; i++) {
if (args[i].style) {
args[i].style.visibility='visible';} else if (args[i].visibility) {
args[i].visibility='show';} else {
obj=NG.Util.findObject(args[i]);if (obj.style) obj.style.visibility='visible';else if (obj.visibility) obj.visibility='show';}};};NG.Util.hideLayers=function () {
var i, obj, args=NG.Util.hideLayers.arguments;for (i=0; i < args.length; i++) {
if (args[i].style) {
args[i].style.visibility='hidden';} else if (args[i].visibility) {
args[i].visibility='hide';} else {
obj=NG.Util.findObject(args[i]);if (obj.style) obj.style.visibility='hidden';else if (obj.visibility) obj.visibility='hide';}};};NG.Util.isVisisble=function (layer) {
if (layer.style) {
return layer.style.visibility == "visible"; // IE
} else if (layer.visibility) {
return layer.visibility == "show";          // Netscape
} else {
var obj=NG.Util.findObject(layer);if (obj.style) return obj.style.visibility == "visible";if (obj.visibility) return obj.visibility == "show";}return -1;};NG.Util.getLayerContent=function (layer) {
if (layer.innerHTML) {
return layer.innerHTML;} else if (layer.element && layer.element.innerHTML) {
return layer.element.innerHTML;} else if (layer.document) {
return layer.document;} else {
var obj=NG.Util.findObject(layer);if (obj.innerHTML) {
return obj.innerHTML;} else if (obj.element && obj.element.innerHTML) {
return obj.element.innerHTML;} else if (obj.document) {
return obj.document;}}return "";};NG.Util.setLayerContent=function (layer, content) {
if (layer.innerHTML) {
layer.innerHTML=content;} else if (layer.element && layer.element.innerHTML) {
layer.element.innerHTML=content;} else if (layer.document) {
layer.document.writeln(content);layer.document.close();} else {
var obj=NG.Util.findObject(layer);if (obj.innerHTML) {
obj.innerHTML=content;} else if (obj.element && obj.element.innerHTML) {
obj.element.innerHTML=content;} else if (obj.document) {
obj.document.writeln(content);obj.document.close();}};};NG.Util.addNonceToUrl=function(url) {
if (url.indexOf("?") > -1) {
url+="&Nonce=";} else {
url+="?Nonce=";}if(NG.Session.GetAttribute("NaganoUrlNonce") != null) {
url+=NG.Session.GetAttribute("NaganoUrlNonce");} else {
alert("Missing session nonce.");};return url;};NG.Util.setWebContextName=function(name)
{
NG.Util.webContextName=name;};NG.Util.makeActionURL=function(action) {
return (actionBaseURL + action)
};NG.Util.makeWebContextURL=function(url, isDangerous) {
if (typeof isDangerous == 'undefined') {
isDangerous=false;}if (NG.Util.webContextName == null)
{
var docUrl=document.URL;var pieces=docUrl.split("/");NG.Util.webContextName=pieces[3];}var result=NG.Util.webContextName;if (url.charAt(0) != "/")
result+="/";return(result + (isDangerous ? NG.Util.addNonceToUrl(url) : url));};NG.Util.setDateTime=function(objectID)
{
var oElement=document.getElementById(objectID);if(oElement)
{
oElement.innerText=(new Date()).toLocaleString();}};NG.Util.showMoveToFolderDialog=function(params, excludeList)
{
var createFolderList=false, url="/selectfolder.jsp";if (typeof params == 'undefined' || params == null) {
params={};}if (typeof params.aFolders == 'undefined') {
createFolderList=true;url+="?createFolderList=true";}if (createFolderList) {
if (typeof excludeList != 'undefined' && excludeList != null) {
url+=("&exclude=" + excludeList);}}params.wndParent=window;return showModalDialog(NG.Util.makeWebContextURL(url),
params, "dialogHeight:200px;dialogWidth=420px;center:yes;status:no;edge:raised;help:no;resizable:no;scroll:no;");};NG.Util.statusMsgTimer=null;NG.Util.statusMsgTimeout=function()
{
window.status="";};NG.Util.showStatus=function(msg, wnd, persist)
{
try {
if (typeof wnd == 'undefined') {
wnd=window;}if (!wnd) return;if (!msg) msg="";if (typeof persist != 'boolean')
persist=false;if (!wnd.closed) {
wnd.clearTimeout(wnd.NG.Util.statusMsgTimer);wnd.status=msg;if (msg != "" && !persist) {
wnd.NG.Util.statusMsgTimer=wnd.setTimeout("NG.Util.statusMsgTimeout();", 10000);}}} catch (e) {
;};};NG.Util.resize=function(maxW, maxH) {
var availWidth=screen.availWidth;if (typeof maxW != "undefined") {
availWidth=maxW ;}var maxWidth=(availWidth * 3)/4;  // max is 75% of screen
var bodyWidth=document.body.scrollWidth;var curWidth=document.body.offsetWidth;if (curWidth > maxWidth) {
return;}var availHeight=screen.availHeight;if (typeof maxH != "undefined") {
availHeight=maxH ;}var maxHeight=(availHeight * 3)/4;  // max is 75% of screen
var bodyHeight=document.body.scrollHeight;var curHeight=document.body.offsetHeight;if (curHeight > maxHeight) {
return;}var scrollerWidth=curWidth - document.body.clientWidth;if (scrollerWidth > 0) {
bodyWidth+=scrollerWidth;}if (bodyWidth > maxWidth) {
bodyWidth=maxWidth;}if (bodyHeight > maxHeight) {
bodyHeight=maxHeight;}if (curWidth < bodyWidth) {
window.resizeBy(bodyWidth - curWidth,0);}if (curHeight < bodyHeight) {
window.resizeBy(0,bodyHeight - curHeight);}};NG.Util.isValidSession=function()
{
var sUrl=NG.Util.makeWebContextURL("/blank.jsp"),
oXml=NG.ServerRequest.postRequest(sUrl, "");return oXml.getResponseHeader("X-Nagano-Session")?true:false;};NG.Util.handleTimeout=function(bAlert, bOpenLoginPage)
{
var mainWindow=null, bDialog=false,
sUrl=NG.Util.makeWebContextURL("/index.jsp"),
sMessage=NG.Resource.getString('info.session.expired');if(window.opener)
{
mainWindow=window.opener;while(mainWindow.opener)
{
mainWindow=mainWindow.opener;};}else if(window.dialogHeight)
{
bDialog=true;if(window.dialogArguments && window.dialogArguments.wndParent)
{
mainWindow=window.dialogArguments.wndParent;while(mainWindow.opener)
{
mainWindow=mainWindow.opener;};}}if(mainWindow)
{
if(!mainWindow.closed)
{
mainWindow.setTimeout("window.location.replace('"+sUrl+"');", 200);}else
{
mainWindow=window.open(sUrl);mainWindow.opener=null;};if(bAlert)
{
if(bDialog)
alert(sMessage);else
mainWindow.setTimeout("alert('"+ sMessage +"');", 50);}window.close();}else
{
if(bOpenLoginPage)
window.location.replace(sUrl);};};NG.Util.Trim=function(inword){
word=inword.toString();var i=0, j=word.length-1;while(word.charAt(i) == " ") i++;while(word.charAt(j) == " ") j--;if (i > j) {
return word.substring(i,i);} else {
return word.substring(i,j+1);};};NG.Util.ResetWASReqURL=function(){
var exp=new Date();exp.setTime (exp.getTime() - 1);var sCookie=document.cookie, aNames=sCookie.split(";");for(var i=0; i<aNames.length; i++)
{
var sName=aNames[i].substring(0, aNames[i].indexOf("="));if (NG.Util.Trim(sName)=="WASReqURL"){
NG.Util.setCookie(sName, "", exp, '/');}};};NG.Util.setCookie=function (name, value)
{
var argv=NG.Util.setCookie.arguments;var argc=NG.Util.setCookie.arguments.length;var expires=(argc > 2) ? argv[2] : null;var path=(argc > 3) ? argv[3] : null;var domain=(argc > 4) ? argv[4] : null;var secure=(argc > 5) ? argv[5] : false;document.cookie=name + "=" + escape (value) +
((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
((path == null) ? "" : ("; path=" + path)) +
((domain == null) ? "" : ("; domain=" + domain)) +
((secure == true) ? "; secure" : "");};NG.Util.resizeEditor=function(bottomDiv, editorDiv, minEditorHeight, minEditorWidth) {
var editor=document.getElementById(editorDiv);var docBody=document.body;var bodyExtra;bodyExtra=docBody.offsetWidth - docBody.clientWidth;var offsetLeft=editor.offsetLeft + editor.clientLeft;var par=editor.parentElement;while (par != null) {
offsetLeft+=(par.offsetLeft + par.clientLeft);par=par.parentElement;};var bodyWidth=docBody.clientWidth;var eWidth=bodyWidth -(offsetLeft);if (eWidth < minEditorWidth) {
eWidth=minEditorWidth;}editor.style.width=eWidth + "px";var marker=document.getElementById(bottomDiv);var markerHeight=marker.offsetTop + marker.offsetHeight;bodyExtra=docBody.clientTop + 25;if (docBody.offsetWidth < docBody.scrollWidth) {
bodyExtra+=docBody.offsetHeight - docBody.clientHeight;}var adjust=docBody.offsetHeight - (bodyExtra + markerHeight);var eHeight=parseFloat(editor.style.height);if(isNaN(eHeight) == true) {
eHeight=minEditorHeight;}if (eHeight + adjust < minEditorHeight) {
editor.style.height=minEditorHeight + "px";}else {
editor.style.height=eHeight + adjust + "px";}};NG.PortletMode="";NG.setMessageBoxLinks=function(url, questionGif, exclamationGif)
{
this.messageBoxUrl=url;this.messageBoxQuestionGif=questionGif;this.messageBoxExclamationGif=exclamationGif;};NG.MessageBox=function(type, args, extraflags)
{
var url='/messageBox.jsp?type='+type;if (typeof args == 'object') {
if (typeof args.key == 'string') {
url+='&key='+args.key;}args.wndParent=window;}var flags="dialogWidth:350px;dialogHeight:200px;resizable:no;center:yes;status:no;edge:raised;help:no;scroll:no;";if (typeof extraflags == 'string') {
flags+=extraflags;}return window.showModalDialog(NG.Util.makeWebContextURL(url), args, flags);};NG.Util.info=function(args, extraflags)
{
return NG.MessageBox("information", args, extraflags);};NG.Util.warn=function(args, extraflags)
{
return NG.MessageBox("warning", args, extraflags);};NG.Util.confirm=function(args, extraflags)
{
return NG.MessageBox("confirm", args, extraflags);};NG.Util.error=function(args, extraflags)
{
return NG.MessageBox("error", args, extraflags);};NG.appendHiddenInputField=function(form, name, value)
{
var input=document.createElement('INPUT');input.type="hidden";input.name=name;input.value=value;form.appendChild(input);};NG.specifyDomain=function(url, form, varname)
{
if (url.substr(0,7) != "http://" && url.substr(0,8) != "https://") {
return url;}var hostname=url.split(":")[1].substr(2);if (hostname.indexOf('/') > 0) {
hostname=hostname.substring(0, hostname.indexOf('/'));}if (window.location.hostname == hostname) {
return url;}var a1=window.location.hostname.split('.');var a2=hostname.split('.');var i=1;var domain="";while (a1.length >= i && a2.length >= i) {
if (a1[a1.length-i] == a2[a2.length-i]) {
domain=a1[a1.length-i] + (i == 1 ? '' : '.') + domain;} else {
break;};i++;};if (domain != "") {
if (!varname) {
varname='domain';}if (form) {
NG.appendHiddenInputField(form, varname, domain);} else {
url+=((url.indexOf('?') == -1 ? "?" : "&") + varname + "=" + domain);};document.domain=domain;}return url;};NG.Resource.Strings=[];NG.Resource.getString=function (key) {
s=NG.Resource.Strings[key];s=(s==null)?key:s;if (arguments.length >= 2) {
i=1;do {
s=s.replace("%"+i , arguments[i]);i=i +1;} while (i < arguments.length);}return s;};NG.RTE={};NG.RTE.mozillaContents="<body><br>\r\n\r\n</body>" ;NG.RTE.ieContents="<P>&nbsp;</P>" ;NG.RTE.otherContents="<body><br></body>" ;NG.RTE.initEditor=function(formName, editorName, dataField) {
var ngForm=document.forms[formName];var field=ngForm.elements[dataField];var data=field.value;if (data != null && data.length > 0) {
IBM_RTE_setEditorHTML(editorName, data);}};NG.RTE.getRichText=function(editorName,contentField) {
if (contentField.tagName != "TEXTAREA") { //if not plain text editor
var data;try {
data=IBM_RTE_getEditorHTMLFragment(editorName);} catch (e) {
contentField.value="";return;};if(data){
if(data.length==0)
data="<br>";data=data.replace(/&nbsp;/g, ' ');if(data == "<br><br>" || data == "\r\n" || data == "\r\n\r\n")  // this should be OK for now...what a hack.
data="<br>" ; // this takes the second time around problem.
data="<body>"+data+"</body>";}contentField.value=data;}};NG.RTE.switchEditor=function(formName, contentFieldName, editorName, source) {
var bSwitch=true;var ngForm=document.forms[formName];var contentField=ngForm.elements[contentFieldName];var bRichText=false;if (contentField.tagName != "TEXTAREA") {
NG.RTE.getRichText(editorName, contentField);bRichText=true;}var switchRadio=ngForm.elements["plainText"];var doSwitch=false;if (switchRadio[1].checked && bRichText == true) {
doSwitch=true;}if (switchRadio[0].checked && bRichText == false) {
doSwitch=true;}if (doSwitch == true) {
if (switchRadio[1].checked) {
if (NG.RTE.isDirty(contentField, editorName) == true) {
bSwitch=confirm(NG.Resource.getString('msgedit.verify.switch'));if (bSwitch == false) {
switchRadio[0].checked=true;}}}if (bSwitch) {
var method=ngForm.elements["method"];method.value="switchEditor";ngForm.submit();return false;}}};NG.RTE.isDirty= function(contentField, editorName) {
var isDirty=false ;if(contentField.value != "" && contentField.value != NG.RTE.ieContents && contentField.value != NG.RTE.mozillaContents && contentField.value != NG.RTE.otherContents){
isDirty=true ;}return isDirty;};NG.SpellChecker={};NG.SpellChecker.checkSpelling=function(url, arg)
{
try {
var spr=new SpellCheckRange();var txt="";for(x=0 ; x < arg.length ; x++) {
if(isGecko()) {
var rangeHelper=new NG.RangeHelper(arg[x]);txt=rangeHelper.asString();}else{
txt=arg[x].htmlText ;};spr.add(txt, arg[x]);};spr.setGUIDialog(getSoloModeGUI());SpellCheck.CheckSpellingSolo(NG.specifyDomain(url), spr);} catch (e) {
alert(e.message);};};NG.SpellChecker.getSelection=function(editorName,body) {
var selectionRange=null;if (body.tagName != "TEXTAREA") {  // this code changed by mpb 5/19 and 5/20 - tested on lwmdev2
body=IBM_RTE_getDocument(editorName).body;selectionRange=IBM_RTE_getSelectionRange(editorName);if(isGecko() == false) {
if(selectionRange && selectionRange.text.length == 0){
selectionRange=document.selection.createRange();}}}else{
if(isGecko() == false){
selectionRange=document.selection.createRange() ;}};return selectionRange;};NG.SpellChecker.useSelection=function(selectionRange) {
var useSelection=false;if (isGecko()) {
if (selectionRange && !selectionRange.collapsed) {
useSelection=true;}} else {
if (selectionRange && selectionRange.text.length > 0) {
useSelection=true;}}return useSelection;};NG.Domino=function(launchNotesUrl, launchDwaUrl)
{
this.launchNotesUrl=launchNotesUrl;this.launchDwaUrl=launchDwaUrl;this.launchNotesMsg=NG.Resource.getString('messagelist.confirm.open.with.notes');this.launchDwaMsg=NG.Resource.getString('messagelist.confirm.open.with.dwa');this.launchNotesErrMsg=NG.Resource.getString('messagelist.confirm.open.with.notes.error');this.launchDwaErrMsg=NG.Resource.getString('messagelist.confirm.open.with.dwa.error');};NG.Domino.prototype={};NG.Domino.prototype.constructor=NG.Domino;NG.Domino.prototype.confirmLaunchMailNotes=function()
{
NG.Domino.thisTemp=this;var messageBox=new NG.messageBox();messageBox.confirm(this.launchNotesMsg, "",
this.confirmLaunchMailNotesCallback);return false;};NG.Domino.prototype.confirmLaunchMailNotesCallback=function(result)
{
if (result.confirmed)
{
if (NG.Domino.thisTemp == null)
NG.Domino.thisTemp=this;var thisTemp=NG.Domino.thisTemp;if (thisTemp.launchNotesUrl.length < 1)
alert(thisTemp.launchNotesErrMsg);else
location.href=thisTemp.launchNotesUrl;}};NG.Domino.prototype.confirmLaunchMailDwa=function()
{
NG.Domino.thisTemp=this;var messageBox=new NG.messageBox();messageBox.confirm(this.launchDwaMsg, "",
this.confirmLaunchMailDwaCallback);return false;};NG.Domino.prototype.confirmLaunchMailDwaCallback=function(result)
{
if (result.confirmed)
{
if (NG.Domino.thisTemp == null)
NG.Domino.thisTemp=this;var thisTemp=NG.Domino.thisTemp;if (thisTemp.launchDwaUrl.length < 1)
alert(thisTemp.launchDwaErrMsg);else
window.open(thisTemp.launchDwaUrl, "", "scrollbars=yes,resizable=yes");}};
var gUndefined="undefined";function isGecko() {
return (document.all ? false : true);};function eventGet(ev){return (ev? ev: window.event);};eventGetKeyCode=function(ev) {
if (!ev)
ev=window.event;if (ev.keyCode)
return ev.keyCode;if (ev.which)
return ev.which;return 0;};function eventGetTarget(ev) {
if(!ev)
ev=window.event;if(!ev)
return null;if(ev.srcElement)
return ev.srcElement;else if(ev.target)
{
var target=ev.target;try {
while(target && target.nodeName == '#text')
target=target.parentNode;return target;} catch(e) {
return null;};}};function eventGetSecondTarget(ev) {
var target=null;if(!ev) ev=window.event;if(!ev) return null;else if (document.elementFromPoint) {
target=document.elementFromPoint(ev.clientX, ev.clientY);}else if (ev.relatedTarget) {
target=ev.relatedTarget;}return target;};function eventCancel(ev) {
if(!ev)
ev=window.event;if(!ev) return false;eventPreventDefault(ev);if (typeof ev.cancelBubble != "undefined") ev.cancelBubble=true;if (ev.stopPropagation) ev.stopPropagation();return (false);};function eventPreventDefault(ev) {
if(!ev) ev=window.event;if(!ev) return;if(ev.preventDefault)
ev.preventDefault();else
ev.returnValue=false;};function eventLeftButtonId() {return (document.all ? 1 : 0);};function eventMiddleButtonId() {return (document.all ? 3 : 1);};function eventRightButtonId() {return (document.all ? 2 : 2);};function eventSetHandler(oTarget, sEvent, fnHandler, bCapture) {
if(isGecko())
{
oTarget.addEventListener(sEvent, fnHandler, bCapture ? true : false);}else
{
oTarget['on' + sEvent.toLowerCase()]=fnHandler;if(bCapture)  oTarget.setCapture();};};function eventRemoveHandler(oTarget, sEvent, fnHandler /* Gecko only */, bCapture) {
if(isGecko())
{
oTarget.removeEventListener(sEvent, fnHandler, bCapture ? true : false);}else
{
oTarget['on' + sEvent.toLowerCase()]=null;if(bCapture)
document.releaseCapture();};};if(isGecko())
{
Element.prototype.contains=Gecko_contains;HTMLElement.prototype.fireEvent=Gecko_fireEvent;HTMLElement.prototype.click=Gecko_click;HTMLCollection.prototype.item=Gecko_item;Array.prototype.item=Gecko_item;HTMLTableSectionElement.prototype.insertRowOrg=HTMLTableSectionElement.prototype.insertRow;HTMLTableSectionElement.prototype.insertRow=Gecko_insertRow;HTMLTableRowElement.prototype.insertCellOrg=HTMLTableRowElement.prototype.insertCell;HTMLTableRowElement.prototype.insertCell=Gecko_insertCell;}function Gecko_contains(obj)
{
while(obj)
{
if(this == obj)
return true;if(obj.parentNode)
if(obj == obj.parentNode)
return false;else
obj=obj.parentNode;else
return false;};return false;};function Gecko_fireEvent(sEvent, sKindOfEvent)
{
var oEvent=this.ownerDocument.createEvent(sKindOfEvent);oEvent.initEvent(sEvent, true, true);return this.dispatchEvent(oEvent);};function Gecko_click()
{
return this.fireEvent('click', 'MouseEvents');};function Gecko_item(s)
{
return this[s];};function Gecko_insertRow()
{
return this.insertRowOrg(this.rows.length);};function Gecko_insertCell()
{
return this.insertCellOrg(this.cells.length);};String.prototype.isPrefixOf=String_isPrefixOf;String.prototype.isSuffixOf=String_isSuffixOf;function String_isPrefixOf(sStr)
{
return sStr.indexOf(this) == 0;};function String_isSuffixOf(sStr)
{
return this.length < sStr.length ? sStr.lastIndexOf(this) == (sStr.length - this.length) : false;};function pageRedirect(sUrl)
{
window.document.open();window.document.write('<html><head></head><body></body></html>');window.document.close();window.location.href=sUrl;};function pageWrite(sHtml)
{
if(sHtml)
document.write(sHtml);};function pageIsDialog(oWin)
{
if(!oWin)
oWin=window;return isGecko() ? (typeof (oWin.dialogArguments) !== gUndefined) : !!oWin.dialogWidth;};function pageGetElementById(sID, doc)
{
if(!doc)
doc=document;if(doc.getElementById(sID))
return doc.getElementById(sID);var aObjs=pageGetElementsByName(sID, doc);if(aObjs && aObjs.length)
return aObjs[0];return null;};function pageGetElementsByName(sID, doc)
{
if(!doc)
doc=document;return doc.getElementsByName(sID);};function pageGetElementByAttribute(oCollection, sAttr, sValue) {
if (!oCollection) return;for (var i=0; i<oCollection.length; i++) {
var oEl=oCollection[i];if (!oEl) continue;if (oEl.getAttribute(sAttr) && sValue == oEl.getAttribute(sAttr))
return oEl;};return 0;};function pageGetAllElements(sTag){
if (sTag)
return document.getElementsByTagName(sTag);else
return (document.all? document.all : document.getElementsByTagName("*"));};function pageGetStyleSheet(sID) {
if(!sID)
return document.styleSheets[0];if (document.all) {
return document.styleSheets[sID];} else {
for (var i=0; i < document.styleSheets.length; i++) {
var oSS=document.styleSheets[i];if (oSS.title == sID) return oSS;};}};function pageCreateStyleSheet() {
if (document.all) {
return document.createStyleSheet();} else {
var oStyle=document.documentElement.firstChild.appendChild(document.createElement("style"));return oStyle.sheet;};};function cssAddRule(oSS, sSel, sDecl) {
if (document.all) {
oSS.addRule(sSel, sDecl);} else {
oSS.insertRule(sSel + "{" + sDecl + "}", oSS.cssRules.length);};};function cssRuleSetProperty(oRule, sPropName, sValue, iFlags) {
if (document.all) {
oRule.style.setAttribute(sPropName, sValue, iFlags);}else {
oRule.style.setProperty(sPropName, sValue, iFlags);};};function cssGetRules(oSS) {return (document.all ? oSS.rules : oSS.cssRules);};function cssHandCursor() {return (document.all ? "hand" : "pointer");};if (!document.all) {
var aCSSProp={"backgroundAttachment"	: "background-attachment",
"backgroundColor"		: "background-color",
"backgroundImage"		: "background-image",
"backgroundPosition"	: "background-position",
"backgroundRepeat"		: "background-repeat",
"borderBottom"			: "border-bottom",
"borderBottomColor"		: "border-bottom-color",
"borderBottomStyle"		: "border-bottom-style",
"borderBottomWidth"		: "border-bottom-width",
"borderCollapse"		: "border-collapse",
"borderColor"			: "border-color",
"borderLeft"			: "border-left",
"borderLeftColor"		: "border-left-color",
"borderLeftStyle"		: "border-left-style",
"borderLeftWidth"		: "border-left-width",
"borderRight"			: "border-right",
"borderRightColor"		: "border-right-color",
"borderRightStyle"		: "border-right-style",
"borderRightWidth"		: "border-right-width",
"borderSpacing"			: "border-spacing",
"borderStyle"			: "border-style",
"borderTop"				: "border-top",
"borderTopColor"		: "border-top-color",
"borderTopStyle"		: "border-top-style",
"borderTopWidth"		: "border-top-width",
"borderWidth"			: "border-width",
"fontFamily"			: "font-family",
"fontSize"				: "font-size",
"fontStyle"				: "font-style",
"fontWeight"			: "font-weight",
"lineHeight"			: "line-height",
"textAlign"				: "text-align",
"textDecoration"		: "text-decoration",
"unicodeBidi"			: "unicode-bidi",
"zIndex"				: "z-index"};}function elGetCurrentStyle(el, sProp, bByInteger, bPreferOffset) {
var oValue=null;if (el.currentStyle) {
oValue=el.currentStyle[sProp];} else {
var oStyle=document.defaultView.getComputedStyle(el,null);oValue=oStyle.getPropertyValue(aCSSProp[sProp] ? aCSSProp[sProp] : sProp);}switch(sProp)
{
case 'width':
if(oValue == 'auto' || oValue.indexOf('%') != -1 || (!h_ClientBrowser.isGecko() && bPreferOffset))
return el.offsetWidth;case 'height':
if(oValue == 'auto' || oValue.indexOf('%') != -1 || (!h_ClientBrowser.isGecko() && bPreferOffset))
return el.offsetHeight;};if(bByInteger)
{
oValue=parseInt(oValue);if(isNaN(oValue))
oValue=0;}return oValue;};function elSetRuntimeStyle(el, sProp, sValue) {
if (!el)
return;if (document.all) {
el.runtimeStyle[sProp]=sValue;} else {
el.asOldVal=(el.asOldVal)? el.asOldVal: [];if(sValue == "") {
if(el.asOldVal[sProp]!==gUndefined) {
el.style[sProp]=el.asOldVal[sProp];delete el.asOldVal[sProp];}} else {
if(el.asOldVal[sProp]===gUndefined) {
el.asOldVal[sProp]=el.style[sProp];}el.style[sProp]=sValue;}}};function elGetOwnerDoc(el) { return (document.all ? el.document : el.ownerDocument); };function elSetInnerText(el, sText)
{
if (document.all) {
el.innerText=sText;} else {
while (el.childNodes.length > 0) {
el.removeChild(el.firstChild);};oText=el.appendChild(elGetOwnerDoc(el).createTextNode(sText));}};function elGetInnerText(el) {
if (document.all) {
return el.innerText;} else {
var r=document.createRange();r.selectNode(el);return r.toString();}};function selectAddOption(oSel, oOpt) {
if (document.all)
oSel.options.add(oOpt);else
oSel.add(oOpt, null);};function selectRemoveOption(oSel, index) {
if (document.all)
oSel.options.remove(index);else
oSel.remove(index);};function getRange(el)
{
var range=null;if (document.all) {
range=el.createTextRange();} else {
range= document.createRange();range.selectNodeContents(el);};return range;};function xmlGetRequest() {
var oXml=null;if (typeof ActiveXObject != "undefined") {
oXml=new ActiveXObject("Microsoft.XMLHTTP");}else oXml=new XMLHttpRequest();return oXml;};function xmlLoad(sUrl) {
if (typeof ActiveXObject != "undefined")
return xmlLoad_IE(sUrl);else
return xmlLoad_Gecko(sUrl);};function xmlLoad_IE(sUrl) {
var oXmlDoc=new ActiveXObject("MSXML2.DOMDocument");oXmlDoc.async=false;oXmlDoc.resolveExternals=false;if(!oXmlDoc.load(sUrl))
{
throw new Error("Error loading xml file " + sUrl);}return oXmlDoc;};function xmlLoad_Gecko(sUrl) {
var oXmlResponse=NG.ServerRequest.postRequest(sUrl);if (oXmlResponse) return xmlLoadString(oXmlResponse.responseText);else return null;};function xslLoad(sUrl) {
if (typeof ActiveXObject != "undefined")
return xslLoad_IE(sUrl);else
return xslLoad_Gecko(sUrl);};function xslLoad_IE(sUrl) {
var oXslDoc=new ActiveXObject("MSXML2.FreeThreadedDOMDocument");oXslDoc.async=false;oXslDoc.resolveExternals=false;if(!oXslDoc.load(sUrl))
{
throw new Error("Error loading xsl file " + sUrl);}return oXslDoc;};function xslLoad_Gecko(sUrl)  {
var oDomDoc=document.implementation.createDocument('','',null);oDomDoc.async=false;oDomDoc.load(sUrl);return oDomDoc;};function xmlLoadString(sXml) {
if (typeof ActiveXObject != "undefined")
return xmlLoadString_IE(sXml);else
return xmlLoadString_Gecko(sXml);};function xmlLoadString_Gecko(sXml)  {
var parser=new DOMParser();try { oXmlDoc=parser.parseFromString(sXml, "text/xml"); }catch (exc) {
throw new Error("Error loading xml string " + sXml);};return oXmlDoc;};function xmlLoadString_IE(sXml) {
var oXmlDoc=new ActiveXObject("MSXML2.DOMDocument");oXmlDoc.async=false;oXmlDoc.resolveExternals=false;if(!oXmlDoc.loadXML(sXml))
{
throw new Error("Error loading xml string " + sXml);}return oXmlDoc;};function xmlTransformString(xmlStr, xsl, sXslMode, aXslParams) {
oXmlDoc=xmlLoadString(xmlStr);return xmlTransformDoc(oXmlDoc, xsl, sXslMode, aXslParams);};function xmlTransform(xml, xsl, sXslMode, aXslParams) {
oXmlDoc=xmlLoad(xml);return xmlTransformDoc(oXmlDoc, xsl, sXslMode, aXslParams);};function xmlTransformDoc (xmlDoc, xsl, sXslMode, aXslParams) {
if (typeof ActiveXObject != "undefined") {
return xmlTransformDoc_IE(xmlDoc, xsl, sXslMode, aXslParams);}else
return xmlTransformDoc_Gecko(xmlDoc, xsl, sXslMode, aXslParams);};function xmlTransformDoc_Gecko (xmlDoc, xsl, sXslMode, aXslParams) {
try {
var xslDoc=xsl;if(!xslDoc.documentElement) xslDoc=xslLoad(xsl);var proc=new XSLTProcessor();proc.importStylesheet(xslDoc);if(aXslParams) {
for(var p in aXslParams)  {
proc.setParameter(null, p, aXslParams[p]);};}if (sXslMode) proc.setParameter(null, "mode", sXslMode);var serializer=new XMLSerializer();var resultDoc=proc.transformToDocument(xmlDoc);resultStr=serializer.serializeToString(resultDoc);}catch (exc)
{
throw new Error("Error transforming xml doc " + xmlDoc);};return resultStr;};function xmlTransformDoc_IE(xmlDoc, xsl, sXslMode, aXslParams) {
var oXml=xmlDoc;var oXsl=xsl;try {
if(!oXsl.documentElement) oXsl=xslLoad(xsl);}catch(e) {
var sMsg=e.message;throw new Error(""+sMsg, ""+sMsg);};var oXslt=new ActiveXObject("Msxml2.XSLTemplate");oXslt.stylesheet=oXsl;var oXslProc=oXslt.createProcessor();oXslProc.input=oXml;if(aXslParams) {
for(var p in aXslParams) {
oXslProc.addParameter(p, aXslParams[p]);};}if (sXslMode) oXslProc.addParameter("mode", sXslMode);if(!oXslProc.transform()) {
throw new Error("Error transforming xml doc " + oXml);}var output=oXslProc.output;return output;};
NG.messageBox=function(title, dir) {
this.title=title;if (typeof dir != 'undefined') {
this.dir=dir;} else {
this.dir=document.body.dir;}};NG.messageBox.prototype.callback=function(result) {
if (result) {
if (result.context.cbfn) {
if (result.context.objref) {
result.context.cbfn.apply(result.context.objref, [result]);} else {
result.context.cbfn(result);};}}};NG.messageBox.prototype.display=function(args, message, checkText, callback, objref, width) {
args.message=message;args.checkText=checkText;args.context={"objref":  objref, "cbfn": callback };args.dir=this.dir;if (!args.title) {
args.title=document.title;}window.modalCallback=this.callback;window.modalFocusHandler=this.resetFocus;if (!width) {
width=400;}var styleSheets=document.styleSheets;for (var i=0; i < styleSheets.length; i++) {
var href=styleSheets[i].href;var name=href.substr(href.lastIndexOf('/')+1);if (name == "Styles.css") {
args.context.styleSheet=href;break;}};args.height=100;if (document.all) {
var flags="dialogWidth:" + width + "px;dialogHeight:" + args.height + "px;resizable:no;status:no;scroll:no;help:no";result=showModalDialog(NG.messageBoxUrl, args, flags);} else {
var flags="width="+width+",height="+args.height+",resizable=no,status=no,scrollbars=no,dialog=yes,modal=yes";oGeckoDlgArg=args;oGeckoDlgRet=null;window.modalWin=window.open(NG.messageBoxUrl, "", flags);window.addEventListener("focus", this.resetFocus, false);window.addEventListener("click", this.resetFocus, false);window.addEventListener("change", this.resetFocus, false);result=oGeckoDlgRet;};if (result) window.modalCallback(result);};NG.messageBox.prototype.confirm=function(message, checkText, callback, objref, width) {
var args={
"okText": NG.Resource.getString("messagebox.ok"),
"cancelText": NG.Resource.getString("messagebox.cancel"),
"image":  NG.messageBoxQuestionGif,
"title": (this.title) ? this.title : NG.Resource.getString("messagebox.confirmation")
};this.display(args, message, checkText, callback, objref);};NG.messageBox.prototype.alert=function(message, checkText, callback, objref, width) {
var args={
"okText":  NG.Resource.getString("messagebox.ok"),
"image":  NG.messageBoxExclamationGif,
"title":  (this.title) ? this.title : NG.Resource.getString("messagebox.alert")
};this.display(args, message, checkText, callback, objref);};NG.messageBox.prototype.resetFocus=function(event) {
window.modalWin.focus();};
if(!window.encodeURIComponent){
window.encodeURIBody=function (str, asciiUnEnc){
var resultStr="", i, codePointSave, surrogate=false, vals=[0,0,0,0];for (i=0; i < str.length; i++) {
var codePoint=str.charCodeAt(i), nVals=0;if (surrogate && codePoint >= 0xDC00 && codePoint <= 0xDFFF) {
vals[0]=((((codePointSave & 0x03C0) >> 6) + 1) >> 2) | 0xF0;vals[1]=(((((codePointSave & 0x03C0) >> 6) + 1) & 0x03) << 4) | ((codePointSave & 0x003C) >> 2) | 0x80;vals[2]=((codePointSave & 0x0003) << 4) | ((codePoint & 0x03C0) >> 6) | 0x80;vals[3]=(codePoint & 0x003F) | 0x80;nVals=4;surrogate=false;}else if (codePoint >= 0xD800 && codePoint <= 0xDBFF) {
surrogate=true;codePointSave=codePoint;continue;}else {
surrogate=false;if (codePoint > 0x07FF) {
vals[0]=((codePoint & 0xF000) >> 12) | 0xE0;vals[1]=(codePoint & 0xFC0) >> 6 | 0x80;vals[2]=(codePoint & 0x3F) | 0x80;nVals=3;}else if (codePoint > 0x007F) {
vals[0]=((codePoint & 0x7C0) >> 6) | 0xC0;vals[1]=(codePoint & 0x3F) | 0x80;nVals=2;}else if (asciiUnEnc.indexOf(str.charAt(i)) < 0) {
vals[0]=codePoint;nVals=1;}}if (nVals > 0) {
var j;for (j=0; j < nVals; j++) {
var hexStr=vals[j].toString(16).toUpperCase();if (hexStr.length == 1) {
hexStr="0" + hexStr;}resultStr+="%" + hexStr;};}else {
resultStr+=str.charAt(i);}};return resultStr;};window.decodeURIBody=function(str, reservedSet)
{
var Result1=str.length, R="";for (var k=0; k != Result1; ++k, R+=S){
var C=str.charAt(k);if (C != "%"){ // goto STEP_40;
S=C;continue;}if (k + 2 == Result1) {S=C;continue;}var B=parseInt(str.substr(k + 1, 2), 16);if (isNaN(B)) {S=C;continue;}var start=k;k+=2;if ((B & 0x80) == 0) {
C=String.fromCharCode(B);S=reservedSet.indexOf(C) >= 0 ? str.substring(start, k+1) : C;continue;}var n=((B << 2) & 0x80) == 0 ? 2
: ((B << 3) & 0x80) == 0 ? 3
: ((B << 4) & 0x80) == 0 ? 4
: 1;if (n == 1 || k + (3*(n-1)) >= Result1
|| (B >> (8 - n)) != (0xf0 >> (8 - n))) {S=C;k=start;continue;}var Octets=new Array(n);Octets[0]=B;for (var j=1; j != n; ++j){
++k;if (str.charAt(k) != "%") {S=C;k=start;Octets=null;break;} // URIError
B=parseInt(str.substr(k + 1, 2), 16);if (isNaN(B)) {B=0x10;}if (B >> 6 != 0x2) {}k+=2;Octets[j]=B;};if (!Octets) continue;var H=0, L=0;switch(n)
{
case 2:
var yyyyy=Octets[0] & 0x1f;var yyy=yyyyy >> 2;var yy=yyyyy & 3;var zzzzzz=Octets[1] & 0x3f;H=(0x100 * yyy) | (yy << 6) | zzzzzz;break;case 3:
var xxxx=Octets[0] & 0x0f;var yyyyyy=Octets[1] & 0x3f;var yyyy=yyyyyy >> 2;var yy=yyyyyy & 3;var zzzzzz=Octets[2] & 0x3f;H=(0x100 * ((xxxx << 4) | yyyy)) | (yy << 6) | zzzzzz;break;case 4:
var uuu=Octets[0] & 0x07;var uu=(Octets[1] & 0x30) >> 4;var uuuuu=(uuu << 2) | uu;var vvvv=uuuuu - 1;if (vvvv < 0 || vvvv > 0x0f) vvvv=0;var vv1=vvvv >> 2;var vv2=vvvv & 3;var wwww=Octets[1] & 0x0f;var xx=(Octets[2] & 0x30) >> 4;var yyyy=Octets[2] & 0x0f;var yy1=yyyy >> 2;var yy2=yyyy & 3;var zzzzzz=Octets[3] & 0x3f;H=(0x100 * (0xd8 | vv1)) | (vv2 << 6) | (wwww << 2) | xx;L=(0x100 * (0xdc | yy1)) | (yy2 << 6) | zzzzzz;break;};if (L != 0)
{
S=String.fromCharCode(H, L);} else {
C=String.fromCharCode(H);S=reservedSet.indexOf(C) >= 0 ? str.substring(start, k+1) : C;};};return R;};window.encodeURIComponent=function (str){
var asciiUnEnc="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.!~*'()";return encodeURIBody(str, asciiUnEnc);};window.encodeURI=function (str){
var asciiUnEnc="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.!~*'();/?:@&=+$,#";return encodeURIBody(str, asciiUnEnc);};window.decodeURIComponent=function (str){
var asciiUnDec="";return decodeURIBody(str, asciiUnDec);};window.decodeURI=function (str){
var asciiUnDec=";/?:@&=+$,#";return decodeURIBody(str, asciiUnDec);};}function toUTF8(s)
{
return encodeURIComponent(s);};function toValidURIString(s)
{
return encodeURIComponent(s).replace(/%2c/gi, "%252c");};function EscapePresetFieldsValue(sUrl,sField)
{
var nPos1, nPos2, sTail, sValue, sItem=sField + ";";nPos1=sUrl.indexOf(sItem);if (nPos1 == -1)
return sUrl;nPos2=sUrl.indexOf(",", nPos1);if (nPos2 == -1)
nPos2=sUrl.indexOf("&", nPos1);if (nPos2 == -1)
nPos2=sUrl.indexOf("?", nPos1);if (nPos2 == -1)
nPos2=sUrl.length;sValue=sUrl.substring(nPos1+ sItem.length, nPos2);return sUrl.substring(0, nPos1+ sItem.length) + toValidURIString(sValue) + sUrl.substring(nPos2, sUrl.length);};
