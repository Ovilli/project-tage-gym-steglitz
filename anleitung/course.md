<div class='meta'>
image: html-css-logo.png
</div>

# Webseiten bauen in 3 Tagen – HTML, CSS & JavaScript

<p class='abstract'>
In diesem Kurs baust du in drei Tagen deine eigene Webseite. Am <strong>Tag 1</strong> lernst du <strong>HTML</strong> – damit gibst du deiner Seite Inhalt und Struktur. Am <strong>Tag 2</strong> kommt <strong>CSS</strong> dazu – damit wird deine Seite bunt und schön. Am <strong>Tag 3</strong> lernst du <strong>JavaScript</strong> – damit wird deine Seite lebendig und kann auf Klicks reagieren. Du musst noch nichts können. Wir fangen ganz von vorne an. Wichtig ist nur eins: <strong>einfach ausprobieren!</strong>
</p>

<div class='hint'>
So funktioniert der Kurs: Lies einen kleinen Abschnitt, tippe den Code selbst ab und schau im Browser, was passiert. Tippe den Code wirklich selbst – nicht kopieren! So lernst du viel schneller. Wenn etwas nicht klappt, ist das völlig normal. Fehler gehören dazu.
</div>

---

# Tag 1 – HTML: Der Inhalt deiner Seite

Immer wenn du im Internet eine Seite öffnest, schaust du dir eine HTML-Seite an. **HTML** ist die Sprache, mit der Webseiten gebaut werden. Mit HTML sagst du dem Browser: »Das hier ist eine Überschrift, das ist ein Bild, und das ist ein Link.« Heute baust du dein erstes Grundgerüst.

## Vorbereitung

Zuerst richten wir alles ein. Stelle sicher, dass kein Ordner geöffnet ist. Drücke dafür den Shortcut: <span class='key'>Strg</span><span class='key'>K</span> und danach <span class='key'>F</span>. Dein Fenster sieht jetzt ungefähr so aus:

<img class='full' src='fresh-start.webp'>

### Deine erste HTML-Datei anlegen

Klicke auf »New File« und bestätige mit <span class='key'>Enter</span>.

<img class='full' src='choose-filename.webp'>

Schreibe nun diesen Code in die Datei:

_include_file(template.html, html)

Du musst noch nicht verstehen, was jede Zeile bedeutet – das schauen wir uns gleich an. Dein Fenster sieht jetzt so aus (der weiße Punkt zeigt: noch nicht gespeichert):

<img class='full' src='unsaved.webp'>

Drücke jetzt <span class='key'>Strg</span><span class='key'>S</span> zum Speichern. Gib als Namen `website-test/index.html` ein.

<img class='full' src='enter-filename.webp'>

Der Ordner `website-test` gibt es noch nicht. Du wirst gefragt, ob er erstellt werden soll – bestätige mit <span class='key'>Enter</span>.

<img class='full' src='create-folder.webp'>

Öffne nun diesen Ordner: Drücke <span class='key'>Strg</span><span class='key'>K</span> und danach <span class='key'>Strg</span><span class='key'>O</span> und wähle `website-test` aus.

<img class='full' src='open-folder.webp'>

Links siehst du jetzt deine Dateien. Klicke auf `index.html`, um sie zu öffnen.

<img class='full' src='fresh-project.webp'>

### Live Server installieren

Damit du deine Seite immer sofort im Browser sehen kannst, brauchst du eine kleine Erweiterung. Öffne links die »Extensions«, suche nach »Live Server« und klicke auf »Install«.

<img class='full' src='live-server.webp'>

<img src='go-live.webp' class='r' style='width: 21em;'>

Wenn alles geklappt hat, siehst du unten rechts »Go Live«. Klicke darauf – ein neuer Tab im Browser öffnet sich mit deiner Seite. Sie ist noch leer, aber oben im Tab siehst du schon den Titel »Mein Titel«.

<div style='clear: both;'></div>

<div class='hint'>
Tipp: Stelle dein Programm und das Browser-Fenster nebeneinander. So siehst du jede Änderung sofort, sobald du speicherst.
</div>

## Wie ist eine HTML-Seite aufgebaut?

