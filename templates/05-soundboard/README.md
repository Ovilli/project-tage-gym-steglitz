# Template 5: Soundboard  ★☆☆

Ein Gitter aus Knöpfen, die Töne spielen. Klick drauf und mach Musik!
**HTML, CSS & JavaScript** – aber super einfach: du änderst nur eine Liste.

## ⚡ Schnellstart (in 1 Minute ein Erfolg!)

1. Öffne den Ordner `05-soundboard` und starte **Live Server** (»Go Live«).
2. Öffne `script.js`. Ganz oben siehst du die Liste `knoepfe`.
3. Tausche ein **Emoji** aus, z. B. `🐱` gegen `🦄`. Speichern (Strg+S).
4. Klick im Browser den Knopf – Ton + Emoji! 🎉 Geschafft.

## Welche Dateien gibt es?

- `index.html` – das Gerüst (Titel und der Platz für die Knöpfe).
- `styles.css` – das Aussehen (Farben, Knopf-Größe).
- `script.js` – deine **Knopf-Liste** (ganz oben) und die Ton-Technik.

## Das kannst du jetzt tun

### Leicht ★
- [ ] Tausche die **Emojis** in der Liste `knoepfe` gegen eigene aus.
- [ ] Ändere den **Titel** in `index.html` in deinen eigenen Namen.
- [ ] Ändere die **Farbe** `--haupt` ganz oben in `styles.css`.

### Mittel ★★
- [ ] Füge **neue Knöpfe** hinzu (kopiere eine `{ ... }`-Zeile, Komma nicht vergessen!).
- [ ] Ändere die **Töne**: kleine Zahl = tief, große Zahl = hoch. Bau eine Tonleiter.
- [ ] Ändere `grid-template-columns` in `styles.css` auf `repeat(3, 1fr)` – jetzt 3 Knöpfe pro Reihe.

### Schwer ★★★ (gut für Klasse 7!)
- [ ] Tausche in `script.js` bei `oszillator.type` das `"sine"` gegen `"square"` – anderer Sound!
- [ ] Lass den Knopf beim Klick die **Hintergrundfarbe** der Seite ändern (Tipp: `document.body.style.backgroundColor`).
- [ ] Gib jedem Knopf einen **eigenen Text** unter dem Emoji.

### Bonus ⭐
- [ ] Frag die KI: »Wie kann ich beim Drücken einer Taste auf der Tastatur einen Ton spielen?«

## Wie funktioniert das? (kurz)

- Oben steht die **Liste** `knoepfe` mit Emoji + Ton.
- `forEach` baut für jeden Eintrag einen **Knopf**.
- `spieleTon()` erzeugt den Piep – das ist die schwierige Technik, die musst du nicht verstehen.

Du musst das nicht alles verstehen – ändere einfach die Liste oben und probier es aus!
