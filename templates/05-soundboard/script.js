// ============================================================
//  DEINE KNÖPFE
//  Jeder Knopf hat ein Emoji und einen Ton (eine Zahl).
//  Kleine Zahl = tiefer Ton.  Große Zahl = hoher Ton.
//  Probier andere Emojis und andere Zahlen aus!
// ============================================================
const knoepfe = [
  { emoji: "🐱", ton: 262 },   // C
  { emoji: "🐶", ton: 294 },   // D
  { emoji: "🦊", ton: 330 },   // E
  { emoji: "🐸", ton: 349 },   // F
  { emoji: "🐵", ton: 392 },   // G
  { emoji: "🦁", ton: 440 },   // A
  { emoji: "🐮", ton: 494 },   // H
  { emoji: "🐷", ton: 523 }    // hohes C
];

// ============================================================
//  AB HIER MACHT DAS SOUNDBOARD SEINE ARBEIT
//  (das musst du nicht verstehen – aber du darfst reinschauen!)
// ============================================================

const board   = document.getElementById("board");
const anzeige = document.getElementById("anzeige");

// Baut für jeden Eintrag aus der Liste einen Knopf
knoepfe.forEach(function(knopf) {
  const btn = document.createElement("button");
  btn.textContent = knopf.emoji;
  btn.addEventListener("click", function() {
    spieleTon(knopf.ton);          // Ton abspielen
    anzeige.textContent = knopf.emoji;  // großes Emoji zeigen
  });
  board.appendChild(btn);
});

// Spielt einen kurzen Piep-Ton mit der angegebenen Höhe
function spieleTon(hoehe) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oszillator = ctx.createOscillator();
  const lautstaerke = ctx.createGain();

  oszillator.frequency.value = hoehe;   // die Tonhöhe
  oszillator.type = "sine";             // weicher Ton (probier "square"!)

  oszillator.connect(lautstaerke);
  lautstaerke.connect(ctx.destination);

  oszillator.start();
  // Ton langsam leiser werden lassen, dann stoppen
  lautstaerke.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
  oszillator.stop(ctx.currentTime + 0.5);
}
