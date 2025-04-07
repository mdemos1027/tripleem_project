import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

export default function KnowledgeBase() {
  const { language } = useLanguage();

  const categories = [
    {
      name: translations[language].gettingStarted,
      articles: [
        { title: translations[language].accountSetup, views: 1245 },
        { title: translations[language].firstSteps, views: 892 }
      ]
    },
    {
      name: translations[language].advancedFeatures,
      articles: [
        { title: translations[language].apiIntegration, views: 567 },
        { title: translations[language].automationRules, views: 421 }
      ]
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{translations[language].knowledgeBaseTitle}</h1>
      
      <div className="space-y-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">{category.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {category.articles.map((article, i) => (
                <div 
                  key={i} 
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {article.views.toLocaleString()} {translations[language].views}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