Schau dir den Code in `index.html` an. Du siehst lauter **Tags** in spitzen Klammern, zum Beispiel `<html>`, `<head>` und `<body>`. Fast jeder Tag kommt im Doppelpack: ein öffnender Tag `<body>` und ein schließender Tag `</body>` mit einem Schrägstrich.

Stell dir Tags wie Kisten vor: Was du in eine Kiste packst, gehört zusammen. Die wichtigsten Kisten sind:

- `<head>` – hier stehen Infos über die Seite (z. B. der Titel). Das sieht der Besucher nicht direkt.
- `<body>` – hier kommt alles rein, was man auf der Seite **sehen** soll.

### Den Titel ändern

Im `<title>`-Tag steht der Titel, der oben im Browser-Tab erscheint. Ändere ihn in »Meine erste Webseite« und speichere mit <span class='key'>Strg</span><span class='key'>S</span>. Schau in den Browser-Tab – der Titel hat sich geändert!

<div class='hint'>
Tipp: Manchmal aktualisiert sich die Vorschau nicht von allein. Drücke dann einfach <span class='key'>F5</span>, um die Seite neu zu laden.
</div>

### Überschriften und Absätze

Jetzt füllen wir die Seite mit Inhalt. Schreibe das hier in den `<body>`-Tag:

```html
<h1>Willkommen auf meiner Webseite!</h1>
<p>Das ist mein erster Absatz.</p>
```

Speichere und schau in den Browser. Der erste Text ist groß und fett – das ist eine **Überschrift** (`<h1>`). Der zweite Text ist ein normaler **Absatz** (`<p>`).

Es gibt Überschriften in verschiedenen Größen, von `<h1>` (am größten) bis `<h6>` (am kleinsten). Probier es aus!

```html
<h2>Eine kleinere Überschrift</h2>
<h3>Eine noch kleinere</h3>
```

### Listen

Listen sind super, wenn du mehrere Dinge aufzählen willst. Schreibe:

```html
<ul>
  <li>Pizza</li>
  <li>Pommes</li>
  <li>Eis</li>
</ul>
```

`<ul>` ist eine Liste mit Punkten. Jeder Punkt ist ein `<li>`. Willst du stattdessen Zahlen (1, 2, 3), nimm `<ol>` statt `<ul>`. Probier beides aus!

### Links

Das »H« in HTML steht für »Hypertext« – das Tolle daran sind **Links**. Damit springst du zu anderen Seiten. Dafür nutzt du den `<a>`-Tag:

```html
<p>
  Mehr Infos findest du <a href="https://de.wikipedia.org" target="_blank">in der Wikipedia</a>.
</p>
```

Bei `href` schreibst du die Adresse der Seite rein. `target="_blank"` sorgt dafür, dass der Link in einem **neuen Tab** aufgeht – so bleibt deine eigene Seite offen.

### Bilder

Bilder fügst du mit dem `<img>`-Tag ein:

```html
<img src="https://workspace.hackschule.de/cache/3afc860ed6aa2cb1-512.webp" alt="Hades in der Unterwelt">
```

- `src` ist die Adresse des Bildes.
- `alt` ist ein Text, der das Bild beschreibt. Den braucht man, falls das Bild mal nicht lädt – und für Menschen, die schlecht sehen und sich die Seite vorlesen lassen.

<div class='hint think'>
Ist dir etwas aufgefallen? Der <code>&lt;img&gt;</code>-Tag hat keinen schließenden Tag! Das ist eine Ausnahme – ein Bild ist nämlich »leer«, du packst ja nichts hinein.
</div>

### Tabellen

Eine Tabelle baust du aus mehreren Teilen: `<table>` ist die ganze Tabelle, `<tr>` ist eine Zeile, `<th>` ist eine Überschrift-Zelle und `<td>` ist eine normale Zelle.

```html
<table>
  <tr>
    <th>Tier</th>
    <th>Geräusch</th>
  </tr>
  <tr>
    <td>Hund</td>
    <td>Wuff</td>
  </tr>
  <tr>
    <td>Katze</td>
    <td>Miau</td>
  </tr>
</table>
```

## Deine erste Seite ist fertig!

Hier ist noch einmal alles zusammen:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Meine erste Webseite</title>
</head>

