Generic IFramePortlet to be used for poor mans integration... alternative to Web Clipper

(0. Install war)
1. Create a copy(clone) of the default instance, set title as needed.
2. Set permissions, typically "All Authenticated Users"on the new portlet clone.
3. Set preferences on the portlet so that the iframe points to the correct url
	The principle is that a portlet preference key: iframe.xxx=blahblah, will be rendered
as an attribute xxx for the Iframe... (This will allow you to assign any HTML attribute, for example
css class or inline style

4. Put portlet on page
5. Repeat steps 1-4 to create more instances.