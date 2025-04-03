import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// Layout and Pages
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Trades from "./pages/Trades";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Test11 from './pages/test1/Test11';
import Test12 from './pages/test1/Test12';
import Workspace from './pages/AIAgent/Workspace';
import Integration from './pages/AIAgent/Integration';
import SettingsNew from './pages/AIAgent/SettingsNew';
import Login from "./pages/Login";
import Register from './pages/Register';
// Add this import at the top with other imports
import HelpCenterLayout from './pages/HelpCenter/HelpCenterLayout';
import ContactSupport from './pages/HelpCenter/ContactSupport';
import FAQ from './pages/HelpCenter/FAQ';
import KnowledgeBase from './pages/HelpCenter/KnowledgeBase';
import VideoTutorials from './pages/HelpCenter/VideoTutorials';
import CRMDatabasesCredentials from './pages/Configuration/CRMDatabasesCredentials';
import PlatformsCredentials from './pages/Configuration/PlatformsCredentials';
import ConfigurationSettings from './pages/Configuration/Settings';
import ConfigurationTest1 from './pages/Configuration/Test1';

/**
 * Enhanced ProtectedRoute with:
 * - Authentication check
 * - Role-based access control
 * - Loading state handling
 */
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  // Debug logging
  useEffect(() => {
    console.log('[ProtectedRoute] Auth state:', {
      isAuthenticated,
      isLoading,
      userRoles: user?.['https://tripleem/roles']
    });
  }, [isAuthenticated, isLoading, user]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#1d2127] gap-4">
        <svg 
          className="w-12 h-12 text-blue-400 animate-spin" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-xl text-gray-300">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check roles if required
  if (requiredRoles.length > 0) {
    const userRoles = user?.['https://tripleem/roles'] || [];
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      console.warn(`[ProtectedRoute] User missing required roles. Needs: ${requiredRoles.join(', ')}, Has: ${userRoles.join(', ')}`);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

/**
 * Main App Component with:
 * - Route configuration
 * - Auth0 integration
 * - Debug tools
 */
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Debug logging
  useEffect(() => {
    console.log('[App] Auth0 State:', {
      isAuthenticated,
      isLoading,
      user,
      userRoles: user?.['https://tripleem/roles']
    });

    if (user) {
      console.log('[App] Full User Object:', JSON.stringify(user, null, 2));
    }
  }, [user, isAuthenticated, isLoading]);

  return (
    <Router>
      {/* Debug Banner (visible only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-black p-2 text-xs z-50">
          Auth0 Debug: {isAuthenticated ? `Authenticated (Roles: ${user?.['https://tripleem/roles']?.join(', ') || 'none'})` : 'Not authenticated'}
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<div className="h-screen flex items-center justify-center">You don't have permission to access this page</div>} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout 
                email={user?.email} 
                username={user?.nickname || user?.name} 
                userRoles={user?.['https://tripleem/roles']} 
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="trades" element={<Trades />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="history" element={<History />} />
         
          <Route path="reports" element={<Reports />} />

          <Route index element={<HelpCenterLayout />} />
          <Route path="helpcenter/knowledgebase" element={<KnowledgeBase />} />
          <Route path="helpcenter/faq" element={<FAQ />} />
          <Route path="helpcenter/videotutorials" element={<VideoTutorials />} />
          <Route path="helpcenter/contactsupport" element={<ContactSupport />} />
          

         
          <Route path="configuration/crmdatabasescredentials" element={<CRMDatabasesCredentials />} />
          <Route path="configuration/platformscredentials" element={<PlatformsCredentials />} />
          <Route path="configuration/settings" element={<ConfigurationSettings />} />
          <Route path="configuration/test1" element={<ConfigurationTest1 />} />
          
          {/* Test Routes */}
          <Route path="test1/test11" element={<Test11 />} />
          <Route path="test1/test12" element={<Test12 />} />
          
          {/* Admin Routes */}
          <Route 
            path="aiagent/workspace" 
            element={
              <ProtectedRoute requiredRoles={['Admin']}>
                <Workspace />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="aiagent/settingsnew" 
            element={
              <ProtectedRoute requiredRoles={['Admin']}>
                <SettingsNew />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="aiagent/integration" 
            element={
              <ProtectedRoute requiredRoles={['Admin']}>
                <Integration />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;