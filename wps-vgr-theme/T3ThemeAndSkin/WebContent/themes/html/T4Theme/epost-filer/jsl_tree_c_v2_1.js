/* (C) Copyright IBM Corp. 2006  All Rights Reserved                 */
var I=document.images;
function W(s){document.write(s)}
function WL(s){document.writeln(s)}
function TreeAdapter(treeCtrl, eobjRoot)
{this.treeControl= treeCtrl;this.treeControl.Adapter= this;this.xmiModel= eobjRoot;this.eobjRoot= eobjRoot;this.treeObjects= new Array();this.maskedNames= new Array();this.expandedNode= new Array();this.nodeHandler= new Array();this.dataHandler= new Array();this.customIcon= new Array();}
TreeAdapter.prototype.treeStyles= null;TreeAdapter.prototype.iconStyles= null;TreeAdapter.prototype.refresh= function(){this.treeControl.updateControl();}
TreeAdapter.prototype.activateDataSet= function(eobject){if(null== eobject){return;}
if(this.treeControl.a_index!=null)
this.treeControl.a_index=[];this.eobjRoot= eobject;this.eobjIndex= 0;eobjInstance= eobject;this.treeControl.childItems=[];this.treeControl.depth= -1;this.bind();}
TreeAdapter.prototype.setMask= function(maskstr)
{this.maskedNames=maskstr.split(",");}
TreeAdapter.prototype.isMasked= function(name)
{for(var i= 0; i< this.maskedNames.length;++i){if(this.maskedNames[i]==name)
return true;}
return false;}
TreeAdapter.prototype.applyImage= function( eobj) 
{if(this.iconFilePaths== null)
return null;var filePath= new Array();if(this.iconFilePaths!=null)
{for(var i= 0; i< this.iconFilePaths.length; i++) 
{var style= this.iconFilePaths[i];if(eobj.EClass.Name== Trim(style[0])) 
{if(style[1].indexOf("=")!=-1&&(style[1].indexOf("wsrp-url"))==-1)
{var valueArr= style[1].split("=");if(eobj.eGet(Trim(valueArr[0]))== Trim(valueArr[1]))
{filePath[0]= Trim(style[2]);filePath[1]= Trim(style[3]);filePath[2]= style[4];if(style[5]=="null")
style[5]="";filePath[3]= style[5];if(style[6]=="null")
style[6]="";filePath[4]= style[6];break;}
}
else
{filePath[0]= Trim(style[1]);filePath[1]= Trim(style[2]);filePath[2]= style[3];if(style[4]=="null")
style[4]="";filePath[3]= style[4];if(style[5]=="null")
style[5]="";filePath[4]= style[5];}
}
}
}
return filePath;}
TreeAdapter.prototype.applyStyle= function( name, obj){var displayObj= new Object();if(this.treeStyleNames== null){displayObj.name= name;return displayObj;}
for(var i= 0; i< this.treeStyleNames.length; i++){var style= this.treeStyleNames[i];if(name== style[0]){var str=(obj.GetMember(style[1]))?obj.eGet(style[1]):style[1];if(str!= null&&"object"!= typeof(str)){displayObj.name=(str=="")?" ":str;displayObj.propertyName=(obj.GetMember(style[1]))?style[1]:null;return displayObj;}
break;}
}
displayObj.name=name;return displayObj;}
TreeAdapter.prototype.GetChildrenRefs= function(someEClass){var refArray= new Array();if(this.treeStyleNames== null)
return refArray;for(var i= 0; i< this.treeStyleNames.length; i++){if(this.treeStyleNames[i][0]== someEClass){refArray[refArray.length]= Trim(this.treeStyleNames[i][2]);}
}
return refArray;}
this.isleaf= function(eclassName)
{if(this.treeStyleNames== null){return false;}
var style= this.treeStyleNames[this.treeStyleNames.length-2][0];if(eclassName== style)
return true;else
return false;}
TreeAdapter.prototype.GetChildContent= function(elementWrap, eobject) 
{var innerObject= eobject;var childrenRefs= this.GetChildrenRefs(eobject.EClass.Name);elementWrap.emptyFlag= false; 
var spanedArr= new Array();var value;for(var i=0; i<childrenRefs.length;i++)
{var strName= childrenRefs[i];if(this.isMasked(strName))
continue;if(!spanedArr[strName])
{spanedArr[strName]= strName;try
{if(strName)
value= innerObject.eGet(strName);}
catch(e)
{return;}
if(value!=null)
{if(value!= null&& typeof(value)=="object") 
{if(value.length!= null&&"number"== typeof(value.length)) 
{elementWrap.element.setAttribute("childrenLen", value.length);for(var j= 0; j< value.length;++j) 
{this.constructChildElement(elementWrap, value[j],strName);}
}
else 
{this.constructChildElement(elementWrap, value,strName);}
}
}
else if(this.treeControl.rootItem.dynamicFlag==true)
{if(i==0)
elementWrap.element.setAttribute("childrenLen", 1);for(var j=0;j<this.treeControl.a_index.length;j++)
{ 
if(this.treeControl.a_index[j].eobj.ID==eobject.ID)
{var treeItem= this.treeControl.a_index[j];if(treeItem.childItems!=null)
{if(treeItem.childItems[0]==null||treeItem.childItems[0]=="undefined")
{elementWrap.element.setAttribute("childrenLen", 0);this.treeControl.a_index[j].childItems.length=0;}
}
}
}
}
else
{if(i==0)
elementWrap.element.setAttribute("childrenLen", 0);}
}
}
}
TreeAdapter.prototype.constructChildElement= function(elementWrap, childObj,strName)
{this.expandedNode[this.expandedNode.length]= childObj;var objclsname= childObj.EClass.Name;var displayObj= this.applyStyle(objclsname, childObj);var str= displayObj.name;var propertyName= displayObj.propertyName;var strtmp=""+ str; 
var str1= strtmp.replace(/\ /gi,"_"); 
if(isIE()&&typeof(str1)=="string"&&str1.indexOf(":")!=-1)
{str1= str1.replace(/:/,"&#x003A;");} 
var childElement; 
str1="x"+str1;var encoder= new base64(); 
str1=encoder.encodeBase64(str1);childElement= document.createElement(str1); 
childElement.displayName= str;var childRef= this.GetChildrenRefs(objclsname);var hasChild= false;for( var i=0; i<childRef.length; i++)
{var tempMember= childObj.FindMember(childRef[i]);if(tempMember)
{if(tempMember.Value)
{hasChild=true;continue;}
}
if(i==childRef.length-1)
{hasChild=false;}
}
if(!(childRef.length==1&&childRef==""))
{if(hasChild==false)
{childElement.setAttribute("hasNoChildrenValues", true);}
childElement.setAttribute("childrenLen",1);}
if( childElement.getAttribute("hasNoChildrenValues")==null)
childElement.setAttribute("hasNoChildrenValues", false);var handler= this.nodeHandler[objclsname];if(handler!=null&&handler!='undefined')
childElement.eventHandler= handler;childElement.eobject= childObj;childElement.propertyName= propertyName;var imgpath= this.applyImage(childObj);if(null!= imgpath){childElement.setAttribute("treecloseimgfile", imgpath[0]);childElement.setAttribute("treeopenimgfile", imgpath[1]);if(imgpath[2])
childElement.setAttribute("showsystemiconflag", imgpath[2]);if(imgpath[3])
childElement.setAttribute("treecloseimgalt", imgpath[3]);if(imgpath[4])
childElement.setAttribute("treeopenimgalt", imgpath[4]);}
var childElementWrap= new ElementWrapper(childElement, false);if(!childElementWrap.emptyFlag){elementWrap.element.appendChild(childElement);}
}
TreeAdapter.prototype.SetPropertyBinders= function(index){for(var i= index; i< this.treeControl.a_index.length; i++)
{var treeitem= this.treeControl.a_index[i];if(treeitem.eobj)
{var htmlElement= get_element('i_txt'+ this.treeControl.itemID+'_'+treeitem.itemID);if(htmlElement)
{try 
{var binding= new PropertyBinder(treeitem.eobj, treeitem.propertName, htmlElement,"innerHTML","onchange");binding.DataBind();ODCRegistry.addBinderInfo(this.treeControl.parentHTMLElement.parentNode.id+":"+treeitem.rootItem.pageId,binding);} 
catch(e) 
{return;}
}
}
}
}
TreeAdapter.prototype.setStyleSelectorText= function(styleText){this.treeStyles= styleText;}
TreeAdapter.prototype.setIconSelectorText= function(iconText){this.iconStyles= iconText;}
TreeAdapter.prototype.setStyleMap= function(styleString){this.styleMapString= styleString;}
TreeAdapter.prototype.addNodeIconMap= function(iconString) 
{var iconMapString= iconString;if(iconMapString!="") 
{var ruleArray= iconMapString.split(",");var aliasFlag="false";if(ruleArray[1].indexOf("=")!=-1&&(ruleArray[1].indexOf("wsrp-url"))==-1)
aliasFlag="true";var openImgObj= new Image();var closeImgObj= new Image();if(aliasFlag=="true")
{openImgObj.src= Trim(ruleArray[2]);closeImgObj.src= Trim(ruleArray[3]);}
else
{ 
openImgObj.src= Trim(ruleArray[1]);closeImgObj.src= Trim(ruleArray[2]);}
this.customIcon[0]=openImgObj;this.customIcon[1]=closeImgObj;if(aliasFlag=="true")
{ruleArray[2]=this.customIcon[0].src;ruleArray[3]= this.customIcon[1].src;}
else
{ruleArray[1]=this.customIcon[0].src;ruleArray[2]= this.customIcon[1].src;}
if(this.iconFilePaths==null)
this.iconFilePaths= new Array();this.iconFilePaths[this.iconFilePaths.length]= ruleArray;}
}
TreeAdapter.prototype.addNodeEventHandler= function(handlerString){if(handlerString!=""){var ruleArray= handlerString.split(":");if(this.nodeHandler==null)
this.nodeHandler= new Array();if(this.nodeHandler[ruleArray[0]]==null||this.nodeHandler[ruleArray[0]]=='undefined')
this.nodeHandler[ruleArray[0]]= ruleArray[1];else
this.nodeHandler[ruleArray[0]]+=";"+ ruleArray[1];}
}
TreeAdapter.prototype.addNodeColumnData= function(dataString)
{if(dataString!="") 
{var colData= dataString.split(":");this.dataHandler[colData[0]]=colData[1];}
}
TreeAdapter.prototype.setIconRoot= function(iconRootString){var rootString= iconRootString.replace(/ /g,"");rootString= rootString.split(":");if(rootString.length> 0){this.treeControl.itemClosedImage= rootString[0];if(rootString.length> 1){this.treeControl.itemOpenedImage= this.treeControl.UrlPrefix+rootString[1];} else{this.treeControl.itemOpenedImage= this.treeControl.UrlPrefix+rootString[0];}
}
}
TreeAdapter.prototype.setSystemIconStyle= function( systemIconStyleString){var styleString= systemIconStyleString.replace(/ /g,"");var iconArray= styleString.split("|");var len= iconArray.length-1;for(var i=1; i<len; i++)
{var index= iconArray[i].indexOf("=");var temp= new Array();temp[0]= iconArray[i].substring(0,index);temp[1]= iconArray[i].substring(index+1,iconArray[i].length);if(temp.length>1)
this.treeControl.treeIcons[temp[0]]= temp[1]; 
}
}
TreeAdapter.prototype.initStyles= function(){if((null== this.treeStyles)&&(null== this.styleMapString))
return;var styleString= null;var iconString= null;if(null!= this.treeStyles){try{var styleString= eval(this.treeStyles);} catch(e){this.treeStyles= null;return;}
} else{styleString= this.styleMapString;}
if(styleString!=""){this.treeStyleNames= styleString.split(";");for(var i= 0; i< this.treeStyleNames.length; i++){var ruleString= this.treeStyleNames[i];var ruleArray= ruleString.split(":");this.treeStyleNames[i]= ruleArray;}
}
if(null!= this.iconStyles){try{iconString= eval(this.iconStyles);iconString= iconString.replace(/ /g,"");} catch(e){this.iconStyles= null;return;}
if(iconString!=""){this.iconFilePaths= iconString.split(";");for(var i= 0; i< this.iconFilePaths.length; i++){var ruleString= this.iconFilePaths[i];var ruleArray= ruleString.split(":");this.iconFilePaths[i]= ruleArray;}
}
}
}
TreeAdapter.prototype.setRootByID= function(IDString){if((this.eobjRoot== undefined)||(this.eobjRoot== null)){return;}
this.eobjRoot= findEObjectByXMIID(this.eobjRoot, IDString);this.expandedNode[this.eobjRoot.getSignature()]= this.eobjRoot;}
TreeAdapter.prototype.bind= function(){index=0;var eobjInstance= this.eobjRoot;if(eobjInstance==null)
return;this.initStyles();var displayObj= this.applyStyle(eobjInstance.EClass.Name,eobjInstance);var str= displayObj.name;var propertyName= displayObj.propertyName;var tmpstr=""+ str; 
var str1= tmpstr.replace(/\ /gi,"_"); 
var treeParentElement; 
str1="x"+str1;var encoder= new base64();str1=encoder.encodeBase64(str1); 
treeParentElement= document.createElement(str1);treeParentElement.displayName= str;treeParentElement.setAttribute("EObjectID", eobjInstance.ID);treeParentElement.eobject= this.eobjRoot;treeParentElement.propertyName= propertyName;var imgpath= this.applyImage(this.eobjRoot);if(null!= imgpath){treeParentElement.setAttribute("treecloseimgfile", imgpath[0]);treeParentElement.setAttribute("treeopenimgfile", imgpath[1]);if(imgpath[2])
treeParentElement.setAttribute("showsystemiconflag", imgpath[2]);if(imgpath[3])
treeParentElement.setAttribute("treecloseimgalt", imgpath[3]);if(imgpath[4])
treeParentElement.setAttribute("treeopenimgalt", imgpath[4]);}
var event= this.nodeHandler[eobjInstance.EClass.Name];if(event)
treeParentElement.eventHandler= event;var elementWrap= new ElementWrapper(treeParentElement, true);this.GetChildContent(elementWrap, eobjInstance, 0);var newTreeItemChild= new TreeItem(this.treeControl, treeParentElement, 0);this.treeControl.writeTreeUI1();this.SetPropertyBinders(0);}
this.unbind= function(){this.treeControl.removeItem(this.treeControl.rootItem.itemID);}
TreeAdapter.prototype.addNode= function( node, parentIndex, isLeaf)
{var eobjInstance= node; 
if(eobjInstance==null)
return;this.initStyles(); 
var displayObj= this.applyStyle(eobjInstance.EClass.Name,eobjInstance);var str= displayObj.name;var tmpstr=""+ str; 
var str1= tmpstr.replace(/\ /gi,"_"); 
var propertyName= displayObj.propertyName; 
var newNode= document.createElement( str1); 
if(newNode!="undefined"||newNode!=null)
{newNode.displayName= str;newNode.setAttribute("EObjectID", eobjInstance.ID);newNode.eobject= node;newNode.propertyName= propertyName;var imgpath= this.applyImage(node);if(null!= imgpath) 
{newNode.setAttribute("treecloseimgfile", imgpath[0]);newNode.setAttribute("treeopenimgfile", imgpath[1]);if(imgpath[2])
newNode.setAttribute("showsystemiconflag", imgpath[2]);if(imgpath[3])
newNode.setAttribute("treecloseimgalt", imgpath[3]);if(imgpath[4])
newNode.setAttribute("treeopenimgalt", imgpath[4]);}
var event= this.nodeHandler[eobjInstance.EClass.Name]; 
if(event)
newNode.eventHandler= event; 
var elementWrap= new ElementWrapper(newNode, true);this.GetChildContent(elementWrap,node); 
if(this.treeControl.a_index[parentIndex].childItems.length> 0)
{if(this.treeControl.a_index[parentIndex].childItems[0]==null||this.treeControl.a_index[parentIndex].childItems[0]=="dummy")
this.treeControl.a_index[parentIndex].childItems.length=this.treeControl.a_index[parentIndex].childItems.length-1;}
var tItem=new TreeItem(this.treeControl.a_index[parentIndex], newNode,this.treeControl.a_index[parentIndex].childItems.length, isLeaf);var tempElem= tItem.init();this.treeControl.addDOMElem(parentIndex,tempElem);}
return;}
function ElementWrapper(element, flag){this.element= element;this.emptyFlag= flag;}
1
function Tree(parent, UrlPrefix, xmldoc,type)
{this.UrlPrefix= UrlPrefix;this.treeIcons= new Array(); 
var xmlDoc;if(xmldoc==null)
{if(type=="client")
xmlDoc= LoadXMLString("<startNode><root></root></startNode>");else
xmlDoc= LoadXMLString("<root />");}
else
xmlDoc= LoadXML(xmldoc);if(null== xmlDoc)
return this;this.rootItem= this;this.xmlNode= xmlDoc.documentElement;this.itemName= this.xmlNode.nodeName;this.crumtree= false;this.parentHTMLElement= parent; 
this.a_index=[];this.treeIconObjs=[];this.checkedItemArray= new Array();this.checkedEObjectArray= new Array(); 
 
this.childItems=[];this.eventArray= new Array;var nIndex= 0;for(var i= 0; i< xmlDoc.documentElement.childNodes.length; i++)
{var node= xmlDoc.documentElement.childNodes[i];if(node.nodeType!= 1)
continue;new TreeItem(this, node, nIndex);nIndex++;}
this.itemID= odcTrees.length;odcTrees[this.itemID]= this;this.styleIcons= new Array();}
Tree.prototype.Adapter= null;Tree.prototype.parentItem= null;Tree.prototype.selectedItem= null;Tree.prototype.depth= -1;Tree.prototype.scrollFlag=false;Tree.prototype.enableSelect= false;Tree.prototype.enableDrop= false;Tree.prototype.rootVisibleFlag= true;Tree.prototype.treeTableFlag= false;Tree.prototype.workPlaceFlag= false;Tree.prototype.dynamicFlag= false;Tree.prototype.userHighlight= false;Tree.prototype.treeTableArr= null;Tree.prototype.treeTableWidthArr= null;Tree.prototype.iconLeafArray= null;Tree.prototype.height= null;Tree.prototype.width= null;Tree.prototype.styleClass=""; 
Tree.prototype.alength= 0; 
Tree.prototype.scrollNum="10"; 
Tree.prototype.type="Tree";Tree.prototype.pageId="tree1";Tree.prototype.getType= function(){return this.type;}
Tree.prototype.getId= function(){return this.pageId;}
Tree.prototype.setStyleClass= function(prefix)
{this.styleClass= prefix+"_";this.parentHTMLElement.className= this.styleClass+"classForTreeSysIcons";var icons= new iconLibrary(this.parentHTMLElement,"list-style-image");for(var key in icons){this.treeIcons[key]= icons[key];}
}
Tree.prototype.loadImages=function()
{for(key in this.treeIcons)
{var imgObj= new Image();imgObj.src=this.treeIcons[key];this.treeIconObjs[key]=imgObj;}
}
 
