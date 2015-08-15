# Bättre koll på jobbet - Kunskapsstöd, detaljdesign: Funktioner #

Det finns ett antal funktion i gränssnittet som specificeras nedan, exempelvis att läsa/skriva kommentarer, ranka innehåll eller att få vissa informationstyper utmärkta direkt i gränssnittet.


<br><br>
<b>Innehållsförteckning</b>
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
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/AnnuInteUtrett?ts=1251892328&updated=AnnuInteUtrett'>Tillämpade designriktlinjer, Bättre koll på jobbet: Ännu inte utrett</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/Kunskapsstod'>Tillämpade designriktlinjer, Bättre koll på jobbet - Kunskapsstöd: Detaljdesign</a>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodForstasidan'>Förstasidan</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodFritextsok'>Fritextsök</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodNavigeraOmrade'>Navigerina via område/hierarkisk navigering</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodAssociativ'>Associativ navigering</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodInnehallssidor'>Innehållssidor</a>
</li><li>Funktioner<br>
<ol><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodRanking'>Ranking</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodMarkUt'>Märkt ut</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodKommentarer'>Kommentarer</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodTaggar'>Etiketter</a>
</li></ol></li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/KunskapsstodEgnaInstallningar'>Egna inställningar</a>
</li></ol></li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga1Informationsstyrning'>Bilaga 1: Informationsstyrning</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga2AttUtforma'>Bilaga 2: Att utforma</a>
</li><li><a href='http://code.google.com/p/oppna-program-portalramverk/wiki/GenerellaDesignriktlinjerBilaga3ExempelProjektEvenemangskalendern'>Bilaga 3: Exempelprojekt evenemangskalendern</a>