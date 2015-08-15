# Generella designriktlinjer: Byggstenar #

Följande kapitel beskiver funktion och beteende för de byggstenar som kan vid utvecklande av en applikation.

## Meddelandedialog ##
För de funktioner som kräver att användaren bekräftar ett val öppnar en meddelandedialog. Ett exempel på detta är om användaren väljer att ta bort ett objekt av något slag, exempelvis en kontakt. Meddelanden skall utformas på ett förklarande och enkelt sätt till användaren.

<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-fYIwYZwI/AAAAAAAAAbM/9qzByY3fjVk/Picture%2093.jpg' />
<br><i>Figur 25: Exempel på meddelandedialog</i>

<h3>Felmeddelandedialog</h3>
Felmeddelanden skall vara korta och hjälpa användaren vidare. Det skall inte innehålla bisatser. Felmeddelandet bör i första meningen förklara vad som gått fel och i andra meningen presentera ett alternativ som är det mest sannolika som användaren önskar åstadkomma. Det meningsbärande ordet bör presenteras först, alternativt mycket tidigt i den första meningen.<br>
<br>
<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-fYdWbjOI/AAAAAAAAAbQ/L8Nlo2X_FRA/Picture%2094.jpg' />
<br><i>Figur 26: Exempel på felmeddelande</i>

<h2>Formulär</h2>
Då användaren skall lägga till eller redigera information skall hon kunna göra detta i ett formulär. Ett formulär består i stort sett av ett antal fält som användaren skall fylla i. Formulär presenteras i de flesta fallen i modala dialoger. Grundläggande principer om hur formulär skall utformas finns presenterade i <a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga2AttUtforma'>Bilaga 2 – Att utforma</a>. <br>

<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fYsO5gUI/AAAAAAAAAbU/uqhDjXTwSj4/s800/Picture%2095.jpg' />
<br><i>Figur 27: Exempel på formulär som användaren skall fylla i</i>

<h2>Wizard</h2>
I de fall då användaren behöver utföra en uppgift som består av ett antal strukturerade sekventiella delar skall en wizard användas. Varje steg bör vara enkla och innehålla en typ av deluppgift som användaren skall fylla i. Ett exempel på detta är de inställningar som användaren behöver göra om sig själv då hon öppnar Portalen första gången. Det är viktigt att bildväxlingarna mellan de olika stegen i wizarden är tydliga. Användaren bör även kunna navigera fram och tillbaka i den.<br>
<br>
<h2>Flikar</h2>
Då det finns behov att ha en navigering i en integrerad eller fristående applikation skall horisontella flikar användas i första hand. Behövs en sekundär navigering skall den utformas som en andra rad under de primära flikarna.<br>
<br>
<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-fY9OjhrI/AAAAAAAAAbY/GNkPM5ing30/Picture%2096.jpg' />
<br><i>Figur 28: Exempel på primära och sekundära flikar i Portalen</i>

<h2>Knappar och länkar</h2>
För att öppna upp något eller göra något kan knappar, ikon & länk samt bara länkar användas. Vilken av dem som skall användas vid vilket tillfälle beskrivs nedan.<br>
<br>
<h3>Länk</h3>
Det finns två sätt att använda den länk. En typ av länk är en genväg till externa webbsidor, dokument, applikationer och så vidare.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fZJlHtwI/AAAAAAAAAbc/D0_TT3sn_58/s800/Picture%2097.jpg' />
<br><i>Figur 29: Exempel på extern länk i applikationen:</i>

Den andra typen av länk är genväg till dokument, filer, nyheter och så vidare i den applikationen som länken finns i. Exempelvis kan det finnas en snabblista med nyheter på startsidan. Klickar användaren på någon av länkarna öppnas den del av applikationen där nyheten finns presenterad.<br>
<br>
<h3>Utseende</h3>

<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-oRDUC6QI/AAAAAAAAAdM/IJfVcBloRgw/uts1.png' />
<br><i>Figur 30: Exempel på två länkar</i>