<body>
  <h1>Willkommen auf meiner Webseite!</h1>
  <p>Das ist mein erster Absatz.</p>

  <ul>
    <li>Pizza</li>
    <li>Pommes</li>
    <li>Eis</li>
  </ul>

  <p>
    Mehr Infos findest du <a href="https://de.wikipedia.org" target="_blank">in der Wikipedia</a>.
  </p>

  <img src="https://workspace.hackschule.de/cache/3afc860ed6aa2cb1-512.webp" alt="Hades in der Unterwelt">

  <table>
    <tr>
      <th>Tier</th>
      <th>Geräusch</th>
    </tr>
    <tr>
      <td>Hund</td>
      <td>Wuff</td>
    </tr>
  </table>
</body>
</html>
```

Schön ist das noch nicht – aber das ist okay! HTML kümmert sich nur um den **Inhalt**. Ums Aussehen kümmern wir uns morgen mit CSS.

<div class='hint'>
<strong>Mini-Aufgabe für Tag 1:</strong> Baue deine Seite über dein Lieblingsthema (Spiel, Tier, Sport, Band …). Sie soll mindestens enthalten: eine <code>&lt;h1&gt;</code>-Überschrift, zwei Absätze, eine Liste, einen Link und ein Bild. Sei kreativ!
</div>

---

# Tag 2 – CSS: Deine Seite wird schön

Gestern hast du den Inhalt gebaut. Heute machen wir ihn schön. Dafür gibt es **CSS**. Mit CSS bestimmst du Farben, Schriftarten, Abstände und das ganze Aussehen deiner Seite.

## CSS mit der Seite verbinden

Wir schreiben unser CSS in eine **eigene Datei**. Das ist ordentlich und übersichtlich. Lege eine neue Datei an und speichere sie als `styles.css`.

Damit die HTML-Seite weiß, dass es diese Datei gibt, fügst du diese Zeile in den `<head>`-Tag ein:

```html
<head>
  <title>Meine erste Webseite</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

## Die erste CSS-Regel

Schreibe in `styles.css`:

```css
body {
  font-family: Arial, sans-serif;
}
```

Speichere und schau in den Browser – die Schriftart hat sich geändert! So sieht jede CSS-Regel aus:

```
selektor {
  eigenschaft: wert;
}
```

- Der **Selektor** (hier `body`) sagt: »Für welches Element gilt das?« `body` heißt: für die ganze Seite.
- Dann kommen in den geschweiften Klammern `{ }` die **Eigenschaften** und ihre **Werte**. Nach jeder Zeile ein Semikolon `;`.

### Farben und Schriftgrößen

Probier mehrere Regeln aus:

```css
h1 {
  color: red;
}

p {
  font-size: 18px;
}
```

Die Überschrift wird rot, und die Absätze bekommen eine andere Schriftgröße.

<div class='hint'>
Tipp: Farben kannst du verschieden angeben – mit Namen wie <code>red</code> oder <code>blue</code>, oder als Code wie <code>#0d60ae</code>. Neben so einem Farbcode im Editor siehst du ein kleines Quadrat. Klick drauf und wähle deine Lieblingsfarbe mit der Maus aus!
</div>

### Links schöner machen

Links sind normalerweise blau und unterstrichen. Das ändern wir:

```css
a {
  color: #0d60ae;
  text-decoration: none;
}
```

Jetzt sind die Links nicht mehr unterstrichen. Mit einem kleinen Trick lassen wir die Unterstreichung wieder erscheinen, **wenn die Maus drüberfährt**:

```css
a {
  color: #0d60ae;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
```

`:hover` heißt »wenn die Maus drüber schwebt«. Probier es im Browser aus – fahr mit der Maus über den Link!

### Bilder schöner machen

Wir geben dem Bild eine eigene Zeile, einen weißen Rand, runde Ecken und einen leichten Schatten:

```css
img {
  display: block;
  padding: 1em;
  margin: 1em 0;
  background-color: white;
  border-radius: 0.5em;
  box-shadow: 0.1em 0.1em 0.5em rgba(0, 0, 0, 0.25);
}
```

Was machen diese Zeilen?

- `display: block;` – das Bild bekommt eine eigene Zeile.
- `padding: 1em;` – Abstand **innen**, damit man den weißen Rand sieht.
- `margin: 1em 0;` – Abstand **außen**, oben und unten.
- `border-radius: 0.5em;` – runde Ecken.
- `box-shadow: …` – ein leichter Schatten.

