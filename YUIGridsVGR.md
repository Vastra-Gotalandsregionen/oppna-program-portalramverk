Yahoo!s CSS-ramverk YUI Grids CSS (/css/grids-min.css) används för att skapa de olika layouterna. Det är ett flexibelt ramverk som ger möjlighet att skapa mängder med olika layouter. Här begränsar vi oss dock till fem varianter, beskrivna nedan.

Mallfilerna består av HTML-strukturen som krävs samt dummyinnehåll för att man ska se hur de olika blocken renderas på sidan. Allt som börjar med `<!-- Inserted by portlet -->` och avslutas med `<!-- /Inserted by portlet -->` kommer att ersättas med portlets.

Den HTML som ändras finns i `div#bd`. Både struktur och klasser kan skilja sig åt.

Exempel på respektive layout med realistiskt innehåll finns i den uppladdade källkoden i katalogen "prototyp". Ladda den genom att öppna filen `index.html` i en webbläsare. Ange sedan ett användarnamn, till exempel "annie", för att "logga in".

## Layout 1: Enspalt, fullbredd ##

### Mall ###
layout-1.html

### Exempel i prototyp ###
Inga för närvarande

### HTML-struktur ###
```
<!-- 100% bredd med 10px horisontell marginal, en fullbred spalt. -->
div#doc3.yui-t7
    div.hd
    div.bd
        div.yui-b
            CONTENT
```

## Layout 2: 2-spalt, högerspalt har fast bredd ##

### Mall ###
layout-2.html

### Exempel i prototyp ###

  * profil\_annie/mitt\_jobb/bevakningar.html
  * profil\_annie/hitta/index.html

### HTML-struktur ###
```
<!-- 100% bredd med 10px horisontell marginal. Högerspalt 240px fast bredd. -->
div#doc3.yui-t5
    div.hd
    div.bd
        div#yui-main
            div.yui-b
                CONTENT
        div.yui-b
            CONTENT
```

## Layout 3: 2 + 1 spalter, huvudspalterna har samma bredd, högerspalt har fast bredd ##

### Mall ###
layout-3.html

### Exempel i prototyp ###

  * profil\_annie/index.html

### HTML-struktur ###
```
<!-- 100% bredd med 10px horisontell marginal. Högerspalt 240px fast bredd. -->
div#doc3.yui-t5
    div.hd
    div.bd
        div#yui-main
            div.yui-b
                div.yui-g
                    div.yui-u first
                        CONTENT
                    div.yui-u
                        CONTENT
        div.yui-b
            CONTENT
```

## Layout 4: 2 + 1 spalter, huvudspalter har en rad + 2 lika breda underspalter, högerspalt har fast bredd ##

### Mall ###
layout-4.html

### Exempel i prototyp ###

  * profil\_annie/mitt\_jobb/index.html

### HTML-struktur ###
```
<!-- 100% bredd med 10px horisontell marginal. Högerspalt 240px fast bredd. -->
div#doc3.yui-t5
    div.hd
    div.bd
        div#yui-main
            div.yui-b
                CONTENT
                div.yui-g
                    div.yui-u first
                        CONTENT
                    div.yui-u
                        CONTENT
        div.yui-b
            CONTENT
```

## Layout 5: 2 + 1 spalter, huvudspalternas bredder är fördelade 1/4 + 3/4, högerspalt har fast bredd ##

### Mall ###
layout-5.html

### Exempel i prototyp ###

  * profil\_annie/hitta/traffar.html

### HTML-struktur ###
```
<!-- 100% bredd med 10px horisontell marginal. Högerspalt 240px fast bredd. -->
div#doc3.yui-t5
    div.hd
    div.bd
        div#yui-main
            div.yui-b
                CONTENT
                div.yui-gf
                    div.yui-u first
                        CONTENT
                    div.yui-u
                        CONTENT
        div.yui-b
            CONTENT
```