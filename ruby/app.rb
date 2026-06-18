# Ruby/Sinatra implementation of the Student Project Showcase backend.
# Mirrors the Node server (server.js): same HTTP API, same SQLite schema,
# same live /p/:id pages. Both servers can use the same data/showcase.db file.
require 'sinatra'
require 'sqlite3'
require 'json'
require 'securerandom'
require 'cgi'
require 'rack/utils'

# Repo layout puts public/ and data/ one level up from this file (ruby/..).
# In Docker the app is flattened, so PUBLIC_DIR / DB_PATH env vars override.
ROOT = File.expand_path('..', __dir__)
PUBLIC_DIR = ENV['PUBLIC_DIR'] || (File.directory?(File.join(__dir__, 'public')) ? File.join(__dir__, 'public') : File.join(ROOT, 'public'))

set :bind, '0.0.0.0'
set :port, (ENV['PORT'] || 3000).to_i
set :public_folder, PUBLIC_DIR
set :show_exceptions, false

ADMIN_PASSWORD = ENV['ADMIN_PASSWORD'].to_s
DB_PATH = ENV['DB_PATH'] || File.join(ROOT, 'data', 'showcase.db')

warn '[warn] ADMIN_PASSWORD is not set — admin writes are DISABLED.' if ADMIN_PASSWORD.empty?

# --- Database -------------------------------------------------------------
require 'fileutils'
FileUtils.mkdir_p(File.dirname(DB_PATH))
DB = SQLite3::Database.new(DB_PATH)
DB.results_as_hash = true
DB.busy_timeout = 5000
DB.execute 'PRAGMA journal_mode = WAL'
DB.execute_batch <<~SQL
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
  CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
SQL

# Migration: add status column to older databases.
cols = DB.execute('PRAGMA table_info(projects)').map { |c| c['name'] }
DB.execute("ALTER TABLE projects ADD COLUMN status TEXT NOT NULL DEFAULT 'approved'") unless cols.include?('status')

def get_setting(key, fallback)
  row = DB.get_first_row('SELECT value FROM settings WHERE key = ?', key)
  row ? row['value'] : fallback
end

def set_setting(key, value)
  DB.execute('INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', [key, value.to_s])
end

DEMO = [
  {
    'name' => 'Maria Gonzalez', 'description' => 'Animierte Begrüßungskarte mit CSS-Verlauf und Live-Uhr.', 'color' => '#7c3aed',
    'html' => '<main><h1>Hallo Steglitz!</h1><p>Heute ist <span id="day"></span>.</p><p class="time" id="clock">--:--:--</p></main>',
    'css' => 'body{margin:0;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;background:linear-gradient(135deg,#7c3aed,#1f3a5f);color:#fff}main{text-align:center;padding:2rem}h1{font-size:2.4rem;margin:0 0 .5rem}.time{font-size:2rem;font-variant-numeric:tabular-nums;letter-spacing:.05em}',
    'js' => 'const d=new Date();document.getElementById("day").textContent=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"][d.getDay()];function tick(){document.getElementById("clock").textContent=new Date().toLocaleTimeString();}tick();setInterval(tick,1000);'
  },
  {
    'name' => 'Jonas Weber', 'description' => 'Klickzähler-Button, dessen Farbe auf den Punktestand reagiert.', 'color' => '#0f766e',
    'html' => '<div class="wrap"><h1>Klick-Spiel</h1><button id="btn">Klick mich</button><p>Punkte: <strong id="score">0</strong></p></div>',
    'css' => 'body{margin:0;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;background:#0f172a;color:#e2e8f0}.wrap{text-align:center}button{font-size:1.2rem;padding:.8rem 1.6rem;border:0;border-radius:999px;cursor:pointer;background:#0f766e;color:#fff;transition:background .2s}strong{font-size:1.6rem}',
    'js' => 'let n=0;const b=document.getElementById("btn"),s=document.getElementById("score");b.addEventListener("click",()=>{n++;s.textContent=n;b.style.background=`hsl(${(n*20)%360} 70% 45%)`;});'
  },
  {
    'name' => 'Aylin Demir', 'description' => 'Mini-To-Do-Liste zum Hinzufügen und Entfernen von Aufgaben.', 'color' => '#b45309',
    'html' => '<div class="card"><h1>To-Do</h1><form id="f"><input id="i" placeholder="Neue Aufgabe" required><button>+</button></form><ul id="list"></ul></div>',
    'css' => 'body{margin:0;font-family:system-ui,sans-serif;background:#fef3c7;display:grid;place-items:center;min-height:100vh}.card{background:#fff;padding:1.5rem;border-radius:1rem;box-shadow:0 10px 30px rgba(0,0,0,.1);width:min(320px,90vw)}form{display:flex;gap:.5rem}input{flex:1;padding:.5rem;border:1px solid #ddd;border-radius:.5rem}button{border:0;background:#b45309;color:#fff;border-radius:.5rem;padding:0 .9rem;cursor:pointer}ul{list-style:none;padding:0}li{display:flex;justify-content:space-between;padding:.5rem;border-bottom:1px solid #eee;cursor:pointer}li:hover{background:#fff7ed}',
    'js' => 'const f=document.getElementById("f"),i=document.getElementById("i"),list=document.getElementById("list");f.addEventListener("submit",e=>{e.preventDefault();const li=document.createElement("li");li.textContent=i.value;const x=document.createElement("span");x.textContent="✕";li.appendChild(x);li.addEventListener("click",()=>li.remove());list.appendChild(li);i.value="";});'
  }
]

