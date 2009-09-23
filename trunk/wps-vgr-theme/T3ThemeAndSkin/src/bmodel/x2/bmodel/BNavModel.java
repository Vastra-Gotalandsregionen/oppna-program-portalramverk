package x2.bmodel;

import java.util.Iterator;
import java.util.List;

public interface BNavModel {

    public abstract BNavigationNode getRoot()
        throws Exception;

    public abstract BNavigationNode getSelectedNode()
        throws Exception;

    public abstract List  getSelectionPath()
        throws Exception;

    public abstract BNavigationNode findNodeById(String s)
        throws Exception;
    
    
    public abstract BNavigationNode findNodeByUniqueName(String s)
    throws Exception;


     

}
