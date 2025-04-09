const env = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
    DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true',
    AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
    AUTH0_SCOPE: import.meta.env.VITE_AUTH0_SCOPE
  }
  
  // Validation
  if (!env.API_BASE_URL) throw new Error('Missing VITE_API_BASE_URL')
  if (!env.AUTH0_DOMAIN) throw new Error('Missing VITE_AUTH0_DOMAIN')
  
  export default env