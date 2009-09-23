//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
function WDateChooser(id, textId, buttonId, isLTR, isReadOnly, tabIndex,
cal, df, yearSize, selDate, firstDate, lastDate, secureURL) {
this.buildCalendarBody=WDateChooser_buildCalendarBody;this.buildCalendarDiv=WDateChooser_buildCalendarDiv;this.updateCalendarView=WDateChooser_updateCalendarView;this.updateSelectedDate=WDateChooser_updateSelectedDate;this.updateCurrentDate=WDateChooser_updateCurrentDate;this.setVisible=WDateChooser_setVisible;this.hilightSelection=WDateChooser_hilightSelection;this.selectMonth=WDateChooser_selectMonth;this.selectWeek=WDateChooser_selectWeek;this.selectDate=WDateChooser_selectDate;this.nextMonth=WDateChooser_nextMonth;this.prevMonth=WDateChooser_prevMonth;this.getSelectedDate=WDateChooser_getSelectedDate;this.getSelectedDateRange=WDateChooser_getSelectedDateRange;this.convertCalendarArrayToText=WDateChooser_convertCalendarArrayToText;this.convertTextToCalendarArray=WDateChooser_convertTextToCalendarArray;this.makeId=WDateChooser_makeId;this.getElementById=WDateChooser_getElementById;this.setText=WDateChooser_setText;this.getText=WDateChooser_getText;this.setImage=WDateChooser_setImage;this.getImage=WDateChooser_getImage;this.setStyle=WDateChooser_setStyle;this.getStyle=WDateChooser_getStyle;this.setStyleClass=WDateChooser_setStyleClass;this.getStyleClass=WDateChooser_getStyleClass;this.applyStyle=WDateChooser_applyStyle;this.applyCursorStyle=WDateChooser_applyCursorStyle;this.addStyleSheet=WDateChooser_addStyleSheet;this.isWeekendDay=WDateChooser_isWeekendDay;this.initDefaultStyles=WDateChooser_initDefaultStyles;this.id=id;this.textId=textId;this.buttonId=buttonId;this.isLTR=isLTR;this.isReadOnly=isReadOnly;this.tabIndex=tabIndex;this.cal=cal;this.df=df;this.yearSize=yearSize;if (selDate != null && selDate.length != 0) {
this.selDate=cal.clone();this.df.parse(selDate, this.selDate);}else {
this.selDate=null;};if (firstDate != null && firstDate.length != 0) {
this.firstDate=cal.clone();this.df.parse(firstDate, this.firstDate);}else {
this.firstDate=null;};if (lastDate != null && lastDate.length != 0) {
this.lastDate=cal.clone();this.df.parse(lastDate, this.lastDate);}else {
this.lastDate=null;};this.secureURL=(secureURL ? secureURL : null);this.layer=null;this.useLayer=true;if (this.useLayer && this.layer == null) {
try {
if (WLayerFactory != null) {
this.layer=WLayerFactory.createWLayer(this.id + "_calLayer", self, false, true, false, this.secureURL); // @10C1
}}catch (e) { };}this.selMode=1;this.navMode=2;this.monthNavMode=0;this.text=new Array();this.images=new Array();this.styles=new Array();this.styleClasses=new Array();this.styleSheets=new Array();this.elementsById=new Array();this.today=cal.clone();this.today.date=new Date();this.selectable=false;this.weekdayLabels=null;this.yearmonthFormatPattern="MMMM yyyy";this.yearFormatPattern="yyyy";this.monthFormatPattern="MMMM";this.monthDateFormatPattern="MMMM d";this.selection=0;this.separator="|";this.onchange=null;this.onclickBackup=null;this.onkeyupBackup=null;this.accessibleMessages=null;this.clientFormatValidation=true;this.elementHeight=NaN;};function WDateChooser_makeId(id, element) {
var eid=this.id + "_" + id;if (element != null) {
this.elementsById[eid]=element;}return eid;};function WDateChooser_getElementById(id, aDoc) {
if (aDoc != null) {
return aDoc.getElementById(id);}else {
return document.getElementById(id);};};function WDateChooser_setImage(imgKey, imgObj) {
this.images[imgKey]=imgObj;};function WDateChooser_getImage(imgKey) {
return this.images[imgKey];};function WDateChooser_setText(textKey, textObj) {
this.text[textKey]=textObj;};function WDateChooser_getText(textKey) {
var rText=this.text[textKey];if (rText == null) {
rText=textKey;}return rText;};function WDateChooser_setStyle(styleKey, styleObj) {
this.styles[styleKey]=styleObj;};function WDateChooser_getStyle(styleKey) {
return this.styles[styleKey];};function WDateChooser_getStyleClass(styleKey) {
return this.styleClasses[styleKey];};function WDateChooser_setStyleClass(styleKey, styleObj) {
this.styleClasses[styleKey]=styleObj;};function WDateChooser_applyStyle(styleKey, tag) {
if (tag != null && styleKey != null) {
var sClass=this.getStyleClass(styleKey);if (sClass != null)
{
tag.className=sClass;tag.style.cssText=null;tag.setAttribute("style", null);}else
{
var style=this.getStyle(styleKey);if (style != null) {
if (style.applyStyle != null) {
style.applyStyle(tag, this.isLTR);}else {
tag.className=null;tag.style.cssText=style;tag.setAttribute("style", style);};}else {
switch (styleKey) {
case "BORDER": //@07A
style="dc10";     //@08C1
break;case "CAL_BORDER": //@07A
style="dc11";     //@08C1
break;case "DAY_NAME":
style="dc1";     //@08C1
break;case "DAY":
style="dc2";     //@08C1
break;case "DAY_LINK":
style="dc3";    //@08C1
break;case "WEEKEND_DAY":
style="dc5";     //@08C1
break;case "SELECTED_DAY":
style="dc6";     //@08C1
break;case "SELECTED_DAY_LINK": //@07A
style="dc4";     //@08C1
break;case "EMPTY_DAY":
style="dc7";     //@08C1
break;case "CAL_TOP":
style="dc8";     //@08C1
break;case "SELECTED_CAL_TOP":
style="dc8";     //@08C1
break;case "CAL_BOT":
style="dc9";    //@08C1
break;case "MONTH_RADIO":
style="dcs1";    //@08C1
break;case "WEEK_RADIO_ON":
style="dcs3";    //@08C1
break;case "WEEK_RADIO_OFF":
style="dcs4";    //@08C1
break;case "CAL_TEXT":
style="wclDateChooserText";break;case "BUTTON":
style="b1";      //@08C1
break;case "BUTTON_OVER":
style="b2";      //@08C1
break;case "COMBO_BOX":
style="cb1";     //@08C1
break;};if (style != null) {
tag.className=style;tag.style.cssText=null;tag.setAttribute("style", null);}};};}};function WDateChooser_applyCursorStyle(pointer, tag) {
var style=(document.all) ? tag.style.cssText : tag.getAttribute("style");if (tag.style.cursor || style != null) {
var cursor=(pointer) ? "pointer" : "default";if (tag.style.cssText == null) {
tag.style.cursor=cursor;}else {
style+=";cursor:" + cursor + ";";tag.style.cssText=style;tag.setAttribute("style", style);}}};function WDateChooser_addStyleSheet(css) {
this.styleSheets[this.styleSheets.length]=css;};function WDateChooser_isWeekendDay(day) {
var weekends=null;if (this.weekendDays != null && this.weekendDays.length > 0)
weekends=this.weekendDays.split("|");if (weekends != null) {
for (var i=0; i < weekends.length; i++) {
if (day == weekends[i]) {
return true;}};}return false;};function WDateChooser_setVisible(visible)
{
if (WClient.isBrowserInternetExplorer()) {
if (document.readyState != "complete") {
setTimeout(this.id + ".setVisible(" + visible + ")", 100);return;}}if (!this.layer.isRendered())
{
var calendarDiv=this.buildCalendarDiv();this.layer.setHTMLElement(calendarDiv);this.layer.setVisible(false);this.layer.render();}if (visible  && !this.layer.isVisible())
{
var dateInput=this.getElementById(this.textId);var c=this.cal.clone();var result=null;if (dateInput) {
var cals=this.convertTextToCalendarArray(dateInput.value);if (cals != null) {
if (cals.length == 1) {
c=cals[0];result=c.date;}else if (cals.length == 2) {
var workCal=cals[0].clone();var maxWeekdays=this.df.dateFormatSymbols.shortWeekdays.length;for (var i=0; workCal.date <= cals[1].date && i <= maxWeekdays; i++) {
workCal.add("DATE", 1);};if (i == maxWeekdays && cals[0].get("DAY_OF_WEEK") == this.cal.firstDayOfWeek) {
this.selection=1;c=cals[0].clone();}else {
this.selection=-1;c=cals[0].clone();if (c.get("DATE") != 1) {
c.set("DATE", 1);c.add("MONTH", 1);}};result=c.date;}}}if (result == null || isNaN(result))
{
c=this.today.clone();this.updateSelectedDate(null);this.updateCurrentDate(null);}else
{
this.updateSelectedDate(c);this.updateCurrentDate(c);};this.updateCalendarView(c);this.hilightSelection(undefined, true);var element=null;if (dateInput != null && dateInput.type == "text") {
element=dateInput;}if (element == null) {
element=this.getElementById(this.id + "_div");}if (element == null) {
element=this.getElementById(this.buttonId);}if (isNaN (this.elementHeight)) {
this.elementHeight=WUtilities.getHeight(element);}var posX=WUtilities.getLeft(element, true);var posY=WUtilities.getTop(element, true) + this.elementHeight;var alignOffset=0;var offsetWidth=WUtilities.getOffsetWidth(element, document);if (element.parentNode.align == "center" && offsetWidth != NaN) {
alignOffset=offsetWidth / 2;}if (!this.isLTR)
{
posX+=WUtilities.getWidth(element);var divWidth=this.layer.getDimension().getWidth();if (WClient.isBrowserMozilla())
{
}posX -= divWidth;posX+=alignOffset;}else {
posX+=alignOffset;}this.layer.setPosition(new Position(posX, posY, 100));this.layer.update();this.layer.setVisible(true);if (this.selMode == 3) {
var dim=this.layer.getDimension();element.style.height=dim.getHeight() + this.elementHeight + 10 + "px";element.style.width=dim.getWidth() + 10 + "px";}if (this.navMode == 0)
{
document.getElementById(this.makeId("comboMonth")).focus();}else
{
document.getElementById(this.makeId("prevMonth")).focus();};if (this.selMode != 3) {
this.onclickBackup=document.onclick;this.onkeyupBackup=document.onkeyup;document.onclick=WDateChooser_documentClickHandler;document.onkeyup=WDateChooser_documentKeyUpHandler;}}else
{
this.layer.setVisible(false);if (this.selMode != 3) {
document.onclick=this.onclickBackup;document.onkeyup=this.onkeyupBackup;}}};function WDateChooser_closeAll(parent) {
if (parent == null) {
parent=document.body;}if (typeof parent == "string") {
parent=document.getElementById(parent);}if (parent.childNodes == undefined)
return;if (parent.tagName == "INPUT" && parent.className == "wDateChooserIdClass") {
var dc=eval(parent.value);if (dc) {
if (dc.selMode != 3) {
dc.setVisible(false);}return;}}if (parent.childNodes.length != 0) {
for (var i=0; i < parent.childNodes.length; i++) {
WDateChooser_closeAll(parent.childNodes[i]);};}};function WDateChooser_updateCalendarView(c, aDoc) {
var era=null;var year=null;var month=null;var date=null;if (c != null) {
era=c.get("ERA");year=c.get("YEAR");month=c.get("MONTH");date=c.get("DAY_OF_MONTH");}var selectedYearIndex=-1;if (era == null) {
var eSel=this.getElementById(this.makeId("comboEra"), aDoc);if (eSel != null) {
era=eSel.value;}else {
era=parseInt(this.getElementById(this.makeId("hideEra")).value);}}if (year == null) {
var eSel=this.getElementById(this.makeId("comboYear"), aDoc);if (eSel != null) {
year=eSel.value;}else {
year=parseInt(this.getElementById(this.makeId("hideYear")).value);}}if (month == null) {
var eSel=this.getElementById(this.makeId("comboMonth"), aDoc);if (eSel != null) {
month=eSel.selectedIndex;}else {
month=parseInt(this.getElementById(this.makeId("hideMonth")).value);}}if (c == null) {
c=this.cal.clone();WDateChooser_initCalendarDate(c);if (era)
c.set("ERA", era);if (year)
c.set("YEAR", year);if (month)
c.set("MONTH", month);if (date)
c.set("DATE", date);}this.updateCurrentDate(c);if (this.navMode == 1) {
var eText=this.getElementById(this.makeId("textYearMonth"), aDoc);if (eText != null) {
var ymCal=this.cal.clone();WDateChooser_initCalendarDate(ymCal);ymCal.set("ERA", era);ymCal.set("YEAR", year);ymCal.set("MONTH", month);var oldPattern=this.df.pattern;this.df.pattern=this.yearmonthFormatPattern;eText.innerHTML=this.df.format(ymCal);this.df.pattern=oldPattern;}}else {
var idx=0;var size=this.yearSize;var startYear;if (size%2 != 0) {
startYear=year - ((size-1)/2);}else {
startYear=year - (size/2);};var eYear=this.getElementById(this.makeId("comboYear"), aDoc);for (var i=0; i<size; i++) {
if (eYear.options[i] == null) {
if (aDoc != null) {
var opt=aDoc.createElement("OPTION");opt.appendChild(aDoc.createTextNode(""));eYear.appendChild(opt);}else {
var opt=document.createElement("OPTION");opt.appendChild(document.createTextNode(""));eYear.appendChild(opt);};}eYear.options[i].value=startYear + i;eYear.options[i].childNodes[0].data=startYear + i;idx++;};for (var i=0; i<eYear.options.length; i++)
{
if (eYear.options[i].value == year)
{
selectedYearIndex=i;if (WClient.isBrowserMozilla())
{
eYear.options[i].defaultSelected=true;eYear.selectedIndex=i-1;}eYear.selectedIndex=i;break;}};var eMonth=this.getElementById(this.makeId("comboMonth"), aDoc);if (WClient.isBrowserMozilla())
{
eMonth.options[month].defaultSelected=true;}eMonth.selectedIndex=month;};var selDates=this.getSelectedDateRange();if (this.selectable && selDates != null && selDates.length > 0) {
var cal=selDates[0].clone();if (cal.get("DATE") != 1) {
cal.set("DATE", 1);cal.add("MONTH", 1);}var selEra=cal.get("ERA");var selYear=cal.get("YEAR");var selMonth=cal.get("MONTH");var id=this.makeId("selectMonth");var img=this.getElementById(id, aDoc);if (img != null) {
var oldPattern=this.df.pattern;this.df.pattern=this.yearmonthFormatPattern;var ymStr=this.df.format(c);this.df.pattern=oldPattern;var a=img.parentNode;a.removeChild(img);var limg;var title
if (this.selection < 0 && selEra == era && selYear == year && selMonth == month) {
limg=this.getImage("ROW_SELECTED");title=this.accessibleMessages["str.alt.month.selected"] + ymStr;}else {
limg=this.getImage("SELECT_ROW");title=this.accessibleMessages["str.alt.month.selection"].replace("{0}", ymStr);};img=limg.createElement(this.isLTR);img.id=id;img.style.display="inline";img.title=img.alt=title;a.appendChild(img);}var id=this.makeId("calTop");var table=this.getElementById(id, aDoc);if (this.selection < 0 && selEra == era && selYear == year && selMonth == month)
this.applyStyle("SELECTED_CAL_TOP", table);else
this.applyStyle ("CAL_TOP", table);}var calTable, calTableBody;calTable=this.getElementById(this.makeId("calTable"), aDoc);calTableBody=calTable.childNodes[0];calTable.removeChild(calTableBody);calTableBody=this.buildCalendarBody(c, aDoc)
calTable.appendChild(calTableBody);if (this.layer != null)
{
if (this.selMode == 3 && this.layer.isVisible())
{
var orgDim=this.layer.getDimension();this.layer.update();var newDim=this.layer.getDimension();var div=this.getElementById(this.id + "_div");if (div != null) {
div.style.height=WUtilities.getHeight(div) + newDim.getHeight() - orgDim.getHeight() + "px";div.style.width=WUtilities.getWidth(div) + newDim.getWidth() - orgDim.getWidth() + "px";}}else
{
this.layer.update();};}if (selectedYearIndex != -1)
{
if (WClient.isBrowserInternetExplorer())
{
var eYear=document.getElementById(this.makeId("comboYear"));eYear.selectedIndex=selectedYearIndex;}}};function WDateChooser_updateCurrentDate(c) {
var era=null;var year=null;var month=null;var date=null;if (c != null) {
era=c.get("ERA");year=c.get("YEAR");month=c.get("MONTH");date=c.get("DAY_OF_MONTH");WDateChooser_initCalendarDate(this.cal);this.cal.set("ERA", era);this.cal.set("YEAR", year);this.cal.set("MONTH", month);this.cal.set("DATE", date);}var hide=this.getElementById(this.makeId("hideEra"));hide.value=era;var hide=this.getElementById(this.makeId("hideYear"));hide.value=year;hide=this.getElementById(this.makeId("hideMonth"));hide.value=month;hide=this.getElementById(this.makeId("hideDate"));hide.value=date;};function WDateChooser_updateSelectedDate(c, updInput) {
var era=null;var year=null;var month=null;var date=null;if (c != null)  {
era=c.get("ERA");year=c.get("YEAR");month=c.get("MONTH");date=c.get("DATE");}if (c != null) {
if (this.selDate == null) {
this.selDate=c.clone();}else {
WDateChooser_initCalendarDate(this.selDate);this.selDate.set("ERA", era);this.selDate.set("YEAR", year);this.selDate.set("MONTH", month);this.selDate.set("DATE", date);};}else {
this.selDate=null;};if (this.selMode == 1 || this.selMode == 3) {
var hide=this.getElementById(this.makeId("smEra"));hide.value=era;var hide=this.getElementById(this.makeId("smYear"));hide.value=year;hide=this.getElementById(this.makeId("smMonth"));hide.value=month;hide=this.getElementById(this.makeId("smDate"));hide.value=date;}if (updInput != null && updInput == true) {
WDateChooser_updateInputField(this);}};function WDateChooser_updateInputField(dc) {
var dateInput=dc.getElementById(dc.textId);var selectedDates=dc.getSelectedDateRange();var text=dc.convertCalendarArrayToText(selectedDates);if (dateInput != null && text && text.length != 0) {
dateInput.value=text;}};function WDateChooser_saveInputField(dc) {
if (!dc.clientFormatValidation) {
return;}var dateInput=dc.getElementById(dc.textId);if (dateInput != null && dateInput.value != null && dateInput.value.length > 0) {
var c=dc.cal.clone();var date=dc.df.parse(dateInput.value, c);if (!isNaN(date)) {
dc.updateSelectedDate(c);}WDateChooser_updateInputField(dc);}};function WDateChooser_buildCalendarDiv() {
var div=this.getElementById(this.makeId("calDiv"));if (div == null) {
div=document.createElement("DIV");if (this.layer != null) {
}else {
document.body.appendChild(div);div.style.visibility="hidden";div.style.position="absolute";}div.dir=(this.isLTR) ? "LTR" : "RTL"; // @06
div.id=this.makeId("calDiv", div);if (!WClient.isBrowserMozilla() || WClient.isBrowserNetscape())
{
div.style.width="0px";}var hideid=document.createElement("INPUT");hideid.className="wDateChooserIdClass";hideid.type="hidden";div.appendChild(hideid);hideid.value=this.id;var table=document.createElement("TABLE");div.appendChild(table);this.applyStyle("BORDER", table); //@07A
table.id=this.makeId("calDivTable", table);table.border=0;table.cellSpacing=0;table.cellPadding=0;table.dir=(this.isLTR) ? "LTR" : "RTL";if (this.selectable) {
table.summary=this.accessibleMessages["str.date.range.chooser.default.summary"];}else {
table.summary=this.accessibleMessages["str.date.chooser.default.summary"];}var tb=document.createElement("TBODY");table.appendChild(tb);var tr=document.createElement("TR");tb.appendChild(tr);var td;var tdCount=0;td=document.createElement("TD");td.id=this.makeId("calTop", td);tr.appendChild(td);tdCount++;if (this.selection < 0)
this.applyStyle("SELECTED_CAL_TOP", td);else
this.applyStyle("CAL_TOP", td);var htable=document.createElement("TABLE");td.appendChild(htable);htable.border=0;htable.cellSpacing=0;htable.cellPadding=3;htable.width="100%";htable.dir=(this.isLTR) ? "LTR" : "RTL";var htb=document.createElement("TBODY");htable.appendChild(htb);var htr=document.createElement("TR");htb.appendChild(htr);var hnbsp;if (this.navMode > 0) {
if (this.selectable) {
var htd=document.createElement("TD");if (this.selection < 0)
htd.align="left";htd.style.whiteSpace="nowrap";htd.noWrap=true;htd.onclick=WDateChooser_selectMonthHandler;if (this.selMode == 1 || this.selMode == 3) {
if (document.all) {
htd.ondblclick=WDateChooser_selectMonthHandler;}else {
htd.addEventListener("dblclick", WDateChooser_selectMonthHandler, false);}}this.applyStyle("MONTH_RADIO", htd);htr.appendChild(htd);var a=document.createElement("A");a.href="javascript:void(0);";htd.appendChild(a);var limg;if (this.selection < 0)
limg=this.getImage("ROW_SELECTED");else
limg=this.getImage("SELECT_ROW");var eimg=limg.createElement(this.isLTR);eimg.id=this.makeId("selectMonth", eimg);eimg.style.display="inline";a.appendChild(eimg);}var htd=document.createElement("TD");htd.align="left";htd.style.whiteSpace="nowrap";htd.noWrap=true;htr.appendChild(htd);var link=document.createElement("A");htd.appendChild(link);link.id=this.makeId("prevMonth", link);link.href="javascript:void(0);";link.onclick=WDateChooser_prevMonthHandler;if (this.tabIndex != 0) {
link.tabIndex=this.tabIndex != 0
}var limg=this.getImage("PREVIOUS_MONTH");var eimg=limg.createElement(this.isLTR);eimg.id=this.makeId("prevMonthImg", eimg);eimg.onmouseover=WDateChooser_imageOverHandler;eimg.onmouseout=WDateChooser_imageOutHandler;eimg.style.display="inline"; //@03
link.appendChild(eimg);link.title=limg.alt;hnbsp=document.createElement("SPAN");htd.appendChild(hnbsp);hnbsp.innerHTML="&nbsp;";}var htd=document.createElement("TD");htd.align="center";htd.style.whiteSpace="nowrap";htd.noWrap=true;htr.appendChild(htd);if (this.navMode == 1) {
var text=document.createElement("SPAN");htd.appendChild(text);text.id=this.makeId("textYearMonth", text);this.applyStyle("CAL_TEXT", text);}else {
var htd=document.createElement("TD");htd.style.whiteSpace="nowrap";htd.noWrap=true;htr.appendChild(htd);var sel=document.createElement("SELECT");htd.appendChild(sel);sel.id=this.makeId("comboMonth", sel);this.applyStyle("COMBO_BOX", sel);if (this.tabIndex != 0) {
sel.tabIndex=this.tabIndex != 0
}sel.onchange=WDateChooser_updateCalendarViewHandler;var monthSize=this.df.dateFormatSymbols.months.length;for (var i=0; i<monthSize; i++) {
var opt=document.createElement("OPTION");sel.appendChild(opt);opt.appendChild(document.createTextNode(this.df.dateFormatSymbols.months[i]));};hnbsp=document.createElement("SPAN");htd.appendChild(hnbsp);hnbsp.innerHTML="&nbsp;";sel=document.createElement("SELECT");htd.appendChild(sel);sel.id=this.makeId("comboYear", sel);this.applyStyle("COMBO_BOX", sel);if (this.tabIndex != 0) {
sel.tabIndex=this.tabIndex != 0
}sel.onchange=WDateChooser_updateCalendarViewHandler;hnbsp=document.createElement("SPAN");htd.appendChild(hnbsp);hnbsp.innerHTML="&nbsp;";};var htd=document.createElement("TD");htd.style.whiteSpace="nowrap";htd.noWrap=true;htr.appendChild(htd);var hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("hideEra", hidden);hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("hideYear", hidden);hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("hideMonth", hidden);hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("hideDate", hidden);if (this.selMode == 1 || this.selMode == 3) {
var hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("smEra", hidden);hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("smYear", hidden);hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("smMonth", hidden);hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("smDate", hidden);}if (this.selMode == 3 && this.monthNavMode == 1) {
var hidden=document.createElement("INPUT");hidden.type="hidden";td.appendChild(hidden);hidden.id=this.makeId("smWeekNum", hidden);hidden.value=0;}if (this.navMode > 0) {
var htd=document.createElement("TD");htd.align="right";htd.style.whiteSpace="nowrap";htd.noWrap=true;htr.appendChild(htd);hnbsp=document.createElement("SPAN");htd.appendChild(hnbsp);hnbsp.innerHTML="&nbsp;";link=document.createElement("A");htd.appendChild(link);link.id=this.makeId("nextMonth", link);if (this.tabIndex != 0) {
link.tabIndex=this.tabIndex != 0
}link.href="javascript:void(0);";link.onclick=WDateChooser_nextMonthHandler;var limg=this.getImage("NEXT_MONTH");var eimg=limg.createElement(this.isLTR);eimg.id=this.makeId("nextMonthImg", eimg);eimg.onmouseover=WDateChooser_imageOverHandler;eimg.onmouseout=WDateChooser_imageOutHandler;eimg.style.display="inline"; //@03
link.appendChild(eimg);link.title=limg.alt;}var showClose=(this.selMode == 0);if (showClose) {
var ctd=document.createElement("TD");htr.appendChild(ctd);ctd.align=(this.isLTR) ? "right" : "left";ctd.vAlign="top";var clink=document.createElement("A");ctd.appendChild(clink);if (this.tabIndex != 0) {
clink.tabIndex=this.tabIndex != 0
}clink.href="javascript:void(0);";clink.onclick=WDateChooser_closeHandler;var cimg=this.getImage("CLOSE");var eimg=cimg.createElement(this.isLTR);eimg.style.display="inline";clink.appendChild(eimg);clink.title=cimg.alt;}tr=document.createElement("TR");tb.appendChild(tr);td=document.createElement("TD");tr.appendChild(td);this.applyStyle("CAL_BOT", td);if (showClose || tdCount > 1) {
td.colSpan=tdCount;}var ctable=document.createElement("TABLE");td.appendChild(ctable);this.applyStyle("CAL_BORDER", ctable); //@07A
ctable.id=this.makeId("calTable", ctable);ctable.border=0;ctable.cellSpacing=0;ctable.cellPadding=3;ctable.width="100%";ctable.dir=(this.isLTR) ? "LTR" : "RTL";var ctb=document.createElement("TBODY");ctable.appendChild(ctb);ctb.id=this.makeId("calTableBody", ctb);if (this.selMode == 1) {
tr=document.createElement("TR");tb.appendChild(tr);td=document.createElement("TD");tr.appendChild(td);this.applyStyle("CAL_BOT", td);if (showClose || tdCount > 1) {
td.colSpan=tdCount;}var button=document.createElement("INPUT");button.type="button";td.appendChild(button);this.applyStyle("BUTTON", button);if (document.all) {
button.style.height="100%";}if (this.tabIndex != 0) {
button.tabIndex=this.tabIndex != 0
}button.value=this.getText("OK");button.onmouseover=WDateChooser_buttonOverHandler;button.onmouseout=WDateChooser_buttonOutHandler;button.onclick=WDateChooser_buttonOkHandler;var text=document.createElement("SPAN");td.appendChild(text);text.innerHTML="&nbsp;";button=document.createElement("INPUT");button.type="button";td.appendChild(button);this.applyStyle("BUTTON", button);if (document.all) {
button.style.height="100%";}if (this.tabIndex != 0) {
button.tabIndex=this.tabIndex != 0
}button.value=this.getText("CANCEL");button.onmouseover=WDateChooser_buttonOverHandler;button.onmouseout=WDateChooser_buttonOutHandler;button.onclick=WDateChooser_buttonCancelHandler;}}return div;};function WDateChooser_buildCalendarBody(c, aDoc) {
var era=null;var year=null;var month=null;var date=null;if (c != null) {
era=c.get("ERA");year=c.get("YEAR");month=c.get("MONTH");date=c.get("DAY_OF_MONTH");}if (aDoc == null) {
aDoc=document;}var tb=aDoc.createElement("TBODY");tb.id=this.makeId("calTableBody", tb);var calendar;if (c == null) {
calendar=this.cal.clone();}else {
calendar=c.clone();};calendar.set("DATE", 1);var fDow=calendar.get("DAY_OF_WEEK");var mDow=this.cal.firstDayOfWeek;var tr, td, link, idx, fidx;var shortWeekdays=this.df.dateFormatSymbols.shortWeekdays;if (this.weekdayLabels != null)
shortWeekdays=this.weekdayLabels;tr=aDoc.createElement("TR");tb.appendChild(tr);if (this.selectable) {
var td=document.createElement("TH");tr.appendChild(td);this.applyStyle("EMPTY_DAY_NAME", td);td.align="center";td.vAlign="bottom";td.innerHTML="&nbsp;";}var daySize=shortWeekdays.length;for (var i=0; i<daySize; i++) {
idx=(i+mDow) % daySize;if (idx == fDow) {
fidx=i;}td=aDoc.createElement("TH");tr.appendChild(td);this.applyStyle("DAY_NAME", td);td.align="center";td.vAlign="bottom";td.innerHTML=shortWeekdays[idx];};var thisMonth=calendar.get("MONTH");for (daysInMonth=0; daysInMonth == 0 || calendar.get("MONTH") == thisMonth; daysInMonth+=7) {
calendar.add("DATE", 7);};daysInMonth=daysInMonth - calendar.get("DATE") + 1;var firstDateEra, firstDateYear, firstDateMonth, firstDateDate;if (this.firstDate != null) {
firstDateEra=this.firstDate.get("ERA");firstDateYear=this.firstDate.get("YEAR");firstDateMonth=this.firstDate.get("MONTH");firstDateDate=this.firstDate.get("DATE");}var lastDateEra, lastDateYear, lastDateMonth, lastDateDate;if (this.lastDate != null) {
lastDateEra=this.lastDate.get("ERA");lastDateYear=this.lastDate.get("YEAR");lastDateMonth=this.lastDate.get("MONTH");lastDateDate=this.lastDate.get("DATE");}var selDates=this.getSelectedDateRange();var selDateEra, selDateYear, selDateMonth, selDateDate;if (selDates != null && selDates.length > 0) {
selDateEra=selDates[0].get("ERA");selDateYear=selDates[0].get("YEAR");selDateMonth=selDates[0].get("MONTH");selDateDate=selDates[0].get("DATE");}var todayEra, todayYear, todayMonth, todayDate;todayEra=this.today.get("ERA");todayYear=this.today.get("YEAR");todayMonth=this.today.get("MONTH");todayDate=this.today.get("DATE");var num=1;var tot=daysInMonth;var daySize=shortWeekdays.length;var week=1;while (num<=tot) {
tr=aDoc.createElement("TR");tb.appendChild(tr);if (this.selectable) {
var td=document.createElement("TD");this.applyStyle("WEEK_RADIO_OFF", td);td.align="left";td.style.whiteSpace="nowrap";td.noWrap=true;if (this.isLTR) {
td.style.borderRight="1px solid " + td.style.borderColor;td.style.borderLeft="0px";}else {
td.style.borderRigtht="0px";td.style.borderLeft="1px solid " + td.style.borderColor;}td.onclick=WDateChooser_selectWeekHandler;if (this.selMode == 1 || this.selMode == 3) {
td.id=this.makeId(era + "_" + year + "_" + month + "_" + week + "_week", td);if (document.all) {
td.ondblclick=WDateChooser_selectWeekHandler;}else {
td.addEventListener("dblclick", WDateChooser_selectWeekHandler, false);}}tr.appendChild(td);var a=document.createElement("A");a.href="javascript:void(0);";td.appendChild(a);var limg;var oldPattern=this.df.pattern;this.df.pattern=this.monthDateFormatPattern;var mdStr=WDateChooser_getMonthDateStringOfNthWeek(era, year, month, week, this.cal.clone(), this.df);this.df.pattern=oldPattern;var title;if (this.selection > 0 && selDateEra == era && selDateYear == year && selDateMonth == month && selDateDate == num) {
limg=this.getImage("ROW_SELECTED");title=this.accessibleMessages["str.alt.week.selected"] + mdStr;var hiddenWeekNum=this.getElementById(this.makeId("smWeekNum"));if(hiddenWeekNum != null) {
hiddenWeekNum.value=week;}}else {
limg=this.getImage("SELECT_ROW");title=this.accessibleMessages["str.alt.week.selection"].replace("{0}", mdStr);}var eimg=limg.createElement(this.isLTR);eimg.id=this.makeId("selectWeek" + week, eimg);eimg.style.display="inline";eimg.title=eimg.alt=title;a.appendChild(eimg);a.childNodes[0].value=week;week++;}for (var i=0; i<daySize; i++) {
td=aDoc.createElement("TD");tr.appendChild(td);td.align=(this.isLTR) ? "left" : "right";td.vAlign="bottom";if ((num == 1 && i<fidx) || num>tot) {
td.innerHTML="&nbsp;";this.applyStyle("EMPTY_DAY", td);}else {
var eraOK=true;var yearOK=true;var monthOK=true;var dateOK=true;var hasFirst=this.firstDate != null;if (hasFirst) {
eraOK=(firstDateEra <= era);if (eraOK) {
yearOK=!(firstDateEra == era && year < firstDateYear);if (yearOK) {
monthOK=!(firstDateEra == era && firstDateYear == year && month < firstDateMonth);if (monthOK) {
dateOK=!(firstDateEra == era && firstDateYear == year && firstDateMonth == month && num < firstDateDate);}}}}var hasLast=this.lastDate != null;if (hasLast && eraOK && yearOK && monthOK && dateOK) {
eraOK=(era <= lastDateEra);if (eraOK) {
yearOK=!(lastDateEra == era && year > lastDateYear);if (yearOK) {
monthOK=!(lastDateEra == era && lastDateYear == year && month > lastDateMonth);if (monthOK) {
dateOK=!(lastDateEra == era && lastDateYear == year && lastDateMonth == month && num > lastDateDate);}}}}var isSelectable=eraOK && yearOK && monthOK && dateOK;var isSelectedDay=(this.selDate != null && era == selDateEra && year == selDateYear && month == selDateMonth && num == selDateDate);if (isSelectable && (!this.isReadOnly || isSelectedDay)) {
var anchorTitle=null;link=aDoc.createElement("A");td.appendChild(link);link.href="javascript:void(0);";if (isSelectedDay && this.selection == 0) {
this.applyStyle("SELECTED_DAY_LINK", link); //@07A
anchorTitle=this.accessibleMessages["str.alt.selected.date"];}else {
this.applyStyle("DAY_LINK", link);};if (num < 10) {
link.innerHTML="&nbsp;" + num + "&nbsp;";}else {
link.innerHTML=num
}if (this.tabIndex != 0) {
link.tabIndex=this.tabIndex != 0
}td.onclick=WDateChooser_selectDateHandler;if (this.selMode == 1 || this.selMode == 3) {
td.id=this.makeId(era + "_" + year + "_" + month + "_" + num, td);td.name=this.makeId(era + "_" + year + "_" + month + "_" + num, td);if (document.all) {
td.ondblclick=WDateChooser_selectDateHandler;}else {
td.addEventListener("dblclick", WDateChooser_selectDateHandler, false);}}if (era == todayEra && year == todayYear && month == todayMonth && num == todayDate) {
link.style.fontWeight="bold";link.style.color="black";if (anchorTitle == null) {
anchorTitle=this.accessibleMessages["str.alt.today"];}else {
anchorTitle=this.accessibleMessages["str.alt.today"] + ", " + anchorTitle;}}if (anchorTitle != null) {
link.title=anchorTitle;var img=this.getImage("CLEAR_PIXEL");if (img != null) {
var imgElem=img.createElement(this.isLTR);imgElem.alt=anchorTitle;imgElem.id=this.makeId("dateClearPixel");link.appendChild(imgElem);}}}else {
td.innerHTML=num;if (era == todayEra && year == todayYear && month == todayMonth && num == todayDate) {
td.style.fontWeight="bold";td.style.color="black";td.title=this.accessibleMessages["str.alt.today"];var img=this.getImage("CLEAR_PIXEL");if (img != null) {
var imgElem=img.createElement(this.isLTR);imgElem.alt=this.accessibleMessages["str.alt.today"];imgElem.id=this.makeId("dateClearPixel");td.appendChild(imgElem);}}};idx=(i+mDow) % daySize;if (isSelectable && isSelectedDay) {
this.applyStyle("SELECTED_DAY", td);}else if (this.isWeekendDay(idx)) {
this.applyStyle("WEEKEND_DAY", td);}else {
this.applyStyle("DAY", td);};var isPointer=(isSelectable && (!this.isReadOnly || isSelectedDay));this.applyCursorStyle(isPointer, td);num++;};};};return tb;};function WDateChooser_hilightSelection(aDoc, isOn) {
var era=parseInt(this.getElementById(this.makeId("hideEra")).value);var year=parseInt(this.getElementById(this.makeId("hideYear")).value);var month=parseInt(this.getElementById(this.makeId("hideMonth")).value);var date=parseInt(this.getElementById(this.makeId("hideDate")).value);var selDates=this.getSelectedDateRange();if (selDates == null)
return;if (this.selection < 0) {
var cal=selDates[0].clone();if (cal.get("DATE") != 1) {
cal.set("DATE", 1);cal.add("MONTH", 1);}var selEra=cal.get("ERA");var selYear=cal.get("YEAR");var selMonth=cal.get("MONTH");var id=this.makeId("selectMonth");var img=this.getElementById(id, aDoc);if (img != null) {
var oldPattern=this.df.pattern;this.df.pattern=this.yearmonthFormatPattern;var ymStr=this.df.format(cal);this.df.pattern=oldPattern;var a=img.parentNode;a.removeChild(img);var limg;var title;if (isOn && selEra == era && selYear == year && selMonth == month) {
limg=this.getImage("ROW_SELECTED");title=this.accessibleMessages["str.alt.month.selected"] + ymStr;}else {
limg=this.getImage("SELECT_ROW");title=this.accessibleMessages["str.alt.month.selection"].replace("{0}", ymStr);};img=limg.createElement(this.isLTR);img.id=id;img.style.display="inline";img.title=img.alt=title;a.appendChild(img);}if (img != null) {
var id=this.makeId("calTop");var table=this.getElementById(id, aDoc);if (isOn && selEra == era && selYear == year && selMonth == month) {
this.applyStyle("SELECTED_CAL_TOP", table);}else {
this.applyStyle ("CAL_TOP", table);};}if (selEra == era && selYear == year && selMonth == month) {
var week=1;while (true) {
var id=this.makeId("selectWeek" + week);var img=this.getElementById(id, aDoc);if (img == null)
break;tr=img.parentNode.parentNode.parentNode;for (var i=1; i < tr.childNodes.length; i++) {
td=tr.childNodes[i];if (isOn && selEra == era && selYear == year && selMonth == month) {
if (td.childNodes != null && td.childNodes[0] != null
&& (td.childNodes[0].tagName == "a" || td.childNodes[0].tagName == "A")) {
this.applyStyle("SELECTED_ALL_WEEKS", td);}else {
this.applyStyle("WEEK", td);};}else {
this.applyStyle("WEEK", td);};td.style.borderTop="0px none";td.style.borderBottom="1px solid white";td.style.borderLeft="0px none";td.style.borderRight="0px none";};week++;};}}else if (this.selection == 0) {
var dateid, datetd;var selCal=selDates[0];dateid=this.makeId(selCal.get("ERA") + "_" + selCal.get("YEAR") + "_" + selCal.get("MONTH") + "_" + selCal.get("DATE"));datetd=this.getElementById(dateid, aDoc);if (datetd == null)
datetd=this.getElementById(dateid);if (datetd == null)
datetd=document.getElementById(dateid);if (datetd != null) {
var day=selCal.get("DAY_OF_WEEK");if (isOn) {
this.applyStyle("SELECTED_DAY", datetd);}else if (this.isWeekendDay(day)) {
this.applyStyle("WEEKEND_DAY", datetd);}else {
this.applyStyle("DAY", datetd);};if (isOn) {
this.applyStyle("SELECTED_DAY_LINK", datetd.childNodes[0]);}else {
this.applyStyle("DAY_LINK", datetd.childNodes[0]);};this.applyCursorStyle(true, datetd);var todayEra=this.today.get("ERA");var todayYear=this.today.get("YEAR");var todayMonth=this.today.get("MONTH");var todayDate=this.today.get("DATE");var anchorTitle=null;if (isOn) {
anchorTitle=this.accessibleMessages["str.alt.selected.date"];}var a=datetd.childNodes[0];if (era == todayEra && year == todayYear && month == todayMonth && date == todayDate) {
a.style.fontWeight="bold";a.style.color="black";if (isOn) {
anchorTitle=this.accessibleMessages["str.alt.today"] + ", " + anchorTitle;}else {
anchorTitle=this.accessibleMessages["str.alt.today"];}}a.title=anchorTitle;var n;var imgId=this.makeId("dateClearPixel");for (n=0; n < a.childNodes.length; n++) {
if (a.childNodes[n].id == imgId) {
a.removeChild(a.childNodes[n]);break;}};if (anchorTitle != null) {
var img=this.getImage("CLEAR_PIXEL");var imgElem=img.createElement(this.isLTR);imgElem.alt=anchorTitle;imgElem.id=imgId;a.appendChild(imgElem);}}}else {
var cal=this.cal.clone();WDateChooser_initCalendarDate(cal);cal.set("ERA", era);cal.set("YEAR", year);cal.set("MONTH", month);cal.set("DATE", 1);var firstDayOfWeek=this.cal.firstDayOfWeek;var lastDayOfWeek;if (firstDayOfWeek != 0)
lastDayOfWeek=firstDayOfWeek - 1;else
lastDayOfWeek=this.df.dateFormatSymbols.shortWeekdays.length - 1;weekdays=this.df.dateFormatSymbols.shortWeekdays.length;var startDay=cal.clone();while (startDay.get("DAY_OF_WEEK") != firstDayOfWeek) {
startDay.add("DATE", -1);};var endDay=cal.clone();endDay.add("MONTH", 1);while (endDay.get("DAY_OF_WEEK") != lastDayOfWeek) {
endDay.add("DATE", 1);};var week=0;if (startDay.date <= selDates[0].date && selDates[0].date <= endDay.date) {
for (week=1; startDay.date < selDates[0].date; week++) {
startDay.add("DATE", weekdays);};}if (week > 0) {
var id=this.makeId("selectWeek" + week);var img=this.getElementById(id, aDoc);if (img) {
var a=img.parentNode;a.removeChild(img);var limg;var title;var oldPattern=this.df.pattern;this.df.pattern=this.monthDateFormatPattern;var mdStr=WDateChooser_getMonthDateStringOfNthWeek(era, year, month, week, this.cal.clone(), this.df);this.df.pattern=oldPattern;if (isOn) {
limg=this.getImage("ROW_SELECTED");title=this.accessibleMessages["str.alt.week.selected"] + mdStr;}else {
limg=this.getImage("SELECT_ROW");title=this.accessibleMessages["str.alt.week.selection"].replace("{0}", mdStr);};img=limg.createElement(this.isLTR);img.id=id;img.style.display="inline";img.title=img.alt=title;a.appendChild(img);a.childNodes[0].value=week;}if (img) {
var td=img.parentNode.parentNode;if (isOn) {
this.applyStyle ("WEEK_RADIO_ON", td);}else {
this.applyStyle ("WEEK_RADIO_OFF", td);};if (this.isLTR) {
td.style.borderRight="1px solid " + td.style.borderColor;td.style.borderLeft="0px";}else {
td.style.borderRigtht="0px";td.style.borderLeft="1px solid " + td.style.borderColor;}}}if (week != 0) {
var id=this.makeId("selectWeek" + week);var img=this.getElementById(id, aDoc);if (img) {
tr=img.parentNode.parentNode.parentNode;for (var i=1; i < tr.childNodes.length; i++) {
td=tr.childNodes[i];if (isOn)
this.applyStyle("SELECTED_WEEK", td);else
this.applyStyle("WEEK", td);td.style.borderTop="0px none";td.style.borderBottom="0px none";td.style.borderLeft="0px none";td.style.borderRight="0px none";};week++;}}};};function WDateChooser_selectMonth(dismiss, aDoc) {
var era=parseInt(this.getElementById(this.makeId("hideEra")).value);var year=parseInt(this.getElementById(this.makeId("hideYear")).value);var month=parseInt(this.getElementById(this.makeId("hideMonth")).value);var c=this.cal.clone();WDateChooser_initCalendarDate(c);c.set("ERA", era);c.set("YEAR", year);c.set("MONTH", month);c.set("DATE", 1);var selDate=c.clone();if (dismiss) {
this.selection=-1;this.updateSelectedDate(selDate, true);this.updateCurrentDate(c);this.setVisible(false);var dateButton=this.getElementById(this.buttonId);if (dateButton != null)
dateButton.focus();}else {
this.hilightSelection(aDoc, false);this.selection=-1;this.updateSelectedDate(selDate, true);this.updateCurrentDate(c);this.hilightSelection(aDoc, true);};};function WDateChooser_selectWeek(week, dismiss, aDoc) {
var era=parseInt(this.getElementById(this.makeId("hideEra")).value);var year=parseInt(this.getElementById(this.makeId("hideYear")).value);var month=parseInt(this.getElementById(this.makeId("hideMonth")).value);var date=parseInt(this.getElementById(this.makeId("hideDate")).value);var c=this.cal.clone();WDateChooser_initCalendarDate(c);c.set("ERA", era);c.set("YEAR", year);c.set("MONTH", month);c.set("DATE", date);var firstDayOfWeek=c.firstDayOfWeek;weekdays=this.df.dateFormatSymbols.shortWeekdays.length;var selDate=c.clone();selDate.set("DATE", 1);while (selDate.get("DAY_OF_WEEK") != firstDayOfWeek) {
selDate.add("DATE", -1);};for (var i=1; i < week; i++) {
selDate.add("DATE", weekdays);if (month != selDate.get("MONTH")) {
break;}};if (week > 1 && month != selDate.get("MONTH")) {
selDate.add("DATE", -1 * weekdays);week--;}if (dismiss) {
this.selection=1;this.updateSelectedDate(selDate, true);this.updateCurrentDate(c);this.setVisible(false);var dateButton=this.getElementById(this.buttonId);if (dateButton != null)
dateButton.focus();}else {
this.hilightSelection(aDoc, false);this.selection=1;var weekNum=this.getElementById(this.makeId("smWeekNum"));if (weekNum != null) {
weekNum.value=week;}this.updateSelectedDate(selDate, true);this.updateCurrentDate(c);this.hilightSelection(aDoc, true);};};function WDateChooser_selectDate(date, dismiss, aDoc) {
if (date != null) {
var era=parseInt(this.getElementById(this.makeId("hideEra")).value);var year=parseInt(this.getElementById(this.makeId("hideYear")).value);var month=parseInt(this.getElementById(this.makeId("hideMonth")).value);var c=this.cal.clone();WDateChooser_initCalendarDate(c);c.set("ERA", era);c.set("YEAR", year);c.set("MONTH", month);c.set("DATE", date);if (c.get("MONTH") != month) {
c.set("DATE", 1);c.add("DATE", -1);}if (dismiss) {
this.selection=0;this.updateSelectedDate(c, true);this.updateCurrentDate(c);this.setVisible(false);var dateButton=this.getElementById(this.buttonId);if (dateButton != null)
dateButton.focus();}else {
this.hilightSelection(aDoc, false);this.selection=0;this.updateSelectedDate(c, true);this.updateCurrentDate(c);this.hilightSelection(aDoc, true);};}};function WDateChooser_nextMonth(aDoc) {
var era=parseInt(this.getElementById(this.makeId("hideEra")).value);var year=parseInt(this.getElementById(this.makeId("hideYear")).value);var month=parseInt(this.getElementById(this.makeId("hideMonth")).value);var date=parseInt(this.getElementById(this.makeId("hideDate")).value);var c=this.cal.clone();WDateChooser_initCalendarDate(c);c.set("ERA", era);c.set("YEAR", year);c.set("MONTH", month);c.set("DATE", 1);c.add("MONTH", 1);if (this.monthNavMode == 1) {
switch(this.selection) {
case -1:
this.updateCalendarView (c, aDoc);this.selectMonth(false, aDoc);break;case 1:
var week=1;var hiddenWeekNum=this.getElementById(this.makeId("smWeekNum"));if(hiddenWeekNum != null) {
week=hiddenWeekNum.value;}this.updateCalendarView (c, aDoc);this.selectWeek(week, false, aDoc);break;case 0:
default:
this.updateCalendarView (c, aDoc);this.selectDate(date, false, aDoc);break;};}else {
this.hilightSelection(aDoc, false);this.updateCalendarView(c, aDoc);this.hilightSelection(aDoc, true);};};function WDateChooser_prevMonth(aDoc) {
var era=parseInt(this.getElementById(this.makeId("hideEra")).value);var year=parseInt(this.getElementById(this.makeId("hideYear")).value);var month=parseInt(this.getElementById(this.makeId("hideMonth")).value);var date=parseInt(this.getElementById(this.makeId("hideDate")).value);var c=this.cal.clone();WDateChooser_initCalendarDate(c);c.set("ERA", era);c.set("YEAR", year);c.set("MONTH", month);c.set("DATE", 1);c.add("MONTH", -1);if (this.monthNavMode == 1) {
switch(this.selection) {
case -1:
this.updateCalendarView (c, aDoc);this.selectMonth(false, aDoc);break;case 1:
var week=1;var hiddenWeekNum=this.getElementById(this.makeId("smWeekNum"));if(hiddenWeekNum != null) {
week=hiddenWeekNum.value;}this.updateCalendarView (c, aDoc);this.selectWeek(week, false, aDoc);break;case 0:
default:
this.updateCalendarView (c, aDoc);this.selectDate(date, false, aDoc);break;};}else {
this.hilightSelection(aDoc, false);this.updateCalendarView(c, aDoc);this.hilightSelection(aDoc, true);};};function WDateChooser_getSelectedDate() {
var cals=this.getSelectedDateRange();return cals[0];};function WDateChooser_getSelectedDateRange() {
var cal;if (this.selDate == null) {
cal=this.cal.clone();cal.setTime(new Date());return new Array(cal);}cal=this.selDate.clone();if (this.selection < 0) {
var startDay=cal.clone();startDay.set("DATE", 1);var endDay=cal.clone();endDay.set("DATE", 1);endDay.add("MONTH", 1);endDay.add("DATE", -1);return new Array(startDay, endDay);}else if (this.selection > 0) {
var firstDayOfWeek=cal.firstDayOfWeek;weekdays=this.df.dateFormatSymbols.shortWeekdays.length;var startDay=cal.clone();while (startDay.get("DAY_OF_WEEK") != firstDayOfWeek) {
startDay.add("DATE", -1);};var endDay=startDay.clone();endDay.add("DATE", weekdays-1);return new Array(startDay, endDay);}return new Array(cal);};function WDateChooser_convertCalendarArrayToText(cals, dateFormat, separator) {
if (dateFormat == undefined || dateFormat == null) {
dateFormat=this.df;}if (separator == undefined || separator == null) {
separator=this.separator;}if (cals == null || typeof cals != "object" || cals.constructor != Array)
return null;var s="";for (var i=0; i < cals.length; i++) {
s+=dateFormat.format(cals[i]);if (i != cals.length -1)
s+=separator;};return s;};function WDateChooser_convertTextToCalendarArray(text, dateFormat, separator) {
if (text == null || text.length == 0)
return null;if (dateFormat == undefined || dateFormat == null) {
dateFormat=this.df;}if (separator == undefined || separator == null) {
separator=this.separator;}var arrayText=text.split(this.separator);var cals=new Array();for (var i=0; i < arrayText.length; i++) {
var c=this.cal.clone();if (isNaN(dateFormat.parse(arrayText[i], c))) {
break;}cals.push(c);};if (cals.length > 0)
return cals;return null;};function WDateChooser_getDateChooser(event) {
var dc=null;var tag=getEventTarget(event);while (tag != null && tag.tagName != "DIV") {
tag=tag.parentNode;if (tag != null && tag.tagName == "DIV") {
dc=eval(tag.childNodes[0].value);break;}};return dc;};function WDateChooser_prevMonthHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
dc.prevMonth(getEventDocument(event));if (dc.monthNavMode == 1) {
if (dc.onchange) {
var onchange=dc.onchange;if (typeof dc.onchange == "string") {
onchange=new Function("event", dc.onchange);}onchange(event);}}}};function WDateChooser_nextMonthHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
dc.nextMonth(getEventDocument(event));if (dc.monthNavMode == 1) {
if (dc.onchange) {
var onchange=dc.onchange;if (typeof dc.onchange == "string") {
onchange=new Function("event", dc.onchange);}onchange(event);}}}};function WDateChooser_updateCalendarViewHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
dc.updateCalendarView(null, getEventDocument(event));}};function WDateChooser_selectMonthHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var dismiss=false;var aEvent=getEvent(event);if (aEvent != null) {
var dblclick=aEvent.type == "dblclick";var click=aEvent.type == "click";dismiss=(dc.selMode == 0 || (dc.selMode == 1 && dblclick) || (dc.selMode == 2 && click));}dc.selectMonth(dismiss, getEventDocument(event));if (dc.onchange) {
var onchange=dc.onchange;if (typeof dc.onchange == "string") {
onchange=new Function("event", dc.onchange);}onchange(event);}}};function WDateChooser_selectWeekHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var dismiss=false;var aEvent=getEvent(event);if (aEvent != null) {
var dblclick=aEvent.type == "dblclick";var click=aEvent.type == "click";dismiss=(dc.selMode == 0 || (dc.selMode == 1 && dblclick) || (dc.selMode == 2 && click));}var week=null;var tag=getEventTarget(event);if (tag != null) {
if (tag.tagName == "TD") {
week=tag.childNodes[0].childNodes[0].value;}else if (tag.tagName == "A") {
week=tag.childNodes[0].value;}else if (tag.value != null) {
week=tag.value;}}dc.selectWeek(week, dismiss, getEventDocument(event));if (dc.onchange) {
var onchange=dc.onchange;if (typeof dc.onchange == "string") {
onchange=new Function("event", dc.onchange);}onchange(event);}}};function WDateChooser_selectDateHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var dismiss=false;var aEvent=getEvent(event);if (aEvent != null) {
var dblclick=aEvent.type == "dblclick";var click=aEvent.type == "click";dismiss=(dc.selMode == 0 || (dc.selMode == 1 && dblclick) || (dc.selMode == 2 && click));}var date=null;var tag=getEventTarget(event);if (tag != null) {
if (tag.tagName == "TD") {
date=tag.childNodes[0].childNodes[0].data;}else if (tag.tagName == "A") {
date=tag.childNodes[0].data;}else if (tag.data != null) {
date=tag.data;}}dc.selectDate(date, dismiss, getEventDocument(event));if (dc.onchange) {
var onchange=dc.onchange;if (typeof dc.onchange == "string") {
onchange=new Function("event", dc.onchange);}onchange(event);}}};function WDateChooser_closeHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
dc.setVisible(false);var dateButton=dc.getElementById(dc.buttonId);dateButton.focus();}};function WDateChooser_buttonOkHandler(event) {
WDateChooser_buttonOutHandler(event);var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var era=parseInt(dc.getElementById(dc.makeId("smEra")).value);var year=parseInt(dc.getElementById(dc.makeId("smYear")).value);var month=parseInt(dc.getElementById(dc.makeId("smMonth")).value);var date=parseInt(dc.getElementById(dc.makeId("smDate")).value);if (!isNaN(era) && !isNaN(year) && !isNaN(month) && !isNaN(date)) {
var dateInput=dc.getElementById(dc.textId);var c=dc.cal.clone();WDateChooser_initCalendarDate(c);c.set("ERA", era);c.set("YEAR", year);c.set("MONTH", month);c.set("DATE", date);if (dateInput)
dateInput.value=dc.df.format(c);}dc.setVisible(false);var dateButton=dc.getElementById(dc.buttonId);dateButton.focus();if (dc.onchange) {
var onchange=dc.onchange;if (typeof dc.onchange == "string") {
onchange=new Function("event", dc.onchange);}onchange(event);}}};function WDateChooser_buttonCancelHandler(event) {
WDateChooser_buttonOutHandler(event);WDateChooser_closeHandler(event);};function WDateChooser_buttonOverHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var tag=getEventTarget(event);if (tag != null) {
dc.applyStyle("BUTTON_OVER", tag);if (document.all) {
tag.style.height="100%";}}}};function WDateChooser_buttonOutHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var tag=getEventTarget(event);if (tag != null) {
dc.applyStyle("BUTTON", tag);if (document.all) {
tag.style.height="100%";}}}};function WDateChooser_imageOverHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var tag=getEventTarget(event);if (tag != null) {
if (tag.id == dc.makeId("prevMonthImg")) {
var himg=dc.getImage("PREVIOUS_MONTH_OVER");tag.src=himg.getSrc(dc.isLTR);}else if (tag.id == dc.makeId("nextMonthImg")) {
var himg=dc.getImage("NEXT_MONTH_OVER");tag.src=himg.getSrc(dc.isLTR);}}}};function WDateChooser_imageOutHandler(event) {
var dc=WDateChooser_getDateChooser(event);if (dc != null) {
var tag=getEventTarget(event);if (tag != null) {
if (tag.id == dc.makeId("prevMonthImg")) {
var himg=dc.getImage("PREVIOUS_MONTH");tag.src=himg.getSrc(dc.isLTR);}else if (tag.id == dc.makeId("nextMonthImg")) {
var himg=dc.getImage("NEXT_MONTH");tag.src=himg.getSrc(dc.isLTR);}}}};function WDateChooser_documentClickHandler(e) {
if (!e) e=window.event;if (getEventTarget(e).className != 'wDateChooserInvoker' && WDateChooser_getDateChooser(e) == null){
WDateChooser_closeAll(null);return true;}return false;};function WDateChooser_documentKeyUpHandler(e) {
if (!e) e=window.event;if (e.keyCode==27 || e.key){
WDateChooser_closeAll(null);return true;}return false;};function WDateChooser_getMonthDateStringOfNthWeek(era, year, month, week, calendar, df) {
var firstDayOfWeek=calendar.firstDayOfWeek;weekdays=df.dateFormatSymbols.shortWeekdays.length;var startCal=calendar.clone();WDateChooser_initCalendarDate(startCal);startCal.set("ERA", era);startCal.set("YEAR", year);startCal.set("MONTH", month);while (startCal.get("DAY_OF_WEEK") != firstDayOfWeek) {
startCal.add("DATE", -1);};for (var i=1; i < week; i++) {
startCal.add("DATE", weekdays);if (month != startCal.get("MONTH")) {
break;}};if (week > 1 && month != startCal.get("MONTH")) {
startCal.add("DATE", -1 * weekdays);}return df.format(startCal);};function WDateChooser_initCalendarDate(calendar) {
calendar.set("DATE", 1);calendar.set("MONTH", 0);calendar.set("YEAR", 1);};function WDateChooser_initDefaultStyles() {
this.setStyleClass("BORDER", "lwpTimeDateBorder");this.setStyleClass("CAL_BORDER", "lwpTimeDateCalBorder");this.setStyleClass("CAL_TEXT", "lwpTimeDateCalText");this.setStyleClass("DAY_NAME", "lwpTimeDateDayName");this.setStyleClass("DAY", "lwpTimeDateDay");this.setStyleClass("WEEKEND_DAY", "lwpTimeDateWeekendDay");this.setStyleClass("DAY_LINK", "lwpTimeDateDayLink");this.setStyleClass("CAL_TOP", "lwpTimeDateCalTop");this.setStyleClass("SELECTED_CAL_TOP", "lwpTimeDateSelectedCalTop");this.setStyleClass("SELECTED_DAY", "lwpTimeDateSelectedDay");this.setStyleClass("SELECTED_DAY_LINK", "lwpTimeDateSelectedDayLink");this.setStyleClass("SELECTED_WEEK", "lwpTimeDateSelectedWeek");this.setStyleClass("SELECTED_ALL_WEEKS", "lwpTimeDateSelectedAllWeeks");this.setStyleClass("WEEK", "lwpTimeDateWeek");this.setStyleClass("MONTH_RADIO", "lwpTimeDateMonthRadio");this.setStyleClass("WEEK_RADIO_ON", "lwpTimeDateWeekRadioOn");this.setStyleClass("WEEK_RADIO_OFF", "lwpTimeDateWeekRadioOff");this.setStyleClass("EMPTY_DAY_NAME", "lwpTimeDateEmptyDayName");};