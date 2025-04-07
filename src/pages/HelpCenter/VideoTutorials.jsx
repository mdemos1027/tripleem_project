import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

export default function VideoTutorials() {
  const { language } = useLanguage();

  const tutorials = [
    {
      title: translations[language].videoGettingStarted,
      duration: "4:32",
      thumbnail: "/placeholder-video-1.jpg"
    },
    {
      title: translations[language].videoAdvancedAnalytics,
      duration: "7:15",
      thumbnail: "/placeholder-video-2.jpg"
    },
    {
      title: translations[language].videoAPIIntegration,
      duration: "10:42",
      thumbnail: "/placeholder-video-3.jpg"
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{translations[language].videoTutorialsTitle}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((video, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gray-200 h-40 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <button className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                  ▶️
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{video.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{video.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
