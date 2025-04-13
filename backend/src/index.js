// 📁 backend/src/index.js
// 🚀 Main Express server

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import inviteRoutes from './routes/inviteRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // ✅ only allow frontend origin
  credentials: true                // ✅ allow cookies/authorization headers
}));

app.use(express.json());

app.use('/api', userRoutes);               // ✅ includes /api/me and /api/users/*
app.use('/api/invite', inviteRoutes);      // 🧾 Admin invites new users

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () =>
  console.log(`🚀 Backend API ready at http://localhost:${PORT}`)
);
