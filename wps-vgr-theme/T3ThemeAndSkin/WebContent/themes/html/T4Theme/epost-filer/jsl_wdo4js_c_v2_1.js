/* (C) Copyright IBM Corp. 2006  All Rights Reserved                 */
var I=document.images;
function W(s){document.write(s)}
function WL(s){document.writeln(s)}
function PropertyArrayBinder(control, eobject, propertyname, onRowAdded, onRowDeleted)
{this.Control= control; 
this.EObject= eobject; 
this.PropertyName= propertyname; 
this.OnRowAdded= onRowAdded; 
this.OnRowDeleted= onRowDeleted; 
}
PropertyArrayBinder.prototype.DataBind= function() 
{this.EObject.PropertyArrayBinders.Add(this);}
PropertyArrayBinder.prototype.FireRowAdded= function(name,value) 
{if(
this.PropertyName== name
&& this.OnRowAdded!= null
)
{this.OnRowAdded(this.Control,this.EObject,value);}
}
PropertyArrayBinder.prototype.FireRowDeleted= function(name,value) 
{if(
this.PropertyName== name
&& this.OnRowDeleted!= null
)
{this.OnRowDeleted(this.Control,this.EObject,value);}
}
function PropertyBinder(
eobject,
propertyname,
control,
controlproperty,
controlChangeEventName,
callbackChangeEvent
)
{this.EObject= eobject; 
this.Control= control; 
this.ControlProperty= controlproperty; 
this.ControlChangeEventName= controlChangeEventName; 
this.CallbackChangeEvent= callbackChangeEvent; 
this.Converter= null;this.index= null;var pos1= propertyname.indexOf("[");if(pos1!= -1)
{this.PropertyName= propertyname.substring(0, pos1);var pos2= propertyname.indexOf("]");this.index= propertyname.substring(pos1+1, pos2);}
else
{this.PropertyName= propertyname;}
}
PropertyBinder.prototype.ControlGetFunction= null; 
PropertyBinder.prototype.ControlSetFunction= null; 
PropertyBinder.prototype.activateDataSet= function(obj)
{this.DataUnbind();this.EObject= obj;}
PropertyBinder.prototype.refresh= function()
{if(this.EObject)
this.DataBind();else{this.setValue("");}
}
PropertyBinder.prototype.setConverter= function(aConverter)
{this.Converter= aConverter;}
PropertyBinder.prototype.OnError= function(action, exception) 
{var args= new Array;args[0]= action;args[1]= exception.description;alert(NlsFormatMsg(error_on_propertybinder, args));}
PropertyBinder.prototype.OnPropertyBinderChange= function() 
{try
{var value= null;var element= null;if(isIE()){element= this.event.srcElement? this.event.srcElement: this.event.target;}
else{element= this;}
var propertyBinder= element.propertyBinder;if(propertyBinder.ControlGetFunction!= null)
{value= element[propertyBinder.ControlGetFunction]();}
else
{value= element[propertyBinder.ControlProperty];}
if(propertyBinder.Converter!=null)
{value= getModelValue(propertyBinder.Converter.stringToValue(value));}
var valueInModel= null;if(propertyBinder.index!= null)
{var temp= propertyBinder.EObject.eGet(propertyBinder.PropertyName);valueInModel= new Array();for(var i=0; i<temp.length; i++){valueInModel[i]= temp[i];}
valueInModel[propertyBinder.index]= value;}
else
{valueInModel= value;}
if(propertyBinder.EObject!= null)
{var retval= propertyBinder.EObject.eSet(propertyBinder.PropertyName,valueInModel);if(typeof event!='undefined'&&event!= null)
{event.returnValue= retval;}
}
if(propertyBinder.CallbackChangeEvent!= null)
{propertyBinder.CallbackChangeEvent(propertyBinder.EObject,propertyBinder.PropertyName,valueInModel);}
}
catch(e)
{if(propertyBinder.OnError!= null)
{propertyBinder.OnError("CHANGEVALUE",e);}
propertyBinder.DataUnbind();propertyBinder.DataBind();if(typeof event!='undefined'&&event!= null)
{event.returnValue= false;}
}
}
PropertyBinder.prototype.DataBind= function() 
{var valueInModel= this.EObject.eGet(this.PropertyName);var value= null;if(this.index!= null)
{value= valueInModel[this.index];}
else
{value= valueInModel;}
if(this.Converter!=null)
{value= this.Converter.valueToString(modelValueToObject(this.Converter, value));}
this.setValue(value); 
this.EObject.PropertyBinders.Add(this);if(this.ControlChangeEventName!= null)
{if(this.Control.attachEvent){this.Control.attachEvent(this.ControlChangeEventName, this.OnPropertyBinderChange);}
else{if(this.ControlChangeEventName.length>2&& this.ControlChangeEventName.substring(0,2)=="on"){var tempString= this.ControlChangeEventName.substring(2, this.ControlChangeEventName.length);this.Control.addEventListener(tempString, this.OnPropertyBinderChange, false);}
}
this.Control.propertyBinder= this;}
}
PropertyBinder.prototype.DataUnbind= function() 
{if(this.EObject!=null)
{this.EObject.PropertyBinders.Remove(this);if(this.ControlChangeEventName!= null)
{if(this.Control.detachEvent){this.Control.detachEvent(this.ControlChangeEventName, this.OnPropertyBinderChange);}
else{if(this.ControlChangeEventName.length>2&& this.ControlChangeEventName.substring(0,2)=="on"){var tempString= this.ControlChangeEventName.substring(2, this.ControlChangeEventName.length);this.Control.removeEventListener(tempString, this.OnPropertyBinderChange, false);}
}
}
this.Control.propertyBinder= null;}
}
PropertyBinder.prototype.FireValueChanged= function(name, valueInModel, index) 
{if(index!= null)
{value= valueInModel[index];}
else
{value= valueInModel;}
if(this.PropertyName!= name)
{return;}
if(this.PropertyName== name)
{if(this.Converter!=null)
{value= this.Converter.valueToString(modelValueToObject(this.Converter, value));}
}
this.setValue(value); 
}
PropertyBinder.prototype.setValue= function(value)
{ 
if(this.ControlSetFunction&&(!this.ControlGetFunction||(this.Control[this.ControlGetFunction]!= value||(typeof this.Control[this.ControlGetFunction]!= typeof value)))){if(value!= null&& value!='undefined'){this.Control[this.ControlSetFunction](value, this.EObject, this.PropertyName);}
else{this.Control[this.ControlSetFunction]("", this.EObject, this.PropertyName);}
}
else
{if(this.Control[this.ControlProperty]!= value||(typeof this.Control[this.ControlProperty]!= typeof value)){if(value!= null&& value!='undefined'){this.Control[this.ControlProperty]= value;}
else{this.Control[this.ControlProperty]="";}
if(this.ControlChangeEventName&& this.Control[this.ControlChangeEventName]){hX_4.imp.fireEvent(this.Control, this.ControlChangeEventName);}
}
}
}
function EFactory()
{}
EFactory.prototype.create= function(eclass)
{if(null== eclass)
{var Msg= NlsFormatMsg(unable_create_object, null);throw new EObjectError(Msg);}
var eobject= new EObject(eclass);eobject.ID= NewID();var eall= eobject.EClass.getEAllAttributes();for(var i= eall.length - 1; i>= 0; --i)
{var attr= eall[i];if(attr.Type!="id")
{eobject.AddMember(attr.Name, attr);}
}
var eall= eobject.EClass.getEAllReferences();for(var i= eall.length - 1; i>= 0; --i)
{var ref= eall[i];eobject.AddMember(ref.Name,ref);}
return eobject;}
function EPackage(epname)
{this.Name= epname;this.EFactory= new EFactory(); 
this.EClassArray= new Array(); 
 
this.EventMap= new Array(); 
}
EPackage.prototype.getMemberEClass= function(index)
{var l=this.EClassArray.length;if((index< 0)||(index>(l-1)))
{return null; 
}else{return this.EClassArray(index);}
}
 
EPackage.prototype.addMemberEClass= function(eclass)
{if((eclass!= null)&&(eclass!='undefined'))
{this.EClassArray[this.EClassArray.length]= eclass;eclass.setEPackage(this);}
}
 
EPackage.prototype.removeMemberEClass= function(index)
{var l=EClassArray.length;if((index< 0)||(index>(l-1)))
{return null; 
}
this.EClassArray[index].setEPackage(null); 
var i;for(i=index;i<(l-1);i++)
{this.EClassArray[i]=this.EClassArray[i+1];}
this.EClassArray.length--;}
 
EPackage.prototype.getMemberEClass= function(index)
{var l=this.EClassArray.length;if((index< 0)||(index>(l-1)))
{return null; 
}
else
{return this.EClassArray[index];}
}
 
