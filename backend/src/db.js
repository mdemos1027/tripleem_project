// 📁 backend/src/db.js
// ⛳ Handles connection to PostgreSQL database

import pkg from 'pg'; // PostgreSQL client
import dotenv from 'dotenv'; // Load environment variables

dotenv.config(); // Load .env file

const { Pool } = pkg; // Pool for managing connections efficiently

// Create a connection pool using .env credentials
export const pool = new Pool({
  host: process.env.DB_HOST,      // e.g. 'localhost' or RDS endpoint
  user: process.env.DB_USER,      // DB username
  password: process.env.DB_PASS,  // DB password
  database: process.env.DB_NAME,  // DB name
  port: process.env.DB_PORT,      // usually 5432 for PostgreSQL
});