//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
GregorianCalendar=function() {
this.date=new Date();this.firstDayOfWeek=0;this.lenient=true;this.internal=new Array(20);this.getFunc=new Array(20);this.getFunc['ERA']=GregorianCalendar.getEra;this.getFunc['YEAR']=GregorianCalendar.getYear;this.getFunc['MONTH']=GregorianCalendar.getMonth;this.getFunc['WEEK_OF_YEAR']=GregorianCalendar.getWeekOfYear;this.getFunc['WEEK_OF_MONTH']=GregorianCalendar.getWeekOfMonth;this.getFunc['DATE']=GregorianCalendar.getDateOfMonth;this.getFunc['DAY_OF_MONTH']=GregorianCalendar.getDateOfMonth;this.getFunc['DAY_OF_YEAR']=GregorianCalendar.getDayOfYear;this.getFunc['DAY_OF_WEEK']=GregorianCalendar.getDayOfWeek;this.getFunc['DAY_OF_WEEK_IN_MONTH']=GregorianCalendar.getDayOfWeekInMonth;this.getFunc['AM_PM']=GregorianCalendar.getAmPm;this.getFunc['HOUR']=GregorianCalendar.getHour;this.getFunc['HOUR_OF_DAY']=GregorianCalendar.getHourOfDay;this.getFunc['MINUTE']=GregorianCalendar.getMinute;this.getFunc['SECOND']=GregorianCalendar.getSecond;this.getFunc['MILLISECOND']=GregorianCalendar.getMillisecond;this.getFunc['ZONE_OFFSET']=GregorianCalendar.getZoneOffset;this.setFunc=new Array(20);this.setFunc['ERA']=GregorianCalendar.setEra;this.setFunc['YEAR']=GregorianCalendar.setYear;this.setFunc['MONTH']=GregorianCalendar.setMonth;this.setFunc['WEEK_OF_YEAR']=GregorianCalendar.setWeekOfYear;this.setFunc['WEEK_OF_MONTH']=GregorianCalendar.setWeekOfMonth;this.setFunc['DATE']=GregorianCalendar.setDateOfMonth;this.setFunc['DAY_OF_MONTH']=GregorianCalendar.setDateOfMonth;this.setFunc['DAY_OF_YEAR']=GregorianCalendar.setDayOfYear;this.setFunc['DAY_OF_WEEK']=GregorianCalendar.setDayOfWeek;this.setFunc['DAY_OF_WEEK_IN_MONTH']=GregorianCalendar.setDayOfWeekInMonth;this.setFunc['AM_PM']=GregorianCalendar.setAmPm;this.setFunc['HOUR']=GregorianCalendar.setHour;this.setFunc['HOUR_OF_DAY']=GregorianCalendar.setHourOfDay;this.setFunc['MINUTE']=GregorianCalendar.setMinute;this.setFunc['SECOND']=GregorianCalendar.setSecond;this.setFunc['MILLISECOND']=GregorianCalendar.setMillisecond;this.setFunc['ZONE_OFFSET']=GregorianCalendar.setZoneOffset;this.addFunc=new Array(10);this.addFunc['YEAR']=GregorianCalendar.addYear;this.addFunc['MONTH']=GregorianCalendar.addMonth;this.addFunc['DAY_OF_MONTH']=GregorianCalendar.addDayOfMonth;this.addFunc['DATE']=GregorianCalendar.addDayOfMonth;this.addFunc['DAY_OF_WEEK']=GregorianCalendar.addDayOfWeek;this.addFunc['HOUR']=GregorianCalendar.addHour;this.addFunc['HOUR_OF_DAY']=GregorianCalendar.addHour;this.addFunc['MINUTE']=GregorianCalendar.addMinute;this.addFunc['SECOND']=GregorianCalendar.addSecond;this.addFunc['MILLISECOND']=GregorianCalendar.addMillisecond;};GregorianCalendar.prototype.get=function(fieldName) {
var getfunc=this.getFunc[fieldName];if (getfunc == undefined)
return undefined;return getfunc(this);};GregorianCalendar.prototype.set=function(fieldName, value) {
var setfunc=this.setFunc[fieldName];if (setfunc != undefined)
setfunc(this, value);};GregorianCalendar.prototype.getTime=function() {
if (this.lenient != false)
return this.date;if (this.validateField("ERA")
&& this.validateField("YEAR")
&& this.validateField("MONTH")
&& this.validateField("DAY_OF_MONTH")
&& this.validateField("AM_PM")
&& this.validateField("HOUR_OF_DAY")
&& this.validateField("MINUTE")
&& this.validateField("SECOND")
&& this.validateField("MILLISECOND"))
return this.date;return (NaN);};GregorianCalendar.prototype.setTime=function(date) {
this.date=date;};GregorianCalendar.prototype.add=function(field, amount) {
if (amount == 0)
return;var addfunc=this.addFunc[field];if (addfunc != undefined) {
addfunc(this, amount);}};GregorianCalendar.prototype.clone=function() {
var newcal=new this.constructor();newcal.setTime(new Date(this.date));newcal.lenient=this.lenient;newcal.firstDayOfWeek=this.firstDayOfWeek;return newcal;};GregorianCalendar.prototype.validateField=function(fieldName) {
var internalValue=this.internal[fieldName];if (internalValue == undefined)
return true;var getValue=this.get(fieldName);if (getValue == undefined || internalValue == getValue)
return true;return false;};GregorianCalendar.getEra=function(obj) {
if (obj.date.getFullYear() < 0)
return 0;return 1;};GregorianCalendar.getYear=function(obj) {
return obj.date.getFullYear();};GregorianCalendar.getMonth=function(obj) {
return obj.date.getMonth();};GregorianCalendar.getWeekOfYear=function(obj) {
var date1=new Date(obj.date.getFullYear(), 0, 1, 0, 0, 0, 0);var weekday1=date1.getDay();if (weekday1 != 0)
date1.setTime(date1.getTime() - weekday1 * 86400000);var winy=Math.floor((obj.date.getTime() - date1.getTime())/ 604800000) + 1;return winy;};GregorianCalendar.getWeekOfMonth=function(obj) {
var date1=new Date(obj.date.getFullYear(), obj.date.getMonth(), 1, 0, 0, 0, 0);var weekday1=date1.getDay();if (weekday1 != 0)
date1.setTime(date1.getTime() - weekday1 * 86400000);var winm=Math.floor((obj.date.getTime() - date1.getTime()) / 604800000) + 1;return winm;};GregorianCalendar.getDateOfMonth=function(obj) {
return obj.date.getDate();};GregorianCalendar.getDayOfYear=function(obj) {
var date1=new Date(obj.date.getFullYear(), 0, 1, 0, 0, 0, 0);var days=Math.floor((obj.date.getTime() - date1.getTime())/ 86400000) + 1;return days;};GregorianCalendar.getDayOfWeek=function(obj) {
return obj.date.getDay();};GregorianCalendar.getDayOfWeekInMonth=function(obj) {
var date1=new Date(obj.date.getFullYear(), obj.date.getMonth(), 1, 0, 0, 0, 0);var weekdays=Math.floor((obj.date.getTime() - date1.getTime())/ 604800000) + 1;return weekdays;};GregorianCalendar.getAmPm=function(obj) {
var hour=obj.date.getHours();if (hour < 12)
return 0;return 1;};GregorianCalendar.getHour=function(obj) {
var hour=obj.date.getHours();if (hour >= 12)
hour -= 12;return hour;};GregorianCalendar.getHourOfDay=function(obj) {
return obj.date.getHours();};GregorianCalendar.getMinute=function(obj) {
return obj.date.getMinutes();};GregorianCalendar.getSecond=function(obj) {
return obj.date.getSeconds();};GregorianCalendar.getMillisecond=function(obj) {
return obj.date.getMilliseconds();};GregorianCalendar.getZoneOffset=function(obj) {
return obj.date.getTimezoneOffset();};GregorianCalendar.setEra=function(obj, value) {
};GregorianCalendar.setYear=function(obj, value) {
if (0 <= value && value <= 23)
value+=2000;else if (value <= 99)
value+=1900;obj.internal["YEAR"]=value;obj.date.setFullYear(value);};GregorianCalendar.setMonth=function(obj, value) {
obj.internal["MONTH"]=value;obj.date.setMonth(value);};GregorianCalendar.setWeekOfYear=function(obj, value) {
};GregorianCalendar.setWeekOfMonth=function(obj, value) {
};GregorianCalendar.setDateOfMonth=function(obj, value) {
obj.internal["DAY_OF_MONTH"]=value;obj.date.setDate(value);};GregorianCalendar.setDayOfYear=function(obj, value) {
};GregorianCalendar.setDayOfWeek=function(obj, value) {
obj.date.setDay(value);};GregorianCalendar.setDayOfWeekInMonth=function(obj, value) {
};GregorianCalendar.setAmPm=function(obj, value) {
obj.internal["AM_PM"]=value;var hour=obj.date.getHours();if (value == 0) {
if (hour >= 12) {
obj.set("HOUR_OF_DAY", hour - 12);obj.date.setHours(hour-12);}}else {
if (hour < 12) {
obj.set("HOUR_OF_DAY", hour + 12);obj.date.setHours(hour+12);}};};GregorianCalendar.setHour=function(obj, value) {
var hour=obj.date.getHours();if (hour >= 12)
value+=12;obj.internal["HOUR_OF_DAY"]=value;obj.date.setHours(value);};GregorianCalendar.setHourOfDay=function(obj, value) {
obj.internal["HOUR_OF_DAY"]=value;obj.date.setHours(value);};GregorianCalendar.setMinute=function(obj, value) {
obj.internal["MINUTE"]=value;obj.date.setMinutes(value);};GregorianCalendar.setSecond=function(obj, value) {
obj.internal["SECOND"]=value;obj.date.setSeconds(value);};GregorianCalendar.setMillisecond=function(obj, value) {
obj.internal["MILLISECOND"]=value;obj.date.setMilliseconds(value);};GregorianCalendar.setZoneOffset=function(obj, value) {
};GregorianCalendar.addYear=function(obj, amount) {
obj.date.setFullYear(obj.date.getFullYear() + amount);obj.internal["YEAR"]=undefined;};GregorianCalendar.addMonth=function(obj, amount) {
obj.date.setMonth(obj.date.getMonth() + amount);obj.internal["MONTH"]=undefined;};GregorianCalendar.addDayOfMonth=function(obj, amount) {
obj.date.setDate(obj.date.getDate() + amount);obj.internal["DAY_OF_MONTH"]=undefined;};GregorianCalendar.addDayOfWeek=function(obj, amount) {
obj.date.setDay(obj.date.getDay() + amount);};GregorianCalendar.addHour=function(obj, amount) {
obj.date.setHours(obj.date.getHours() + amount);obj.internal["HOUR_OF_DAY"]=undefined;};GregorianCalendar.addMinute=function(obj, amount) {
obj.date.setMinutes(obj.date.getMinutes() + amount);obj.internal["MINUTE"]=undefined;};GregorianCalendar.addSecond=function(obj, amount) {
obj.date.setSeconds(obj.date.getSeconds() + amount);obj.internal["SECOND"]=undefined;};GregorianCalendar.addMillisecond=function(obj, amount) {
obj.date.setMilliseconds(obj.date.getMilliseconds() + amount);obj.internal["MILLISECOND"]=undefined;};GregorianBasedCalendar_init=function(obj) {
obj.date=new Date();obj.firstDayOfWeek=0;obj.getFunc['ERA']=GregorianBasedCalendar_getEra;obj.getFunc['YEAR']=GregorianBasedCalendar_getYear;obj.setFunc['ERA']=GregorianBasedCalendar_setEra;obj.setFunc['YEAR']=GregorianBasedCalendar_setYear;};GregorianBasedCalendar_getEra=function(obj) {
for (var i=0; i < obj.eras.length; i++) {
var era=obj.eras[i];var date=new Date(era[0], era[1]-1, era[2], 0, 0, 0, 0);if (obj.date < date) {
if (i == 0)
return 0;return (i - 1);}};return (obj.eras.length - 1);};GregorianBasedCalendar_getYear=function(obj) {
var i=GregorianBasedCalendar_getEra(obj);var era=obj.eras[i];var year=obj.date.getFullYear();return (year - era[0] + 1);};GregorianBasedCalendar_setEra=function(obj, value) {
obj.internal["ERA"]=value;if (0 <= value && value < obj.eras.length) {
var year=GregorianBasedCalendar_getYear(obj) + (obj.eras[value])[0] - 1;obj.date.setFullYear(year);}};GregorianBasedCalendar_setYear=function(obj, value) {
obj.internal["YEAR"]=value;var era=GregorianBasedCalendar_getEra(obj);if (0 <= era && era < obj.eras.length) {
var year=value + (obj.eras[era])[0] - 1;obj.date.setFullYear(year);}};JapaneseCalendar=function() {
this.date=new Date();this.firstDayOfWeek=0;this.getFunc['ERA']=GregorianBasedCalendar_getEra;this.getFunc['YEAR']=GregorianBasedCalendar_getYear;this.setFunc['ERA']=GregorianBasedCalendar_setEra;this.setFunc['YEAR']=GregorianBasedCalendar_setYear;};JapaneseCalendar.prototype=new GregorianCalendar();JapaneseCalendar.prototype.constructor=JapaneseCalendar;JapaneseCalendar.prototype.eras =
[
[645,    6, 19],
[650,    2, 15],
[672,    1,  1],
[686,    7, 20],
[701,    3, 21],
[704,    5, 10],
[708,    1, 11],
[715,    9,  2],
[717,   11, 17],
[724,    2,  4],
[729,    8,  5],
[749,    4, 14],
[749,    7,  2],
[757,    8, 18],
[765,    1,  7],
[767,    8, 16],
[770,   10,  1],
[781,    1,  1],
[782,    8, 19],
[806,    5, 18],
[810,    9, 19],
[824,    1,  5],
[834,    1,  3],
[848,    6, 13],
[851,    4, 28],
[854,   11, 30],
[857,    2, 21],
[859,    4, 15],
[877,    4, 16],
[885,    2, 21],
[889,    4, 27],
[898,    4, 26],
[901,    7, 15],
[923,    4, 11],
[931,    4, 26],
[938,    5, 22],
[947,    4, 22],
[957,   10, 27],
[961,    2, 16],
[964,    7, 10],
[968,    8, 13],
[970,    3, 25],
[973,   12, 20],
[976,    7, 13],
[978,   11, 29],
[983,    4, 15],
[985,    4, 27],
[987,    4,  5],
[989,    8,  8],
[990,   11,  7],
[995,    2, 22],
[999,    1, 13],
[1004,    7, 20],
[1012,   12, 25],
[1017,    4, 23],
[1021,    2,  2],
[1024,    7, 13],
[1028,    7, 25],
[1037,    4, 21],
[1040,   11, 10],
[1044,   11, 24],
[1046,    4, 14],
[1053,    1, 11],
[1058,    8, 29],
[1065,    8,  2],
[1069,    4, 13],
[1074,    8, 23],
[1077,   11, 17],
[1081,    2, 10],
[1084,    2,  7],
[1087,    4,  7],
[1094,   12, 15],
[1096,   12, 17],
[1097,   11, 21],
[1099,    8, 28],
[1104,    2, 10],
[1106,    4,  9],
[1108,    8,  3],
[1110,    7, 13],
[1113,    7, 13],
[1118,    4,  3],
[1120,    4, 10],
[1124,    4,  3],
[1126,    1, 22],
[1131,    1, 29],
[1132,    8, 11],
[1135,    4, 27],
[1141,    7, 10],
[1142,    4, 28],
[1144,    2, 23],
[1145,    7, 22],
[1151,    1, 26],
[1154,   10, 28],
[1156,    4, 27],
[1159,    4, 20],
[1160,    1, 10],
[1161,    9,  4],
[1163,    3, 29],
[1165,    6,  5],
[1166,    8, 27],
[1169,    4,  8],
[1171,    4, 21],
[1175,    7, 28],
[1177,    8,  4],
[1181,    7, 14],
[1182,    5, 27],
[1184,    4, 16],
[1185,    8, 14],
[1190,    4, 11],
[1199,    4, 27],
[1201,    2, 13],
[1204,    2, 20],
[1206,    4, 27],
[1207,   10, 25],
[1211,    3,  9],
[1213,   12,  6],
[1219,    4, 12],
[1222,    4, 13],
[1224,   11, 20],
[1225,    4, 20],
[1227,   12, 10],
[1229,    3,  5],
[1232,    4,  2],
[1233,    4, 15],
[1234,   11,  5],
[1235,    9, 19],
[1238,   11, 23],
[1239,    2,  7],
[1240,    7, 16],
[1243,    2, 26],
[1247,    2, 28],
[1249,    3, 18],
[1256,   10,  5],
[1257,    3, 14],
[1259,    3, 26],
[1260,    4, 13],
[1261,    2, 20],
[1264,    2, 28],
[1275,    4, 25],
[1278,    2, 29],
[1288,    4, 28],
[1293,    8, 55],
[1299,    4, 25],
[1302,   11, 21],
[1303,    8,  5],
[1306,   12, 14],
[1308,   10,  9],
[1311,    4, 28],
[1312,    3, 20],
[1317,    2,  3],
[1319,    4, 28],
[1321,    2, 23],
[1324,   12,  9],
[1326,    4, 26],
[1329,    8, 29],
[1331,    8,  9],
[1334,    1, 29],
[1336,    2, 29],
[1340,    4, 28],
[1346,   12,  8],
[1370,    7, 24],
[1372,    4,  1],
[1375,    5, 27],
[1381,    2, 10],
[1384,    4, 28],
[1384,    2, 27],
[1379,    3, 22],
[1387,    8, 23],
[1389,    2,  9],
[1390,    3, 26],
[1394,    7,  5],
[1428,    4, 27],
[1429,    9,  5],
[1441,    2, 17],
[1444,    2,  5],
[1449,    7, 28],
[1452,    7, 25],
[1455,    7, 25],
[1457,    9, 28],
[1460,   12, 21],
[1466,    2, 28],
[1467,    3,  3],
[1469,    4, 28],
[1487,    7, 29],
[1489,    8, 21],
[1492,    7, 19],
[1501,    2, 29],
[1504,    2, 30],
[1521,    8, 23],
[1528,    8, 20],
[1532,    7, 29],
[1555,   10, 23],
[1558,    2, 28],
[1570,    4, 23],
[1573,    7, 28],
[1592,   12,  8],
[1596,   10, 27],
[1615,    7, 13],
[1624,    2, 30],
[1644,   12, 16],
[1648,    2, 15],
[1652,    9, 18],
[1655,    4, 13],
[1658,    7, 23],
[1661,    4, 25],
[1673,    9, 21],
[1681,    9, 29],
[1684,    2, 21],
[1688,    9, 30],
[1704,    3, 13],
[1711,    4, 25],
[1716,    6, 22],
[1736,    4, 28],
[1741,    2, 27],
[1744,    2, 21],
[1748,    7, 12],
[1751,   10, 27],
[1764,    6,  2],
[1772,   11, 16],
[1781,    4,  2],
[1789,    1, 25],
[1801,    2,  5],
[1804,    2, 11],
[1818,    4, 22],
[1830,   12, 10],
[1844,   12,  2],
[1848,    2, 28],
[1854,   11, 27],
[1860,    3, 18],
[1861,    2, 19],
[1864,    2, 20],
[1865,    4,  7],
[1868,    9,  8],
[1912,    7, 30],
[1926,   12, 25],
[1989,    1,  8]
];TaiwaneseCalendar=function() {
this.date=new Date();this.firstDayOfWeek=0;this.getFunc['ERA']=TaiwaneseCalendar.getEra;this.getFunc['YEAR']=TaiwaneseCalendar.getYear;this.setFunc['ERA']=TaiwaneseCalendar.setEra;this.setFunc['YEAR']=TaiwaneseCalendar.setYear;};TaiwaneseCalendar.prototype=new GregorianCalendar();TaiwaneseCalendar.prototype.constructor=TaiwaneseCalendar;TaiwaneseCalendar.prototype.eras =
[
[1912,    1,  1]
];TaiwaneseCalendar.getEra=function(obj) {
var era=obj.eras[0];var date=new Date(era[0], era[1]-1, era[2], 0, 0, 0, 0);if (obj.date < date)
return 0;return 1;};TaiwaneseCalendar.getYear=function(obj) {
var era=obj.eras[0];var year=obj.date.getFullYear();if (TaiwaneseCalendar.getEra(obj) == 0) {
return (era[0] - year);}return (year - era[0] + 1);};TaiwaneseCalendar.setEra=function(obj, value) {
obj.internal["ERA"]=value;if (value == 0) {
var year=(obj.eras[0])[0] - TaiwaneseCalendar.getYear(obj);obj.date.setFullYear(year);}else if (value == 1) {
var year=TaiwaneseCalendar.getYear(obj) + (obj.eras[0])[0] - 1;obj.date.setFullYear(year);}};TaiwaneseCalendar.setYear=function(obj, value) {
obj.internal["YEAR"]=value;var era=TaiwaneseCalendar.getEra(obj);if (era == 0) {
var year=(obj.eras[era])[0] - value;obj.date.setFullYear(year);}else if (era == 1) {
var year=value + (obj.eras[0])[0] - 1;obj.date.setFullYear(year);}};BuddhistCalendar=function() {
GregorianBasedCalendar_init(this);};BuddhistCalendar.prototype=new GregorianCalendar();BuddhistCalendar.prototype.constructor=BuddhistCalendar;BuddhistCalendar.prototype.eras =
[
[-542,    1,  1]
];IslamicCalendar=function() {
this.date=new Date();this.firstDayOfWeek=0;this.internal=new Array(20);this.getFunc=new Array(20);this.getFunc['ERA']=IslamicCalendar.getEra;this.getFunc['YEAR']=IslamicCalendar.getYear;this.getFunc['MONTH']=IslamicCalendar.getMonth;this.getFunc['WEEK_OF_YEAR']=IslamicCalendar.getWeekOfYear;this.getFunc['WEEK_OF_MONTH']=IslamicCalendar.getWeekOfMonth;this.getFunc['DATE']=IslamicCalendar.getDateOfMonth;this.getFunc['DAY_OF_MONTH']=IslamicCalendar.getDateOfMonth;this.getFunc['DAY_OF_YEAR']=IslamicCalendar.getDayOfYear;this.getFunc['DAY_OF_WEEK']=IslamicCalendar.getDayOfWeek;this.getFunc['DAY_OF_WEEK_IN_MONTH']=IslamicCalendar.getDayOfWeekInMonth;this.getFunc['AM_PM']=IslamicCalendar.getAmPm;this.getFunc['HOUR']=IslamicCalendar.getHour;this.getFunc['HOUR_OF_DAY']=IslamicCalendar.getHourOfDay;this.getFunc['MINUTE']=IslamicCalendar.getMinute;this.getFunc['SECOND']=IslamicCalendar.getSecond;this.getFunc['MILLISECOND']=IslamicCalendar.getMillisecond;this.getFunc['ZONE_OFFSET']=IslamicCalendar.getZoneOffset;this.setFunc=new Array(20);this.setFunc['ERA']=IslamicCalendar.setEra;this.setFunc['YEAR']=IslamicCalendar.setYear;this.setFunc['MONTH']=IslamicCalendar.setMonth;this.setFunc['WEEK_OF_YEAR']=IslamicCalendar.setWeekOfYear;this.setFunc['WEEK_OF_MONTH']=IslamicCalendar.setWeekOfMonth;this.setFunc['DATE']=IslamicCalendar.setDateOfMonth;this.setFunc['DAY_OF_MONTH']=IslamicCalendar.setDateOfMonth;this.setFunc['DAY_OF_YEAR']=IslamicCalendar.setDayOfYear;this.setFunc['DAY_OF_WEEK']=IslamicCalendar.setDayOfWeek;this.setFunc['DAY_OF_WEEK_IN_MONTH']=IslamicCalendar.setDayOfWeekInMonth;this.setFunc['AM_PM']=IslamicCalendar.setAmPm;this.setFunc['HOUR']=IslamicCalendar.setHour;this.setFunc['HOUR_OF_DAY']=IslamicCalendar.setHourOfDay;this.setFunc['MINUTE']=IslamicCalendar.setMinute;this.setFunc['SECOND']=IslamicCalendar.setSecond;this.setFunc['MILLISECOND']=IslamicCalendar.setMillisecond;this.setFunc['ZONE_OFFSET']=IslamicCalendar.setZoneOffset;this.addFunc=new Array(10);this.addFunc['YEAR']=IslamicCalendar.addYear;this.addFunc['MONTH']=IslamicCalendar.addMonth;this.addFunc['DAY_OF_MONTH']=IslamicCalendar.addDayOfMonth;this.addFunc['DATE']=IslamicCalendar.addDayOfMonth;this.addFunc['DAY_OF_WEEK']=IslamicCalendar.addDayOfWeek;this.addFunc['HOUR']=IslamicCalendar.addHour;this.addFunc['HOUR_OF_DAY']=IslamicCalendar.addHour;this.addFunc['MINUTE']=IslamicCalendar.addMinute;this.addFunc['SECOND']=IslamicCalendar.addSecond;this.addFunc['MILLISECOND']=IslamicCalendar.addMillisecond;};IslamicCalendar.prototype.get=function(fieldName) {
var getfunc=this.getFunc[fieldName];if (getfunc == undefined)
return undefined;return getfunc(this);};IslamicCalendar.prototype.set=function(fieldName, value) {
var setfunc=this.setFunc[fieldName];if (setfunc != undefined)
setfunc(this, value);};IslamicCalendar.prototype.getTime=function() {
if (this.lenient != false)
return this.date;if (this.validateField("ERA")
&& this.validateField("YEAR")
&& this.validateField("MONTH")
&& this.validateField("DAY_OF_MONTH")
&& this.validateField("AM_PM")
&& this.validateField("HOUR_OF_DAY")
&& this.validateField("MINUTE")
&& this.validateField("SECOND")
&& this.validateField("MILLISECOND"))
return this.date;return (NaN);};IslamicCalendar.prototype.setTime=function(date) {
this.date=date;};IslamicCalendar.prototype.add=function(field, amount) {
if (amount == 0)
return;var addfunc=this.addFunc[field];if (addfunc != undefined) {
addfunc(this, amount);}};IslamicCalendar.prototype.clone=function() {
var newcal=new IslamicCalendar();newcal.setTime(new Date(this.date));newcal.lenient=this.lenient;newcal.firstDayOfWeek=this.firstDayOfWeek;return newcal;};IslamicCalendar.prototype.validateField=function(fieldName) {
var internalValue=this.internal[fieldName];if (internalValue == undefined)
return true;var getValue=this.get(fieldName);if (getValue == undefined || internalValue == getValue)
return true;return false;};IslamicCalendar.getEra=function(obj) {
return 0;};IslamicCalendar.getYear=function(obj) {
var date=IslamicCalendar.GregorianToIslamic(obj.date.getFullYear(), obj.date.getMonth(), obj.date.getDate());return date[0];};IslamicCalendar.getMonth=function(obj) {
var date=IslamicCalendar.GregorianToIslamic(obj.date.getFullYear(), obj.date.getMonth(), obj.date.getDate());return date[1];};IslamicCalendar.getWeekOfYear=function(obj) {
return undefined;};IslamicCalendar.getWeekOfMonth=function(obj) {
return undefined;};IslamicCalendar.getDateOfMonth=function(obj) {
var date=IslamicCalendar.GregorianToIslamic(obj.date.getFullYear(), obj.date.getMonth(), obj.date.getDate());return date[2];};IslamicCalendar.getDayOfYear=function(obj) {
return undefined;};IslamicCalendar.getDayOfWeek=function(obj) {
return obj.date.getDay();};IslamicCalendar.getDayOfWeekInMonth=function(obj) {
return undefined;};IslamicCalendar.getAmPm=function(obj) {
var hour=obj.date.getHours();if (hour < 12)
return 0;return 1;};IslamicCalendar.getHour=function(obj) {
var hour=obj.date.getHours();if (hour >= 12)
hour -= 12;return hour;};IslamicCalendar.getHourOfDay=function(obj) {
return obj.date.getHours();};IslamicCalendar.getMinute=function(obj) {
return obj.date.getMinutes();};IslamicCalendar.getSecond=function(obj) {
return obj.date.getSeconds();};IslamicCalendar.getMillisecond=function(obj) {
return obj.date.getMilliseconds();};IslamicCalendar.getZoneOffset=function(obj) {
return obj.date.getTimezoneOffset();};IslamicCalendar.setEra=function(obj, value) {
};IslamicCalendar.setYear=function(obj, value) {
obj.internal["YEAR"]=value;var date=IslamicCalendar.GregorianToIslamic(obj.date.getFullYear(), obj.date.getMonth(), obj.date.getDate());var year=value;var month=date[1];var day=date[2];var maxday=IslamicCalendar.TotalDaysOfTheIslamicMonth(month, year);if (maxday < day) {
day %= maxday;}date=IslamicCalendar.IslamicToGregorian(year, month, day);obj.date.setFullYear(date[0]);obj.date.setMonth(date[1]);obj.date.setDate(date[2]);};IslamicCalendar.setMonth=function(obj, value) {
if (value == 0) {
var gregorianDate=obj.date;var islamicYMD=IslamicCalendar.GregorianToIslamic(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());var gregorianYMD=IslamicCalendar.IslamicToGregorian(islamicYMD[0], 0, islamicYMD[2]);gregorianDate.setFullYear(gregorianYMD[0]);gregorianDate.setMonth(gregorianYMD[1]);gregorianDate.setDate(gregorianYMD[2]);}else if (value < 0) {
IslamicCalendar.setMonth(obj, 0);IslamicCalendar.addMonth(obj, value);}else if (0 < value) {
IslamicCalendar.setMonth(obj, 0);IslamicCalendar.addMonth(obj, value);}obj.internal["MONTH"]=value;};IslamicCalendar.setWeekOfYear=function(obj, value) {
};IslamicCalendar.setWeekOfMonth=function(obj, value) {
};IslamicCalendar.setDateOfMonth=function(obj, value) {
if (value == 1) {
var gregorianDate=obj.date;var islamicYMD=IslamicCalendar.GregorianToIslamic(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());var gregorianYMD=IslamicCalendar.IslamicToGregorian(islamicYMD[0], islamicYMD[1], 1);gregorianDate.setFullYear(gregorianYMD[0]);gregorianDate.setMonth(gregorianYMD[1]);gregorianDate.setDate(gregorianYMD[2]);}else if (value <= 0) {
IslamicCalendar.setDateOfMonth(obj, 1);IslamicCalendar.addDayOfMonth(obj, value-1);return;}else if (1 < value) {
IslamicCalendar.setDateOfMonth(obj, 1);IslamicCalendar.addDayOfMonth(obj, value-1);}obj.internal["DAY_OF_MONTH"]=value;};IslamicCalendar.setDayOfYear=function(obj, value) {
};IslamicCalendar.setDayOfWeek=function(obj, value) {
obj.date.setDay(value);};IslamicCalendar.setDayOfWeekInMonth=function(obj, value) {
};IslamicCalendar.setAmPm=function(obj, value) {
var hour=obj.date.getHours();if (!value) {
if (hour >= 12) {
obj.date.setHours(hour-12);}}else {
if (hour < 12) {
obj.date.setHours(hour+12);}};obj.internal["AM_PM"]=value;};IslamicCalendar.setHour=function(obj, value) {
var hour=obj.date.getHours();if (hour >= 12)
value+=12;obj.internal["HOUR_OF_DAY"]=value;obj.date.setHours(value);};IslamicCalendar.setHourOfDay=function(obj, value) {
obj.internal["HOUR_OF_DAY"]=value;obj.date.setHours(value);};IslamicCalendar.setMinute=function(obj, value) {
obj.internal["MINUTE"]=value;obj.date.setMinutes(value);};IslamicCalendar.setSecond=function(obj, value) {
obj.internal["SECOND"]=value;obj.date.setSeconds(value);};IslamicCalendar.setMillisecond=function(obj, value) {
obj.internal["MILLISECOND"]=value;obj.date.setMilliseconds(value);};IslamicCalendar.setZoneOffset=function(obj, value) {
};IslamicCalendar.addYear=function(obj, amount) {
var y, m, d;var gregorianDate;var gregorianYMD, islamicYMD;gregorianDate=obj.date;islamicYMD=IslamicCalendar.GregorianToIslamic(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());y=islamicYMD[0];m=islamicYMD[1];d=islamicYMD[2];y+=amount;var maxday=IslamicCalendar.TotalDaysOfTheIslamicMonth(m+1, y);if (maxday < d) {
d=maxday;}gregorianYMD=IslamicCalendar.IslamicToGregorian(y, m, d);gregorianDate.setFullYear(gregorianYMD[0]);gregorianDate.setMonth(gregorianYMD[1]);gregorianDate.setDate(gregorianYMD[2]);obj.internal["YEAR"]=undefined;};IslamicCalendar.addMonth=function(obj, amount) {
var y, m, d;var gregorianDate;var gregorianYMD, islamicYMD;gregorianDate=obj.date;islamicYMD=IslamicCalendar.GregorianToIslamic(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());y=islamicYMD[0];m=islamicYMD[1];d=islamicYMD[2];if (islamicYMD != undefined) {
if (amount >= 0) {
for (var i=0; i < amount; i++) {
if (m == 11) {
m=0;y++;}else {
m++;}};}else {
amount=Math.abs(amount);for (var i=0; i < amount; i++) {
if (m == 0) {
m=11;y--;}else {
m--;}};}var maxday=IslamicCalendar.TotalDaysOfTheIslamicMonth(m+1, y);if (maxday < d) {
d=maxday;}gregorianYMD=IslamicCalendar.IslamicToGregorian(y, m, d);gregorianDate.setFullYear(gregorianYMD[0]);gregorianDate.setMonth(gregorianYMD[1]);gregorianDate.setDate(gregorianYMD[2]);}obj.internal["MONTH"]=undefined;};IslamicCalendar.addDayOfMonth=function(obj, amount) {
obj.date.setDate(obj.date.getDate() + amount);obj.internal["DAY_OF_MONTH"]=undefined;};IslamicCalendar.addDayOfWeek=function(obj, amount) {
obj.date.setDay(obj.date.getDay() + amount);};IslamicCalendar.addHour=function(obj, amount) {
obj.date.setHours(obj.date.getHours() + amount);obj.internal["HOUR_OF_DAY"]=undefined;};IslamicCalendar.addMinute=function(obj, amount) {
obj.date.setMinutes(obj.date.getMinutes() + amount);obj.internal["MINUTE"]=undefined;};IslamicCalendar.addSecond=function(obj, amount) {
obj.date.setSeconds(obj.date.getSeconds() + amount);obj.internal["SECOND"]=undefined;};IslamicCalendar.addMillisecond=function(obj, amount) {
obj.date.setMilliseconds(obj.date.getMilliseconds() + amount);obj.internal["MILLISECOND"]=undefined;};var ISLAMIC_EPOCH=227014;IslamicCalendar.TotalDaysOfTheGregorianMonth=function(month, year)
{
switch (month)
{
case 2:
if ((((year % 4) == 0) && ((year % 100) != 0)) || ((year % 400) == 0))
return 29;else
return 28;case 4:
case 6:
case 9:
case 11:
return 30;default:
return 31;};};IslamicCalendar.GregorianDateToTotalDays=function(month, day, year)
{
var m;var days;days=day;for (m=month - 1;  m > 0; m--)
days+=IslamicCalendar.TotalDaysOfTheGregorianMonth(m, year);year--;return (days + (365 * year) + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400));};IslamicCalendar.TotalDaysToGregorianDate=function(days)
{
var year, month, day;for (year=Math.floor(days / 366); days >= IslamicCalendar.GregorianDateToTotalDays(1, 1, year+1); year++)
;for (month=1; days > IslamicCalendar.GregorianDateToTotalDays(month, IslamicCalendar.TotalDaysOfTheGregorianMonth(month, year), year); month++)
;day=(days - IslamicCalendar.GregorianDateToTotalDays(month, 1, year) + 1);return [year, month, day];};IslamicCalendar.TotalDaysOfTheIslamicMonth=function(month, year)
{
if (month % 2 == 1)
return 30;else if (month == 12 && (11 * year + 14) % 30 < 11)
return 30;else
return 29;};IslamicCalendar.IslamicDateToTotalDays=function(month, day, year)
{
return (day
+ 29 * (month - 1)
+ Math.floor(month / 2)
+ 354 * (year - 1)
+ Math.floor((3 + (11 * year)) / 30)
+ ISLAMIC_EPOCH);};IslamicCalendar.TotalDaysToIslamicDate=function(days) {
var year, month, day;if (days <= ISLAMIC_EPOCH)
{
year=0;month=0;day=0;return [0, 0, 0];}for (year=Math.floor((days - ISLAMIC_EPOCH) / 355); days >= IslamicCalendar.IslamicDateToTotalDays(1,1,year+1); year++)
;for (month=1; days > IslamicCalendar.IslamicDateToTotalDays(month, IslamicCalendar.TotalDaysOfTheIslamicMonth(month, year), year); month++)
;day=(days - IslamicCalendar.IslamicDateToTotalDays(month,1,year) + 1);return [year, month, day];};IslamicCalendar.GregorianToIslamic=function(y, m, d) {
m++;var days=IslamicCalendar.GregorianDateToTotalDays(m,d,y);var date=(IslamicCalendar.TotalDaysToIslamicDate(days));date[1]--;return date;};IslamicCalendar.IslamicToGregorian=function(y, m, d) {
m++;var days=IslamicCalendar.IslamicDateToTotalDays(m,d,y);var date=IslamicCalendar.TotalDaysToGregorianDate(days);date[1]--;return date;};DateFormatSymbols=function() {
this.ampmStrings=null;this.eras=null;this.months=null;this.shortMonths=null;this.weekdays=null;this.shortWeekdays=null;this.zoneStrings=null;};SimpleDateFormat=function() {
this.pattern="";this.dateFormatSymbols=null;this.formatFunc=new Array(20);this.formatFunc['G']=SimpleDateFormat.formatEra;this.formatFunc['y']=SimpleDateFormat.formatYear;this.formatFunc['u']=SimpleDateFormat.formatYear;this.formatFunc['M']=SimpleDateFormat.formatMonthInYear;this.formatFunc['d']=SimpleDateFormat.formatDayInMonth;this.formatFunc['h']=SimpleDateFormat.formatHourInAmPm;this.formatFunc['H']=SimpleDateFormat.formatHourInDay;this.formatFunc['m']=SimpleDateFormat.formatMinuteInHour;this.formatFunc['s']=SimpleDateFormat.formatSecondInMinute;this.formatFunc['S']=SimpleDateFormat.formatMillisecond;this.formatFunc['E']=SimpleDateFormat.formatDayInWeek;this.formatFunc['D']=SimpleDateFormat.formatDayInYear;this.formatFunc['F']=SimpleDateFormat.formatDayOfWeekInMonth;this.formatFunc['w']=SimpleDateFormat.formatWeekInYear;this.formatFunc['W']=SimpleDateFormat.formatWeekInMonth;this.formatFunc['a']=SimpleDateFormat.formatAmPmMarker;this.formatFunc['k']=SimpleDateFormat.formatHourInDay2;this.formatFunc['K']=SimpleDateFormat.formatHourInAmPm2;this.formatFunc['z']=SimpleDateFormat.formatTimezone;this.parseFunc=new Array(20);this.parseFunc['G']=SimpleDateFormat.parseEra;this.parseFunc['y']=SimpleDateFormat.parseYear;this.parseFunc['u']=SimpleDateFormat.parseYear;this.parseFunc['M']=SimpleDateFormat.parseMonthInYear;this.parseFunc['d']=SimpleDateFormat.parseDayInMonth;this.parseFunc['h']=SimpleDateFormat.parseHourInAmPm;this.parseFunc['H']=SimpleDateFormat.parseHourInDay;this.parseFunc['m']=SimpleDateFormat.parseMinuteInHour;this.parseFunc['s']=SimpleDateFormat.parseSecondInMinute;this.parseFunc['S']=SimpleDateFormat.parseMillisecond;this.parseFunc['E']=SimpleDateFormat.parseDayInWeek;this.parseFunc['a']=SimpleDateFormat.parseAmPmMarker;this.parseFunc['k']=SimpleDateFormat.parseHourInDay2;this.parseFunc['K']=SimpleDateFormat.parseHourInAmPm2;this.contiguousSymbols=false;};SimpleDateFormat.prototype.format=function(cal) {
if (!cal || this.pattern.length == 0)
return "";var dateText="";var c;var width;var formatfunc;var stateEscaped=false;for (var offset=0; offset < this.pattern.length; offset+=width) {
c=this.pattern.charAt(offset);for (width=0; width + offset < this.pattern.length && this.pattern.charAt(width + offset) == c; width++)
;if (c == "'") {
if (width > 1) {
var len=Math.floor(width / 2);for (var i=0; i < len; i++) {
dateText+="'";};offset+=len * 2;width -= len * 2;}if (width == 1) {
if (stateEscaped == true)
stateEscaped=false;else
stateEscaped=true;continue;}}if (stateEscaped == false) {
formatfunc=this.formatFunc[c];if (formatfunc != undefined) {
dateText+=formatfunc(this, cal, width);} else {
for (var i=0; i < width; i++)
dateText+=c;};} else {
for (var i=0; i < width; i++)
dateText+=c;};};return dateText;};SimpleDateFormat.prototype.parse=function(text, cal) {
if (text == null || text == undefined || text.length == 0 || this.pattern.length == 0)
return NaN;if (typeof(text) != 'string')
text=text.toString();var textpos=0;var c;var width;var parsefunc;var stateEscaped=false;var n;if (cal == null || cal == undefined) {
cal=new GregorianCalendar();}for (var offset=0; offset < this.pattern.length; offset+=width) {
c=this.pattern.charAt(offset);for (width=0; width + offset < this.pattern.length && this.pattern.charAt(width + offset) == c; width++)
;if (c == "'") {
if (width > 1) {
var len=Math.floor(width / 2);offset+=len * 2;width -= len * 2;}if (width == 1) {
if (stateEscaped == true) {
stateEscaped=false;} else {
stateEscaped=true;}continue;}}if (stateEscaped == false && c != "'")
parsefunc=this.parseFunc[c];else
parsefunc=undefined;if (parsefunc != undefined) {
var ch;var nSymbols=0;for (var i=offset; i < this.pattern.length; i++) {
if (this.parseFunc[this.pattern.charAt(i)] == undefined)
break;nSymbols++;};var nNumbers=0;for (var i=textpos; i < text.length; i++) {
ch=text.charAt(i);if (isNaN(ch))
break;nNumbers++;};if (nSymbols == nNumbers)
this.contiguousSymbols=true;else
this.contiguousSymbols=false;textpos=parsefunc(this, text, textpos, width, cal);if (isNaN(textpos))
return NaN;} else {
for (var i=0; i < width; i++) {
if (c.toLowerCase() != text.charAt(textpos + i).toLowerCase()) {
return NaN;}};textpos+=width;}};var date=cal.getTime();if (date == null)
return NaN;return date;};SimpleDateFormat.paddingZero=function(text, width) {
if (text == null || text == undefined)
return "";if (typeof(text) != "string")
text=text.toString();if (text.length >= width)
return text;len=width - text.length;for (var i=0; i < len; i++) {
text='0' + text;};return text;};SimpleDateFormat.formatEra=function(obj, cal, width) {
var index=cal.get("ERA");var eras=obj.dateFormatSymbols.eras;if (!eras || !(typeof(eras) == "object" && eras.constructor == Array))
return "";if (index < 0 || index >= eras.length)
return "";return eras[index];};SimpleDateFormat.formatYear=function(obj, cal, width) {
var year=cal.get("YEAR").toString();if (width == 2 && year.length >= 2)
return year.slice(year.length - 2, year.length);return SimpleDateFormat.paddingZero(year, width);};SimpleDateFormat.formatMonthInYear=function(obj, cal, width) {
var month=cal.get("MONTH");if (width < 3)
return SimpleDateFormat.paddingZero(month+1, width, '0');    // number form
if (width == 3)
months=obj.dateFormatSymbols.shortMonths;else
months=obj.dateFormatSymbols.months;if (!months || !(typeof(months) == "object" && months.constructor == Array) || month >= months.length)
return "";return months[month];};SimpleDateFormat.formatDayInMonth=function(obj, cal, width) {
var day=cal.get("DATE")
return SimpleDateFormat.paddingZero(day, width);};SimpleDateFormat.formatHourInAmPm=function(obj, cal, width) {
var hour=cal.get("HOUR");if (!hour)
hour=12;return SimpleDateFormat.paddingZero(hour, width);};SimpleDateFormat.formatHourInDay=function(obj, cal, width) {
var hour=cal.get("HOUR_OF_DAY");return SimpleDateFormat.paddingZero(hour, width);};SimpleDateFormat.formatMinuteInHour=function(obj, cal, width) {
var min=cal.get("MINUTE");return SimpleDateFormat.paddingZero(min, width);};SimpleDateFormat.formatSecondInMinute=function(obj, cal, width) {
var sec=cal.get("SECOND");return SimpleDateFormat.paddingZero(sec, width);};SimpleDateFormat.formatMillisecond=function(obj, cal, width) {
var msec=cal.get("MILLISECOND");return SimpleDateFormat.paddingZero(msec, width);};SimpleDateFormat.formatDayInWeek=function(obj, cal, width) {
var weekday=cal.get("DAY_OF_WEEK");var weekdays;if (width >= 4)
weekdays=obj.dateFormatSymbols.weekdays;else
weekdays=obj.dateFormatSymbols.shortWeekdays;if (!weekdays || !(typeof(weekdays) == "object" && weekdays.constructor == Array) || weekday >= weekdays.length)
return "";return weekdays[weekday];};SimpleDateFormat.formatDayInYear=function(obj, cal, width) {
var day=cal.get("DAY_OF_YEAR");return SimpleDateFormat.paddingZero(day, width);};SimpleDateFormat.formatDayOfWeekInMonth=function(obj, cal, width) {
var weekdays=cal.get("DAY_OF_WEEK_IN_MONTH");return SimpleDateFormat.paddingZero(weekdays, width);};SimpleDateFormat.formatWeekInYear=function(obj, cal, width) {
return "";};SimpleDateFormat.formatWeekInMonth=function(obj, cal, width) {
return "";};SimpleDateFormat.formatAmPmMarker=function(obj, cal, width) {
var ampmStrings=obj.dateFormatSymbols.ampmStrings;if (!ampmStrings || !(typeof(ampmStrings) == "object" && ampmStrings.constructor == Array))
return "";var index=cal.get("AM_PM");if (index < 0 || index >= ampmStrings.length)
return "";return ampmStrings[index];};SimpleDateFormat.formatHourInDay2=function(obj, cal, width) {
var hour=cal.get("HOUR_OF_DAY");if (!hour)
hour=24;return SimpleDateFormat.paddingZero(hour, width);};SimpleDateFormat.formatHourInAmPm2=function(obj, cal, width) {
var hour=cal.get("HOUR");if (hour == 12)
hour=0;return SimpleDateFormat.paddingZero(hour, width);};SimpleDateFormat.formatTimezone=function(obj, cal, width) {
var offset=cal.get("ZONE_OFFSET");var plusminus;if (offset > 0)
plusminus="+";else
plusminus="-";offset=Math.abs(offset);var h=SimpleDateFormat.paddingZero(parseInt(offset / 60), 2);var m=SimpleDateFormat.paddingZero(offset % 60, 2);return "GMT" + plusminus + h + ":" + m;};SimpleDateFormat.countNumberText=function(text) {
if (typeof(text) != 'string')
text=text.toString();var i;for (i=0; i < text.length; i++) {
c=text.charAt(i);if (c.charCodeAt(0) < '0'.charCodeAt(0) || '9'.charCodeAt(0) < c.charCodeAt(0))
break;};return i;};SimpleDateFormat.parseEra=function(obj, text, textpos, width, cal) {
var eras=obj.dateFormatSymbols.eras;if (!eras || (!(typeof(eras) == "object" && eras.constructor == Array)))
return (NaN);for (var i=0; i < eras.length; i++)  {
if (text.substr(textpos, eras[i].length).toLowerCase() == eras[i].toLowerCase()) {
cal.set("ERA", i);return (textpos + eras[i].length);}};return (NaN);};SimpleDateFormat.parseYear=function(obj, text, textpos, width, cal) {
var i;var ntext;var yeartext="";var year;var len=text.length;if (obj.contiguousSymbols == true) {
if (textpos + width < len) {
len=textpos + width;}}for (i=textpos; i < len; i++) {
ntext=text.charAt(i);if (isNaN(parseInt(ntext, 10)))
break;yeartext+=ntext;};if (yeartext.length == 0)
return (NaN);year=parseInt(yeartext, 10);if (isNaN(year))
return (NaN);cal.set("YEAR",year);return (textpos + yeartext.length);};SimpleDateFormat.parseMonthInYear=function(obj, text, textpos, width, cal) {
var month=-1;var pos=textpos;if (width >= 3) {
var months;if (width >= 4)
months=obj.dateFormatSymbols.months;else
months=obj.dateFormatSymbols.shortMonths;if (!months || !(typeof(months) == "object" && months.constructor == Array))
return (NaN);for (var i=0; i < months.length; i++)  {
if (text.substr(textpos, months[i].length).toLowerCase() == months[i].toLowerCase()) {
month=i;pos+=months[i].length;break;}};}else {
var len;if (obj.contiguousSymbols == true)
var currentText=text.substr(textpos, width);else
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (!isNaN(n)) {
month=n - 1;pos+=SimpleDateFormat.countNumberText(currentText);}}if (month == -1)
return (NaN);var dayBefore=cal.get("DATE");cal.set("MONTH", month);if (dayBefore != cal.get("DATE")) {
var monthAhead, monthSet;monthAhead=monthSet=cal.get("MONTH");while (monthAhead == monthSet) {
cal.add("DATE", -1);monthSet=cal.get("MONTH");};}return pos;};SimpleDateFormat.parseDayInMonth=function(obj, text, textpos, width, cal) {
var len;if (obj.contiguousSymbols == true)
var currentText=text.substr(textpos, width);else
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("DATE", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseHourInAmPm=function(obj, text, textpos, width, cal) {
var len;if (obj.contiguousSymbols == true)
var currentText=text.substr(textpos, width);else
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("HOUR", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseHourInDay=function(obj, text, textpos, width, cal) {
var len;if (obj.contiguousSymbols == true)
var currentText=text.substr(textpos, width);else
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("HOUR_OF_DAY", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseMinuteInHour=function(obj, text, textpos, width, cal) {
var len;if (obj.contiguousSymbols == true)
var currentText=text.substr(textpos, width);else
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("MINUTE", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseSecondInMinute=function(obj, text, textpos, width, cal) {
var len;if (obj.contiguousSymbols == true)
var currentText=text.substr(textpos, width);else
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("SECOND", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseMillisecond=function(obj, text, textpos, width, cal) {
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("MILLISECOND", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseDayInYear=function(obj, text, textpos, width, cal) {
return (NaN);};SimpleDateFormat.parseDayOfWeekInMonth=function(obj, text, textpos, width, cal) {
return (NaN);};SimpleDateFormat.parseWeekInYear=function(obj, text, textpos, width, cal) {
return (NaN);};SimpleDateFormat.parseWeekInMonth=function(obj, text, textpos, width, cal) {
return (NaN);};SimpleDateFormat.parseHourInDay2=function(obj, text, textpos, width, cal) {
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("HOUR_OF_DAY", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseHourInAmPm2=function(obj, text, textpos, width, cal) {
var currentText=text.substr(textpos);var n=parseInt(currentText, 10);if (isNaN(n))
return (NaN);cal.set("HOUR", n);return (textpos + SimpleDateFormat.countNumberText(currentText));};SimpleDateFormat.parseDayInWeek=function(obj, text, textpos, width, cal) {
var weekdays=obj.dateFormatSymbols.weekdays;if (width >= 4)
weekdays=obj.dateFormatSymbols.weekdays;else
weekdays=obj.dateFormatSymbols.shortWeekdays;if (!weekdays || !(typeof(weekdays) == "object" && weekdays.constructor == Array))
return (NaN);for (var i=0; i < weekdays.length; i++)  {
if (text.substr(textpos, weekdays[i].length).toLowerCase() == weekdays[i].toLowerCase()) {
cal.set("DAY_OF_WEEK", i);return (textpos + weekdays[i].length);}};return (NaN);};SimpleDateFormat.parseAmPmMarker=function(obj, text, textpos, width, cal) {
var ampms=obj.dateFormatSymbols.ampmStrings;if (!ampms || !(typeof(ampms) == "object" && ampms.constructor == Array))
return (NaN);for (var i=0; i < ampms.length; i++)  {
if (text.substr(textpos, ampms[i].length).toLowerCase() == ampms[i].toLowerCase()) {
cal.set("AM_PM", i);return (textpos + ampms[i].length);}};return (NaN);};SimpleDateFormat.getDefaultGregorianFormatSymbols=function() {
var dfs=new DateFormatSymbols();dfs.eras=["BC", "AD"];dfs.ampmStrings=["AM", "PM"];dfs.months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];dfs.shortMonths=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];dfs.weekdays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];dfs.shortWeekdays=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];return dfs;};