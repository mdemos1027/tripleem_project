import { useAuth0 } from "@auth0/auth0-react";
import { appConfig } from "../config/appConfig";

const Login = () => {
  // Auth0 hooks
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

  // While Auth0 is checking session
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1d2127] text-white">
        <p className="text-xl">Verifying session...</p>
      </div>
    );
  }

  // If user is already authenticated, head to Dashboard
  if (isAuthenticated) window.location.href = "/dashboard";

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
