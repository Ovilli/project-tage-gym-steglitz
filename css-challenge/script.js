// ============================================================
//  CSS-CHALLENGE  –  das Spiel
//
//  Damit das Gelernte HÄNGEN BLEIBT:
//   • Nach jedem Lösen kommt eine LERNKARTE, die erklärt,
//     was du gerade gelernt hast (du gehst nicht sofort weiter).
//   • Jedes Konzept wird MEHRMALS geübt (andere Werte).
//   • WIEDERHOLUNGS-Level mischen frühere Konzepte.
//   • Der SPICKZETTEL (oben rechts) sammelt alles Gelernte.
//
//  Felder pro Level:
//   grad   = Schwierigkeit (1–4)      konzept = Thema (für Spickzettel)
//   text   = Aufgabe                  tipp    = Hilfe (anderer Beispielwert)
//   ziel   = geheimes CSS             pruefe  = verglichene Eigenschaften
//   lernen = Merksatz (Lernkarte)     syntax  = Beispiel für den Spickzettel
// ============================================================

const levels = [
  { grad: 1, konzept: "color", titel: "Textfarbe",
    text: "Färbe den Text der Box. Ziel ist die Farbe tomato.",
    tipp: "Beispiel: <b>color: green;</b> — welche Farbe will das Ziel?",
    ziel: "color: tomato;", pruefe: ["color"],
    lernen: "<b>color</b> ändert die Textfarbe. Werte: Farbnamen (red), Hex (#ff0000) oder rgb(255,0,0).",
    syntax: "color: red;" },

  { grad: 1, konzept: "color", titel: "Textfarbe – nochmal",
    text: "Übung festigt! Mach den Text königsblau: royalblue.",
    tipp: "Du kennst es schon: <b>color: …;</b>",
    ziel: "color: royalblue;", pruefe: ["color"],
    lernen: "Gut gemerkt! <b>color</b> funktioniert mit jedem Farbnamen.",
    syntax: "color: royalblue;" },

  { grad: 1, konzept: "background", titel: "Hintergrundfarbe",
    text: "Gib der Box einen goldenen Hintergrund (gold).",
    tipp: "Beispiel: <b>background: skyblue;</b> — du brauchst eine andere Farbe.",
    ziel: "background: gold;", pruefe: ["background-color"],
    lernen: "<b>background</b> färbt den Hintergrund – gleiche Farbwerte wie bei color.",
    syntax: "background: gold;" },

  { grad: 1, konzept: "background", titel: "Hintergrund – nochmal",
    text: "Mach den Hintergrund jetzt hellgrün: lightgreen.",
    tipp: "Wieder: <b>background: …;</b>",
    ziel: "background: lightgreen;", pruefe: ["background-color"],
    lernen: "Sitzt! <b>background</b> + Farbname = fertig.",
    syntax: "background: lightgreen;" },

  { grad: 1, konzept: "", titel: "🔁 Wiederholung",
    text: "Beides zusammen: weißer Text (white) auf schwarzem Hintergrund (black).",
    tipp: "Zwei Zeilen: eine mit <b>color</b>, eine mit <b>background</b>.",
    ziel: "color: white;\nbackground: black;", pruefe: ["color", "background-color"],
    lernen: "Stark – du hast <b>color</b> und <b>background</b> kombiniert. Genau so baut man Webseiten." },

  { grad: 1, konzept: "width", titel: "Breite",
    text: "Mach die Box breiter: genau 160px.",
    tipp: "Beispiel: <b>width: 200px;</b> — welche Zahl passt?",
    ziel: "width: 160px;", pruefe: ["width"],
    lernen: "<b>width</b> ist die Breite. Einheiten: px (Pixel) oder % vom Platz.",
    syntax: "width: 160px;" },

  { grad: 1, konzept: "height", titel: "Höhe",
    text: "Mach die Box flacher: genau 50px hoch.",
    tipp: "Beispiel: <b>height: 120px;</b>",
    ziel: "height: 50px;", pruefe: ["height"],
    lernen: "<b>height</b> ist die Höhe – auch in px oder %.",
    syntax: "height: 50px;" },

  { grad: 1, konzept: "", titel: "🔁 Wiederholung",
    text: "Beides: 200px breit und 80px hoch.",
    tipp: "Eine Zeile <b>width</b>, eine Zeile <b>height</b>.",
    ziel: "width: 200px;\nheight: 80px;", pruefe: ["width", "height"],
    lernen: "Super – <b>width</b> und <b>height</b> bestimmen zusammen die Größe." },

  { grad: 2, konzept: "border-radius", titel: "Runde Ecken",
    text: "Mach aus der Box einen Kreis! Ecken-Rundung 50%.",
    tipp: "Beispiel: <b>border-radius: 12px;</b> — für einen Kreis brauchst du Prozent.",
    ziel: "border-radius: 50%;", pruefe: ["border-radius"],
    lernen: "<b>border-radius</b> rundet die Ecken. px = leichte Rundung, 50% = Kreis.",
    syntax: "border-radius: 50%;" },

  { grad: 2, konzept: "border", titel: "Rahmen",
    text: "Gib der Box einen Rahmen: 5px breit, solid und black.",
    tipp: "Aufbau (Breite Art Farbe): <b>border: 2px solid red;</b>",
    ziel: "border: 5px solid black;",
    pruefe: ["border-top-width", "border-top-style", "border-top-color"],
    lernen: "<b>border</b> ist der Rahmen: Breite, Art (solid/dashed/dotted) und Farbe.",
    syntax: "border: 5px solid black;" },

  { grad: 2, konzept: "padding", titel: "Innenabstand",
    text: "Gib der Box 24px Innenabstand (padding).",
    tipp: "Beispiel: <b>padding: 10px;</b>",
    ziel: "padding: 24px;", pruefe: ["padding-top"],
    lernen: "<b>padding</b> ist der Innenabstand – Platz zwischen Inhalt und Rand.",
    syntax: "padding: 24px;" },

  { grad: 2, konzept: "", titel: "🔁 Wiederholung",
    text: "Kombi: Ecken 20px rund UND ein Rahmen 3px dashed red.",
    tipp: "Eine Zeile <b>border-radius</b>, eine Zeile <b>border</b>.",
    ziel: "border-radius: 20px;\nborder: 3px dashed red;",
    pruefe: ["border-radius", "border-top-width", "border-top-style", "border-top-color"],
    lernen: "Klasse – <b>border-radius</b> + <b>border</b> ergeben gerahmte, runde Kästen." },

  { grad: 2, konzept: "font-size", titel: "Schriftgröße",
    text: "Mach die Schrift größer: genau 30px.",
    tipp: "Beispiel: <b>font-size: 12px;</b>",
    ziel: "font-size: 30px;", pruefe: ["font-size"],
    lernen: "<b>font-size</b> ist die Schriftgröße, meist in px.",
    syntax: "font-size: 30px;" },

  { grad: 3, konzept: "font-weight", titel: "Fett gedruckt",
    text: "Mach die Schrift fett (bold).",
    tipp: "Beispiel: <b>font-weight: normal;</b> — du willst aber fett.",
    ziel: "font-weight: bold;", pruefe: ["font-weight"],
    lernen: "<b>font-weight</b> ist die Schriftstärke: normal oder bold (fett).",
    syntax: "font-weight: bold;" },

  { grad: 3, konzept: "text-transform", titel: "Großbuchstaben",
    text: "Verwandle den Text in Großbuchstaben (uppercase).",
    tipp: "Beispiel: <b>text-transform: lowercase;</b> — du brauchst das Gegenteil.",
    ziel: "text-transform: uppercase;", pruefe: ["text-transform"],
    lernen: "<b>text-transform</b> ändert Groß/Klein: uppercase, lowercase, capitalize.",
    syntax: "text-transform: uppercase;" },

  { grad: 3, konzept: "letter-spacing", titel: "Buchstaben-Abstand",
    text: "Zieh die Buchstaben auseinander: 6px Abstand.",
    tipp: "Beispiel: <b>letter-spacing: 2px;</b>",
    ziel: "letter-spacing: 6px;", pruefe: ["letter-spacing"],
    lernen: "<b>letter-spacing</b> ist der Abstand zwischen Buchstaben.",
    syntax: "letter-spacing: 6px;" },

  { grad: 3, konzept: "", titel: "🔁 Wiederholung",
    text: "Text-Kombi: Größe 24px, fett (bold) UND Großbuchstaben.",
    tipp: "Drei Zeilen: <b>font-size</b>, <b>font-weight</b>, <b>text-transform</b>.",
    ziel: "font-size: 24px;\nfont-weight: bold;\ntext-transform: uppercase;",
    pruefe: ["font-size", "font-weight", "text-transform"],
    lernen: "Mega – du steuerst Schrift jetzt mit mehreren Eigenschaften gleichzeitig." },

  { grad: 2, konzept: "opacity", titel: "Durchsichtig",
    text: "Mach die Box halb durchsichtig: Deckkraft 0.4.",
    tipp: "Deckkraft geht von 0 bis 1, z. B.: <b>opacity: 0.9;</b>",
    ziel: "opacity: 0.4;", pruefe: ["opacity"],
    lernen: "<b>opacity</b> ist die Deckkraft: 0 = unsichtbar, 1 = voll sichtbar.",
    syntax: "opacity: 0.4;" },

  { grad: 3, konzept: "transform: rotate()", titel: "Drehen",
    text: "Dreh die Box um 20 Grad nach rechts.",
    tipp: "Drehen: <b>transform: rotate(45deg);</b>",
    ziel: "transform: rotate(20deg);", pruefe: ["transform"],
    lernen: "<b>transform: rotate()</b> dreht das Element, z. B. rotate(45deg).",
    syntax: "transform: rotate(20deg);" },

  { grad: 3, konzept: "transform: scale()", titel: "Vergrößern",
    text: "Skaliere die Box auf das 1.5-fache.",
    tipp: "Beispiel: <b>transform: scale(2);</b>",
    ziel: "transform: scale(1.5);", pruefe: ["transform"],
    lernen: "<b>transform: scale()</b> vergrößert/verkleinert: scale(2) = doppelt so groß.",
    syntax: "transform: scale(1.5);" },

  { grad: 4, konzept: "box-shadow", titel: "Schatten",
    text: "Gib der Box einen Schatten: 0 10px 20px und die Farbe black.",
    tipp: "Aufbau (x y Unschärfe Farbe): <b>box-shadow: 0 4px 8px gray;</b>",
    ziel: "box-shadow: 0 10px 20px black;", pruefe: ["box-shadow"],
    lernen: "<b>box-shadow</b>: x-Versatz, y-Versatz, Unschärfe, Farbe.",
    syntax: "box-shadow: 0 10px 20px black;" },

  { grad: 4, konzept: "linear-gradient", titel: "Farbverlauf",
    text: "Gib der Box einen Verlauf von red nach blue, Richtung 45deg.",
    tipp: "Beispiel: <b>background: linear-gradient(90deg, green, yellow);</b>",
    ziel: "background: linear-gradient(45deg, red, blue);", pruefe: ["background-image"],
    lernen: "<b>linear-gradient()</b> ist ein Farbverlauf zwischen mehreren Farben.",
    syntax: "background: linear-gradient(45deg, red, blue);" },

  { grad: 4, konzept: "", titel: "🐉 Endgegner",
    text: "Alles zusammen: hotpink, Kreis (50%), 10° nach links gedreht UND Schatten 0 8px 24px black.",
    tipp: "Vier Zeilen – jede endet mit Semikolon ;",
    ziel: "background: hotpink;\nborder-radius: 50%;\ntransform: rotate(-10deg);\nbox-shadow: 0 8px 24px black;",
    pruefe: ["background-color", "border-radius", "transform", "box-shadow"],
    lernen: "🏆 Riesig! Du hast Farbe, Form, Drehung und Schatten in einem gemeistert." }
];

