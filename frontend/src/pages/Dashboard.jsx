import { useLanguage } from "../context/LanguageContext"; // Import language context
import { translations } from "../translations"; // Import translations
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import { useEffect, useState } from "react"; // Import hooks for fetching user data

const Dashboard = () => {
  const { language } = useLanguage(); // Get current language from context
  const { getAccessTokenSilently, isAuthenticated } = useAuth0(); // Access Auth0 data
  const [userInfo, setUserInfo] = useState(null); // State to hold user data from the backend

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getAccessTokenSilently(); // Get the access token
        const res = await fetch("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json(); // Parse the user data
        setUserInfo(data); // Set the user data in state
      } catch (err) {
        console.error("Auth fetch failed:", err);
      }
    };

    if (isAuthenticated) {
      fetchUser(); // Fetch user data if authenticated
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  // If no user info is loaded yet, display a loading message
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Use the name from the backend if available, otherwise fallback to email
  const userName = userInfo?.name || userInfo?.email || "User";

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">
        {translations[language].welcome}, {userName}
      </h2>
      <p>{translations[language].dashboardMessage}</p>
    </div>
  );
};

export default Dashboard;
