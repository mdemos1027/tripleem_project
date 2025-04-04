import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Topbar from "../components/Topbar";
// src/layouts/MainLayout.js
import { navItems } from "../config/navItems";

import {
  FaTachometerAlt,
  FaFileAlt,
  FaCog,
  FaQuestionCircle
} from "react-icons/fa";



const MainLayout = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const breadcrumbRef = useRef(null);
  const indicatorRef = useRef(null);

  // Calculate current breadcrumb path
  const getBreadcrumb = () => {
    for (const item of navItems) {
      if (item.children) {
        const child = item.children.find(c => c.path === location.pathname);
        if (child) return `${item.label} / ${child.label}`;
      } else if (item.path === location.pathname) {
        return item.label;
      }
    }
    return "Dashboard";
  };

  // Check if path is active
  const isActivePath = (item) => {
    if (item.path === location.pathname) return true;
    if (item.children) return item.children.some(child => child.path === location.pathname);
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans m-0 p-0 overflow-hidden">
      {/* Topbar with all navigation controls */}
      <Topbar
        breadcrumbRef={breadcrumbRef}
        breadcrumb={getBreadcrumb()}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
        indicatorRef={indicatorRef}
      />

      {/* Sidebar + Main Content Area */}
      <div className="flex">
        {/* Sidebar Navigation */}
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
            const active = isActivePath(item);
            return (
              <div key={index} className="mb-2 relative">
                {/* Active indicator */}
                {active && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 h-[45px] w-[3px] rounded-sm"
                    style={{ backgroundColor: 'var(--color-selector)' }}
                  ></div>
                )}

                {/* Parent menu items */}
                {item.children ? (
                  <details className="group" open={active}>
                    <summary className={`flex items-center justify-between px-3 h-[30px] py-2 text-sm font-medium rounded hover:bg-gray-700 cursor-pointer ${active ? 'text-white font-semibold' : 'text-white'}`}>
                      <span className="flex items-center">
                        {item.icon}
                        {!isSidebarCollapsed && <span className="ml-2">{item.label}</span>}
                      </span>
                      {!isSidebarCollapsed && (
                        <span className="transition-transform group-open:rotate-180">
                          ▼
                        </span>
                      )}
                    </summary>

                    {/* Child menu items */}
                    {!isSidebarCollapsed && (
                      <div className="ml-7 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
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
                  /* Single menu items (no children) */
                  <NavLink
                    to={item.path}
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
              </div>
            );
          })}
          <div className="absolute top-0 right-0 h-full w-[3px] bg-blue-50"></div>
        </aside>

        {/* Main Content Area */}
        <main
          className="flex-1 p-6 bg-[#121228] min-h-screen border-t border-l border-red-500"
          style={{
            marginLeft: isSidebarCollapsed ? 'calc(var(--sidebar-collapsed-width) + 30px)' : 'calc(var(--sidebar-expanded-width) + 30px)',
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