package x2.bmodel;

import java.util.List;

import com.ibm.portal.ObjectID;
import com.ibm.portal.content.LayoutModel;
import com.ibm.portal.content.LayoutNode;
import com.ibm.wps.pe.om.definition.PortletDefinition;

public interface BLayoutNode
{
	public LayoutNode getLayoutNode();

    public abstract boolean isColumn();

    public abstract boolean isRow();

    public abstract boolean isPortlet();

    public abstract List getChildren();

    public abstract String getWidth();

    public abstract String getHeight();

    public abstract ObjectID getOid();

    public abstract String getName();
    
    public abstract String getPortletID();

    public abstract List getPreferenceValues(String preferenceName);
    
    public abstract void render();
  //  public abstract void renderWithoutSkin();

    public abstract String getTitle();
}