if get_setting('seeded', nil) != '1'
  count = DB.get_first_value('SELECT COUNT(*) FROM projects')
  if count.to_i.zero?
    DEMO.each_with_index do |p, i|
      DB.execute('INSERT INTO projects(id,name,description,color,html,css,js,position) VALUES(?,?,?,?,?,?,?,?)',
                 [SecureRandom.hex(4), p['name'], p['description'], p['color'], p['html'], p['css'], p['js'], i])
    end
  end
  set_setting('seeded', '1')
end

# --- Helpers --------------------------------------------------------------
helpers do
  def admin?
    return false if ADMIN_PASSWORD.empty?
    given = request.env['HTTP_X_ADMIN_PASSWORD'].to_s
    Rack::Utils.secure_compare(given, ADMIN_PASSWORD)
  end

  def require_admin!
    halt 401, json_response({ error: 'Nicht autorisiert' }) unless admin?
  end

  def json_response(obj)
    content_type :json
    obj.to_json
  end

  def body_json
    raw = request.body.read
    raw.empty? ? {} : JSON.parse(raw)
  rescue JSON::ParserError
    {}
  end

  def esc(value)
    CGI.escapeHTML(value.to_s)
  end

  def sanitize_project(body)
    color = body['color'].to_s
    {
      'name' => body['name'].to_s.strip,
      'description' => body['description'].to_s.strip,
      'color' => color =~ /\A#[0-9a-fA-F]{6}\z/ ? color : '#1f3a5f',
      'html' => body['html'].to_s,
      'css' => body['css'].to_s,
      'js' => body['js'].to_s
    }
  end

  def build_page(row)
    html = row['html'].to_s.empty? ? '<h1>Hallo</h1><p>Füge HTML auf der Admin-Seite hinzu.</p>' : row['html']
    css  = row['css'].to_s.empty? ? 'body { font-family: system-ui, sans-serif; padding: 2rem; }' : row['css']
    js   = row['js'].to_s
    <<~HTML
      <!doctype html>
      <html lang="en">
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>#{esc(row['name'])}</title>
      <style>#{css}</style>
      </head>
      <body>
      #{html}
      <script>
      #{js}
      </script>
      </body>
      </html>
    HTML
  end
end

# --- API: auth ------------------------------------------------------------
post '/api/login' do
  password = body_json['password'].to_s
  halt 503, json_response({ ok: false, error: 'Admin-Passwort ist auf dem Server nicht konfiguriert.' }) if ADMIN_PASSWORD.empty?
  halt 401, json_response({ ok: false, error: 'Falsches Passwort.' }) unless Rack::Utils.secure_compare(password, ADMIN_PASSWORD)
  json_response({ ok: true })
end

# --- API: settings --------------------------------------------------------
get '/api/settings' do
  json_response({
    title: get_setting('title', 'Schülerprojekte'),
    subtitle: get_setting('subtitle', 'Webentwicklung – Frühjahr 2025')
  })
end

put '/api/settings' do
  require_admin!
  body = body_json
  title = body['title'].to_s.strip
  set_setting('title', title.empty? ? 'Schülerprojekte' : title)
  set_setting('subtitle', body['subtitle'].to_s.strip)
  json_response({ ok: true })
end

# --- API: projects --------------------------------------------------------
get '/api/projects' do
  all = admin? && params['all'] == '1'
  full = params['full'] == '1'
  cols = full ? 'id,name,description,color,html,css,js,position,status,created_at'
              : 'id,name,description,color,position,status,created_at'
  where = all ? '' : "WHERE status = 'approved'"
  rows = DB.execute("SELECT #{cols} FROM projects #{where} ORDER BY position ASC, created_at ASC")
  json_response(rows)
end

get '/api/projects/:id' do
  row = DB.get_first_row('SELECT * FROM projects WHERE id = ?', params['id'])
  halt 404, json_response({ error: 'Nicht gefunden' }) unless row
  halt 404, json_response({ error: 'Nicht gefunden' }) if row['status'] != 'approved' && !admin?
  json_response(row)
end

