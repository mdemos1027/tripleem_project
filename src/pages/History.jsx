import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const History = () => {
  const { language } = useLanguage();

  return <div>{translations[language].historyPage}</div>;
};

export default History;