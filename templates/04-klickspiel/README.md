# Template 4: Klickspiel  ★★★

Ein kleines Reaktionsspiel: Ein Ziel 🎯 springt herum, du musst es so oft wie möglich
anklicken, bevor die Zeit abläuft. **HTML, CSS & JavaScript** – das anspruchsvollste
Template, mit Timer und Punktezähler.

## ⚡ Schnellstart (in 1 Minute ein Erfolg!)

1. Öffne den Ordner `04-klickspiel` und starte **Live Server** (»Go Live«).
2. Öffne `script.js`. Ganz oben ändere `ZIEL_EMOJI` von `"🎯"` in z. B. `"🍕"`. Speichern (Strg+S).
3. Im Browser auf **Start** klicken und dein Emoji jagen! 🎉

## So startest du

1. Öffne den Ordner `04-klickspiel`.
2. Starte **Live Server** (»Go Live«).
3. Klick auf **Start** und dann so schnell du kannst auf das 🎯.

## Welche Dateien gibt es?

- `index.html` – Leiste (Zeit, Punkte, Start) und das Spielfeld.
- `styles.css` – das Aussehen.
- `script.js` – die **Spiel-Logik** (oben gibt es Einstellungen zum Ändern).

## Das kannst du jetzt tun

### Leicht ★
- [ ] Ändere oben in `script.js` die `SPIELZEIT` (z. B. auf 10 oder 30 Sekunden).
- [ ] Ändere das `ZIEL_EMOJI` in etwas anderes (z. B. 🐭 🍕 👾).
- [ ] Ändere den Titel und den Hinweistext in `index.html`.

### Mittel ★★
- [ ] Ändere die **Farben** im `styles.css` (Hintergrund, Leiste, Start-Knopf).
- [ ] Mach das Ziel **größer oder kleiner** (`font-size` bei `.ziel`).
- [ ] Ändere den Text des Start-Knopfes.

### Schwer ★★★
- [ ] Baue ein **»schlechtes« Ziel** ein (z. B. 💣), das Punkte **abzieht**, wenn man es trifft. (Tipp: ein zweites Element wie `ziel` erstellen, aber bei Klick `punkte - 1`.)
- [ ] Lass das Ziel **von allein** alle 2 Sekunden die Position wechseln, auch ohne Klick. (Tipp: `setInterval` + `bewegeZiel`.)
- [ ] Speichere den **Highscore** und zeige »Neuer Rekord!« an.

### Bonus ⭐
- [ ] Frag die KI: »Wie kann ich einen Sound abspielen, wenn man trifft?«

## Wie funktioniert das JavaScript? (kurz)

- `starteSpiel()` setzt alles zurück und erstellt das Ziel.
- `bewegeZiel()` setzt das Ziel an eine **zufällige** Stelle (`Math.random`).
- `setInterval` ist ein **Timer**, der jede Sekunde die Zeit herunterzählt.
- Bei 0 ruft das Spiel `beendeSpiel()` auf und zeigt deine Punkte.

Du musst das nicht alles verstehen – ändere die Einstellungen oben und probier es aus!
