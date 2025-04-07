import React from "react";

// Helper for lazy loading icons
const lazyIcon = (importFn, name) =>
  React.lazy(() => importFn().then(mod => ({ default: mod[name] })));

// All icons are now lazy-loaded on demand
export const icons = {
    // Existing
    dashboard: lazyIcon(() => import("react-icons/fa"), "FaTachometerAlt"),
    reports: lazyIcon(() => import("react-icons/fa"), "FaFileAlt"),
    settings: lazyIcon(() => import("react-icons/fa"), "FaCog"),
    help: lazyIcon(() => import("react-icons/fa"), "FaQuestionCircle"),
    robot: lazyIcon(() => import("react-icons/fa"), "FaRobot"),
  
    // New for children
    userGroup: lazyIcon(() => import("react-icons/fa"), "FaUsers"),
    exchange: lazyIcon(() => import("react-icons/fa"), "FaExchangeAlt"),
    chartLine: lazyIcon(() => import("react-icons/fa"), "FaChartLine"),
    history: lazyIcon(() => import("react-icons/fa"), "FaHistory"),
    plug: lazyIcon(() => import("react-icons/fa"), "FaPlug"),
    terminal: lazyIcon(() => import("react-icons/fa"), "FaTerminal"),
    gear: lazyIcon(() => import("react-icons/fa"), "FaTools"),
    database: lazyIcon(() => import("react-icons/fa"), "FaDatabase"),
    key: lazyIcon(() => import("react-icons/fa"), "FaKey"),
    book: lazyIcon(() => import("react-icons/fa"), "FaBook"),
    question: lazyIcon(() => import("react-icons/fa"), "FaQuestion"),
    video: lazyIcon(() => import("react-icons/fa"), "FaVideo"),
    envelope: lazyIcon(() => import("react-icons/fa"), "FaEnvelope"),
    shield: lazyIcon(() => import("react-icons/fa"), "FaShieldAlt"),
  };
