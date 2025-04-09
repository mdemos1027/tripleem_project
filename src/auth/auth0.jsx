export const getRoles = (user) => {
  return user?.['https://tripleem/roles'] || []; 
};

// Simple role check helper
export const hasRole = (user, requiredRole) => {
  return getRoles(user).includes(requiredRole);
};