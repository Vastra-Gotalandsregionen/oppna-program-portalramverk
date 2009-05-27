/*
 * Created on 2006-okt-21
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package jw.iframe.util;

/**
 * @author jw
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public interface Entry {

	String getDN();
	Object getAttributeValue(String attrName);
	Object[] getAttributeValues(String attrName);
	void clearAttribute(String attr);
	void setAttributeValue(String attr, Object value);
	void addAttributeValue(String attr, Object value);
	void setAttributeValue(String attr, Object[] values);
	
}
