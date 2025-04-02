import { useAuth0 } from "@auth0/auth0-react";
import { appConfig } from "../config/appConfig";
import { useEffect, useState } from "react";

const Login = () => {
  // Auth0 hooks
  const { loginWithRedirect, isAuthenticated, isLoading, error, getIdTokenClaims } = useAuth0();

  // State to manage roles and loading state
  const [roles, setRoles] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);

  
  // If user is already authenticated, fetch roles and redirect
  useEffect(() => {
    console.log("=== DEBUG START ===");
    if (isAuthenticated) {
      const checkRoles = async () => {
        try {
          const tokenClaims = await getIdTokenClaims();
          console.log("FULL TOKEN CLAIMS:", tokenClaims); // Debug
          console.log("=== DEBUG START ===");
          console.log("ALL TOKEN CLAIMS:", JSON.stringify(tokenClaims, null, 2)); // Full token dump
          console.log("USER OBJECT:", JSON.stringify(user, null, 2)); // Auth0 user object
          console.log("=== DEBUG END ===");
          
          // Check BOTH possible namespace formats
          const roles = tokenClaims['https://tripleem/roles'] ||  [];
          
          console.log("YOUR ROLES:", roles); // Verify here
          setRoles(roles);
          
          if (roles.length > 0) {
            localStorage.setItem('userRoles', JSON.stringify(roles));
            setIsRedirecting(true);
          }
        } catch (err) {
          console.error("Failed to get roles:", err);
        }
      };
      
      checkRoles();
    }
  }, [isAuthenticated, getIdTokenClaims]);

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
          src={appConfig.logoUrl}
          alt={appConfig.appName}
          className="h-12 mb-6 mx-auto"
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
