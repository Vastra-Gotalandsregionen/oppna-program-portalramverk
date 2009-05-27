package jw.iframe.util;

/**
 * Class containing data related to calling client
 * @author hangyl
 *
 */
public class RemoteUserContainer {
	private String remoteIpAddress 	= ""; // The IP-address of the client that sent the request
	private String remoteHost = ""; // The fully qualified name of the client that sent the request, 
									// or the IP address of the client if the name cannot be determined
	private String remotePort = ""; // Port of the remote client
	private String remoteUser = ""; // The login of the user making this request e.g. wpsadmin

	
	public RemoteUserContainer(){
		super();
	}

	public RemoteUserContainer(String remoteHost,
							   String remoteIpAddress,
							   String remotePort, 
							   String remoteUser) {
		super();
		this.remoteHost = remoteHost;
		this.remoteIpAddress = remoteIpAddress;
		this.remotePort = remotePort;
		this.remoteUser = remoteUser;
	}
	
	/**
	 * @return The IP-address of the client that sent the request
	 *         e.g. 140.166.117.131
	 */
	public String getRemoteIpAddress() {
		return remoteIpAddress;
	}

	/**
	 * @return The fully qualified name of the client that sent the request, 
	 *         or the IP address of the client if the name cannot be determined
	 *         e.g. hansgyllensten.knowit.local (or 140.166.117.131)
	 */
	public String getRemoteHost() {
		return remoteHost;
	}

	/**
	 * @return Port of the remote client
	 *         e.g. 3652
	 */
	public String getRemotePort() {
		return remotePort;
	}

	/**
	 * @return The login of the user making this request 
	 *         e.g. hangyl
	 */
	public String getRemoteUser() {
		return remoteUser;
	}
	
	void setRemoteIpAddress(String remoteIpAddress) {
		this.remoteIpAddress = remoteIpAddress;
	}

	void setRemoteHost(String remoteHost) {
		this.remoteHost = remoteHost;
	}

	void setRemotePort(String remotePort) {
		this.remotePort = remotePort;
	}

	void setRemoteUser(String remoteUser) {
		this.remoteUser = remoteUser;
	}
	
	public String toString() {
		StringBuffer buf = new StringBuffer("Remote Client information");
		buf.append(this.getRemoteIpAddress());
		buf.append("ip=" + getRemoteIpAddress());
		buf.append(", host=" + getRemoteHost());
		buf.append(", port=" + getRemotePort());
		buf.append(", user=" + getRemoteUser());
		return buf.toString();
	}
}
