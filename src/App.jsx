import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Trades from "./pages/Trades";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Test11 from './pages/test1/Test11';
import Test12 from './pages/test1/Test12';
import Workspace from './pages/ChatGPT/Workspace';
import Integration from './pages/ChatGPT/Integration';
import SettingsNew from './pages/ChatGPT/SettingsNew';
import Login from "./pages/Login";
import Register from './pages/Register';
import Settings from './pages/Settings';

// ✅ Protect routes based on Auth0 login state
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1d2127] text-white">
        <p className="text-xl">Verifying session...</p>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All protected content below MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="trades" element={<Trades />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="history" element={<History />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="test1/test11" element={<Test11 />} />
          <Route path="test1/test12" element={<Test12 />} />
          <Route path="chatgpt/Workspace" element={<Workspace />} />
          <Route path="chatgpt/SettingsNew" element={<SettingsNew />} />
          <Route path="chatgpt/Integration" element={<Integration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
