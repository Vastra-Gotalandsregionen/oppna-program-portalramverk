# Generella designriktlinjer: Portlet #

En portlet skall ses som en beståndsdel av en webbsida. Webbsidan kan innehålla ett flertal portlets samtidigt. Portlets placeras som ett rutnät på webbsidan, genom att applicera de portlets som logiskt hör ihop tillsammans. Detta enligt närhetsprinciper, vilken du kan läsa om i [bilaga 2: att utforma](http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga2AttUtforma). En portlet innehåller information som logiskt hör ihop, men kan hämtas från olika typer av applikationer eller webbsidor.
En portlet kan innehålla information från någon applikation som finns längre in i Portalens informationsstruktur, såsom en lista över användarens senast inkomna e-postmeddelanden. En portlet kan också innehålla information som hämtas från externa applikationer och webbsidor, vilket fallet är för Evenemangskalendern där en lista med evenemang presenteras på startsidan.

## Kvalifikationer ##
En portlet skall användas för att visa information som logiskt hör ihop. Den information som fyller en portlet kan komma från nyheter och dokument samt information från fristående och integrerade applikationer. Portlets visar endast information som motsvarar användarens profil.
En portlet ger ibland tillgång till funktioner. Exempelvis kan användaren klicka på en post i en portlet öppna en modal dialog med detaljinformation eller en fristående applikation.

## Placering i Portalen ##
När en ny portlet skapas för Portalen gäller det att den placeras på en logisk plats i Portalen. Detta för att underlätta för användaren då hon integrerar med Portalen. Läs mer om Portalens olika innehållsdelar för att avgöra var din portlet hemma, se avsnitt Struktur under [Portalramverket](http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortalramverket).
## Storlek och utseende ##

<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-fUoD4-QI/AAAAAAAAAaU/r7MVvSCyk9w/s800/Picture%2079.jpg' />
<br><i>Figur 11: Exempel på portlet i Portalen</i>

Storleken för en portlet kan variera beroende på vad den behöver innehålla samt var den finns. Dock bör en portlet inte bli mindre än 250 pixlar bred.<br>
<br>
<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-fU7sNO5I/AAAAAAAAAaY/C_4bJw7NBhA/s800/Picture%2080.jpg' />
<br><i>Figur 12: Utseende på portlet</i>

I en portlet finns alltid en titel som beskriver vad den innehåller, exempelvis ”E-post” och ”Verksamhetsnytt”.<br>
En portlet bör aldrig innehålla element som rullister eller knappar, medan ikoner och länkar går utmärkt.<br>
<br>
<h2>Innehåll & navigation</h2>
Hur användaren kan navigera med och i en portlet beror på vad portleten innehåller. En portlet kan innehålla olika typer av information, se nedanstående exempel.<br>
<br>
<h3>Information från extern applikation</h3>
Det finns portlets som innehåller information från externa applikationer. Exempel på detta är en portlet för Evenemangskalendern som visar en lista med aktiviteter.<br>
Rubriken i portleten är då en länk till den externa applikationen, om det är så att användaren skall kunna öppna applikationen. När användaren klickar på länken öppnas den externa applikationen upp i en ny webbläsare.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fVCgrB0I/AAAAAAAAAac/D4kp7P4ju7I/s800/Picture%2081.jpg' />
<br><i>Figur 13: Exempel då användaren öppnar en extern applikation från en portlet</i>

<h3>Information från applikationer i Portalen</h3>
Ibland kan det vara nödvändigt att presentera information på Portalens startsida från applikationer som befinner sig längre ner i Portalens struktur.<br>
För de portlets som innehåller information från applikationer som ”bor” i portalen skall rubriken för portleten vara en länk. Länken tar användaren vidare till källan.<br>
<br>
<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-fVdC1P7I/AAAAAAAAAag/dZhBWEQ6cvQ/s800/Picture%2082.jpg' />
<br><i>Figur 14: Exempel då användaren tar sig till en annan del av Portalen via en portlet</i>