Tree.prototype.addHandler= function(action, handler,eclassType)
{uaction=action.toUpperCase();if(uaction=="ONNODEDROP")
{Tree.prototype.enableDrop= true;}
 
if(eclassType!=null&&eclassType!='undefined'&&eclassType!="")
{var str= eclassType+":"+ action+","+handler;this.Adapter.addNodeEventHandler(str);}else{this.eventArray[this.eventArray.length]= new Array(action, handler);}
}
Tree.prototype.reSize= function()
{var sizeArray= getWindowSize();this.width=(this.widthpercentage>1)?this.width:sizeArray[0]*this.widthpercentage;this.height=(this.heightpercentage>1)?this.height:sizeArray[1]*this.heightpercentage;var rootDiv= document.getElementById("i_div"+ this.itemID+"_rootdiv");rootDiv.style.width= this.width;rootDiv.style.height= this.height;}
Tree.prototype.setHeight= function(height)
{if(height.indexOf("%")!=-1)
{this.heightpercentage= parseFloat(height)/100;this.height= getWindowSize()[1]*this.heightpercentage;}else{this.height= height;}
}
Tree.prototype.setWidth=function(width)
{if(width.indexOf("%")!=-1)
{this.widthpercentage= parseFloat(width)/100;this.width= getWindowSize()[0]*this.widthpercentage;}else{this.width= width
}
}
Tree.prototype.setScrollNum=function(scrollNum)
{this.scrollNum= scrollNum;}
Tree.prototype.setTreeTableCols=function(treeTableCols, treeTableColWidths)
{if(treeTableColWidths)
{this.treeTableWidthArr=treeTableColWidths.split(",");}
else
{this.treeTableWidthArr=null;}
if(treeTableCols!="undefined"||treeTableCols!=""||treeTableCols!=null)
{this.treeTableArr=treeTableCols.split(",");}
else
alert("ERROR: The TreeTableCols attribute needs an associated string value \n containing a list of table header names ");if(this.treeTableArr.length>0)
this.treeTableFlag="true";}
Tree.prototype.writeTreeUI1= function()
{if(this.parentHTMLElement==null)
{return; 
}
if(this.parentHTMLElement.innerHTML!="")
{for(var i=(this.parentHTMLElement.childNodes.length - 1); i>= 0; i--)
{ 
if(this.parentHTMLElement.childNodes[i]!= null)
{this.parentHTMLElement.removeChild(this.parentHTMLElement.childNodes[i]);}
}
}
this.loadImages();var treeStyle= this.styleClass+"outerTreeStyle";var divElem= document.createElement("div"); 
divElem.className=treeStyle;divElem.setAttribute("id","i_div"+ this.itemID+"_rootdiv");var childItemElem;var scrollSet=false;if(this.height!=null&&this.height>0)
{divElem.style.height= this.height;divElem.style.overflow="auto";scrollSet=true;}
if(!this.treeTableFlag)
{if(this.width!=null&&this.width>0)
{divElem.style.width= this.width;if(!scrollSet)
divElem.style.overflow="auto"; 
}
}
else
{ 
headerElem=this.createHeader();divElem.appendChild(headerElem);}
for(var i= 0; i< this.childItems.length; i++)
{ 
childItemElem= this.childItems[i].init();divElem.appendChild(childItemElem[0]);if(childItemElem[1]!= null)
divElem.appendChild(childItemElem[1]);this.childItems[i].open(); 
}
this.parentHTMLElement.appendChild(divElem);}
 
