// 📁 backend/src/controllers/userController.js
// 👥 Logic for managing users (inviting, listing)

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
