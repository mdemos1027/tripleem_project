import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Login from "./pages/Login"; // make sure this file exists
import Register from './pages/Register';
import Settings from './pages/Settings';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ← Add this line */}

        
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
          <Route path="chatgpt/SettingsNew" element={<SettingsNew/>} />
          <Route path="chatgpt/Integration" element={<Integration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