Tree.prototype.createHeader= function()
{ 
var headerStyle= this.styleClass+"headerStyle";var nodeStyle= this.styleClass+"nodeStyle";var nodeLableStyle=this.styleClass+"labelNormalStyle";this.tableWidth=0;var tableElem= document.createElement("table");tableElem.setAttribute("id","i_headerTab_"+ this.itemID+"_"+ this.itemID);tableElem.className=nodeStyle;var trElem= tableElem.insertRow(0); 
trElem.setAttribute("id","i_headTR_"+ this.itemID+"_"+ this.itemID);var newWidth=null;for(var i=this.treeTableArr.length-1;i>=0;i--)
{if(this.treeTableWidthArr!=null)
{width=this.treeTableWidthArr[i];if(width.indexOf("%")!=-1)
{widthpercentage= parseFloat(width)/100;newWidth= getWindowSize()[0]*widthpercentage;}
else if(width.indexOf("px")>-1)
newWidth= width.substring(0,width.indexOf("px"));else
newWidth= width;}
tdElem2= trElem.insertCell(0);tdElem2.setAttribute("id","i_TD_"+i+"_"+ this.itemID+"_"+ this.itemID);tdElem2.className=headerStyle;if(newWidth!=null)
{widthElem= document.createElement("img");widthElem=setInvGifStyle(widthElem);widthElem.setAttribute("src",this.rootItem.treeIconObjs["invisiblegif"].src); 
widthElem.setAttribute("width",newWidth);tdElem2.appendChild(widthElem);this.tableWidth=this.tableWidth+parseInt(newWidth); 
}
labelElem2= document.createElement("label");labelElem2.setAttribute("id","i_headTxt_"+i+"_"+ this.itemID+"_"+ this.itemID);labelElem2.className= nodeLableStyle;var text= document.createTextNode(" "+this.treeTableArr[i]); 
labelElem2.appendChild(text);tdElem2.appendChild(labelElem2);}
if(this.tableWidth>0)
tableElem.setAttribute("width",this.tableWidth);return tableElem;}
Tree.prototype.show= function()
{this.updateControl();}
Tree.prototype.updateControl= function()
{if(this.a_index==null||this.a_index.length==0){alert(action_obfcontrolrender_errormsg);return;}
this.rootItem.expand(0);}
Tree.prototype.openfolder= function(itemID)
{if(isNaN(itemID)||(itemID> this.a_index.length))
return;if(itemID==-1) this.rootItem.expandAllInternal(this.rootItem.itemID);if(itemID==0) this.a_index[0].open(this.a_index[0].isOpened);for(var j= 1; j< itemID; j++)
{var itemObj= this.a_index[j];itemObj.open(itemObj.isOpened)
}
}
Tree.prototype.initTree= function(url)
{var htmlElement= get_element('i_div'+ this.rootItem.itemID+'_'+ this.rootItem.itemID);if(!htmlElement)
{htmlElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ this.rootItem.itemID);if(!htmlElement)
return;}
var xmlDoc= LoadXML(url);if(null== xmlDoc)
return;this.xmlNode= xmlDoc.documentElement;this.itemName= this.xmlNode.nodeName;this.a_index= null;this.childItems= null;this.a_index= new Array;this.childItems= new Array;var nIndex= 0;for(i= 0; i< this.xmlNode.childNodes.length; i++)
{var node= this.xmlNode.childNodes[i];if(node.nodeType!= 1)
continue;new TreeItem(this, node, nIndex);nIndex++;}
var tempElem= this.childItems[0].init();htmlElement.parentNode.appendChild(tempElem[0]);if(tempElem[1]!= null)
htmlElement.parentNode.appendChild(tempElem[1]);this.childItems[0].open();};Tree.prototype.loadLeaf= function(itemID, url)
{var treeItem= this.a_index[itemID];if(treeItem== null)
return;var htmlElement= get_element('i_div'+ this.rootItem.itemID+'_'+ itemID);if(!htmlElement)
{htmlElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ itemID);if(!htmlElement)
return;}
var xmlDoc= LoadXML(url);if(null== xmlDoc)
return;var xmlNode= xmlDoc.documentElement;var nIndex= 0;for(i= 0; i< xmlNode.childNodes.length; i++)
{var node= xmlNode.childNodes[i];if(node.nodeType!= 1)
continue;new TreeItem(treeItem, node, nIndex);nIndex++;}
var tempElem= treeItem.init();htmlElement.parentNode.appendChild(tempElem[0]);if(tempElem[1]!= null)
htmlElement.parentNode.appendChild(tempElem[1]);treeItem.open();};Tree.prototype.addItem= function(itemID, displayText, value)
{if(displayText== null|| displayText=="")
return;var futureParentItemObj= this.a_index[itemID];if(futureParentItemObj== null)
return;var wasOpened= futureParentItemObj.isOpened;var htmlElement= get_element('i_div'+ this.rootItem.itemID+'_'+ itemID);if(!htmlElement)
{htmlElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ itemID);if(!htmlElement)
return;}
var htmlRootElement= get_element('i_div'+ this.rootItem.itemID+'_'+ this.rootItem.itemID);if(!htmlRootElement)
{htmlRootElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ this.rootItem.itemID);if(!htmlRootElement)
return;}
var newXmlNode= futureParentItemObj.xmlNode.ownerDocument.createElement(displayText);var textValueNode= futureParentItemObj.xmlNode.ownerDocument.createTextNode(value);newXmlNode.appendChild(textValueNode);futureParentItemObj.xmlNode.appendChild(newXmlNode);var newItem= new TreeItem(futureParentItemObj, newXmlNode, futureParentItemObj.childItems.length);if(this.depth<= 1)
{var tempElem= futureParentItemObj.rootItem.childItems[0].init(); 
htmlRootElement.parentNode.appendChild(tempElem[0]);if(tempElem[1]!= null)
htmlRootElement.parentNode.appendChild(tempElem[1]);futureParentItemObj.rootItem.childItems[0].open();}
else
{var tempElem= futureParentItemObj.init(); 
htmlElement.parentNode.appendChild(tempElem[0]);if(tempElem[1]!= null)
htmlElement.parentNode.appendChild(tempElem[1]);} 
futureParentItemObj.open(!wasOpened);return newItem;}
Tree.prototype.addNode= function(item, displayText)
{var itemID= item.itemID;if(displayText== null|| displayText=="")
return;var futureParentItemObj= this.a_index[itemID];if(futureParentItemObj== null)
return;var wasOpened= futureParentItemObj.isOpened;var newXmlNode= futureParentItemObj.xmlNode.ownerDocument.createElement(displayText);futureParentItemObj.xmlNode.appendChild(newXmlNode);var newItem= new TreeItem(futureParentItemObj, newXmlNode, futureParentItemObj.childItems.length);return newItem;}
function updateTreeItem(itemObj, editElem, htmlElement, isUpdate)
{newXMLElem= itemObj.xmlNode.ownerDocument.createElement(editElem.value);newXMLTextNode= itemObj.xmlNode.ownerDocument.createTextNode(getXMLNodeValue(itemObj.xmlNode));newXMLElem.appendChild(newXMLTextNode);var retObj= itemObj.xmlNode.parentNode.replaceChild(newXMLElem, itemObj.xmlNode);var strOldName= itemObj.itemName;itemObj.xmlNode= newXMLElem;itemObj.parentItem.xmlNode= itemObj.xmlNode.parentNode;itemObj.itemName= editElem.value;itemObj.rootItem.a_index[itemObj.itemID]= itemObj;strInnerHTML= htmlElement.innerHTML;strInnerHTML= strInnerHTML.substring(0, strInnerHTML.length - strOldName.length)+ editElem.value;htmlElement.innerHTML= strInnerHTML;editElem.parentNode.replaceChild(htmlElement, editElem);}
Tree.prototype.editItem= function(itemID)
{var itemObj= this.a_index[itemID];if(itemObj== null)
return;var htmlElement= get_element('i_div'+ this.rootItem.itemID+'_'+ itemID);if(!htmlElement)
{htmlElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ itemID);if(!htmlElement)
return;}
var strEditControlContent="<INPUT id='txtItem' type='text' size='9' name='txtItem'>";var editElem= null, textNode= null;if(navigator.appName=="Netscape")
{editElem= htmlElement.ownerDocument.createElement("input");textNode= htmlElement.ownerDocument.createTextNode(itemObj.itemName);editElem.setAttribute("type","text");editElem.setAttribute("size","9");editElem.style.height="17";editElem.style.fontSize= 10;}
else
{editElem= htmlElement.ownerDocument.createElement(strEditControlContent);editElem.style.height="17";editElem.style.fontSize= 10;}
htmlElement= htmlElement.parentNode.replaceChild(editElem, htmlElement);editElem.value= itemObj.itemName;editElem.focus();editElem.select();if(this.onstartedit!= null)
this.onstartedit(itemObj, editElem);editElem.onblur= function onBlurEditBox()
{if(this.onfinishedit!= null)
{var isUpdate= false;isUpdate= this.onfinishedit(itemObj, editElem);this.updateTreeItem(itemObj, editElem, htmlElement, isUpdate);}
else
this.updateTreeItem(itemObj, editElem, htmlElement, true);}
}
Tree.prototype.removeItem= function(itemID)
{var itemObj= this.a_index[itemID];if(itemObj== null)
return;var isLeaf= false;var htmlNodeName='i_div'+ this.rootItem.itemID+'_'+ itemID;var htmlElement= get_element(htmlNodeName);if(!htmlElement)
{htmlNodeName='i_txt'+ this.rootItem.itemID+'_'+ itemID;htmlElement= get_element(htmlNodeName);if(!htmlElement)
return;isLeaf= true;}
if(navigator.appName=="Netscape")
{var parent= htmlElement.parentNode;if(isLeaf)
{htmlElement.parentNode.removeChild(htmlElement);parent.parentNode.removeChild(parent);}
else
{htmlElement.parentNode.removeChild(htmlElement);htmlNodeName='i_txt'+ this.rootItem.itemID+'_'+ itemID;var htmlElement= get_element(htmlNodeName);parent= htmlElement.parentNode;htmlElement.parentNode.removeChild(htmlElement);parent.parentNode.removeChild(parent);}
}
else
{if(isLeaf)
htmlElement.parentElement.removeNode(true);else
{htmlElement.removeNode(true);htmlNodeName='i_txt'+ this.rootItem.itemID+'_'+ itemID;var htmlElement= get_element(htmlNodeName);htmlElement.parentElement.removeNode(true);}
}
itemObj.xmlNode.parentNode.removeChild(itemObj.xmlNode);var indexInParent= 0;for(i= 0; i< itemObj.parentItem.childItems.length; i++)
{if(itemObj.parentItem.childItems[i]== itemObj)
{indexInParent= i;break;}
}
itemObj.parentItem.childItems.splice(indexInParent, 1);itemObj.childItems.splice(0, itemObj.childItems.length);itemObj= null;};Tree.prototype.select= function(itemID)
{return this.a_index[itemID].select();};Tree.prototype.check= function(selectObj, itemID)
{if(selectObj.checked)
{return this.a_index[itemID].check('ONSELECT');}else
{return this.a_index[itemID].check('ONUNSELECT');}
}
Tree.prototype.drop= function(itemID, nativeEvent)
{var itemObj= this.a_index[itemID]; 
if(itemObj== null)
return;if(!itemObj.activeTreeEvent("onNodeDrop", nativeEvent))
return false;if(this.a_index[itemID])
this.a_index[itemID].upstatus(true,"dropout");return false;};Tree.prototype.CancelEvent= function()
{window.event.returnValue=false;}
Tree.prototype.toggle= function(itemID)
{if(itemID== 0) return;var itemObj= this.a_index[itemID];if(!itemObj.isOpened){if(!itemObj.activeNodeEvent("onExpand"))
return false;if(!itemObj.activeTreeEvent("onNodeExpand"))
return false;}else{if(!itemObj.activeNodeEvent("onCollapse"))
return false;if(!itemObj.activeTreeEvent("onNodeCollapse"))
return false;}
this.getChildrenItems(itemObj);return false;};Tree.prototype.contextmenu= function(itemID)
{var itemObj= this.a_index[itemID];if(this.oncontextmenu!= null)
this.oncontextmenu(itemObj);};Tree.prototype.expand= function(itemID)
{var itemObj= this.a_index[itemID];if(!itemObj.isOpened)
itemObj.open(itemObj.isOpened);};Tree.prototype.getChildrenItems= function(itemObj,expandFlag)
{if(itemObj.childItems!=null&&itemObj.childItems.length>0&&itemObj.childItems[itemObj.childItems.length-1]!=null){if(expandFlag=="expand"&&itemObj.isOpened)
{return;}
else if(expandFlag=="collapse"&&!itemObj.isOpened)
{return;}
else
{if(this.crumtree)
{for(var i=1; i<this.a_index.length; i++)
{var tempObj= this.a_index[i];if(tempObj.isOpened)
{tempObj.open(true);break;}
}
}
itemObj.open(itemObj.isOpened);}
}
else
{var nIndex=0;var xmlNode= itemObj.xmlNode;var eobj= itemObj.eobj;var elementWrap= new ElementWrapper(xmlNode, true);this.Adapter.GetChildContent(elementWrap, eobj, 1);var preNodelen= this.alength;for(var i= 0; i< xmlNode.childNodes.length; i++)
{var node= xmlNode.childNodes[i];if(node.nodeType!= 1)
continue;new TreeItem(itemObj, node, nIndex);nIndex++;}
if(this.crumtree)
{for(var i=1; i<this.a_index.length; i++)
{var tempObj= this.a_index[i];if(tempObj.isOpened)
{tempObj.open(true);break;}
}
}
itemObj.open(itemObj.isOpened);this.Adapter.SetPropertyBinders(preNodelen);if(this.enableSelect)
{if(this.checkedItemArray[itemObj.eobj.ID]==null)
{itemObj.check('ONUNSELECT',true)
}
else
{itemObj.check('ONSELECT',true);}
}
}
}
Tree.prototype.expandAll= function(eobject)
{if(this.crumtree)
return;for(var i=0; i<this.a_index.length; i++)
{var obj= this.a_index[i].eobj;if(eobject.ID==obj.ID){var itemObj= this.a_index[i];if(!itemObj.activeNodeEvent("onExpand","-1"))
return false;if(!itemObj.activeTreeEvent("onNodeExpand","-1"))
return false;this.expandAllInternal(i);break;}
}
}
Tree.prototype.expandAllInternal= function(itemID)
{var itemObj= this.a_index[itemID];this.getChildrenItems(itemObj,"expand");for(var j= 0; j< itemObj.childItems.length; j++)
{this.expandAllInternal(itemObj.childItems[j].itemID);}
}
Tree.prototype.collapseAll= function(eobject)
{if(this.crumtree)
return;for(var i=0; i<this.a_index.length; i++)
{var obj= this.a_index[i].eobj;if(eobject.ID==obj.ID){var itemObj= this.a_index[i];if(!itemObj.activeNodeEvent("onCollapse","-1"))
return false;if(!itemObj.activeTreeEvent("onNodeCollapse","-1"))
return false;this.collapseAllInternal(i);break;}
}
}
Tree.prototype.collapseAllInternal= function(itemID)
{var itemObj= this.a_index[itemID];this.getChildrenItems(itemObj,"collapse");for(var j= 0; j< itemObj.childItems.length; j++)
{this.collapseAllInternal(itemObj.childItems[j].itemID);}
}
Tree.prototype.mout= function(itemID)
{if(this.a_index[itemID])
this.a_index[itemID].upstatus(true,"mouseout")
};Tree.prototype.mover= function(itemID)
{if(this.a_index[itemID])
this.a_index[itemID].upstatus(false,"mouseover")
};Tree.prototype.dover= function(itemID, e)
{var nativeEvent=e?e:window.event; 
var itemObj= this.a_index[itemID]; 
if(itemObj== null)
return;if(this.userHighlight==false)
{var treeResult=itemObj.activeTreeEvent("onNodeDragEnterOver", nativeEvent);var nodeResult=itemObj.activeNodeEvent("onDragEnterOver", nativeEvent);if(treeResult=="true"||nodeResult=="true")
{if(this.a_index[itemID])
this.a_index[itemID].upstatus(false,"dragover");}
}
else
{if(!itemObj.activeTreeEvent("onNodeDragEnterOver", nativeEvent))
return false;if(!itemObj.activeNodeEvent("onDragEnterOver", nativeEvent))
return false;}
};Tree.prototype.dout= function(itemID)
{if(this.a_index[itemID])
this.a_index[itemID].upstatus(true,"dragout");}; 
Tree.prototype.restoreUIState= function(stateString, highlightName)
{if(stateString== null|| stateString==""||stateString=="null;null;null")
{return;}
var stateArray=null;var highlightNode= null; 
var selectArray= null;if(stateString.indexOf(";")!=-1)
{var openhighlightArray= stateString.split(";");stateArray= openhighlightArray[0].split(",");highlightNode= openhighlightArray[1];if(openhighlightArray[2]!=null&&openhighlightArray[2]!="")
selectArray= openhighlightArray[2].split(",");}
else
{stateArray= stateString.split(",");}
var openLen= stateArray.length-1;for(var j= 0; j<=openLen; j++)
{var signature= stateArray[j];for(var i= 0; i< this.Adapter.expandedNode.length; i++)
{var treeNode= this.Adapter.expandedNode[i];var tempSignature= treeNode.getSignature();if(tempSignature!= null&& tempSignature== signature)
{ 
var XMIId= this.Adapter.expandedNode[i].ID;this.expandNodeWithID(XMIId,j,openLen); 
break;}
}
}
for(var i=0; i<this.a_index.length; i++)
{var treeNode= this.a_index[i].eobj;var tempSignature= treeNode.getSignature();if(highlightName!=null&&highlightName!='undefined')
{var displayName= this.Adapter.applyStyle(treeNode.EClass.Name, treeNode);if(displayName.name== highlightName)
{highlightNode= tempSignature;}
}
if(highlightNode!=null)
{if(tempSignature!= null&& tempSignature== highlightNode)
{if(highlightName!=null&&highlightName!='undefined')
{var displayName= this.Adapter.applyStyle(treeNode.EClass.Name, treeNode);if(displayName.name== highlightName)
{this.a_index[i].select(false, true);break;}
else
{var xmiId= treeNode.ID;this.expandNodeWithID(xmiId);var parentNode= this.a_index[i];for(var j=0; j<parentNode.childItems.length; j++)
{var highlightNode= parentNode.childItems[j];displayName= this.Adapter.applyStyle(highlightNode.eobj.EClass.Name, highlightNode.eobj);if(displayName.name== highlightName)
{highlightNode.select(false,true);break;}
}
}
}
else
{this.a_index[i].select(false,true);break;}
}
}
}
if(highlightNode!=null)
{if(!this.selectedItem)
this.selectedItem= highlightNode;}
if(selectArray!=null)
{for(var j= 0; j< selectArray.length; j++)
{var signature= selectArray[j];for(var k=0; k<this.a_index.length;k++)
{var tempSignature= this.a_index[k].eobj.getSignature();if(tempSignature!= null&& tempSignature== signature)
{this.a_index[k].check("ONSELECT",true);break;}
}
}
}
}
Tree.prototype.getStateObj= function()
{var stateObj= new Object();var openString= selectString="";for(var key=0; key<this.a_index.length; key++)
{var itemObj= this.a_index[key];if(itemObj.isOpened== true)
{openString= constructStateString(itemObj.eobj, openString);}
if(this.rootItem.checkedItemArray[itemObj.eobj.ID]!=null)
{selectString= constructStateString(itemObj.eobj,selectString);}
}
stateObj.openStr= openString;stateObj.selectStr=";"+selectString;return stateObj;}
Tree.prototype.getSelStateStr= function()
{if(this.selectedItem){var signature=(typeof(this.selectedItem)=="string")?this.selectedItem:this.selectedItem.eobj.getSignature();if(signature!=null)
{return";"+ signature;}
}else{return";null";}
}
Tree.prototype.generateUIStateString= function()
{var stateString="";var stateObj= this.getStateObj();stateString+= stateObj.openStr;stateString+= this.getSelStateStr();stateString+= stateObj.selectStr;return stateString;}
function constructStateString(eobj, stateString)
{var signature= null;if(eobj) signature= eobj.getSignature();if(signature!=null)
{if(stateString=="")
{stateString= signature;}
else
{stateString+=","+signature;}
}
return stateString;}
Tree.prototype.expandNodeWithID= function(xmiID, index, len)
{for(var i=0; i<this.a_index.length;i++){if(this.a_index[i].eobj.ID== xmiID){var expandNode= this.a_index[i];var xmlNode= expandNode.xmlNode;var nIndex= 0;var eobj= expandNode.eobj;var elementWrap= new ElementWrapper(xmlNode, true);if(xmlNode.getAttribute("childrenLen")>xmlNode.childNodes.length){this.Adapter.GetChildContent(elementWrap, eobj, 0);}
if(elementWrap.element.getAttribute("childrenLen")>0){for(var j= 0; j< xmlNode.childNodes.length; j++)
{var node= xmlNode.childNodes[j];if(node.nodeType!= 1)
continue;new TreeItem(expandNode, node, nIndex);nIndex++;}
this.expand(i);}else{expandNode.childItems.length= 0;expandNode.changeNode2Leaf();expandNode.isOpened= true;}
break;}
}
}
Tree.prototype.constructStateStrFromObj= function(inputArr, stateStr)
{if(inputArr==null||inputArr=='undefined')
return null;var stateString= openString="";var len= inputArr.length-1;for(var i=0; i<len; i++)
{openString= constructStateString(inputArr[i], openString);}
stateString+= openString;if(inputArr[len]!=null){var signature= inputArr[len].getSignature();if(signature!=null)
{stateString+=";"+ signature+";";}
}else{stateString+=";null;";}
return stateString
}
Tree.prototype.constructStateStrFromAttr= function(attrName, valueArr,stateStr)
{var eobjArr= new Array();if(attrName&&valueArr)
{for(var i=0; i<valueArr.length; i++)
{eobjArr[eobjArr.length]= findEObjectByAtrName(this.Adapter.eobjRoot, attrName, valueArr[i]);}
}
if(eobjArr.length>0)
return this.constructStateStrFromObj(eobjArr, stateStr);else
return null;}
Tree.prototype.getSelectedItems= function()
{return this.compactCheckedItemsArray();}
Tree.prototype.getHighlightedItem= function()
{return this.selectedItem.eobj;}
Tree.prototype.getExpandededItems= function()
{return this.compactOpenItemsArray();}
Tree.prototype.compactCheckedItemsArray= function()
{var checkedItems= this.checkedEObjectArray;var rtArray= new Array();for(var k in checkedItems)
{if(checkedItems[k]!= null)
{rtArray[rtArray.length]= checkedItems[k];}
}
return rtArray;}
Tree.prototype.compactOpenItemsArray= function()
{var openItems= this.Adapter.expandedNode;var rtArray= new Array();for(var k in openItems)
{if(openItems[k]!= null)
{rtArray[rtArray.length]= openItems[k];}
}
return rtArray;}
 
