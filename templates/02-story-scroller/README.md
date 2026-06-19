# Template 2: Story-Scroller  ★★☆

Eine Geschichte (oder Fan-Seite über dein Lieblingsthema), bei der jede Szene den
ganzen Bildschirm füllt. Beim Scrollen rasten die Szenen ein und der Text blendet
sich sanft ein. **HTML & CSS** – mit ein bisschen CSS-Animation.

## So startest du

1. Öffne den Ordner `02-story-scroller`.
2. Starte **Live Server** (»Go Live« unten rechts).
3. Scrolle im Browser nach unten – jede Szene erscheint einzeln.
4. Ändere etwas in `index.html`, speichere und schau zu!

## Welche Dateien gibt es?

- `index.html` – die **Szenen** deiner Geschichte (jede `<section>` = eine Szene).
- `styles.css` – Farben, Schrift und die **Animationen**.

## Das kannst du jetzt tun

### Leicht ★
- [ ] Ändere den **Titel** und erfinde deine eigene Geschichte oder ein Thema (Spiel, Tier, Sport, Band).
- [ ] Schreibe die **Kapitel-Texte** um.
- [ ] Ändere die **Emojis** (🐲 → was du willst).

### Mittel ★★
- [ ] Ändere die **Farben** der Szenen in `styles.css` (die `linear-gradient`-Zeilen).
- [ ] Füge eine **neue Szene** hinzu: kopiere eine `<section>` und gib ihr die Klasse `szene-6`. Vergiss nicht, im CSS eine Farbe für `.szene-6` zu ergänzen.
- [ ] Mach die Geschichte länger (mehr Kapitel).

### Schwer ★★★
- [ ] Füge in eine Szene ein **Bild** ein (`<img src="...">`) und gestalte es im CSS.
- [ ] Ändere die **Einblende-Animation**: lass den Text z. B. von der Seite kommen (`translateX` statt `translateY`).
- [ ] Mach den Pfeil schneller oder langsamer (die Zahl bei `huepfen`).

### Bonus ⭐
- [ ] Frag die KI: »Wie kann ich Hintergrundbilder statt Farben für die Szenen nehmen?«

## Wie funktioniert das »Einrasten«?

In `styles.css` sorgt `scroll-snap-type` (beim `body`) zusammen mit `scroll-snap-align`
(bei jeder `.szene`) dafür, dass beim Scrollen immer eine ganze Szene zu sehen ist.
Probier ruhig aus, die Zeile zu löschen – dann siehst du den Unterschied!
