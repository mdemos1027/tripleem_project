// 📁 backend/src/routes/users.js
// 📌 Defines /api/users/* endpoints

import express from 'express';
import { inviteUser, getUsers } from '../controllers/userController.js';
import { checkJwt } from '../middlewares/checkJwt.js';

const router = express.Router();

router.post('/invite', checkJwt, inviteUser);
router.get('/', checkJwt, getUsers);

export default router;