Tree.prototype.addDOMElem= function(parentIndex,domElem)
{var htmlElement= document.getElementById('i_div'+this.a_index[parentIndex].rootItem.itemID+'_'+ this.a_index[parentIndex].itemID);if(htmlElement)
{if(domElem[0]!= null)
htmlElement.appendChild(domElem[0]);if(domElem[1]!= null)
htmlElement.appendChild(domElem[1]);}
this.Adapter.SetPropertyBinders(0);}
Tree.prototype.removeChildrenItems= function(parentObj)
{ 
if(parentObj.childItems!=null&&parentObj.childItems.length>0&&parentObj.childItems[0]!="dummy")
{this.recursiveRemove(parentObj);parentObj.childItems[0]="dummy";var tempArray=[];var tempLen=0;for(var i=0; i<this.a_index.length; i++)
{if(this.a_index[i]!=null)
{tempArray[tempLen]=this.a_index[i];this.a_index[i].itemID=tempLen;tempLen++;}
}
this.a_index=tempArray;}
}
Tree.prototype.recursiveRemove= function(parentObj)
{if(parentObj.childItems!=null&&parentObj.childItems.length>0&&parentObj.childItems[0]!="dummy")
{for(var k=0; k< parentObj.childItems.length; k++)
{ 
for(var j=0;j<this.a_index.length;j++)
{if(this.a_index[j]!=null)
{if(parentObj.childItems[k].itemID==this.a_index[j].itemID)
this.a_index[j]=null;}
}
for(var i=0; i< parentObj.childItems.length; i++)
{this.recursiveRemove(parentObj.childItems[i]);}
}
parentObj.childItems[0]=null;parentObj.childItems.length=0;}
}
Tree.prototype.findItemByAtrName= function(attrName, attrValue)
{var root= this.Adapter.eobjRoot;var eobject= findEObjectByAtrName(this.Adapter.eobjRoot, attrName, attrValue);var item= null;if(eobject){for(var j=0;j<this.a_index.length;j++)
{ 
if(this.a_index[j].eobj.ID==eobject.ID)
{item= this.a_index[j];break;}
}
}
return item;}
function TreeItem(parentItem, xmlNode, itemIndex, isLeaf)
{if(isLeaf=="undefined"||isLeaf==null)
this.isLeaf=2;else
this.isLeaf=isLeaf;this.currentRowNumber;this.currentCellNumber;this.depth= parentItem.depth+ 1;this.xmlNode= xmlNode;this.itemName= this.xmlNode.displayName;this.rootItem= parentItem.rootItem;this.parentItem= parentItem;this.itemIndex= itemIndex;this.isOpened= false; 
this.rootItem.alength++;this.itemID= this.rootItem.a_index.length;this.rootItem.a_index[this.itemID]= this;parentItem.childItems[itemIndex]= this;this.customItemOpenedImage= xmlNode.getAttribute("treeopenimgfile");this.customItemClosedImage= xmlNode.getAttribute("treecloseimgfile");this.showSystemIconFlag= xmlNode.getAttribute("showsystemiconflag");this.customOpenedImagealt= xmlNode.getAttribute("treeopenimgalt");this.customClosedImagealt= xmlNode.getAttribute("treecloseimgalt");this.eobj= xmlNode.eobject; 
this.propertName= xmlNode.propertyName;this.eventHandler= xmlNode.eventHandler; 
 
var numChildren= xmlNode.getAttribute("childrenLen"); 
if(this.isLeaf==1)
this.childItems= new Array();else if(this.isLeaf==0)
{ 
if(temp!=null&&temp>0)
{var dummyObject="dummy";this.childItems= new Array(1); 
this.childItems[0]=dummyObject;}
} 
else if(( numChildren!=null&& numChildren>0)
|| this.itemID==0)
this.childItems= new Array(1); 
else
{xmlNode.setAttribute("hasNoChildrenValues",true);this.childItems= new Array();}
var nIndex= 0;for(var i= 0; i< xmlNode.childNodes.length; i++)
{var node= xmlNode.childNodes[i];if(node.nodeType!= 1)
continue;new TreeItem(this, node, nIndex);nIndex++;}
 
 
var expandCheck=this.checkForEvent("onnodeexpand","onexpand");var collapseCheck=this.checkForEvent("onnodecollapse","oncollapse");if(expandCheck||collapseCheck)
this.expandCollapseCheck=true;else
this.expandCollapseCheck=false;if(this.parentItem.itemID==0)
this.isRootChild="true";else
this.isRootChild="false"; 
}
TreeItem.prototype.checkForEvent= function(treeEvent,nodeEvent)
{var treeEvents=null;var nodeEvents=null;if(treeEvent!=null&&treeEvent!="undefined"&&this.rootItem.eventArray.length>0)
{treeEvents=this.checkTreeEvent(treeEvent);}
if(nodeEvent!=null&&nodeEvent!="undefined"&&this.eventHandler!=null&&this.eventHandler!='undefined')
{nodeEvents=this.checkNodeEvent(nodeEvent);}
 
if(treeEvents!=null||nodeEvents!=null)
{return true;}
 
return false;}
TreeItem.prototype.getJunctionImage= function getJunctionImage()
{var srcImage='';var childless=!this.hasChildren();var handlerPresent;if(childless&&this.expandCollapseCheck)
handlerPresent=true;else
handlerPresent=false;if(this.rootItem.workPlaceFlag!=true) 
{if(this.childItems.length&& this.isOpened&&(!childless|| handlerPresent))
srcImage=(!this.rootItem.rootVisibleFlag&&this.itemID==1)?this.rootItem.treeIconObjs["minustop"]:(this.isLast()? this.rootItem.treeIconObjs["minus"]: this.rootItem.treeIconObjs["minusbottom"]);else if(this.childItems.length&&(!childless|| handlerPresent))
srcImage=(!this.rootItem.rootVisibleFlag&&this.itemID==1)?this.rootItem.treeIconObjs["plustop"]:(this.isLast()? this.rootItem.treeIconObjs["plus"]: this.rootItem.treeIconObjs["plusbottom"]);else
srcImage=(!this.rootItem.rootVisibleFlag&&this.itemID==1)?this.rootItem.treeIconObjs["jointop"]:(this.isLast()? this.rootItem.treeIconObjs["joint"]: this.rootItem.treeIconObjs["jointbottom"]);}
else
{if(this.isRootChild=="false"||this.rootItem.rootVisibleFlag)
{if(this.childItems.length&& this.isOpened&&(!childless|| handlerPresent))
srcImage=(!this.rootItem.rootVisibleFlag&&this.itemID==1)?this.rootItem.treeIconObjs["minustop"]:(this.isLast()? this.rootItem.treeIconObjs["minus"]: this.rootItem.treeIconObjs["minusbottom"]);else if(this.childItems.length&&(!childless|| handlerPresent))
srcImage=(!this.rootItem.rootVisibleFlag&&this.itemID==1)?this.rootItem.treeIconObjs["plustop"]:(this.isLast()? this.rootItem.treeIconObjs["plus"]: this.rootItem.treeIconObjs["plusbottom"]);else
srcImage=(!this.rootItem.rootVisibleFlag&&this.itemID==1)?this.rootItem.treeIconObjs["jointop"]:(this.isLast()? this.rootItem.treeIconObjs["joint"]: this.rootItem.treeIconObjs["jointbottom"]);}
else
{if(this.childItems.length&& this.isOpened&&(!childless|| handlerPresent))
srcImage= this.rootItem.treeIconObjs["plainminus"];else if(this.childItems.length&&(!childless|| handlerPresent))
srcImage= this.rootItem.treeIconObjs["plainplus"];else
srcImage= this.rootItem.treeIconObjs["empty"];}
}
return srcImage.src;}
TreeItem.prototype.getBlankImage= function getBlankImage()
{var srcImage='';srcImage= this.rootItem.treeIconObjs["empty"];return srcImage.src;} 
 
