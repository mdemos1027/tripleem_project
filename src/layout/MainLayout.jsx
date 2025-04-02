import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { appConfig } from '../config/appConfig';
import Topbar from "../components/Topbar";

import {
  FaBars,
  FaTachometerAlt,
  FaFileAlt,
  FaCog,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaUser,
  FaCreditCard,
} from "react-icons/fa";

const navItems = [
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
  { path: "/settings", label: "Settings", icon: <FaCog /> },
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
    label: "Test1",
    icon: <FaTachometerAlt />,
    children: [
      { path: "/test1/test11", label: "Test11" },
      { path: "/test1/test12", label: "Test12" },
    ],
  },
  {
    label: "AI Agent",
    icon: <FaTachometerAlt />,
    children: [
      { path: "/aiagent/workspace", label: "Workspace" },
      { path: "/aiagent/integration", label: "Integration" },
      { path: "/aiagent/settingsnew", label: "SettingsNew" },
    ],
  },
];

const MainLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);
  const breadcrumbRef = useRef(null);
  const indicatorRef = useRef(null);

  const toggleUserBox = () => setIsUserBoxOpen(!isUserBoxOpen);

  const isActivePath = (item) => {
    if (item.path === path) return true;
    if (item.children) return item.children.some(child => child.path === path);
    return false;
  };

  let breadcrumb = "Dashboard";
  for (const item of navItems) {
    if (item.children) {
      for (const child of item.children) {
        if (child.path === path) {
          breadcrumb = `${item.label} / ${child.label}`;
          break;
        }
      }
    } else if (item.path === path) {
      breadcrumb = item.label;
      break;
    }
  }

  useEffect(() => {
    const updateIndicator = () => {
      const breadcrumbEl = breadcrumbRef.current;
      const indicatorEl = indicatorRef.current;
  
      if (breadcrumbEl && indicatorEl) {
        const rect = breadcrumbEl.getBoundingClientRect();
  
        // Sidebar widths in pixels (collapsed vs expanded)
        const collapsedOffset = "var(--sidebar-collapsed-width)";  // 4rem (w-16)
        const expandedOffset = "var(--sidebar-expanded-width)";  // 16rem (w-64)
        const offsetLeft = isSidebarCollapsed ? collapsedOffset : expandedOffset;
  
        // Add some left padding to match breadcrumb's inner padding
        const paddingOffset = 32;
  
        indicatorEl.style.left = `calc(${offsetLeft} + ${paddingOffset}px)`;
        indicatorEl.style.width = `${rect.width + 20}px`; // Add some extra width for the indicator
             
      }
    };
  
    const timeout = setTimeout(updateIndicator, 100); // match sidebar transition duration
  
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [breadcrumb, isSidebarCollapsed]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans m-0 p-0 overflow-hidden">
      <Topbar
        breadcrumbRef={breadcrumbRef}
        breadcrumb={breadcrumb}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Secondary Bar */}
      <div
        className="fixed left-0 right-0 z-20 flex items-center justify-between px-6 border-t border-b border-red-500"
        style={{
          top: "var(--topbar-height)",
          height: "var(--topbar-height)",
          backgroundColor: "var(--color-secondbar)",
        }}
      >
        <div className="w-6 flex justify-center items-center">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
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
          ref={indicatorRef}
          className="absolute h-[3px] bg-blue-500"
          style={{ transition: "left 0.01s ease, width 0.01s ease" }}
        ></div>
      </div>

      {/* Sidebar + Main content */}
      <div className="flex">
        <aside
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
          className={`bg-[#0a1634] px-4 pt-6 min-h-screen fixed z-20 transition-all duration-300 border-r border-red-500`}
            style={{
              width: isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)',
              top: "calc(var(--topbar-height) * 2)",
              backgroundColor: "var(--color-sidebar)"
            }}
          
        >
          {navItems.map((item, index) => {
            const isActive = isActivePath(item);
            return (
              <div key={index} className="mb-2 relative">
                {isActive && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 h-[45px] w-[3px] rounded-sm"
                    style={{ backgroundColor: 'var(--color-selector)' }}
                  ></div>  /* affects only parents who have childs */
                )}
                {item.children ? (
                  <details className="group" open={isActive}>
                    <summary className={`flex items-center justify-between px-3 h-[30px] py-2 text-sm font-medium rounded hover:bg-gray-700 cursor-pointer ${isActive ? 'text-white font-semibold' : 'text-white'}`}>
                      <span className="flex items-center">
                        {item.icon}
                        {!isSidebarCollapsed && <span className="ml-2">{item.label}</span>}
                      </span>
                      {!isSidebarCollapsed && (
                        <FaChevronDown className="transition-transform group-open:rotate-180" />
                      )}
                    </summary>
                    {!isSidebarCollapsed && (
                      <div className="ml-7 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsSidebarCollapsed(true)}
                            /* affects childs items */
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded h-[30px] text-sm font-medium hover:bg-gray-700 transition no-underline ${
                                isActive ? "bg-blue-600 text-white" : "text-white"
                              }`
                            }
                          >
                            <span className="inline-block w-5 h-[20px] text-center">
                              <FaTachometerAlt />
                            </span>
                            <span className="ml-2">{child.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </details>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setIsSidebarCollapsed(true)}
                    /* affects parent items without child */
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded h-[30px] text-sm font-medium hover:bg-gray-700 transition no-underline ${
                        isActive ? "text-white" : "text-white"
                      }`
                    }
                  >
                    {item.icon}
                    {!isSidebarCollapsed && <span className="ml-2">{item.label}</span>}
                  </NavLink>
                )}

                {/* affectes parent items without childs */}
                {!item.children && isActive && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 h-[45px] w-[3px] rounded-sm"
                    style={{ backgroundColor: 'var(--color-selector)' }}  // Using the CSS variable here
                  ></div>
                )}

              </div>
            );
          })}
          <div className="absolute top-0 right-0 h-full w-[3px] bg-blue-50"></div>  {/* small line, on the right of sidebar */}
        </aside>

        <main
          className="flex-1 p-6 bg-[#121228] min-h-screen border-t border-l border-red-500"
          style={{
            marginLeft: isSidebarCollapsed? 'calc(var(--sidebar-collapsed-width) + 30px)': 'calc(var(--sidebar-expanded-width) + 30px)',
            marginTop: "calc(var(--topbar-height) * 2 + 5px)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
