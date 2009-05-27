package jw.iframe.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.naming.CompositeName;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.Name;
import javax.portlet.RenderRequest;
 
//import com.ibm.portal.um.PumaHome;
//import com.ibm.portal.um.PumaProfile;

public class UserInfoService {
//
//    public interface Attr {
//
//	public String getName();
//
//	public Object getValue();
//    }
//
//    public static String dumpUserInfo() throws Exception { 
//	StringBuffer b = new StringBuffer();
//	try {
//		List<Attr> attrs = getUserInfo();
//		
//		for (Attr attr : attrs) {
//		    b.append(" " + attr.getName() + "=" + attr.getValue() + "\n");
//		}
//		
//	}
//	catch(Exception e) {
//	    e.printStackTrace();	    
//	    throw e;
//	}
//	return b.toString();
//    }
//
//    public static Map<String, Object> getCurrentUserInfo() throws Exception {
//	Map<String, Object> map = new HashMap<String, Object>();
//	
//	List<Attr> list = getUserInfo();
//	for (Attr attr : list) {
//	    map.put(attr.getName(), attr.getValue());
//	}	    
//	return map;
//    }
//
//    
//    /**
//     * This method returns a map with all LDAP attributes belonging to the current user
//     * @return
//     * @throws Exception
//     */
//    private static Map<String,Attr> getUserInfoInternal( ) throws Exception {
//	try {
//	    Map<String,Attr> res = new HashMap<String,Attr>();
//	    Context ctx = new InitialContext();
//	    Name myjndiname = new CompositeName(PumaHome.JNDI_NAME);
//	    PumaHome myHome = (PumaHome) ctx.lookup(myjndiname);
//	    PumaProfile pp = myHome.getProfile();
//	    List<String> attrNames = new ArrayList<String>(pp.getDefinedUserAttributeNames());
//	    Map<String, Object> m = pp.getAttributes(pp.getCurrentUser(), attrNames);
//
//	    Iterator<String> it = m.keySet().iterator();
//	    while (it.hasNext()) {
//		final String s = it.next();
//		final Object v = m.get(s);
//		res.put(s, new Attr() {
//
//		    public Object getValue() {
//			return v;
//		    }
//
//		    public String getName() {
//			return s;
//		    }
//		});
//	    }
//	    return res;
//	} 
//	catch (Exception e) {
//	    throw e;
//	}
//    }
//    
//    private static Attr makeAttr(final String name,final  Object value) {
//	return new Attr(){
//		public Object getValue() {
//		    return value;
//		}
//		public String getName() {
//		    return name;
//		}
//	};
//    }
//    
//    public static List<Attr> getUserInfo() throws Exception {
//	
//	Map<String,Attr> attrs = getUserInfoInternal();
//	String[] specialList = {	
//	    	};
//	// TODO
//	// Fix since the LDAP catalogue does  not return the above specified attributes we have to search for them specifically
//	//HAGY Constants.PLI_LDAP_CATALOGUE_URL
//	SimpleJndiClient c = new SimpleJndiClient("ldap://rgvm0002.vgregion.se:389/",null,null,specialList,new String[] {},new Object[] {});
//	String uid = (String)attrs.get("uid").getValue();
//	System.out.println("uid="+uid);
//	Entry  e = c.search("", "(uid=" +uid+")")[0];
//	    
//	List<Attr> res = new ArrayList<Attr>(attrs.values());
////	res.add(makeAttr(Constants.PORTAL_CATALOGUE_PROPERTY_PERS_PRESCIPTION_CODE, e.getAttributeValue(Constants.PORTAL_CATALOGUE_PROPERTY_PERS_PRESCIPTION_CODE)));
////	res.add(makeAttr(Constants.PORTAL_CATALOGUE_PROPERTY_UNIT_PRESCIPTION_CODE, e.getAttributeValue(Constants.PORTAL_CATALOGUE_PROPERTY_UNIT_PRESCIPTION_CODE)));
////	res.add(makeAttr(Constants.PORTAL_CATALOGUE_PROPERTY_PERSON_ID, e.getAttributeValue(Constants.PORTAL_CATALOGUE_PROPERTY_PERSON_ID)));
//	return res;
//    }
}