# Yin Project Manifest

This document explains the current project layout and shows which files are active, which are historical, and which are likely safe to archive or remove to reduce confusion.

## Executive summary

The active application is the unified Next.js app under `app/`.

The project root is mostly orchestration and infrastructure glue:

- the root `package.json` starts the dev environment
- `scripts/start-dev.ps1` starts PostgreSQL and launches the app
- the real app runtime lives in `app/`
- the root `yin/` folder appears to be an older or legacy copy of the app and does not appear to be part of the current startup path

In short: the real repo is centered on `app/`, not on the old root-level `yin/` folder.

---

## Active runtime structure

### Root-level entry points

- `package.json`
  - Root-level project entry point for local orchestration
  - Current scripts:
    - `npm run dev:start` → launches the PowerShell dev bootstrap script
    - `npm run dev:start:container` → runs the Dockerized version
  - This file is not the app itself; it is the coordinator for startup

- `scripts/start-dev.ps1`
  - Boots PostgreSQL in Docker
  - Clears stale listeners on ports 3000 and 8000
  - Ensures dependencies are installed
  - Starts the app in the `app/` directory

- `scripts/guard-dev-ports.ps1`
  - Cleans up stale port listeners so local dev does not fail on reused ports

- `README.md`
  - User-facing setup and operational documentation

- `.env.example`
  - Template for environment variables, if used by local deployment configuration

---

### The real app: `app/`

This is the current application directory and should be treated as the main project.

- `app/server.js`
  - Main app bootstrapping file
  - Creates the Express + Next server
  - Mounts routers and static upload serving
  - Connects to PostgreSQL using Sequelize

- `app/package.json`
  - App-specific package configuration
  - Actual runtime scripts live here:
    - `dev` → file-watching server start
    - `build` → production Next build
    - `start` → production server start

- `app/next.config.js`
  - Next.js configuration

- `app/server/`
  - Backend server code
  - `server/db/` → DB connection and seed logic
  - `server/models/` → Sequelize models
  - `server/routers/` → API routes such as words, lessons, users, recordings, pitch extraction
  - `server/services/` → audio processing, pitch extraction, and backend helper logic
  - `server/uploads/` → uploaded media and stored audio paths

- `app/src/`
  - Client-side React + Next app code
  - `src/components/` → reusable UI components
  - `src/pages/` or related app pages → frontend routes
  - `src/assets/` → images and static files used in the UI

- `app/public/`
  - Public static assets for the Next app

- `app/database/postgres/seed.sql`
  - Canonical seed data used to initialize the PostgreSQL database on first boot

- `app/Dockerfile`
  - Container definition for the app when run in Docker

---

## Supporting data and test infrastructure

### `database/`

This directory contains older JSON-based database exports and legacy snapshots, mostly used as migration and historical reference data.

Examples:

- `users.json`
- `lessons.json`
- `words.json`
- `recordings.json`
- `nativerecordings.json`
- `quizscores.json`

It also contains older archive folders such as:

- `yin-1-2-3/`
- `yin-1-2-3-4/`
- `yin-1-2-3-4-5/`
- `yin-upto-lesson3/`
- `yin-with-lesson1/`
- `yin-database-fake-content/`

These look like historical or migration snapshots. They are not the live app database and should be treated as reference material unless someone is actively using them for recovery or migration work.

### `tests/`

- Robot test automation files for smoke and UI validation
- `test_login.robot`, `test_lessons.robot`, and supporting resources under `tests/resources/`

This is useful for regression testing but is not part of runtime behavior.

### `deploy/`

- `nginx-yin.conf`
- `yin.service`

These look like deployment or service configuration files for hosting the app under a service/process manager or reverse proxy setup.

### `public/`

This root-level static public folder exists, but the active app already has a public folder under `app/public/`. There is a chance this root folder is stale or only used for older hosting patterns.

---

## Likely cleanup candidates

These are the biggest candidates to streamline the repo:

### Keep

- `app/` — active app
- `scripts/` — startup scripts
- `tests/` — validation
- `deploy/` — deployment config if still used
- `README.md` — documentation
- `package.json` — entrypoint
- `app/database/postgres/seed.sql` — active seed data

### Potentially archive or remove


- root `public/`
  - likely redundant if `app/public/` is the operating app
- historical JSON dumps under `database/`
  - useful only as legacy migration archives
- `cookies.txt`
  - local/session artifact, not part of the app
- `notes.md`
  - useful as ad hoc notes, but not a runtime or repo artifact; could be moved into a docs folder if retained

