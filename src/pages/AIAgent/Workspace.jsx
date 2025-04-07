import { useState, useRef, useEffect } from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

const Workspace = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const inputRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim() || !apiKey.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error?.message || translations[language].genericError);
        return;
      }

      const reply = data.choices?.[0]?.message;
      if (reply) {
        setMessages([...newMessages, reply]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert(translations[language].networkError);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-3xl mx-auto px-4 py-6">
      {/* API Key Input */}
      <div className="mb-4 flex gap-2">
        <input
          type="password"
          className="flex-1 p-2 rounded border text-sm text-black"
          placeholder={translations[language].apiKeyPlaceholder}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-[#1e1e1e] p-4 rounded shadow-inner space-y-4 border border-gray-700">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user'
                ? 'ml-auto bg-blue-600 text-white'
                : 'mr-auto bg-gray-700 text-green-300'
            }`}
          >
            <div className="text-sm">{msg.content}</div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">{translations[language].thinking}</div>}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          className="flex-1 p-3 rounded border text-sm text-black"
          placeholder={translations[language].askPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading || !apiKey}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? translations[language].sending : translations[language].send}
        </button>
      </div>
    </div>
  );
};

export default Workspace;
