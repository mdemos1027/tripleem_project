import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function HelpCenterLayout() {
  const { user } = useAuth0();
  
  const navItems = [
    { path: 'knowledgebase', name: 'Knowledge Base', icon: '📚' },
    { path: 'faq', name: 'FAQ', icon: '❓' },
    { path: 'videotutorials', name: 'Video Tutorials', icon: '🎬' },
    { path: 'contact', name: 'Contact Support', icon: '✉️' }
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-blue-500">biFREAK</span> Help Center
        </h1>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}