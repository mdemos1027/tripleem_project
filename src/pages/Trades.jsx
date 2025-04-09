import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Trades = () => {
  const { language } = useLanguage();

  return <div>{translations[language].tradesWelcome}</div>;
};

export default Trades;
