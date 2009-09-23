package x2.bmodel;

import java.util.Iterator;
import java.util.List;

import com.ibm.portal.ObjectID;

public interface BNavigationNode {

	

    public abstract List getChildren()
        throws Exception;

    public abstract String getTitle()
        throws Exception;

    public abstract boolean isSelected()
    throws Exception;
 
    public abstract String getUniqueName()
        throws Exception;

    public abstract ObjectID getObjectID()
        throws Exception;

    
    public abstract BNavigationNode getParent()
        throws Exception;

    public abstract boolean hasChildren()
        throws Exception;

    public abstract String getSelectUrl()
        throws Exception;

    public abstract String getDescription()
        throws Exception;

    public abstract BPageModel getContent()
        throws Exception;
    
    public Object getParameter(String name)
    	throws Exception;
}
