import pg from 'pg';
import { Sequelize } from 'sequelize';

// get secrets from env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialect: 'postgres',
  dialectModule: pg,
});

export default sequelize;
