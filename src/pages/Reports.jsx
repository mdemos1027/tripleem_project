import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Reports = () => {
  const { language } = useLanguage();

  return <div>{translations[language].reportsWelcome}</div>;
};

export default Reports;