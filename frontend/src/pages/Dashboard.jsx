import { useLanguage } from "../context/LanguageContext"; // Import language context
import { translations } from "../translations"; // Import translations
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const Dashboard = () => {
  const { language } = useLanguage(); // Get current language from context
  const { user } = useAuth0(); // Access user data from Auth0

  // If user data exists, use their name (or email if name is not available), otherwise use a fallback message
  const userName = user?.name || "User"; // Display the user's name or fallback to "User"
  const userEmail = user?.email || "No email available"; // Display the user's email or fallback to "No email available"

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