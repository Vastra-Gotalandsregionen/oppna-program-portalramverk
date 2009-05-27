<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ page session="false" buffer="none" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c-rt" %>

<%@ taglib uri="http://www.ibm.com/xmlns/prod/websphere/portal/v6.0/portal-navigation" prefix="portal-navigation" %>
<%@ taglib uri="http://www.ibm.com/xmlns/prod/websphere/portal/v6.0/portal-dynamicui" prefix="portal-dynamicui" %>
<%@ taglib uri="http://www.ibm.com/xmlns/prod/websphere/portal/v6.0/portal-logic" prefix="portal-logic" %>
<%@ taglib uri="http://www.ibm.com/xmlns/prod/websphere/portal/v6.0/portal-core" prefix="portal-core" %>
<%@ taglib uri="http://www.ibm.com/xmlns/prod/websphere/portal/v6.0/portal-fmt" prefix="portal-fmt" %>
<%@ taglib uri="http://www.ibm.com/xmlns/prod/websphere/portal/v6.0/portal-theme-ext" prefix="portal-theme-ext" %>
<%@ taglib uri="/WEB-INF/tld/portal-internal.tld" prefix="portal-internal" %>
<%@ taglib uri="/WEB-INF/tld/people.tld" prefix="pa" %>
<%@ taglib uri="/WEB-INF/tld/menu.tld" prefix="menu" %>
<%@page import="com.ibm.portal.content.LayoutNode"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%><%@page import="java.util.Stack"%><%@page import="java.util.Iterator"%><%@page import="com.ibm.portal.navigation.NavigationNode"%><%@page import="com.ibm.portal.content.LayoutModel"%><%@page import="com.ibm.portal.content.ContentPage"%><%@page import="com.ibm.wps.composition.elements.UnlayeredContainer"%><%@page import="com.ibm.wps.composition.elements.Control"%><%@page import="com.ibm.portal.content.ControlLocator"%><%@page import="com.ibm.wps.datastore.id.ObjectIDImpl"%><%@page import="com.ibm.wps.services.identification.IdentificationMgr"%><portal-core:constants/><portal-core:defineObjects/><portal-internal:adminNavHelper/><portal-theme-ext:initthemepolicy/>

<%@page import="x2.bmodel.BLayoutNode"%>
<%@page import="x2.bmodel.BModelManager"%>
<%@page import="x2.bmodel.BMUtil"%>
<%@page import="x2.bmodel.BNavigationNode"%>
<%@page import="com.ibm.portal.content.LayoutControl"%><%

BModelManager bmm = new BModelManager(request,response);
BLayoutNode p = bmm.getNavModel().getSelectedNode().getContent().getRoot();

int DEFAULT_LAYOUT = 1;
int MAX_LAYOUT = 5;
int selectedLayout = DEFAULT_LAYOUT;
/* 
Get the selected layout number from the page parameter "page.layout". 
If no parameter is set, use the predefined default layout (1) 
*/
try {
	String sl = (String)bmm.getNavModel().getSelectedNode().getParameter("page.layout");
	if (sl != null) {
		selectedLayout = Integer.parseInt(sl);
		if (selectedLayout < 1 || selectedLayout > MAX_LAYOUT) {
			selectedLayout = DEFAULT_LAYOUT;
		}
	}
} catch(Exception e) {}
List pp = BMUtil.getPortlets(p);
BNavigationNode startNode = bmm.getNavModel().findNodeById("ibm.portal.Home");
%>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="sv" lang="sv">
<head profile="http://dublincore.org/documents/dcq-html/">
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<title>Start</title>

	<!-- Meta data -->
	<meta name="keywords" content="relevant keywords for this page" />
	<meta name="description" content="A brief description of this page's content." />

	<!-- Dublin Core meta data -->
	<link rel="schema.DC" href="http://purl.org/DC/elements/1.1/" />
	<link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
	<meta name="DC.title" content="Dokumentets titel" />
	<meta name="DC.identifier" scheme="DCTERMS.URI" content="http://vgregion.se/url-till-dokumentet/" />
	<meta name="DC.creator" content="Dokumentets skapare" />
	<meta name="DC.publisher" content="Organisationens namn" />
	<meta name="DC.description" content="En kort beskrivning av dokumentets syfte och innehåll"/>
	<meta name="DCTERMS.modified" scheme="DCTERMS.W3CDTF" content="YYYY-MM-DD" />
	<meta name="DCTERMS.created" scheme="DCTERMS.W3CDTF" content="YYYY-MM-DD" />
	<meta name="DC.type" scheme="DCTERMS.DCMIType" content="Text" />
	<meta name="DC.format" scheme="DCTERMS.IMT" content="text/html" />	
	
	<!-- Shortcut icon -->
	<link rel="shortcut icon" href="../i/favicon.ico" type="image/ico" />

	<!-- CSS, hidden from old browsers, including IE/Mac -->
	<style type="text/css" media="screen,projection">
        @import '<portal-logic:urlFindInTheme file="css/grids-min.css"/>'; /* YUI Grids CSS */
        @import '<portal-logic:urlFindInTheme file="css/main.css"/>'; /* Global CSS */
		/* CSS för YUI-widgets */
        @import '<portal-logic:urlFindInTheme file="js/yui/assets/tabview.css"/>'; /* Flikvy */
        @import '<portal-logic:urlFindInTheme file="js/yui/assets/border_tabs.css"/>'; /* Flikvy */
        @import '<portal-logic:urlFindInTheme file="js/yui/assets/container.css"/>'; /* Dialoger */
        @import '<portal-logic:urlFindInTheme file="js/yui/assets/skins/vgr/container.css"/>'; /* Dialoger */
	</style>
 	
	<!--[if lt IE 8]>
	<link rel="stylesheet" href='<portal-logic:urlFindInTheme file="css/ie.css"/>' type="text/css" media="screen" />
	<![endif]-->
	<link rel="stylesheet" href='<portal-logic:urlFindInTheme file="css/print.css"/>' type="text/css" media="print" />

	<script type="text/javascript" src='<portal-logic:urlFindInTheme file="js/yui/utilities.js"/>'></script>
	<script type="text/javascript" src='<portal-logic:urlFindInTheme file="js/yui/container-min.js"/>'></script>
	<script type="text/javascript" src='<portal-logic:urlFindInTheme file="js/yui/tabview-min.js"/>'></script>
	<script type="text/javascript" src='<portal-logic:urlFindInTheme file="js/vgr.global.js"/>'></script>
