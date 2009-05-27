package jw.iframe.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.BasicAttributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

public class SimpleJndiClient {

	private String _bindDN;

	private String _bindPw;

	private String _bindUrl;

	private String[] _defaultReadAttrs;

	private String[] _defaultUpdateAttrs;
	private String[] _defaultAddAttrs;

	private Object[] _objectClasses;

	private DirContext _ctx;

	class EntryImpl implements Entry {
		private String _dn;

		private Map _attrs;

		public EntryImpl(String base, SearchResult res) {
			_dn = res.getName();
			if(base!=null && base.length()!=0) {
				_dn = _dn + ","+base;
			}
			_attrs = attrsToHashtable(res.getAttributes());
		}

		public Attributes getAttributesForUpdate() {
			return mapToAttrs(_defaultUpdateAttrs, _attrs);
		}

		/**
		 * @param rdn
		 */
		public EntryImpl(String rdn) {
			_dn = rdn;
			_attrs = new HashMap();
		}

		private Map attrsToHashtable(Attributes attrs) {
			try {
				Map res = new HashMap();
				NamingEnumeration attrIter = attrs.getAll();
				while (attrIter.hasMore()) {
					Attribute oneAttr = (Attribute) attrIter.next();
					String attrId = oneAttr.getID();
					NamingEnumeration attrValuesIter = oneAttr.getAll();
					List attrValues = new ArrayList();
					while (attrValuesIter.hasMore()) {
						Object oneValue = (Object) attrValuesIter.next();
						attrValues.add(oneValue);
					}
					if (attrValues.isEmpty()) {
						attrValues.add(null);
					}
					res.put(attrId, attrValues);
				}
				return res;
			} catch (Exception e) {
				throw new RuntimeException("Parsing attrs failed", e);
			}
		}

		public String getDN() {
			return _dn;
		}

		public Object getAttributeValue(String attrName) {
			Object[] vals = getAttributeValues(attrName);
			if(vals.length>0) {
			    return vals[0];
			}
			return null;
		}

		public Object[] getAttributeValues(String attrName) {
			List vals = (List) _attrs.get(attrName);
			if(vals==null) {
				vals = new ArrayList();
			}
			Object[] res = new Object[vals.size()];
			for (int i = 0; i < res.length; i++) {
				res[i] = vals.get(i);
			}

			return res;
		}

		public String toString() {
			StringBuffer buf = new StringBuffer(200);
			buf.append("" + _dn + "\n");
			buf.append(dumpAttrMap(_attrs));
			buf.append("\n");
			return buf.toString();
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see simple_jndiclient.Entry#clearAttribute(java.lang.String)
		 */
		public void clearAttribute(String attr) {
			_attrs.remove(attr);

		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see simple_jndiclient.Entry#setAttributeValue(java.lang.String,
		 *      java.lang.Object)
		 */
		public void setAttributeValue(String attr, Object value) {
			List val = new ArrayList();
			val.add(value);
			_attrs.put(attr, val);

		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see simple_jndiclient.Entry#addAttributeValue(java.lang.String,
		 *      java.lang.Object)
		 */
		public void addAttributeValue(String attr, Object value) {
			List currValues = (List) _attrs.get(attr);
			if (currValues == null) {
				currValues = new ArrayList();
				_attrs.put(attr, currValues);
			}
			currValues.add(value);
		}

		/*
		 * (non-Javadoc)
		 * 
		 * @see simple_jndiclient.Entry#setAttributeValue(java.lang.String,
		 *      java.lang.Object[])
		 */
		public void setAttributeValue(String attr, Object[] values) {
			List vals = new ArrayList();

			for (int i = 0; i < values.length; i++) {
				vals.add(values[i]);
			}
			_attrs.put(attr, vals);

		}

		/**
		 * @return
		 */
		public Attributes getAttributesForAdd() {
			// TODO Auto-generated method stub
			return mapToAttrs(_defaultAddAttrs, _attrs);
		}

	}

	public SimpleJndiClient(String bindUrl, String bindDN, String bindPassword,
			String[] readAttrs, String[] updateAttrs, Object[] objClasses) {

		_bindDN = bindDN;
		_bindUrl = bindUrl;
		_bindPw = bindPassword;
		_defaultReadAttrs = readAttrs;
		_objectClasses = objClasses;
		_defaultUpdateAttrs = updateAttrs;
		
		_defaultAddAttrs = new String[updateAttrs.length+1];
		_defaultAddAttrs[0] = "objectClass";
		for(int i = 0; i < updateAttrs.length;i++) {
			_defaultAddAttrs[i+1] = updateAttrs[i];
		}
	}

