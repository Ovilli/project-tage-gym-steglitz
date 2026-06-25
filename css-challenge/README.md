# 🎨 CSS-Challenge – das Lernspiel

Ein Browser-Spiel, mit dem man **CSS** lernt. Es gibt eine **Ziel-Box** und
**deine Box**. Deine Aufgabe: tippe das komplette CSS, bis deine Box genauso
aussieht wie das Ziel. **16 Level**, die immer schwieriger werden – schaffst du alle?

Geübt werden u. a.: `color`, `background`, `width`, `height`, `border-radius`,
`border`, `font-size`, `padding`, `opacity`, `font-weight`, `text-transform`,
`letter-spacing`, `transform`, `box-shadow` und `linear-gradient`.

Das Spiel sieht aus wie ein echter Code-Editor (VS Code): Vollbild-Fenster mit
Tabs, Zeilennummern, bunter Syntax-Hervorhebung und Statusleiste.

## Damit es hängen bleibt

- **Lernkarte:** Nach jedem gelösten Level erscheint ein Merksatz, der erklärt,
  was du gerade gelernt hast. Du gehst nicht sofort weiter – erst lesen, dann **weiter**.
- **Wiederholung:** Jedes Konzept wird mehrmals geübt (mit anderen Werten),
  und 🔁-Level mischen frühere Themen.
- **📚 Spickzettel** (oben rechts): sammelt alles Gelernte mit Beispiel-Code zum Nachschlagen.
- **Autocomplete:** Vorschläge beim Tippen (↑/↓ wählen, Tab/Enter übernehmen).

## So startest du

1. Öffne den Ordner `css-challenge` im Editor.
2. Starte **Live Server** (»Go Live«) – oder öffne `index.html` doppelt im Browser.
3. Spielen! Tippe das CSS (Eigenschaft **und** Wert) und klick auf **▶ Ausführen**.

## Bedienung

- **▶ Ausführen** (oder **Strg+Enter**) – prüft, ob deine Box dem Ziel entspricht.
- **◀ Zurück / Weiter ▶** – zwischen den Leveln blättern (vorwärts erst, wenn gelöst).
- **Lösung** – setzt die richtige Antwort ein, falls du nicht weiterkommst.
- **Leeren** – macht das Feld wieder frei.
- **⛶** (oben rechts) – echtes Vollbild an/aus.

Während du tippst, ändert sich deine Box **live** mit – einfach ausprobieren!

## Eigene Aufgaben bauen

In `script.js` ganz oben steht die Liste `levels`. Jedes Level hat:

- `grad` – Schwierigkeit (1–4 Sterne),
- `titel` / `text` / `tipp` – was angezeigt wird,
- `ziel` – das geheime CSS der Ziel-Box,
- `pruefe` – welche CSS-Eigenschaften verglichen werden.

Kopier ein Level, ändere die Werte – fertig ist deine eigene Aufgabe! 🚀
