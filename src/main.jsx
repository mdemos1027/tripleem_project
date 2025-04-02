import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "uno.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fzyagrbf0abxq7sy.us.auth0.com"
      clientId="71eSwGDrZV3MyI2t0CY1lVQoUz4OOCun"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-fzyagrbf0abxq7sy.us.auth0.com/api/v2/",
        scope: "openid profile email read:roles offline_access",
        prompt: "login" // Force fresh login each time for testing
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={(appState) => {
        console.log('Auth0 Redirect Callback:', appState);
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
