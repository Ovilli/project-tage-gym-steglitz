# Template 3: Mini-Quiz  ★★★

Ein klickbares Quiz mit Fragen, richtigen/falschen Antworten und Punktezähler.
**HTML, CSS & JavaScript** – das JavaScript ist schon fertig verdrahtet, du
veränderst vor allem die Fragen.

## So startest du

1. Öffne den Ordner `03-mini-quiz`.
2. Starte **Live Server** (»Go Live«).
3. Klick eine Antwort an – richtig wird grün, falsch wird rot.
4. Mit »Nächste Frage« geht es weiter.

## Welche Dateien gibt es?

- `index.html` – das Gerüst (Frage, Antworten, Punkte, Knopf).
- `styles.css` – das Aussehen.
- `script.js` – die **Logik** und deine **Fragen** (ganz oben in der Datei).

## Das kannst du jetzt tun

### Leicht ★
- [ ] Ändere in `script.js` die **drei Fragen** in eigene (z. B. über dein Lieblingsthema).
- [ ] Pass auf: `richtig` ist die **Nummer** der richtigen Antwort. Die erste Antwort ist `0`, die zweite `1`, die dritte `2`, die vierte `3`.

### Mittel ★★
- [ ] Füge **weitere Fragen** hinzu (kopiere einen `{ ... }`-Block und vergiss das Komma nicht).
- [ ] Ändere die **Farben** im `styles.css` (z. B. den Hintergrund-Verlauf).
- [ ] Schreibe den Titel »🧠 Mini-Quiz« in deinen eigenen Quiz-Namen um (in `index.html`).

### Schwer ★★★
- [ ] Lass am Ende eine **Bewertung** anzeigen: bei voller Punktzahl »Perfekt!«, sonst »Gut gemacht!«. (Tipp: `if` am Ende von `script.js`.)
- [ ] Gib jeder Frage **vier** statt drei Antworten.

### Bonus ⭐
- [ ] Frag die KI: »Wie kann ich einen Neustart-Knopf einbauen, der das Quiz wieder von vorne beginnt?«

## Wie funktioniert das JavaScript? (kurz)

- Die Fragen stehen oben als **Liste** (`fragen`).
- `zeigeFrage()` baut für jede Antwort einen **Knopf**.
- `pruefeAntwort()` schaut, ob du richtig geklickt hast, und zählt **Punkte**.

Du musst das nicht komplett verstehen – ändere einfach die Fragen oben und probier es aus!
