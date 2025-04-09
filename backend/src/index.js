// 📁 backend/src/index.js
// 🚀 Main Express server

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); // 🔐 All user endpoints

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () =>
  console.log(`🚀 Backend API ready at http://localhost:${PORT}`)
);
