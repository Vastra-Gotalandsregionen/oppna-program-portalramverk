package x2.bmodel.impl;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.ibm.portal.admin.LanguageList;
import com.ibm.portal.admin.MarkupList;
import com.ibm.portal.admin.SkinList;
import com.ibm.portal.admin.ThemeList;
import com.ibm.portal.content.ContentMetaDataModel;
import com.ibm.portal.content.ContentModel;
import com.ibm.portal.model.ContentMetaDataModelHome;
import com.ibm.portal.model.ContentModelHome;
import com.ibm.portal.model.LanguageListHome;
import com.ibm.portal.model.MarkupListHome;
import com.ibm.portal.model.NavigationModelHome;
import com.ibm.portal.model.NavigationSelectionModelHome;
import com.ibm.portal.model.NavigationSelectionModelProvider;
import com.ibm.portal.model.SkinListHome;
import com.ibm.portal.model.ThemeListHome;
import com.ibm.portal.navigation.NavigationModel;
import com.ibm.portal.navigation.NavigationSelectionModel;
import com.ibm.wps.model.NavigationModelUtil;

public class ModelLocator
{
//
//    private ServletRequest _req;
//    private ServletResponse _resp;
//    private NavigationModelUtil _navModelUtil;
//
//    public ModelLocator(ServletRequest req, ServletResponse resp)
//    {
//        _req = req;
//        _resp = resp;
//        _navModelUtil = NavigationModelUtil.from(req);
//    }
//
//    public NavigationModelUtil getNavModelUtil()
//    {
//        return _navModelUtil;
//    }
//
//    private Object lookupService(String name)
//    {
//    	try {
//        Object home;
//        Context ctx = new InitialContext();
//        home = ctx.lookup("portal:service/model/" + name);
//        return home;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public NavigationSelectionModel getNavigationSelectionModel()
//    {
//    	try {
//        NavigationSelectionModelProvider m = ((NavigationSelectionModelHome)lookupService("NavigationSelectionModel")).getNavigationSelectionModelProvider()
//        
//        
//        getNavigationSelectionModelProvider().getNavigationSelectionModel(_req, _resp);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public NavigationModel getNavigationModel()
//    {
//    	try {
//        NavigationModel m = ((NavigationModelHome)lookupService("NavigationModel")).getNavigationModelProvider().getNavigationModel(_req, _resp);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public ContentModel getContentModel()
//    {
//    	try {
//        ContentModel m = ((ContentModelHome)lookupService("ContentModel")).getContentModelProvider().getContentModel(_req, _resp);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public ContentMetaDataModel getContentMetaDataModel()
//    {
//    	try {
//        ContentMetaDataModel m = ((ContentMetaDataModelHome)lookupService("ContentMetaDataModel")).getContentMetaDataModelProvider().getContentMetaDataModel(_req, _resp);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public LanguageList getLanguageList()
//    {
//    	try {
//        LanguageList m = ((LanguageListHome)lookupService("LanguageList")).getLanguageListProvider().getLanguageList(_req);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public MarkupList getMarkupList()
//    {
//    	try {
//        MarkupList m = ((MarkupListHome)lookupService("MarkupList")).getMarkupListProvider().getMarkupList(_req);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public SkinList getSkinList()
//    {
//    	try {
//        SkinList m = ((SkinListHome)lookupService("SkinList")).getSkinListProvider().getSkinList(_req);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
//
//    public ThemeList getThemeList()
//    {
//    	try {
//        ThemeList m = ((ThemeListHome)lookupService("ThemeList")).getThemeListProvider().getThemeList(_req);
//        return m;
//    	} catch(Exception e) {
//            throw new RuntimeException(e);
//    	}
//    }
}
