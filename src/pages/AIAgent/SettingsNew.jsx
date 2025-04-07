import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

const Settings = () => {
  const { language } = useLanguage();

  return <div>{translations[language].settingsPage}</div>;
};

export default Settings;
