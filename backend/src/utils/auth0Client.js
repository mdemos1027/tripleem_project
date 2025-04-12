// backend/src/utils/auth0Client.js

import { ManagementClient } from 'auth0';
import dotenv from 'dotenv';

dotenv.config(); // Make sure env vars are loaded

console.log('🔐 Initializing Auth0 ManagementClient...');
console.log('📡 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
console.log('🔐 AUTH0_CLIENT_SECRET:', process.env.AUTH0_CLIENT_SECRET ? '✅ Loaded' : '❌ MISSING');

export const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'create:users read:users'
});
