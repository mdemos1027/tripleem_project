// 📁 backend/src/db.js
// ⛳ Handles connection to PostgreSQL database

import pkg from 'pg'; // PostgreSQL client
import dotenv from 'dotenv'; // Load environment variables

dotenv.config(); // Load .env file

const { Pool } = pkg; // Pool for managing connections efficiently

// Create a connection pool using .env credentials
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Export both named and default
export { pool };
export default pool;
