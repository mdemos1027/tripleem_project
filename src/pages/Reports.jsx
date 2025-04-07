import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Reports = () => {
  const { language } = useLanguage();

  return <div>{translations[language].historyPage}</div>;
};

export default Reports;