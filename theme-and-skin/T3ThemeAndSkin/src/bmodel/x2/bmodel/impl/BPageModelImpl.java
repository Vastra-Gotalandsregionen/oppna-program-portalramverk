package x2.bmodel.impl;

 

import com.ibm.portal.ObjectID;
import com.ibm.portal.admin.Skin;
import com.ibm.portal.content.*;
import com.ibm.portal.engine.ComponentViewLocatorProvider;
import com.ibm.portal.events.PortletRenderEventListener;
import com.ibm.portal.navigation.NavigationNode;
import com.ibm.portal.navigation.NavigationSelectionModel;
import com.ibm.portal.serialize.SerializationException;
import com.ibm.portal.state.StateHolder;
import com.ibm.portal.state.StateManager;
import com.ibm.portal.state.accessors.StateAccessor;
import com.ibm.portal.state.accessors.StateAccessorFactory;
import com.ibm.portal.state.accessors.portlet.PortletAccessor;
import com.ibm.portal.state.accessors.portlet.PortletAccessorFactory;
import com.ibm.wps.composition.CompositionMessages;
import com.ibm.wps.composition.elements.Component;
import com.ibm.wps.composition.elements.Control;
import com.ibm.wps.composition.elements.UnlayeredContainer;
import com.ibm.wps.engine.EngineMessages;
import com.ibm.wps.engine.Problem;
import com.ibm.wps.engine.RunData;
import com.ibm.wps.engine.SkinHelper;
import com.ibm.wps.engine.ThemeHelper;
import com.ibm.wps.engine.ccpp.ProfileFactoryImpl;
import com.ibm.wps.engine.templates.SkinTemplate;
import com.ibm.wps.model.ModelUtil;
import com.ibm.wps.model.factory.ModelFactory;
import com.ibm.wps.model.impl.SkinElement;
import com.ibm.wps.pe.om.common.PreferenceSet;
import com.ibm.wps.pe.om.definition.PortletDefinition;
import com.ibm.wps.pe.om.entity.PortletEntity;
import com.ibm.wps.pe.om.window.PortletWindow;
import com.ibm.wps.pe.pc.PortletContainerMgr;
import com.ibm.wps.pe.pc.util.PortletModeHelper;
import com.ibm.wps.pe.pc.util.WindowStateHelper;
import com.ibm.wps.services.dispatcher.Dispatcher;
import com.ibm.wps.services.events.EventBroker;
import com.ibm.wps.services.finder.Finder;
import com.ibm.wps.services.identification.IdentificationMgr;
import com.ibm.wps.services.localizer.Localizer;
import com.ibm.wps.services.modelfactory.ModelFactoryService;
//import com.ibm.wps.services.view.ComponentViewLocatorImpl;
//import com.ibm.wps.services.view.View;
import com.ibm.wps.state.utils.StateHelper;
import com.ibm.wps.util.PortletHelper;
import com.ibm.wps.util.StringUtils;

import java.io.IOException;
import java.util.*;

import javax.ccpp.Profile;
import javax.ccpp.ProfileFactory;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

import org.apache.jetspeed.portlet.Portlet.Mode;
import org.apache.jetspeed.portlet.PortletWindow.State;
import org.apache.pluto.PortletContainerException;
import org.apache.pluto.om.common.Preference;

import x2.bmodel.BLayoutNode;
import x2.bmodel.BPageModel;

// Referenced classes of package bmodel.impl:
//            BModelFactory

public class BPageModelImpl implements BPageModel {

	private LayoutModel _layoutModel;

	 

	private ContentNode _contentNode;

	private StateHolder stateHolder;



	private ModelLocator2 _manager;

	public BPageModelImpl(ContentNode node, LayoutModel layoutModel,
			ModelLocator2 manager) {
		_contentNode = node;
		_manager = manager;
		_layoutModel = layoutModel;

	}
	
