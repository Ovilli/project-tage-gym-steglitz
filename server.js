import express from 'express';
import Database from 'better-sqlite3';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'showcase.db');

if (!ADMIN_PASSWORD) {
  console.warn('[warn] ADMIN_PASSWORD is not set — admin writes are DISABLED. Set ADMIN_PASSWORD to enable the admin page.');
}

// --- Database -------------------------------------------------------------
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    color       TEXT NOT NULL DEFAULT '#1f3a5f',
    html        TEXT NOT NULL DEFAULT '',
    css         TEXT NOT NULL DEFAULT '',
    js          TEXT NOT NULL DEFAULT '',
    position    INTEGER NOT NULL DEFAULT 0,
    status      TEXT NOT NULL DEFAULT 'approved',
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Migration: add status column to databases created before review queue existed.
const projectCols = db.prepare('PRAGMA table_info(projects)').all().map((c) => c.name);
if (!projectCols.includes('status')) {
  db.exec("ALTER TABLE projects ADD COLUMN status TEXT NOT NULL DEFAULT 'approved'");
}

function getSetting(key, fallback) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : fallback;
}
function setSetting(key, value) {
  db.prepare('INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run(key, String(value));
}

// Seed demo data once so the showcase is never empty on a fresh database.
const DEMO = [
  {
    name: 'Maria Gonzalez',
    description: 'Animierte Begrüßungskarte mit CSS-Verlauf und Live-Uhr.',
    color: '#7c3aed',
    html: '<main><h1>Hallo Steglitz!</h1><p>Heute ist <span id="day"></span>.</p><p class="time" id="clock">--:--:--</p></main>',
    css: 'body{margin:0;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;background:linear-gradient(135deg,#7c3aed,#1f3a5f);color:#fff}main{text-align:center;padding:2rem}h1{font-size:2.4rem;margin:0 0 .5rem}.time{font-size:2rem;font-variant-numeric:tabular-nums;letter-spacing:.05em}',
    js: 'const d=new Date();document.getElementById("day").textContent=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"][d.getDay()];function tick(){document.getElementById("clock").textContent=new Date().toLocaleTimeString();}tick();setInterval(tick,1000);'
  },
  {
    name: 'Jonas Weber',
    description: 'Klickzähler-Button, dessen Farbe auf den Punktestand reagiert.',
    color: '#0f766e',
    html: '<div class="wrap"><h1>Klick-Spiel</h1><button id="btn">Klick mich</button><p>Punkte: <strong id="score">0</strong></p></div>',
    css: 'body{margin:0;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;background:#0f172a;color:#e2e8f0}.wrap{text-align:center}button{font-size:1.2rem;padding:.8rem 1.6rem;border:0;border-radius:999px;cursor:pointer;background:#0f766e;color:#fff;transition:background .2s}strong{font-size:1.6rem}',
    js: 'let n=0;const b=document.getElementById("btn"),s=document.getElementById("score");b.addEventListener("click",()=>{n++;s.textContent=n;b.style.background=`hsl(${(n*20)%360} 70% 45%)`;});'
  },
  {
    name: 'Aylin Demir',
    description: 'Mini-To-Do-Liste zum Hinzufügen und Entfernen von Aufgaben.',
    color: '#b45309',
    html: '<div class="card"><h1>To-Do</h1><form id="f"><input id="i" placeholder="Neue Aufgabe" required><button>+</button></form><ul id="list"></ul></div>',
    css: 'body{margin:0;font-family:system-ui,sans-serif;background:#fef3c7;display:grid;place-items:center;min-height:100vh}.card{background:#fff;padding:1.5rem;border-radius:1rem;box-shadow:0 10px 30px rgba(0,0,0,.1);width:min(320px,90vw)}form{display:flex;gap:.5rem}input{flex:1;padding:.5rem;border:1px solid #ddd;border-radius:.5rem}button{border:0;background:#b45309;color:#fff;border-radius:.5rem;padding:0 .9rem;cursor:pointer}ul{list-style:none;padding:0}li{display:flex;justify-content:space-between;padding:.5rem;border-bottom:1px solid #eee;cursor:pointer}li:hover{background:#fff7ed}',
    js: 'const f=document.getElementById("f"),i=document.getElementById("i"),list=document.getElementById("list");f.addEventListener("submit",e=>{e.preventDefault();const li=document.createElement("li");li.textContent=i.value;const x=document.createElement("span");x.textContent="\\u2715";li.appendChild(x);li.addEventListener("click",()=>li.remove());list.appendChild(li);i.value="";});'
  }
];

if (getSetting('seeded') !== '1') {
  const count = db.prepare('SELECT COUNT(*) AS n FROM projects').get().n;
  if (count === 0) {
    const insert = db.prepare('INSERT INTO projects(id,name,description,color,html,css,js,position) VALUES(@id,@name,@description,@color,@html,@css,@js,@position)');
    DEMO.forEach((p, i) => insert.run({ id: crypto.randomUUID().slice(0, 8), position: i, ...p }));
  }
  setSetting('seeded', '1');
}

// --- App ------------------------------------------------------------------
const app = express();
app.use(express.json({ limit: '2mb' }));

// Timing-safe admin check. Returns false when ADMIN_PASSWORD is unset.
function isAdmin(req) {
  if (!ADMIN_PASSWORD) return false;
  const given = req.get('x-admin-password') || '';
  const a = Buffer.from(given);
  const b = Buffer.from(ADMIN_PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function requireAdmin(req, res, next) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Nicht autorisiert' });
  next();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Build a complete, standalone HTML document from a project's code.
function buildPage(project) {
  const html = project.html || '<h1>Hallo</h1><p>Füge HTML auf der Admin-Seite hinzu.</p>';
  const css = project.css || 'body { font-family: system-ui, sans-serif; padding: 2rem; }';
  const js = project.js || '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(project.name)}</title>
<style>${css}</style>
</head>
<body>
${html}
<script>
${js}
<\/script>
</body>
</html>`;
}

function sanitizeProject(body) {
  const name = String(body.name ?? '').trim();
  return {
    name,
    description: String(body.description ?? '').trim(),
    color: /^#[0-9a-fA-F]{6}$/.test(body.color || '') ? body.color : '#1f3a5f',
    html: String(body.html ?? ''),
    css: String(body.css ?? ''),
    js: String(body.js ?? '')
  };
}

// --- API: auth ------------------------------------------------------------
app.post('/api/login', (req, res) => {
  const password = String(req.body?.password ?? '');
  if (!ADMIN_PASSWORD) return res.status(503).json({ ok: false, error: 'Admin-Passwort ist auf dem Server nicht konfiguriert.' });
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) return res.status(401).json({ ok: false, error: 'Falsches Passwort.' });
  res.json({ ok: true });
});

// --- API: settings --------------------------------------------------------
app.get('/api/settings', (_req, res) => {
  res.json({
    title: getSetting('title', 'Schülerprojekte'),
    subtitle: getSetting('subtitle', 'Webentwicklung – Frühjahr 2025')
  });
});
app.put('/api/settings', requireAdmin, (req, res) => {
  setSetting('title', String(req.body?.title ?? 'Schülerprojekte').trim() || 'Schülerprojekte');
  setSetting('subtitle', String(req.body?.subtitle ?? '').trim());
  res.json({ ok: true });
});

// --- API: projects --------------------------------------------------------
app.get('/api/projects', (req, res) => {
  const admin = isAdmin(req);
  const all = admin && req.query.all === '1';
  const full = req.query.full === '1';
  const cols = full
    ? 'id,name,description,color,html,css,js,position,status,created_at'
    : 'id,name,description,color,position,status,created_at';
  const where = all ? '' : "WHERE status = 'approved'";
  const rows = db.prepare(`SELECT ${cols} FROM projects ${where} ORDER BY position ASC, created_at ASC`).all();
  res.json(rows);
});

app.get('/api/projects/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Nicht gefunden' });
  if (row.status !== 'approved' && !isAdmin(req)) return res.status(404).json({ error: 'Nicht gefunden' });
  res.json(row);
});

app.post('/api/projects', requireAdmin, (req, res) => {
  const p = sanitizeProject(req.body || {});
  if (!p.name) return res.status(400).json({ error: 'Name ist erforderlich.' });
  if (!p.html && !p.css && !p.js) return res.status(400).json({ error: 'Füge HTML, CSS oder JavaScript hinzu.' });
  const id = crypto.randomUUID().slice(0, 8);
  const maxPos = db.prepare('SELECT COALESCE(MAX(position), -1) AS m FROM projects').get().m;
  db.prepare('INSERT INTO projects(id,name,description,color,html,css,js,position) VALUES(@id,@name,@description,@color,@html,@css,@js,@position)')
    .run({ id, position: maxPos + 1, ...p });
  res.status(201).json({ id });
});

// Public student submission — lands in the review queue as 'pending'.
app.post('/api/submit', (req, res) => {
  const p = sanitizeProject(req.body || {});
  if (!p.name) return res.status(400).json({ error: 'Dein Name ist erforderlich.' });
  if (!p.html && !p.css && !p.js) return res.status(400).json({ error: 'Füge HTML, CSS oder JavaScript hinzu.' });
  const id = crypto.randomUUID().slice(0, 8);
  const maxPos = db.prepare('SELECT COALESCE(MAX(position), -1) AS m FROM projects').get().m;
  db.prepare("INSERT INTO projects(id,name,description,color,html,css,js,position,status) VALUES(@id,@name,@description,@color,@html,@css,@js,@position,'pending')")
    .run({ id, position: maxPos + 1, ...p });
  res.status(201).json({ id, status: 'pending' });
});

// Admin moderation: approve a pending submission (or set it back to pending).
app.post('/api/projects/:id/status', requireAdmin, (req, res) => {
  const status = req.body?.status === 'pending' ? 'pending' : 'approved';
  const info = db.prepare('UPDATE projects SET status = ? WHERE id = ?').run(status, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Nicht gefunden' });
  res.json({ ok: true, status });
});

app.put('/api/projects/:id', requireAdmin, (req, res) => {
  const exists = db.prepare('SELECT id FROM projects WHERE id = ?').get(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Nicht gefunden' });
  const p = sanitizeProject(req.body || {});
  if (!p.name) return res.status(400).json({ error: 'Name ist erforderlich.' });
  if (!p.html && !p.css && !p.js) return res.status(400).json({ error: 'Füge HTML, CSS oder JavaScript hinzu.' });
  db.prepare('UPDATE projects SET name=@name,description=@description,color=@color,html=@html,css=@css,js=@js WHERE id=@id')
    .run({ id: req.params.id, ...p });
  res.json({ ok: true });
});

app.delete('/api/projects/:id', requireAdmin, (req, res) => {
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Nicht gefunden' });
  res.json({ ok: true });
});

app.post('/api/reorder', requireAdmin, (req, res) => {
  const ids = Array.isArray(req.body?.ids) ? req.body.ids : [];
  const update = db.prepare('UPDATE projects SET position = ? WHERE id = ?');
  const tx = db.transaction((list) => { list.forEach((id, i) => update.run(i, id)); });
  tx(ids);
  res.json({ ok: true });
});

// Bulk import (replaces all projects). Used by the admin Import button.
app.post('/api/import', requireAdmin, (req, res) => {
  const items = Array.isArray(req.body?.students) ? req.body.students : [];
  const settings = req.body?.settings || {};
  const insert = db.prepare('INSERT INTO projects(id,name,description,color,html,css,js,position) VALUES(@id,@name,@description,@color,@html,@css,@js,@position)');
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM projects').run();
    items.forEach((raw, i) => {
      const p = sanitizeProject(raw);
      if (!p.name) return;
      insert.run({ id: crypto.randomUUID().slice(0, 8), position: i, ...p });
    });
    if (settings.title) setSetting('title', String(settings.title));
    if (settings.subtitle !== undefined) setSetting('subtitle', String(settings.subtitle));
  });
  tx();
  res.json({ ok: true });
});

// --- Live project page ----------------------------------------------------
app.get('/p/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  const notFound = () => res.status(404).type('html').send('<!doctype html><meta charset="utf-8"><title>Nicht gefunden</title><body style="font-family:system-ui;padding:2rem"><h1>404</h1><p>Dieses Projekt existiert nicht.</p>');
  if (!row) return notFound();
  // Pending submissions are not public; only an authenticated admin can preview.
  if (row.status !== 'approved' && !isAdmin(req)) return notFound();
  res.type('html').send(buildPage(row));
});

// --- Static frontend ------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Showcase running on http://localhost:${PORT}`);
});
