import {
  FaUser, FaChevronDown, FaChevronUp, FaCreditCard,
  FaSignOutAlt, FaBars, FaQuestionCircle
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { appConfig } from "../config/appConfig";
import { useAuth0 } from "@auth0/auth0-react";
import { useLanguage } from "../context/LanguageContext";
import WorldFlag from "react-world-flags";
import { translations } from "../translations";
import logo from '../assets/Logo.png';

const Topbar = ({
  breadcrumbRef,
  breadcrumb,
  toggleSidebar,
  isSidebarCollapsed,
  indicatorRef
}) => {
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false); // user dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // language dropdown
  const { isAuthenticated, logout } = useAuth0();
  const { language, changeLanguage } = useLanguage();
  const containerRef = useRef(null); // shared wrapper

  const [localUser] = useState({
    email: localStorage.getItem("email") || "",
    username: localStorage.getItem("username") || "",
    role: localStorage.getItem("userRole") || ""
  });

  const languages = [
    { code: "en", flag: "GB", label: "English" },
    { code: "fr", flag: "FR", label: "Français" },
    { code: "zh", flag: "CN", label: "中文" }
  ];

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  // Close both dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsUserBoxOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Move blue bar with breadcrumb
  useEffect(() => {
    const updateIndicator = () => {
      if (breadcrumbRef.current && indicatorRef.current) {
        const rect = breadcrumbRef.current.getBoundingClientRect();
        const offsetLeft = isSidebarCollapsed ? "3rem" : "16rem";
        indicatorRef.current.style.left = `calc(${offsetLeft} + 32px)`;
        indicatorRef.current.style.width = `${rect.width + 20}px`;
      }
    };
    const timeout = setTimeout(updateIndicator, 100);
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [breadcrumb, isSidebarCollapsed]);

  const getTranslatedLabel = (key) => translations[language][key] || key;

  return (
    <>
      {/* Topbar */}
      <header
        className="topbar fixed left-0 right-0 z-40 flex items-center justify-between px-6 border-t border-b border-red-500"
        style={{
          height: "var(--topbar-height)",
          backgroundColor: "var(--color-topbar)"
        }}
      >
        <a href="/" style={{ width: "3rem", height: "auto" }}>
          <img
            src={logo}
            alt={appConfig.appName}
            className="h-12 object-contain"
            style={{ transform: "scale(1.4)", marginLeft: "-32px", marginRight: "-4px" }}
          />
        </a>

        {/* Right Controls */}
        <div ref={containerRef} className="flex items-center space-x-1">
          {/* 🌐 Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsDropdownOpen(prev => !prev); // toggle lang
                setIsUserBoxOpen(false);          // close user
              }}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white focus:outline-none px-3 py-2 rounded-md border-none"
              style={{ backgroundColor: "var(--color-topbar)" }}
            >
              <WorldFlag
                code={languages.find((lang) => lang.code === language)?.flag}
                style={{ width: "20px", height: "14px", objectFit: "cover", borderRadius: "2px" }}
              />
              <span>{languages.find((lang) => lang.code === language)?.label}</span>
              {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-gray-800 shadow-lg rounded-md z-50">
                <div className="p-2 space-y-1">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition"
                    >
                      <WorldFlag
                        code={lang.flag}
                        style={{ width: "20px", height: "14px", objectFit: "cover", borderRadius: "2px" }}
                      />
                      <span>{lang.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 👤 User Dropdown */}
          <div className="w-48 flex justify-end ml-auto relative">
            <button
              onClick={() => {
                setIsUserBoxOpen(prev => !prev); // toggle user
                setIsDropdownOpen(false);        // close lang
              }}
              className="flex items-center gap-3 text-sm text-gray-300 hover:text-white focus:outline-none px-0 py-1 rounded shadow-none border-none"
              style={{ backgroundColor: "var(--color-topbar)", height: "3rem" }}
            >
              <FaUser />
              {isAuthenticated && localUser.username ? (
                <div className="flex flex-col ml-1 justify-center">
                  <div className="text-sm text-base mt-4">{localUser.username}</div>
                  <div className="text-xs text-green-300">{localUser.email}</div>
                </div>
              ) : "Guest User"}
              {isUserBoxOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isUserBoxOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-50"
                style={{ top: "33px", animation: "fadeIn 0.2s ease-out" }}
              >
                <div className="p-2 space-y-1">
                  <UserMenuItem icon={<FaUser />} text={getTranslatedLabel("profile")} />
                  <UserMenuItem icon={<FaCreditCard />} text={getTranslatedLabel("billing")} />
                  <div
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-blue-600 hover:text-white cursor-pointer transition"
                  >
                    <FaSignOutAlt />
                    {getTranslatedLabel("logout")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Secondary Bar */}
      <div
        className="secondarybar fixed left-0 right-0 z-20 flex items-center justify-between px-6 border-t border-b border-red-500"
        style={{
          top: "var(--topbar-height)",
          height: "var(--topbar-height)",
          backgroundColor: "var(--color-secondbar)"
        }}
      >
        <div className="w-6 flex justify-center items-center">
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-blue-500 p-0 bg-transparent border-none shadow-none focus:outline-none"
          >
            <FaBars className="text-sm" />
          </button>
        </div>

        <div
          className="flex-1 pr-4 transition-all duration-10 relative"
          style={{ paddingLeft: isSidebarCollapsed ? "3rem" : "16rem" }}
        >
          <span ref={breadcrumbRef} className="text-white text-lg font-small truncate">
            {breadcrumb || "Dashboard"}
          </span>
        </div>

        <div className="w-48 flex justify-end">
          <button className="w-20 border-none bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-2 flex items-center justify-center gap-2">
            <span className="bg-white text-green-600 rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs font-bold">?</span>
            {getTranslatedLabel("help")}
          </button>
        </div>
      </div>

      {/* Tertiary Indicator */}
      <div
        className="fixed left-0 right-0 bg-blue-50 z-10"
        style={{ top: "calc(var(--topbar-height) * 2)", height: "3px" }}
      >
        <div
          ref={indicatorRef}
          className="absolute h-[3px] bg-blue-500"
          style={{ transition: "left 0.01s ease, width 0.01s ease" }}
        />
      </div>
    </>
  );
};

const UserMenuItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition">
    {icon} <span>{text}</span>
  </div>
);

export default Topbar;