TreeItem.prototype.getImage= function getImage(isJunction)
{var srcImage='';if(this.depth>= 0)
{var userDefinedIconMappingArray= null;if(this.customItemOpenedImage&&(this.customItemOpenedImage!='undefined')&&(this.isOpened)){ 
return this.customItemOpenedImage;} else if(this.customItemClosedImage&&(this.customItemOpenedImage!='undefined')&&(!this.isOpened)){return this.customItemClosedImage;}
if(this.childItems.length&& this.isOpened)
{if(this.itemID==0)
srcImage= this.rootItem.treeIconObjs["baseopen"];else
srcImage= this.rootItem.treeIconObjs["nodeopen"];}
else if(this.childItems.length)
{if(this.itemID==0)
srcImage= this.rootItem.treeIconObjs["baseopen"];else
srcImage= this.rootItem.treeIconObjs["nodeclose"];}
else 
{if(this.itemID==0)
srcImage= this.rootItem.treeIconObjs["baseopen"];else
srcImage= this.rootItem.treeIconObjs["leaf"];}
}
return srcImage.src;}
TreeItem.prototype.refresh= function()
{var wasOpened= this.isOpened;var htmlElement= get_element('i_div'+ this.rootItem.itemID+'_'+ this.itemID);if(!htmlElement)
{htmlElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID);if(!htmlElement)
return;}
var htmlRootElement= get_element('i_div'+ this.rootItem.itemID+'_'+ this.rootItem.itemID);if(!htmlRootElement)
{htmlRootElement= get_element('i_txt'+ this.rootItem.itemID+'_'+ this.rootItem.itemID);if(!htmlRootElement)
return;}
if(this.depth<= 1&& this.childItems.length> 0)
{var tempElem= this.rootItem.childItems[0].init(); 
htmlRootElement.parentNode.appendChild(tempElem[0]);if(tempElem[1]!= null)
htmlRootElement.parentNode.appendChild(tempElem[1]);this.rootItem.childItems[0].open();}
else
{var tempElem= this.init(); 
htmlElement.parentNode.appendChild(tempElem[0]);if(tempElem[1]!= null)
htmlElement.parentNode.appendChild(tempElem[1]);}
this.open(!wasOpened);}
TreeItem.prototype.changeIcon= function item_open()
{var o_jicon= document.getElementById("j_img"+ this.rootItem.itemID+"_"+ this.itemID);var o_iicon= document.getElementById("i_img"+ this.rootItem.itemID+"_"+ this.itemID);if(o_jicon)
{o_jicon.src= this.getJunctionImage();o_jicon.alt= this.getJunctionImageAlt();o_jicon.title= this.getJunctionImageAlt();}
if(o_iicon)
{o_iicon.src= this.getImage();o_iicon.alt= this.getImageAlt();o_iicon.title= this.getImageAlt();}
}
TreeItem.prototype.changeNode2Leaf= function()
{this.changeIcon();var o_jalink= document.getElementById('j_a'+ this.rootItem.itemID+'_'+ this.itemID),
o_ialink= document.getElementById('i_a'+ this.rootItem.itemID+'_'+ this.itemID);if(o_jalink){o_jalink.onclick= o_jalink.ondblclick="javascript:return;";}
if(o_ialink){o_ialink.ondblclick="javascript:return;";}
}
TreeItem.prototype.open= function item_open(toClose)
{var divElem= get_element('i_div'+ this.rootItem.itemID+'_'+ this.itemID);if(!divElem)
return;if(this.childItems!=null&&this.childItems.length>0&&this.childItems[0]!="dummy")
{if(!divElem.innerHTML)
{var childItems=[];var str;try{for(var i= 0; i< this.childItems.length; i++)
{if(this.childItems[i]!=null)
childItems[i]= this.childItems[i].init();}
}catch(e){this.childItems.length=0;this.changeNode2Leaf(); 
return; 
}
for(var len= 0; len< childItems.length;len++)
{if(childItems[len]!=null)
{divElem.appendChild(childItems[len][0]);if(childItems[len][1]!= null)
divElem.appendChild(childItems[len][1]);} 
}
}
}
divElem.style.display=(toClose?'none':'block');if(this.rootItem.dynamicFlag==true)
{if(toClose== true) 
{for(var i=(divElem.childNodes.length - 1); i>= 0; i--)
{ 
if(divElem.childNodes[i]!= null)
{divElem.removeChild(divElem.childNodes[i]);}
}
}
}
this.isOpened=!toClose;this.changeIcon();this.upstatus(false,"open");}
TreeItem.prototype.isExpanded=function()
{return this.isOpened;}
TreeItem.prototype.hasChildren= function() 
{var childless= this.xmlNode.getAttribute("hasNoChildrenValues");if((childless=="true")||(childless==true))
{childless= true;}
else
{childless= false;}
return!childless;}
TreeItem.prototype.toggle= function() 
{this.rootItem.toggle(this.itemID);}
TreeItem.prototype.activeTreeEvent= function(action,extrainfo)
{var uaction= action.toUpperCase();var events=this.checkTreeEvent(uaction);if(events!=null)
{var handler= events;var e= new ODCEvent(action);e.eobject=this.eobj;e.model= this.rootItem.Adapter.xmiModel;switch(uaction)
{case"ONNODEHIGHLIGHT":
e.propertyName= this.propertyName
break;case"ONNODEEXPAND": case"ONNODECOLLAPSE":
e.levels=(extrainfo)?extrainfo:"1";e.openedItemsArray= this.rootItem.compactOpenItemsArray();var str= this.rootItem.getStateObj();var openStr= str.openStr;var selStr= this.rootItem.getSelStateStr();var chkStr= str.selectStr;var lastExpandSig= this.eobj.getSignature();e.stateString= openStr+","+ lastExpandSig+selStr+chkStr;var expandArr= new Array();if(openStr.indexOf(",")!=-1)
expandArr= openStr.split(",");else
expandArr[expandArr.length]= openStr;expandArr[expandArr.length]= lastExpandSig;e.expandedNodeArray= expandArr;break;case"ONNODESELECT": case"ONNODEUNSELECT":
e.checkedItemsArray= this.rootItem.compactCheckedItemsArray();break;case"ONNODEDROP": case"ONNODEDRAGENTEROVER":
var nativeEvent=(extrainfo)?extrainfo:1;if(nativeEvent!=1)
e.nativeEvent=extrainfo;break;default:
break;}
if(eval(handler+".call(this,this, e);")== false)
{return false;}
if(uaction=="ONNODEDRAGENTEROVER"&&!this.rootItem.userHighlight)
{return"true";}
}
return true;}
TreeItem.prototype.activeNodeEvent= function(action,extrainfo)
{var uaction= action.toUpperCase();if(this.eventHandler!=null&&this.eventHandler!='undefined')
{var events=this.checkNodeEvent(uaction);if(events!=null)
{var handler= events[1];var e= new ODCEvent(action);e.eobject=this.eobj;e.model= this.rootItem.Adapter.xmiModel;switch(uaction)
{case"ONHIGHLIGHT":
e.propertyName= this.propertyName
break;case"ONEXPAND": case"ONCOLLAPSE":
e.openedItemsArray= this.rootItem.compactOpenItemsArray();e.levels=(extrainfo)?extrainfo:"1";break;case"ONSELECT": case"ONUNSELECT":
e.checkedItemsArray= this.rootItem.compactCheckedItemsArray();break;case"ONDROP": case"ONDRAGENTEROVER": 
var nativeEvent=(extrainfo)?extrainfo:1;if(nativeEvent!=1)
e.nativeEvent=extrainfo; 
break;default:
break;}
if(eval(handler+".call(this,this, e);")== false)
{return false;}
if(uaction=="ONDRAGENTEROVER"&&!this.rootItem.userHighlight)
{return"true";}
}
}
 
return true;}
 
