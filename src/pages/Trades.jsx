import { useLanguage } from "../context/LanguageContext"; // Import language context
import { translations } from "../translations"; // Import translations

const Trades = () => {
  const { language } = useLanguage(); // Get current language from context


  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">
        {translations[language].welcome}
      </h2>
      <p>{translations[language].dashboardMessage}</p>
    </div>
  );
};

export default Trades;
