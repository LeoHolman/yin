const pg = require('pg');
const { Sequelize } = require('sequelize');

const databaseUrl =
  process.env.DATABASE_URL || 'postgresql://yin:yin@localhost:5432/yin';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
});

module.exports = { sequelize, databaseUrl };