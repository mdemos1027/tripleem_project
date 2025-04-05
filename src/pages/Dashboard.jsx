import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from 'react-i18next'; // Import useTranslation for i18n

const Dashboard = () => {
  const { t } = useTranslation();  // Access the translation function from i18next
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1d2127] text-white">
        <p className="text-xl">{t('help')}</p> {/* Use the translated "help" message */}
      </div>
    );
  }

  if (!isAuthenticated) return <div className="text-white">{t('unauthorizedMessage')}</div>;  // Use translated "unauthorizedMessage"

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-xl font-semibold mb-4">{t('welcome')}, {user.name || user.email}</h2>
      <img src={user.picture} alt="avatar" className="w-12 h-12 rounded-full mb-4" />
      <p>{t('dashboardMessage')}</p>  {/* Translated dashboard message */}
    </div>
  );
};

export default Dashboard;
