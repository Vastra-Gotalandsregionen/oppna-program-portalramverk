<%@page import="javax.portlet.*,java.util.*"%>
<%@ page session="false" %>
<%@ taglib uri="http://java.sun.com/portlet" prefix="portlet"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<%@page import="jw.iframe.PropertyResolver"%>
<%@page import="jw.iframe.util.SimpleJndiClient"%>
<%@page import="jw.iframe.util.Entry"%><portlet:defineObjects />
  <%
  	PortletPreferences p =  renderRequest.getPreferences();
  	Map  prefs = p.getMap();
  	Map dynamicProps = new HashMap();
  	dynamicProps.put("contextroot", request.getContextPath());
  	
	String userId = "hanjo26"; //request.getUserPrincipal().getName();
  	String[] attrs = new String[] {"cn","uid","displayName","mail","hsaPersonIdentityNumber"};
  	SimpleJndiClient c = new SimpleJndiClient("ldap://rgvm0002.vgregion.se:389/",null,null,attrs,new String[] {},new Object[] {});
	
	Entry[] entries = c.search("","(uid="+userId+")");
		Entry e = entries[0];
	for(int i = 0; i < attrs.length; i++) {
		dynamicProps.put("currentUser."+attrs[i],e.getAttributeValue(attrs[i]));
	}
	 
	PropertyResolver resolver = new PropertyResolver(dynamicProps);
  	
  	
   %>
 <iframe 
 <% Iterator it = prefs.keySet().iterator();
 while (it.hasNext()) { 
 	String pref = (String)it.next();
 	String[] values = (String[])prefs.get(pref);
 	 if(pref.startsWith("iframe.")) {
 		String pref1 = pref.replace("iframe.","");
 		String v = "";
 		v = values[0];
 	%> <%=pref1%>="<%= resolver.resolve(v) %>" <%
    }
  } %>>
 content
 </iframe>
 