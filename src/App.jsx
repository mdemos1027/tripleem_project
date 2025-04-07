import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Layout and Pages
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Trades from "./pages/Trades";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Workspace from './pages/AIAgent/Workspace';
import Integration from './pages/AIAgent/Integration';
import SettingsNew from './pages/AIAgent/SettingsNew';
import Login from "./pages/Login";
import Register from './pages/Register';
import ContactSupport from './pages/HelpCenter/ContactSupport';
import FAQ from './pages/HelpCenter/FAQ';
import KnowledgeBase from './pages/HelpCenter/KnowledgeBase';
import VideoTutorials from './pages/HelpCenter/VideoTutorials';
import CRMDatabasesCredentials from './pages/Configuration/CRMDatabasesCredentials';
import PlatformsCredentials from './pages/Configuration/PlatformsCredentials';
import ConfigurationSettings from './pages/Configuration/Settings';
import Permissions from './pages/Configuration/Permissions';

// Language Context
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("[App] Running in dev mode — auth bypassed.");
  }, []);

  return (
    <LanguageProvider>
      <Router>
        {/* Dev Debug Banner */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-black p-2 text-xs z-50">
            Auth Bypassed: Developer Mode
          </div>
        )}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<div className="h-screen flex items-center justify-center">{t('unauthorizedMessage', "You don't have permission to access this page")}</div>} />

          {/* Main Routes */}
          <Route
            path="/"
            element={
              <MainLayout
                email="test@fake.com"
                username="dev"
                userRoles={["Admin"]}
              />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="trades" element={<Trades />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="history" element={<History />} />
            <Route path="reports" element={<Reports />} />

            <Route path="helpcenter/knowledgebase" element={<KnowledgeBase />} />
            <Route path="helpcenter/faq" element={<FAQ />} />
            <Route path="helpcenter/videotutorials" element={<VideoTutorials />} />
            <Route path="helpcenter/contactsupport" element={<ContactSupport />} />

            <Route path="configuration/crmdatabasescredentials" element={<CRMDatabasesCredentials />} />
            <Route path="configuration/platformscredentials" element={<PlatformsCredentials />} />
            <Route path="configuration/settings" element={<ConfigurationSettings />} />
            <Route path="configuration/permissions" element={<Permissions />} />

            {/* Previously protected admin-only routes */}
            <Route path="aiagent/workspace" element={<Workspace />} />
            <Route path="aiagent/settingsnew" element={<SettingsNew />} />
            <Route path="aiagent/integration" element={<Integration />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
