import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Analysis = () => {
  const { language } = useLanguage();

  return <div>{translations[language].analysisWelcome}</div>;
};

export default Analysis;