// ============================================================
//  AB HIER LÄUFT DAS SPIEL  (das musst du nicht ändern)
// ============================================================

const zielBox    = document.getElementById("ziel-box");
const deineBox   = document.getElementById("deine-box");
const eingabe    = document.getElementById("css-eingabe");
const highlight  = document.getElementById("highlight");
const gutter     = document.getElementById("gutter");
const rueck      = document.getElementById("rueckmeldung");

const levelZahl  = document.getElementById("level-zahl");
const navMitte   = document.getElementById("nav-mitte");
const balken     = document.getElementById("balken-fuell");
const sterneText = document.getElementById("sterne");
const tabPunkt   = document.getElementById("tab-punkt");
const cursorZeile= document.getElementById("cursor-zeile");
const schwierig  = document.getElementById("schwierigkeit");

const aufgTitel  = document.getElementById("aufgabe-titel");
const aufgText   = document.getElementById("aufgabe-text");
const aufgTipp   = document.getElementById("aufgabe-tipp");
const tippKnopf  = document.getElementById("tipp-knopf");
const tippBox    = document.getElementById("tipp-box");
const lernkarte  = document.getElementById("lernkarte");

const zurueckKnopf = document.getElementById("zurueck-knopf");
const weiterKnopf  = document.getElementById("weiter-knopf");

