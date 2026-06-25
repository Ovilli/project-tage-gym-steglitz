# Template 6: Glücksmaschine  ★☆☆

Ein Knopf, der bei jedem Klick eine zufällige Nachricht zeigt – Witz, Kompliment,
Wahrsagung oder was du willst. **HTML, CSS & JavaScript**, aber kinderleicht: du
änderst nur eine Liste von Sätzen.

## ⚡ Schnellstart (in 1 Minute ein Erfolg!)

1. Öffne den Ordner `06-gluecksmaschine` und starte **Live Server** (»Go Live«).
2. Öffne `script.js`. Ganz oben siehst du die Liste `nachrichten`.
3. Schreib einen eigenen Satz rein, z. B. `"Hallo Welt! 👋",` (Komma nicht vergessen!).
4. Speichern (Strg+S), im Browser den Knopf drücken – deine Nachricht erscheint! 🎉

## Welche Dateien gibt es?

- `index.html` – das Gerüst (Titel, Anzeige, Knopf).
- `styles.css` – das Aussehen (Farben, der 3D-Knopf).
- `script.js` – deine **Nachrichten-Liste** (ganz oben).

## Das kannst du jetzt tun

### Leicht ★
- [ ] Schreib **eigene Nachrichten** in die Liste `nachrichten`.
- [ ] Ändere den **Titel** und den **Knopf-Text** in `index.html`.
- [ ] Ändere die **Farbe** `--haupt` ganz oben in `styles.css`.

### Mittel ★★
- [ ] Mach daraus eine **Entscheidungs-Maschine** (»Pizza oder Pommes?«) – schreib Antworten rein.
- [ ] Mach daraus einen **Witze-Automaten** mit deinen Lieblingswitzen.
- [ ] Ändere die **Schriftgröße** der Nachricht (`font-size` bei `.anzeige`).

### Schwer ★★★ (gut für Klasse 7!)
- [ ] Lass bei jedem Klick auch eine **zufällige Farbe** erscheinen (Tipp: zweite Liste mit Farben + `document.body.style.backgroundColor`).
- [ ] Baue einen **zweiten Knopf** mit einer anderen Nachrichten-Liste.
- [ ] Zähle mit, **wie oft** schon geklickt wurde, und zeig die Zahl an.

### Bonus ⭐
- [ ] Frag die KI: »Wie kann ich die Nachricht beim Erscheinen langsam einblenden lassen (Animation)?«

## Wie funktioniert das? (kurz)

- Oben steht die **Liste** `nachrichten`.
- `Math.random()` würfelt eine Zufallszahl.
- Damit picken wir eine **zufällige** Nachricht aus der Liste und zeigen sie an.

Du musst das nicht alles verstehen – ändere einfach die Liste oben und probier es aus!
