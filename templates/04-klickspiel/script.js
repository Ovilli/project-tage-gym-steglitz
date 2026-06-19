// ============================================================
//  EINSTELLUNGEN – hier darfst du herumspielen!
// ============================================================
const SPIELZEIT = 15;     // wie viele Sekunden das Spiel dauert
const ZIEL_EMOJI = "🎯";  // welches Emoji man anklicken muss

// ============================================================
//  AB HIER LÄUFT DAS SPIEL
// ============================================================

const feld     = document.getElementById("feld");
const zeitEl   = document.getElementById("zeit");
const punkteEl = document.getElementById("punkte");
const startBtn = document.getElementById("start");
const hinweis  = document.getElementById("hinweis");

let punkte = 0;
let zeit = SPIELZEIT;
let ziel = null;        // das anklickbare Element
let timer = null;       // der Sekunden-Zähler

// Setzt das Ziel an eine zufällige Stelle im Feld
function bewegeZiel() {
  const maxX = feld.clientWidth  - 60;
  const maxY = feld.clientHeight - 60;
  ziel.style.left = Math.floor(Math.random() * maxX) + "px";
  ziel.style.top  = Math.floor(Math.random() * maxY) + "px";
}

// Wird beim Klick auf das Ziel ausgeführt
function treffer() {
  punkte = punkte + 1;
  punkteEl.textContent = punkte;
  bewegeZiel();
}

// Startet ein neues Spiel
function starteSpiel() {
  // zurücksetzen
  punkte = 0;
  zeit = SPIELZEIT;
  punkteEl.textContent = punkte;
  zeitEl.textContent = zeit;
  if (hinweis) hinweis.style.display = "none";
  startBtn.disabled = true;

  // Ziel erstellen
  ziel = document.createElement("div");
  ziel.className = "ziel";
  ziel.textContent = ZIEL_EMOJI;
  ziel.addEventListener("click", treffer);
  feld.appendChild(ziel);
  bewegeZiel();

  // Countdown: jede Sekunde 1 abziehen
  timer = setInterval(function() {
    zeit = zeit - 1;
    zeitEl.textContent = zeit;
    if (zeit <= 0) {
      beendeSpiel();
    }
  }, 1000);
}

// Beendet das Spiel
function beendeSpiel() {
  clearInterval(timer);
  if (ziel) ziel.remove();
  startBtn.disabled = false;
  startBtn.textContent = "Nochmal!";

  const ergebnis = document.createElement("p");
  ergebnis.className = "hinweis";
  ergebnis.textContent = "Zeit um! Du hast " + punkte + " Punkte. 🎉";
  feld.appendChild(ergebnis);
}

startBtn.addEventListener("click", starteSpiel);
