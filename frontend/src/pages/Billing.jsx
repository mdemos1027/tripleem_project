// pages/Billing.jsx
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Billing = () => {
  const { language } = useLanguage();
  return <div>{translations[language].billingPage}</div>;
};

export default Billing;