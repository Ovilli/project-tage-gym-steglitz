# 🟨 JS-Challenge – das Lernspiel

Ein Browser-Spiel, mit dem man **JavaScript** lernt. **29 Level** in zwei Teilen,
die immer schwieriger werden – schaffst du alle?

- **Teil 1 – Konsole (Level 1–19):** Es gibt eine **Ziel-Ausgabe** und **deine
  Ausgabe**. Schreibe JavaScript, bis deine Ausgabe genauso aussieht wie das Ziel.
- **Teil 2 – Buttons (Level 20–29):** Baue **Knöpfe, die etwas TUN**. Dein Knopf
  wird echt und klickbar – klick ihn selbst an!

Geübt werden u. a.: `console.log`, Variablen (`let`), Rechnen, Text verbinden,
Template-Strings, Vergleiche, `if/else`, Funktionen, Arrays, Objekte,
Schleifen (`for`, `for…of`) und dann DOM: `document.getElementById`,
`.textContent`, `.onclick`, Klick-Zähler und `.style.background`.

Das Spiel sieht aus wie ein echter Code-Editor (VS Code): Vollbild-Fenster mit
Tabs, Zeilennummern, bunter Syntax-Hervorhebung und Statusleiste. Es ist der
JavaScript-Zwilling der CSS-Challenge.

## So funktioniert das Prüfen

- **Konsolen-Level:** Dein Code läuft und die **Ausgabe** (alles per
  `console.log`) wird mit der Ziel-Ausgabe verglichen – Zeile für Zeile.
- **Button-Level:** Das Spiel klickt deinen Knopf im Hintergrund und schaut, ob
  danach das Richtige passiert (Text/Farbe stimmt).

Wie du zum Ergebnis kommst, ist immer egal – nur die Wirkung zählt.

## Damit es hängen bleibt

- **Lernkarte:** Nach jedem gelösten Level erscheint ein Merksatz, der erklärt,
  was du gerade gelernt hast. Du gehst nicht sofort weiter – erst lesen, dann **weiter**.
- **Wiederholung:** Jedes Konzept wird mehrmals geübt (mit anderen Werten),
  und 🔁-Level mischen frühere Themen.
- **📚 Spickzettel** (oben rechts): sammelt alles Gelernte mit Beispiel-Code zum Nachschlagen.
- **Autocomplete:** Vorschläge beim Tippen (↑/↓ wählen, Tab/Enter übernehmen).

## So startest du

1. Öffne den Ordner `js-challenge` im Editor.
2. Starte **Live Server** (»Go Live«) – oder öffne `index.html` doppelt im Browser.
3. Spielen! Tippe dein JavaScript und klick auf **▶ Ausführen**.

## Bedienung

- **▶ Ausführen** (oder **Strg+Enter**) – führt deinen Code aus und vergleicht die Ausgabe.
- **◀ Zurück / Weiter ▶** – zwischen den Leveln blättern (vorwärts erst, wenn gelöst).
- **Lösung** – setzt die richtige Antwort ein, falls du nicht weiterkommst.
- **Leeren** – macht das Feld wieder frei.
- **Tab** – rückt ein (zwei Leerzeichen).
- **⛶** (oben rechts) – echtes Vollbild an/aus.

## Eigene Aufgaben bauen

In `script.js` ganz oben steht die Liste `levels`. Jedes Level hat:

- `typ` – `"konsole"` oder `"button"`,
- `grad` – Schwierigkeit (1–4 Sterne),
- `konzept` / `titel` / `text` / `tipp` – was angezeigt wird,
- `ziel` – der geheime Lösungs-Code,
- `lernen` / `syntax` – Merksatz und Beispiel für den Spickzettel.

Button-Level haben zusätzlich `html` (Start-Elemente), `klicks` (wie oft der
Test klickt) und `lies` (liest den Zustand zum Vergleichen).

Kopier ein Level, ändere den `ziel`-Code – fertig ist deine eigene Aufgabe! 🚀
