<html>
<% String pnr = request.getParameter("pnr"); //195304190027 

if(pnr!=null && pnr.length() > 10) {
	pnr = pnr.substring(2);
}
%>
<body>
<form id="Form1" action="http://segotn2804.vgregion.se/komoga/KoGDefault.aspx" method="post" name="Form1">
<input id="__VIEWSTATE" type="hidden" value="" name="__VIEWSTATE"/>
<input id="ivTxtFlexId" class="KOGTEXTBOX" type="text" value="<%= pnr%>" name="ivTxtFlexId"/>
<input id="__EVENTTARGET" type="hidden" value="ivBtnOk" name="__EVENTTARGET"/>
<input id="__EVENTARGUMENT" type="hidden" value="" name="__EVENTARGUMENT"/>
<input type="submit" />
</form>
<script>
document.forms[0].submit();
</script>
</body>
</html>