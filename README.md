# Yin

A project to help beginning learners of Mandarin Chinese visualize lexical tone by comparing their pitch curve with that of a native speaker.

The app is now a unified Next.js project in [app/](app) backed by PostgreSQL. The root `package.json` only orchestrates development startup.

## Quick Start

From the repository root, run:

```powershell
npm run dev:start
```

This will:

- Kill stale processes using ports `3000` and `8000`
- Start a PostgreSQL Docker container named `yin-postgres` and expose it on host port `5433`
- Seed the database from [app/database/postgres/seed.sql](app/database/postgres/seed.sql)
- Install app dependencies in [app/](app) if `node_modules` is missing
- Start the unified app locally on [http://localhost:3000](http://localhost:3000)

If you want the app itself to run in Docker, use:

```powershell
npm run dev:start:container
```

That path builds the `yin` container, joins it to the `yin-net` Docker network, and connects it to the same PostgreSQL instance.

## macOS Setup and Run

The project is designed to start with a PowerShell orchestration script, so macOS users should install the required tooling first and then run the same startup flow from the repo root.

### Prerequisites

Install these before running the app:

- Node.js LTS (18+ recommended)
- Python 3
- Docker Desktop for Mac
- PowerShell 7 (`pwsh`), installed from Homebrew as the `powershell` formula

If you use Homebrew, the quickest setup is:

```bash
brew update
brew install node python
brew install --cask docker
brew install powershell
```

Then start Docker Desktop and confirm it is running:

```bash
docker info
node -v
npm -v
python3 --version
pwsh -v
```

### Start the app on macOS

From the repository root, run:

```bash
pwsh -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1
```

If your shell has a `powershell` command available instead of `pwsh`, this also works:

```bash
powershell -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1
```

This script will:

- clear stale listeners on ports `3000` and `8000`
- create/start the PostgreSQL container named `yin-postgres`
- expose PostgreSQL on host port `5433`
- install app dependencies in the unified app under `app/` if needed
- launch the app at `http://localhost:3000`

After startup, open:

```text
http://localhost:3000
```

The local database connection is:

```text
postgresql://yin:yin@localhost:5433/yin
```

### Container mode on macOS

If you prefer to run the app itself in Docker instead of as a local Node process, use:

```bash
pwsh -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1 -UseContainer
```

This builds the app image and runs the app container while PostgreSQL remains in Docker on the same network.

### Common macOS options

You can also call the script with extra flags if you want to skip parts of the startup flow:

```bash
pwsh -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1 -SkipRestore
pwsh -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1 -SkipInstall
pwsh -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1 -SkipPortGuard
pwsh -ExecutionPolicy Bypass -File ./scripts/start-dev.ps1 -UseContainer
```

The port guard can also be run directly:

```bash
pwsh -ExecutionPolicy Bypass -File ./scripts/guard-dev-ports.ps1
```

### Troubleshooting

- If Docker reports that the daemon is not available, open Docker Desktop and wait for it to finish starting.
- If PowerShell is not found, install the `powershell` formula, reopen the terminal, or use `pwsh` explicitly.
- If the app says Python is missing, install Python 3 and ensure it is on your `PATH`.
- If a port is already in use, run the port guard script or stop the stale process before restarting.
- If dependencies are missing, run:

```bash
cd app
npm install
```

### Development Notes

- The application data layer uses PostgreSQL through Sequelize.
- The current app shell includes the language selector, signup toast, and other UI pieces inside the unified Next.js app.
- Local mode expects a Python runtime on `PATH` for pitch extraction; container mode is the fallback if Python is not installed locally.
- The main app listens on port `3000` and local development PostgreSQL listens on `5433`; the container still uses `5432` on the Docker network.

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

- [app/](app) contains the running Next.js app.
- [scripts/start-dev.ps1](scripts/start-dev.ps1) coordinates Postgres, dependency install, and app startup.
- [app/database/postgres/seed.sql](app/database/postgres/seed.sql) contains the SQL seed generated from the migrated data.