</head>

<body class="yui-skin-vgr">
<div id="doc3" class="yui-t5">
	<div id="hd">
		<div id="skip"><a href="#yui-main" accesskey="s">Hoppa till sidans huvudinnehåll</a></div>
		<a href="index.html" id="logo"><img src="../i/logo.gif" alt="Västra Götalandsregionen" /></a>
		<form method="get" action="hitta/traffar.html" id="search" class="form-general search-module">
			<div class="text">
				<label for="searchtext" class="structural">Sök:</label>
				<input type="text" id="searchtext" name="searchtext" accesskey="4" size="20" />
			</div>
			<div class="submit-area">
				<input type="submit" value="SÃ¶k" />
			</div>
		</form>
		<p id="login-status" class="logged-in">Inloggad som Annie Alveflo <a href="../index.html">Logga ut</a></p>
		<div id="nav" class="clearfix">
			<p class="structural"><strong>Huvudnavigering</strong></p>
			<ul id="nav-main">
				<li id="tab-start"><a href="../index.html" accesskey="1">Start</a></li>
				<li id="tab-mitt-jobb" class="sel"><a href="../mitt_jobb/index.html" class="sel">Mitt jobb</a></li>
				<li id="tab-system-x"><a href="../vard/patientoversikt.html">Vård</a></li>
				<li id="tab-system-y"><a href="inactive">System Y</a></li>
				<li id="tab-hitta"><a href="../hitta/index.html">Hitta</a></li>
				<li id="tab-installningar"><a href="../installningar/index.html">Egna inställningar</a></li>
			</ul>
			<p class="structural"><strong>Navigering för Mitt jobb</strong></p>
			<ul class="nav-sub">
				<li class="sel"><a href="index.html" class="sel">Nytt</a></li>
				<li><a href="dokument.html">Dokument</a></li>
				<li><a href="bevakningar.html">Bevakningar</a></li>
				<li><a href="inactive">Diskussionsgrupper</a></li>
				<li><a href="kalender.html">Kalender</a></li>
				<li><a href="uppgifter.html">Uppgifter</a></li>
				<li><a href="epost.html">E-post</a></li>
				<li><a href="kontakter.html">Kontakter</a></li>
			</ul>
			<p class="structural"><strong>Navigering för Mitt jobb - Nytt</strong></p>
			<ul class="nav-sub">
				<li><a href="kalender.html">Kalender</a></li>
				<li><a href="index.html">Nytt</a></li>
				<li><a href="dokument.html">Dokument</a></li>
				<li class="sel"><a href="bevakningar.html" class="sel">Bevakningar</a></li>
				<li><a href="inactive">Diskussionsgrupper</a></li>
			</ul>
			<p class="structural"><strong>Navigering för Mitt jobb - Nytt - Bevakningar</strong></p>
			<ul class="nav-sub">
				<li><a href="kalender.html">Kalender</a></li>
				<li class="sel"><a href="bevakningar.html" class="sel">Bevakningar</a></li>
				<li><a href="inactive">Diskussionsgrupper</a></li>
				<li><a href="index.html">Nytt</a></li>
				<li><a href="dokument.html">Dokument</a></li>
				<li><a href="inactive">Diskussionsgrupper</a></li>
			</ul>
		</div>
	</div>
	<div id="bd">
		<h1 class="structural">Min startsida</h1>
		<div id="yui-main">
			<div class="yui-b">
				<div class="yui-g">
					<div class="yui-u first">
						<div id="module-work" class="module">
							<h2>Mitt jobb</h2>
							<div class="module-content">
						</div>
					</div>
					<div class="yui-u">
						<div id="module-news" class="module">
							<h2><a href="verksamhetsnytt.html">Verksamhetsnytt</a></h2>
							<div class="module-content">
							</div>
						</div>
						<div id="module-calendar" class="module">
							<script type="text/javascript" src="../js/module-calendar.js"></script>
							<h2><a href="mitt_jobb/kalender.html">Kalender</a></h2>
							<div class="module-content">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="yui-b">
			<div id="module-shortcuts" class="module">
				<h2><a href="inactive">Mina genvÃ¤gar</a></h2>
				<div class="module-content">
				sadsadsa 
				</div>
			</div>
			<div id="module-contacts" class="module">
				<h2><a href="mitt_jobb/kontakter.html">Mina kontakter</a></h2>
			</div>
			<div id="module-todos-latest" class="module">
				<script type="text/javascript" src="../js/module-todos-latest.js"></script>
				<h2><span>Mina uppgifter</span></h2>
				<div class="module-content">
				sadsa sadsa 
				</div>
			</div>
			<div id="module-messages" class="module">
				<script type="text/javascript" src="../js/module-messages.js"></script>
				<h2><span>Samarbeten</span></h2>
				<div class="module-content accordion">
				asdsad sad sad
					 
 				</div>
			</div>
		</div>
	</div>
</div> 
</body>
</html>