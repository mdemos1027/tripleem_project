import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../translations";

const PlatformsCredentials = () => {
  const { language } = useLanguage();

  return <div>{translations[language].platformsCredentialsPage}</div>;
};

export default PlatformsCredentials;
