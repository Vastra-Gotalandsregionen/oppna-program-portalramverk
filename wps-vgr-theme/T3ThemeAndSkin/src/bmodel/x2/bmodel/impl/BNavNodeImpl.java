package x2.bmodel.impl;

import x2.bmodel.BModelManager;
import x2.bmodel.BNavModel;
import x2.bmodel.BNavigationNode;
import x2.bmodel.BPageModel;
import x2.bmodel.impl.BNavNodeImpl;

import com.ibm.portal.MetaData;
import com.ibm.portal.MetaDataProvider;
import com.ibm.portal.ObjectID;
import com.ibm.portal.content.ContentModel;
import com.ibm.portal.content.ContentNode;
import com.ibm.portal.content.ContentPage;
import com.ibm.portal.navigation.NavigationModel;
import com.ibm.portal.navigation.NavigationNode;

import com.ibm.wps.model.LocaleHelper;
import com.ibm.wps.model.NavigationModelUtil;
import java.util.Iterator;
import java.util.List;

import x2.bmodel.BModelManager;
import x2.bmodel.BNavigationNode;
import x2.bmodel.BPageModel;

// Referenced classes of package bmodel.impl:
//            BetterNavModelImpl, BModelFactory, BetterPageModelImpl

public class BNavNodeImpl
    implements BNavigationNode
{

    private NavigationNode _navNode;
	private ModelLocator2 _manager;
	private BNavModelImpl _bm;


    BNavNodeImpl(BNavModelImpl bm, NavigationNode navNode, ModelLocator2 manager)
    {
    	_bm = bm;
        _navNode = navNode;
        _manager = manager;

    }

    public List getChildren()
        throws Exception
    {
        Iterator children = _manager.getNavigationModel().getChildren(_navNode);
        return BModelManager.iter2List( _bm.makeBetterNodeIterator(children));
       
    }

    public String getTitle()
    {
        return getTitle(_navNode);
    }

    public String getUniqueName()
    {
        String name = getUniqueName(_navNode);
        if(name != null)
        {
            return name;
        } else
        {
            return getObjectID().toString();
        }
    }

    public ObjectID getObjectID()
    {
        ObjectID name = getObjectID(_navNode);
        return name;
    }

    public BNavigationNode getParent()
        throws Exception
    {
        return _bm.makeBNavNode((NavigationNode)_manager.getNavigationModel().getParent(_navNode));
    }

    public boolean hasChildren()
        throws Exception
    {
        return _manager.getNavigationModel().hasChildren(_navNode);
    }

    public String getSelectUrl()
    {
    	return NavigationModelUtil.from(_manager.getReq()).createSelectionChangeURL(_navNode);
  
    }

    public String getDescription()
    {
        return getDescription(_navNode);
    }

    public BPageModel getContent()
        throws Exception
    {
    	System.out.println("==================================SSS");
        if(_navNode.getContentNode() instanceof ContentPage)
        {
            ModelLocator2 bmf = _manager;
            com.ibm.portal.content.LayoutModel lm = bmf.getContentModel().getLayoutModel((ContentPage)_navNode.getContentNode());
            return new BPageModelImpl(_navNode.getContentNode(),lm, _manager);
        } else
        {
            return null;
        }
    }
    
    /**
     * Fetch named parameter value set on the content node (page) using the MetaDataProvider.
     */
    public Object getParameter(String name) throws Exception {
    	ContentNode contentNode = _navNode.getContentNode();
    	if (contentNode instanceof MetaDataProvider) {
            final MetaData data = (MetaData) ((MetaDataProvider)contentNode).getMetaData();
            return data.getValue(name);
        }
    	return null;
    }
    
    String getTitle(NavigationNode navNode)
    {
        return LocaleHelper.getTitle(navNode, _manager.getReq());
    }

    String getDescription(NavigationNode navNode)
    {
        return LocaleHelper.getDescription(navNode, _manager.getReq());
    }

    String getUniqueName(NavigationNode navNode)
    {
        return navNode.getContentNode().getObjectID().getUniqueName();
    }

    ObjectID getObjectID(NavigationNode navNode)
    {
        return navNode.getContentNode().getObjectID();
    }

    
	public boolean isSelected() throws Exception {
		boolean r = _manager.getNavigationSelectionModel().isNodeInSelectionPath(_navNode);
		return r;
	}
	
	 public  BNavigationNode makeBNavNode(NavigationNode node, ModelLocator2 m)
	    {
	        return new BNavNodeImpl(_bm,node, m);
	    }	
	 public  Iterator makeBetterNodeIterator(final Iterator i,final ModelLocator2 m)
	    {
	        return new  Iterator() {
			
	            public boolean hasNext()
	            {
	                return i.hasNext();
	            }

	            public Object next()
	            {
	                return makeBNavNode((NavigationNode)i.next(),m);
	            }

	            public void remove()
	            {
	                i.remove();
	            }
			
			};
	    }
}