	public boolean isAuthorized(BLayoutNode node) throws Exception{
		if(node.isPortlet()) {
        PortletDefinition portletdefinition = ((PortletWindow)node.getLayoutNode()).getPortletDefinition();
        if(portletdefinition != null && !portletdefinition.isActive())
            throw new PortletContainerException(EngineMessages.ERROR_PORTLET_INACTIVE_0);
        StateManager statemanager = StateHelper.getStateManager();
        com.ibm.portal.state.StateHolder stateholder = getStateHolder();
        PortletAccessorFactory portletaccessorfactory = (PortletAccessorFactory)statemanager.getAccessorFactory(com.ibm.portal.state.accessors.portlet.PortletAccessorFactory.class);
        PortletAccessor portletaccessor = portletaccessorfactory.getPortletAccessor(((LayoutControl)node.getLayoutNode()).getObjectID(), stateholder);
        javax.portlet.PortletMode portletmode = portletaccessor.getPortletMode();
        portletaccessor.dispose();
		boolean res = PortletHelper.isAuthorized(RunData.from(_manager.getReq()), _contentNode, (PortletWindow)node.getLayoutNode(), portletmode);
		return res;
		} else {
			return true;
		}
	}

	 public StateHolder getStateHolder()
	    {
	        if(stateHolder == null)
	            try
	            {
	                StateAccessorFactory stateaccessorfactory = (StateAccessorFactory)StateHelper.getStateManager().getAccessorFactory(com.ibm.portal.state.accessors.StateAccessorFactory.class);
	                StateAccessor stateaccessor = stateaccessorfactory.getStateAccessor();
	                stateHolder = stateaccessor.getStateHolder((HttpServletRequest)_manager.getReq());
	                stateaccessor.dispose();
	            }
	            catch(Exception e)
	            {
	                throw new RuntimeException(e);
	            }
	        return stateHolder;
	    }

