import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),

  port: process.env.DB_PORT,

  max: process.env.DB_MAX_CONNECTIONS,
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT,
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT,
  maxLifetimeSeconds: process.env.DB_MAX_LIFETIME,
});

export async function connectDB() {
  try {
    await pool.query("SELECT 1");
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Database connection failed", error);
  }
}
