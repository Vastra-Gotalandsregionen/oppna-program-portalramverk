//(C) Copyright IBM Corp. 2002, 2003, 2004. All Rights Reserved
//
if (!self.WClient)
{
self.WClient=new WClientImpl();}function WClientImpl()
{
this.userAgent=navigator.userAgent.toLowerCase();this.aol=(this.userAgent.indexOf("aol") != -1);this.opera=(this.userAgent.indexOf("opera") != -1);this.webtv=(this.userAgent.indexOf("webtv") != -1);this.ie=(this.userAgent.indexOf("msie") != -1);this.moz=(!this.ie &&
this.userAgent.indexOf("mozilla") != -1);this.nav=(this.moz &&
this.userAgent.indexOf("netscape") != -1);this.minor=navigator.appVersion;if (this.ie)
{
var marker1=this.userAgent.indexOf("msie ") + 5;var marker2=this.userAgent.indexOf(";", marker1);this.minor=this.userAgent.substring(marker1, marker2);}else if (this.nav &&
navigator.vendor &&
navigator.vendor.indexOf("Netscape") != -1)
{
this.minor=navigator.vendorSub;}else if (this.moz)
{
var rvString="; rv:";var rvIndex=this.userAgent.indexOf(rvString);if (rvIndex != -1)
{
var rvLength=rvString.length;rvString=this.userAgent.substring(rvIndex + rvLength);rvLength=rvString.indexOf(")");this.mozMinor=rvString.substring(0, rvLength);this.mozMajor=parseInt(this.minor);this.minor=(this.mozMajor < 1 ? "6.x" : "7.x");}else
{
var mozString="mozilla/";var moz=this.userAgent.indexOf(mozString);var len=mozString.length;this.minor=this.userAgent.substring(moz+len, moz+len+3);};}this.major=parseInt(this.minor);this.aix=(this.userAgent.indexOf("sinix") != -1);this.bsd=(this.userAgent.indexOf("bsd") != -1);this.dec=(this.userAgent.indexOf("dec") != -1 ||
this.userAgent.indexOf("osf1") != -1 ||
this.userAgent.indexOf("dec_alpha") != -1 ||
this.userAgent.indexOf("alphaserver") != -1 ||
this.userAgent.indexOf("ultrix") != -1 ||
this.userAgent.indexOf("alphastation") != -1);this.freebsd=(this.userAgent.indexOf("freebsd") != -1);this.hpux=(this.userAgent.indexOf("hp-ux") != -1);this.irix=(this.userAgent.indexOf("irix") != -1);this.linus=(this.userAgent.indexOf("inux") != -1);this.mac=(this.userAgent.indexOf("mac") != -1);this.mpras=(this.userAgent.indexOf("ncr") != -1);this.os2=(this.userAgent.indexOf("os/2") != -1 ||
this.userAgent.indexOf("ibm-webexplorer") != -1);this.reliant=(this.userAgent.indexOf("reliantunix") != -1);this.sco=(this.userAgent.indexOf("sco") != -1 ||
this.userAgent.indexOf("unix_sv") != -1);this.sinix=(this.userAgent.indexOf("sinix") != -1);this.sun=(this.userAgent.indexOf("sunos") != -1);this.unixware=(this.userAgent.indexOf("unix_system_v") != -1);this.unix=(this.userAgent.indexOf("x11") != -1 ||
this.aix || this.linux ||
this.bsd || this.sun ||
this.irix || this.hpux ||
this.sco || this.unixware ||
this.mpras || this.reliant ||
this.dec || this.sinix ||
this.freebsd);this.win32=(this.userAgent.indexOf("win") != -1 ||
this.userAgent.indexOf("16bit") != -1);this.getUserAgent=new Function("", "return navigator.userAgent"); // @04
this.isBrowserInternetExplorer=new Function("", "return this.ie");this.isBrowserNetscape=new Function("", "return this.nav");this.isBrowserMozilla=new Function("", "return this.moz");this.isBrowserOpera=new Function("", "return this.opera");this.getBrowserVersion=new Function("", "return this.minor");this.isBrowserVersion5Up=new Function("", "return (this.major >= 5)");this.isBrowserVersion6Up=new Function("", "return (this.major >= 6)");this.isBrowserVersion7Up=new Function("", "return (this.major >= 7)");this.isOSPlatformWindows=new Function("", "return this.win32");this.isOSPlatformMacintosh=new Function("", "return this.mac");this.isOSPlatformOS2=new Function("", "return this.os2");this.isOSPlatformUnix=new Function("", "return this.unix");this.isOSPlatformLinux=new Function("", "return this.linux");this.isOSPlatformAIX=new Function("", "return this.aix");};