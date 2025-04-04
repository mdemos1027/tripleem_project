// src/config/navItems.js
import { FaTachometerAlt, FaFileAlt, FaCog, FaQuestionCircle } from "react-icons/fa";

export const navItems = [
  {
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    children: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/accounts", label: "Accounts" },
      { path: "/trades", label: "Trades" },
      { path: "/analysis", label: "Analysis" },
      { path: "/history", label: "History" },
    ],
  },
  { path: "/reports", label: "Reports", icon: <FaFileAlt /> },
  {
    label: "Configuration",
    icon: <FaCog />,
    children: [
      { path: "/configuration/crmdatabasescredentials", label: "CRM Databases Credentials" },
      { path: "/configuration/platformscredentials", label: "Platforms Credentials" },
      { path: "/configuration/settings", label: "Settings" },
      { path: "/configuration/permissions", label: "Permissions" }, // Renamed from test1
    ],
  },
  {
    label: "Help Center",
    icon: <FaQuestionCircle />,
    children: [
      { path: "/helpcenter/knowledgebase", label: "Knowledge Base" },
      { path: "/helpcenter/faq", label: "FAQ" },
      { path: "/helpcenter/videotutorials", label: "Video Tutorials" },
      { path: "/helpcenter/contactsupport", label: "Contact Support" },
    ],
  },
  {
    label: "AI Agent",
    icon: <FaTachometerAlt />,
    children: [
      { path: "/aiagent/workspace", label: "Workspace" },
      { path: "/aiagent/integration", label: "Integration" },
      { path: "/aiagent/settingsnew", label: "Settings" },
    ],
  },
];
