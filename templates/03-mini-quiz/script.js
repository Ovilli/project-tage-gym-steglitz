// ============================================================
//  DEINE FRAGEN
//  Ändere die Fragen, Antworten und welche richtig ist!
//  "richtig" ist die Nummer der richtigen Antwort: 0, 1, 2 oder 3
//  (die erste Antwort ist 0, die zweite 1, usw.)
// ============================================================
const fragen = [
  {
    frage: "Welcher Planet ist der Sonne am nächsten?",
    antworten: ["Erde", "Merkur", "Mars", "Jupiter"],
    richtig: 1
  },
  {
    frage: "Wie viele Beine hat eine Spinne?",
    antworten: ["6", "8", "10", "4"],
    richtig: 1
  },
  {
    frage: "Welche Farbe ergibt Blau + Gelb?",
    antworten: ["Grün", "Lila", "Orange", "Braun"],
    richtig: 0
  }
];

// ============================================================
//  AB HIER FUNKTIONIERT DAS QUIZ – DAS MUSST DU NICHT ÄNDERN
// ============================================================

let aktuelle = 0;   // welche Frage gerade dran ist
let punkte = 0;     // wie viele Punkte gesammelt wurden

const frageEl     = document.getElementById("frage");
const antwortenEl = document.getElementById("antworten");
const punkteEl    = document.getElementById("punkte");
const weiterBtn   = document.getElementById("weiter");

// Zeigt die aktuelle Frage und ihre Antwort-Knöpfe an
function zeigeFrage() {
  const f = fragen[aktuelle];
  frageEl.textContent = f.frage;
  antwortenEl.innerHTML = "";   // alte Knöpfe entfernen

  f.antworten.forEach(function(text, nummer) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("click", function() {
      pruefeAntwort(nummer);
    });
    antwortenEl.appendChild(btn);
  });
}

// Prüft, ob die geklickte Antwort richtig war
function pruefeAntwort(gewaehlt) {
  const f = fragen[aktuelle];
  const knoepfe = antwortenEl.querySelectorAll("button");

  knoepfe.forEach(function(btn, nummer) {
    btn.disabled = true;   // nach dem Klick sperren
    if (nummer === f.richtig) {
      btn.classList.add("richtig");
    } else if (nummer === gewaehlt) {
      btn.classList.add("falsch");
    }
  });

  if (gewaehlt === f.richtig) {
    punkte = punkte + 1;
    punkteEl.textContent = "Punkte: " + punkte;
  }
}

// Knopf "Nächste Frage"
weiterBtn.addEventListener("click", function() {
  aktuelle = aktuelle + 1;

  if (aktuelle < fragen.length) {
    zeigeFrage();
  } else {
    // Quiz vorbei
    frageEl.textContent = "Fertig! 🎉";
    antwortenEl.innerHTML = "";
    punkteEl.textContent = "Endstand: " + punkte + " von " + fragen.length;
    weiterBtn.style.display = "none";
  }
});

// Erste Frage anzeigen, wenn die Seite lädt
zeigeFrage();
