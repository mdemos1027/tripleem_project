import { useLanguage } from "../context/LanguageContext"; // Import language context
import { translations } from "../translations"; // Import translations
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import { useState, useEffect } from "react"; // Import hooks for fetching user data

const Dashboard = () => {
  const { language } = useLanguage(); // Get current language from context
  const { getAccessTokenSilently, isAuthenticated } = useAuth0(); // Access Auth0 data
  const [userInfo, setUserInfo] = useState(null); // State to hold user data from the backend

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Step 1: Get the access token
        const token = await getAccessTokenSilently();

        // Step 2: Fetch user data from the backend API
        const res = await fetch("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Step 3: Check if the response is ok and parse the data
        if (!res.ok) {
          throw new Error("Failed to fetch user data from backend");
        }

        const data = await res.json();

        // Step 4: Set the user data in state
        setUserInfo(data);

        // Save the user data in localStorage
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.name);
        localStorage.setItem("userRole", data.role);

      } catch (err) {
        console.error("Auth fetch failed:", err);
      }
    };

    if (isAuthenticated) {
      fetchUser(); // Fetch user data when the user is authenticated
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  // Step 5: Display a loading message if user data is not yet fetched
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  // Step 6: Use the name from the backend if available, otherwise fallback to email
  const userName = userInfo?.name ||  "User";
  const userEmail = userInfo?.email || "No email provided";
  const userRole = userInfo?.role || "No role provided";

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">
        {translations[language].welcome}, {userName} ( {userEmail} , {userRole})
      </h2>
      <p>{translations[language].dashboardMessage}</p>
    </div>
  );
};

export default Dashboard;
