// src/index.js – Main Express server for backend API

import express from 'express';
import cors from 'cors';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Auth0 middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Health check
app.get('/', (req, res) => {
  res.send('TripleEM API running ✅');
});

// Invite user – placeholder for now
app.post('/api/users/invite', checkJwt, async (req, res) => {
  const { name, email, role, client_id, group_id } = req.body;

  if (!email || !role || !client_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await pool.query(
      'INSERT INTO users (name, email, role, client_id, group_id) VALUES ($1, $2, $3, $4, $5)',
      [name, email, role, client_id, group_id || null]
    );

    // TODO: Auth0 Mgmt API call

    res.status(201).json({ message: 'User invited (mock)' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend API ready at http://localhost:${PORT}`));