En länk bör alltid svara blå och understruken, vilket är en förutsättning för att användaren snabbt skall uppfatta att det är en länk.<br>
Namnet på länken behöver vara beskrivande, så att användaren förstår vad den leder till, exempelvis rubriken på dokumentet eller namnet på applikationen.<br>
De länkar som leder till externa webbsidor eller applikationer bör indikera att det leder till något som ligger utanför applikationen. Efter länknamnet skall då ”extern länk” skrivas ut.<br>
Leder länken till en fil med ett visst filformat som krävs för att öppna länken, kan detta stå i grått bakom länknamnet.<br>
<br>
<h3>Ikon & Länk</h3>

<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-fZWeTEoI/AAAAAAAAAbg/UpxQE83-qxc/s800/Picture%2099.jpg' />
<br><i>Figur 31: Exempel på ikon & länk i applikationen</i>

Sammanfattat kan man säga att en ikon & länk används istället för en knapp direkt i applikationen. En ikon & länk tar användaren vidare i webbapplikationen, såsom exempelvis att öppna upp något i en modal dialog eller gå till en specifik plats i applikationen. Handlar det om något mer avancerat, exempelvis att utföra en sökning eller liknande, används en knapp.<br>
<br>
<h3>Utseende</h3>

<br><img src='http://lh5.ggpht.com/_mHREyZKezxI/Sp-n_usHKqI/AAAAAAAAAdI/YCjzKoYGXXY/uts.png' />
<br><i>Figur 32: Utseende på länk</i>

En länk bör alltid svara blå och understruken, vilket är en förutsättning för att användaren snabbt skall uppfatta att det är en länk.<br>
Ikonen står alltid till vänster om länken. Mer information om vilka ikoner som kan användas finns under Ikoner under <a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerGrafiskForm'>avsnitt Grafisk form</a>.<br>
Namnet på länken behöver vara beskrivande, så att användaren förstår vad den leder till, exempelvis rubriken på dokumentet eller namnet på applikationen.<br>
<br>
<h3>Knapp</h3>

<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-fZVjd-tI/AAAAAAAAAbk/4y6nlUwjcUA/Picture%20101.jpg' />
<br><i>Figur 33: Exempel på knapp i applikationen</i>

En ikon & länk används direkt i applikationen för att exempelvis öppna upp en dialog. En knapp används aldrig direkt i webbapplikationen, med undantag när det kommer till sök.<br>
När det gäller modala dialoger används alltid en knapp istället för ikon & länk. Något annat som påvisar att en knapp borde användas är då det handlar om mer avancerade funktioner än att ta användaren vidare i gränssnittet, såsom exempelvis att spara ändringar.<br>
Om knappen skall vara låst tills användaren fyllt i det hon skall fylla i kan knappen gråmarkeras, fast detta bara om användaren förstår varför. Vidare skall aldrig en knapps text eller funktion ändras, utan de skall vara konstanta. Är det så att det ändå behövs ha ytterligare en funktion eller liknande, borde en ny knapp läggas till stället.<br>
Nedan presenteras några exempel på generella knappar samt när de skall användas i gränssnittet.<br>
<br>
<table><thead><th> <b>Knapptext</b> </th><th> <b>Användning</b> </th></thead><tbody>
<tr><td> OK               </td><td> Används för att spara ändringar i en modal dialog </td></tr>
<tr><td> Spara och stäng  </td><td> Sparar och stänger nuvarande modal dialog. Sparadialog om ändringar har gjorts.</td></tr>
<tr><td>Avbryt            </td><td> Avslutar en dialog utan att spara ändringar.</td></tr>
<tr><td> Ja               </td><td> Används i meddelandedialoger för att indikera jakande svar </td></tr>
<tr><td> Nej              </td><td> Används i meddelandedialoger för att indikera nekande svar </td></tr>
<tr><td> Ta bort          </td><td> Tar bort ett objekt </td></tr>
<tr><td> Sök              </td><td> Används både i modala dialoger och direkt i en applikation för at starta en |sökning. Kombineras alltid med ett fritextfält till vänster om knappen. </td></tr>
<tr><td> Gå               </td><td> Använd direkt i applikationer då användaren valt något ur en lista och vill öppna upp valt objekt, exempelvis genvägar. </td></tr>
<tr><td> Uppdatera        </td><td> Knapp för att uppdatera. </td></tr>
<i>Tabell 1: Ikoner i gränssnitt</i></tbody></table>

