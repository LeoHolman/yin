const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONTAINER_NAME = process.env.YIN_DB_CONTAINER || 'yin-postgres';
const DATABASE_NAME = process.env.YIN_DB_NAME || 'yin';
const DATABASE_USER = process.env.YIN_DB_USER || 'yin';
const SEED_PATH = path.join(__dirname, '..', 'database', 'postgres', 'seed.sql');

function ensurePostgresContainerIsRunning() {
  try {
    const containerList = execFileSync(
      'docker',
      ['ps', '--filter', `name=^${CONTAINER_NAME}$`, '--format', '{{.Names}}'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
    ).trim();

    if (!containerList.includes(CONTAINER_NAME)) {
      throw new Error(
        `PostgreSQL container '${CONTAINER_NAME}' is not running. Start it with the app startup script or run 'docker start ${CONTAINER_NAME}'.`
      );
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes(`'${CONTAINER_NAME}' is not running`)) {
      throw error;
    }

    throw new Error(
      `Unable to access Docker. Make sure Docker Desktop is running and the '${CONTAINER_NAME}' container exists.`
    );
  }
}

function ensureSeedFileExists() {
  if (!fs.existsSync(SEED_PATH)) {
    throw new Error(
      `Seed file not found at ${SEED_PATH}. Run 'npm run db:dump' first to generate it.`
    );
  }
}

function main() {
  ensurePostgresContainerIsRunning();
  ensureSeedFileExists();

  const seedSql = fs.readFileSync(SEED_PATH, 'utf8');

  execFileSync(
    'docker',
    [
      'exec',
      '-i',
      CONTAINER_NAME,
      'psql',
      '-v',
      'ON_ERROR_STOP=1',
      '-U',
      DATABASE_USER,
      '-d',
      DATABASE_NAME,
    ],
    {
      input: seedSql,
      stdio: ['pipe', 'inherit', 'inherit'],
      encoding: 'utf8',
    }
  );

  console.log(`Database '${DATABASE_NAME}' restored from ${SEED_PATH}`);
}

main();