TreeItem.prototype.checkTreeEvent= function(action)
{var uaction= action.toUpperCase();if(this.rootItem.eventArray.length>0)
{for(var i=0; i<this.rootItem.eventArray.length;i++)
{if(this.rootItem.eventArray[i][0].toUpperCase()== uaction)
{return this.rootItem.eventArray[i][1];}
}
}
return null;} 
TreeItem.prototype.checkNodeEvent= function(action)
{var uaction= action.toUpperCase();this.eventHandler= this.eventHandler.replace(/ /g,"");var eventArray= this.eventHandler.split(";");for(var i=0; i<eventArray.length; i++)
{var events= eventArray[i].split(",");if(events[0].toUpperCase()== uaction)
return events;}
return null;} 
TreeItem.prototype.annotate= function(dataArray,nestedID)
{var divElem="";if(!nestedID)
divElem=get_element('i_td'+ this.rootItem.itemID+'_'+ this.itemID);else
divElem=get_element(nestedID);var newElem;if(dataArray[1]=="text")
{newElem=document.createTextNode(dataArray[3]);}
else if(dataArray[1]=="link")
{newElem= document.createElement("a");newElem.setAttribute("id","i_link"+ this.rootItem.itemID+"_"+ this.itemID);}
else if(dataArray[1]=="image")
{newElem= document.createElement("img");newElem.setAttribute("id","i_mg"+ this.rootItem.itemID+"_"+ this.itemID);}
else if(dataArray[1]=="input")
{newElem= document.createElement("INPUT");newElem.setAttribute("id","i_in"+ this.rootItem.itemID+"_"+ this.itemID);}
else if(dataArray[1]=="span")
{newElem= document.createElement("span");newElem.setAttribute("id","i_span"+ this.rootItem.itemID+"_"+ this.itemID);}
else 
{alert("Error: Unsupported annotation type");return;}
if(dataArray[1]!="text")
{for(var i=0; i<dataArray.length;i++)
{ 
if(dataArray[i]!="nestedType")
newElem.setAttribute(dataArray[i],dataArray[i+1]);else if(dataArray[i]=="id")
{alert("ID is already set to "+newElem.id+" and is not editable");continue;}
else
{divElem.appendChild(newElem); 
dataArray[i]="annotType";var newDataArray=[];var index=0;for(var j=i;j<dataArray.length; j++)
{newDataArray[index]=dataArray[j];index++;}
this.annotate(newDataArray,newElem.id);return;}
i++;}
} 
divElem.appendChild(newElem); 
}
TreeItem.prototype.select= function item_select(toDeselect,disableEvent)
{var oldItem= this.rootItem.selectedItem;this.rootItem.selectedItem= this;if(!toDeselect)
{if(!disableEvent){if(!this.activeNodeEvent("onHighlight"))
{this.rootItem.selectedItem=oldItem;return false;}
if(!this.activeTreeEvent("onNodeHighlight"))
{this.rootItem.selectedItem=oldItem;return false;}
}
if(oldItem){if(typeof(oldItem)!="string")
oldItem.select(true);}
}
else
{this.rootItem.selectedItem=oldItem;oldItem= null;} 
var o_iicon= I['i_img'+ this.rootItem.itemID+'_'+ this.itemID];if(o_iicon) o_iicon.src= this.getImage();var labelNormalStyle= this.rootItem.styleClass+"labelNormalStyle";var labelHighlightStyle= this.rootItem.styleClass+"labelHighlightStyle";if(get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID)!= null)
get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= toDeselect? labelNormalStyle: labelHighlightStyle;window.status= this.itemName+(this.itemTarget?' ('+ this.itemTarget+')':'');return Boolean(this.itemTarget);}
TreeItem.prototype.check= function item_check(selectFlag, disableEvent)
{if(selectFlag=="ONSELECT"){this.rootItem.checkedItemArray[this.eobj.ID]= this.itemID;this.rootItem.checkedEObjectArray[this.eobj.ID]= this.eobj;}else{this.rootItem.checkedItemArray[this.eobj.ID]= null;this.rootItem.checkedEObjectArray[this.eobj.ID]= null;}
this.recursiveCheck(this.rootItem, this, selectFlag);if(!disableEvent){if(!this.activeNodeEvent(selectFlag))
return false;if(selectFlag.toUpperCase()=="ONSELECT"){if(!this.activeTreeEvent("onNodeSelect"))
return false;}else{if(!this.activeTreeEvent("onNodeUnSelect"))
return false;}
}
return true;}
TreeItem.prototype.recursiveCheck= function(tree, selectItem, selectFlag)
{if(selectFlag=="ONSELECT"){get_element('ckbox'+ tree.itemID+'_'+ selectItem.itemID).checked= true;}else{get_element('ckbox'+ tree.itemID+'_'+ selectItem.itemID).checked= false;}
this.backwardRecursive(tree,selectItem.parentItem, selectFlag);for(var i=0; i<selectItem.childItems.length; i++)
{if(selectItem.childItems[i]!=null){if(get_element('ckbox'+ tree.itemID+'_'+ selectItem.childItems[i].itemID)!= null)
if(selectFlag=="ONSELECT"){get_element('ckbox'+ tree.itemID+'_'+ selectItem.childItems[i].itemID).checked= true;tree.checkedItemArray[selectItem.childItems[i].eobj.ID]= selectItem.childItems[i].itemID;tree.checkedEObjectArray[selectItem.childItems[i].eobj.ID]= selectItem.childItems[i].eobj;}else{get_element('ckbox'+ tree.itemID+'_'+ selectItem.childItems[i].itemID).checked= false;tree.checkedItemArray[selectItem.childItems[i].eobj.ID]= null;tree.checkedEObjectArray[selectItem.childItems[i].eobj.ID]= null;}
this.recursiveCheck(tree, selectItem.childItems[i], selectFlag);}
}
}
TreeItem.prototype.backwardRecursive= function(tree,parentItem, selectFlag)
{if(parentItem.eobj!=null){if(selectFlag=="ONUNSELECT"){for(var j=0; j<parentItem.childItems.length;j++)
{var eobjid= parentItem.childItems[j].eobj.ID;if(tree.checkedItemArray[eobjid]!=null)
{return;}
}
if(get_element('ckbox'+ tree.itemID+'_'+ parentItem.itemID)!=null)
get_element('ckbox'+ tree.itemID+'_'+ parentItem.itemID).checked= false;tree.checkedItemArray[parentItem.eobj.ID]= null;tree.checkedEObjectArray[parentItem.eobj.ID]= null;}else{for(var j=0; j<parentItem.childItems.length;j++)
{var eobjid= parentItem.childItems[j].eobj.ID;if(tree.checkedItemArray[eobjid]==null)
{return;}
}
if(get_element('ckbox'+ tree.itemID+'_'+ parentItem.itemID)!=null)
get_element('ckbox'+ tree.itemID+'_'+ parentItem.itemID).checked= true;tree.checkedItemArray[parentItem.eobj.ID]= parentItem.itemID;tree.checkedEObjectArray[parentItem.eobj.ID]= parentItem.eobj;}
this.backwardRecursive(tree,parentItem.parentItem, selectFlag);}
}
TreeItem.prototype.getJunctionImageAlt= function()
{var childless=!this.hasChildren();var handlerPresent;if(childless&&this.expandCollapseCheck)
handlerPresent=true;else
handlerPresent=false;if(this.childItems.length&& this.isOpened&&(!childless|| handlerPresent))
return odcTreeimgCollapse; 
else if(this.childItems.length&&(!childless|| handlerPresent))
return odcTreeimgExpand; 
else
return"";}
TreeItem.prototype.getImageAlt= function()
{if(this.depth>=0)
{var childless=!this.hasChildren();var handlerPresent;if(childless&&this.expandCollapseCheck)
handlerPresent=true;else
handlerPresent=false;if(this.childItems.length&& this.isOpened&&(!childless|| handlerPresent))
{if(this.customOpenedImagealt)
return this.customOpenedImagealt;else
return odcTreeimgFolderOpen;}
else if(this.childItems.length&&(!childless|| handlerPresent))
{if(this.customClosedImagealt)
return this.customClosedImagealt;else
return odcTreeimgFolderNormal;}
else
{if(this.customOpenedImagealt)
return this.customOpenedImagealt;else if(this.customClosedImagealt)
return this.customClosedImagealt;else
return odcTreeimgLeaf;}
}
}
TreeItem.prototype.init= function item_init()
{var rootId= this.rootItem.itemID;var itemId= this.itemID; 
var aOffset=[],currentItem= this.parentItem;var imgElem;for(var i= this.depth; i> 1; i--)
{if(this.rootItem.workPlaceFlag!=true)
currentItem.isLast()? strSrc= this.rootItem.treeIconObjs["empty"].src: strSrc= this.rootItem.treeIconObjs["line"].src;else
if(i!=2)
currentItem.isLast()? strSrc= this.rootItem.treeIconObjs["empty"].src: strSrc= this.rootItem.treeIconObjs["line"].src;else
strSrc= this.rootItem.treeIconObjs["empty"].src;imgElem= document.createElement("img");imgElem.setAttribute("src",strSrc);imgElem.setAttribute("alt","");imgElem.setAttribute("border","0");imgElem.setAttribute("align","absbottom");aOffset[i]= imgElem;currentItem= currentItem.parentItem;}
var iconStyle= this.rootItem.styleClass+"nodeImageStyle";var nodeLableStyle= this.rootItem.styleClass+"labelNormalStyle";var linkStyle= this.rootItem.styleClass+"linkTextStyle";var nodeStyle= this.rootItem.styleClass+"nodeStyle";var scrollStyle= this.rootItem.styleClass+"scrollStyle"; 
var item= this.rootItem.selectedItem;if(!this.rootItem.treeTableFlag)
var tdStyle= this.rootItem.styleClass+"tdStyle";else
var tdStyle= this.rootItem.styleClass+"tdTreeTabStyle";if(item)
{if(typeof(item)=="string")
{if(item==this.eobj.getSignature())
{nodeLableStyle= this.rootItem.styleClass+"labelHighlightStyle";this.rootItem.selectedItem= this;}
}
}
var returnArr= new Array();var divElem, tableElem, trElem, tdElem, anchorElem, anchorImgElem, anchorElem2, anchorImgElem2, inputElem, labelElem;if(!this.rootItem.rootVisibleFlag&&this.itemID==0)
{if(this.childItems.length)
{divElem= document.createElement("div");divElem.style.borderWidth="0px";divElem.setAttribute("id","i_div"+ this.rootItem.itemID+"_"+ this.itemID);divElem.style.display="none"; 
}
returnArr[0]= divElem;return returnArr;}
else
{if(this.childItems.length>this.rootItem.scrollNum&&!this.scrollFlag)
{var scroll=true;this.scrollFlag=true;}
else
var scroll=false;var height=this.rootItem.scrollNum*(20*this.depth);if(scroll)
{divElem= document.createElement("div");divElem.className=scrollStyle;divElem.setAttribute("height",height);} 
tableElem= document.createElement("table");tableElem.setAttribute("id","i_tab"+ this.rootItem.itemID+"_"+ this.itemID);tableElem.className=nodeStyle;trElem= tableElem.insertRow(this.currentRowNumber++); 
trElem.setAttribute("id","i_tr"+ this.rootItem.itemID+"_"+ this.itemID);if(this.rootItem.treeTableFlag)
{trElem=this.addTabularData(trElem);}
tdElem= trElem.insertCell(this.currentCellNumber++);tdElem.setAttribute("id","i_td"+ this.rootItem.itemID+"_"+ this.itemID);tdElem.className=tdStyle; 
if(this.rootItem.treeTableFlag&&this.rootItem.treeTableWidthArr!=null)
{tempWidth=this.getWidth(this.rootItem.treeTableWidthArr[0]);widthElem= document.createElement("img");widthElem=setInvGifStyle(widthElem);widthElem.setAttribute("src",this.rootItem.treeIconObjs["invisiblegif"].src); 
widthElem.setAttribute("width",tempWidth);tdElem.appendChild(widthElem);if(this.rootItem.tableWidth)
tableElem.setAttribute("width",this.rootItem.tableWidth);}
if(this.depth> 0)
{ 
for(var leng= 0; leng< aOffset.length; leng++)
{if(aOffset[leng]!= null)
tdElem.appendChild(aOffset[leng]);}
var handlerPresent;if(!this.hasChildren()&&this.expandCollapseCheck)
handlerPresent=true;else
handlerPresent=false;if(this.childItems.length> 0)
{ 
if(this.showSystemIconFlag=="false")
{anchorElem= document.createElement("img");anchorElem.setAttribute("src",this.getBlankImage()); 
anchorElem.setAttribute("alt",""); 
anchorElem.className= iconStyle;anchorElem.setAttribute("border","0");anchorElem.setAttribute("align","absbottom");}
else if(!this.hasChildren()&&handlerPresent==false)
{anchorElem= document.createElement("img");anchorElem.setAttribute("src",this.getJunctionImage()); 
anchorElem.setAttribute("alt",""); 
anchorElem.className= iconStyle;anchorElem.setAttribute("border","0");anchorElem.setAttribute("align","absbottom");}
else 
{ 
anchorElem= document.createElement("a");anchorElem.setAttribute("href","javascript:;"); 
anchorElem.className= linkStyle;anchorElem.setAttribute("id","j_a"+ this.rootItem.itemID+"_"+ this.itemID);try{anchorElem.clickMethod=function()
{ 
if(typeof(odcTrees)!="undefined")
{return odcTrees[ rootId].toggle( itemId);} 
else
{ 
return null; 
}
}
anchorElem.moverMethod=function()
{ 
if(typeof(odcTrees)!="undefined")
{return odcTrees[ rootId].mover( itemId);} 
else
{ 
return null; 
}
}
anchorElem.moutMethod=function()
{ 
if(typeof(odcTrees)!="undefined")
{return odcTrees[ rootId].mout( itemId);} 
else
{ 
return null; 
}
}
addStandardEvent(anchorElem,"click", anchorElem.clickMethod, true);addStandardEvent(anchorElem,"mouseover", anchorElem.moverMethod, true);addStandardEvent(anchorElem,"mouseout", anchorElem.moutMethod, true);}
catch(e)
{alert(e);}
anchorImgElem= document.createElement("img");anchorImgElem.setAttribute("src",this.getJunctionImage()); 
anchorImgElem.setAttribute("alt",this.getJunctionImageAlt());anchorImgElem.setAttribute("title",this.getJunctionImageAlt());anchorImgElem.setAttribute("border","0");anchorImgElem.setAttribute("align","absbottom");anchorImgElem.setAttribute("id","j_img"+ this.rootItem.itemID+"_"+ this.itemID); 
anchorImgElem.className= iconStyle; 
anchorElem.appendChild(anchorImgElem); 
}
}
else
{if(this.showSystemIconFlag=="false"||(!this.hasChildren()&&handlerPresent==false))
{anchorImgElem= document.createElement("img");anchorImgElem.setAttribute("src",this.getJunctionImage()); 
anchorImgElem.setAttribute("alt","");anchorImgElem.setAttribute("border","0");anchorImgElem.setAttribute("align","absbottom"); 
anchorImgElem.setAttribute("class",iconStyle); 
}
else
{anchorImgElem= document.createElement("img");anchorImgElem.setAttribute("src",this.getBlankImage()); 
anchorImgElem.setAttribute("alt","");anchorImgElem.setAttribute("border","0");anchorImgElem.setAttribute("align","absbottom"); 
anchorImgElem.setAttribute("class",iconStyle);}
}
}
if(odcTrees[this.rootItem.itemID].enableSelect)
{inputElem= document.createElement("input");inputElem.setAttribute("type","checkbox"); 
inputElem.setAttribute("id","ckbox"+ this.rootItem.itemID+"_"+ this.itemID); 
inputElem.clickMethod= function(){ odcTrees[ rootId].check(document.getElementById("ckbox"+rootId+"_"+itemId), itemId);}
addStandardEvent(inputElem,"click", inputElem.clickMethod, true); 
}
anchorElem2= document.createElement("a");anchorElem2.setAttribute("href","javascript:;"); 
anchorElem2.className= linkStyle;anchorElem2.id="i_a"+ this.rootItem.itemID+"_"+ this.itemID;if(this.hasChildren()||(!this.hasChildren()&& handlerPresent==true))
{anchorElem2.dblClickMethod=function(){ return odcTrees[ rootId].toggle( itemId);}
addStandardEvent(anchorElem2,"dblclick", anchorElem2.dblClickMethod, true);}
anchorElem2.moverMethod=function()
{ 
if(typeof(odcTrees)!="undefined")
{return odcTrees[ rootId].mover( itemId);}
else
{ 
return null;}
}
anchorElem2.moutMethod=function()
{ 
if(typeof(odcTrees)!="undefined")
{return odcTrees[ rootId].mout( itemId);}
else
{ 
return null;}
}
anchorElem2.clickMethod=function()
{ 
if(typeof(odcTrees)!="undefined")
{return odcTrees[ rootId].select( itemId);}
else
{return null;}
}
addStandardEvent(anchorElem2,"click", anchorElem2.clickMethod, true);addStandardEvent(anchorElem2,"mouseover", anchorElem2.moverMethod, true); 
addStandardEvent(anchorElem2,"mouseout", anchorElem2.moutMethod, true);if(this.rootItem.enableDrop&&this.childItems.length>0)
{anchorElem2=this.addDropEvents(anchorElem2);}
anchorImgElem2= document.createElement("img");anchorImgElem2.setAttribute("src",this.getImage()); 
anchorImgElem2.setAttribute("alt",this.getImageAlt());anchorImgElem2.setAttribute("title",this.getImageAlt());anchorImgElem2.setAttribute("border","0");anchorImgElem2.setAttribute("align","absbottom");anchorImgElem2.setAttribute("id","i_img"+ this.rootItem.itemID+"_"+ this.itemID);anchorImgElem2.className= iconStyle;labelElem= document.createElement("label");labelElem.setAttribute("id","i_txt"+ this.rootItem.itemID+"_"+ this.itemID);labelElem.className= nodeLableStyle;var text= document.createTextNode(this.itemName); 
labelElem.appendChild(text);anchorElem2.appendChild(anchorImgElem2); 
anchorElem2.appendChild(labelElem);if(this.depth> 0)
{if(this.childItems.length)
tdElem.appendChild(anchorElem);else
tdElem.appendChild(anchorImgElem);} 
if(odcTrees[this.rootItem.itemID].enableSelect)
tdElem.appendChild(inputElem);tdElem.appendChild(anchorElem2);if(this.childItems.length> 0)
{str_elem_end= document.createElement("div");str_elem_end.style.borderWidth="0px"; 
str_elem_end.id="i_div"+ this.rootItem.itemID+"_"+ this.itemID;returnArr[1]= str_elem_end;}
if(scroll)
{divElem.appendChild(tableElem);elem_return= divElem;}
else
{elem_return= tableElem;}
returnArr[0]= elem_return;return returnArr;}
}
 
