// ============================================================
//  JS-CHALLENGE  –  das Spiel
//
//  Zwei Arten von Leveln:
//   • KONSOLEN-Level (typ: "konsole"): Du schreibst JavaScript,
//     dein Code läuft und die AUSGABE (console.log) wird mit der
//     Ziel-Ausgabe verglichen.
//   • BUTTON-Level (typ: "button"): Du baust einen KNOPF, der etwas
//     TUT. Dein Knopf wird echt und klickbar – das Spiel klickt ihn
//     (unsichtbar) und prüft, ob das Richtige passiert.
//
//  Damit das Gelernte HÄNGEN BLEIBT:
//   • Nach jedem Lösen kommt eine LERNKARTE mit einem Merksatz.
//   • Jedes Konzept wird MEHRMALS geübt (andere Werte).
//   • 🔁-Level mischen frühere Konzepte.
//   • Der SPICKZETTEL (oben rechts) sammelt alles Gelernte.
//
//  Felder pro Level:
//   typ    = "konsole" oder "button"   grad = Schwierigkeit (1–4)
//   konzept= Thema (Spickzettel)       text = Aufgabe   tipp = Hilfe
//   ziel   = geheime Lösung            lernen/syntax = Lernkarte/Spickzettel
//   (nur button:) html = Start-Elemente, klicks = Test-Klicks, lies = Zustand ablesen
// ============================================================

// ---- Bausteine & Ableser für die Button-Level ----
const KNOPF   = '<button id="knopf" class="spiel-knopf">Klick mich</button>';
const ANZEIGE = function (t) { return '<p id="anzeige" class="anzeige">' + t + '</p>'; };
const BOX     = '<div id="box" class="spiel-box"></div>';
function text(d, id) { const e = d.getElementById(id); return e ? e.textContent : "(fehlt)"; }
function farbe(d, win, id) { const e = d.getElementById(id); return e ? win.getComputedStyle(e).backgroundColor : "(fehlt)"; }