<h2>Hantera objekt</h2>
Följande avsnitt beskriver hur användaren skall kunna hantera olika objekt, såsom exempelvis en kontakt, en uppgift och så vidare.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-fZoGB8lI/AAAAAAAAAbo/746PiR4tRR4/s800/Picture%20102.jpg' />
<br><i>Figur 34: Exempel på objekt som skall gå att hantera</i>

<h3>Lägg till</h3>
En länk & ikon för att lägga till ett objekt skall finnas direkt i applikationen. Då användaren klickar på den skall en modal dialog öppnas där användaren kan fylla i uppgifter för att lägga till det nya objektet.<br>
När användaren valt att stänga ner och spara dialogen skall det nyskapade objektet finnas med bland de tidigare skapade objektet.<br>
<br>
<h3>Redigera</h3>
Användaren skall även kunna redigera objekt. Är det så att ”Redigera” inte lämpar sig som benämning, kan även termen ”Ändra” användas.<br>
Presenteras objekten i en lista skall en ikon och länk för att redigera användas för respektive objekt. Klickar användaren på länken öppnas samma modala fönster upp som när användaren skapat ett nytt objekt. Skillnaden är att de uppgifter som finns om objektet redan är förifyllda.<br>
När användaren gjort sina ändringar och klickar på ”Spara och stäng”, stängs den modala dialogen ner och objektet uppdateras.<br>
<br>
<h3>Ta bort</h3>
Användaren skall kunna ta bort ett objekt. Står objekten i en lista skall en ikon och länk för att ta bort presenteras för respektive objekt. Klickar användaren på länken presenteras en meddelandedialog (se stycke 8.1) som ber användaren bekräfta huruvida hon vill ta bort objektet eller inte. Klickar användaren på ”Ja” tas objektet bort, medan om användaren klickar på ”Nej” tas objektet inte bort.<br>
<br>
<h2>Listor</h2>
När sökfunktion behövs och när det räcker med sortering och filtrering. Hur en filtreringslista ser ut (med rader och rubriker) och hur en träfflista ser ut i söken finns presenterat i nedanstående stycken. Grundläggande principer om hur olika listor skall utformas finns presenterade i <a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga2AttUtforma'>Bilaga 2 – Att utforma</a>.<br>
<br>
<h3>Sorterbara listor</h3>
I en sorterbar lista består en post av en rad. Varannan rad i listan skall markeras ut med den ljusblåa färgen, se avsnitt Färg under [<a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerGrafiskForm'>avsnitt Grafisk form</a> för att underlätta för användaren när hon läser av poster i listan.<br>
En rad innehåller flera kolumner, vilket specificerar posten ytterligare. Användaren kan sortera posterna i listan genom att klicka på rubriken för en kolumn. Det kolumnhuvud som bestämmer sorteringsordningen skall markeras med en pil till höger om namnet, se bild nedan.<br>
<br>
<br><img src='http://lh4.ggpht.com/_mHREyZKezxI/Sp-faD9YKZI/AAAAAAAAAbs/0nuxskfR5PE/s800/Picture%20103.jpg' />
<br><i>Figur 35: Exempel på sorterbar lista</i>

<h3>Träfflistor</h3>
I en träfflista, tillskillnad från sorterbara listor, kan en post bestå av flera rader. Vill användaren sortera den typen av lista kan hon göra detta genom att välja sorteringsalternativ via uteslutande val.<br>
<br>
<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-fabdx7vI/AAAAAAAAAbw/GiEm7dSEEME/s800/Picture%20104.jpg' />
<br><i>Figur 36: Exempel på träfflista</i>

I vissa fall finns det behov att utöka information direkt i träfflistan för att snabbt ge detaljer om objektet till användaren, utan att hon behöver öppna upp det. Ett exempel på detta är träfflistan då användaren har gjort en sökning. Nedan följer ett exempel.<br>
Användaren kan utöka träffen genom att föra muspekaren över ett specifikt objekt och sedan välja att visa mer (se figur nedan). Användaren kan sedan dölja informationen och så vidare.<br>
<br>
<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-faqE0YSI/AAAAAAAAAb0/62QZrJ4ttrM/s800/Picture%20105.jpg' />
<br><i>Figur 37: Exempel träfflista som går att utöka (sökresultat)</i>

<h2>Rullist</h2>
Det skall bara finnas en rullist och det är den som finns längst till höger i Portalen. Om all information som finns i den aktuella vyn av Portalen bör rullisten vara inaktiv.<br>
Rullisten skall hela tiden spegla hur mycket information som visas.<br>
Inga horisontella rullister skall finnas. Behövs en horisontell rullist bör länkar med ”Föregående” och ”Nästa” användas istället.<br>
<br>
<h2>Trädvy</h2>
Mer än tre nivåer skall inte finnas i en trädvy. Användaren skall kunna expandera/kollapsa innehållet i en trädvy genom att klicka på en ikon över ett plustecken respektive minustecken.<br>
<br>
<h2>Radioknappar och checkbox</h2>
Radioknappar kan användas när användaren har 2-8 valmöjligheter och då bara ett val är giltigt åt gången. Medan checkboxar bör användas då det finns 1-8 valmöjligheter och 0, 1 eller flera alternativ är giltiga åt gången. Antalet val bör inte överstiga åtta för varken radioknappar och checkboxar, då det finns risk att det blir allt för svårt för användaren att få en överblick av vilka val som finns.<br>
Vidare bör elementen placeras vertikalt i gränssnittet, detta för att hjälpa användarens avläsning av dem.<br>
<br>
<br><img src='http://lh3.ggpht.com/_mHREyZKezxI/Sp-pT88gGAI/AAAAAAAAAdQ/E4kZUQseSdg/cb.png' />
<br><i>Figur 38: Exempel på användning av checkbox</i>

<br><img src='http://lh6.ggpht.com/_mHREyZKezxI/Sp-pUMFudcI/AAAAAAAAAdU/pv1hhTMKI1w/rb.png' />
<br><i>Figur 39: Exempel på användning av radioknappar</i>





<br><br>
<b>Innehållsförteckning</b> (återfinns längst ner på varje sida)<br>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/DesignriktlinjerAnvandargranssnitt'>Introduktion till interaktionsdesign för portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortalramverket?ts=1251969346&updated=GenerellaDesignriktlinjerPortalramverket'>Generella designriktlinjer: Portalramverket</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerIntegreradApplikation?ts=1251969401&updated=GenerellaDesignriktlinjerIntegreradApplikation'>Generella designriktlinjer: Integrerad applikation</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerModalDialog?ts=1251969439&updated=GenerellaDesignriktlinjerModalDialog'>Generella designriktlinjer: Modal dialog</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerPortlet?ts=1251969476&updated=GenerellaDesignriktlinjerPortlet'>Generella designriktlinjer: Portlet</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerFristandeApplikation?ts=1251969550&updated=GenerellaDesignriktlinjerFristandeApplikation'>Generella designriktlinjer: Fristående applikation</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBeteendeoFunktioner?ts=1251969604&updated=GenerellaDesignriktlinjerBeteendeoFunktioner'>Generella designriktlinjer: Beteenden och funktioner</a>
</li><li>Generella designriktlinjer: Byggstenar<br>
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