	public BLayoutNode makeNode(final Object o) {

		try {
			final Component n = (Component) o;

			boolean isHorizontal = false;
			boolean isVertical = false;

			if (n instanceof UnlayeredContainer) {
				isHorizontal = Orientation.HORIZONTAL
						.equals(((UnlayeredContainer) n).getOrientation());
				isVertical = Orientation.VERTICAL
						.equals(((UnlayeredContainer) n).getOrientation());
			}

			final boolean isHorizontalF = isHorizontal;
			final boolean isVerticalF = isVertical;

			System.out.println("Making BLayoutNode from: " + n.toString() + ":"
					+ n.getClass().getName());

			return new BLayoutNode() {

				public boolean isRow() {
					return isHorizontalF;
				}

				public boolean isPortlet() {
					return n instanceof Control;
				}

				public boolean isColumn() {
					return isVerticalF;
				}

				public String getWidth() {
					return "FIXME";
				}

				public ObjectID getOid() {
					return n.getObjectID();
				}

				public String getHeight() {
					return "FIXME";
				}

				public List getChildren() {
					if (isPortlet()) {
						return null;
					}
					try {

						if (n instanceof UnlayeredContainer) {
							UnlayeredContainer ulc = (UnlayeredContainer) n;
							return makeBetterLayoutNodeList(ulc.getChildren());

						} else {
							return null;
						}
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				}

				public String getTitle() {
					if (n instanceof LayoutControl) {
						return ((LayoutControl) n)
								.getTitle(Locale.getDefault());
					} else {
						return null;
					}
				}

				// only valid if it is a portlet
				private Control getControl() {
					return (Control) n;
				}

				// only valid if it is a portlet
				private LayoutControl getLayoutControl() {
					return (LayoutControl) n;
				}

				// only valid if it is a portlet
				private PortletDefinition getPortletDefinition() {
					return ((PortletWindow)getControl()).getPortletDefinition();
				}
				
				public void render() {
					try {
						if(!isAuthorized(this)) {
							return;
						}
						if (isPortlet()) {
							Control control = (Control) n;
							control.render(RunData.from(_manager.getReq()));
						} else {
							System.out.println("Cannot render, not a portlet: "
									+ n.getObjectID());
						}
					} catch (Exception e) {
						System.out.println(e);
						e.printStackTrace();
					}
				}
				
				public String getName() {
					return (isPortlet()) ? getPortletDefinition().getName() : null;
				}

				public String getPortletID() {
			        if(isPortlet()) {
			        	ObjectID oid = getOid();
				        if(oid != null) {
				            try {
				            	return IdentificationMgr.getIdentification().serialize(oid, false);
				            } catch(SerializationException se) {
				                System.out.println(se);
				                se.printStackTrace();
				            }
				        }
			        }
			        return null;
				}
				
				public void renderWithoutSkin() {
					try {
						if(!isAuthorized(this)) {
							return;
						}
						if (isPortlet()) {
							Control control = (Control) n;
							RunData rundata = RunData.from(_manager.getReq());
					        PortletRenderEventListener renderEL = (PortletRenderEventListener) EventBroker
									.getTrigger(PortletRenderEventListener.class);
					        					        
				            PortletDefinition portletDefinition = getPortletDefinition();
				            if(portletDefinition != null && !portletDefinition.isActive()) {
				                throw new PortletContainerException(EngineMessages.ERROR_PORTLET_INACTIVE_0);
				            }
			            
				            PortletAccessorFactory portletAccessorFactory = (PortletAccessorFactory)StateHelper.getStateManager().getAccessorFactory(PortletAccessorFactory.class);
				            PortletAccessor portletAccessor = portletAccessorFactory.getPortletAccessor(control.getObjectID(), getStateHolder());				            
				            Mode mode = PortletModeHelper.convertFromPortletMode(portletAccessor.getPortletMode());
					        State state = WindowStateHelper.convertFromWindowState(portletAccessor.getWindowState());
					        portletAccessor.dispose();
					        
				            if(state != org.apache.jetspeed.portlet.PortletWindow.State.MINIMIZED || portletDefinition.isStandard()) {
				                ModelUtil modelUtil = ModelUtil.from(_manager.getReq());				                
				                NavigationNode navigationNode = (NavigationNode)modelUtil.getNavigationSelectionModel().getSelectedNode();
				                if(navigationNode == null) {
				                    throw new IllegalStateException("PortletRenderTag: No node selected!");
				                }
				            	ObjectID objectID = ((PortletEntity)((PortletWindow)control).getPortletEntity()).getId();
				                renderEL.beginRender(rundata.getRequest(), objectID, portletDefinition.getTitle(_manager.getReq().getLocale()), mode, state, navigationNode.getContentNode());
				                PortletContainerMgr.getContainer().renderPortlet((PortletWindow)control, rundata.getRequest(), rundata.getResponse());
				                renderEL.endRender(rundata.getRequest(), objectID, portletDefinition.getTitle(_manager.getReq().getLocale()), mode, state, navigationNode.getContentNode());
				            }

						} else {
							System.out.println("Cannot render, not a portlet: "
									+ n.getObjectID());
						}
					} catch(Exception e) {
						System.out.println(e);
						e.printStackTrace();
			        }			        
				}

				public LayoutNode getLayoutNode() {
					// TODO Auto-generated method stub
					return (LayoutNode) n;
				}

				public List getPreferenceValues(String preferenceName) {
					if (isPortlet()) { 
						PreferenceSet ps = (PreferenceSet)getPortletDefinition().getPreferenceSet();
						if(ps==null) {
							return new ArrayList();
						}
						Preference pref = ps.get(preferenceName);
						return (pref != null) ? pref.getValues() : null;
					}
					return null;
				}

			};
		} catch (Exception e) {

			throw new RuntimeException(e);
		}
	}

	List makeBetterLayoutNodeList(Iterator i) {
		List r = new ArrayList();
		for (; i.hasNext(); r.add(makeNode(i.next()))) {
		}
		return r;
	}

	public BLayoutNode getRoot() {
		try {
			return makeNode(_layoutModel.getRoot());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public String toString() {
		StringBuffer b = new StringBuffer(1000);
		handleNode(b, getRoot());
		return b.toString();
	}

	private void handleNode(StringBuffer b, BLayoutNode n) {
		if (n.isPortlet()) {
			b.append("[" + n.getTitle() + "]");
			return;
		}
		if (n.isRow()) {
			List children = n.getChildren();
			Iterator it = children.iterator();
			b.append("<row>\n");
			BLayoutNode oneChild;
			for (; it.hasNext(); handleNode(b, oneChild)) {
				oneChild = (BLayoutNode) it.next();
			}

			b.append("</row>\n");
			return;
		}
		if (n.isColumn()) {
			Iterator it = n.getChildren().iterator();
			b.append("<col>\n");
			BLayoutNode oneChild;
			for (; it.hasNext(); handleNode(b, oneChild)) {
				oneChild = (BLayoutNode) it.next();
			}

			b.append("</col>\n");
			return;
		} else {
			return;
		}
	}

}
