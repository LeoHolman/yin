# Yin

A project to help beginning learners of Mandarin Chinese visualize lexical tone by comparing their pitch curve with that of a native speaker.

The app is now a unified Next.js project in [yin/](yin) backed by PostgreSQL. The root `package.json` only orchestrates development startup.

## Quick Start

From the repository root, run:

```powershell
npm run dev:start
```

This will:

- Kill stale processes using ports `3000` and `8000`
- Start a PostgreSQL Docker container named `yin-postgres` and expose it on host port `5433`
- Seed the database from [yin/database/postgres/seed.sql](yin/database/postgres/seed.sql)
- Install app dependencies in [yin/](yin) if `node_modules` is missing
- Start the unified app locally on [http://localhost:3000](http://localhost:3000)

If you want the app itself to run in Docker, use:

```powershell
npm run dev:start:container
```

That path builds the `yin` container, joins it to the `yin-net` Docker network, and connects it to the same PostgreSQL instance.

## Startup Options

You can also call the PowerShell orchestrator directly:

```powershell
./scripts/start-dev.ps1 -SkipRestore
./scripts/start-dev.ps1 -SkipInstall
./scripts/start-dev.ps1 -SkipPortGuard
./scripts/start-dev.ps1 -UseContainer
```

The port guard can be run on its own if needed:

```powershell
./scripts/guard-dev-ports.ps1
```

## Development Notes

- The application data layer uses PostgreSQL through Sequelize.
- The current app shell includes the language selector, signup toast, and other UI pieces inside the unified Next.js app.
- Local mode expects a Python runtime on `PATH` for pitch extraction; container mode is the fallback if Python is not installed locally.
- The main app listens on port `3000` and local development PostgreSQL listens on `5433`; the container still uses `5432` on the Docker network.

## Project Layout

- [yin/](yin) contains the running Next.js app.
- [scripts/start-dev.ps1](scripts/start-dev.ps1) coordinates Postgres, dependency install, and app startup.
- [yin/database/postgres/seed.sql](yin/database/postgres/seed.sql) contains the SQL seed generated from the migrated data.
