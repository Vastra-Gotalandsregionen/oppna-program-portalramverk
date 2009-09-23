package x2.bmodel.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import com.ibm.portal.SearchableTreeModel;
import com.ibm.portal.navigation.NavigationNode;

import x2.bmodel.BNavModel;
import x2.bmodel.BNavigationNode;

public class BNavModelImpl implements BNavModel {

	
	private ModelLocator2 _ml;

	public BNavModelImpl(ModelLocator2 ml) {
		_ml = ml;
		
	}
	// FIXME
	public BNavigationNode findNodeById(String s) throws Exception {
        SearchableTreeModel smtm = _ml.getNavigationModel();
        Object o = smtm.getLocator().findByUniqueName(s);
        return makeBNavNode((NavigationNode)o);
	}

	public BNavigationNode findNodeByUniqueName(String s) throws Exception {
        SearchableTreeModel smtm = _ml.getNavigationModel();
        Object o = smtm.getLocator().findByUniqueName(s);
        return makeBNavNode((NavigationNode)o);	}

	public BNavigationNode getRoot() throws Exception {
        return makeBNavNode((NavigationNode)_ml.getNavigationModel().getRoot());
	}

	public BNavigationNode getSelectedNode() throws Exception {
	      return makeBNavNode((NavigationNode)_ml.getNavigationSelectionModel().getSelectedNode());
	}

	public List getSelectionPath() throws Exception {
		// TODO Auto-generated method stub
        return  iter2List(makeBetterNodeIterator(_ml.getNavigationSelectionModel().iterator()));
	}
	
	   public  Iterator makeBetterNodeIterator(final Iterator i)
	    {
	        return new  Iterator() {
			
	            public boolean hasNext()
	            {
	                return i.hasNext();
	            }

	            public Object next()
	            {
	                return makeBNavNode((NavigationNode)i.next());
	            }

	            public void remove()
	            {
	                i.remove();
	            }
			
			};
	    }

    public static List iter2List(Iterator i) {
        List r = new ArrayList();
        	for(; i.hasNext(); r.add(i.next())) {
        		
        	}
        		return r;
    }
    
    
public  BNavigationNode makeBNavNode(NavigationNode node)
	  {
 	        return new BNavNodeImpl(this,node, _ml);
	   }
}


//

