import { FaUser, FaChevronDown, FaChevronUp, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { appConfig } from "../config/appConfig";
import { useAuth0 } from "@auth0/auth0-react";

const Topbar = ({ breadcrumbRef, breadcrumb, toggleSidebar, isSidebarCollapsed }) => {
  // State for toggling the user dropdown
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);

  // State to store user data from localStorage
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");

  // Auth0 hooks
  const { user, isAuthenticated, logout } = useAuth0();

  // Load data from localStorage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    const storedUserRole = localStorage.getItem("userRole");

    if (storedEmail) setEmail(storedEmail);
    if (storedUsername) setUsername(storedUsername);
    if (storedUserRole) setUserRole(storedUserRole);
  }, []);

  // Toggle the user options dropdown
  const toggleUserBox = () => setIsUserBoxOpen(!isUserBoxOpen);

  return (
    <>
      {/* Top Navbar */}
      <header
        className="bg-[#121228] w-full shadow-md px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-30"
        style={{ 
          height: "var(--topbar-height)",
          backgroundColor: "var(--color-topbar)",
        }}
      >
        {/* Logo */}
        <a href="/">
          <img src={appConfig.logoUrl} alt={appConfig.appName} className="h-15" />
        </a>

        {/* User Dropdown */}
        <div className="relative mr-[40px]">
          <button
            onClick={toggleUserBox}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white focus:outline-none px-3 py-1 rounded shadow-none border-none"
            style={{ backgroundColor: "var(--color-topbar)" }}
          >
            <FaUser />
            {/* Show Auth0 user's name if logged in, else show fallback */}
            {isAuthenticated && user ? user.name : "Guest User"}
            {isUserBoxOpen ? (
              <FaChevronUp className="transition-transform" />
            ) : (
              <FaChevronDown className="transition-transform" />
            )}
          </button>

          {isUserBoxOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-md rounded z-40">
              <div className="p-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition">
                  <FaUser /> <span>Profile</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition">
                  <FaCreditCard /> <span>Billing</span>
                </div>
                {/* Display the email, username, and role */}
                {email && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition">
                    <span className="font-semibold">Email:</span> <span>{email}</span>
                  </div>
                )}
                {username && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-green-300 hover:bg-blue-600 hover:text-white transition">
                    <span className="font-semibold">Username:</span> <span>{username}</span>
                  </div>
                )}
                {userRole && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition">
                    <span className="font-semibold">Role:</span> <span>{userRole}</span>
                  </div>
                )}
                {/* Auth0 Logout */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-300 hover:bg-blue-600 hover:text-white transition"
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin,
                    })
                  }
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Secondary Bar */}
      <div
        className="fixed left-0 right-0 bg-[#0d1117] z-20 flex items-center justify-between px-6 border-t border-b border-red-500"
        style={{
          top: "var(--topbar-height)",
          height: "var(--topbar-height)",
        }}
      >
        {/* Sidebar Toggle */}
        <div className="w-6 flex justify-center items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-blue-500 p-0 bg-transparent border-none shadow-none focus:outline-none"
          >
            <FaUser className="text-sm" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div
          className="flex-1 pr-4 transition-all duration-10 relative"
          style={{ paddingLeft: isSidebarCollapsed ? "2rem" : "15rem" }}
        >
          <span ref={breadcrumbRef} className="text-white text-lg font-small truncate">
            {breadcrumb || "Dashboard"}
          </span>
        </div>

        {/* Help Button */}
        <div className="w-48 flex justify-end">
          <button className="w-20 border-none bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-2 flex items-center justify-center gap-2">
            <span className="bg-white text-green-600 rounded-full w-3.5 h-3.5 flex items-center justify-center text-xs font-bold">?</span>
            Help
          </button>
        </div>
      </div>

      {/* Tertiary Bar */}
      <div
        className="fixed left-0 right-0 bg-blue-50 z-10"
        style={{
          top: "calc(var(--topbar-height) * 2)",
          height: "3px",
        }}
      >
        <div
          className="absolute h-[3px] bg-blue-500"
          style={{ transition: "left 0.01s ease, width 0.01s ease" }}
        />
      </div>
    </>
  );
};

export default Topbar;
