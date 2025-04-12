import express from 'express';
import { inviteUser } from '../controllers/inviteController.js';
import { checkJwt } from '../middlewares/checkJwt.js';

const router = express.Router();

router.post('/', checkJwt, inviteUser);

export default router;
