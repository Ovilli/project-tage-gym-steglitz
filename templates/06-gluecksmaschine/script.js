// ============================================================
//  DEINE NACHRICHTEN
//  Das ist eine Liste. Jede Zeile in den [ ] ist eine Nachricht.
//  Schreib eigene rein! Witze, Komplimente, Wahrsagungen ...
// ============================================================
const nachrichten = [
  "Du bist heute richtig cool! 😎",
  "Bald passiert etwas Schönes. 🍀",
  "Iss mehr Pizza! 🍕",
  "Du wirst ein Meister im Programmieren. 💻",
  "Lach jemanden an – das wirkt magisch. 😄",
  "Heute ist dein Glückstag! 🌈",
  "Trau dich, etwas Neues auszuprobieren. 🚀"
];

// ============================================================
//  AB HIER MACHT DIE MASCHINE IHRE ARBEIT
//  (das musst du nicht ändern)
// ============================================================

const knopf   = document.getElementById("knopf");
const anzeige = document.getElementById("anzeige");

knopf.addEventListener("click", function() {
  // Eine zufällige Nachricht aus der Liste auswählen
  const zufall = Math.floor(Math.random() * nachrichten.length);
  anzeige.textContent = nachrichten[zufall];
});
