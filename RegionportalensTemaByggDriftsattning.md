# Regionportalens tema för Liferay Portal #

För att se hur portlets mm kommer att se ut när man använder portalen är det lämpligt att även under utveckling använda sig av regionportalens tema.

Om du inte vill vidareutveckla temat utan enbart använda temat så kommer det inom kort finnas möjlighet att [ladda ner](http://code.google.com/p/oppna-program-portalramverk/downloads/list) en färdig utgåva av temat. Teman i Liferay Portal har samma struktur som en Java EE-webbapplikation vilket gör att temat distribueras som en WAR-fil.

# Utcheckning av Tema för Eclipse #

För att kunna redigera temats filer i Eclipse, gör enligt nedan:

  1. Lägg till "subversionrepositoryt" http://oppna-program-portalramverk.googlecode.com/svn/trunk/vgr-theme/
  1. Öppna "perspektivet" (eng. perspective) "SVN Repository exploring" (Window->Open Perspective->SVN Repository exploring)
  1. Högerklicka på repositoryt i vyn (eng. view) "SVN Repositories".
  1. Välj "Check out" i högerklicksmenyn och då får du projektet "vgr-theme" i ditt workspace.
  1. Modifiera "build.properties.template" enligt nedan.

# Utveckling av temat #

  1. [Checka ut](http://code.google.com/p/oppna-program-portalramverk/source/checkout) [källkod](http://oppna-program-portalramverk.googlecode.com/svn/trunk/vgr-theme).
  1. Anpassa temats ant-konfiguration:
    1. Utgå från build.properties.template (som finns inuti .../liferay-vgr-theme)
    1. Skapa en build.username.properties-fil, ersätt username med ditt användarnamn (som du är inloggad med på datorn). Denna nya fil vill du troligen inte checka in så lägg därför till den i svn.ignore
    1. Ändra app.server.dir så att den pekar på din Liferay-installation. Exempel: app.server.dir=/home/username/program/liferay-portal-5.2.3/tomcat-6.0.18/ eller i MS Windows-miljö exempelvis C:/program/liferay-portal-5.2.3/tomcat-6.0.18/.
    1. För att driftsätta på en extern portalserver i nätverket (eng. hot deploy), ändra även hotdeploy.scp.path. Exempel: hotdeploy.scp.path=username:password@liferayServer.domain.tld:deployDirRelativeToUsernamesHomeDir/
  1. Driftsättning av temat. Kör kommandot "ant" i katalogen "vgr-theme":
    1. Lokalt: Target "deploy-local" (standard, så det går att utelämna "target" vid bygget)
    1. Externt: Target "deploy-remote"