<div class='hint'>
<code>padding</code> ist der Abstand <strong>innen</strong> (zwischen Rand und Inhalt), <code>margin</code> ist der Abstand <strong>außen</strong> (zu anderen Elementen). Das nennt man das <a href='https://developer.mozilla.org/de/docs/Learn_web_development/Core/Styling_basics/Box_model'>Box-Modell</a>. Stell dir jedes Element als Geschenk vor: <code>padding</code> ist das Füllmaterial in der Schachtel, <code>margin</code> ist der Platz zwischen den Schachteln.
</div>

### Tabellen schöner machen

```css
table {
  border-collapse: collapse;

  th, td {
    padding: 0.5em 1em;
    background-color: #fff;
    border: 1px solid #ccc;
  }

  th {
    font-weight: bold;
    text-align: left;
    background-color: #eee;
  }
}
```

`th, td` mit Komma heißt: »gilt für `th` **und** `td`«. So sparst du dir, die Regel zweimal zu schreiben.

### Damit es auf dem Handy gut aussieht

Schau dir deine Seite mal auf dem Handy an – sie ist viel zu klein. Füge diese Zeile in den `<head>` ein, dann passt sie sich an:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

<div class='hint'>
<strong>Mini-Aufgabe für Tag 2:</strong> Mach deine Seite von gestern schön! Gib ihr eine Hintergrundfarbe (<code>background-color</code> beim <code>body</code>), eine schöne Schriftfarbe und gestalte Überschriften, Links und Bilder. Probier ruhig viele Farben aus.
</div>

---

# Tag 3 – JavaScript: Deine Seite wird lebendig

HTML ist der Inhalt, CSS ist das Aussehen – und **JavaScript** ist die Action! Mit JavaScript reagiert deine Seite auf den Besucher: Sie kann auf Klicks reagieren, Texte ändern, rechnen und vieles mehr. JavaScript ist eine echte **Programmiersprache**.

## JavaScript mit der Seite verbinden

JavaScript schreibst du in den `<script>`-Tag. Wir setzen ihn ganz unten, kurz vor `</body>`:

```html
  <script src="script.js"></script>
</body>
```

Lege jetzt eine neue Datei an und speichere sie als `script.js`.

## Dein erstes JavaScript

Schreibe in `script.js`:

```javascript
alert("Hallo! Das ist JavaScript.");
```

Speichere und lade die Seite neu. Es springt ein kleines Fenster auf! `alert` zeigt eine Nachricht an.

Es gibt auch eine versteckte Nachricht nur für dich als Entwickler: die **Konsole**. Schreibe:

```javascript
console.log("Das sieht man in der Konsole.");
```

Öffne im Browser die Entwickler-Werkzeuge mit <span class='key'>F12</span> und klicke auf »Console«. Dort steht deine Nachricht. `console.log` ist super, um zu prüfen, ob dein Code funktioniert.

## Variablen – Dinge merken

Eine **Variable** ist wie eine Schublade mit einem Namen. Du legst etwas hinein und holst es später wieder raus:

```javascript
let name = "Mia";
let alter = 12;

console.log("Hallo " + name);
console.log("Du bist " + alter + " Jahre alt.");
```

Mit `+` klebst du Texte zusammen. Variablen können Texte (in Anführungszeichen) oder Zahlen (ohne Anführungszeichen) speichern.

## Auf einen Klick reagieren

Jetzt wird es spannend: Wir lassen einen **Knopf** etwas tun. Füge zuerst in deinem HTML einen Button hinzu:

```html
<button id="meinKnopf">Klick mich!</button>
```

`id="meinKnopf"` ist wie ein Name für den Knopf, damit JavaScript ihn findet. Schreibe nun in `script.js`:

```javascript
let knopf = document.getElementById("meinKnopf");

knopf.addEventListener("click", function() {
  alert("Du hast geklickt!");
});
```

Was passiert hier?

- `document.getElementById("meinKnopf")` sucht den Knopf auf der Seite.
- `addEventListener("click", …)` heißt: »Wenn jemand klickt, mach das hier.«

Klick auf den Knopf – die Nachricht erscheint!

