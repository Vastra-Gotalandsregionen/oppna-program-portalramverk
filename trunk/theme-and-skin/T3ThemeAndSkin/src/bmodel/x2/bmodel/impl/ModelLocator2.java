package x2.bmodel.impl;

import javax.naming.CompositeName;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.Name;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.ibm.portal.content.ContentMetaDataModel;
import com.ibm.portal.content.ContentModel;
import com.ibm.portal.content.ContentNode;
//import com.ibm.portal.identification.Identification;
import com.ibm.portal.model.ContentMetaDataModelHome;
import com.ibm.portal.model.ContentModelHome;
import com.ibm.portal.model.NavigationModelHome;
import com.ibm.portal.model.NavigationSelectionModelHome;
import com.ibm.portal.navigation.NavigationModel;
import com.ibm.portal.navigation.NavigationNode;
import com.ibm.portal.navigation.NavigationSelectionModel;
//import com.ibm.wps.model.NavigationModelUtil;
import com.ibm.portal.ObjectID;

//import com.ibm.portal.state.EngineURL;
//import com.ibm.portal.state.PortletStateManager;
//import com.ibm.portal.state.URLFactory;
//import com.ibm.portal.state.accessors.locale.LocaleAccessorController;
//import com.ibm.portal.state.accessors.locale.LocaleAccessorFactory;
//import com.ibm.portal.state.accessors.portlet.PortletAccessorController;
//import com.ibm.portal.state.accessors.portlet.PortletAccessorFactory;
//import com.ibm.portal.state.accessors.portlet.PortletTargetAccessorController;
//import com.ibm.portal.state.accessors.portlet.PortletTargetAccessorFactory;
//import com.ibm.portal.state.accessors.selection.SelectionAccessorController;
//import com.ibm.portal.state.accessors.selection.SelectionAccessorFactory;
//import com.ibm.portal.state.accessors.statepartition.StatePartitionAccessorController;
//import com.ibm.portal.state.accessors.statepartition.StatePartitionAccessorFactory;
//import com.ibm.portal.state.accessors.themetemplate.ThemeTemplateAccessorController;
//import com.ibm.portal.state.accessors.themetemplate.ThemeTemplateAccessorFactory;
//import com.ibm.portal.state.accessors.url.ServerContext;
//import com.ibm.portal.state.exceptions.StateException;
//import com.ibm.portal.state.service.PortalStateManagerServiceHome;
//import com.ibm.portal.state.service.PortletStateManagerService;
//import com.ibm.portal.state.service.StateManagerService;
public class ModelLocator2 {
 
	private ServletResponse _resp;
	private ServletRequest _req;
	private NavigationSelectionModel navSelectionModel;
	private ContentModel<ContentNode> contentModel;
	private ContentMetaDataModel contentMetaDataModel;
	private NavigationModel<NavigationNode> navigationModel;

	
    public ModelLocator2(ServletRequest req, ServletResponse resp)
    {
        _req = req;
        _resp = resp;
        init();
      }
    
    public ObjectID getObjectId(String name) {
    	try {
        	InitialContext ctx = new InitialContext();
        	  Name uniqueName = new CompositeName("portal:"+name);
        	  return (ObjectID)ctx.lookup(uniqueName);
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
  	  
	
    }
                     
    
    
	public ServletResponse getResp() {
		return _resp;
	}


	public ServletRequest getReq() {
		return _req;
	}


	public ContentMetaDataModel getContentMetaDataModel() {
		return contentMetaDataModel;
	}

	public void setContentMetaDataModel(ContentMetaDataModel contentMetaDataModel) {
		this.contentMetaDataModel = contentMetaDataModel;
	}

	public ContentModel<ContentNode> getContentModel() {
		return contentModel;
	}

	public void setContentModel(ContentModel<ContentNode> contentModel) {
		this.contentModel = contentModel;
	}

	public NavigationSelectionModel getNavigationSelectionModel() {
		return navSelectionModel;
	}

	public void setNavigationSelectionModel(NavigationSelectionModel navSelectionModel) {
		this.navSelectionModel = navSelectionModel;
	}

	public void init() {
		try {
			  ContentModelHome contententModelHome = (ContentModelHome)lookupService("model/ContentModel");
			  contentModel = contententModelHome.getContentModelProvider().getContentModel(_req, _resp);
			  
			  
			  NavigationModelHome navHome = (NavigationModelHome) lookupService("model/NavigationModel");
			  
			  navigationModel = navHome.getNavigationModelProvider().getNavigationModel(_req, _resp);			  
			  
			  NavigationSelectionModelHome home = (NavigationSelectionModelHome) lookupService("model/NavigationSelectionModel");
			  navSelectionModel = home.getNavigationSelectionModelProvider().getNavigationSelectionModel(_req, _resp);
			  
			  ContentMetaDataModelHome contententMetaModelModelHome = (ContentMetaDataModelHome) lookupService("model/ContentMetaDataModel");
			  contentMetaDataModel = contententMetaModelModelHome.getContentMetaDataModelProvider().getContentMetaDataModel(_req, _resp);
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		  
	}
	
		  
//		  An interface for a provider of the content node meta data model.  Context ctx = new InitialContext();
//		  
//		  if (home != null) {
//		  ContentMetaDataModel model = home.getContentMetaDataModelProvider().getContentMetaDataModel(aRequest, aResponse);b
//		  ...
//		  
//		  
//
//		  ContentModelController result = null;
//		  final Context ctx = new InitialContext();
//		  final ContentModelControllerHome home = (ContentModelControllerHome) ctx.lookup(ContentModelControllerHome.CONTENT_MODEL_CONTROLLER_JNDI_NAME);
//		  if (home != null) {
//		  result = home.getContentModelControllerProvider().createContentModelController(aContentModel);
		  
		  
    //      ctx.lookup("portal:service/resolver/FriendlySelectionService");
	  
    
    private Object lookupService(String name)
	    {
    	
	    	try {
	        Object home;
	        Context ctx = new InitialContext();
	        home = ctx.lookup("portal:service/" + name);
	        return home;
	    	} catch(Exception e) {
	            throw new RuntimeException(e);
	    	}
	    }

	public NavigationModel<NavigationNode> getNavigationModel() {
		return navigationModel;
	}

     
}
