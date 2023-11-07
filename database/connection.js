import pkg from "pg";
const { Pool } = pkg;

// const config = {
//     host:
//     port:
//     database:
//     user:
//     password:
// };

// const connectionString =

export const pool = new Pool({connectionString});

export const dbInit = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected", result.rows[0].now);
    } catch (error) {
        console.error();
        process.exit(1);
    }
};