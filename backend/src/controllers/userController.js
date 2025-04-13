// 📁 backend/src/controllers/userController.js
// 👥 Logic for managing users (inviting, listing, fetching self)

import { pool } from '../db.js';

// ➕ Invite user
export const inviteUser = async (req, res) => {
  try {
    const { name, email, role, client_id, group_id } = req.body;
    await pool.query(
      'INSERT INTO users (name, email, role, client_id, group_id) VALUES ($1, $2, $3, $4, $5)',
      [name, email, role, client_id, group_id || null]
    );
    res.status(201).json({ message: 'User invited' });
  } catch (err) {
    console.error('Invite error:', err);
    res.status(500).json({ error: 'Internal error' });
  }
};

// 📋 Get all users
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// 🙋‍♂️ Get current user from Auth0 ID (called by /api/me)
export const getUserByAuth0Id = async (req, res) => {
  console.log("🧪 Authorization Header:", req.headers.authorization); // Check if token is sent
  console.log("🔐 req.auth object:", req.auth); // Check if middleware decoded the token
  console.log("🛠 req.auth.payload:", req.auth?.payload); // Check payload details

  const auth0Id = req?.auth?.sub;

  if (!auth0Id) {
    console.warn("⚠️ Missing or invalid token. Returning 401.");
    return res.status(401).json({ error: 'Unauthorized: token missing or invalid' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM tripleem_db.users WHERE auth0_id = $1',
      [auth0Id]
    );

    if (rows.length === 0) {
      console.warn("❌ No user found for Auth0 ID:", auth0Id);
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    res.json({
      name: user.name,
      email: user.email,
      role: user.role_id,
      client_id: user.client_id,
      brand_id: user.brand_id,
      permissions: user.permissions,
    });
  } catch (err) {
    console.error('❌ DB error in getUserByAuth0Id:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};