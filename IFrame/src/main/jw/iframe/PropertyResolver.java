

package jw.iframe;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class PropertyResolver {

	public PropertyResolver(Map props) {
		this.props = props;
	}
	private Map props = new HashMap();
	
	public String resolve(String input) {
		Iterator it = props.keySet().iterator();
		while (it.hasNext()) {
			String key = (String) it.next();
			String val = (String)props.get(key);
			System.out.println("replacing: "+key+" with=> "+val);
			System.out.println("Old string is: "+input);
			input = input.replaceAll("@"+key+"@", val);
			System.out.println("New string is: "+input);
			
		}
		
		return input;
		
	}
	
}
