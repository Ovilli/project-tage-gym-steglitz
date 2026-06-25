# 🛠️ Hilfe, es ist kaputt!

Keine Panik – **Fehler sind völlig normal!** Jeder Programmierer macht sie, jeden Tag.
Hier findest du die häufigsten Probleme und wie du sie löst. Geh die Liste von oben
nach unten durch.

---

## ⭐ Der wichtigste Trick zuerst

**Hast du gespeichert?** Drück `Strg` + `S`. Wenn im Tab oben ein **weißer Punkt**
statt dem `×` ist, ist die Datei *nicht* gespeichert – dann sieht der Browser deine
Änderung nicht.

Danach: **`F5`** im Browser drücken, um neu zu laden.

> 90 % aller Probleme sind damit schon weg. 😉

---

## „Auf der Seite ändert sich nichts!"

1. **Gespeichert?** `Strg` + `S` (siehe oben).
2. **Browser neu laden:** `F5`.
3. **Richtige Datei?** Änderst du wirklich die Datei, die offen ist?
4. Läuft **Live Server** noch? Unten muss »Go Live« bzw. ein Port-Knopf zu sehen sein.

---

## „Die Seite ist plötzlich ganz weiß / kaputt!"

Meistens ein kleiner Tippfehler. Häufige Ursachen:

- Ein **Tag nicht geschlossen**: zu jedem `<p>` gehört ein `</p>`.
- Ein **Anführungszeichen vergessen**: `<a href="seite.html">` – beide `"` müssen da sein.
- In CSS eine **geschweifte Klammer** `{` oder `}` vergessen.

**Tipp:** Mach deine letzte Änderung rückgängig mit `Strg` + `Z` – dann läuft es
wieder, und du siehst, woran es lag.

---

## „Mein JavaScript macht nichts!"

1. **Konsole öffnen:** `F12` drücken, auf »Console« klicken. Steht da eine rote
   Fehlermeldung? Die sagt dir oft die **Zeile** mit dem Fehler.
2. Häufige Fehler:
   - **Strichpunkt / Komma vergessen** am Zeilenende.
   - In Listen `[ ... ]` zwischen den Einträgen muss ein **Komma** stehen.
   - `id` im HTML und im `getElementById("...")` müssen **genau gleich** geschrieben sein
     (Groß-/Kleinschreibung zählt!).
   - **Anführungszeichen** um Texte vergessen: `"Hallo"` ist Text, `Hallo` ohne ist ein Fehler.

---

## „Mein Bild wird nicht angezeigt!"

- Stimmt der **Dateiname** in `src="..."` genau? (Groß-/Kleinschreibung!)
- Liegt das Bild im **richtigen Ordner**?
- Bei einem Bild aus dem Internet: ist die **ganze Adresse** (mit `https://`) drin?

---

## Immer noch kaputt? 🤖

- **Frag die KI** und sag genau, was du willst – z. B.:
  »Mein Knopf soll beim Klick die Farbe ändern, aber es passiert nichts. Hier ist mein Code: …«
- **Zeig die Fehlermeldung** aus der Konsole (`F12`) mit. Die hilft am meisten.
- **Frag den Betreuer** – dafür ist er da!

Fehler zu finden gehört zum Programmieren dazu. Wenn du es schaffst, bist du ein
echter Profi geworden. 💪
