import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

const ConfigurationSettings = () => {
  const { language } = useLanguage();

  return <div>{translations[language].configurationSettingsPage}</div>;
};

export default ConfigurationSettings;