const levels = [
  // ======================= TEIL 1: KONSOLE =======================
  { typ: "konsole", grad: 1, konzept: "console.log", titel: "Etwas ausgeben",
    text: 'Gib den Text Hallo Welt in der Konsole aus.',
    tipp: 'Beispiel: <b>console.log("Hi");</b>',
    ziel: 'console.log("Hallo Welt");',
    lernen: "<b>console.log(...)</b> schreibt etwas in die Konsole. Text steht in Anführungszeichen.",
    syntax: 'console.log("Hallo Welt");' },

  { typ: "konsole", grad: 1, konzept: "console.log", titel: "Zahlen ausgeben",
    text: "Übung festigt! Gib die Zahl 42 aus.",
    tipp: "Zahlen brauchen KEINE Anführungszeichen: <b>console.log(7);</b>",
    ziel: "console.log(42);",
    lernen: "Zahlen schreibst du ohne Anführungszeichen, Text mit.",
    syntax: "console.log(42);" },

  { typ: "konsole", grad: 1, konzept: "let (Variable)", titel: "Variablen",
    text: "Speichere die Zahl 15 in einer Variablen und gib sie aus.",
    tipp: 'Aufbau: <b>let name = wert;</b> — dann <b>console.log(name);</b>',
    ziel: "let alter = 15;\nconsole.log(alter);",
    lernen: "<b>let name = wert;</b> speichert einen Wert. Der Name steht dann für den Wert.",
    syntax: "let alter = 15;\nconsole.log(alter);" },

  { typ: "konsole", grad: 1, konzept: "Rechnen", titel: "Plus rechnen",
    text: "Lass JavaScript 7 + 5 ausrechnen und das Ergebnis ausgeben.",
    tipp: "Du kannst direkt rechnen: <b>console.log(2 + 3);</b>",
    ziel: "console.log(7 + 5);",
    lernen: "JavaScript rechnet mit <b>+ - * /</b>. Setze die Rechnung direkt in console.log.",
    syntax: "console.log(7 + 5);" },

  { typ: "konsole", grad: 1, konzept: "Rechnen", titel: "Mal rechnen",
    text: "Gib das Ergebnis von 6 * 7 aus.",
    tipp: "Mal-Zeichen ist <b>*</b>: <b>console.log(4 * 5);</b>",
    ziel: "console.log(6 * 7);",
    lernen: "<b>*</b> ist Mal, <b>/</b> ist Geteilt.",
    syntax: "console.log(6 * 7);" },

  { typ: "konsole", grad: 2, konzept: "Text verbinden", titel: "Wörter verbinden",
    text: 'Verbinde die Wörter zu: Hallo Max',
    tipp: 'Mit + klebt man Texte zusammen: <b>"Guten " + "Tag"</b>',
    ziel: 'console.log("Hallo " + "Max");',
    lernen: "Mit <b>+</b> kann man auch Texte verbinden (das heißt: zusammenkleben).",
    syntax: 'console.log("Hallo " + "Max");' },

  { typ: "konsole", grad: 2, konzept: "Template-String", titel: "Text mit Variable",
    text: 'Speichere den Namen Lena und gib aus: Hallo Lena!',
    tipp: 'Backticks + ${…}: <b>`Hi ${name}`</b> (Taste neben der Rücktaste)',
    ziel: 'let name = "Lena";\nconsole.log(`Hallo ${name}!`);',
    lernen: "Mit <b>`Text ${variable}`</b> (Backticks) baust du Variablen direkt in Text ein.",
    syntax: 'let name = "Lena";\nconsole.log(`Hallo ${name}!`);' },

  { typ: "konsole", grad: 2, konzept: "", titel: "🔁 Wiederholung",
    text: "Speichere die Zahl 8 in einer Variablen und gib ihr Doppeltes aus.",
    tipp: "Erst <b>let zahl = 8;</b>, dann <b>console.log(zahl * 2);</b>",
    ziel: "let zahl = 8;\nconsole.log(zahl * 2);",
    lernen: "Stark – du hast Variablen und Rechnen kombiniert." },

  { typ: "konsole", grad: 2, konzept: "Vergleiche", titel: "Größer als?",
    text: "Gib aus, ob 10 größer als 3 ist (das Ergebnis ist true oder false).",
    tipp: "Vergleiche ergeben true/false: <b>console.log(5 > 2);</b>",
    ziel: "console.log(10 > 3);",
    lernen: "Vergleiche <b>&gt; &lt; &gt;= &lt;=</b> ergeben <b>true</b> (wahr) oder <b>false</b> (falsch).",
    syntax: "console.log(10 > 3);" },

  { typ: "konsole", grad: 3, konzept: "if / else", titel: "Wenn … sonst …",
    text: 'alter ist 15. Gib "Kind" aus, wenn alter unter 18 ist, sonst "Erwachsen".',
    tipp: 'Aufbau: <b>if (bedingung) { … } else { … }</b>',
    ziel: 'let alter = 15;\nif (alter < 18) {\n  console.log("Kind");\n} else {\n  console.log("Erwachsen");\n}',
    lernen: "<b>if (bedingung) { … } else { … }</b> führt je nach Bedingung unterschiedlichen Code aus.",
    syntax: 'if (alter < 18) {\n  console.log("Kind");\n} else {\n  console.log("Erwachsen");\n}' },

  { typ: "konsole", grad: 3, konzept: "Funktion", titel: "Eigene Funktion",
    text: "Schreib eine Funktion, die eine Zahl verdoppelt, und gib verdopple(5) aus.",
    tipp: "Aufbau: <b>function name(n) { return … }</b>, dann <b>console.log(name(5));</b>",
    ziel: "function verdopple(n) {\n  return n * 2;\n}\nconsole.log(verdopple(5));",
    lernen: "Eine <b>function</b> ist wiederverwendbarer Code. <b>return</b> gibt ein Ergebnis zurück.",
    syntax: "function verdopple(n) {\n  return n * 2;\n}\nconsole.log(verdopple(5));" },

  { typ: "konsole", grad: 3, konzept: "Funktion", titel: "Funktion – nochmal",
    text: "Schreib eine Funktion quadrat(n), die n*n zurückgibt, und gib quadrat(4) aus.",
    tipp: "Wie eben, aber n mal n: <b>return n * n;</b>",
    ziel: "function quadrat(n) {\n  return n * n;\n}\nconsole.log(quadrat(4));",
    lernen: "Sitzt! Funktionen bekommen Werte (Parameter) und geben mit <b>return</b> ein Ergebnis." },

  { typ: "konsole", grad: 3, konzept: "Array", titel: "Liste (Array)",
    text: "Erstelle eine Liste mit den Zahlen 1, 2, 3 und gib aus, wie viele Elemente sie hat.",
    tipp: "Liste: <b>[1, 2, 3]</b>. Anzahl: <b>liste.length</b>",
    ziel: "let zahlen = [1, 2, 3];\nconsole.log(zahlen.length);",
    lernen: "Ein <b>Array</b> ist eine Liste: <b>[1, 2, 3]</b>. <b>.length</b> ist die Anzahl der Elemente.",
    syntax: "let zahlen = [1, 2, 3];\nconsole.log(zahlen.length);" },

  { typ: "konsole", grad: 3, konzept: "Array-Zugriff", titel: "Erstes Element",
    text: 'Erstelle die Liste ["rot", "grün", "blau"] und gib das ERSTE Element aus.',
    tipp: "Zählung beginnt bei 0! Erstes Element: <b>liste[0]</b>",
    ziel: 'let farben = ["rot", "grün", "blau"];\nconsole.log(farben[0]);',
    lernen: "Auf Elemente greifst du mit <b>liste[index]</b> zu – <b>Zählung beginnt bei 0</b>.",
    syntax: 'let farben = ["rot", "grün", "blau"];\nconsole.log(farben[0]);' },

  { typ: "konsole", grad: 3, konzept: "for-Schleife", titel: "Zählen mit Schleife",
    text: "Gib mit einer Schleife die Zahlen 1, 2 und 3 aus (jede in eigener Zeile).",
    tipp: "Aufbau: <b>for (let i = 1; i <= 3; i++) { console.log(i); }</b>",
    ziel: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}",
    lernen: "Eine <b>for</b>-Schleife wiederholt Code. <b>i++</b> zählt bei jedem Durchlauf um 1 hoch.",
    syntax: "for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}" },

  { typ: "konsole", grad: 4, konzept: "for-Schleife", titel: "Summe bilden",
    text: "Addiere mit einer Schleife alle Zahlen von 1 bis 5 und gib die Summe aus (Ergebnis: 15).",
    tipp: "Merker anlegen: <b>let summe = 0;</b>, in der Schleife <b>summe = summe + i;</b>",
    ziel: "let summe = 0;\nfor (let i = 1; i <= 5; i++) {\n  summe = summe + i;\n}\nconsole.log(summe);",
    lernen: "Mit einer Zähler-Variablen sammelst du in der Schleife ein Ergebnis (hier eine Summe)." },

  { typ: "konsole", grad: 3, konzept: "Objekt", titel: "Objekt",
    text: 'Erstelle ein Objekt person mit name "Tom" und alter 20. Gib den Namen aus.',
    tipp: 'Objekt: <b>{ name: "Tom", alter: 20 }</b>, Zugriff: <b>person.name</b>',
    ziel: 'let person = { name: "Tom", alter: 20 };\nconsole.log(person.name);',
    lernen: "Ein <b>Objekt</b> bündelt benannte Werte: <b>{ name: \"Tom\" }</b>. Zugriff mit <b>objekt.name</b>.",
    syntax: 'let person = { name: "Tom", alter: 20 };\nconsole.log(person.name);' },

  { typ: "konsole", grad: 4, konzept: "for...of", titel: "Durch Liste gehen",
    text: "Gehe durch die Liste [2, 4, 6] und gib jede Zahl VERDOPPELT aus (4, 8, 12).",
    tipp: "Aufbau: <b>for (let z of liste) { console.log(z * 2); }</b>",
    ziel: "let zahlen = [2, 4, 6];\nfor (let z of zahlen) {\n  console.log(z * 2);\n}",
    lernen: "<b>for (let x of liste)</b> holt nacheinander jedes Element aus einer Liste.",
    syntax: "for (let z of zahlen) {\n  console.log(z * 2);\n}" },

  { typ: "konsole", grad: 4, konzept: "", titel: "🏁 Konsolen-Finale",
    text: 'Gib für die Zahlen 1 bis 4 aus, ob sie gerade oder ungerade sind – z. B. "1 ungerade", "2 gerade", …',
    tipp: 'Gerade prüfen mit Rest: <b>if (i % 2 === 0) { … } else { … }</b>. Mit + Text und Zahl verbinden.',
    ziel: 'for (let i = 1; i <= 4; i++) {\n  if (i % 2 === 0) {\n    console.log(i + " gerade");\n  } else {\n    console.log(i + " ungerade");\n  }\n}',
    lernen: "🏆 Riesig! Schleife, Bedingung, Rechnen (<b>%</b> = Rest) und Text-Verbinden gemeistert. Jetzt bauen wir echte KNÖPFE!" },

  // ======================= TEIL 2: BUTTONS =======================
  { typ: "button", grad: 1, konzept: "getElementById + textContent", titel: "Text ändern",
    html: ANZEIGE("Text hier"), klicks: 0,
    text: 'Ändere mit JavaScript den Text von #anzeige zu: Hallo!',
    tipp: 'Aufbau: <b>document.getElementById("anzeige").textContent = "…";</b>',
    ziel: 'document.getElementById("anzeige").textContent = "Hallo!";',
    lies: function (d) { return text(d, "anzeige"); },
    lernen: '<b>document.getElementById("id")</b> holt ein Element auf der Seite. <b>.textContent = "…"</b> ändert seinen Text.',
    syntax: 'document.getElementById("anzeige").textContent = "Hallo!";' },

  { typ: "button", grad: 1, konzept: "getElementById + textContent", titel: "Text ändern – nochmal",
    html: ANZEIGE("Text hier"), klicks: 0,
    text: 'Setze den Text von #anzeige auf: Willkommen',
    tipp: 'Wie eben: <b>…textContent = "Willkommen";</b>',
    ziel: 'document.getElementById("anzeige").textContent = "Willkommen";',
    lies: function (d) { return text(d, "anzeige"); },
    lernen: 'Sitzt! So änderst du jeden Text auf einer Seite per JavaScript.' },

  { typ: "button", grad: 2, konzept: "onclick", titel: "Knopf reagiert",
    html: KNOPF + ANZEIGE("noch nichts"), klicks: 1,
    text: 'Wenn man auf den Knopf klickt, soll #anzeige „Geklickt!" zeigen.',
    tipp: 'Aufbau: <b>element.onclick = function() { … };</b>',
    ziel: 'document.getElementById("knopf").onclick = function() {\n  document.getElementById("anzeige").textContent = "Geklickt!";\n};',
    lies: function (d) { return text(d, "anzeige"); },
    lernen: '<b>element.onclick = function() { … }</b> legt fest, was bei jedem Klick passiert.',
    syntax: 'knopf.onclick = function() {\n  anzeige.textContent = "Geklickt!";\n};' },

  { typ: "button", grad: 2, konzept: "Klick-Zähler", titel: "Klicks zählen",
    html: KNOPF + ANZEIGE("0"), klicks: 3,
    text: 'Jeder Klick soll die Zahl in #anzeige um 1 erhöhen (Start bei 0).',
    tipp: 'Merker außerhalb: <b>let zaehler = 0;</b> – im Klick <b>zaehler = zaehler + 1;</b>',
    ziel: 'let zaehler = 0;\ndocument.getElementById("knopf").onclick = function() {\n  zaehler = zaehler + 1;\n  document.getElementById("anzeige").textContent = zaehler;\n};',
    lies: function (d) { return text(d, "anzeige"); },
    lernen: 'Eine Variable <b>außerhalb</b> des Klicks merkt sich den Stand über alle Klicks hinweg.',
    syntax: 'let zaehler = 0;\nknopf.onclick = function() {\n  zaehler = zaehler + 1;\n  anzeige.textContent = zaehler;\n};' },

  { typ: "button", grad: 2, konzept: "style (Farbe)", titel: "Farbe wechseln",
    html: KNOPF + BOX, klicks: 1,
    text: 'Ein Klick soll die Box #box rot färben.',
    tipp: 'Farbe per JS: <b>element.style.background = "red";</b>',
    ziel: 'document.getElementById("knopf").onclick = function() {\n  document.getElementById("box").style.background = "red";\n};',
    lies: function (d, win) { return farbe(d, win, "box"); },
    lernen: '<b>element.style.background = "farbe"</b> ändert die Hintergrundfarbe per JavaScript.',
    syntax: 'knopf.onclick = function() {\n  box.style.background = "red";\n};' },

  { typ: "button", grad: 2, konzept: "Knopf-Text ändern", titel: "Knopf beschriften",
    html: '<button id="knopf" class="spiel-knopf">An</button>', klicks: 1,
    text: 'Ein Klick soll den Text AUF dem Knopf zu „Aus" ändern.',
    tipp: 'Der Knopf kann sich selbst ändern: <b>knopf.textContent = "Aus";</b>',
    ziel: 'document.getElementById("knopf").onclick = function() {\n  document.getElementById("knopf").textContent = "Aus";\n};',
    lies: function (d) { return text(d, "knopf"); },
    lernen: 'Ein Element kann sich im Klick auch <b>selbst</b> verändern.' },

  { typ: "button", grad: 3, konzept: "Klick-Zähler", titel: "Punkte sammeln",
    html: KNOPF + ANZEIGE("10"), klicks: 2,
    text: 'Start bei 10. Jeder Klick soll +5 Punkte in #anzeige geben.',
    tipp: 'Wie der Zähler, aber <b>+ 5</b> statt + 1 – und Start bei 10.',
    ziel: 'let punkte = 10;\ndocument.getElementById("knopf").onclick = function() {\n  punkte = punkte + 5;\n  document.getElementById("anzeige").textContent = punkte;\n};',
    lies: function (d) { return text(d, "anzeige"); },
    lernen: 'Du kannst in jedem Klick beliebig rechnen – z. B. immer +5.' },

  { typ: "button", grad: 3, konzept: "if / else im Klick", titel: "Umschalten",
    html: KNOPF + ANZEIGE("Aus"), klicks: 1,
    text: 'Ein Klick soll #anzeige von „Aus" auf „An" schalten.',
    tipp: 'Merke dir einen Zustand: <b>let an = false;</b> und schalte um: <b>an = !an;</b>',
    ziel: 'let an = false;\ndocument.getElementById("knopf").onclick = function() {\n  an = !an;\n  document.getElementById("anzeige").textContent = an ? "An" : "Aus";\n};',
    lies: function (d) { return text(d, "anzeige"); },
    lernen: 'Mit einem <b>true/false</b>-Merker und <b>!</b> (nicht) baust du einen Umschalter.',
    syntax: 'let an = false;\nknopf.onclick = function() {\n  an = !an;\n  anzeige.textContent = an ? "An" : "Aus";\n};' },

  { typ: "button", grad: 3, konzept: "", titel: "🔁 Text + Farbe",
    html: KNOPF + ANZEIGE("bereit") + BOX, klicks: 1,
    text: 'Ein Klick soll #anzeige „Fertig!" zeigen UND die Box #box grün färben.',
    tipp: 'Zwei Zeilen im selben Klick: eine für textContent, eine für style.background.',
    ziel: 'document.getElementById("knopf").onclick = function() {\n  document.getElementById("anzeige").textContent = "Fertig!";\n  document.getElementById("box").style.background = "green";\n};',
    lies: function (d, win) { return text(d, "anzeige") + " | " + farbe(d, win, "box"); },
    lernen: 'In einem Klick darf beliebig viel passieren – Text UND Farbe gleichzeitig.' },

  { typ: "button", grad: 4, konzept: "", titel: "🐉 Endgegner",
    html: KNOPF + ANZEIGE("0") + BOX, klicks: 3,
    text: 'Zähle Klicks in #anzeige hoch. Sobald 3 (oder mehr) erreicht sind, soll die Box #box grün werden.',
    tipp: 'Zähler + im Klick prüfen: <b>if (zaehler >= 3) { box.style.background = "green"; }</b>',
    ziel: 'let zaehler = 0;\ndocument.getElementById("knopf").onclick = function() {\n  zaehler = zaehler + 1;\n  document.getElementById("anzeige").textContent = zaehler;\n  if (zaehler >= 3) {\n    document.getElementById("box").style.background = "green";\n  }\n};',
    lies: function (d, win) { return text(d, "anzeige") + " | " + farbe(d, win, "box"); },
    lernen: '🏆 Riesig! Zähler, Klick-Reaktion, if-Bedingung und Farbwechsel – alles in einem Knopf.' }
];