	public void bind() {
		try {
			Hashtable env = new Hashtable();
			env.put(Context.INITIAL_CONTEXT_FACTORY,
					"com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, _bindUrl);
			if(_bindDN!=null) {
			env.put(Context.SECURITY_PRINCIPAL,_bindDN);
			env.put(Context.SECURITY_CREDENTIALS,_bindPw);
			}
			_ctx = new InitialDirContext(env);
			System.out.println("Bound to:" +_ctx.getNameInNamespace());
			
		} catch (Exception e) {
			throw new RuntimeException("Bind failed", e);
		}
	}

	public static void main(String[] args) {

	}

	private DirContext getBaseContext() {
		if (_ctx == null) {
			bind();
		}
		return _ctx;
	}

	public Entry[] search(String base, String filter) {
		try {
			SearchControls sc = new SearchControls();
			sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
			sc.setReturningAttributes(_defaultReadAttrs);
			NamingEnumeration results = getBaseContext().search(base, filter,
					sc);
			List entries = new ArrayList();

			while (results.hasMore()) {
				SearchResult oneRes = (SearchResult) results.next();
				entries.add(new EntryImpl(base,oneRes));
			}
			Entry[] res = new Entry[entries.size()];
			for (int i = 0; i < res.length; i++) {
				res[i] = (Entry) entries.get(i);
			}
			return res;

		} catch (Exception e) {
			throw new RuntimeException("Search failed: base="+base+" filter="+filter, e);
		}
	}
	public Entry searchUnique(String base, String filter) {
		Entry[] r = search(base,filter);
		if(r.length==1) {
			return r[0];
		}
		throw new RuntimeException("Search failed, multiple entries found -- expecting only one: "+base +":"+filter);
	}

	public void add(Entry e) {
		try {
			Attributes attrs = ((EntryImpl) e).getAttributesForAdd();
			String dn = e.getDN();
			System.out.println("DN: "+dn);
			getBaseContext().bind(dn, attrs);
		} catch (Exception ex) {
			throw new RuntimeException("Add failed", ex);
		}
	}

	public void modify(Entry e) {
		try {
			Attributes attrs = ((EntryImpl) e).getAttributesForUpdate();
			getBaseContext().modifyAttributes(e.getDN(),
					InitialDirContext.REPLACE_ATTRIBUTE, attrs);
		} catch (Exception ex) {
			throw new RuntimeException("Modify failed", ex);
		}
	}

	public void delete(Entry e) {
		try {

			getBaseContext().destroySubcontext(e.getDN());
		} catch (Exception ex) {
			throw new RuntimeException("Delete failed", ex);
		}

	}

	public static String dumpSearchRes(Entry[] res) {
		StringBuffer buf = new StringBuffer(256);
		for (int i = 0; i < res.length; i++) {
			buf.append(res[i]);
		}
		return buf.toString();
	}

	private static boolean arrayContains(String[] a, String val) {
		for (int i = 0; i < a.length; i++) {
			if (a[i] == null) {
				if (val == null) {
					return true;
				}
			} else {
				if (a[i].equals(val)) {
					return true;
				}
			}

		}
		return false;
	}

	public static Attributes mapToAttrs(String[] attrNames, Map m) {
		BasicAttributes attrs = new BasicAttributes();
		Iterator it = m.keySet().iterator();
		while (it.hasNext()) {
			String key = (String) it.next();
			if (arrayContains(attrNames, key)) {
				List values = (List) m.get(key);
				BasicAttribute oneAttr = new BasicAttribute(key);
				Iterator it2 = values.iterator();
				while (it2.hasNext()) {

					Object oneVal = (Object) it2.next();
					oneAttr.add(oneVal);
				}
				attrs.put(oneAttr);
			}
		}
		return attrs;
	}

	public static String dumpAttrMap(Map m) {
		StringBuffer buf = new StringBuffer(256);
		Iterator it = m.keySet().iterator();
		while (it.hasNext()) {
			String key = (String) it.next();
			List values = (List) m.get(key);
			buf.append("   " + key + ": |");
			Iterator it2 = values.iterator();
			while (it2.hasNext()) {
				String oneVal = (String) it2.next();
				buf.append(oneVal + "|");
			}
			buf.append("\n");
		}
		return buf.toString();
	}

	public Entry newEntry(String rdn) {
		Entry e = new EntryImpl(rdn);
		e.setAttributeValue("objectClass", _objectClasses);
		return e;
	}
}