TreeItem.prototype.addTabularData= function(trElem)
{ 
var tdTableStyle= this.rootItem.styleClass+"tdTableStyle";var nodeLableStyle= this.rootItem.styleClass+"labelNormalStyle";var eobjMembers=this.eobj.Members;var dataId=this.rootItem.Adapter.dataHandler[this.eobj.EClass.Name];var dataArr=null;if(dataId!=null)
{dataArr= this.eobj.eGet(dataId);} 
var numCols=this.rootItem.treeTableArr.length-1;for(var k=numCols-1;k>=0;k--)
{var tdElem= trElem.insertCell(this.currentCellNumber++);tdElem.setAttribute("id","i_td_"+this.currentCellNumber+"_"+ this.rootItem.itemID+"_"+ this.itemID);tdElem.className=tdTableStyle;if(this.rootItem.treeTableWidthArr!=null)
{tempWidth=this.getWidth(this.rootItem.treeTableWidthArr[k+1]);widthElem= document.createElement("img");widthElem=setInvGifStyle(widthElem);widthElem.setAttribute("src",this.rootItem.treeIconObjs["invisiblegif"].src); 
widthElem.setAttribute("width",tempWidth);tdElem.appendChild(widthElem);}
var labelElem= document.createElement("label");labelElem.setAttribute("id","i_txt_"+this.currentCellNumber+"_"+this.rootItem.itemID+"_"+ this.itemID);labelElem.className= nodeLableStyle;if(dataArr!=null)
{if(dataArr[k]!=null)
text= document.createTextNode(" "+dataArr[k]); 
else
text= document.createTextNode(""); 
}
else
{text= document.createTextNode(""); 
}
labelElem.appendChild(text);tdElem.appendChild(labelElem);}
return trElem;}
TreeItem.prototype.addDropEvents= function(element)
{var rootId=this.rootItem.itemID;var itemId=this.itemID;element.dragEnterMethod=function(e){odcTrees[ rootId].dover( itemId,e);}
element.dragOverMethod=function(e){odcTrees[ rootId].dover( itemId,e);}
addStandardEvent(element,"dragenter", element.dragEnterMethod, true); 
addStandardEvent(element,"dragover", element.dragOverMethod,true);if(isIE())
{element.dragLeaveMethod=function(){odcTrees[ rootId].dout(itemId);}
addStandardEvent(element,"dragleave",element.dragLeaveMethod,true);}
else
{element.addEventListener("dragexit"
,function(e)
{odcTrees[ rootId].dout(itemId); 
}
,false);}
if(isIE())
{element.dropMethod=function(){odcTrees[ rootId].drop(itemId, window.event);}
addStandardEvent(element,"drop",element.dropMethod,true);}
else
{element.addEventListener("dragdrop"
,function(e)
{odcTrees[ rootId].drop(itemId, e); 
e.cancelBubble= true; 
if(e.stopPropagation) 
e.stopPropagation();}
,false);}
 
return element; 
}
TreeItem.prototype.upstatus= function item_upstatus(b_clear,type)
{window.status= b_clear?'': this.itemName+(this.itemTarget?' ('+ this.itemTarget+')':'');var labelMouseoverStyle= this.rootItem.styleClass+"labelMouseoverStyle";var labelNormalStyle= this.rootItem.styleClass+"labelNormalStyle";var labelDragoverStyle= this.rootItem.styleClass+"labelDragoverStyle";var labelHighlightStyle= this.rootItem.styleClass+"labelHighlightStyle";if(get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID)!= null)
{if(type=="mouseover")
{get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelMouseoverStyle;}
else if(type=="mouseout")
{var item= odcTrees[this.rootItem.itemID].selectedItem;if(item&&typeof(item)!="string"&&item.eobj.ID== this.eobj.ID)
{get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelHighlightStyle;}
else
get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelNormalStyle;}
else if(type=="dragover")
{get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelDragoverStyle;}
else if(type=="dragout"||type=="dropout")
{var item= odcTrees[this.rootItem.itemID].selectedItem;if(item&&typeof(item)!="string"&&item.eobj.ID== this.eobj.ID)
{get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelHighlightStyle;}
else
get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelNormalStyle;}
else
{get_element('i_txt'+ this.rootItem.itemID+'_'+ this.itemID).className= labelNormalStyle;}
}
}
TreeItem.prototype.isLast= function()
{return this.itemIndex== this.parentItem.childItems.length - 1;};TreeItem.prototype.getWidth= function(width)
{var widthpercentage;if(width.indexOf("%")!=-1)
{widthpercentage= parseFloat(width)/100;newWidth= getWindowSize()[0]*widthpercentage;}
else if(width.indexOf("px")>-1)
newWidth= width.substring(0,width.indexOf("px"));else
newWidth= width;return newWidth;};if(!odcTrees) 
{var odcTrees=[]; 
}
function TreeCtrlError(d)
{this.description= d;}
get_element= document.all?
function(s_id){ return document.all[s_id]}:
function(s_id){ return document.getElementById(s_id)};
