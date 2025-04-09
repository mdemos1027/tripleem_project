import { useState } from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

const Integration = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const { language } = useLanguage(); // Get current language

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('openai_api_key', apiKey);
    alert(translations[language].apiKeySaved); // Translated alert
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{translations[language].aiAgentIntegration}</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="password"
          className="w-full p-2 text-black rounded"
          placeholder={translations[language].apiKeyPlaceholder}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          autoComplete="off"
        />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {translations[language].saveApiKey}
        </button>
      </form>
    </div>
  );
};

export default Integration;
