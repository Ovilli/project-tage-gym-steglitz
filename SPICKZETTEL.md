# 🧀 Spickzettel – alles Wichtige auf einer Seite

Zum Ausdrucken und neben den Computer legen! Hier findest du die wichtigsten
Bausteine schnell. Mehr Erklärungen stehen in `anleitung/course.md`.

---

## HTML – der Inhalt

```html
<h1>Große Überschrift</h1>
<h2>Kleinere Überschrift</h2>
<p>Ein Absatz mit Text.</p>

<ul>                          <!-- Liste mit Punkten -->
  <li>Erster Punkt</li>
  <li>Zweiter Punkt</li>
</ul>

<a href="https://...">Link-Text</a>     <!-- Link -->
<img src="bild.jpg" alt="Beschreibung"> <!-- Bild -->
<button>Klick mich</button>             <!-- Knopf -->
```

**Merke:** Fast jeder Tag kommt im Doppelpack: `<p>` … `</p>` (auf und zu).

---

## CSS – das Aussehen

In `styles.css`. So sieht eine Regel aus:

```css
selektor {
  eigenschaft: wert;
}
```

Die wichtigsten Eigenschaften:

```css
color: red;                 /* Schriftfarbe */
background-color: gold;     /* Hintergrundfarbe */
font-size: 24px;            /* Schriftgröße */
text-align: center;         /* Text mittig */
padding: 1rem;              /* Abstand innen */
margin: 1rem;               /* Abstand außen */
border-radius: 12px;        /* runde Ecken */
```

**Farb-Tipp:** Neben einem Farbcode wie `#6c5ce7` ist ein kleines Quadrat – klick
drauf und wähle eine Farbe mit der Maus!

---

## JavaScript – die Action

In `script.js`. Die wichtigsten Bausteine:

```js
let zahl = 0;                         // etwas merken (Variable)
let name = "Mia";

console.log("Test");                  // Nachricht in die Konsole (F12)
alert("Hallo!");                      // kleines Fenster

// Ein Element auf der Seite finden (braucht id="..." im HTML)
let knopf = document.getElementById("knopf");

// Auf einen Klick reagieren
knopf.addEventListener("click", function() {
  knopf.textContent = "Geklickt!";    // Text ändern
});

// Entscheidung
if (zahl === 10) {
  alert("Genau 10!");
} else {
  alert("Nicht 10.");
}

// Zufall
let farben = ["red", "blue", "gold"];
let zufall = farben[Math.floor(Math.random() * farben.length)];
```

---

## Die wichtigsten Tasten ⌨️

| Taste | Was passiert |
|-------|--------------|
| `Strg` + `S` | **Speichern** (immer nach jeder Änderung!) |
| `F5` | Browser neu laden |
| `F12` | Entwickler-Konsole öffnen (Fehler ansehen) |

---

## Der Kreislauf 🔁

**Ändern → Speichern (Strg+S) → Im Browser schauen → wiederholen.**

Klappt was nicht? Schau in `HILFE.md`. 🛠️
