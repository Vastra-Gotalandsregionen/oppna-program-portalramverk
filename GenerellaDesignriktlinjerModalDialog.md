# Generella designriktlinjer: Modal dialog #

## Kvalifikationer ##
En modal dialog skall inte användas som ram för att skapa en hel applikation, utan det handlar snarare om delar av en applikation. En modal dialog skall användas vid följande tillfällen:
  * Då mer detaljerad information presenteras om något som finns i ett externt system. Ett exempel på detta är listan med ”Mina uppgifter” där ett antal poster presenteras. Posterna kan härstamma från fristående applikationer och vill användaren läsa mer om en sådan post öppnas den detaljerade informationen i en modal dialog. Dialogen kan ge möjlighet att öppna den fulla applikationen, men behöver inte ge den möjligheten.
  * När man vill uppmärksamma användaren att hon kommer att påverka en delmängd information i applikationen, såsom exempelvis att lägga till eller redigera information. Den modala dialogen skall då utformas som ett formulär, se formulär i [avsnitt Byggstenar](http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerByggstenar).
Är det så att informationen som skall få plats i en modal dialog inte får plats i en dialog utan flera behovs, är det en indikation på att det snarare skall utformas som en integrerad applikation.

## Placering i Portalen ##
En modal dialog lägger sig ovanpå gränssnittet för Portalen. Den modala dialogen skall i vanliga fall centreras på utrymmet. Samtliga funktioner som inte har med den modala dialogen skall bli gråade. Användaren skall kunna flytta på dialogen för att kunna läsa information som är dold.

## Storlek och utseende ##

<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-fUfssNVI/AAAAAAAAAaM/_EpCWBzMSgk/s800/Picture%2077.jpg' />
<br><i>Figur 9: Modal dialog i en applikation</i>

Den modala dialogens storlek varierar beroende på hur mycket information som behöver presenteras. Dock är den maximala bredden på en modal dialog 680 pixlar. Får inte det tänkta innehåller plats bör dialogen växta på höjden, snarare än bredden. Dock bör inte en dialog vara högre än 550 pixlar, det vill säga inte vara så pass hög att den täcker de globala funktionerna.<br>
<br>
<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-fUQopvWI/AAAAAAAAAaQ/6R9NxTrtqT4/s800/Picture%2078.jpg' />
<br><i>Figur 10: Utseende på modala dialoger</i>

En modal dialog innehåller alltid följande:<br>
<ul><li>Titel – Text som beskriver vad den modala dialogen syftar till eller namnet på applikationen.<br>
</li><li>Stäng – Uppe i högra hörnet finns ett kryss, som användaren kan bruka för att stänga ner den modala dialogen.<br>
</li><li>Innehåll – Presentation av information, som i vissa fall kan vara redigerbar.<br>
</li><li>Knappar – Samtliga knappar skall placeras högerjusterade, längst i den modala dialogen<br>
</li><li>Det är alltid möjligt att även stänga dialogen med en av nedanstående funktionsknappar. En dialog kan, men behöver inte ha båda dessa.<br>
<ul><li>Stäng – Då information presenteras kan användaren stänga ner den modala dialogen genom att klicka på knappen ”Stäng”. Eftersom dialogen endast presenteras information och användaren inte kan redigera informationen behövs ingen funktion för att spara. Knappen placeras alltid längst ner till höger i dialogen.<br>
</li><li>Avbryt – Då användaren väljer att lägga till eller redigera något kan hon avbryta detta med ”Avbryt”. De ändringar som användaren har gjort sparas inte. Är det så det kan leda till att användaren begår ett misstag som är svårt att reparera behövs en bekräftelse från användaren att hon verkligen vill stänga ner utan att spara ändringarna (för mer information se stycke 8.1). Knappen placeras alltid längst ner till höger i dialogen.</li></ul></li></ul>

<h2>Navigation</h2>
Det skall inte behövas någon navigering i en modal dialog. Är det så att det som presenteras i en modal dialog är i behov av navigering bör innehållet delas upp på flera dialoger istället eller eventuellt som en wizard se avsnit Wizard under <a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerByggstenar'>Byggstenar</a>. En annan lösning kan också vara att den utformas som en integrerad applikation se <a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerIntegreradApplikation'>avsnitt Integerad applikation</a>.<br>
Eftersom en modal dialog tillåts växa på höjden för att få plats med all information så behövs ingen rullist i dialogen. Är den modala dialogen så hög att den inte får plats på skärmytan, används rullisten som finns i Portalen eller i den applikation som initierat dialogen.<br>
<br>
<br>
<br><br>
<b>Innehållsförteckning</b> (återfinns längst ner på varje sida)<br>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/DesignriktlinjerAnvandargranssnitt'>Introduktion till interaktionsdesign för portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortalramverket?ts=1251969346&updated=GenerellaDesignriktlinjerPortalramverket'>Generella designriktlinjer: Portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerIntegreradApplikation?ts=1251969401&updated=GenerellaDesignriktlinjerIntegreradApplikation'>Generella designriktlinjer: Integrerad applikation</a>
</li><li>Generella designriktlinjer: Modal dialog<br>
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
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga3ExempelProjektEvenemangskalendern'>Bilaga 3: Exempelprojekt evenemangskalendern</a>