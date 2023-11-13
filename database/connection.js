import pkg from "pg";
import users from "../model/user.model.js";
const { Pool } = pkg;
import dotenv from 'dotenv'; 
dotenv.config();

const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

// const connectionString =
const pool = new Pool(config);

// export const dbInit = async () => {
//     try {
//         const result = await pool.query("SELECT NOW()");
//         console.log("Database connected", result.rows[0].now)
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// };

export const db = async () => {
    try {
      const result = await pool.query("SELECT NOW()");
      console.log("Database connected", result.rows[0].now);
      await users ()
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  
export const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  };