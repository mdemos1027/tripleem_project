// Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaCog, FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition ${
      isActive ? "bg-gray-700 text-blue-400" : "text-white"
    }`;

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
        { path: "/help/knowledge-base", label: "Knowledge Base" },
        { path: "/help/faq", label: "FAQ" },
        { path: "/help/tutorials", label: "Video Tutorials" },
        { path: "/help/contact", label: "Contact Support" },
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
      label: "Test2",
      icon: <FaTachometerAlt />,
      children: [
        { path: "/test2/test21", label: "Test21" },
        { path: "/test2/test22", label: "Test22" },
        { path: "/test2/test23", label: "Test23" },
      ],
    },
  ];

  return (
    <aside
      onMouseEnter={() => setIsSidebarCollapsed(false)}
      onMouseLeave={() => setIsSidebarCollapsed(true)}
      className={`bg-[#2f343f] px-4 pt-6 min-h-screen fixed z-20 transition-all duration-300 border-r border-red-500
        ${isSidebarCollapsed ? "w-16" : "w-64"}`}
      style={{ top: "calc(var(--topbar-height) * 2)" }}
    >
      {navItems.map((item, index) => {
        const isActive = window.location.pathname === item.path;
        return (
          <div key={index} className="mb-2 relative">
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 rounded-sm"></div>
            )}
            {item.children ? (
              <details className="group" open={isActive}>
                <summary
                  className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded hover:bg-gray-700 cursor-pointer ${isActive ? "text-white font-semibold" : "text-white"}`}
                >
                  <span className="flex items-center">
                    {item.icon}
                    {!isSidebarCollapsed && <span className="ml-2">{item.label}</span>}
                  </span>
                  {!isSidebarCollapsed && <FaChevronDown className="transition-transform group-open:rotate-180" />}
                </summary>
                {!isSidebarCollapsed && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={linkClasses}
                      >
                        <span className="inline-block w-5 text-center">
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
                className={linkClasses}
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
  );
};

export default Sidebar;
