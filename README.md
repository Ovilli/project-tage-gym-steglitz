# Tage Gym Steglitz – Schülerprojekte-Übersicht

Eine Website zur Präsentation von Schüler-Webprojekten mit einem **echten Backend**.
Projekte werden serverseitig in SQLite gespeichert, und jedes Projekt wird unter
einer eigenen URL als Live-Seite ausgeliefert – ein QR-Code zeigt also auf eine
tatsächlich funktionierende Seite, auf jedem Gerät.

Es liegen **zwei austauschbare Backend-Varianten** bei – eine reicht. Beide bieten
dieselbe HTTP-API, liefern dasselbe `public/`-Frontend aus und nutzen dasselbe
SQLite-Schema (sie können sogar dieselbe `data/showcase.db` teilen):

- **Node + Express + SQLite** (`better-sqlite3`) – `server.js`
- **Ruby + Sinatra + SQLite** – `ruby/app.rb`

Keine externe Datenbank und kein Cloud-Konto nötig.

## Mit Docker starten (empfohlen)

Node-Backend (Standard):

```bash
ADMIN_PASSWORD="sicheres-passwort-waehlen" docker compose up --build -d
```

Ruby-Backend stattdessen:

```bash
ADMIN_PASSWORD="sicheres-passwort-waehlen" docker compose --profile ruby up --build -d showcase-ruby
```

Erreichbar unter http://localhost:3000 . Die SQLite-Datenbank liegt persistent in
`./data` (als Volume eingebunden), Projekte überstehen also Neustarts und Rebuilds.

## Ohne Docker starten

Node:

```bash
npm install
ADMIN_PASSWORD="sicheres-passwort-waehlen" npm start    # -> http://localhost:3000
```

Ruby:

```bash
cd ruby && bundle install
ADMIN_PASSWORD="sicheres-passwort-waehlen" ruby app.rb   # -> http://localhost:3000
```

## Konfiguration (Umgebungsvariablen)

| Variable         | Standard                | Zweck                                                        |
|------------------|-------------------------|--------------------------------------------------------------|
| `ADMIN_PASSWORD` | _(nicht gesetzt)_       | Passwort für die Admin-Seite. **Nicht gesetzt = Admin schreibgeschützt / deaktiviert.** |
| `PORT`           | `3000`                  | HTTP-Port.                                                   |
| `DB_PATH`        | `./data/showcase.db`    | Speicherort der SQLite-Datei.                                |

## Öffentlich bereitstellen (für den Server-Betrieb)

1. Container/Dienst auf Port `3000` starten (siehe oben), mit gesetztem `ADMIN_PASSWORD`.
2. Einen Reverse-Proxy (nginx, Caddy oder Traefik) auf Port 3000 zeigen lassen.
3. **HTTPS am Reverse-Proxy terminieren** – die Anwendung selbst spricht nur HTTP.
4. `./data` sichern (enthält alle Projekte).

## So laden Schüler hoch (Prüf-Warteschlange)

1. Ein Schüler öffnet **Projekt einreichen** (`/submit.html`), fügt sein HTML/CSS/JS
   ein, prüft per Vorschau und sendet ab.
2. Die Einreichung wird als **wartend** gespeichert – sie ist auf der öffentlichen
   Seite unsichtbar, und ihre `/p/:id`-Seite liefert für alle außer einem
   angemeldeten Admin 404.
3. In der Admin-Seite zeigen wartende Einreichungen ein Abzeichen „Wartet auf
   Prüfung“. Der Admin kann **Vorschau**, **Bearbeiten** und dann **Freigeben**
   (veröffentlichen) – oder löschen. Freigegebene Projekte lassen sich auch wieder
   **Zurückziehen** (auf wartend setzen).

## Seiten

- `/` – öffentliche Übersicht. Listet freigegebene Projekte, Live-Vorschau im
  Fenster, Suche und je Projekt einen **QR-Code / Teilen-Link** zur Live-Seite.
- `/submit.html` – öffentliches Upload-Formular für Schüler (landet in der Prüf-Warteschlange).
- `/admin.html` – Anmeldung mit `ADMIN_PASSWORD`, um Einreichungen zu prüfen/freizugeben,
  Projekte hinzuzufügen/zu bearbeiten/zu sortieren/zu löschen, Titel/Untertitel zu
  ändern und alle Daten als JSON zu im-/exportieren.
- `/p/:id` – die eigenständige Live-Seite eines freigegebenen Projekts.

## HTTP-API

| Methode | Pfad                       | Auth  | Beschreibung                                          |
|---------|----------------------------|-------|-------------------------------------------------------|
| POST    | `/api/login`               | –     | Admin-Passwort prüfen.                                |
| GET     | `/api/settings`            | –     | Titel/Untertitel der Übersicht.                       |
| PUT     | `/api/settings`            | admin | Titel/Untertitel ändern.                              |
| GET     | `/api/projects`            | –     | Freigegebene auflisten (`?full=1` Code; `?all=1` admin: inkl. wartend). |
| GET     | `/api/projects/:id`        | –     | Einzelnes Projekt (wartende nur für Admin sichtbar).  |
| POST    | `/api/submit`              | –     | Schüler-Einreichung → Prüf-Warteschlange.             |
| POST    | `/api/projects`            | admin | Freigegebenes Projekt anlegen.                        |
| POST    | `/api/projects/:id/status` | admin | Freigeben / zurückziehen (`{ status }`).              |
| PUT     | `/api/projects/:id`        | admin | Projekt ändern.                                       |
| DELETE  | `/api/projects/:id`        | admin | Projekt löschen.                                      |
| POST    | `/api/reorder`             | admin | Reihenfolge per `{ ids: [...] }`.                     |
| POST    | `/api/import`              | admin | Alle Projekte aus JSON ersetzen.                      |

Admin-Anfragen authentifizieren sich über den Header `x-admin-password` (die
Admin-Seite speichert ihn nach der Anmeldung im `sessionStorage`).

## Sicherheitshinweise

- Projektcode wird unverändert im Browser ausgeführt. Das Admin-Passwort ist damit
  der einzige Schutz dafür, wer Seiten veröffentlichen darf – ein starkes Passwort
  verwenden und im Betrieb über HTTPS ausliefern (TLS am Reverse-Proxy terminieren).
- Eine frische Datenbank wird mit drei Demo-Projekten befüllt, damit die Seite nie
  leer ist.
