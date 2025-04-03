import { useState } from "react";

const CRMDatabasesCredentials = () => {
  // States to store form values
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!host || !username || !password || !database) {
      setError("All fields are required!");
      return;
    }

    // Simulate an API call or backend interaction to validate the credentials
    // For now, we'll just log the credentials to the console.
    // Here you would ideally call an API to validate or use the credentials.
    setSuccessMessage("CRM Database credentials saved successfully!");
    console.log("Credentials Submitted:", { host, username, password, database });

    // Reset error message after successful submission
    setError("");
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">CRM Database Credentials</h2>
      
      {/* Error message display */}
      {error && (
        <div className="mb-4 p-4 text-sm text-red-500 bg-red-900 rounded">
          {error}
        </div>
      )}

      {/* Success message display */}
      {successMessage && (
        <div className="mb-4 p-4 text-sm text-green-500 bg-green-900 rounded">
          {successMessage}
        </div>
      )}

      {/* Form for CRM Database Credentials */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-white mb-1">Host</label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder="Enter MySQL Host"
          />
        </div>
        
        <div>
          <label className="block text-sm text-white mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder="Enter MySQL Username"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder="Enter MySQL Password"
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Database</label>
          <input
            type="text"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
            className="w-full px-3 py-2 bg-[#1d2127] border border-gray-600 rounded text-white"
            placeholder="Enter Database Name"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Save Credentials
          </button>
        </div>
      </form>
    </div>
  );
};

export default CRMDatabasesCredentials;
