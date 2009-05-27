package x2.bmodel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

import com.ibm.wps.util.PortletHelper;

public class BMUtil {

	
	public static String drawNavigation(BNavigationNode node)  {
		try {
		if(!node.hasChildren()) {
			return "<li><a href=\""+node.getSelectUrl()+ "\">"+node.getTitle()+"</a></li>";
		} else {
			String s = "<li><a href=\""+node.getSelectUrl()+ "\">"+node.getTitle()+"</a>";
			s = s + "<ul>";
			Iterator children = node.getChildren().iterator();
			while (children.hasNext()) {
				BNavigationNode child = (BNavigationNode) children.next();
				s = s + drawNavigation(child);
			}
			s = s + "</ul>";
			return s;
		}
		}
		catch(Exception e) {
			System.out.println(e);
			e.printStackTrace();
			throw new RuntimeException(e);
			
		}
		
	}
	/**
	 * Returns all portlets in specified container
	 * @param col
	 * @param root
	 * @return
	 */
	public static List getPortletsInContainer(int col, BLayoutNode container) {
		List portlets = new ArrayList();
		try {
			portlets = getPortlets((BLayoutNode)container.getChildren().get(col));

		}
		catch(Exception e) {
			System.out.println(e);
			e.printStackTrace();
			System.out.println("Container has: "+container.getChildren().size()+" children");
		}
		
		return portlets;
	}
	
	
	public static List getPortlets(BLayoutNode n) {
		Stack roots = new Stack();
		List portlets = new ArrayList();
		roots.push(n);
		while(!roots.isEmpty()) {
			BLayoutNode oneNode = (BLayoutNode)roots.pop();
			if(oneNode.isPortlet()) {
				portlets.add(oneNode);
			} else {
				Iterator it = oneNode.getChildren().iterator();
				while(it.hasNext()) {
					roots.push(it.next());
				}
			}
		}
		 Collections.reverse(portlets);
		 return portlets;
	}

}
