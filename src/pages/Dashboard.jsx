import { useLanguage } from "../context/LanguageContext"; // Import language context
import { translations } from "../translations"; // Import translations

const Dashboard = () => {
  const { language } = useLanguage(); // Get current language from context

  const userEmail = "test4@test4.com"; // Static email, replace with actual logic if needed

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">
        {translations[language].welcome}, {userEmail}
      </h2>
      <p>{translations[language].dashboardMessage}</p>
    </div>
  );
};

export default Dashboard;