let aktuell = 0;
const geloest = new Set();
const gelernteListe = [];          // für den Spickzettel
const gelernteSet = new Set();

// --- Syntax-Highlighting ---
function escapeHTML(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function faerbeWert(text) {
  return text
    .replace(/(-?\d*\.?\d+)([a-z%]*)/g, '<span class="c-num">$1$2</span>')
    .replace(/([a-zA-Z][\w-]*)(\()/g, '<span class="c-fn">$1</span>$2');
}
function faerbe(code) {
  return code.split("\n").map(function (zeile) {
    const roh = escapeHTML(zeile);
    if (/^\s*\/\*/.test(zeile)) return '<span class="c-com">' + roh + "</span>";
    const i = roh.indexOf(":");
    if (i === -1) return roh;
    return '<span class="c-prop">' + roh.slice(0, i) + "</span>" + faerbeWert(roh.slice(i));
  }).join("\n");
}

function aktualisiere() {
  const text = eingabe.value;
  highlight.innerHTML = faerbe(text) + "\n";
  const zeilen = Math.max(text.split("\n").length, 1);
  let nums = "";
  for (let n = 1; n <= zeilen; n++) nums += n + "\n";
  gutter.textContent = nums;
  deineBox.style.cssText = text;
  tabPunkt.classList.toggle("zeigen", text.trim() !== "");
}

function syncScroll() {
  highlight.scrollTop = eingabe.scrollTop;
  highlight.scrollLeft = eingabe.scrollLeft;
  gutter.style.transform = "translateY(" + -eingabe.scrollTop + "px)";
  ac.schliessen();
}

function zeigeCursor() {
  const vor = eingabe.value.slice(0, eingabe.selectionStart);
  cursorZeile.textContent = vor.split("\n").length;
}

function sterneCount() { return geloest.size; }

function aktualisiereNav() {
  zurueckKnopf.disabled = aktuell === 0;
  const kannWeiter = geloest.has(aktuell) && aktuell < levels.length - 1;
  weiterKnopf.disabled = !kannWeiter;
  weiterKnopf.classList.toggle("bereit", kannWeiter);
  weiterKnopf.textContent = (aktuell === levels.length - 1 && geloest.has(aktuell)) ? "Sieg ▶" : "Weiter ▶";
}

function ladeLevel(i) {
  aktuell = i;
  const lvl = levels[i];

  zielBox.style.cssText = lvl.ziel;
  deineBox.classList.remove("gewonnen");

  eingabe.value = "";
  aufgTitel.textContent = lvl.titel;
  aufgText.textContent  = lvl.text;
  aufgTipp.innerHTML    = lvl.tipp;
  schwierig.textContent = "★".repeat(lvl.grad) + "☆".repeat(4 - lvl.grad);

  tippBox.hidden = true;
  tippKnopf.hidden = false;
  tippKnopf.textContent = "💡 Tipp anzeigen";
  lernkarte.hidden = true;          // Lernkarte verstecken

  rueck.textContent = "";
  rueck.className = "rueckmeldung";

  levelZahl.textContent = "Level " + (i + 1) + " / " + levels.length;
  navMitte.textContent  = "Level " + (i + 1) + " / " + levels.length + (geloest.has(i) ? "  ·  ✓ gelöst" : "");
  balken.style.width = (sterneCount() / levels.length) * 100 + "%";
  sterneText.textContent = "⭐ " + sterneCount();

  ac.schliessen();
  aktualisiere();
  aktualisiereNav();
  eingabe.focus();
}

function pruefen() {
  ac.schliessen();
  aktualisiere();
  if (eingabe.value.trim() === "") {
    rueck.textContent = "Schreib zuerst dein CSS ins Editor-Feld.";
    rueck.className = "rueckmeldung warn";
    return;
  }
  const lvl = levels[aktuell];
  const userCss = deineBox.style.cssText;
  deineBox.style.cssText = lvl.ziel;
  const refWerte = {};
  for (const eig of lvl.pruefe) {
    refWerte[eig] = getComputedStyle(deineBox).getPropertyValue(eig);
  }
  deineBox.style.cssText = userCss;
  const deinStil = getComputedStyle(deineBox);

  let richtig = true;
  for (const eig of lvl.pruefe) {
    if (refWerte[eig] !== deinStil.getPropertyValue(eig)) richtig = false;
  }

  if (richtig) gewonnen();
  else {
    rueck.textContent = "✗ Noch nicht ganz – vergleiche mit dem Ziel und probier's nochmal.";
    rueck.className = "rueckmeldung warn";
  }
}

function gewonnen() {
  geloest.add(aktuell);
  deineBox.classList.add("gewonnen");
  sterneText.textContent = "⭐ " + sterneCount();
  balken.style.width = (sterneCount() / levels.length) * 100 + "%";

  const lvl = levels[aktuell];

  // Neues Konzept in den Spickzettel aufnehmen
  if (lvl.konzept && !gelernteSet.has(lvl.konzept)) {
    gelernteSet.add(lvl.konzept);
    gelernteListe.push({ konzept: lvl.konzept, lernen: lvl.lernen, syntax: lvl.syntax });
  }

  zeigeLernkarte(lvl);
  rueck.textContent = "";
  rueck.className = "rueckmeldung gut";
  aktualisiereNav();
}

// Die Lernkarte: hält kurz inne und erklärt das Gelernte
function zeigeLernkarte(lvl) {
  const letztes = aktuell === levels.length - 1;
  const codeZeile = lvl.syntax ? '<code>' + escapeHTML(lvl.syntax) + '</code>' : "";
  lernkarte.innerHTML =
    '<div class="lk-titel">✓ Geschafft!</div>' +
    '<p class="lk-merke">📚 Merke: ' + lvl.lernen + '</p>' +
    codeZeile +
    '<button class="lk-weiter" id="lk-weiter">' +
      (letztes ? "🏆 Zum Sieg ▶" : "Verstanden – weiter ▶") + '</button>';
  lernkarte.hidden = false;
  document.getElementById("lk-weiter").addEventListener("click", function () {
    if (letztes) sieg();
    else ladeLevel(aktuell + 1);
  });
  lernkarte.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function sieg() {
  document.querySelector(".korpus").innerHTML =
    '<div class="sieg">' +
    '<h2>🏆 Du bist ein CSS-Meister!</h2>' +
    '<p>Du hast alle ' + levels.length + ' Level geschafft und ' + gelernteListe.length +
    ' CSS-Eigenschaften gelernt.</p>' +
    '<p>Mach den <b>📚 Spickzettel</b> auf, wenn du etwas nachschlagen willst.</p>' +
    '<p><button class="prim" onclick="location.reload()">↻ Nochmal spielen</button></p>' +
    '</div>';
}

// ---- Spickzettel ----
function renderSpick() {
  const liste = document.getElementById("spick-liste");
  if (gelernteListe.length === 0) {
    liste.innerHTML = '<p class="spick-leer">Noch leer. Löse Level, dann füllt sich dein Spickzettel! ✏️</p>';
    return;
  }
  liste.innerHTML = gelernteListe.map(function (e) {
    return '<div class="merk-karte"><div class="mk-titel">' + escapeHTML(e.konzept) + '</div>' +
           '<p class="mk-text">' + e.lernen + '</p>' +
           '<code>' + escapeHTML(e.syntax) + '</code></div>';
  }).join("");
}

// ============================================================
//  AUTOCOMPLETE  (Vorschläge beim Tippen, wie in VS Code)
// ============================================================
const ac = (function () {
  const liste = document.getElementById("ac");
  const props = [
    "color", "background", "background-color", "width", "height",
    "border", "border-radius", "border-color", "font-size", "font-weight",
    "font-family", "padding", "margin", "opacity", "text-transform",
    "text-align", "letter-spacing", "line-height", "transform", "box-shadow",
    "display", "cursor", "outline", "transition"
  ];
  const farben = ["tomato", "gold", "skyblue", "hotpink", "royalblue", "lightgreen",
                  "black", "white", "red", "blue", "green", "orange", "purple", "gray"];
  const werteFuer = {
    "color": farben, "background": farben, "background-color": farben, "border-color": farben,
    "font-weight": ["normal", "bold", "bolder", "lighter"],
    "text-transform": ["uppercase", "lowercase", "capitalize", "none"],
    "text-align": ["left", "center", "right"],
    "display": ["block", "flex", "inline-block", "none"],
    "cursor": ["pointer", "default", "grab"],
    "border": ["solid", "dashed", "dotted"],
    "transform": ["rotate(", "scale(", "translate(", "skew("]
  };

  let offen = [], sel = 0, tokenStart = 0, charW = 9, lineH = 25;

  function messen() {
    const span = document.createElement("span");
    span.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
    span.style.font = getComputedStyle(eingabe).font;
    span.textContent = "0".repeat(10);
    document.body.appendChild(span);
    charW = span.getBoundingClientRect().width / 10;
    span.remove();
    lineH = parseFloat(getComputedStyle(eingabe).lineHeight) || 25;
  }
  function schliessen() { liste.hidden = true; offen = []; }
  function zeichne() {
    liste.innerHTML = offen.map(function (e, idx) {
      const wert = e.typ === "wert";
      const label = e.wert;
      return '<li class="' + (wert ? "ac-wert " : "") + (idx === sel ? "aktiv" : "") +
             '" data-i="' + idx + '"><span class="ac-typ">' + (wert ? "Wert" : "CSS") +
             '</span><span><b>' + escapeHTML(label.slice(0, e.matchLen)) + "</b>" +
             escapeHTML(label.slice(e.matchLen)) + "</span></li>";
    }).join("");
    liste.hidden = offen.length === 0;
  }
  function position() {
    const vor = eingabe.value.slice(0, eingabe.selectionStart);
    const zeilen = vor.split("\n");
    const spalte = zeilen[zeilen.length - 1].length;
    let x = 16 + spalte * charW - eingabe.scrollLeft;
    let y = 14 + (zeilen.length) * lineH - eingabe.scrollTop + 2;
    const maxX = eingabe.clientWidth - 175;
    if (x > maxX) x = Math.max(4, maxX);
    liste.style.left = x + "px";
    liste.style.top = y + "px";
  }
  function tippen() {
    const pos = eingabe.selectionStart;
    const vor = eingabe.value.slice(0, pos);
    const zeile = vor.slice(vor.lastIndexOf("\n") + 1);
    const dp = zeile.indexOf(":");
    let kand;
    if (dp === -1) {
      const token = (zeile.match(/[a-zA-Z-]*$/) || [""])[0];
      tokenStart = pos - token.length;
      kand = props.filter(function (p) { return token && p.toLowerCase().startsWith(token.toLowerCase()); })
        .map(function (p) { return { wert: p, typ: "prop", matchLen: token.length }; });
    } else {
      const prop = zeile.slice(0, dp).trim();
      const token = (zeile.match(/[a-zA-Z(-]*$/) || [""])[0];
      tokenStart = pos - token.length;
      kand = (werteFuer[prop] || []).filter(function (v) { return token && v.toLowerCase().startsWith(token.toLowerCase()); })
        .map(function (v) { return { wert: v, typ: "wert", matchLen: token.length }; });
    }
    offen = kand.slice(0, 8); sel = 0;
    if (offen.length === 0) { schliessen(); return; }
    zeichne(); position();
  }
  function annehmen() {
    if (offen.length === 0) return false;
    let einf = offen[sel].wert;
    if (offen[sel].typ === "prop") einf += ": ";
    const pos = eingabe.selectionStart, v = eingabe.value;
    eingabe.value = v.slice(0, tokenStart) + einf + v.slice(pos);
    const neu = tokenStart + einf.length;
    eingabe.setSelectionRange(neu, neu);
    schliessen(); aktualisiere(); zeigeCursor();
    return true;
  }
  function tastatur(e) {
    if (liste.hidden || offen.length === 0) return false;
    if (e.key === "ArrowDown") { sel = (sel + 1) % offen.length; zeichne(); position(); e.preventDefault(); return true; }
    if (e.key === "ArrowUp")   { sel = (sel - 1 + offen.length) % offen.length; zeichne(); position(); e.preventDefault(); return true; }
    if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); return annehmen(); }
    if (e.key === "Escape") { schliessen(); e.preventDefault(); return true; }
    return false;
  }
  liste.addEventListener("mousedown", function (e) {
    const li = e.target.closest("li");
    if (!li) return;
    e.preventDefault();
    sel = parseInt(li.dataset.i, 10); annehmen(); eingabe.focus();
  });
  messen();
  return { tippen: tippen, tastatur: tastatur, schliessen: schliessen };
})();

// ======= Knöpfe & Eingaben =======
document.getElementById("pruefen-knopf").addEventListener("click", pruefen);

document.getElementById("loesung-knopf").addEventListener("click", function () {
  eingabe.value = levels[aktuell].ziel;
  ac.schliessen(); aktualisiere();
  pruefen();
});

document.getElementById("reset-knopf").addEventListener("click", function () {
  eingabe.value = ""; ac.schliessen(); aktualisiere();
  rueck.textContent = ""; rueck.className = "rueckmeldung"; eingabe.focus();
});

tippKnopf.addEventListener("click", function () { tippBox.hidden = false; tippKnopf.hidden = true; });

zurueckKnopf.addEventListener("click", function () { if (aktuell > 0) ladeLevel(aktuell - 1); });
weiterKnopf.addEventListener("click", function () { if (!weiterKnopf.disabled) ladeLevel(aktuell + 1); });

eingabe.addEventListener("input", function () { aktualisiere(); zeigeCursor(); ac.tippen(); });
eingabe.addEventListener("scroll", syncScroll);
eingabe.addEventListener("keyup", zeigeCursor);
eingabe.addEventListener("click", function () { zeigeCursor(); ac.schliessen(); });
eingabe.addEventListener("blur", function () { setTimeout(ac.schliessen, 120); });
eingabe.addEventListener("keydown", function (e) {
  if (ac.tastatur(e)) return;
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); pruefen(); }
});

// Spickzettel öffnen/schließen
document.getElementById("spick-knopf").addEventListener("click", function () {
  renderSpick();
  document.getElementById("spick-modal").hidden = false;
});
document.getElementById("spick-zu").addEventListener("click", function () {
  document.getElementById("spick-modal").hidden = true;
});
document.getElementById("spick-modal").addEventListener("click", function (e) {
  if (e.target.id === "spick-modal") this.hidden = true;   // Klick daneben schließt
});

document.getElementById("vollbild-knopf").addEventListener("click", function () {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});

// Los geht's!
ladeLevel(0);