<h3>Fristående portlet</h3>
Det finns de fall då en portlet innehåller information som varken kommer från en extern applikation eller från en applikation som ”bor” någonstans i Portalen. Då användaren vill läsa mer om samma sak och då innehållet är så pass omfattande att det inte får plats i en portlet, behövs en navigering. Det finns ett par sätt att utforma navigeringen:<br>
<ul><li>När innehållet är utformat som en lista och då listans poster är så många att de inte får plats i en portlet, skall en paginering användas. Användaren kan använda dessa för att bläddra bland posterna genom att klicka på ”Nästa” eller gå tillbaka via ”Föregående”.</li></ul>

<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-fVq6_w2I/AAAAAAAAAak/IJs3AalMOPk/s800/Picture%2083.jpg' />
<br><i>Figur 15: Horisontell navigering i portlet med ”Föregående” och ”Nästa”</i>

<ul><li>I de fall då portleten innehåller information som skall gå att utöka och detaljera, skall minimering och maximering av en portlet användas, se bild nedan.</li></ul>

<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-fVtFu-qI/AAAAAAAAAao/usimthHi290/s800/Picture%2084.jpg' />
<br><i>Figur 16: Utseende för att maximera och minimera en portlet</i>


<br><br>
<b>Innehållsförteckning</b> (återfinns längst ner på varje sida)<br>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/DesignriktlinjerAnvandargranssnitt'>Introduktion till interaktionsdesign för portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortalramverket?ts=1251969346&updated=GenerellaDesignriktlinjerPortalramverket'>Generella designriktlinjer: Portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerIntegreradApplikation?ts=1251969401&updated=GenerellaDesignriktlinjerIntegreradApplikation'>Generella designriktlinjer: Integrerad applikation</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerModalDialog?ts=1251969439&updated=GenerellaDesignriktlinjerModalDialog'>Generella designriktlinjer: Modal dialog</a>
</li><li>Generella designriktlinjer: Portlet<br>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerFristandeApplikation?ts=1251969550&updated=GenerellaDesignriktlinjerFristandeApplikation'>Generella designriktlinjer: Fristående applikation</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBeteendeoFunktioner?ts=1251969604&updated=GenerellaDesignriktlinjerBeteendeoFunktioner'>Generella designriktlinjer: Beteenden och funktioner</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerByggstenar?ts=1251969727&updated=GenerellaDesignriktlinjerByggstenar'>Generella designriktlinjer: Byggstenar</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerVisuellAterkoppling?ts=1251969771&updated=GenerellaDesignriktlinjerVisuellAterkoppling'>Generella designriktlinjer: Visuell återkoppling</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerGrafiskForm?ts=1251969808&updated=GenerellaDesignriktlinjerGrafiskForm'>Generella designriktlinjer: Grafisk form</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/TillampadeDesignriktlinjerBattreKollPaJobbet?ts=1251969900&updated=TillampadeDesignriktlinjerBattreKollPaJobbet'>Tillämpade designriktlinjer, Bättre koll på jobbet</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/InteraktionsdesignForvantadeEffekter'>Tillämpade designriktlinjer, Bättre koll på jobbet: Förväntade effekter och målgrupper</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/InteraktionsdesignPrincipdesign'>Tillämpade designriktlinjer, Bättre koll på jobbet: Principdesign</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/InteraktionsdesignInnehall'>Tillämpade designriktlinjer, Bättre koll på jobbet: Innehåll</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/InteraktionsdesignBeteendeFunktioner'>Tillämpade designriktlinjer, Bättre koll på jobbet: Beteenden och funktioner</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/InteraktionsdesignDetaljdesign'>Tillämpade designriktlinjer, Bättre koll på jobbet: Detaljdesign</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/AnnuInteUtrett?ts=1251892328&updated=AnnuInteUtrett'>Tillämpade designriktlinjer, Bättre koll på jobbet: Ännu inte utrett (ej uppdaterad)</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/Kunskapsstod'>Tillämpade designriktlinjer, Bättre koll på jobbet - Kunskapsstöd: Detaljdesign</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga1Informationsstyrning'>Bilaga 1: Informationsstyrning</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga2AttUtforma'>Bilaga 2: Att utforma</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga3ExempelProjektEvenemangskalendern'>Bilaga 3: Exempelprojekt evenemangskalendern</a>