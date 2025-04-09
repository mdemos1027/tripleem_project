// 📁 backend/src/db.js
// ⛳ Handles connection to PostgreSQL database

import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ store in .env
  ssl: { rejectUnauthorized: false },
});
