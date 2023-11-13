import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config()


// 1# connection string
// const postgresConnection = new Sequelize(
//   "postgresql://postgres:i8Rs6gIBhupLX7qg@db.xrnbhmvnqsnmejaquois.supabase.co:5432/postgres"
// );

// 2# config
export const postgresConnection = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});