# Public student submission — lands in the review queue as 'pending'.
post '/api/submit' do
  p = sanitize_project(body_json)
  halt 400, json_response({ error: 'Dein Name ist erforderlich.' }) if p['name'].empty?
  halt 400, json_response({ error: 'Füge HTML, CSS oder JavaScript hinzu.' }) if p['html'].empty? && p['css'].empty? && p['js'].empty?
  id = SecureRandom.hex(4)
  max_pos = DB.get_first_value('SELECT COALESCE(MAX(position), -1) FROM projects').to_i
  DB.execute("INSERT INTO projects(id,name,description,color,html,css,js,position,status) VALUES(?,?,?,?,?,?,?,?,'pending')",
             [id, p['name'], p['description'], p['color'], p['html'], p['css'], p['js'], max_pos + 1])
  status 201
  json_response({ id: id, status: 'pending' })
end

post '/api/projects' do
  require_admin!
  p = sanitize_project(body_json)
  halt 400, json_response({ error: 'Name ist erforderlich.' }) if p['name'].empty?
  halt 400, json_response({ error: 'Füge HTML, CSS oder JavaScript hinzu.' }) if p['html'].empty? && p['css'].empty? && p['js'].empty?
  id = SecureRandom.hex(4)
  max_pos = DB.get_first_value('SELECT COALESCE(MAX(position), -1) FROM projects').to_i
  DB.execute('INSERT INTO projects(id,name,description,color,html,css,js,position) VALUES(?,?,?,?,?,?,?,?)',
             [id, p['name'], p['description'], p['color'], p['html'], p['css'], p['js'], max_pos + 1])
  status 201
  json_response({ id: id })
end

post '/api/projects/:id/status' do
  require_admin!
  new_status = body_json['status'] == 'pending' ? 'pending' : 'approved'
  DB.execute('UPDATE projects SET status = ? WHERE id = ?', [new_status, params['id']])
  halt 404, json_response({ error: 'Nicht gefunden' }) if DB.changes.zero?
  json_response({ ok: true, status: new_status })
end

put '/api/projects/:id' do
  require_admin!
  halt 404, json_response({ error: 'Nicht gefunden' }) unless DB.get_first_row('SELECT id FROM projects WHERE id = ?', params['id'])
  p = sanitize_project(body_json)
  halt 400, json_response({ error: 'Name ist erforderlich.' }) if p['name'].empty?
  halt 400, json_response({ error: 'Füge HTML, CSS oder JavaScript hinzu.' }) if p['html'].empty? && p['css'].empty? && p['js'].empty?
  DB.execute('UPDATE projects SET name=?,description=?,color=?,html=?,css=?,js=? WHERE id=?',
             [p['name'], p['description'], p['color'], p['html'], p['css'], p['js'], params['id']])
  json_response({ ok: true })
end

delete '/api/projects/:id' do
  require_admin!
  DB.execute('DELETE FROM projects WHERE id = ?', params['id'])
  halt 404, json_response({ error: 'Nicht gefunden' }) if DB.changes.zero?
  json_response({ ok: true })
end

post '/api/reorder' do
  require_admin!
  ids = body_json['ids']
  ids = [] unless ids.is_a?(Array)
  DB.transaction do
    ids.each_with_index { |id, i| DB.execute('UPDATE projects SET position = ? WHERE id = ?', [i, id]) }
  end
  json_response({ ok: true })
end

post '/api/import' do
  require_admin!
  body = body_json
  items = body['students'].is_a?(Array) ? body['students'] : []
  settings = body['settings'].is_a?(Hash) ? body['settings'] : {}
  DB.transaction do
    DB.execute('DELETE FROM projects')
    items.each_with_index do |raw, i|
      p = sanitize_project(raw)
      next if p['name'].empty?
      DB.execute('INSERT INTO projects(id,name,description,color,html,css,js,position) VALUES(?,?,?,?,?,?,?,?)',
                 [SecureRandom.hex(4), p['name'], p['description'], p['color'], p['html'], p['css'], p['js'], i])
    end
    set_setting('title', settings['title'].to_s) if settings['title']
    set_setting('subtitle', settings['subtitle'].to_s) unless settings['subtitle'].nil?
  end
  json_response({ ok: true })
end

# --- Live project page ----------------------------------------------------
get '/p/:id' do
  row = DB.get_first_row('SELECT * FROM projects WHERE id = ?', params['id'])
  not_found = lambda do
    content_type :html
    halt 404, '<!doctype html><meta charset="utf-8"><title>Nicht gefunden</title><body style="font-family:system-ui;padding:2rem"><h1>404</h1><p>Dieses Projekt existiert nicht.</p>'
  end
  not_found.call unless row
  not_found.call if row['status'] != 'approved' && !admin?
  content_type :html
  build_page(row)
end

# --- Static frontend ------------------------------------------------------
get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end