// ============================================================
//  AB HIER LÄUFT DAS SPIEL  (das musst du nicht ändern)
// ============================================================

const konsoleBereich = document.getElementById("konsole-bereich");
const buttonBereich  = document.getElementById("button-bereich");
const vorschauKopf   = document.getElementById("vorschau-kopf");
const tabZwei        = document.getElementById("tab-zwei");

const zielAusgabe  = document.getElementById("ziel-ausgabe");
const deineAusgabe = document.getElementById("deine-ausgabe");
const buehne       = document.getElementById("buehne");
const eingabe      = document.getElementById("js-eingabe");
const highlight    = document.getElementById("highlight");
const gutter       = document.getElementById("gutter");
const rueck        = document.getElementById("rueckmeldung");

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
let erwartetKonsole = [];          // Ziel-Ausgabe (Konsolen-Level)
let erwartetButton = "";           // Ziel-Zustand (Button-Level)
const geloest = new Set();
const gelernteListe = [];
const gelernteSet = new Set();

// ---- Konsolen-Level: JavaScript ausführen und console.log einsammeln ----
function formatWert(v) {
  if (typeof v === "string") return v;
  if (v === null) return "null";
  if (v === undefined) return "undefined";
  if (typeof v === "object") { try { return JSON.stringify(v); } catch (e) { return String(v); } }
  return String(v);
}
function fuehreAus(code) {
  const ausgabe = [];
  const fakeConsole = {
    log: function () {
      if (ausgabe.length > 500) throw new Error("Zu viele Ausgaben – steckst du in einer Endlosschleife?");
      ausgabe.push(Array.prototype.map.call(arguments, formatWert).join(" "));
    }
  };
  fakeConsole.info = fakeConsole.log;
  fakeConsole.error = fakeConsole.log;
  try {
    new Function("console", '"use strict";\n' + code)(fakeConsole);
    return { ausgabe: ausgabe, fehler: null };
  } catch (e) {
    return { ausgabe: ausgabe, fehler: e.message };
  }
}
function zeichneKonsole(el, zeilen, fehler) {
  el.innerHTML = "";
  if ((!zeilen || zeilen.length === 0) && !fehler) {
    const leer = document.createElement("div");
    leer.className = "konsole-leer";
    leer.textContent = "(keine Ausgabe)";
    el.appendChild(leer);
    return;
  }
  (zeilen || []).forEach(function (z) {
    const div = document.createElement("div");
    div.className = "zeile";
    div.textContent = z;
    el.appendChild(div);
  });
  if (fehler) {
    const div = document.createElement("div");
    div.className = "zeile fehler";
    div.textContent = "Fehler: " + fehler;
    el.appendChild(div);
  }
}
function gleich(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

// ---- Button-Level: Code im unsichtbaren iframe testen (echte Klicks) ----
function testeImIframe(html, code, klicks, lies) {
  const ifr = document.createElement("iframe");
  ifr.style.cssText = "position:absolute;left:-9999px;top:-9999px;width:400px;height:300px;border:0;";
  document.body.appendChild(ifr);
  const d = ifr.contentDocument;
  const win = ifr.contentWindow;
  d.body.innerHTML = html;
  let fehler = null, snap = null;
  try {
    win.eval('"use strict";\n' + code);
    const knopf = d.getElementById("knopf");
    for (let i = 0; i < (klicks || 0); i++) { if (knopf) knopf.click(); }
    snap = lies(d, win);
  } catch (e) {
    fehler = e.message;
  }
  ifr.remove();
  return { snap: snap, fehler: fehler };
}
// ---- Button-Level: Code echt & klickbar in die Live-Bühne setzen ----
function baueLive(html, code) {
  buehne.innerHTML = html;
  buehne.classList.remove("gewonnen");
  try {
    new Function(code)();
    return null;
  } catch (e) {
    return e.message;
  }
}

// --- Syntax-Highlighting ---
function escapeHTML(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const KEYWORDS = /\b(let|const|var|function|return|if|else|for|while|of|in|true|false|null|undefined|new|typeof|do|document)\b/;
const HL_REGEX = new RegExp(
  "(\\/\\/[^\\n]*)" +
  "|(\"[^\"]*\"|'[^']*'|`[^`]*`)" +
  "|" + KEYWORDS.source +
  "|(\\b\\d+\\.?\\d*\\b)" +
  "|([a-zA-Z_$][\\w$]*)(?=\\s*\\()",
  "g"
);
function faerbe(code) {
  const esc = escapeHTML(code);
  return esc.replace(HL_REGEX, function (m, com, str, kw, num, fn) {
    if (com) return '<span class="c-com">' + com + "</span>";
    if (str) return '<span class="c-str">' + str + "</span>";
    if (kw)  return '<span class="c-kw">' + kw + "</span>";
    if (num) return '<span class="c-num">' + num + "</span>";
    if (fn)  return '<span class="c-fn">' + fn + "</span>";
    return m;
  });
}

function aktualisiere() {
  const t = eingabe.value;
  highlight.innerHTML = faerbe(t) + "\n";
  const zeilen = Math.max(t.split("\n").length, 1);
  let nums = "";
  for (let n = 1; n <= zeilen; n++) nums += n + "\n";
  gutter.textContent = nums;
  tabPunkt.classList.toggle("zeigen", t.trim() !== "");
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

// Vorschau-Bereich passend zum Level-Typ zeigen
function zeigeBereich(typ) {
  const konsole = typ !== "button";
  konsoleBereich.hidden = !konsole;
  buttonBereich.hidden = konsole;
  vorschauKopf.textContent = konsole ? "AUSGABE (KONSOLE)" : "LIVE-VORSCHAU (echt & klickbar)";
  tabZwei.textContent = konsole ? "🎯 ziel.out" : "🖱️ vorschau.html";
  eingabe.placeholder = konsole
    ? 'Tippe hier dein JavaScript, z. B.  console.log("Hallo");'
    : "Tippe hier dein JavaScript für den Knopf …";
}

function ladeLevel(i) {
  aktuell = i;
  const lvl = levels[i];

  zeigeBereich(lvl.typ);

  if (lvl.typ === "button") {
    erwartetButton = testeImIframe(lvl.html, lvl.ziel, lvl.klicks, lvl.lies).snap;
    buehne.innerHTML = lvl.html;
    buehne.classList.remove("gewonnen");
  } else {
    const zres = fuehreAus(lvl.ziel);
    erwartetKonsole = zres.ausgabe;
    zeichneKonsole(zielAusgabe, erwartetKonsole, null);
    zeichneKonsole(deineAusgabe, [], null);
    deineAusgabe.classList.remove("gewonnen");
  }

  eingabe.value = "";
  aufgTitel.textContent = lvl.titel;
  aufgText.textContent  = lvl.text;
  aufgTipp.innerHTML    = lvl.tipp;
  schwierig.textContent = "★".repeat(lvl.grad) + "☆".repeat(4 - lvl.grad);

  tippBox.hidden = true;
  tippKnopf.hidden = false;
  tippKnopf.textContent = "💡 Tipp anzeigen";
  lernkarte.hidden = true;

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
    rueck.textContent = "Schreib zuerst dein JavaScript ins Editor-Feld.";
    rueck.className = "rueckmeldung warn";
    return;
  }
  const lvl = levels[aktuell];

  if (lvl.typ === "button") {
    const liveFehler = baueLive(lvl.html, eingabe.value);
    const res = testeImIframe(lvl.html, eingabe.value, lvl.klicks, lvl.lies);
    if (liveFehler || res.fehler) {
      rueck.textContent = "✗ Dein Code hat einen Fehler: " + (liveFehler || res.fehler);
      rueck.className = "rueckmeldung warn";
      return;
    }
    if (res.snap === erwartetButton) {
      gewonnen();
    } else {
      const nachKlick = lvl.klicks > 0 ? (" (nach " + lvl.klicks + "× Klick)") : "";
      rueck.textContent = "✗ Noch nicht ganz" + nachKlick + ". Ziel: " + erwartetButton + " — deins: " + res.snap;
      rueck.className = "rueckmeldung warn";
    }
    return;
  }

  // Konsolen-Level
  const res = fuehreAus(eingabe.value);
  zeichneKonsole(deineAusgabe, res.ausgabe, res.fehler);
  if (res.fehler) {
    rueck.textContent = "✗ Dein Code hat einen Fehler – schau in deine Konsole.";
    rueck.className = "rueckmeldung warn";
    return;
  }
  if (gleich(res.ausgabe, erwartetKonsole)) {
    gewonnen();
  } else {
    rueck.textContent = "✗ Noch nicht ganz – vergleiche deine Ausgabe mit dem Ziel.";
    rueck.className = "rueckmeldung warn";
  }
}

function gewonnen() {
  geloest.add(aktuell);
  const lvl = levels[aktuell];

  if (lvl.typ === "button") {
    buehne.classList.add("gewonnen");
    rueck.textContent = "Klick deinen Knopf ruhig noch selbst an! 🖱️";
  } else {
    deineAusgabe.classList.add("gewonnen");
    rueck.textContent = "";
  }
  rueck.className = "rueckmeldung gut";

  sterneText.textContent = "⭐ " + sterneCount();
  balken.style.width = (sterneCount() / levels.length) * 100 + "%";

  if (lvl.konzept && !gelernteSet.has(lvl.konzept)) {
    gelernteSet.add(lvl.konzept);
    gelernteListe.push({ konzept: lvl.konzept, lernen: lvl.lernen, syntax: lvl.syntax });
  }

  zeigeLernkarte(lvl);
  aktualisiereNav();
}

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
    '<h2>🏆 Du bist ein JavaScript-Meister!</h2>' +
    '<p>Du hast alle ' + levels.length + ' Level geschafft – von console.log bis zu echten Knöpfen, ' +
    'und dabei ' + gelernteListe.length + ' Konzepte gelernt.</p>' +
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
           (e.syntax ? '<code>' + escapeHTML(e.syntax) + '</code>' : "") + '</div>';
  }).join("");
}

