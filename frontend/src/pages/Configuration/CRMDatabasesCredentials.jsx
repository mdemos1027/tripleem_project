import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext"; // Import language context
import { translations } from "../../translations"; // Import translations

const CRMDatabasesCredentials = () => {
  const { language } = useLanguage();

  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!host || !username || !password || !database) {
      setError(translations[language].fieldsRequired); // Show error if any field is missing
      setSuccessMessage("");
      return;
    }

    setSuccessMessage(translations[language].credentialsSaved); // Show success message on successful submission
    console.log("Credentials Submitted:", { host, username, password, database });
    setError(""); // Reset error message after successful submission
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">{translations[language].crmCredentials}</h2>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 text-sm text-red-500 bg-red-900 rounded">
          {error}
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-4 text-sm text-green-500 bg-green-900 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Host input */}
        <div>
          <label className="block text-sm text-white mb-1">{translations[language].host}</label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder={translations[language].hostPlaceholder}
          />
        </div>

        {/* Username input */}
        <div>
          <label className="block text-sm text-white mb-1">{translations[language].username}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder={translations[language].usernamePlaceholder}
          />
        </div>

        {/* Password input */}
        <div>
          <label className="block text-sm text-white mb-1">{translations[language].password}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder={translations[language].passwordPlaceholder}
          />
        </div>

        {/* Database input */}
        <div>
          <label className="block text-sm text-white mb-1">{translations[language].database}</label>
          <input
            type="text"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder={translations[language].databasePlaceholder}
          />
        </div>

        {/* Submit button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {translations[language].saveCredentials}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CRMDatabasesCredentials;