EPackage.prototype.addHandler= function(action, handler)
{ 
var action_uc= action.toUpperCase(); 
switch(action_uc)
{case"ONCREATE":
case"ONUPDATE":
case"ONDELETE":
this.EventMap[action_uc]=handler;return true; 
default:
return false; 
}
}
EPackage.prototype.hasHandler= function(action)
{if((this.EventMap[action]=='undefined')||(this.EventMap[action]== null))
{return false; 
}else{return true; 
}
}
EPackage.prototype.activateEvent= function(action, thisObj)
{var action_uc= action.toUpperCase(); 
if(this.hasHandler(action_uc)){var e= new ODCEvent(action_uc);switch(action_uc){case"ONCREATE":
break;case"ONUPDATE":
break;case"ONDELETE":
break;default:
return false; 
}
if(eval(this.EventMap[action_uc]+".call(this, thisObj, e);")== false)
{return false; 
}
return true; 
}else{return false;}
}
EPackage.prototype.getEFactoryInstance= function() 
{return this.EFactory;}
EPackage.prototype.setEFactoryInstance= function(efactory) 
{this.EFactory= efactory;}
function IndexMapCreate()
{var ary= new Array();ary["#names"]= new Object();return ary;}
function IndexMapGet(ary, name)
{var obj= ary["#names"][name];if( obj== undefined)
{return null;}
return obj;}
function IndexMapAddNew(ary, name, obj)
{ary["#names"][name]= obj;ary[ary.length]= obj;return obj;}
function IndexMapAdd(ary, name, obj)
{var existsObj= IndexMapGet(ary, name);if( existsObj!= null)
{return existsObj;}
return IndexMapAddNew(ary, name, obj);}
function IndexMapRemove(ary, nameOrIndex)
{var obj= null;var index= -1;var name= null;if( typeof(nameOrIndex)=="number")
{obj= ary[nameOrIndex];index= nameOrIndex;var names= ary["#names"];for( name in names)
{if( names[name]== obj)
{break;}
}
}
else
{name= nameOrIndex;obj= IndexMapGet(ary, name);if( obj== null)
{return null;}
for( var i= ary.length - 1; i>= 0; --i)
{if( ary[i]== obj)
{index= i;break;}
}
}
if( obj== null)
{return null;}
delete ary["#names"][name];var endIndex= ary.length - 1;for( var i= index; i< endIndex;++i)
{ary[i]= ary[i+1];}
ary.length= endIndex;return obj;}
function EClass(name, diffgramNeeded)
{this.Name= name;this.DiffgramNeeded= true;if(diffgramNeeded!= undefined)
{this.DiffgramNeeded= diffgramNeeded;}
this.Attributes= IndexMapCreate(); 
this.Attributes.get= function(name)
{var res= IndexMapGet(this, name);return res;}
this.Attributes.add= function(attribute)
{var res= IndexMapAdd(this, attribute.Name, attribute);return res;}
this.Attributes.remove= function(nameOrIndex)
{var res= IndexMapRemove(this, nameOrIndex);return res;}
this.References= IndexMapCreate(); 
this.References.get= function(name)
{var res= IndexMapGet(this, name);return res;}
this.References.add= function(reference)
{var res= IndexMapAdd(this, reference.Name, reference);return res;}
this.References.remove= function(nameOrIndex)
{var res= IndexMapRemove(this, nameOrIndex);return res;}
 
}
EClass.prototype.getEPackage= function()
{return this.EPackage;}
EClass.prototype.setEPackage= function(epackage)
{this.EPackage= epackage
}
EClass.prototype.getEStructuralFeature= function(name)
{var res= this.getEAllAttributes().get(name);if( res!= null)
{return res;}
res= this.getEAllReferences().get(name);return res;}
EClass.prototype.getEAllAttributes= function()
{return this.Attributes;}
EClass.prototype.getEAllReferences= function()
{return this.References;}
EClass.prototype.ValidateType= function(name, value)
{var structFeat= this.getEStructuralFeature(name);if(structFeat== null)
{var args= new Array;args[0]= name;args[1]= this.Name;var Msg= NlsFormatMsg(name_notexist_model, args);throw new EObjectError(Msg);}
if( structFeat.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{var res= structFeat.ValidateType(value);return res;}
return value;}
EClass.prototype.ValidateCardinality= function(name,length)
{var structFeat= this.getEStructuralFeature(name);if(null== structFeat)
{var args= new Array;args[0]= name;args[1]= this.Name;var Msg= NlsFormatMsg(name_notexist_model, args);throw new EObjectError(Msg);}
structFeat.ValidateCardinality(length);}
var EStructuralFeature= new Object();EStructuralFeature.CLASSTYPE_EATTRIBUTE= 0x1;EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE= 0x2;EStructuralFeature.CLASSTYPE_EREFERENCE= 0x4;EStructuralFeature.AddProperty= function(obj, name)
{obj.Setter= new Function("value",'this.eSet("'+ name+'", value);');obj.Getter= new Function('return this.eGet("'+ name+'");');}
EStructuralFeature.toString= function(classType)
{var str= undefined;switch(classType)
{case EStructuralFeature.CLASSTYPE_EATTRIBUTE: 
str="EAttribute";break;case EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE: 
str="EAttributeCalculate";break;case EStructuralFeature.CLASSTYPE_EREFERENCE: 
str="EReference";break;}
return str;}
function EAttributeCalculate(name, expression, type)
{this.Name= name;this.Expression= expression; 
this.Type= type;EStructuralFeature.AddProperty(this, name);}
EAttributeCalculate.prototype.CLASSTYPE= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE;EAttributeCalculate.prototype.isReadOnly= function()
{return 1;}
EAttributeCalculate.prototype.getExpression= function()
{return this.Expression;}
EAttributeCalculate.prototype.getType= function() 
{return this.Type;}
function EAttribute(name, type, readonly)
{this.Name= name;this.Type= type;this.readonly= readonly; 
EStructuralFeature.AddProperty(this, name);}
EAttribute.prototype.LowerBound= 0; 
EAttribute.prototype.UpperBound= 1; 
EAttribute.prototype.iD= false;EAttribute.prototype.CLASSTYPE= EStructuralFeature.CLASSTYPE_EATTRIBUTE;EAttribute.prototype.isReadOnly= function()
{return this.readonly;}
EAttribute.prototype.getLowerBound= function()
{return this.LowerBound;}
EAttribute.prototype.setLowerBound= function(value)
{this.LowerBound= value;}
EAttribute.prototype.getUpperBound= function()
{return this.UpperBound;}
EAttribute.prototype.setUpperBound= function(value)
{this.UpperBound= value;}
EAttribute.prototype.isID= function()
{return this.iD;}
EAttribute.prototype.setID= function(isID)
{this.iD= isID;}
EAttribute.prototype.ValidateType= function(value)
{if(value== null)
return null;var type= this.Type;var ifvalid= true;if(null== type)
{return value;}
if(
(
this.getUpperBound()== -1
|| this.getUpperBound()> 1
||(
this.getLowerBound()< this.getUpperBound()
&& this.getUpperBound()> 1
)
)
&&"object"== typeof(value)
&& value.length!= null&& value.length>= 0
)
{for(var i=0; i< value.length;++i)
{aValue= value[i];this.ValidateIndivualValueType(type, aValue);}
return value;}
var res= this.ValidateIndivualValueType(type, value);return res;}
EAttribute.prototype.ValidateIndivualValueType= function(type, value)
{if(value== null)
return null;var ifvalid= true;if("string"== type)
{if(value== null)
{value="";}else if(typeof(value)=="number"||value instanceof Date)
{return value.toString();}else if(typeof(value)=="string")
{return value;}else{ifvalid= false;}
}
if("boolean"== type)
{if("boolean"!= typeof(value))
{if(
"true"== value.toLowerCase()
||"1"== value
)
{value= true;}
else
if(
"false"== value.toLowerCase()
||"0"== value
)
{value= false;}
else
{ifvalid= false;}
}
else
{return value;}
}
if(
"byte"== type
||"integer"== type
||"int"== type
||"long"== type
||"short"== type
||"decimal"== type
||"float"== type
||"double"== type
)
{var v= value * 1;if(isNaN(v))
{ifvalid= false;}
else
{return v;}
}
if(
"unsignedByte"== type
||"positiveInteger"== type
||"nonNegativeInteger"== type
||"unsignedInt"== type
||"unsignedLong"== type
||"unsignedShort"== type
)
{var v= value * 1;if(
isNaN(v)
|| v<0
)
{ifvalid= false;}
else
{return v;}
}
if(
"nonPositiveInteger"== type
||"negativeInteger"== type
)
{var v= value * 1;if(
isNaN(v)
|| v>0
)
{ifvalid= false;}
else
{return v;}
}
if(!ifvalid)
{var args= new Array;args[0]= value;args[1]= type;var Msg= NlsFormatMsg(invalid_value_4type, args);throw new EObjectError(Msg);}
return value;}
EAttribute.prototype.ValidateCardinality= function(length)
{if(
this.getUpperBound()!= -1
&& length> this.getUpperBound()
)
{var args= new Array;args[0]= this.getUpperBound();args[1]= name;var Msg= NlsFormatMsg(maximum_size_allowed_attribute, args);throw new EObjectError(Msg);}
if(
this.getLowerBound()> 0
&& length< this.getLowerBound()
)
{var args= new Array;args[0]= this.getLowerBound();args[1]= name;var Msg= NlsFormatMsg(minimum_size_allowed_attribute, args);throw new EObjectError(Msg);}
}
function EReference(name,eclass,readonly)
{this.Name= name;this.EClass= eclass; 
this.readonly= readonly;EStructuralFeature.AddProperty(this, name);}
EReference.prototype.CLASSTYPE= EStructuralFeature.CLASSTYPE_EREFERENCE;EReference.prototype.IsContainment= true; 
EReference.prototype.LowerBound= 0; 
EReference.prototype.UpperBound= 1; 
EReference.prototype.iD= false;EReference.prototype.isReadOnly= function()
{return this.readonly;}
EReference.prototype.isContainment= function()
{return this.IsContainment;}
EReference.prototype.setContainment= function(value)
{this.IsContainment= value;}
EReference.prototype.getEReferenceType= function(value)
{return this.EClass;}
EReference.prototype.getLowerBound= function()
{return this.LowerBound;}
EReference.prototype.setLowerBound= function(value)
{this.LowerBound= value;}
EReference.prototype.getUpperBound= function()
{return this.UpperBound;}
EReference.prototype.setUpperBound= function(value)
{this.UpperBound= value;}
EReference.prototype.isID= function()
{return this.iD;}
EReference.prototype.setID= function(isID)
{this.iD= isID;}
EReference.prototype.ValidateCardinality= function(length)
{if(
this.getUpperBound()!= -1
&& length> this.getUpperBound()
)
{var args= new Array;args[0]= this.getUpperBound();args[1]= name;var Msg= NlsFormatMsg(maximum_size_allowed_reference, args);throw new EObjectError(Msg);}
if(
this.getLowerBound()> 0
&& length< this.getLowerBound()
)
{var args= new Array;args[0]= this.getLowerBound();args[1]= name;var Msg= NlsFormatMsg(minimum_size_allowed_reference, args);throw new EObjectError(Msg);}
}
function PrintEClass(eclass)
{ResetPrintFlags(eclass);return PrintEClassInternal(eclass,0);}
function ResetPrintFlags(eclass)
{eclass.bAlreadyPrinted= false;for(var i=0; i< eclass.getEAllReferences().length;++i){var ref= eclass.getEAllReferences()[i];var eclassChild= ref.getEReferenceType();if(eclassChild!= null&& eclassChild.bAlreadyPrinted)
ResetPrintFlags(eclassChild);}
}
function PrintEClassInternal(eclass,level)
{if(eclass.bAlreadyPrinted)
return"";eclass.bAlreadyPrinted= true;var ident="";for(var i=0; i< level;++i)
ident+="  ";var str= ident+"EClass: "+ eclass.Name+"\n";ident+="	 ";for(var i=0; i< eclass.getEAllAttributes().length;++i){var attr= eclass.getEAllAttributes()[i];str+= ident;if(attr.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
str+="Attribute: "+ attr.Name+" Type: "+ attr.Type+" LowerBound: "+ attr.getLowerBound()
+" UpperBound: "+ attr.getUpperBound()+"\n";else
str+="AttributeCalculate: "+ attr.Name+" Expression: "+ attr.getExpression()+"\n";}
for(var i=0; i< eclass.getEAllReferences().length;++i){var ref= eclass.getEAllReferences()[i];str+= ident+"Reference: "+ ref.Name;if(ref.getEReferenceType()!= null)
str+=" Type: "+ ref.getEReferenceType().Name;str+=" LowerBound: "+ ref.getLowerBound()
+" UpperBound: "+ ref.getUpperBound()+"\n";if(ref.getEReferenceType()!= null)
str+= PrintEClassInternal(ref.getEReferenceType(),level+4);}
return str;}
function ECreator()
{this.AddERs= function(eclass, refParams)
{if(null== eclass)
{var Msg= NlsFormatMsg(unable_create_reference, null);throw new EObjectError(Msg);}
if(refParams== null)
{var Msg= NlsFormatMsg(unable_create_reference_noreference, null);throw new EObjectError(Msg);}
for(i=0; i<refParams.length; i++)
{var ref= new EReference(refParams[i][0], refParams[i][1], refParams[i][6]);ref.setLowerBound(refParams[i][2]);ref.setUpperBound(refParams[i][3]);ref.setContainment(refParams[i][4]);ref.setID(refParams[i][5]);eclass.getEAllReferences().add(ref);}
}
this.AddEAs= function(eclass, attriParams)
{if(null== eclass)
{var Msg= NlsFormatMsg(add_attribute_2nullclass, null);throw new EObjectError(Msg);}
if(attriParams== null)
{var args= new Array;args[0]= eclass.Name;var Msg= NlsFormatMsg(no_attribute_supply, args);throw new EObjectError(Msg);}
var attr= null;for(i=0; i<attriParams.length; i++)
{var Params= attriParams[i];var Calc= Params.length> 2? Params[2]: 0;if(Calc== 0)
{attr= new EAttribute(Params[0], Params[1], Params[6]);attr.setLowerBound(Params.length> 3? Params[3]: 1);attr.setUpperBound(Params.length> 4? Params[4]: 1);attr.setID(Params.length> 5? Params[5]: 0);}
else
{attr= new EAttributeCalculate(Params[0], Params[3], Params[1]);}
eclass.getEAllAttributes().add(attr);}
}
this.Init= function(eobject, attrValueArray, referenceArray)
{if(null== eobject)
{var Msg= NlsFormatMsg(add_reference_2nullclass, null);throw new EObjectError(Msg);}
var attrs= eobject.EClass.getEAllAttributes();var counter= 0;for(i=0; i<attrs.length; i++)
{var attr= attrs[i];var name= attr.Name;if(attr.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{continue;}
if(attr.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{if(attrValueArray== null|| counter>= attrValueArray.length)
{var Msg="EClass '"+eobject.EClass.Name+"' defines at least "+(counter+1)+" non-calculate attributes, but only "+counter+" were passed";throw new EObjectError(Msg);}
if(attr.Type=="id")
{eobject.ID= attrValueArray[counter++];}
else
if(
eobject.eGet(name)!= null
|| attr.getUpperBound()== -1
|| attr.getUpperBound()> 1
||(
attr.getLowerBound()< attr.getUpperBound()
&& attr.getUpperBound()> 1
)
)
{if(attrValueArray[counter]== null|| attrValueArray[counter].length== 0)
{eobject.eSet(name, null);++counter;continue;}
eobject.eSet(name, attrValueArray[counter++]);}
else
{eobject.eSet(name, attrValueArray[counter++]);}
}
}
var refs= eobject.EClass.getEAllReferences();if(refs.length!=(referenceArray== null? 0: referenceArray.length))
{var args= new Array;args[0]= eobject.EClass.Name;args[1]= refs.length;args[2]= referenceArray.length;var Msg= NlsFormatMsg(mismatch_reference_length, args);throw new EObjectError(Msg);}
for(j=0; j<refs.length; j++)
{var ref= refs[j];var refName= ref.Name;if(
eobject.eGet(refName)!= null
|| ref.getUpperBound()== -1
|| ref.getUpperBound()> 1
||(
ref.getLowerBound()< ref.getUpperBound()
&& ref.getUpperBound()> 1
)
)
{if(referenceArray[j]== null|| referenceArray[j].length== 0)
{eobject.eSet(refName, null);continue;}
eobject.eSet(refName,referenceArray[j]);}
else
{eobject.eSet(refName,referenceArray[j]);}
}
eobject.Status= 0;}
}
function IndexMultiMapCreate()
{var ary= new Array();ary["#names"]= new Object();return ary;}
function IndexMultiMapGet(ary, name)
{var objArray= ary["#names"][name];if( objArray== undefined)
{return null;}
return objArray;}
function IndexMultiMapAddNew(ary, name, obj)
{ary[ary.length]= obj;var objArray= new Array();objArray[0]= obj;ary["#names"][name]= objArray;return objArray;}
function IndexMultiMapAdd(ary, name, obj)
{var objArray= IndexMultiMapGet(ary, name);if( objArray!= null)
{ary[ary.length]= obj;objArray[objArray.length]= obj;return objArray;}
return IndexMultiMapAddNew(ary, name, obj);}
function IndexMultiMapRemove(ary, indexOrObj)
{var obj= null;var index= -1;var name= null;if( typeof(indexOrObj)=="number")
{obj= ary[indexOrObj];index= indexOrObj;}
else
{obj= indexOrObj;for( var i= ary.length - 1; i>= 0; --i)
{if( this[i]== obj)
{index= i;break;}
}
}
var names= ary["#names"];for( name in names)
{var objArray= names[name];for( var i= objArray.length - 1; i>= 0; --i)
{if( objArray[i]!= obj)
{continue;}
if( objArray.length== 1)
{delete names[name];break;}
var endIndex= objArray.length - 1;for( var j= i; j< endIndex;++j)
{objArray[j]= objArray[j+1];}
objArray.length= endIndex;}
}
if( obj== null)
{return null;}
if(index>-1){var endIndex= ary.length - 1;for( var i= index; i< endIndex;++i)
{ary[i]= ary[i+1];}
ary.length= endIndex;}
return obj;}
function EObject(eclass)
{ 
this.EClass= eclass;this.ID= NewID(); 
this.Members= IndexMapCreate(); 
this.Members.Get= function(name)
{var res= IndexMapGet(this, name);return res;}
this.Containers= IndexMapCreate(); 
 
this.PropertyBinders= IndexMultiMapCreate(); 
this.PropertyBinders.Add= function(propertyBinder) 
{IndexMultiMapAdd(this, propertyBinder.PropertyName, propertyBinder);return propertyBinder;}
this.PropertyBinders.Get= function(name) 
{var objArray= IndexMultiMapGet(this, name);return objArray;}
this.PropertyBinders.Remove= function(propertyBinder)
{var res= IndexMultiMapRemove(this, propertyBinder);return res;}
this.PropertyArrayBinders= IndexMultiMapCreate(); 
this.PropertyArrayBinders.Add= function(propertyArrayBinder) 
{IndexMultiMapAdd(this, propertyArrayBinder.PropertyName, propertyArrayBinder);return propertyArrayBinder;}
this.PropertyArrayBinders.Get= function(name) 
{var objArray= IndexMultiMapGet(this, name);return objArray;}
this.PropertyArrayBinders.Remove= function(propertyArrayBinder)
{var res= IndexMultiMapRemove(this, propertyArrayBinder);return res;}
}
EObject.prototype.SERVER_COPY=0; 
EObject.prototype.UPDATED=1; 
EObject.prototype.NEW=2; 
EObject.prototype.DELETED= 4; 
EObject.prototype.CHILD_UPDATED=8; 
EObject.prototype.CHILD_REMOVED_OR_ADDED= 16; 
EObject.prototype.REF_NEW= 32; 
EObject.prototype.REF_DELETED= 64; 
EObject.prototype.REF_ADDED= 128; 
EObject.prototype.REF_REMOVED= 256; 
EObject.prototype.IsRoot= false; 
EObject.prototype.Status= null;EObject.prototype.Processed= false;EObject.prototype.ChangedPropertyCount= 0;EObject.prototype.signature="";EObject.prototype.ACTION_ADD= 0;EObject.prototype.ACTION_REMOVE= 1;EObject.prototype.GetMember= function(name)
{var res= IndexMapGet(this.Members, name);return res;}
EObject.prototype.AddMember= function(name, eStructuralFeature) 
{function Member(name, eStructuralFeature, value)
{this.Name= name;this.EStructuralFeature= eStructuralFeature;this.Value= value;this.OriginalValue= null;this.addedAndremovedObjStatus= null;}
var member= this.GetMember(name);if( member== null)
{member= new Member(name, eStructuralFeature, null);IndexMapAddNew(this.Members, name, member);this.AddProperty(name, eStructuralFeature);}
return member;}
EObject.prototype.FindMember= function(name) 
{var member= this.GetMember(name);if(member!= null)
{return member;}
var sf= this.EClass.getEStructuralFeature(name);if(sf== null)
{return undefined;}
if(
sf.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTE
|| sf.Type!="id"
)
{var res= this.AddMember(sf.Name,sf);return res;}
return undefined;}
EObject.prototype.AddContainer= function(eobject, memberOfEobject) 
{var existsObj= IndexMapGet(this.Containers, eobject.ID);if( existsObj== null)
{var data= new Array();data[0]= eobject;data[1]= memberOfEobject;IndexMapAdd(this.Containers, eobject.ID, data);}
}
EObject.prototype.RemoveContainer= function(eobject) 
{var data= IndexMapGet(this.Containers, eobject.ID);if(data!= null)
{IndexMapRemove(this.Containers, eobject.ID);}
}
EObject.prototype.CreateEObject= function(propertyName)
{var eclass= null;var member= this.GetMember(propertyName);if(
member!= null
&& member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
)
{eclass= member.EStructuralFeature.getEReferenceType();}
if(null== eclass)
{var args= new Array();args[0]= propertyName;var Msg= NlsFormatMsg(unable_create_object, args);throw new EObjectError(Msg);}
var eobject= eclass.getEPackage().getEFactoryInstance().create(eclass);eobject.Status= this.NEW;return eobject;}
EObject.prototype.Clone= function() 
{var eobject= new EObject(this.EClass);eobject.ID= NewID();for(var i= 0; i< this.Members.length;++i)
{var member= eobject.AddMember(this.Members[i].Name, this.Members[i].EStructuralFeature);if(this.Members[i].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{eobject.eSet(this.Members[i].Name,this.eGet(this.Members[i].Name));}
}
eobject.Status= this.NEW;return eobject;}
EObject.prototype.CloneForDeletion= function() 
{var eobject= new EObject(this.EClass);eobject.ID= this.ID;for(var i= 0; i< this.Members.length;++i)
{var member= eobject.AddMember(this.Members[i].Name, this.Members[i].EStructuralFeature);if(this.Members[i].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{eobject.eSet(this.Members[i].Name,this.eGet(this.Members[i].Name));member.OriginalValue= this.Members[i].OriginalValue;}
}
return eobject;}
EObject.prototype.GetChildrenEObjects= function(deep) 
{var arr= new Array();this.GetChildrenEObjectsInternal(arr,deep);return arr;}
EObject.prototype.GetChildrenEObjectsInternal= function(arr,deep) 
{function EObjectAddArray(arr, value) 
{for(var i= 0; i< arr.length;++i){if(arr[i]== value)
{return false;}
}
arr[arr.length]= value;return true;}
for(var i= 0; i< this.Members.length;++i)
{var ef= this.Members[i].EStructuralFeature;if(ef.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EREFERENCE)
{continue;}
var value= this.eGet(this.Members[i].Name);if(value== null|| value==" ") 
{continue;}
if(value.length!= null)
{for(var j= 0; j< value.length;++j)
{if(EObjectAddArray(arr,value[j]))
{if(deep!= null&& deep)
{value[j].GetChildrenEObjectsInternal(arr,deep);}
}
}
}
else
{if(EObjectAddArray(arr,value))
{if(deep!= null&& deep)
{value.GetChildrenEObjectsInternal(arr,deep);}
}
}
}
}
EObject.prototype.childrenlen= function(memberName)
{var value= this.eGet(memberName);if(value!=null&&typeof(value)=="object"){if(value.length!=null)
return value.length;else
return 1; 
}
return null;}
EObject.prototype.GetOrigAttrValOrCurrRefObj= function(name) 
{var member= this.GetMember(name);if(member== null)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(invalid_property, args);throw new EObjectError(Msg);}
if(member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{if(member.OriginalValue!= null)
{return member.OriginalValue;}
else
{return member.Value;}
}
else
if(member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{return member.Value;}
}
EObject.prototype.GetCurAttrValOrCurAndDelRefObj= function(name) 
{var member= this.GetMember(name);if(member== null)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(invalid_property, args);throw new EObjectError(Msg);}
if(member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{return member.Value;}
else
if(member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{if(
member.OriginalValue!= null
&& member.Value!= null
)
{var v= new Array();if(
"object"== typeof(member.Value)
&& member.Value.length!= null
&& member.Value.length>= 0
)
{for(i=0;i<member.Value.length;i++)
{v[v.length]= member.Value[i];}
}
else
{v[v.length]= member.Value;}
for(i=0;i<member.OriginalValue.length;i++)
{v[v.length]= member.OriginalValue[i];}
return v;}
else
if(
member.OriginalValue!= null
&& member.Value== null
)
{return member.OriginalValue;}
else
{return member.Value;}
}
}
EObject.prototype.AddProperty= function(name, estructuralFeature)
{var setter="set"+ uppercaseFirstLetter(name);if( this[setter]== undefined)
{this[setter]= estructuralFeature.Setter;}
var getter="get"+ uppercaseFirstLetter(name);if( this[getter]== undefined)
{this[getter]= estructuralFeature.Getter;}
}
EObject.prototype.AddToOriginalArrayForERef= function(member, deletedObj, isDelete)
{var v= null;if(null== member.OriginalValue)
{v= new Array();}
else
{if(
"object"== typeof(member.OriginalValue)
&& member.OriginalValue.length!= null
&& member.OriginalValue.length>= 0
)
{v= member.OriginalValue;}
else
{v= new Array();v[v.length]= member.OriginalValue;}
}
deletedObj.RemoveContainer(this);if(member.EStructuralFeature.IsContainment== true|| isDelete== true)
{c= deletedObj.CloneForDeletion();c.Status= this.DELETED;v[v.length]= c;for( var i= deletedObj.Containers.length - 1; i>= 0; --i)
{var data= deletedObj.Containers[i];var conatiner= data[0];var memberOfContainer= data[1];conatiner.eRemove( memberOfContainer.Name, deletedObj);}
}
else
{v[v.length]= deletedObj;}
if(member.addedAndremovedObjStatus== null)
{member.addedAndremovedObjStatus= IndexMapCreate();}
var refStatus= IndexMapGet(member.addedAndremovedObjStatus, deletedObj.ID);if(refStatus== null|| refStatus== undefined)
{if(member.EStructuralFeature.IsContainment== true|| isDelete== true)
{IndexMapAdd(member.addedAndremovedObjStatus, deletedObj.ID, this.REF_DELETED);}
else
{IndexMapAdd(member.addedAndremovedObjStatus, deletedObj.ID, this.REF_REMOVED);}
}
else
{if(refStatus== this.REF_ADDED|| refStatus== this.REF_NEW)
{IndexMapRemove(member.addedAndremovedObjStatus, deletedObj.ID);}
}
member.OriginalValue= v;}
EObject.prototype.AddToOriginalArrayEAttr= function(member, currentValue)
{if(member.OriginalValue== null)
{member.OriginalValue= member.value;this.ChangedPropertyCount++;this.Status= this.Status| this.UPDATED;}
else
{if(this.CompareAttrArray(member.OriginalValue, currentValue)== true)
{member.OriginalValue= null;this.ChangedPropertyCount--;if(this.ChangedPropertyCount== 0)
{this.Status= this.SERVER_COPY;}
}
else
{}
}
}
EObject.prototype.CompareAttrArray= function(originalValArray, currentValueArray)
{if(currentValueArray== null)
{return false;}
if(originalValArray.length!= currentValueArray.length)
{return false;}
for(var i=0; i<originalValArray.length; i++)
{if(originalValArray[i]!= currentValueArray[i])
{return false;}
}
return true;}
EObject.prototype.eAdd= function(name,value, refreshRequired) 
{ 
if(refreshRequired==undefined)
refreshRequired=true; 
var member= this.FindMember(name);if(member== null)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(invalid_property, args);alert(Msg);throw new EObjectError(Msg);}
if( this.Status!= null)
{if( member.EStructuralFeature.isReadOnly()== 1)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(property_cant_change, args);throw new EObjectError(Msg);}
}
var v= null;if(null== member.Value)
{v= new Array();}
else
{if(
"object"== typeof(member.Value)
&& member.Value.length!= null
&& member.Value.length>= 0
)
{v= member.Value;}
else
{v= new Array();v[v.length]= member.Value;}
}
if(this.EClass!= null)
{this.EClass.ValidateCardinality(name,v.length+ 1);}
v[v.length]= value;if(
this.Status== null
||(this.Status& this.NEW)
|| this.EClass.DiffgramNeeded== false
)
{}
else if(
member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
)
{if(member.addedAndremovedObjStatus== null)
{member.addedAndremovedObjStatus= IndexMapCreate();}
var refStatus= IndexMapGet(member.addedAndremovedObjStatus, value.ID);var firstTimeAdded= false;if(value.Containers== null|| value.Containers.length< 1)
{firstTimeAdded= true;}
if(refStatus== null|| refStatus== undefined)
{if(firstTimeAdded== true&& value.Status== this.NEW)
{IndexMapAdd(member.addedAndremovedObjStatus, value.ID, this.REF_NEW);}
else
{IndexMapAdd(member.addedAndremovedObjStatus, value.ID, this.REF_ADDED);}
}
else
{if(refStatus== this.REF_REMOVED|| refStatus== this.REF_DELETED)
{IndexMapRemove(member.addedAndremovedObjStatus, value.ID);}
}
}
else
if(member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{this.AddToOriginalArrayEAttr(member, v);}
member.Value= v;if(
value!= null
&& typeof(value)=="object"
&& value.length== null
)
{var containerMember= IndexMapGet(this.Containers, this.ID);if(containerMember== null)
{value.AddContainer(this, member);}
}
 
if(refreshRequired)
{var propertyBinders= this.PropertyBinders;var propertyNamedBinders= propertyBinders.Get(name)
if( propertyNamedBinders!= null)
{for(var i= propertyNamedBinders.length - 1; i>= 0; --i)
{var propertyBinder= propertyNamedBinders[i];propertyBinder.FireValueChanged(name, value, propertyBinder.index);}
}
 
for(var i= 0; i< this.PropertyArrayBinders.length;++i)
{this.PropertyArrayBinders[i].FireRowAdded(name,value);}
}
 
 
if(value.Status== this.NEW){var epkg= value.EClass.getEPackage();if(epkg)
{epkg.activateEvent("ONCREATE",value);epkg= this.EClass.getEPackage();epkg.activateEvent("ONUPDATE",this);}
value.isNewAndInitialized= true;}
}
EObject.prototype.eGet= function(name) 
{var member= this.FindMember(name);if(null== member)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(invalid_property, args);alert(Msg);throw new EObjectError(Msg);}
var estructuralFeature= member.EStructuralFeature;if(
estructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE
)
{return member.Value;}
try
{var str= estructuralFeature.getExpression();member.Value= eval(str);return member.Value;}
catch(e)
{var args= new Array;args[0]= member.EStructuralFeature.getExpression();args[1]= e.description;var Msg= NlsFormatMsg(invalid_expression, args);throw new EObjectError(Msg);}
}
EObject.prototype.Refresh= function(name,value)
{var propertyBinders= this.PropertyBinders;var propertyNamedBinders= propertyBinders.Get(name)
if( propertyNamedBinders!= null)
{for(var i= propertyNamedBinders.length - 1; i>= 0; --i)
{var propertyBinder= propertyNamedBinders[i];propertyBinder.FireValueChanged(name, value, propertyBinder.index);}
}
var length= this.Members.length;for(var i= 0; i< length;++i)
{var member= this.Members[i];if(member.EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{continue;}
member.Value= undefined;var name= member.Name;var propertyNamedBinders= propertyBinders.Get(name);if( propertyNamedBinders== null)
{continue;}
for(var j= propertyNamedBinders.length - 1; j>= 0; --j)
{propertyNamedBinders[j].FireValueChanged(name, this.eGet(name));}
}
}
EObject.prototype.eSet= function(name,value,refreshRequired) 
{if(refreshRequired==undefined)
refreshRequired=true; 
var member= this.FindMember(name);if(null== member)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(invalid_property, args);alert(Msg);throw new EObjectError(Msg);}
var estructuralFeature= member.EStructuralFeature; 
if( this.Status!= null)
{if( estructuralFeature.isReadOnly()== 1)
{var args= new Array;args[0]= name; 
var Msg= NlsFormatMsg(property_cant_change, args); 
 
throw new EObjectError(Msg);}
}
if(this.Status!= null&& this.EClass!= null)
{value= this.EClass.ValidateType(name, value);}
var bChanged= false;if(member.Value!= value)
{if(this.Status!= null)
{if(value== null)
{estructuralFeature.ValidateCardinality(1);}
else
if(
typeof(value)=="object"
&& value.length!= null
)
{estructuralFeature.ValidateCardinality(value.length);}
}
if(
this.Status== null
||(this.Status& this.NEW)
|| this.EClass.DiffgramNeeded== false
)
{}
else
if(this.Processed== true)
{this.Processed= false;}
else
{if( member.OriginalValue== null)
{this.Status= this.Status| this.UPDATED;this.ChangedPropertyCount++;member.OriginalValue= member.Value;}
else
if(
member.OriginalValue!= null
&& member.OriginalValue== value
)
{this.ChangedPropertyCount--;member.OriginalValue= null;if(this.ChangedPropertyCount== 0)
{this.Status= this.SERVER_COPY;}
}
else
if(
member.OriginalValue!= null
&& member.OriginalValue!= value
)
{}
}
member.Value= value;bChanged= true;}
if(estructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{if( value!= null&& typeof(value)=="object"&& value.length== null)
{value.AddContainer(this, member);}
else if(value!= null&& typeof(value)=="object"&& value.length!= null)
{for(var i=0; i<value.length; i++)
{if(value[i]){value[i].AddContainer(this, member);}
}
}
}
 
if(this.Status!= null&& bChanged&& refreshRequired)
{this.Refresh(name,value);if(( this.Status== this.NEW)&&(!this.isNewAndInitialized)){}else{var epkg= this.EClass.getEPackage();if(epkg)
{if(epkg.activateEvent("ONUPDATE",this)== false){}
}
} 
}
 
return true;}
EObject.prototype.eRemove= function(name, value, isDelete, refreshRequired) 
{if(refreshRequired==undefined)
refreshRequired=true;var member= this.GetMember(name);var v= this.eGet(name);if(null== v)
{if(null== this.EClass)
{return;}
var args= new Array;args[0]= name;var Msg= NlsFormatMsg(invalid_property, args);alert(Msg);throw new EObjectError(Msg);}
if( member.EStructuralFeature.isReadOnly()== 1)
{var args= new Array;args[0]= name;var Msg= NlsFormatMsg(property_cant_change, args);throw new EObjectError(Msg);}
this.Processed=true; 
if(
"object"== typeof(v)
&& v.length>= 0
)
{var arr= new Array();for(var i= 0; i< v.length;++i)
{if(v[i]!= value)
{arr[arr.length]= v[i];}
else
if(
member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
&& v[i]== value
&& value.Status!= value.NEW
)
{var eobject= v[i];if(this.EClass.DiffgramNeeded== true)
{this.AddToOriginalArrayForERef(member, eobject, isDelete);}
}
else
{}
}
v= arr;var epkg= value.EClass.getEPackage();if(epkg)
{if( epkg.activateEvent("ONDELETE",value)== false)
{}
}
}
else
{v= null;if(
member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
&& this.EClass.DiffgramNeeded== true
)
{}
}
if(member.EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{if(this.EClass.DiffgramNeeded== true)
{this.AddToOriginalArrayForAttr(member, v);}
}
this.eSet(name,v);if(refreshRequired)
{for(var i= 0; i< this.PropertyArrayBinders.length;++i)
{this.PropertyArrayBinders[i].FireRowDeleted(name,value);}
}
}
EObject.prototype.Sort= function(propertyname,sortOrder) 
{var rows= this.eGet(propertyname);if(
null== rows
|| typeof(rows)!="object"
|| rows.length== null
|| rows.length<= 0
)
{return;}
sortOrder= Trim(sortOrder);if(
null== sortOrder
|| sortOrder.length== 0
)
{return;}
var columns= sortOrder.split(",");if(0== columns.length)
{return;}
var sortArray= SortRows(columns[0],rows);sortArray= SortAllColumns(sortArray,columns,1);rows= new Array();for(var i= 0; i< sortArray.length;++i)
{rows[rows.length]= sortArray[i].m_row;}
this.eSet(propertyname,rows);}
EObject.prototype.toStr= function(level)
{level=(level==null)?'': level+'  ';var refStr=" ";var childStr="";var lineBreak="\n";var str= level+"<"+this.EClass.Name+" id="+ this.ID+" ";for(var i= 0; i< this.Members.length;++i){if(this.Members[i].EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
continue;if(this.Members[i].EStructuralFeature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EREFERENCE)
str+= this.Members[i].Name+"= \""+ this.eGet(this.Members[i].Name)+"\" ";else
{var child= this.eGet(this.Members[i].Name);if(this.Members[i].EStructuralFeature.IsContainment== true)
{if(child!= null&& child.length!= null)
{for(var j= 0; j< child.length; j++)
{childStr+= child[j].toStr(level);}
}
else if(child!= null)
{childStr+= child.toStr(level);}
}
else
{if(child!= null&& child.length!= null)
{for(var j= 0; j< child.length; j++)
{str+= this.Members[i].Name+"= \"";str+=(child[j]== null?"null":child[j].ID)+"\" ";}
}
else if(child!= null)
{str+= this.Members[i].Name+"= \"";str+= child.ID+"\" ";}
}
}
}
return childStr==""? str+ refStr+"/>"+lineBreak
: str+ refStr+">"+lineBreak+ childStr+ level+"</"+ this.EClass.Name+">"+lineBreak;}
EObject.prototype.getSignature= function(parent)
{var signature= this.EClass.Name;var name= null;var value= null;for(var i= 0; i< this.Members.length;++i)
{var feature= this.Members[i].EStructuralFeature;if(feature.iD== true)
{name= this.Members[i].Name;value= this.GetCurAttrValOrCurAndDelRefObj(name);if(feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{if(
(
feature.getUpperBound()== -1
|| feature.getUpperBound()> 1
||(
feature.getLowerBound()< feature.getUpperBound()
&& feature.getUpperBound()> 1
)
)
&& value.length!= null
&&"number"== typeof(value.length)
)
{var args= new Array;args[0]= name;args[1]= this.EClass.Name;var Msg= NlsFormatMsg(multivalue_attr_as_key_error, args);throw new EObjectError(Msg);}
else
{signature= signature+ value;}
}
else
if(feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{if(value!=null)
{if("object"== typeof(value)&& value.length== null&&(!parent|| value!= parent))
{signature= signature+ value.getSignature(this);}
else if(value!= parent) 
{var args= new Array;args[0]= name;args[1]= eobject.EClass.Name;var Msg= NlsFormatMsg(ereference_list_as_key_error, args);throw new EObjectError(Msg);}
}
}
}
}
this.signature= signature;return this.signature;}
function GetArrayOfIDs(idref)
{if(
null== idref
|| 0== idref.length
)
{return new Array();}
while(
idref.length> 0
&&" "== idref.substring(0,1)
)
{idref= idref.substring(1,idref.length);}
var arr= new Array();while(idref.length> 0)
{var index= idref.indexOf(" ");if(index>= 0)
{arr[arr.length]= idref.substring(0,index);idref= idref.substring(index+1,idref.length);while(
idref.length> 0
&&" "== idref.substring(0,1)
)
{idref= idref.substring(1,idref.length);}
}
else
{arr[arr.length]= idref;idref="";}
}
return arr;}
function GetXMLString(level,node, isPortal)
{var linebreak="";var tabs="";if(
level!= null
&& typeof(level)=="number"
)
{linebreak="\n";for(var i= 0; i< level;++i)
{tabs+="  ";}
}
var xml= tabs;if(node.nodeType== 3)
{var res=(xml+ node.nodeValue);return res;}
if(isPortal=='undefined'|| isPortal== false)
{xml+="<";}
else
{xml+="&lt;'";}
if(node.nodeType== 7)
{xml+="?";}
xml+= node.nodeName;if(node.nodeType== 7)
{xml+=" "+ node.data;}
else
{for(var i= 0; i< node.attributes.length;++i)
{var attr= node.attributes.item(i);xml+="  "+ attr.name+"=\""+ attr.value+"\"";}
}
if(node.childNodes.length> 0)
{if(isPortal=='undefined'|| isPortal== false)
{xml+=">";}
else
{xml+="&gt;'";}
var newline="";for(var i= 0; i< node.childNodes.length;++i)
{var n= node.childNodes[i];if(n.nodeType== 1)
{xml+= linebreak+ GetXMLString((level!= null&& typeof(level)=="number")? level+1: null, n, isPortal);newline= linebreak+ tabs;}
else
{xml+= n.nodeValue;}
}
if(isPortal=='undefined'|| isPortal== false)
{xml+= newline+"</"+ node.nodeName+">";}
else
{xml+= newline+"&lt;'/"+ node.nodeName+"&gt;'";}
}
else
{if(isPortal=='undefined'|| isPortal== false)
{xml+=(node.nodeType== 7)?" ?>":" />";}
else
{xml+=(node.nodeType== 7)?" ?&gt;'":" /&gt;'";}
}
return xml;}
function RemoveElement(arr,nameOrIndexOrObject)
{var obj= null;if("string"== typeof(nameOrIndexOrObject))
{for(var i= 0; i< arr.length;++i)
{if(arr[i].Name== nameOrIndexOrObject)
{obj= arr[i];arr[i]= null;}
}
}
else
{if("number"== typeof(nameOrIndexOrObject))
{if(
nameOrIndexOrObject< 0
|| nameOrIndexOrObject>= arr.length
)
{var Msg= NlsFormatMsg(invalid_argument, null);throw new EObjectError(Msg);}
obj= arr[nameOrIndexOrObject];arr[nameOrIndexOrObject]= null;}
else
{for(var i= 0; i< arr.length;++i)
{if(arr[i]== nameOrIndexOrObject)
{obj= arr[i];arr[i]= null;}
}
}
}
if(null== obj)
{var Msg= NlsFormatMsg(invalid_argument, null);throw new EObjectError(Msg);}
for(var i= 0; i< arr.length;++i)
{if(null== arr[i])
{for(var j= i; j<(arr.length - 1);++j)
{arr[j]= arr[j+1];}
--arr.length;}
}
return obj;}
function LoadXMLString(value)
{var xmlDoc= null;if(navigator.appName=="Netscape")
{var parser= new DOMParser();xmlDoc= parser.parseFromString(value,"text/xml");}
else
{if(window.ActiveXObject)
{xmlDoc= new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async= false;}
if(!xmlDoc.loadXML(value))
{var args= new Array;args[0]= xmlDoc.parseError.line;args[1]= xmlDoc.parseError.linepos;args[2]= xmlDoc.parseError.srcText;args[3]= xmlDoc.parseError.reason;var Msg= NlsFormatMsg(xml_parse_error, args);throw new EObjectError(Msg);}
}
return xmlDoc;}
function LoadXML(url)
{var xmlDoc= null;if(navigator.appName=="Netscape")
{var p= new XMLHttpRequest();p.open("GET",url,false);p.send(null);xmlDoc= p.responseXML;}
else
{if(window.ActiveXObject)
{xmlDoc= new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async= false;}
if(!xmlDoc.load(url))
{var args= new Array;args[0]= xmlDoc.parseError.line;args[1]= xmlDoc.parseError.linepos;args[2]= xmlDoc.parseError.srcText;args[3]= xmlDoc.parseError.reason;var Msg= NlsFormatMsg(xml_parse_error, args);throw new EObjectError(Msg);}
}
return xmlDoc;}
function CreateDocument()
{var xmlDoc= null;if(navigator.appName=="Netscape")
{xmlDoc= document.implementation.createDocument("","", null);}
else
{if(window.ActiveXObject)
{xmlDoc= new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async= false;}
}
return xmlDoc;}
function EObjectError(d)
{this.description= d;this.toString= function(){ return d;}
}
function XMILoader(eclassroot, rootMemberName, ecoreNS)
{this.NODE_ELEMENT= 1;this.NODE_ATTRIBUTE= 2;this.NODE_TEXT= 3;this.NODE_CDATA_SECTION= 4;this.NODE_ENTITY_REFERENCE= 5;this.NODE_ENTITY= 6;this.NODE_PROCESSING_INSTRUCTION= 7;this.NODE_COMMENT= 8;this.NODE_DOCUMENT= 9;this.NODE_DOCUMENT_TYPE= 10;this.NODE_DOCUMENT_FRAGMENT= 11;this.NODE_NOTATION= 12;this.XMINS="http://www.omg.org/XMI";this.ODCNS="http://www.ibm.com/odc";this.ODCSTATUS="ODCstatus";this.ODCID="ODCid";this.ECORENS= ecoreNS;this.RootMemberName=rootMemberName;this.CURRENT_MODE=0;this.ORIGINAL_MODE=1;this.Root= null;this.EClass= eclassroot;this.Objects= new Array(); 
if(this.EClass!= null)
{this.Root= new EObject(this.EClass);this.Root.IsRoot= true;}
this.LoadXMIString= function(varString)
{var xmlDoc= LoadXMLString(varString);if(null== xmlDoc)
{return null;}
return this.LoadXMIDoc(xmlDoc);}
this.LoadXMI= function(url)
{if(null== this.EClass)
{var Msg= NlsFormatMsg(missing_model, null);throw new EObjectError(Msg);}
var xmlDoc= LoadXML(url);if(null== xmlDoc)
{return null;}
var res= this.LoadXMIDoc(xmlDoc);return res;}
this.LoadXMIDoc= function(xmlDoc)
{if(null== this.EClass)
{var Msg= NlsFormatMsg(missing_model, null);throw new EObjectError(Msg);}
if(null== xmlDoc)
{return null;}
this.Objects= new Array();var element= xmlDoc.documentElement;for(var i= 0; i< element.childNodes.length;++i)
{var node= element.childNodes[i];if(node.nodeType== this.NODE_ELEMENT)
{var name= node.nodeName;var index= name.indexOf(":");if(index!= -1)
{name= name.substring(index+1,name.length);}
if(name!="Documentation")
{var reference= this.Root.EClass.getEStructuralFeature(node.nodeName);if(null== reference|| reference.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EREFERENCE)
{var args= new Array;args[0]= node.nodeName;args[1]= this.Root.EClass.Name;var Msg= NlsFormatMsg(reference_missing_inmodel, args);throw new EObjectError(Msg);}
if(reference.getEReferenceType()== null)
{var args= new Array;args[0]= reference.Name;args[1]= this.Root.EClass.Name;var Msg= NlsFormatMsg(reference_not_class, args);throw new EObjectError(Msg);}
var obj= new EObject(reference.getEReferenceType());this.LoadXMIElement(obj,node);var member= this.Root.AddMember(node.nodeName,reference);var bIsArray= false;if(
this.Root.eGet(node.nodeName)!= null
|| reference.getUpperBound()== -1
)
{bIsArray= true;}
if(!bIsArray)
{var diff= reference.getUpperBound() - reference.getLowerBound();if(diff> 1||(diff== 1&& reference.getLowerBound()> 0))
{bIsArray= true;}
}
if(bIsArray)
{this.Root.eAdd(node.nodeName,obj);}
else
{this.Root.eSet(node.nodeName,obj);}
}
}
}
var bIsSorted= false;for(var i= 0; i< this.Objects.length;++i)
{var eobject= this.Objects[i];for(var j= 0; j< eobject.Members.length;++j)
{var value= eobject.Members[j].Value;var eReference= eobject.Members[j].EStructuralFeature;if(
"string"!= typeof(value)
|| eReference.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EREFERENCE
)
{continue;}
var name= eobject.Members[j].Name;var lowerBound= eReference.getLowerBound();var upperBound= eReference.getUpperBound();var valueArr= GetArrayOfIDs(value);valueArr.sort();eobject.Members[j].EStructuralFeature.ValidateCardinality(valueArr.length);var objComp= null;if(eReference.getEReferenceType()!= null)
{if(!eReference.getEReferenceType().IsSorted)
{eReference.getEReferenceType().Objects.sort(this.SortEObject);eReference.getEReferenceType().IsSorted= true;}
objComp= eReference.getEReferenceType().Objects;}
else
{if(!bIsSorted)
{this.Objects.sort(this.SortEObject);bIsSorted= true;}
objComp= this.Objects;}
var z= 0;for(var k= 0; k< valueArr.length;++k)
{var bFound= false;while(z< objComp.length)
{if(objComp[z].ID> valueArr[k])
{break;}
if(objComp[z].ID== valueArr[k])
{valueArr[k]= objComp[z];eReference.EClass= objComp[z].EClass;eReference.Type= objComp[z].EClass.Name;if(objComp!= objComp[z].EClass.Objects)
{objComp= objComp[z].EClass.Objects;z= 0;}
bFound= true;break;}
++z;}
if(!bFound)
{var args= new Array;args[0]= valueArr[k];args[1]= name;args[2]= eobject.EClass.Name;var Msg= NlsFormatMsg(reference_not_indocument, args);throw new EObjectError(Msg);}
}
if(valueArr.length> 0)
{if(
-1== upperBound
||(
lowerBound< upperBound
&& upperBound> 1
)
|| upperBound>1
)
{eobject.eSet(name,valueArr);}
else
{eobject.eSet(name,valueArr[0]);}
}
else
{eobject.eSet(name,null);}
}
}
this.Objects= null;return this.Root;}
this.SortEObject= function(sortObj1,sortObj2)
{if(sortObj1== sortObj2|| sortObj1.ID== sortObj2.ID)
return 0;return(sortObj1.ID> sortObj2.ID)? 1: -1;}
this.LoadXMIElement= function(eobject,element) 
{for(var i= 0; i< eobject.EClass.getEAllAttributes().length;++i)
{var structFeature= eobject.EClass.getEAllAttributes()[i];if(
structFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE
&& structFeature.Type=="id"
)
{continue;}
eobject.AddMember(structFeature.Name,structFeature);}
for(var i= 0; i< eobject.EClass.getEAllReferences().length;++i)
{var structFeature= eobject.EClass.getEAllReferences()[i];eobject.AddMember(structFeature.Name,structFeature);}
for(var i= 0; i< element.attributes.length;++i)
{var attribute= element.attributes.item(i);var name= attribute.name;var structFeature= eobject.EClass.getEStructuralFeature(name);if(null== structFeature)
{var args= new Array;args[0]= name;args[1]= eobject.EClass.Name;var Msg= NlsFormatMsg(class_missing_inmodel, args);throw new EObjectError(Msg);}
if(structFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{var args= new Array;args[0]= structFeature.Name;var Msg= NlsFormatMsg(attributecalculate_missing_indata, args);throw new EObjectError(Msg);}
if(structFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{if(structFeature.Type=="id")
{eobject.ID= attribute.value;continue;}
}
eobject.eSet(name,attribute.value);}
if(eobject.ID== null)
{eobject.ID= NewID();}
this.Objects[this.Objects.length]= eobject;if(eobject.EClass.Objects== null)
{eobject.EClass.Objects= new Array();eobject.EClass.IsSorted= false;}
eobject.EClass.Objects[eobject.EClass.Objects.length]= eobject;for(var i= 0; i< element.childNodes.length;++i)
{var node= element.childNodes[i];if(node.nodeType== this.NODE_ELEMENT)
{var aValue= null;var member= eobject.EClass.getEStructuralFeature(node.nodeName);if(null== member)
{var args= new Array;args[0]= node.nodeName;args[1]= eobject.EClass.Name;var Msg= NlsFormatMsg(member_missing_inmodel, args);throw new EObjectError(Msg);}
var bIsArray= false;if(
eobject.eGet(node.nodeName)!= null
|| member.getUpperBound()== -1
)
{bIsArray= true;}
if(!bIsArray)
{var diff= member.getUpperBound() - member.getLowerBound();if(
diff> 1
||(
diff== 1
&& member.getLowerBound()> 0
)
)
{bIsArray= true;}
}
if(member.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE)
{if(bIsArray== false)
{var args= new Array;args[0]= member.Name;args[1]= eobject.EClass.Name;var Msg= NlsFormatMsg(attribute_not_multivalue_inmodel, args);throw new EObjectError(Msg);}
aValue= node.childNodes[0].nodeValue;}
else
if(member.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{if(member.getEReferenceType()== null)
{var args= new Array;args[0]= member.Name;args[1]= eobject.EClass.Name;var Msg= NlsFormatMsg(reference_not_class, args);throw new EObjectError(Msg);}
var aValue= new EObject(member.getEReferenceType());this.LoadXMIElement(aValue,node);}
else
{var args= new Array;args[0]= node.nodeName;args[1]= eobject.EClass.Name;var Msg= NlsFormatMsg(member_not_eatt_or_eref_inmodel, args);throw new EObjectError(Msg);}
if(bIsArray)
{eobject.eAdd(node.nodeName,aValue);}
else
{eobject.eSet(node.nodeName,aValue);}
}
}
return eobject;}
this.SaveXMI= function()
{if(null== this.Root)
{return null;}
if(this.RootMemberName== null)
{var Msg= NlsFormatMsg(root_member_name_missing_error, null);throw new EObjectError(Msg);}
this.Objects= new Array();var xmlDoc= CreateDocument();xmlDoc.appendChild(xmlDoc.createProcessingInstruction("xml","version=\"1.0\" encoding=\"utf-8\""));var rootElement= xmlDoc.createElement("xmi:XMI");rootElement.setAttribute("xmi:version","2.0");rootElement.setAttribute("xmlns:xmi",this.XMINS);xmlDoc.appendChild(rootElement);var docElem= xmlDoc.createElement("xmi:Documentation");rootElement.appendChild(docElem);var node= xmlDoc.createElement("exporter");node.appendChild(xmlDoc.createTextNode("XMI Script Serializer"));docElem.appendChild(node);node= xmlDoc.createElement("exporterVersion");node.appendChild(xmlDoc.createTextNode("1.0"));docElem.appendChild(node);var member= this.Root.GetMember(this.RootMemberName);var value= member.Value;if(value!= null)
{if(value.length!= null&&"number"== typeof(value.length))
{for(var j= 0; j< value.length;++j)
{this.SaveXMIElement(xmlDoc, member.Name,rootElement,value[j]);}
}
else
{this.SaveXMIElement(xmlDoc, member.Name,rootElement,value);}
}
return xmlDoc;}
this.SaveXMIElement= function(xmlDoc,nodename,parentElement,eobject)
{for(var i= 0; i< this.Objects.length;++i)
{if(eobject== this.Objects[i])
{return;}
}
this.Objects[this.Objects.length]= eobject;var elem= xmlDoc.createElement(nodename);elem.setAttribute(this.ODCID,eobject.ID);parentElement.appendChild(elem);for(var i= 0; i< eobject.Members.length;++i)
{var feature= eobject.Members[i].EStructuralFeature;if(feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE)
{continue;}
var name= eobject.Members[i].Name;var value= eobject.eGet(name);if(null== value)
{continue;}
if(
"object"== typeof(value)
&& feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
)
{if(
value.length!= null
&&"number"== typeof(value.length)
)
{for(var j= 0; j< value.length;++j)
{if("object"== typeof(value[j]))
{if(
feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
&&!feature.isContainment()
)
{var attr= elem.getAttribute(name);if(attr!= null&& attr.length> 0)
{attr+=" "+ value[j].ID;}
else
{attr= value[j].ID;}
elem.setAttribute(name,attr);this.SaveXMIElement(xmlDoc,feature.getEReferenceType().Name,xmlDoc.documentElement,value[j]);}
else
{this.SaveXMIElement(xmlDoc,name,elem,value[j]);}
}
else
{var e= xmlDoc.createElement(name);e.appendChild(xmlDoc.createTextNode(value[j]));elem.appendChild(e);}
}
}
else
{if(
feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
&&!feature.isContainment()
)
{elem.setAttribute(name,value.ID);this.SaveXMIElement(xmlDoc,feature.getEReferenceType().Name,xmlDoc.documentElement,value);}
else
{this.SaveXMIElement(xmlDoc,name,elem,value);}
}
}
else
{if(
(
feature.getUpperBound()== -1
|| feature.getUpperBound()> 1
||(
feature.getLowerBound()< feature.getUpperBound()
&& feature.getUpperBound()> 1
)
)
&& value.length!= null
&&"number"== typeof(value.length)
)
{for(var j= 0; j< value.length;++j)
{var indidualValue= value[j];if("boolean"== typeof(indidualValue))
{indidualValue=(indidualValue)?"true":"false";}
var attrElem= xmlDoc.createElement(name);attrElem.appendChild(xmlDoc.createTextNode(indidualValue));elem.appendChild(attrElem);}
}
else
{if("boolean"== typeof(value))
{value=(value)?"true":"false";}
elem.setAttribute(name,value);}
}
}
}
this.GenerateDiffString= function()
{var xml="";var xmlDoc= this.GenerateDiff();for(var i= 0; i< xmlDoc.childNodes.length;++i)
{xml+= GetXMLString(0,xmlDoc.childNodes[i], ODCPORTAL)+"\n";}
return xml;}
this.GenerateDiff= function()
{this.MarkElementsForDiff();var xmlDoc= this.SaveDiff();return xmlDoc;}
this.MarkElementsForDiff= function()
{var statusFromChildren= 0;var flag= 0;if(null== this.Root)
{return null;}
if(this.RootMemberName== null)
{var Msg= NlsFormatMsg(root_member_name_missing_error, null);throw new EObjectError(Msg);}
this.Objects= new Array();for(var i= 0; i< this.Root.Members.length;++i)
{if(this.RootMemberName== this.Root.Members[i].Name)
{var value= this.Root.Members[i].Value;if(this.Root.Members[i].EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE)
{if(this.Root.Members[i].addedAndremovedObjStatus!= null&& this.Root.Members[i].addedAndremovedObjStatus.length> 0)
{statusFromChildren= statusFromChildren| this.Root.CHILD_REMOVED_OR_ADDED;}
if(value!= null)
{if(value.length!= null&&"number"== typeof(value.length))
{for(var j= 0; j< value.length;++j)
{flag= this.MarkElement(this.Root.Members[i], value[j]);statusFromChildren= statusFromChildren| flag;}
}
else
{flag= this.MarkElement(this.Root.Members[i], value);}
statusFromChildren= statusFromChildren| flag;}
}
}
}
this.Root.Status= this.SERVER_COPY;this.Root.Status= statusFromChildren| this.Root.Status;}
this.MarkElement= function(member, eobject)
{var statusForParent= eobject.SERVER_COPY;var statusFromChildren= eobject.SERVER_COPY;var tempStatus= eobject.SERVER_COPY;var flag= eobject.SERVER_COPY;var refStatus= this.GetRefStatus(member, eobject);var addingToArray= true;for(var i= 0; i< this.Objects.length;++i)
{if(eobject== this.Objects[i]&& refStatus== null)
{return statusForParent;}
else if(eobject== this.Objects[i]&& refStatus!= null)
{addingToArray= false;break;}
}
if(addingToArray== true)
{this.Objects[this.Objects.length]= eobject;}
if(eobject.Status& eobject.NEW)
{statusForParent= statusForParent| eobject.CHILD_REMOVED_OR_ADDED;tempStatus= tempStatus| eobject.NEW;}
if(eobject.Status& eobject.UPDATED)
{statusForParent= statusForParent| eobject.CHILD_UPDATED;tempStatus= tempStatus| eobject.UPDATED;}
eobject.Status= tempStatus;for(var i= 0; i< eobject.Members.length;++i)
{if((eobject.Members[i].EStructuralFeature.CLASSTYPE&(EStructuralFeature.CLASSTYPE_EATTRIBUTE| EStructuralFeature.CLASSTYPE_EATTRIBUTECALCULATE))!= 0)
{continue;}
if(eobject.Members[i].addedAndremovedObjStatus!= null&& eobject.Members[i].addedAndremovedObjStatus.length> 0)
{statusFromChildren= statusFromChildren| eobject.CHILD_REMOVED_OR_ADDED;}
var name= eobject.Members[i].Name;var value= eobject.eGet(name);if(null== value)
{continue;}
if("boolean"== typeof(value))
{value=(value)?"true":"false";}
if("object"== typeof(value))
{if(
value.length!= null
&&"number"== typeof(value.length)
)
{for(var j= 0; j< value.length;++j)
{if("object"== typeof(value[j]))
{flag= this.MarkElement(eobject.Members[i], value[j]);statusFromChildren= statusFromChildren| flag;}
}
}
else
{flag= this.MarkElement(eobject.Members[i], value);statusFromChildren= statusFromChildren| flag;}
}
}
eobject.Status= eobject.Status| statusFromChildren;statusForParent= statusForParent| statusFromChildren
return statusForParent;}
this.SaveDiff= function()
{if(null== this.Root)
{return null;}
if(this.ECORENS== null)
{var Msg= NlsFormatMsg(ecore_namespace_missing_error, null);throw new EObjectError(Msg);}
this.Objects= new Array();var xmlDoc= CreateDocument();xmlDoc.appendChild(xmlDoc.createProcessingInstruction("xml","version=\"1.0\" encoding=\"utf-8\""));var rootElement= xmlDoc.createElement("Diff");rootElement.setAttribute("xmi:version","2.0");rootElement.setAttribute("xmlns:xmi",this.XMINS);rootElement.setAttribute("xmlns",this.ECORENS);rootElement.setAttribute("xmlns:odc",this.ODCNS);xmlDoc.appendChild(rootElement);var currElem= xmlDoc.createElement("Current");rootElement.appendChild(currElem);if(
(this.Root.Status& this.Root.CHILD_UPDATED)||(this.Root.Status& this.Root.CHILD_REMOVED_OR_ADDED)
)
{for(var i= 0; i< this.Root.Members.length;++i)
{if(this.RootMemberName== this.Root.Members[i].Name)
{var value= this.Root.Members[i].Value;var member= this.Root.Members[i];if(
value!= null
&& this.Root.Members[i].EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
)
{if(
value.length!= null
&&"number"== typeof(value.length)
)
{for(var j= 0; j< value.length;++j)
{this.SaveDiffElement(xmlDoc,this.Root.Members[i].Name,currElem,value[j], this.Root, member, this.CURRENT_MODE);}
}
else
{this.SaveDiffElement(xmlDoc,this.Root.Members[i].Name,currElem,value, this.Root, member, this.CURRENT_MODE);}
}
}
}
}
this.Objects= new Array();var origElem= xmlDoc.createElement("Original");rootElement.appendChild(origElem);if(this.Root.Status& this.Root.CHILD_UPDATED)
{for(var i= 0; i< this.Root.Members.length;++i)
{if(
this.RootMemberName== this.Root.Members[i].Name
&& this.Root.Members[i].EStructuralFeature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
)
{var name= this.Root.Members[i].Name;var member= this.Root.Members[i];var value= this.Root.GetOrigAttrValOrCurrRefObj(name);if(value!= null)
{if(value.length!= null&&"number"== typeof(value.length))
{for(var j= 0; j< value.length;++j)
{this.SaveDiffElement(xmlDoc,this.Root.Members[i].Name,origElem,value[j], this.Root, member, this.ORIGINAL_MODE);}
}
else
{this.SaveDiffElement(xmlDoc,this.Root.Members[i].Name,origElem,value, this.Root, member, this.ORIGINAL_MODE);}
}
}
}
}
return xmlDoc;}
this.SaveDiffElement= function(xmlDoc,nodename,parentElement, eobject, parentEObject, member, mode)
{var refStatus= this.GetRefStatus(member, eobject);var addingToArray= true;for(var i= 0; i< this.Objects.length;++i)
{if(eobject== this.Objects[i]&& refStatus== null)
{return;}
else if(eobject== this.Objects[i]&& refStatus!= null)
{addingToArray= false;break;}
}
if(addingToArray== true)
{this.Objects[this.Objects.length]= eobject;}
if(
!(parentEObject.Status& parentEObject.NEW)
&& eobject.Status== eobject.SERVER_COPY
&& member.EStructuralFeature.iD== false
&& refStatus== null
)
{return;}
var elem= xmlDoc.createElement(nodename);if(refStatus== eobject.REF_NEW)
{elem.setAttribute(this.ODCSTATUS,"C");}
else
if(refStatus== eobject.REF_DELETED)
{elem.setAttribute(this.ODCSTATUS,"D");}
else if
(refStatus== eobject.REF_REMOVED)
{elem.setAttribute(this.ODCSTATUS,"R");}
else if(refStatus== eobject.REF_ADDED)
{elem.setAttribute(this.ODCSTATUS,"A");}
else if
(
(eobject.Status& eobject.UPDATED)
&& mode== this.CURRENT_MODE
)
{elem.setAttribute(this.ODCSTATUS,"U");}
if((eobject.Status& eobject.UPDATED)&& mode== this.ORIGINAL_MODE)
{elem.setAttribute("xmi:id","_"+ eobject.ID);}
else
{elem.setAttribute("xmi:id", eobject.ID);}
elem.setAttribute(this.ODCID, eobject.ID);parentElement.appendChild(elem);for(var i= 0; i< eobject.Members.length;++i)
{var feature= eobject.Members[i].EStructuralFeature;if(feature.iD== false&& feature.isReadOnly()== 1&& feature.CLASSTYPE!= EStructuralFeature.CLASSTYPE_EREFERENCE)
{continue;}
else
if(
feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE
&& mode== this.CURRENT_MODE
)
{if(
feature.iD== false
&&!(
(eobject.Status& eobject.NEW)
||(eobject.Status& eobject.UPDATED)
||(eobject.Status& eobject.DELETED)
)
)
{continue;}
}
else
if(
feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EATTRIBUTE
&& mode== this.ORIGINAL_MODE
)
{if(
feature.iD== false
&&!(eobject.Status& eobject.UPDATED)
)
{continue;}
}
var member= eobject.Members[i];var name= eobject.Members[i].Name;var value= null;if(mode== this.CURRENT_MODE)
{value= eobject.GetCurAttrValOrCurAndDelRefObj(name);}
else
{value= eobject.GetOrigAttrValOrCurrRefObj(name);}
if(null== value)
{continue;}
if(
"object"== typeof(value)
&& feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
)
{if(
value.length!= null
&&"number"== typeof(value.length)
)
{for(var j= 0; j< value.length;++j)
{if("object"== typeof(value[j]))
{if(
feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
&&!feature.isContainment()
)
{refObj= value[j];if(
!(eobject.Status& eobject.NEW)
&& refObj.Status== refObj.SERVER_COPY
&& this.GetRefStatus(member, refObj)== null
&& feature.iD== false
)
{}
else
{var processedObj= this.FindEObject(refObj);if(processedObj!= null)
{var attr= elem.getAttribute(name);var tempId= null;if((processedObj.Status& processedObj.UPDATED)&& mode== this.ORIGINAL_MODE)
{tempId="_"+ processedObj.ID;}
else
{tempId= processedObj.ID;}
if(attr!= null&& attr.length> 0)
{attr+=" "+ tempId;}
else
{attr= tempId;}
var encodedValue= escapeForXML(attr);elem.setAttribute(name,encodedValue);}
this.SaveDiffElement(xmlDoc,name,elem,value[j], eobject, member, mode);}
}
else 
{this.SaveDiffElement(xmlDoc,name,elem,value[j], eobject, member, mode);}
}
else
{var e= xmlDoc.createElement(name);var encodedValue= escapeForXML(value[j]);e.appendChild(xmlDoc.createTextNode(encodedValue));elem.appendChild(e);}
}
}
else
{if(
feature.CLASSTYPE== EStructuralFeature.CLASSTYPE_EREFERENCE
&&!feature.isContainment()
)
{if(
!(eobject.Status& eobject.NEW)
&& value.Status== value.SERVER_COPY
&& this.GetRefStatus(member, value)== null
&& feature.iD== false
)
{}
else
{var processedObj= this.FindEObject(value);if(processedObj!= null)
{var tempId= null;if((processedObj.Status& processedObj.UPDATED)&& mode== this.ORIGINAL_MODE)
{tempId="_"+ value.ID;}
else
{tempId= value.ID;}
var encodedValue= escapeForXML(tempId);elem.setAttribute(name,encodedValue);}
this.SaveDiffElement(xmlDoc,name, elem,value, eobject, member, mode);}
}
else 
{this.SaveDiffElement(xmlDoc,name,elem,value, eobject, member, mode);}
}
}
else
{if(
(
feature.getUpperBound()== -1
|| feature.getUpperBound()> 1
||(
feature.getLowerBound()< feature.getUpperBound()
&& feature.getUpperBound()> 1
)
)
&& value.length!= null
&&"number"== typeof(value.length)
)
{for(var j= 0; j< value.length;++j)
{var indidualValue= value[j];if("boolean"== typeof(indidualValue))
{indidualValue=(indidualValue)?"true":"false";}
else if(feature.Type=="date")
{indidualValue= this.FormatDateString(indidualValue);}
var attrElem= xmlDoc.createElement(name);var encodedValue= escapeForXML(indidualValue);attrElem.appendChild(xmlDoc.createTextNode(encodedValue));elem.appendChild(attrElem);}
}
else
{if("boolean"== typeof(value))
{value=(value)?"true":"false";}
else if(feature.Type=="date")
{value= this.FormatDateString(value);}
var encodedValue= escapeForXML(value);elem.setAttribute(name,encodedValue);}
}
}
}
this.GetRefStatus= function( member, eobject)
{var refStatus= null;if(member.addedAndremovedObjStatus!= null)
{refStatus= IndexMapGet(member.addedAndremovedObjStatus, eobject.ID);}
return refStatus;}
this.FindEObject= function( anEObject)
{var targetObject= null;for(var i= 0; i< this.Objects.length;++i)
{if(anEObject== this.Objects[i])
{targetObject= this.Objects[i];return targetObject;}
}
return null;}
this.FormatDateString= function( value)
{var formattedStr= null;var temp= value;var aDate= new Date(value);if(ODC_SDO_SUPPORT=='undefined'|| ODC_SDO_SUPPORT=="SDO")
{var converter= new hX_4.DateTimeConverter("strict:1","format:yyyy-MM-dd'T'HH:mm:ss'.'SSSz");formattedStr= converter.valueToString(aDate);}
else
{formattedStr= aDate.toString();}
return formattedStr;}
}
