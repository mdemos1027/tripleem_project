export default function KnowledgeBase() {
  const categories = [
    {
      name: "Getting Started",
      articles: [
        { title: "Account Setup", views: 1245 },
        { title: "First Steps Guide", views: 892 }
      ]
    },
    {
      name: "Advanced Features",
      articles: [
        { title: "API Integration", views: 567 },
        { title: "Automation Rules", views: 421 }
      ]
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Knowledge Base</h1>
      
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
                    {article.views.toLocaleString()} views
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