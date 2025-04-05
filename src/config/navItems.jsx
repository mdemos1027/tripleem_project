// src/components/NavItems.jsx
import React from "react";
import { FaTachometerAlt, FaFileAlt, FaCog, FaQuestionCircle } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext.jsx";  // Correct import
import { translations } from "../translations";  // Correct import

export const navItems = [
  {
    label: "dashboard",
    icon: <FaTachometerAlt />,
    children: [
      { path: "/dashboard", label: "dashboard" },
      { path: "/accounts", label: "accounts" },
      { path: "/trades", label: "trades" },
      { path: "/analysis", label: "analysis" },
      { path: "/history", label: "history" },
    ],
  },
  { path: "/reports", label: "reports", icon: <FaFileAlt /> },
  {
    label: "configuration",
    icon: <FaCog />,
    children: [
      { path: "/configuration/crmdatabasescredentials", label: "crmDatabasesCredentials" },
      { path: "/configuration/platformscredentials", label: "platformsCredentials" },
      { path: "/configuration/settings", label: "settings" },
      { path: "/configuration/permissions", label: "permissions" },
    ],
  },
  {
    label: "helpCenter",
    icon: <FaQuestionCircle />,
    children: [
      { path: "/helpcenter/knowledgebase", label: "knowledgeBase" },
      { path: "/helpcenter/faq", label: "faq" },
      { path: "/helpcenter/videotutorials", label: "videoTutorials" },
      { path: "/helpcenter/contactsupport", label: "contactSupport" },
    ],
  },
  {
    label: "aiAgent",
    icon: <FaTachometerAlt />,
    children: [
      { path: "/aiagent/workspace", label: "workspace" },
      { path: "/aiagent/integration", label: "integration" },
      { path: "/aiagent/settingsnew", label: "settings" },
    ],
  },
];

const NavItems = () => {
  const { language } = useLanguage(); // Get the current language from context

  // Helper function to get translated label based on current language
  const getTranslatedLabel = (key) => {
    return translations[language][key] || key; // Default to the key if translation is not found
  };

  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <div>{getTranslatedLabel(item.label)}</div>
            {item.children && (
              <ul>
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <a href={child.path}>{getTranslatedLabel(child.label)}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavItems;
