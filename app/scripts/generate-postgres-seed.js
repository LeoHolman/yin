const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONTAINER_NAME = process.env.YIN_DB_CONTAINER || 'yin-postgres';
const DATABASE_NAME = process.env.YIN_DB_NAME || 'yin';
const DATABASE_USER = process.env.YIN_DB_USER || 'yin';
const OUTPUT_PATH = path.join(__dirname, '..', 'database', 'postgres', 'seed.sql');

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

function main() {
  ensurePostgresContainerIsRunning();

  const dumpSql = execFileSync(
    'docker',
    [
      'exec',
      CONTAINER_NAME,
      'pg_dump',
      '--username',
      DATABASE_USER,
      '--dbname',
      DATABASE_NAME,
      '--format',
      'plain',
      '--clean',
      '--if-exists',
      '--no-owner',
      '--no-privileges',
      '--inserts',
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  );

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, dumpSql, 'utf8');

  console.log(`PostgreSQL dump written to ${OUTPUT_PATH}`);
}

main();