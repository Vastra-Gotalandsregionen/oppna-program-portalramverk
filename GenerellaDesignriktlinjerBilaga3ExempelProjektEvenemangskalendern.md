# Bilaga 3: exempelprojekt Evenemangskalendern #


Följande bilaga redogör för ett exempelinförande av applikationen Evenemangskalendern i Portalen. Evenemangskalendern är en applikation för att skapa aktiviteter i en kalender, förvalta dem och delvis distribuera dem inom Västra Götalandsregionen.
Att hantera aktiviteter består av två huvuddelar. För det första en del där användaren kan redigera och skapa nya kalenderhändelser, vilket ofta görs av någon typ av administratör. För det andra, vilket står för en övervägande del av användningen, är att läsa detaljerna kring en aktivitet. Aktiviteter kan vara av utbildande eller informerande art, men kan också vara mer nöjesbetonade.

## Typ av utformning ##
Det första som gjorde var att bestämma vilka/vilken typ av utförande som Evenemangskalendern skall utformas som. Som tidigare nämnts finns det ett flertal olika utföranden som en integrerad applikation, en modal dialog, portlet och/eller en helt fristående applikation.

## Fristående applikation ##
Ett första antagande gjordes att Evenemangskalendern är så pass omfattande att den antingen borde utformas som en integrerad applikation eller som en fristående applikation. Att endast använda modala dialoger och portlets uteslöts därför direkt.
Trots att Evenemangskalendern underlättar för användaren när det kommer till kunskapsutveckling, är den inte nödvändig för att användaren skall kunna utföra de mest relevanta arbetsuppgifterna i sitt arbete. Evenemangskalendern är inte heller vital för att användaren skall få den total överblick av sitt arbete. Evenemangskalendern utformas därför av förklarliga skäl som en fristående applikation och inte som en integrerad applikation.

<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fdmpRHYI/AAAAAAAAAcc/LYbXr0NoTRU/s800/Picture%20115.jpg' />
<br><i>Figur 50: Evenemangskalendern som fristående applikation</i>

<h2>Portlet</h2>
Redan innan Evenemangskalendern skulle utvecklas använde administratörer intranäten för de olika avdelningarna och sjukhusen för att publicera utbildningar och andra evenemang som personalen kunde tänkas vilja delta på. Under intervjuer med användarna framkom det att denna kanal är viktig för att förmedla evenemang eller liknande. En portlet placerades därför på Portalens startsida innehållandes olika aktiviteter som trycks ut direkt till användaren. Exempelvis om användaren är sjuksköterska och jobbar på medicinkliniken på Sahlgrenska får hon evenemang som berör de olika områdena.<br>
<br>
<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-fd4zqpOI/AAAAAAAAAcg/87o-cg1MEEE/s800/Picture%20116.jpg' />
<br><i>Figur 51: Aktiviteter från Evenemangskalendern presenterad på startsidan</i>

<h2>Modal dialog</h2>
Den information som får plats i en portlet är inte tillräcklig för det användaren behöver veta om ett evenemang för att besluta huruvida hon kan/vill delta på det.<br>
Det fanns två huvudsakliga alternativ för att lösa detta. Det första var att då användaren klickar på ett evenemang öppnas en ny webbläsare med applikationen för Evenemangskalendern upp med det evenemanget presenterat. Det andra alternativet var att en modal dialog öppnas med evenemanget istället. Det senare alternativet valdes framför allt för att det inte fanns något behov från användarna i detta skede att kunna komma åt funktioner som att redigera eller ta bort ett evenemang.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-feEY3bWI/AAAAAAAAAck/633Ax5iL6eM/s800/Picture%20117.jpg' />
<br><i>Figur 52: Aktivitet presenteras i en modal dialog</i>

För de målgrupper som behöver kunna hantera evenemang, exempelvis administratörer, har istället möjlighet från portleten i Portalen att öppna applikationen och utföra sina ändringar där.<br>
<br>
<h2>Aktiviteter direkt i användarens kalender</h2>
Utifrån intervjuer med användaren kom det fram att det är viktigt att se den egna kalendern när man skall avgöra huruvida man kan gå på aktiviteten eller inte. Av den orsaken placerades aktiviteter från Evenemangskalendern som alternativ att presenteras i användarens kalender. De aktiviteter som presenteras där är sådana som trycks ut till användaren. En annan fördel med detta är det är lättare att söka efter aktiviteter som sker längre fram i tiden, än då hon skulle klicka sig framåt bland aktiviteterna presenterade i portleten på startsidan.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fes55FHI/AAAAAAAAAco/IYM3bXv_y-c/s800/Picture%20118.jpg' />
<br><i>Figur 53: Aktiviteter direkt i användarens kalender</i>

<h2>Sökområde</h2>
Det finns ett behov från användarnas håll att ha möjlighet att söka efter aktiviteter som ligger utanför hennes profil och därmed inte trycks ut till henne. Portalens sökfunktion utökades därför med ett ytterligare sökområde, där användaren kan söka efter händelser direkt i Portalen, utan att behöva öppna Evenemangskalendern som en fristående applikation.<br>
<br>
<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-fe0MWXFI/AAAAAAAAAcs/nU4j859-Fa8/s800/Picture%20119.jpg' />
<br><i>Figur 54: Aktivitet presenteras i en modal dialog</i>


<br><br>
<b>Innehållsförteckning</b> (återfinns längst ner på varje sida)<br>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/DesignriktlinjerAnvandargranssnitt'>Introduktion till interaktionsdesign för portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortalramverket?ts=1251969346&updated=GenerellaDesignriktlinjerPortalramverket'>Generella designriktlinjer: Portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerIntegreradApplikation?ts=1251969401&updated=GenerellaDesignriktlinjerIntegreradApplikation'>Generella designriktlinjer: Integrerad applikation</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerModalDialog?ts=1251969439&updated=GenerellaDesignriktlinjerModalDialog'>Generella designriktlinjer: Modal dialog</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortlet?ts=1251969476&updated=GenerellaDesignriktlinjerPortlet'>Generella designriktlinjer: Portlet</a>
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
</li><li>Bilaga 3: Exempelprojekt evenemangskalendern