import { useState } from 'react';
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

export default function FAQ() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: translations[language].faqQ1,
      answer: translations[language].faqA1
    },
    {
      question: translations[language].faqQ2,
      answer: translations[language].faqA2
    },
    {
      question: translations[language].faqQ3,
      answer: translations[language].faqA3
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{translations[language].faqTitle}</h1>

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
