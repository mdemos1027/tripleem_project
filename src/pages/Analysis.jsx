import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Analysis = () => {
  const { language } = useLanguage();

  return <div>{translations[language].accountsWelcome}</div>;
};

export default Analysis;
