// src/components/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "./NavItems"; // centralized nav config
import { icons } from "../config/iconMap"; // lazy-loaded icons
import IconWrapper from "./IconWrapper"; // suspense wrapper
import { FaChevronDown } from "react-icons/fa";

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const location = useLocation();

  const linkClasses = ({ isActive }) =>
    `flex items-center px-3 py-1.5 rounded text-sm font-medium no-underline transition gap-2
     ${isActive ? "bg-blue-600 text-white" : "text-white hover:bg-gray-700"}`;

  const isActivePath = (item) => {
    if (item.path === location.pathname) return true;
    if (item.children) return item.children.some((c) => c.path === location.pathname);
    return false;
  };

  return (
    <aside
      onMouseEnter={() => setIsSidebarCollapsed(false)}
      onMouseLeave={() => setIsSidebarCollapsed(true)}
      className={`bg-[#2f343f] px-4 pt-6 min-h-screen fixed z-20 transition-all duration-300 border-r border-red-500
        ${isSidebarCollapsed ? "w-16" : "w-64"}`}
      style={{ top: "calc(var(--topbar-height) * 2)" }}
    >
      {navItems.map((item, index) => {
        const Icon = icons[item.iconKey];
        const isActive = isActivePath(item);

        return (
          <div key={index} className="mb-2 relative">
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 rounded-sm"></div>
            )}

            {item.children ? (
              <details className="group" open={isActive}>
                <summary
                  className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded cursor-pointer
                  ${isActive ? "text-white font-semibold" : "text-white hover:bg-gray-700"}`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <IconWrapper Icon={Icon} className="w-4 h-4" />}
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </span>
                  {!isSidebarCollapsed && (
                    <FaChevronDown className="transition-transform group-open:rotate-180" />
                  )}
                </summary>

                {!isSidebarCollapsed && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink key={child.path} to={child.path} className={linkClasses}>
                        <span className="inline-block w-4 h-4">
                          <IconWrapper Icon={Icon} className="w-4 h-4" />
                        </span>
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </details>
            ) : (
              <NavLink to={item.path} className={linkClasses}>
                {Icon && <IconWrapper Icon={Icon} className="w-4 h-4" />}
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            )}
          </div>
        );
      })}
      <div className="absolute top-0 right-0 h-full w-[3px] bg-blue-50"></div>
    </aside>
  );
};

export default Sidebar;