## Text auf der Seite ändern

Mit JavaScript kannst du den Inhalt der Seite verändern. Baue in dein HTML eine Überschrift mit einer id:

```html
<h1 id="titel">Klick den Knopf!</h1>
<button id="meinKnopf">Klick mich!</button>
```

Und ändere das Skript so:

```javascript
let knopf = document.getElementById("meinKnopf");
let titel = document.getElementById("titel");

knopf.addEventListener("click", function() {
  titel.textContent = "Du hast es geschafft! 🎉";
});
```

`textContent` ist der Text eines Elements. Wenn du ihn neu setzt, ändert sich die Seite sofort. Klick den Knopf und sieh zu!

## Ein Klick-Zähler

Jetzt bauen wir etwas Cooles: einen Zähler, der bei jedem Klick um eins hochzählt.

```html
<h1 id="anzeige">0</h1>
<button id="plus">+1</button>
```

```javascript
let anzeige = document.getElementById("anzeige");
let plus = document.getElementById("plus");
let zahl = 0;

plus.addEventListener("click", function() {
  zahl = zahl + 1;
  anzeige.textContent = zahl;
});
```

Jeder Klick erhöht `zahl` um 1 und zeigt sie an. Wie weit kommst du?

## Entscheidungen mit `if`

Der Computer kann auch **entscheiden**. Das geht mit `if` (»wenn«). Lass uns ein winziges Quiz bauen:

```html
<button id="frage">Was ist 7 + 5?</button>
<p id="ergebnis"></p>
```

```javascript
let frage = document.getElementById("frage");
let ergebnis = document.getElementById("ergebnis");

frage.addEventListener("click", function() {
  let antwort = prompt("Was ist 7 + 5?");

  if (antwort === "12") {
    ergebnis.textContent = "Richtig! 🎉";
  } else {
    ergebnis.textContent = "Leider falsch. Versuch es nochmal!";
  }
});
```

- `prompt` fragt den Besucher etwas und merkt sich die Antwort.
- `if (…)` prüft eine Bedingung. Stimmt sie, läuft der erste Block. Stimmt sie nicht, läuft der `else`-Block.
- `===` heißt »ist gleich«.

## Eine Farbe per Klick ändern

Zum Schluss noch ein bunter Trick – wir ändern die Hintergrundfarbe:

```html
<button id="farbe">Farbe wechseln!</button>
```

```javascript
let farbeKnopf = document.getElementById("farbe");

farbeKnopf.addEventListener("click", function() {
  let farben = ["lightblue", "lightgreen", "pink", "gold", "orange"];
  let zufall = farben[Math.floor(Math.random() * farben.length)];
  document.body.style.backgroundColor = zufall;
});
```

`farben` ist eine **Liste** (man sagt auch *Array*) mit mehreren Farben. `Math.random()` würfelt eine Zufallszahl, und wir picken damit eine zufällige Farbe heraus. Jeder Klick = neue Farbe!

<div class='hint'>
<strong>Mini-Aufgabe für Tag 3:</strong> Baue deine eigene interaktive Idee! Ideen: ein Quiz mit mehreren Fragen, ein Knopf, der ein Bild austauscht, ein Begrüßungs-Text, der den Namen des Besuchers nutzt (mit <code>prompt</code>), oder ein Zähler mit einem »-1«-Knopf dazu.
</div>

## Deine Seite veröffentlichen

Du hast jetzt eine echte Webseite gebaut – Glückwunsch! Wenn du möchtest, kannst du sie kostenlos ins Internet stellen, unter einer eigenen Adresse wie `meineseite.hackschule.de`. Schreib dafür einfach eine E-Mail an <a href="mailto:specht@gymnasiumsteglitz.de">specht@gymnasiumsteglitz.de</a>.

## Wie geht es weiter?

Du kannst jetzt HTML, CSS und JavaScript – die drei Bausteine fast jeder Webseite im Internet! Wenn du noch tiefer einsteigen willst, schau dir die <a href="https://developer.mozilla.org/de/docs/Learn">MDN Web Docs</a> an. Dort lernst du Schritt für Schritt noch mehr.

Am wichtigsten ist: **Bau weiter eigene Sachen!** Jede Webseite, die du baust, macht dich besser. Viel Spaß! 🚀
