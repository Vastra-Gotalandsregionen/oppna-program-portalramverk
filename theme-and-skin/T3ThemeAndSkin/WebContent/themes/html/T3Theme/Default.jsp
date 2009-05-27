<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
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

%><!-- page layout: <%= selectedLayout %> -->
<html lang="sv">
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8">
		<title>PROTOTYPE</title>

		<!-- Meta data -->
		<meta name="keywords" content="relevant keywords for this page">
		<meta name="description" content="A brief description of this page's content.">

		<!-- Dublin Core meta data -->
		<link rel="schema.DC" href="http://purl.org/DC/elements/1.0/">
		<meta name="DC.Title" content="Document title">
		<meta name="DC.Identifier" scheme="URL" content="url">
		<meta name="DC.Creator" content="name.of.creator">
		<meta name="DC.Publisher" content="Name of organisation">
		<meta name="DC.Description" content="A brief description of this page's content.">
		<meta name="DC.Date.Modified" scheme="W3CDTF" content="date">
		<meta name="DC.Date.Created" scheme="W3CDTF" content="date">
		<meta name="DC.Type" content="text">
		<meta name="DC.Format" scheme="IMT" content="text/html">

		<!-- CSS, hidden from old browsers, including IE/Mac -->
		<link rel="stylesheet" type="text/css" href="<portal-logic:urlFindInTheme file="css/grids-min.css"/>">
		<style type="text/css" media="screen,projection">
			@import '<portal-logic:urlFindInTheme file="css/main.css"/>';
		</style>  
		<!--[if IE]>
		<link rel="stylesheet" href="<portal-logic:urlFindInTheme file="css/ie.css"/>" type="text/css" media="screen">
		<![endif]-->
		<link rel="stylesheet" href="<portal-logic:urlFindInTheme file="css/handheld.css"/>" type="text/css" media="handheld">
		<link rel="stylesheet" href="<portal-logic:urlFindInTheme file="css/print.css"/>" type="text/css" media="print">

		<!-- JavaScript -->
		<script type="text/javascript" src="<portal-logic:urlFindInTheme file="js/jquery.js"/>"></script>
		<script type="text/javascript" src="<portal-logic:urlFindInTheme file="js/jquery.accordion.js"/>"></script>
		<script type="text/javascript" src="<portal-logic:urlFindInTheme file="js/jquery.jqModal_full.js"/>"></script>
	</head>
	<body>
		<div id="doc3" class="<%= (selectedLayout == 1) ? "yui-t7" : "yui-t5" %>">
			<div id="hd">
				<ul id="skip">
					<li><a href="#content-primary" accesskey="s">Hoppa till sidans huvudinnehåll</a></li>
					<li><a href="#content-secondary">Hoppa till sidans sekundära innehåll</a></li>
					<li><a href="#nav-sub">Hoppa till sidans undernavigering</a></li>
				</ul>
				<a href="/" id="logo" title="Till startsidan"><img src="<portal-logic:urlFindInTheme file="i/logo.gif"/>" alt="Till startsidan"></a>
				<a href="#" id="login-status">Stämpla in</a>
				<form method="get" action="/" id="search" class="form-general search-module">
					<div class="text alt">
						<label for="searchtext">Sök:</label>
						<input type="text" id="searchtext" name="searchtext" accesskey="4" title="Ange sökord" size="20">
					</div>
					<div class="radio alt">
						<input type="radio" name="some_name" value="all" id="some_name1" checked="checked">
						<label for="some_name1">Allt</label>
					</div>
					<div class="radio alt">
						<input type="radio" name="some_name" value="people" id="some_name2">
						<label for="some_name2">Personer</label>
					</div>
					<div class="submit-area alt">
						<input type="submit" value="Sök">
					</div>
				</form>
				<div id="nav" class="clearfix">
					<p class="structural"><strong>Navigering</strong></p>
					<ul id="nav-main">
<%						BNavigationNode sel1 = null;
						Iterator it = startNode.getChildren().iterator();
						while(it.hasNext()) {
							BNavigationNode n1 = (BNavigationNode)it.next();
							String selClass = "";
							if(n1.isSelected()) {
							 sel1 = n1;
							 selClass = " class=\"sel\"";
							}
%>
						<li <%= selClass %>><a href="<%= n1.getSelectUrl()%>" accesskey="1" <%= selClass %>><%= n1.getTitle() %></a></li>
					<% } %>
						</ul>
				</div>
				<%if(sel1!=null)  { %>
				<div id="nav2" class="clearfix">
					<p class="structural"><strong>Navigering</strong></p>
					<ul id="nav-sub-1">
<%
						  it = sel1.getChildren().iterator();
						while(it.hasNext()) {
							BNavigationNode n1 = (BNavigationNode)it.next();
							String selClass = "";
							if(n1.isSelected()) {
							 selClass = " class=\"sel\"";
							}
%>
						<li <%= selClass %>><a href="<%= n1.getSelectUrl()%>" accesskey="1" <%= selClass %>><%= n1.getTitle() %></a></li>
					<% } %>
						</ul>
				</div>
				<% } %>
			</div>
<%
			/* switch depending on selected layout, including the corresponding layout JSP snippet */
			switch (selectedLayout) {
				case 1:
%>
					<%@ include file="./layouts/layout1.jspf" %>
<%			
					break;

				case 2:
%>
					<%@ include file="./layouts/layout2.jspf" --%>
<%			
					break;

				case 3:
%>
					<%@ include file="./layouts/layout3.jspf" --%>
<%		
					break;

				case 4:
%>
					<%@ include file="./layouts/layout4.jspf" --%>
<%		
					break;

				case 5:
%>
					<%@ include file="./layouts/layout5.jspf" --%>
<%		
					break;
					
				}
%>
			<div id="ft">
				<h2 class="structural">Verktyg och information</h2>
			</div>
		</div>

<% 
			if(bmm.getNavModel().findNodeById("ibm.portal.Administration")!=null) {
				BNavigationNode adminLink = bmm.getNavModel().findNodeById("ibm.portal.Administration");
				if(adminLink!=null) { 
%>
					<a href="<%= adminLink.getSelectUrl()%>">Admin</a>
<% 
				}
			}
%>
	</body>
</html>
