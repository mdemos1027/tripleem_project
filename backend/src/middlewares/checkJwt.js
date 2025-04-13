import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import dotenv from 'dotenv';

dotenv.config();

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: 'https://tripleem-api',
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
}).unless({
  custom: (req) => {
    console.log("🧪 Authorization Header:", req.headers.authorization); // <-- Check the token
    return false;
  }
});