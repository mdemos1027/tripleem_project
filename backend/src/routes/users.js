// 📁 backend/src/routes/users.js
// 📌 Defines /api/users/* and /api/me endpoint

import express from 'express';
import {
  inviteUser,
  getUsers,
  getUserByAuth0Id
} from '../controllers/userController.js';
import { checkJwt } from '../middlewares/checkJwt.js';

const router = express.Router();

// 🔐 Protected endpoints
router.post('/invite', checkJwt, inviteUser);     // POST /api/invite
router.get('/', checkJwt, getUsers);              // GET  /api/
router.get('/me', checkJwt, getUserByAuth0Id);    // ✅ GET /api/me

export default router;
