import { auth0 } from '../utils/auth0Client.js';
import { pool } from '../db.js';

export const inviteUser = async (req, res) => {
  const { email, name, role_id, client_id, brand_id } = req.body;
  const tokenData = req.auth;
  const auth0Id = tokenData?.sub;

  console.log('🔐 Decoded token:', tokenData);

  if (!auth0Id) {
    return res.status(401).json({ message: 'Invalid token payload: missing Auth0 ID' });
  }

  try {
    // ✅ Step 1: Verify requester is an admin
    const requester = await pool.query(
      `SELECT u.role_id, r.name AS role_name
       FROM tripleem_db.users u
       LEFT JOIN tripleem_db.roles r ON u.role_id = r.id
       WHERE u.auth0_id = $1`,
      [auth0Id]
    );

    const roleName = requester.rows[0]?.role_name?.toLowerCase();

    if (!requester.rowCount || roleName !== 'admin') {
      return res.status(403).json({ message: 'Only admins can invite users' });
    }

    console.log('✅ Requester validated as admin.');
    console.log('📨 Creating user in Auth0...');

    // ✅ Step 2: Create user in Auth0
    const newUser = await auth0.users.create({
      connection: 'Username-Password-Authentication',
      email,
      name,
      password: Math.random().toString(36).slice(-10),
      email_verified: false
    });

    console.log('✅ User created in Auth0:', newUser.user_id);

    // ✅ Step 3: Save new user to Postgres
    await pool.query(
      `INSERT INTO tripleem_db.users 
       (auth0_id, email, name, role_id, client_id, brand_id)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newUser.user_id, email, name, role_id, client_id, brand_id]
    );

    res.status(201).json({ message: 'User invited successfully' });

  } catch (err) {
    console.error('❌ Invite error details:', err);
    res.status(500).json({
      message: 'Failed to invite user',
      error: err.message || JSON.stringify(err)
    });
  }
};
