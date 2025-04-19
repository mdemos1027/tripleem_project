import { useAuth0 } from "@auth0/auth0-react";
import { appConfig } from "../config/appConfig";
import { useEffect, useState } from "react";
import logo from '../assets/Logo.png';

const Login = () => {
  // Auth0 hooks
  const { loginWithRedirect, isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();

  // State to manage roles and loading state
  const [roles, setRoles] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // If user is already authenticated, fetch roles and redirect
  useEffect(() => {
    console.log("=== DEBUG START ===");
    if (isAuthenticated) {
      const fetchRolesFromDB = async () => {
        try {
          // Get the access token for the API call
          const token = await getAccessTokenSilently();
          
          // Fetch user roles from the backend
          const res = await fetch("http://localhost:5000/api/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch user roles from the backend");
          }

          const data = await res.json();
          console.log("User data from DB:", data);
          
          // Assuming roles are returned in 'data.role' (or similar)
          const userRoles = data?.role ? [data.role] : []; // Adjust according to your API response structure
          setRoles(userRoles);

          // Save the roles in localStorage
          if (userRoles.length > 0) {
            localStorage.setItem('userRoles', JSON.stringify(userRoles));
            setIsRedirecting(true);
          }
        } catch (err) {
          console.error("Failed to fetch roles from the backend:", err);
        }
      };

      fetchRolesFromDB();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  // Redirect after roles are fetched
  useEffect(() => {
    if (isRedirecting) {
      window.location.href = "/dashboard";
    }
  }, [isRedirecting]);

  // If user is authenticated, show roles and a message, else show the login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2127] text-white">
      <div className="bg-[#2f343f] p-8 w-[400px] rounded shadow text-center">
        <img
          src={logo}
          alt={appConfig.appName}
          className="h-16 mb-6 mx-auto"
        />

        {/* Display any Auth0 login errors, if they occur */}
        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error.message}
          </p>
        )}

        {/* Display the role if available */}
        {isAuthenticated && roles.length > 0 && !isRedirecting && (
          <p className="text-green-400 mt-4">
            You are logged in with roles: {roles.join(", ")}
          </p>
        )}

        <button
          onClick={() => loginWithRedirect()} // Normal login flow
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-2"
        >
          Login with Auth0
        </button>

        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                screen_hint: "signup", // Tells Auth0 to show the signup form
              },
            })
          }
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Register New Account
        </button>
      </div>
    </div>
  );
};

export default Login;
