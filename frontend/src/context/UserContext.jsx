import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// UserProvider component to wrap the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchUserData = async () => {
      const res = await fetch('/api/me');
      const data = await res.json();
      setUser(data); // Assuming the response contains the user data
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