// ============================================================
//  AUTOCOMPLETE  (Vorschläge beim Tippen, wie in VS Code)
// ============================================================
const ac = (function () {
  const liste = document.getElementById("ac");
  const woerter = [
    { wert: "console.log(", fn: true },
    { wert: 'document.getElementById(', fn: true },
    { wert: ".textContent" },
    { wert: ".onclick" },
    { wert: ".style.background" },
    { wert: "function() {" },
    { wert: "let " },
    { wert: "const " },
    { wert: "return " },
    { wert: "if (" },
    { wert: "else " },
    { wert: "for (" },
    { wert: "while (" },
    { wert: "true" },
    { wert: "false" },
    { wert: ".length" },
    { wert: ".push(", fn: true },
    { wert: ".toUpperCase(", fn: true },
    { wert: ".toLowerCase(", fn: true }
  ];

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
      const label = e.wert;
      return '<li class="' + (e.fn ? "ac-fn " : "") + (idx === sel ? "aktiv" : "") +
             '" data-i="' + idx + '"><span class="ac-typ">' + (e.fn ? "fn" : "JS") +
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
    const maxX = eingabe.clientWidth - 220;
    if (x > maxX) x = Math.max(4, maxX);
    liste.style.left = x + "px";
    liste.style.top = y + "px";
  }
  function tippen() {
    const pos = eingabe.selectionStart;
    const vor = eingabe.value.slice(0, pos);
    const token = (vor.match(/[\w.]*$/) || [""])[0];
    tokenStart = pos - token.length;
    if (!token) { schliessen(); return; }
    const kand = woerter
      .filter(function (w) { return w.wert.toLowerCase().startsWith(token.toLowerCase()) && w.wert !== token; })
      .map(function (w) { return { wert: w.wert, fn: w.fn, matchLen: token.length }; });
    offen = kand.slice(0, 8); sel = 0;
    if (offen.length === 0) { schliessen(); return; }
    zeichne(); position();
  }
  function annehmen() {
    if (offen.length === 0) return false;
    const einf = offen[sel].wert;
    const pos = eingabe.selectionStart, v = eingabe.value;
    eingabe.value = v.slice(0, tokenStart) + einf + v.slice(pos);
    let neu = tokenStart + einf.length;
    if (einf.endsWith("(")) {
      eingabe.value = eingabe.value.slice(0, neu) + ")" + eingabe.value.slice(neu);
    }
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
  const lvl = levels[aktuell];
  if (lvl.typ === "button") {
    buehne.innerHTML = lvl.html; buehne.classList.remove("gewonnen");
  } else {
    zeichneKonsole(deineAusgabe, [], null);
  }
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
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); pruefen(); return; }
  if (e.key === "Tab") {
    e.preventDefault();
    const s = eingabe.selectionStart, en = eingabe.selectionEnd;
    eingabe.value = eingabe.value.slice(0, s) + "  " + eingabe.value.slice(en);
    eingabe.setSelectionRange(s + 2, s + 2);
    aktualisiere(); zeigeCursor();
  }
});

document.getElementById("spick-knopf").addEventListener("click", function () {
  renderSpick();
  document.getElementById("spick-modal").hidden = false;
});
document.getElementById("spick-zu").addEventListener("click", function () {
  document.getElementById("spick-modal").hidden = true;
});
document.getElementById("spick-modal").addEventListener("click", function (e) {
  if (e.target.id === "spick-modal") this.hidden = true;
});

document.getElementById("vollbild-knopf").addEventListener("click", function () {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});

// Los geht's!
ladeLevel(0);
