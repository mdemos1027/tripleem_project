import { useState } from 'react';

const Integration = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');

  const handleSave = () => {
    localStorage.setItem('openai_api_key', apiKey);
    alert("API Key saved!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI Agent Integration</h2>
      <input
        type="password"
        className="w-full p-2 text-black rounded"
        placeholder="Enter your OpenAI API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
        Save API Key
      </button>
    </div>
  );
};

export default Integration;
