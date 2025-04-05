import { FaUser, FaChevronDown, FaChevronUp, FaCreditCard, FaSignOutAlt, FaBars, FaQuestionCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { appConfig } from "../config/appConfig";
import { useAuth0 } from "@auth0/auth0-react";
import { useLanguage } from "../context/LanguageContext"; // Import language context
import WorldFlag from "react-world-flags";  // Import the flag component
import { translations } from "../translations"; // Import translations

const Topbar = ({
  breadcrumbRef,
  breadcrumb,
  toggleSidebar,
  isSidebarCollapsed,
  indicatorRef
}) => {
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth0();
  const { language, changeLanguage } = useLanguage();
  const userDropdownRef = useRef(null);

  const [localUser, setLocalUser] = useState({
    email: localStorage.getItem("email") || "",
    username: localStorage.getItem("username") || "",
    role: localStorage.getItem("userRole") || ""
  });

  // Handle clicks outside the user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update breadcrumb indicator position
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

  // Helper function to get translated label based on current language
  const getTranslatedLabel = (key) => {
    return translations[language][key] || key;  // Return translated label or fallback to key
  };

  // Language options with flag codes
  const languages = [
    { code: "en", flag: "GB", label: "English" },
    { code: "fr", flag: "FR", label: "Français" },
    { code: "zh", flag: "CN", label: "中文" }
  ];

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Primary Topbar */}
      <header
        className="topbar fixed left-0 right-0 z-40 flex items-center justify-between px-6 border-t border-b border-red-500"
        style={{
          height: "var(--topbar-height)",
          backgroundColor: "var(--color-topbar)"
        }}
      >
        <a href="/">
          <img src={appConfig.logoUrl} alt={appConfig.appName} className="h-15" />
        </a>

        <div className="w-auto flex items-center space-x-1">
          {/* Language Selector with flags */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 text-sm text-gray-300 hover:text-white focus:outline-none px-3 py-2 rounded-md border-none"
            >
              <WorldFlag
                code={languages.find((lang) => lang.code === language)?.flag}
                style={{ width: "20px", marginRight: "8px" }}
              />
              {languages.find((lang) => lang.code === language)?.label}
              {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black-300 shadow-lg rounded-md z-50">
                <div className="p-2 space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition"
                    >
                      <WorldFlag
                        code={lang.flag}
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-48 flex justify-end ml-auto relative">
            <button
              onClick={() => setIsUserBoxOpen(!isUserBoxOpen)}
              className="flex items-center gap-3 text-sm text-gray-300 hover:text-white focus:outline-none px-3 py-1 rounded shadow-none border-none"
              style={{ backgroundColor: "var(--color-topbar)" }}
            >
              <FaUser />
              {isAuthenticated && user ? user.name : "Guest User"}
              {isUserBoxOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isUserBoxOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-50"
                style={{
                  top: "33px",
                  animation: "fadeIn 0.2s ease-out"
                }}
              >
                <div className="p-2 space-y-1">
                  {/* Translated Profile Menu Item */}
                  <UserMenuItem icon={<FaUser />} text={getTranslatedLabel("profile")} />

                  {/* Translated Billing Menu Item */}
                  <UserMenuItem icon={<FaCreditCard />} text={getTranslatedLabel("billing")} />

                  {localUser.email && <UserInfo label="Email" value={localUser.email} />}
                  {localUser.username && <UserInfo label="Username" value={localUser.username} color="text-green-300" />}
                  {localUser.role && <UserInfo label="Role" value={localUser.role} />}

                  {/* Logout Button */}
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaSignOutAlt />
                    {getTranslatedLabel("logout")} {/* Translated Logout */}
                  </button>
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
          style={{ paddingLeft: isSidebarCollapsed ? "3rem" : "15rem" }}
        >
          <span ref={breadcrumbRef} className="text-white text-lg font-small truncate">
            {breadcrumb || "Dashboard"}
          </span>
        </div>

        <div className="w-48 flex justify-end">
          <button className="w-20 border-none bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-2 flex items-center justify-center gap-2">
            <span className="bg-white text-green-600 rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs font-bold">?</span>
            {getTranslatedLabel("help")} {/* Translated Help */}
          </button>
        </div>
      </div>

      {/* Tertiary Indicator Bar */}
      <div
        className="fixed left-0 right-0 bg-blue-50 z-10"
        style={{
          top: "calc(var(--topbar-height) * 2)",
          height: "3px"
        }}
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

// Helper Components
const UserMenuItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition">
    {icon} <span>{text}</span>
  </div>
);

const UserInfo = ({ label, value, color = "text-gray-300" }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${color} hover:bg-blue-600 hover:text-white transition`}>
    <span className="font-semibold">{label}:</span> <span>{value}</span>
  </div>
);

export default Topbar;
