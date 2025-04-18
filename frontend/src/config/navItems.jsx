// src/components/NavItems.jsx
import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { translations } from "../translations";

// Navigation definition using iconKey (used with lazy-loaded icons)
export const navItems = [
  {
    label: "dashboard",
    iconKey: "dashboard",
    children: [
      { path: "/dashboard", label: "dashboard", iconKey: "dashboard" },
      { path: "/accounts", label: "accounts", iconKey: "userGroup" },
      { path: "/trades", label: "trades", iconKey: "exchange" },
      { path: "/analysis", label: "analysis", iconKey: "chartLine" },
      { path: "/history", label: "history", iconKey: "history" },
    ],
  },
  {
    path: "/reports",
    label: "reports",
    iconKey: "reports",
  },
  {
    label: "configuration",
    iconKey: "settings",
    children: [
      { path: "/configuration/crmdatabasescredentials", label: "crmDatabasesCredentials", iconKey: "database" },
      { path: "/configuration/platformscredentials", label: "platformsCredentials", iconKey: "key" },
      { path: "/configuration/settings", label: "settings", iconKey: "gear" },
      { path: "/configuration/permissions", label: "permissions", iconKey: "shield" },
    ],
  },
  {
    label: "helpCenter",
    iconKey: "help",
    children: [
      { path: "/helpcenter/knowledgebase", label: "knowledgeBase", iconKey: "book" },
      { path: "/helpcenter/faq", label: "faq", iconKey: "question" },
      { path: "/helpcenter/videotutorials", label: "videoTutorials", iconKey: "video" },
      { path: "/helpcenter/contactsupport", label: "contactSupport", iconKey: "envelope" },
    ],
  },
  {
    label: "aiAgent",
    iconKey: "robot",
    children: [
      { path: "/aiagent/workspace", label: "workspace", iconKey: "terminal" },
      { path: "/aiagent/integration", label: "integration", iconKey: "plug" },
      { path: "/aiagent/settingsnew", label: "settings", iconKey: "gear" },
    ],
  },
];

const NavItems = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language][key] || key;

  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <div>{t(item.label)}</div>
            {item.children && (
              <ul>
                {item.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <a href={child.path}>{t(child.label)}</a>
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
