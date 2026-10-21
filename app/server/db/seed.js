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

async function hasExistingDatabaseData() {
  const coreTables = ['users', 'lessons', 'words', 'recordings', 'native_recordings'];

  for (const tableName of coreTables) {
    try {
      const result = await sequelize.query(
        `SELECT EXISTS (SELECT 1 FROM "${tableName}" LIMIT 1) AS exists;`,
        { type: QueryTypes.SELECT }
      );

      if (result[0]?.exists) {
        return true;
      }
    } catch (error) {
      // The table might not exist yet, which is fine; the seed should still initialize it.
    }
  }

  return false;
}

async function seedDatabase() {
  if (await hasExistingDatabaseData()) {
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