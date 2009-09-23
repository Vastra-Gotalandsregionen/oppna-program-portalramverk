/* (C) Copyright IBM Corp. 2006  All Rights Reserved                 */
var I=document.images;
function W(s){document.write(s)}
function WL(s){document.writeln(s)}
function base64()
{this.base64Alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";}
base64.prototype.decodeBase64= function(base64Text)
{var decodedStr=""; 
var char1, char2, char3=""; 
var encChar1, encChar2, encChar3, encChar4=""; 
var i= 0; 
 
var base64test= /[^A-Za-z0-9\+\/\=]/g; 
if(base64test.exec(base64Text)) 
{ 
alert("all characters in string to be decoded are not in base64 format");}
base64Text= base64Text.replace(/[^A-Za-z0-9\+\/\=]/g,""); 
do{ 
 
encChar1= this.base64Alphabet.indexOf(base64Text.charAt(i++));encChar2= this.base64Alphabet.indexOf(base64Text.charAt(i++));encChar3= this.base64Alphabet.indexOf(base64Text.charAt(i++));encChar4= this.base64Alphabet.indexOf(base64Text.charAt(i++)); 
char1=(encChar1<< 2)|(encChar2>> 4);char2=((encChar2& 15)<< 4)|(encChar3>> 2);char3=((encChar3& 3)<< 6)| encChar4;decodedStr= decodedStr+ String.fromCharCode(char1);if(encChar3!= 64) 
{decodedStr= decodedStr+ String.fromCharCode(char2);}
if(encChar4!= 64) 
{decodedStr= decodedStr+ String.fromCharCode(char3);}
char1= char2= char3="";encChar1= encChar2= encChar3= enc4Char=""; 
} while(i< base64Text.length); 
 
return decodedStr;}
 
 
base64.prototype.encodeBase64= function(text)
{var encodedStr=""; 
var char1, char2, char3=""; 
 
var encChar1, encChar2, encChar3, encChar4=""; 
 
var i= 0; 
 
do 
{ 
char1= text.charCodeAt(i++); 
char2= text.charCodeAt(i++); 
char3= text.charCodeAt(i++); 
encChar1= char1>> 2;encChar2=((char1& 3)<< 4)|(char2>> 4);encChar3=((char2& 15)<< 2)|(char3>> 6);encChar4= char3& 63;if(isNaN(char2)){encChar3= encChar4= 64;} else if(isNaN(char3)){encChar4= 64;}
 
encodedStr= encodedStr+ this.base64Alphabet.charAt(encChar1)+ this.base64Alphabet.charAt(encChar2)+ this.base64Alphabet.charAt(encChar3)+ this.base64Alphabet.charAt(encChar4); 
char1= char2= char3="";encChar1= encChar2= encChar3= encChar4=""; 
} while(i< text.length); 
 
return encodedStr;}
function MaskConverter(mask){this.mask= mask;this.allPattern= /[a-zA-Z0-9]/;this.alphaPattern= /[a-zA-Z]/;this.numPattern= /[0-9]/;this.valueToString= function(dataString)
{if(this.mask=='undefined'|| this.mask== null|| this.mask==""){return dataString;}
else if(!dataString){return"";}
var rawString= new String(dataString);var formattedString= new String("");var j= 0;for(var i=0; i<this.mask.length; i++){var maskChar= this.mask.charAt(i);if(maskChar=="#"){if(this.numPattern.test(rawString.charAt(j))){formattedString+= rawString.charAt(j);j++;}
else{this.throwException();}
}
else if(maskChar=="?"){if(this.alphaPattern.test(rawString.charAt(j))){formattedString+= rawString.charAt(j);j++;}
else{this.throwException();}
}
else if(this.alphaPattern.test(maskChar)|| this.numPattern.test(maskChar)){if(rawString.charAt(j)== maskChar){formattedString+= maskChar;j++;}
else{this.throwException();}
}
else{formattedString+= maskChar;}
}
return formattedString;}
this.stringToValue= function(formattedString)
{if(!formattedString){return null;}
if(this.mask.length!= formattedString.length){var Msg= NlsFormatMsg(mask_not_matched);throw new EObjectError(Msg);}
else{var rawString= new String("");for(var i=0; i<formattedString.length; i++){if(this.allPattern.test(formattedString.charAt(i))){rawString+= formattedString.charAt(i);}
}
return rawString;}
}
this.throwException= function(){var Msg= NlsFormatMsg(mask_not_matched);throw new EObjectError(Msg);}
}
function detectBrowser()
{var browser= null;var version= null;var userAgent= navigator.userAgent;var appVersion= navigator.appVersion;if(navigator.appName=='Microsoft Internet Explorer'){var tempArr= userAgent.split("MSIE");version= parseFloat(tempArr[1]);browser="MSIE "+ version;if(version<5.5){var args= new Array;args[0]= browser;alert(NlsFormatMsg(browser_not_support, args));return;}
}else{var tempArr= userAgent.split("Mozilla/");var version= parseFloat(tempArr[1]);if(version<5.0){if(userAgent.indexOf("rv:")>-1){var tempArr= userAgent.split("rv:");version= parseFloat(tempArr[1]);browser="Mozilla "+ version;}else{browser="Netscape "+ parseFloat(appVersion);}
var args= new Array;args[0]= browser;alert(NlsFormatMsg(browser_not_support, args));return;}else{var index= userAgent.indexOf("Netscape");if(index>0){var tempArr= userAgent.split("Netscape/");version= parseFloat(tempArr[1]);browser="Netscape "+ version;}else{var tempArr= userAgent.split("rv:");version= parseFloat(tempArr[1]);browser="Mozilla "+ version
if(version<1.0){var args= new Array;args[0]= browser;alert(NlsFormatMsg(browser_not_support, args));return;}
}
}
}
return browser;}
function isIE(){if(navigator.appName=='Microsoft Internet Explorer'){return true;}else{return false;}
}
function SelectAndActivateEventHandler(event, adapterArray, referenceName)
{var eobj= event.eobject;var propertyname= event.propertyName;try
{if(null!= eobj)
{if(referenceName)
{var eobj1= eobj;eobj1= getEobjectFromFeatureName(eobj, referenceName);for(var i=0; i<adapterArray.length; i++)
{adapterArray[i].activateDataSet(eobj1);adapterArray[i].refresh();}
}else{for(var i= 0; i< adapterArray.length;++i)
{var adapterArri= adapterArray[i];if(adapterArri.length!=null){var eobj1= eobj;eobj1= getEobjectFromFeatureName(eobj, adapterArri[1]);adapterArri[0].activateDataSet(eobj1);adapterArri[0].refresh();}else{adapterArri.activateDataSet(eobj);adapterArri.refresh();}
}
}
return true;}
}
catch(e)
{return false;}
}
function getEobjectFromFeatureName(eobj,featureName)
{if(featureName.indexOf(".")!=-1){var srcFeatureArray= featureName.split(".");if(srcFeatureArray!=null)
{for(var j=0; j<srcFeatureArray.length-1; j++)
{eobj= getEobjectInternal(eobj, srcFeatureArray[j]);}
}
}else{eobj= getEobjectInternal(eobj, featureName);}
return eobj;}
function getEobjectInternal(eobj, featureName)
{var tempIndex= featureName.indexOf("[");if(tempIndex!=-1)
{var tempFeatureName= featureName.substring(0,tempIndex);var index= featureName.substring(tempIndex+1, featureName.length-1);var returnObjArr= eobj.eGet(tempFeatureName);if(returnObjArr)
eobj= returnObjArr[Number(index)];else
eobj= null;}else{eobj= eobj.eGet(featureName);}
return eobj;}
function SelectAndSetEventHandler(event, ControlMetaDataArray)
{var eobj= event.eobject;var propertyname= event.propertyName;var model= event.model;try
{if(null!= eobj)
{for(var i= 0; i< ControlMetaDataArray.length;++i)
{var eobj1= eobj;var controlMDArri= ControlMetaDataArray[i];if(controlMDArri[0]!=null&&controlMDArri[0].indexOf(".")>-1){eobj1= getEobjectFromFeatureName(eobj, controlMDArri[0]);var srcFeatureArray= controlMDArri[0].split(".");controlMDArri[0]= srcFeatureArray[srcFeatureArray.length-1];}else if(controlMDArri[0]!=null&&controlMDArri[0].indexOf("[")>-1){eobj1= getEobjectFromFeatureName(eobj, controlMDArri[0]);var tempIndex= controlMDArri[0].indexOf("[");controlMDArri[0]= controlMDArri[0].substring(0,tempIndex);}
var targetObj=(typeof(controlMDArri[1])!="object")?findEObjectByXMIID(model, controlMDArri[1]):controlMDArri[1];if(controlMDArri[0]==null&&controlMDArri[2]==null)
{if(eobj1.EClass.Name== targetObj.EClass.Name)
{for(var k= 0; k< eobj1.Members.length;++k){if(eobj1.Members[k].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE){targetObj.eSet(eobj1.Members[k].Name,eobj1.eGet(eobj1.Members[k].Name));}
}
}
}else if(controlMDArri[0]== null&&controlMDArri[2]!=null)
{var targetEference= targetObj.eGet(controlMDArri[2]);if(targetEference!=null&& targetEference.EClass.Name== eobj1.EClass.Name)
{for(var k= 0; k< eobj1.Members.length;++k){if(eobj1.Members[k].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE){targetEference.eSet(eobj1.Members[k].Name,eobj1.eGet(eobj1.Members[k].Name));}
}
}
}else if(controlMDArri[0]!= null&&controlMDArri[2]==null)
{var sourceObj= eobj1.eGet(controlMDArri[0]);if(sourceObj.length==null)
{for(var k= 0; k< sourceObj.Members.length;++k){if(sourceObj.Members[k].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE){targetObj.eSet(sourceObj.Members[k].Name,sourceObj.eGet(sourceObj.Members[k].Name));}
}
}else{return;}
}else if(controlMDArri[0]!= null&&controlMDArri[2]!=null)
{var targetEference= targetObj.eGet(controlMDArri[2]);for(var j= 0; j< eobj1.Members.length;++j)
{if(eobj1.Members[j].Name== controlMDArri[0]){if(eobj1.Members[j].EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{var returnObjs= eobj1.eGet(controlMDArri[0]);if(returnObjs.length==null){if(returnObjs.EClass.Name== targetEference.EClass.Name){for(var k= 0; k< returnObjs.Members.length;++k){if(returnObjs.Members[k].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE){targetEference.eSet(returnObjs.Members[k].Name,returnObjs.eGet(returnObjs.Members[k].Name));}
}
}
}else{return;}
}else
{targetObj.eSet(controlMDArri[2],eobj1.eGet(controlMDArri[0]));}
break;}
}
}
}
}
return true;} catch(e)
{return false;}
}
function FormSubmitHandler(formId)
{this._formId= formId;this.handle= function()
{ODCPageControl.saveAllToForm(this._formId, null);var Form= null;if(this._formId!= null)
{Form= document.getElementById(this._formId);if(Form== null)
{var args= new Array;args[0]= this._formId;var Msg= NlsFormatMsg(form_name_notfound, args);throw new EObjectError(Msg);}
}
else
{var args= new Array;args[0]="FormSubmitHandler.handle()";var Msg= NlsFormatMsg(formId_notexist, args);throw new EObjectError(Msg);}
Form.submit();return true;}
}
function Select(clientId, model, mapArray, targetEObjectID, targetEReference){this.clientId= clientId;this.model= model;this.mapArray= mapArray;this.targetEObjectID= targetEObjectID;this.targetEObject= findEObjectByXMIID(this.model, this.targetEObjectID);this.targetEReference= targetEReference;this.value= null;this.eventHandler= null;this.element= document.getElementById(this.clientId);if(this.element){if(this.element.tagName.toLowerCase()=="select"){this.type= Select.SELECT;if(this.element.attachEvent){this.element.attachEvent("onchange", this.handleSelect);}
else{this.element.addEventListener("change", this.handleSelect, false);}
this.element.selectControl= this;}
else{this.controlsArray= this.findControlsArray(this.clientId);if(this.controlsArray&& this.controlsArray.length> 0){if(this.controlsArray[0].type=="radio"){this.type= Select.RADIO;this.addEventListener(this.handleRadio);}
else if(this.controlsArray[0].type=="checkbox"){this.type= Select.CHECKBOX;this.addEventListener(this.handleCheckbox);}
}
}
}
}
Select.SELECT="select";Select.CHECKBOX="checkbox";Select.RADIO="radio";Select.EVENT="onchange";Select.prototype.fireEvent= function(eventName){if(eventName&& eventName.toLowerCase()== Select.EVENT){this.onchange();}
}
Select.prototype.attachEvent= function(eventName, eventHandler){if(eventName&& eventName.toLowerCase()== Select.EVENT&& eventHandler){this.eventHandler= eventHandler;this.event= new Object();this.event.srcElement= this;}
}
Select.prototype.onchange= function(){if(this.type== Select.SELECT){if(this.value){var valueArray= new Array();if(typeof(value)=="string"){valueArray.unshift(this.value);}
else{valueArray= this.value;}
var options= this.element.options;for(var i=0; i<options.length; i++){var selected= false;for(var j=0; j<valueArray.length; j++){if(options[i].value== valueArray[j]){options[i].selected= true;selected= true;}
}
if(!selected){options[i].selected= false;}
}
}
}
else if(this.type== Select.CHECKBOX|| this.type== Select.RADIO){if(this.value&& this.controlsArray){var selectedArray= new Array();if(typeof(value)=="string"){selectedArray.unshift(value);}
else{selectedArray= this.value;}
for(var i=0; i<this.controlsArray.length; i++){var selected= false;for(var j=0; j<selectedArray.length; j++){if(this.controlsArray[i].value== selectedArray[j]){this.controlsArray[i].checked= true;selected= true;}
}
if(!selected){this.controlsArray[i].checked= false;}
}
}
}
}
Select.prototype.findControlsArray= function(groupName){var nodeArray= document.getElementsByTagName('input');var controlArray= new Array();for(var i= 0; i< nodeArray.length; i++){if(nodeArray[i].getAttribute('name')== groupName){controlArray.push(nodeArray[i]);}
}
return controlArray;}
Select.prototype.handleSelect= function(){var element= this.event.srcElement? this.event.srcElement: this.event.target;if(element.multiple){var optionsArray= element.options;var selectedIndices= new Array();for(var i=0; i<optionsArray.length; i++){var option= optionsArray[i];if(option.selected){selectedIndices.push(i);}
}
var objectArray= new Array();for(var k=0; k< selectedIndices.length; k++){var indexObject= findEObjectByXMIID(element.selectControl.model, element.selectControl.mapArray[selectedIndices[k]]);objectArray.push(indexObject.eGet("value"));}
element.selectControl.targetEObject.eSet(element.selectControl.targetEReference, objectArray);}
else{var sourceObject= findEObjectByXMIID(element.selectControl.model, element.selectControl.mapArray[element.selectedIndex]);element.selectControl.targetEObject.eSet(element.selectControl.targetEReference, sourceObject.eGet("value"));}
}
Select.prototype.handleRadio= function(){var control= this.event.srcElement? this.event.srcElement.selectControl: this.event.target.selectControl;var targetIndex= -1;for(var i= 0; i< control.controlsArray.length; i++)
{if(control.controlsArray[i].checked){targetIndex= i;}
}
var sourceObject= findEObjectByXMIID(control.model, control.mapArray[targetIndex]);if(targetIndex== -1)
control.targetEObject.eSet(control.targetEReference, control.targetEObject.eGet("value"));else
control.targetEObject.eSet(control.targetEReference, sourceObject.eGet("value"));}
Select.prototype.handleCheckbox= function(){var control= this.event.srcElement? this.event.srcElement.selectControl: this.event.target.selectControl;var objectArray= new Array();for(var i= 0; i< control.controlsArray.length; i++){var checkboxControl= control.controlsArray[i];if(checkboxControl.checked){var indexObject= findEObjectByXMIID(control.model, control.mapArray[i]);objectArray.push(indexObject.eGet("value"));}
}
control.targetEObject.eSet(control.targetEReference, objectArray);}
Select.prototype.addEventListener= function(func){if(this.controlsArray&& this.controlsArray.length> 0){for(var i=0; i<this.controlsArray.length; i++){if(this.controlsArray[0].attachEvent){this.controlsArray[i].attachEvent("onclick", func);}
else{this.controlsArray[i].addEventListener("click", func, false);}
this.controlsArray[i].selectControl= this;}
}
}
var GlobalID= 0;var G_ModelLoader= null;function getScrollbarWidth(parent)
{var width= 0;var textDiv= document.createElement("div");var textBox= document.createElement("textarea");parent.appendChild(textDiv);textDiv.appendChild(textBox); 
textBox.style.width="75px";textDiv.style.width="75px";textDiv.style.overflow="scroll";width -= textDiv.clientWidth;textDiv.style.overflow="auto";width+= textDiv.clientWidth;parent.removeChild(textDiv);return width;}
function NewID()
{return"genid_"+ ++GlobalID;}
function isBoolean(obj)
{if(typeof obj=='boolean')
{return true;}
return false;}
function CompareXMIId(anEobject, aXMIId)
{if(anEobject.ID== aXMIId)
{return true;}
return false;}
function findEObjectByXMIID(eobject, xmiID)
{var objects= new Array();if(eobject.isXML2EMF)
{var targetObj= eobject;}
else{var targetObj= traverseGraph(eobject, xmiID, objects, CompareXMIId);}
return targetObj;}
function CompareAtrNameValue(anEobject, value, name)
{if(anEobject.eGet(name)== value)
{return true;}
return false;}
function findEObjectByAtrName(eobject, atrName, atrValue)
{var objects= new Array();var targetObj= traverseGraph(eobject, atrValue, objects, CompareAtrNameValue, atrName);return targetObj;}
function CompareSignature(anEobject, aSignature)
{var res=(anEobject.getSignature()== aSignature);return res;}
function findEObjectBySignature(eobject, aSignature)
{var objects= new Array();var targetObj= traverseGraph(eobject, aSignature, objects, CompareSignature);return targetObj;}
function findEObjectByVBL(vblExpression, modelName)
{var targetObj= null;var xmlHandler= null;var index= vblExpression.indexOf("#{");if(index!= -1)
{vblExpression= vblExpression.substring(2);}
var rightBraceIndex= vblExpression.indexOf("}");if(rightBraceIndex!= -1)
{vblExpression= vblExpression.substring(0, rightBraceIndex)
}
var modelNames= ODCRegistry.getModelNames();if(modelName!= null&& modelName!="")
{xmlHandler= ODCRegistry.Models[modelName];for(var key in modelNames){var modName= modelNames[key];if(modName== modelName){vblExpression= vblExpression.substring(key.length, vblExpression.length);}
break;}
}
else
{var index= -1;var matchedKey= null;for(var key in modelNames){var tempIndex= -1;if(vblExpression.indexOf(key)== 0){tempIndex= key.length-1;}
if(tempIndex> index){index= tempIndex;matchedKey= key;}
}
var modelNameFromVBL= modelNames[matchedKey];vblExpression= vblExpression.substring(index+1, vblExpression.length);xmlHandler= ODCRegistry.Models[modelNameFromVBL];}
var root= xmlHandler.Root;var rootRefName= xmlHandler.RootMemberName;vblExpression= rootRefName+ vblExpression;var eobj= root;var refArray= vblExpression.split(".");if(refArray!=null)
{for(var j=0; j<refArray.length; j++)
{var refName= refArray[j];var tempIndex= refName.indexOf("[");if(tempIndex!=-1)
{refName= refName.substring(0,tempIndex);var index= refArray[j].substring(tempIndex+1, refArray[j].length-1);var returnObjArr= eobj.eGet(refName);eobj= returnObjArr[Number(index)];}
else
{var tempObj= eobj.eGet(refName);if(j==0)
{eobj= tempObj[0];}
else
{eobj= tempObj;}
}
}
}
targetObj= eobj;return targetObj;}
function traverseGraph(eobject, criteria, objects, visitor, atrname)
{var targetObj= null;if(
null== eobject
||"object"!= typeof(eobject)
)
{return null;}
if(visitor(eobject, criteria,atrname))
{targetObj= eobject;return targetObj;}
for(var i= 0; i< objects.length;++i)
{if(eobject== objects[i])
{return targetObj;}
}
objects[objects.length]= eobject;for(var i= 0; i< eobject.Members.length;++i)
{if( eobject.Members[i].EStructuralFeature.CLASSTYPE&(EStructuralFeature.CLASSTYPE_EATTRIBUTE| EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)!= 0)
{continue;}
var name= eobject.Members[i].Name;var value= eobject.eGet(name);if(null== value)
{continue;}
if("object"== typeof(value))
{if(value.length!= null&&"number"== typeof(value.length))
{for(var j= 0; j< value.length;++j)
{if("object"== typeof(value[j])&& visitor(value[j], criteria,atrname))
{targetObj= value[j];return targetObj;}
else
{var targetObj= traverseGraph(value[j], criteria, objects, visitor,atrname);if(targetObj!= null)
{return targetObj;}
}
}
}
else 
{if(visitor(value, criteria,atrname))
{targetObj= value;return targetObj;}
else
{var targetObj= traverseGraph(value, criteria, objects, visitor,atrname);if(targetObj!= null)
{return targetObj;}
}
}
}
}
return targetObj;}
function mergeData(newData, parentEObj, refName)
{var member= parentEObj.GetMember(refName);if( member.EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EREFERENCE)
{var Msg= NlsFormatMsg(not_a_reference,[refName, parentEObj.EClass.Name]);throw new EObjectError(Msg);}
var Status= parentEObj.Status;parentEObj.Status= null;var objects= new Array();mergeInternal(newData, parentEObj, member, objects);parentEObj.Status= Status;parentEObj.Refresh(refName, parentEObj.eGet(refName));}
function mergeInternal(newData, parentEObj, member, objects)
{if(newData!= null)
{if(newData.length!= null&&"number"== typeof(newData.length))
{for(var j= 0; j< newData.length;++j)
{mergeSingleObjectToModel(newData[j], parentEObj, member, objects);}
}
else
{mergeSingleObjectToModel(newData, parentEObj, member, objects);}
}
}
function mergeSingleObjectToModel(newEObj, parentEObj, member, objects)
{for(var i= 0; i< objects.length;++i)
{if(newEObj== objects[i])
{return;}
}
objects[objects.length]= newEObj;oldEObjList= parentEObj.eGet(member.Name);if(oldEObjList.length!= null&&"number"== typeof(oldEObjList.length))
{var match= false;for(var i=0; i<oldEObjList.length;++i)
{var oldEObj= oldEObjList[i];if(oldEObj&& oldEObj.getSignature()== newEObj.getSignature())
{mergeNewObjectWithOldObject(newEObj, oldEObj, objects);match= true;break;}
}
if(match== false)
{insertObject(newEObj, parentEObj, member);}
}
else
{if(oldEObjList.getSignature()== newEObj.getSignature())
{mergeNewObjectWithOldObject(newEObj, oldEObjList, objects);}
else
{insertObject(newEObj, parentEObj, member);}
}
}
function mergeNewObjectWithOldObject(newEObj, oldEObj, objects)
{for(var i= 0; i< oldEObj.Members.length;++i)
{var feature= oldEObj.Members[i].EStructuralFeature;var member= oldEObj.Members[i];var name= oldEObj.Members[i].Name;var value= newEObj.eGet(name);if(null== value)
continue;if("object"== typeof(value)&& feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{mergeInternal(value, oldEObj, member, objects);}
else if(feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{continue;}
else
{if(feature.Type=="id"|| feature.iD== true)
{continue;}
oldEObj.eSet(name, value);}
}
}
function insertObject(newEObj, parentObj, member)
{var ref= member.EStructuralFeature;if(parentObj.eGet(member.Name)!= null&&
(ref.getUpperBound()== -1||
ref.getUpperBound()> 1||
(ref.getLowerBound()< ref.getUpperBound()&& ref.getUpperBound()> 1))
)
{parentObj.eAdd(member.Name, newEObj);}
else
{parentObj.eSet(member.Name, newEObj);}
}
function NlsFormatMsg(template, args)
{if(template== null)
{return"";}
if(args== null)
{return template;}
var result= template;var regExp;for(var i= 0; i< args.length; i++)
{var match="{"+ i+"}";result= result.replace(match, args[i]);}
return result;}
function checkForwardSlash(urlPrefix)
{var resultUrlPrefix= urlPrefix;if(
urlPrefix!= null
&& urlPrefix!=""
)
{var length= urlPrefix.length;var lastChar= urlPrefix.charAt(length-1);if(lastChar!="/")
{resultUrlPrefix= resultUrlPrefix+"/";}
}
else
{resultUrlPrefix="";}
return resultUrlPrefix;}
function escapeSpecialChars(aString)
{var result="";if(
aString== null
|| aString==""
)
{return aString;}
for(var i=0; i< aString.length; i++)
{if(aString.charAt(i)=="\'") result+="\\\'";else if(aString.charAt(i)=="\"") result+="\\\"";else if(aString.charAt(i)=="\\") result+="\\\\";else result+= aString.charAt(i);}
return result;}
function Trim(str)
{if(
null== str
|| 0== str.length
)
{return str;}
while(
str.length> 0
&&" "== str.substring(0,1)
)
{str= str.substring(1,str.length);}
while(
str.length> 0
&&" "== str.substring(str.length-1,str.length)
)
{str= str.substring(0,str.length-1);}
return str;}
function pause(numberMillis)
{var dlg='window.setTimeout('+' function () { window.close(); }, '+ numberMillis+');';if(navigator.appName=="Netscape") 
{var result= openDialog(
'javascript:document.writeln('+'"<script>'+ dlg+'<'+'/script>"',
'pauseDialog',
'modal=1,width=10,height=10'
);alert(result);}
else
{var result= window.showModalDialog('javascript:document.writeln('+'"<script>'+ dlg+'<'+'/script>")');}
}
function gc(){if(isIE())
{var controlArr= ODCPageControl._Controls;var controllen= controlArr.length;for(var j=0; j<controllen; j++)
{if(
controlArr[j][1].Type!='undefined'
&& controlArr[j][1].Type=="DataGrid"
)
{if(controlArr[j][1].DataArray!=null)
{var len= controlArr[j][1].DataArray.length;for(var i=0; i<len; i++)
{for(var k=0; k<controlArr[j][1].DataArray[i].length; k++)
{controlArr[j][1].DataArray[i][k].OnPropertyBinderChange=null;controlArr[j][1].DataArray[i][k].onchange= null;controlArr[j][1].DataArray[i][k].propertyBinder= null;controlArr[j][1].DataArray[i][k]= null;}
}
}
if(controlArr[j][1].Adapter.EObjects!=null)
{var len= controlArr[j][1].Adapter.EObjects.length;for(var i=0;i<len; i++)
{controlArr[j][1].Adapter.EObjects[i].PropertyBinders= null;}
}
controlArr[j][1].eventArray= null;controlArr[j][1].Adapter= null;controlArr[j][1].HTMLTable.GridControl= null;controlArr[j][1]= null;}
else
if(controlArr[j][0].indexOf("ODCInputTextControl")!=-1)
{controlArr[j][1].onchange= null;controlArr[j][1].propertyBinder= null;}
else
{if(controlArr[j][1].eventArray!= null)
{controlArr[j][1].eventArray= null;}
}
}
}
}
function findForm(control)
{return control.form;}
function getWindowSize()
{var sizeArr= new Array(2);sizeArr[0]=(isIE())?document.body.offsetWidth:window.innerWidth;sizeArr[1]=(isIE())?document.body.offsetHeight:window.innerHeight;return sizeArr;}
function getModelValue(obj){if(obj== null|| obj=='undefined'){return obj;}
if(obj instanceof Date){return obj.getTime();}
else if(obj instanceof Number){return obj.valueOf();}
else{return obj;}
}
function modelValueToObject(conv, value){if(conv instanceof hX_4.DateTimeConverter){if(value instanceof String){value= Number(value);}
return new Date(value);}
else if(conv instanceof hX_4.NumberConverter){return new Number(value);}
else{return value;}
}
function uppercaseFirstLetter(name)
{if(name!= null&& name!="")
{var firstChar= name.charAt(0).toUpperCase();var restPart= name.substring(1);name= firstChar+ restPart;}
return name;}
var XMLReservedChars=['\"','&','<','>','\''];var escapeEntities=['&quot;','&amp;','&lt;','&gt;','&apos;'];var escapeCharSkipIndex=[6, 5, 4, 4, 6];function convertXMLEscapingtoJS(s)
{if(s!= null)
{var s1= s;for(var i=0; i< escapeEntities.length; i++)
{var index= s.indexOf(escapeEntities[i]);while(index!= -1)
{s1= s.substring(0, index);s1+= XMLReservedChars[i];s1+= s.substring(index+escapeCharSkipIndex[i]);s= s1;index= s.indexOf(escapeEntities[i]);}
}
return s1;}
return null;}
function getXMLReservedCharIndex(c)
{for(var i=0; i<XMLReservedChars.length; i++)
if(XMLReservedChars[i]== c)
return i;return -1;}
function escapeForXML(s)
{if( typeof(s)!="string")
return s;var XXX="";var len= s.length;var i= 0;var j= 0;while(j< len)
{var index= -1;while( j< len&& index== -1)
{index= getXMLReservedCharIndex(s.charAt(j++));if(index!= -1)
j--;}
XXX= XXX+ s.substring(i, j);if(j== len)
break;if(index>= 0)
{XXX= XXX+ escapeEntities[index];}
++j;i= j;}
return XXX;}
function iconLibrary(obj,stylename)
{var iconLib= new Array();var styleValue= getEffectiveStyle(obj, stylename);var iconArray= styleValue.split("|");var len= iconArray.length-1;for(var i=1; i<len; i++)
{var temp= iconArray[i].split("=");iconLib[temp[0]]= temp[1];}
if(len>0)
return iconLib;else
return null;}
function getEffectiveStyle(obj, stylething1, stylething2){var rvalue;var elem= obj;if(elem){if(elem.currentStyle){var cstyle=(stylething2)? stylething2: CSStagToDOMtag(stylething1);rvalue= elem.currentStyle.getAttribute(cstyle);} else if(window.getComputedStyle){var compStyle= window.getComputedStyle(elem,"");rvalue= compStyle.getPropertyValue(stylething1);}
}
return(rvalue);}
function CSStagToDOMtag(value){var work= value;var q= work.indexOf("-");while(q>= 0){work= work.substring(0, q)+(work.substring(q+1, q+2)).toUpperCase()+ work.substring(q+2);q= work.indexOf("-");}
return work;}
function getBorderSize(obj, style, defaultValue)
{var width= defaultValue;var bname="border-"+ style+"-style";if((getEffectiveStyle(obj, bname))=="none"){width= 0;} else{bname="border-"+ style+"-width";var value= getEffectiveStyle(obj, bname);if(value)
width=(value=="")? defaultValue:((value=="thin")? 2:((value=="medium")? 3:((value=="thick")? 4: parseInt(value))));else
width= defaultValue;}
return width;}
function SortRows(columnName,rows) 
{function SortObj(direction,value,row) 
{this.m_direction= direction
this.m_value= value;this.m_row= row;}
function SortFunction(sortObj1,sortObj2) 
{if(sortObj1.m_value== sortObj2.m_value)
{return 0;}
var obj1= sortObj1.m_value;var obj2= sortObj2.m_value;var ret= 1;if(
"string"== typeof(obj1)
&&"string"== typeof(obj2)
)
{ret= obj1.localeCompare(obj2);}else{ret=(obj1> obj2)? 1: -1;}
var rtu=(sortObj1.m_direction== 0)? ret: -1 * ret;return rtu;}
var sortArray= new Array();columName= Trim(columnName);if(null== columName)
{return sortArray;}
var tokens= columnName.split(" ");if(
null== tokens
|| tokens.length== 0
)
{return sortArray;}
var direction="asc";columnName= Trim(tokens[0]);if(tokens.length> 1)
{var d= Trim(tokens[1]).toLowerCase();if(d.length> 4)
{d= d.substring(0,4);}
if(d=="desc")
{direction= d;}
}
for(var i= 0; i< rows.length;++i)
{sortArray[sortArray.length]= new SortObj((direction=="asc")? 0: 1,rows[i].eGet(columnName),rows[i]);}
if(sortArray.length> 1)
{sortArray.sort(SortFunction);}
return sortArray;}
function SortAllColumns(sortArray,columns,columnsIndex) 
{if(columnsIndex>= columns.length)
{return sortArray;}
var newSortArray= new Array();var i= 0;while(i< sortArray.length)
{var rows= new Array();var value= sortArray[i].m_value;while(i< sortArray.length&& value== sortArray[i].m_value)
{rows[rows.length]= sortArray[i].m_row;++i;}
var subSortArray= SortRows(columns[columnsIndex],rows);subSortArray= SortAllColumns(subSortArray,columns,columnsIndex+1);newSortArray= newSortArray.concat(subSortArray);}
return newSortArray;}
function getURLPrefix(encodedURL, sampleURL)
{return(encodedURL.substring(0,encodedURL.indexOf(sampleURL)));}
function getURLPostfix(encodedURL, sampleURL)
{return(encodedURL.substring(encodedURL.indexOf(sampleURL)+sampleURL.length));}
function initArray(string) 
{var charArr= string.split(',');return charArr;}
function replaceSpecialChars(string,repChar)
{var specChars=initArray("!,£,$,%,^,&,*,(,),+,{,},:,@,~,#,\',?,<,>,.,\",-,;,[,],/");for(var i=0;i<specChars.length;i++)
{while(string.indexOf(specChars[i])>-1)
string=string.replace(specChars[i],repChar);}
 
while(string.indexOf(",")>-1)
string=string.replace(",",repChar);return string;}
function addStandardEvent(obj, evType, fn, useCapture)
{obj['e'+evType+fn]= fn; 
obj[evType+fn]= function(){obj['e'+evType+fn]( window.event);}; 
if(obj.addEventListener) 
{obj.addEventListener(evType, fn, useCapture);return true;} 
else if(obj.attachEvent) 
{var r= obj.attachEvent("on"+evType, obj[evType+fn]);return r;} 
else 
{alert("Handler could not be attached");}
} 
function removeEvent( obj, type, fn) 
{if( obj.detachEvent) 
{if(obj[type+fn]!=null)
obj.detachEvent('on'+type, obj[type+fn]);obj[type+fn]= null;obj['e'+type+fn]= null;} 
else
obj.removeEventListener( type, obj[type+fn], false);} 
function detachTreeEvents(key)
{var treeAdapter= ODCRegistry.getClientAdapter(key, null); 
var nodeArr=treeAdapter.treeControl.a_index; 
for(var i=0;i<nodeArr.length;i++)
{var id=nodeArr[i].rootItem.itemID+"_"+nodeArr[i].itemID;var elemId="j_a"+id;var domElem=(document.getElementById(elemId));if(domElem!=null)
{removeEvent(domElem,"click",domElem.clickMethod);removeEvent(domElem,"mouseover",domElem.moverMethod);removeEvent(domElem,"mouseout",domElem.moutMethod);domElem.clickMethod=null;domElem.moverMethod=null;domElem.moutMethod=null;domElem=null;}
elemId="i_a"+id;domElem=(document.getElementById(elemId));if(domElem!=null)
{removeEvent(domElem,"click",domElem.clickMethod);removeEvent(domElem,"mouseover",domElem.moverMethod);removeEvent(domElem,"mouseout",domElem.moutMethod);removeEvent(domElem,"dblclick",domElem.dblClickMethod);domElem.clickMethod=null;domElem.moverMethod=null;domElem.moutMethod=null;domElem.dblClickMethod=null;domElem=null;}
}
}
function unbindElements()
{ 
var treeArr= ODCRegistry.getTreeInfo(); 
for(var key in treeArr) 
{detachTreeEvents(key);}
 
 
 
var regCompArr= ODCRegistry.getBinderInfo();for(var key in regCompArr) 
{ 
var test= regCompArr[key];if(test.DataUnbind)
{test.DataUnbind();} 
}
}
function setInvGifStyle(element)
{element.style.height="1px";element.style.margin="0px";element.setAttribute("padding","0px");element.setAttribute("border-style","none"); 
element.setAttribute("border-collapse","collapse");element.setAttribute("border-width","0px"); 
 
return element;}
var Log= new logger();function logger(LogLevel)
{this.logLevel= -1;this.NOLOG= -1;this.ERROR= 0;this.WARN= 1;this.INFO= 2;this.DEBUG= 3;this.setLogLevel= new Function('level','this.logLevel = level');this.getLogLevel= new Function('return this.logLevel');this.URL_PREFIX="";this.URL_POSTFIX="";this.setURLRewriter= function(Prefix, Postfix)
{this.URL_PREFIX= Prefix;this.URL_POSTFIX= Postfix;}
this.debug= function(funcName, msg)
{if(this.logLevel>=this.DEBUG)
writeLog(funcName, msg, 0);}
this.info= function(funcName, msg)
{if(this.logLevel>=this.INFO)
writeLog(funcName, msg, 1);}
this.warn= function(funcName, msg)
{if(this.logLevel>=this.WARN)
writeLog(funcName, msg, 2);}
this.error= function(funcName, msg)
{if(this.logLevel>=this.ERROR)
writeLog(funcName, msg, 3);}
this.alert= function(funcName, msg, msgCategory)
{if(msgCategory!='undefined')
{switch(msgCategory)
{case'Log.debug': this.debug(funcName, msg); break;case'Log.info': this.info(funcName, msg); break;case'Log.warn': this.warn(funcName, msg); break;case'Log.error': this.error(funcName, msg); break;default: alert("Counldn't recognize the message category, please use 'Log.debug' or 'Log.info' or 'Log.warn' or 'Log.error'");}
}
var outputStr= funcName+" "+msg;alert(outputStr);}
this.pause= function()
{if(this.logLevel>-1)
{logWindow.alert("Pause! Click 'OK' button to continue logging.");}
}
this.pageSeparation= function(pageName)
{if(this.logLevel>-1)
{createLogWin();logWindow.document.write('<br><br><hr><center><span class="pgspclr">'+pageName+'</span></center><br><br>');}
}
this.pageClose= function()
{if(this.logLevel>-1)
{createLogWin();logWindow.document.write('</BODY></HTML>');}
}
function createLogWin()
{if(typeof logWindow=='undefined'|| logWindow.closed)
{var winConfig='width=900,height=500,toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,resizable=yes,status=no';logWindow= window.open("","loggingWin",winConfig);logWindow.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">');logWindow.document.write('<html><head><title>ODC Log Window</title>');logWindow.document.write('</head>');logWindow.document.write('<link rel="stylesheet" href="'+Log.URL_PREFIX+'jsl_css/logger_v2_1.css'+Log.URL_POSTFIX+'">');logWindow.document.write('<body><pre>');}
}
var category= new Array('DEBUG ','INFO  ','WARN  ','ERROR ');function writeLog(funcName, msg, index)
{createLogWin();var time= getTime();msg= msg.replace(/</g,"&lt;");msg= msg.replace(/>/g,"&gt;");var outputStr= category[index]+ time+" "+ funcName+" "+ msg;logWindow.document.write('<span class="logclr'+index+'">');logWindow.document.write(outputStr);logWindow.document.write('</span><br>');}
}
function getTime()
{var time= new Date();var hour= time.getHours();var min= time.getMinutes();var second= time.getSeconds();var msecond= time.getMilliseconds();var dd= time.getDate();var mm= time.getMonth()+1;var yy= time.getFullYear();var msecondStr;if(msecond< 10)
msecondStr=":00"
else if(msecond< 100)
msecondStr=":0";else
msecondStr=":";return"["+ yy+((mm< 10)?"-0":"-")+ mm
+((dd< 10)?"-0":"-")+ dd
+((hour< 10)?"-0":"-")+ hour
+((min< 10)?":0":":")+ min
+((second< 10)?":0":":")+ second
+ msecondStr+ msecond+"]";}
function TimeLogger()
{this._StartTime= new Date();this._SeqTime= this._StartTime;this._Logs= new Array(10);this._Counter= -1;this.previousTime= this._StartTime; 
this.accumulatedTime= 0; 
this.dbefore= 0;this.dafter= 0;this.methodTimes= new Array(10);this.stack= new Array(10);this.add= function(Label)
{var d= new Date();this._Logs[++this._Counter]=[Label, d - this._StartTime, d - this._SeqTime];this._SeqTime= d;}
this.add("Start Time");this.startAccumulate= function(method)
{this.dbefore= new Date();this.stack.push(this.dbefore);}
this.endAccumulate= function(method)
{this.dbefore= this.stack.pop();if(this.methodTimes[method]== null)
this.methodTimes[method]= 0;this.accumulatedTime= this.methodTimes[method];this.dafter= new Date();this.accumulatedTime+= this.dafter - this.dbefore;this.methodTimes[method]= this.accumulatedTime;}
this.getLogText= function(WebText)
{var Str="";for(var i= 0; i<= this._Counter;++i)
{Str+= this._Logs[i][0]+": "+(this._Logs[i][2]/1000.0)+"s; Accumulated time: "+(this._Logs[i][1]/1000.0)+"s"
+(WebText== true?"<BR>\n":"\n");}
for(method in this.methodTimes)
{Str+="accumulatedTime for method "+ method+" : "+ this.methodTimes[method]/1000.0+"<BR>\n";}
return Str;}
}
if((typeof MemoryManager)=='undefined'||!MemoryManager){ var MemoryManager= new memoryManager();}
if(document&& document.createElement&&((document.createElement("button")).tagName=="button")) 
{MemoryManager.tagCase= function(s){return s.toLowerCase();}
} 
else 
{MemoryManager.tagCase= function(s){return s.toUpperCase();}
}
MemoryManager._WDW="#window";MemoryManager._BODY="#body";MemoryManager._DOC="#document";MemoryManager._BBODY= MemoryManager.tagCase("body");MemoryManager._DDOC= MemoryManager.tagCase("document");MemoryManager.userEvents=[]; 
function memoryManager()
{ 
 
 
}
memoryManager.prototype.onPageLoad= function() 
{if(!MemoryManager.bodyLoadRewritten) 
MemoryManager.bodyLoadEventNum= MemoryManager.attachEvent(document.body,"onload","l", MemoryManager.pageLoadAction);MemoryManager.bodyLoadRewritten= true;return true;}
memoryManager.prototype.pageUnloadAction= function(evt) 
{if(typeof(MemoryManager)!='undefined') MemoryManager.removeEvent(document.body,"onunload", MemoryManager.bodyUnloadEventNum);if(typeof(unbindElements)!='undefined') unbindElements();return true;}
memoryManager.prototype.pageLoadAction= function(evt) 
{var varobj, inBodyLoad=MemoryManager.bodyLoadDone;MemoryManager.bodyLoadDone= true;MemoryManager.removeEvent(document.body,"onload", MemoryManager.bodyLoadEventNum);if((typeof ODCRegistry)!='undefined'&& ODCRegistry)
MemoryManager.bodyUnloadEventNum= MemoryManager.attachEvent(document.body,"onunload","l", MemoryManager.pageUnloadAction); 
return; 
}
memoryManager.prototype.getElementById= function(obj) 
{var theObj= obj;if(obj!= null&& MemoryManager.isString(obj)) 
{if(window.document.getElementById!= null) 
theObj= window.document.getElementById(obj);else if(window.document.all!= null) 
theObj= window.document.all(obj);}
return theObj;}
memoryManager.prototype.attachEvent= function(objid, eventname, position, handler, handler1, args, MozDown) 
{if(objid&& eventname&& handler) 
{var rValue= null;var obj= MemoryManager.getElementById(objid);if(obj) 
{var srcid= MemoryManager.dispatchToID(obj);userObj= MemoryManager.lookupEvent("R", srcid, eventname);if(userObj== null) 
userObj= MemoryManager.addNewEvent(srcid, obj, eventname,"R", handler1, args, MozDown);if(position=="f"|| position=="first") 
rValue= userObj.addPre("f", handler);else if(position=="p"|| position=="previous")
rValue= userObj.addPre("l", handler);else if(position=="n"|| position=="next") 
rValue= userObj.addPost("f", handler);else 
rValue= userObj.addPost("l", handler);var tgtobj=(srcid== MemoryManager._WDW)? window:((srcid== MemoryManager._BODY)? document.body: obj);if(isIE())
tgtobj.setAttribute(eventname, MemoryManager.runEvent);else{if(eventname=="onpropertychange") 
{tgtobj.addEventListener((args&& args.length&& args[0]=="value")?"DOMCharacterDataModified":"DOMAttrModified", MemoryManager.runEvent1, false);} 
else if(MozDown) 
{var eName=(eventname.indexOf("on")== 0)? eventname.substr(2): eventname;tgtobj.addEventListener(eName, MemoryManager.runEvent2, true);} 
else
tgtobj.setAttribute(eventname,"return(MemoryManager.runEvent(this, event));");}
return rValue;}
}
return null;}
memoryManager.prototype.removeEvent= function(objid, eventname, which) 
{if(objid&& eventname) 
{var obj= MemoryManager.getElementById(objid);if(obj) 
{var srcid= MemoryManager.dispatchToID(obj);var userObj= MemoryManager.lookupEvent("R", srcid, eventname);if(userObj!= null) 
{var user=(arguments.length> 2&& which&& MemoryManager.isString(which)&& which=="user");var num=(arguments.length> 2&& which&& MemoryManager.isNumber(which));var all=(arguments.length<= 2);if(user) 
userObj.User= null;if(all) 
userObj.remove(0);if(num) 
userObj.remove(which);return true;}
}
}
return false;}
memoryManager.prototype.lookupEvent= function(kind, id, name) 
{var i, j, l1, l=MemoryManager.userEvents.length;for(i=0; i<l; i++){if(MemoryManager.userEvents[i].id==id){l1= MemoryManager.userEvents[i].events.length;for(j=0; j<l1; j++){if(MemoryManager.userEvents[i].events[j].etype== kind&& MemoryManager.userEvents[i].events[j].eventname== name)
return(MemoryManager.userEvents[i].events[j]);}
return null;}
}
return null; 
}
memoryManager.prototype.runEvent1= function(evt) 
{MemoryManager.runEvent(this, evt);}
memoryManager.prototype.runEvent2= function(evt) 
{MemoryManager.runEvent(this, evt, true);}
memoryManager.prototype.runEvent= function(ethis, evt, MozDown) 
{evt=(evt)? evt:((event)? event: null);ethis=(!ethis)? this: ethis;ethis=(ethis== window|| ethis== document.window)?((MozDown)?window:window.document.body): ethis;if(ethis&& evt) 
{var srcid, userObj, evtname=(evt.type=="DOMAttrModified"|| evt.type=="DOMCharacterDataModified")?"onpropertychange":("on"+ evt.type);srcid=(ethis== window)? MemoryManager._WDW:((ethis== document|| ethis== document.body)? MemoryManager._BODY: ethis.id);userObj= MemoryManager.lookupEvent("R", srcid, evtname);if(userObj!= null) 
return((isIE())?(userObj.run(ethis)):(userObj.run(ethis, evt)));}
return true;}
memoryManager.prototype.isString= function(obj){return(typeof(obj)=="string");}
memoryManager.prototype.isNumber= function(obj){return(typeof(obj)=="number");}
memoryManager.prototype.isFunction= function(obj){return(typeof(obj)=="function");}
memoryManager.prototype.JSFNoOp= function(event){return;}
memoryManager.prototype.dispatchToID= function(obj) 
{if(obj.navigator)
return"#window";else 
if((obj.nodeName== MemoryManager._DDOC|| obj.nodeName== MemoryManager._BBODY|| obj.nodeName.toLowerCase()== MemoryManager._BODY|| obj.nodeName.toLowerCase()== MemoryManager._DOC))
return MemoryManager._BODY;else
return obj.id;}
memoryManager.prototype.addNewEvent= function(id, obj, eventname, kind, handler1, args, MozDown) 
{var i, userObj;var eObj= null;var l= MemoryManager.userEvents.length;for(i= 0; i< l&& eObj== null; i++) 
{if(MemoryManager.userEvents[i].id== id) 
eObj= MemoryManager.userEvents[i];}
if(eObj== null) 
{eObj= new MemoryManager.ODCEventObject(id);MemoryManager.userEvents.push(eObj);}
userObj= new MemoryManager.ODCEvent(obj, eventname, kind, handler1, args, MozDown);eObj.events.push(userObj);return userObj;}
memoryManager.prototype.ODCEventObject= function(id, obj, eventname, etype, handler1, args) 
{this.id= id;this.events=[];}
memoryManager.prototype.ODCEvent= function(obj, eventname, etype, handler1, args, MozDown) 
{if(obj&& eventname) 
{this.eventCounter= 0;this.eventname= eventname;this.User= null;this.preUser=[];this.postUser=[];this.etype= etype;this.obj= obj;this.args= args;this.handler1= handler1;this.id= null;var f= null;if(etype=="R") 
{if(MozDown)
this.id=(MemoryManager._WDW== MemoryManager.dispatchToID(obj))? MemoryManager._WDW: obj.id;else if((MemoryManager._BODY== MemoryManager.dispatchToID(obj))) 
{f= document.body.getAttribute(eventname);this.id= MemoryManager._BODY;} 
else 
{f= obj.getAttribute(eventname);this.id= obj.id;}
} 
else this.id= obj;if(f!= null) 
this.User=(MemoryManager.isFunction(f))? f: new Function("event", f);}
}
memoryManager.prototype.ODCEventEntry= function(id, handler) 
{this.id= id;if(MemoryManager.isFunction(handler)) 
this.handler= handler;else if(MemoryManager.isString(handler)) 
this.handler= new Function("event","return "+ handler+";");else 
this.handler= MemoryManager.JSFNoOp;}
memoryManager.prototype.ODCEvent.prototype.addPost= function(pos, handler){this.eventCounter++;var entry= new MemoryManager.ODCEventEntry(this.eventCounter, handler);if(pos=="f"|| pos=="first") 
this.postUser.unshift(entry);else 
this.postUser.push(entry);return(this.eventCounter);}
memoryManager.prototype.ODCEvent.prototype.addPre= function(pos, handler){this.eventCounter++;var entry= new MemoryManager.ODCEventEntry(this.eventCounter, handler);if(pos=="f"|| pos=="first") 
this.preUser.unshift(entry);else 
this.preUser.push(entry);return(this.eventCounter);}
memoryManager.prototype.ODCEvent.prototype.remove= function(id) 
{var i, removed= false, l= this.postUser.length;if(id<= 0){for(i= 0; i< l; i++) this.postUser[i]= null;l= this.preUser.length;for(i= 0; i< l; i++) this.preUser[i]= null;} else{for(i= 0;((i< l)&&(!removed)); i++){if((this.postUser[i]).id== id){this.postUser[i]= null;removed= true;}
}
l= this.preUser.length;for(i= 0;((i< l)&&(!removed)); i++){if((this.preUser[i]).id== id){this.preUser[i]= null;removed= true;}
}
}
}
memoryManager.prototype.ODCEvent.prototype.run= function(ethis, evt) 
{var i, result= true;evt=(evt)? evt:((event)? event: null);for(i= 0; result&& i< this.preUser.length; i++) 
{if(this.preUser[i]!= null) 
{result=(isIE())?((this.preUser[i]).handler.call(ethis)):((this.preUser[i]).handler.call(ethis, evt));result=(result== false)? false: true;if(evt.returnValue!=undefined&& evt.returnValue== false) 
result= false;else if(evt.getPreventDefault&& evt.type!="DOMAttrModified"&& evt.type!="DOMCharacterDataModified"&& evt.getPreventDefault()) 
result= false;}
}
if(result&& this.User!= null) 
{result=(isIE())?(this.User.call(ethis)):(this.User.call(ethis, evt));result=(result== false)? false: true;if(evt.returnValue!=undefined&& evt.returnValue== false) 
result= false;else if(evt.getPreventDefault&& evt.type!="DOMAttrModified"&& evt.type!="DOMCharacterDataModified"&& evt.getPreventDefault()) 
result= false;}
for(i= 0; result&& i< this.postUser.length; i++) 
{if(this.postUser[i]!= null) 
{result=(isIE())?((this.postUser[i]).handler.call(ethis)):((this.postUser[i]).handler.call(ethis, evt));result=(result== false)? false: true;if(evt.returnValue!=undefined&& evt.returnValue== false) 
result= false;else if(evt.getPreventDefault&& evt.type!="DOMAttrModified"&& evt.type!="DOMCharacterDataModified"&& evt.getPreventDefault()) 
result= false;}
}
return result;}
var ODCRegistry= new ODCRegistry();function ElementsInfo(clientId, JSObject)
{this.clientId= clientId;this.JSObject= JSObject;}
function ODCRegistry()
{this.Elements= new Array();this.Models= new Array();this.ModelNames= new Array();this.ModelsInForm= new Array();this.PropertyBinders= new Array();this.treeControls= new Array();this.defaultClientViewID= new Array();this.addElementInfo= function(viewclientId,serverId, clientId, JSObject)
{var key=(viewclientId!=null)?viewclientId+"_"+serverId:serverId;JSObject.pageId= serverId;this.Elements[key]= new ElementsInfo(clientId, JSObject);}
this.addModelInfo= function(modelID, modelObject,formclientid)
{this.Models[modelID]= modelObject;if(formclientid){if(this.ModelsInForm[formclientid]==null)
this.ModelsInForm[formclientid]= new Array();var arr= this.ModelsInForm[formclientid];this.ModelsInForm[formclientid][arr.length]= new Array(modelID, modelObject);}
}
this.addModelName= function(vbl, modelName)
{this.ModelNames[vbl]= modelName;}
this.getModelById= function(modelID)
{return this.Models[modelID];}
this.getModelNames= function()
{return this.ModelNames;}
this.getElementById= function(serverId,type,viewclientId)
{var key=(viewclientId!=null&&viewclientId!='undefined')?viewclientId+"_"+serverId:serverId;var E= this.Elements[key];if(E== null)
{for(var ind=0; ind< this.defaultClientViewID.length; ind++)
{key= this.defaultClientViewID[ind]+"_"+serverId;E= this.Elements[key];if(E!= null)
break;}
}
if(E== null)
{return null;}
var returnObj;switch(type){case"0":
returnObj= E.JSObject.Adapter;if((returnObj==null|| returnObj=='undefined')&&(E.JSObject!=null|| E.JSObject!='undefined')){returnObj= E.JSObject;}
break;case"1":
returnObj= E.JSObject;break;case"2":
returnObj= document.getElementById(E.clientId);break;case"3":
returnObj= E.clientId;break;case"4":
returnObj= E;break;default:
break;}
return returnObj;}
this.getElementInfo= function(serverId,viewclientId)
{return this.getElementById(serverId,"4",viewclientId);}
this.getClientAdapter= function(serverId,viewclientId)
{return this.getElementById(serverId,"0",viewclientId);}
this.getClientAdapters= function(adapterArr)
{if(adapterArr){var retAdapter= new Array();for(var i=0; i<adapterArr.length; i++)
{var serverId= adapterArr[i][0];var clientviewId= adapterArr[i][1];retAdapter[retAdapter.length]= this.getClientAdapter(serverId, clientviewId);}
return retAdapter;}else
return null;}
this.getClientControl= function(serverId,viewclientId)
{return this.getElementById(serverId,"1",viewclientId);}
this.getClientElement= function(serverId,viewclientId)
{return this.getElementById(serverId,"2",viewclientId);}
this.getClientId= function(serverId,viewclientId)
{return this.getElementById(serverId,"3",viewclientId);}
this.saveModelsToForm= function(FormName)
{saveArrayOfThingsToForm(this.Models,"Diff","GenerateDiffString", FormName);}
this.saveControlsToForm= function(FormName)
{saveArrayOfThingsToForm(this.Elements,"UIS","generateUIStateString", FormName);}
this.saveAllToForm= function(Form)
{if(this.ModelsInForm[Form.id])
saveArrayOfThingsToForm(this.ModelsInForm,"Diff","GenerateDiffString", Form, true);else
saveArrayOfThingsToForm(this.Models,"Diff","GenerateDiffString", Form, true);saveArrayOfThingsToForm(this.Elements,"UIS","generateUIStateString", Form, false);}
this.addDefaultClientViewID= function(clientViewID)
{var num= this.defaultClientViewID.length+ 1;this.defaultClientViewID[num]= clientViewID;}
this.addBinderInfo= function(key, JSObject)
{this.PropertyBinders[key]= JSObject;}
this.getBinderInfo= function()
{return this.PropertyBinders;}
 
this.addTreeInfo= function(index,key)
{this.treeControls[index]= key;}
this.getTreeInfo= function()
{return this.treeControls;}
}
function saveArrayOfThingsToForm(AOT, ExtraName, FuncName, Form, modelFlag)
{if(Form== null)
{var args= new Array;var Msg= NlsFormatMsg(form_does_not_exist);throw new EObjectError(Msg);}
if(modelFlag){var arr= AOT[Form.id];if(arr!=null&&arr.length>0){for(var i=0; i<arr.length;i++)
{var key= arr[i][0];var obj= arr[i][1];var inputName= key+ExtraName;var input= addHiddenField(inputName, Form);try{eval("input.value = obj."+FuncName+"();");}catch(e){}
}
}else{for(var key in AOT){var inputName= key+ExtraName;var input= addHiddenField(inputName, Form);try{eval("input.value = AOT[key]."+FuncName+"();");}catch(e){}
}
}
}else{for(var key in AOT){var clientId= AOT[key].clientId;inputName= clientId+ ExtraName;var input= addHiddenField(inputName, Form);try{if(AOT[key].JSObject!=null&&AOT[key].JSObject!='undefined')
eval("input.value = AOT[key].JSObject."+FuncName+"();");}catch(e){}
}
}
}
function addHiddenField(inputName, Form)
{var input= Form[inputName];if(input== null)
{input= document.createElement("input");input.type="hidden";input.name= inputName;input.id= inputName;Form.appendChild(input);}
return input;}
function executeWebService(serverId, viewclientId)
{var adapter= ODCRegistry.getClientControl(serverId, viewclientId);if(adapter!=null)
adapter.Execute();else{var args= new Array;args[0]= viewclientId;args[1]= serverId;var Msg= NlsFormatMsg(webservice_not_found, args);alert(Msg);} 
return false;}
function ODCEvent(name)
{this.name=name;this.nativeEvent=null;}
var odc_pingInterval= 0;var odc_pingIntervalMinut= 0;var odc_inactive= false;var odc_isEanbled= false;var odc_url= null;var odc_style_url= null;var odc_timestamp_last_activity= null;function sessionControllerInit(pingInterval, isEanbled, pingUrlPrefix, styleUrlPrefix)
{odc_pingIntervalMinut= pingInterval;odc_pingInterval= pingInterval*60*1000;odc_isEanbled= isEanbled;pingUrlPrefix= checkForwardSlash(pingUrlPrefix);odc_url= pingUrlPrefix+"odc_iframe_v2_1.jsp";styleUrlPrefix= checkForwardSlash(styleUrlPrefix);odc_style_url= styleUrlPrefix+"sessionCtrlDialog_v2_1.css";}
function enableSessionController()
{odc_isEanbled= true; 
}
function disableSessionController()
{odc_isEanbled= false; 
}
function pingServer()
{var pingIFrame= document.getElementById("ODC_PINGIFRAME");if(pingIFrame!= null)
{}
else
{pingIFrame= document.createElement("iframe");pingIFrame.setAttribute("id","ODC_PINGIFRAME");document.body.appendChild(pingIFrame);}
pingIFrame.setAttribute("src",odc_url);}
function startPing()
{odc_timestamp_last_activity= new Date();setTimeout("processPing()", odc_pingInterval);}
function processPing()
{if(odc_isEanbled== false|| odc_inactive== true)
{return;} 
else
{ 
pingServer();if((new Date().getTime()- odc_timestamp_last_activity.getTime())>= odc_pingInterval)
{displayWarningDialog();odc_inactive= true;}
setTimeout("processPing()", odc_pingInterval);} 
}
function displayWarningDialog()
{var width=250;var height= 160;var x=(screen.availWidth-width)/2;var y=(screen.availHeight-height)/2;var style="width="+ width+",height="+ height+",status=no,resizable=no,location=no";var dialog= window.open("","ODCDialog", style);dialog.moveTo(x,y);dialog.focus();var warningStr= NlsFormatMsg(odc_session_expire_warning,[odc_pingIntervalMinut]);var okStr= NlsFormatMsg(odc_session_ok_button, null);var warningStr1= NlsFormatMsg(odc_session_expired_warning, null);var title= NlsFormatMsg(odc_session_dialog_title, null);var jsCode="<script type=\"text/javascript\">"
+"function resetMaxCount()"
+"{"
+"window.opener.odc_inactive = false;"
+"window.close();"
+"} "
+"function replaceMsg()"
+"{"
+"var newWarningStr =\""+ warningStr1+"\";"
+"var td = document.getElementById(\"WARDINGSTR\");"
+"newTxtNode = document.createTextNode(newWarningStr);"
+"var kids = td.childNodes;"
+"for(var i=0; i<kids.length; i++)"
+"{"
+"var kid = kids[i];" 
+"if(kid.nodeType == 3)" 
+"{" 
+"kid.parentNode.replaceChild(newTxtNode, kid);"
+"return;"
+"}" 
+"}" 
+"} "
+"setTimeout(\"replaceMsg()\","+ odc_pingInterval+"); "
+"</script>";var jsPage="<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">"
+"<html><head><title>"+ title+"</title>"
+"</head>"
+"<link rel=\"stylesheet\" href=\""+ odc_style_url+"\">"
+"<body>"
+"<form> <table> <tr> <td id=\"WARDINGSTR\" class=\"warningMsg\">"+ warningStr+"</td> </tr>"
+"<tr> <td> <spacer type=block width=100 height=100> </td></tr>"
+"<tr> <td align=\"middle\"> <input type=\"submit\" width=80 Value=\"" 
+ okStr+"\" onClick=\"return resetMaxCount()\" class=\"buttonStr\"> </td> </tr>"
+"</table> </form>";dialog.document.write(jsPage);dialog.document.write(jsCode);dialog.document.write("</body></html>");}
function isIE()
{if(navigator.appName=='Microsoft Internet Explorer')
{return true;}
else
{return false;}
}
if(isIE()== false)
{window.captureEvents(Event.KEYDOWN);window.captureEvents(Event.MOUSEDOWN);} 
document.onkeypress= checkEvent;document.onmousedown= checkEvent;function checkEvent()
{ 
odc_timestamp_last_activity= new Date();}
var ODCProgressBar= new ProgressBar();function ColorHolder(row){this.row= row;this.changeColor= function(){var saveColor= row.cells[0].bgColor;for(var i=0; i<row.cells.length; i++){if(i==0){row.cells[i].bgColor= row.cells[row.cells.length-1].bgColor;}
else{var tempColor= row.cells[i].bgColor;row.cells[i].bgColor= saveColor;saveColor= tempColor;}
} 
}
}
function ProgressBar(colorArray){ 
this.div= null;this.table= null;this.message= null;this.holder= null;if(colorArray!= null&& colorArray!="undefined"&& colorArray.length!= 0){this.colorArray= colorArray;}
else{this.colorArray=["#6666ff","#3333ff","#0066ff","0066cc"];}
 
 
this.setVisible= function(){ 
if(document.forms!= null&& document.forms!='undefined'&& document.forms.length!= 0){this.div= document.forms[0].appendChild(document.createElement("div"));}
else{this.div= document.body.appendChild(document.createElement("div"));} 
var sizeArr= getWindowSize();this.div.style.position="absolute";this.div.style.width= Math.round(sizeArr[0]/3);this.div.style.height= Math.round(sizeArr[1]/4);this.div.style.left= Math.round((sizeArr[0]/2)-(sizeArr[0]/6));this.div.style.top= Math.round((sizeArr[1]/2)-(sizeArr[1]/8));this.div.style.zIndex= 1;this.div.style.visibility="visible";var formatTable= this.div.appendChild(document.createElement("table"));formatTable.bgColor="white";formatTable.width= this.div.style.width;formatTable.border= 5;formatTable.cellPadding= 0;formatTable.cellSpacing= 5;formatTable.appendChild(document.createElement("tbody"));var row1= formatTable.tBodies[0].appendChild(document.createElement("tr"));var td= row1.appendChild(document.createElement("td"));td.align="center";td.valign="middle";td.height= 30;td.innerHTML= progressbar_header;var row2= formatTable.tBodies[0].appendChild(document.createElement("tr"));var td2= row2.appendChild(document.createElement("td"));td2.align="center";td2.valign="middle";this.table= td2.appendChild(document.createElement("table"));this.createBar(Math.round(sizeArr[0]/3));var row3= formatTable.tBodies[0].appendChild(document.createElement("tr"));var th3= row3.appendChild(document.createElement("th"));th3.align="center";th3.valign="middle";th3.height= 30;var statusTable= th3.appendChild(document.createElement("table"));statusTable.appendChild(document.createElement("tbody"));statusTable.tBodies[0].appendChild(document.createElement("tr"));var staticTd= statusTable.tBodies[0].rows[0].appendChild(document.createElement("td"));staticTd.innerHTML=status_string;this.message= statusTable.tBodies[0].rows[0].appendChild(document.createElement("td"));}
 
 
this.hide= function(){this.div.style.visibility="hidden";}
 
this.setStatus= function(mess){if(this.isVisible()&& this.message!= null){this.message.innerHTML= mess;}
}
 
this.createBar= function(width){this.table.width= width;this.table.height= 20;this.table.cellPadding= 0;this.table.cellSpacing= 0;this.table.border= 0;this.table.appendChild(document.createElement("tbody"));var tr= this.table.tBodies[0].appendChild(document.createElement("tr"));for(var i=0; i<this.colorArray.length; i++){var color= this.colorArray[i];var td= tr.appendChild(document.createElement("td")); 
td.bgColor= color;}
}
 
this.getRow= function(){return this.table.tBodies[0].rows[0];}
 
this.startLoadModel= function(modelName){this.setStatus(NlsFormatMsg(start_load_model, this.createArgs(modelName)));}
 
this.endLoadModel= function(modelName){this.setStatus(NlsFormatMsg(end_load_model, this.createArgs(modelName)));}
 
this.startLoadDataInstance= function(modelName){this.setStatus(NlsFormatMsg(start_load_instance, this.createArgs(modelName)));}
 
this.endLoadDataInstance= function(modelName){this.setStatus(NlsFormatMsg(end_load_instance, this.createArgs(modelName)));}
 
this.startRenderControl= function(ctrlName){this.setStatus(NlsFormatMsg(start_render_control, this.createArgs(ctrlName)));}
 
this.endRenderControl= function(ctrlName){this.setStatus(NlsFormatMsg(end_render_control, this.createArgs(ctrlName)));}
 
this.isVisible= function(){return((this.div!= null)&&(this.div.style.visibility=="visible"));}
 
this.createArgs= function(value){var args= new Array;args[0]= value;return args;}
}
