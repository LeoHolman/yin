const fs = require('fs/promises');
const path = require('path');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

function splitSqlStatements(sql) {
  return sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);
}

async function seedDatabase() {
  const [{ count }] = await sequelize.query(
    'SELECT COUNT(*)::int AS count FROM users;',
    { type: QueryTypes.SELECT }
  );

  if (count > 0) {
    return false;
  }

  const seedPath = path.join(
    __dirname,
    '..',
    '..',
    'database',
    'postgres',
    'seed.sql'
  );
  const seedSql = await fs.readFile(seedPath, 'utf8');
  const statements = splitSqlStatements(seedSql);

  for (const statement of statements) {
    await sequelize.query(statement);
  }

  return true;
}

module.exports = { seedDatabase };