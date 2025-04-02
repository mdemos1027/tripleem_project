import { useState } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Navigate to Settings > Security and click 'Reset Password'."
    },
    {
      question: "Where can I find my API keys?",
      answer: "API keys are available under Account Settings > Developer."
    },
    {
      question: "How to enable two-factor authentication?",
      answer: "Go to Security Settings and follow the 2FA setup wizard."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="font-medium">{faq.question}</h3>
              <span className="text-gray-500">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 pt-0 text-gray-600 border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}