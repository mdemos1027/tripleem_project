import { auth0 } from '../utils/auth0Client.js';
import pool from '../db.js';

export const inviteUser = async (req, res) => {
  const { email, name, role_id, client_id, brand_id } = req.body;
  const tokenData = req.auth; // JWT decoded by checkJwt middleware

  try {
    // Step 1: Confirm the requester is in DB and has admin role
    const requester = await pool.query(
      `SELECT u.role_id, r.name AS role_name
       FROM tripleem_db.users u
       LEFT JOIN tripleem_db.roles r ON u.role_id = r.id
       WHERE u.email = $1`,
      [tokenData.email]
    );

    if (!requester.rowCount || requester.rows[0].role_name !== 'admin') {
      return res.status(403).json({ message: 'Only admins can invite users' });
    }

    // Step 2: Create user in Auth0
    const newUser = await auth0.createUser({
      connection: 'Username-Password-Authentication',
      email,
      name,
      password: Math.random().toString(36).slice(-10),
      email_verified: false
    });

    // Step 3: Save user in Postgres
    await pool.query(
      `INSERT INTO tripleem_db.users 
       (auth0_id, email, name, role_id, client_id, brand_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newUser.user_id, email, name, role_id, client_id, brand_id]
    );

    res.status(201).json({ message: 'User invited successfully' });

  } catch (err) {
    console.error('Invite error:', err.message);
    res.status(500).json({ message: 'Failed to invite user', error: err.message });
  }
};
