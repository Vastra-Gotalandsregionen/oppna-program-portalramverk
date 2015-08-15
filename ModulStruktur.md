# Modul/portletstruktur #
När man skapar en modul i ramverket behöver man se till att den portlet som renderar HTML-koden gör det enligt en bestämd struktur. Elementet `.module-content` kan i princip innehålla vad som helst som är tillåtert enligt HTML-specifikationen.

När det gäller rubriken kan den antingen vara länkad eller olänkad.

Moduler har ingen angiven bredd eller höjd. Bredden anpassar sig efter det element de ligger i och höjden efter modulens innehåll.

## Modul utan länkad rubrik ##
En modul utan länkad rubrik består av en rubrik (som ska vara nivå `h2`) och ett innehåll enligt följande struktur:

```
<div class="module">
    <h2>Modulnamn</h2>
    <div class="module-content">
        <p>Lorem ipsum dolor sit amet…</p>
    </div>
</div>
```

## Modul med länkad rubrik ##

En modul kan också ha en länkad rubrik. Tanken är att alla länkade rubriker ska ha en ikon, så därför gör CSS-koden att länken har utrymme för det. För att ange vilken ikon en modul använder behöver modulen ha ett `id`:

```
<div id="module-news" class="module">
    <h2><a href="verksamhetsnytt.html">Verksamhetsnytt</a></h2>
    <div class="module-content">
        <h3>Underrubrik</h3>
        <p>Lorem ipsum dolor sit amet…</p>
        <ul>
            <li>En punktlista med några punkter i</li>
            <li>En punktlista med några punkter i</li>
            <li>En punktlista med några punkter i</li>
        </ul>
        <p>Duis aute irure dolor in reprehenderit…</p>
    </div>
</div>
```

Här är den CSS som styr ikonen:

```
#module-news h2 a {
    background:url(../i/icons/chart_organisation.png) no-repeat 0 50%;
}
```

Ikonen ska vara 16 x 16 pixlar stor.