// 📁 backend/src/middlewares/auth.js
// 🔐 Verifies JWT token from Auth0

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config(); // 🧪 Load .env values

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});