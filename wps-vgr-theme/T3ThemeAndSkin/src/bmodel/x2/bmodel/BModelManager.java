package x2.bmodel;

import java.util.ArrayList;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import x2.bmodel.impl.BNavModelImpl;
import x2.bmodel.impl.ModelLocator2;

import com.ibm.portal.content.LayoutNode;

public class BModelManager {

private HttpServletResponse _resp;
private HttpServletRequest _req;
private ModelLocator2 modelLocator;

 public BModelManager(HttpServletRequest req, HttpServletResponse resp) {
	_req = req;
	_resp = resp;
	modelLocator = new ModelLocator2(req,resp);
}

 public HttpServletResponse getResp() {
	 
	 
	 return _resp;
 }
  
 
 public HttpServletRequest getReq() {
	 return _req;
	 
 }
  
public static BModelManager from(HttpServletRequest req, HttpServletResponse resp) {
	return new BModelManager(req,resp);
}
 

public static List iter2List(Iterator i) {
	   	        List r = new ArrayList();
	        for(; i.hasNext(); r.add(i.next())) { }
	        return r;
	    }

public String navTree( String name) {

	
	StringBuffer buf = new StringBuffer(1000);
	
	
	return buf.toString();
}

public BNavModel getNavModel() {
	return new BNavModelImpl(modelLocator);
}


public ModelLocator2 getModelLocator() {
	return modelLocator;
}

}
