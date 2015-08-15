# Generella designriktlinjer: Beteenden och funktioner #

Följande kapitel beskriver de beteenden och funktioner för applikationer som utvecklas för och inom Portalramverket.

## Hågkomst ##
Det är fördelaktigt om applikationen har hågkomst för var och vad användaren gjort tidigare. Det objekt som användaren tittat på senast bör visas, när hon återgår till den delen av applikationen. Exempelvis när användaren bläddrar bort från e-post-applikationen och återkommer senare, så bör det aktiva meddelandet vid lämnandet vara aktivt när hon återkommer. Observera att detta är en riktlinje som måste värderas från fall till fall, det är inte ett mönster som alltid är bra att följa.

## Tillbaka ##
Då användaren vill gå tillbaka i applikationen skall hon kunna använda sig av tillbaka-knappen i webbläsaren.
Vid de tillfällen då det är det enda sättet att ta sig tillbaka på, är det fördelaktigt att förtydliga detta via en ikon och länk som visar att användaren kan ta sig tillbaka ett steg. Nedan finns en bild på de två sättet att navigera tillbaka.

<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-fWsrjv6I/AAAAAAAAAa0/YWY2SeBZkOc/s800/Picture%2087.jpg' />
<br><i>Figur 19: Knappar för att backa ett steg</i>

<h2>Kopiera och klistra in</h2>
För samtliga fritextfält behöver det gå att använda kopiera (CTRL+C) och klistra in (CTRL+V). Detta för att underlätta för användaren när hon fyller i information. Exempelvis behöver hon kunna kopiera och klistra in information mellan två fält i applikationen, men även kunna klistra in kopierad text i applikationen.<br>
<br>
<h2>Tool-tip</h2>
I Portalen finns det en tool-tip funktion där användaren, genom att föra muspekaren över objektet, exempelvis kan bli informerad om vad objektet betyder och vad hon kan göra med det. Om, när och hur tool-tip funktionen skall implementeras är ännu inte beslutat.<br>
<br>
<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-fWhHWQ-I/AAAAAAAAAa4/IF89HIWQkcc/Picture%2088.jpg' />
<br><i>Figur 20: Tool-tip funktion</i>

<h2>Sök</h2>
Följande avsnitt presenterar de beteenden och funktioner som gäller för sök. Det finns två olika typer av sök, en generell och ett funktionsspecifikt sök.<br>
<br>
<h3>Funktionsspecifikt sök</h3>
Det funktionsspecifika söket söker endast bland den information som finns presenteras i just denna applikation.<br>
<br>
<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-fW-Jqx8I/AAAAAAAAAa8/0LSwMWN03Kc/s800/Picture%2089.jpg' />
<br><i>Figur 21: Exempel på funktionsspecifikt sök under ”Mina kontakter”</i>

<h3>Generellt sök</h3>
Den generella sökfunktionen söker på i stort sett all information som finns att tillgå i applikationen och även i vissa fall från andra källor.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fXcBqQfI/AAAAAAAAAbA/nv7YOsiv758/s800/Picture%2090.jpg' />
<br><i>Figur 22: Generell sök</i>

<h3>Sökområden</h3>
Eftersom ett generellt sök kan bestå av information som kommer från ett flertal olika källor och applikationer, skall sökområden användas för att underlätta för användaren då hon vill hitta något. Sökresultatet presenteras sedan utifrån de olika sökområdena. Användaren kan klicka runt bland områdena för att hitta just den information som hon letar efter.<br>
De olika sökområdena kan med fördel presenteras genomgående i en hierarkisk struktur till vänster i gränssnittet. Det område som användaren har valt skall markeras på ett tydligt sätt. Vidare bör antalet träffar presenteras inom en parates efter vare sökområde.<br>
Notera att en och samma träff kan finnas i mer än ett sökområde.<br>
Det har utförts en del utredningar för att hitta sökområden som användare av Portalen är i behov av. Det är ännu inte fastställt vilka sökområdena är, nedan presenteras ett förslag på vilka områdena skulle kunna vara:<br>
<ul><li>Dokument<br>
</li><li>Person<br>
</li><li>Kommande aktiviteter<br>
</li><li>Webbsida<br>
<ul><li>Interna<br>
</li><li>Externa<br>
</li></ul></li><li>Nyheter<br>
<ul><li>Interna<br>
</li><li>Externa<br>
</li><li>Pressmeddelanden<br>
</li></ul></li><li>Organisation<br>
</li><li>Diskussionsgrupp</li></ul>

<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fXRiazfI/AAAAAAAAAbE/W2j63CCAWMo/Picture%2091.jpg' />
<br><i>Figur 23: Presentation av sökområde</i>

Ovanstående är som tidigare nämnts ett förslag på vilka sökområdena skulle kunna vara. En tanke är att användaren kanske skulle vilja kunna bland sina e-postmeddelanden.<br>
<h3>Tolkning av sökord</h3>
Exakt hur sökorden tolkas är ännu inte helt klart, utan en mer korrekt beskrivning skall göras.<br>
<br>
<h3>Detaljerat sök</h3>
Följande stycke beskriver hur den detaljerade sökfunktionen skall fungera. Den detaljerade sökfunktionen innehåller ett antal statiska kategorier som användaren kan använda sig av för att snäva av sin sökning.  Vilka kategorierna är beror på vilket sökområde användaren har valt.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fX6bgU-I/AAAAAAAAAbI/jjjnhZdPnos/s800/Picture%2092.jpg' />
<br><i>Figur 24: Detaljerad sök</i>


<br><br>
<b>Innehållsförteckning</b> (återfinns längst ner på varje sida)<br>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/DesignriktlinjerAnvandargranssnitt'>Introduktion till interaktionsdesign för portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortalramverket?ts=1251969346&updated=GenerellaDesignriktlinjerPortalramverket'>Generella designriktlinjer: Portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerIntegreradApplikation?ts=1251969401&updated=GenerellaDesignriktlinjerIntegreradApplikation'>Generella designriktlinjer: Integrerad applikation</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerModalDialog?ts=1251969439&updated=GenerellaDesignriktlinjerModalDialog'>Generella designriktlinjer: Modal dialog</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortlet?ts=1251969476&updated=GenerellaDesignriktlinjerPortlet'>Generella designriktlinjer: Portlet</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerFristandeApplikation?ts=1251969550&updated=GenerellaDesignriktlinjerFristandeApplikation'>Generella designriktlinjer: Fristående applikation</a>
</li><li>Generella designriktlinjer: Beteenden och funktioner<br>
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