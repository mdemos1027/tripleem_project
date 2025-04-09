import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Topbar from "../components/Topbar";
import { navItems } from "../config/navItems"; // or ../config/navItems if that's where it is
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { icons } from "../config/iconMap";
import IconWrapper from "../components/IconWrapper";
import { FaChevronDown } from "react-icons/fa";

const MainLayout = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const breadcrumbRef = useRef(null);
  const indicatorRef = useRef(null);

  const t = (key) => translations[language][key] || key;

  const getBreadcrumb = () => {
    for (const item of navItems) {
      if (item.children) {
        const child = item.children.find(c => c.path === location.pathname);
        if (child) return `${t(item.label)} / ${t(child.label)}`;
      } else if (item.path === location.pathname) {
        return t(item.label);
      }
    }
    return t("dashboard");
  };

  const isActivePath = (item) => {
    if (item.path === location.pathname) return true;
    if (item.children) return item.children.some(child => child.path === location.pathname);
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans m-0 p-0 overflow-hidden">
      <Topbar
        breadcrumbRef={breadcrumbRef}
        breadcrumb={getBreadcrumb()}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
        indicatorRef={indicatorRef}
      />

      <div className="flex">
        <aside
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
          className="bg-[#0a1634] px-4 pt-6 min-h-screen fixed z-20 transition-all duration-300 border-r border-red-500"
          style={{
            width: isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-expanded-width)',
            top: "calc(var(--topbar-height) * 2)",
            backgroundColor: "var(--color-sidebar)"
          }}
        >
          {navItems.map((item, index) => {
            const active = isActivePath(item);
            const Icon = icons[item.iconKey];

            return (
              <div key={index} className="mb-2 relative">
                {active && (
                  <div
                    className="absolute left-0 top-0 bottom-0 h-[45px] w-[3px] rounded-sm"
                    style={{ backgroundColor: 'var(--color-selector)' }}
                  ></div>
                )}

                {/* Parent */}
                {item.children ? (
                  <details className="group" open={active}>
                    <summary className={`flex items-center justify-between px-3 h-[30px] py-2 text-sm font-medium rounded hover:bg-gray-700 cursor-pointer ${active ? 'text-white font-semibold' : 'text-white'}`}>
                      <span className="flex items-center gap-3">
                        {Icon && <IconWrapper Icon={Icon} className="w-4 h-4 text-white" />}
                        {!isSidebarCollapsed && <span>{t(item.label)}</span>}
                      </span>
                      {!isSidebarCollapsed && (
                        <FaChevronDown className="transition-transform group-open:rotate-180" />
                      )}
                    </summary>

                    {/* Children */}
                    {!isSidebarCollapsed && (
                      <div className="ml-7 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded h-[30px] text-sm font-medium hover:bg-gray-700 transition no-underline ${isActive ? "bg-blue-600 text-white" : "text-white"}`
                            }
                          >
                            {/* ✅ ICON HERE — tweak size/class freely */}
                            <IconWrapper
                              Icon={icons[child.iconKey]}
                              className="w-3.5 h-3.5 text-gray-300"
                            />
                            <span className="ml-3">{t(child.label)}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </details>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded h-[30px] text-sm font-medium hover:bg-gray-700 transition no-underline ${isActive ? "bg-blue-600 text-white" : "text-white"}`
                    }
                  >
                    {Icon && <IconWrapper Icon={Icon} className="w-4 h-4 text-white" />}
                    {!isSidebarCollapsed && <span className="ml-3">{t(item.label)}</span>}
                  </NavLink>
                )}
              </div>
            );
          })}

          {/* Optional right border glow */}
          <div className="absolute top-0 right-0 h-full w-[3px] bg-blue-50"></div>
        </aside>

        {/* Main content */}
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
