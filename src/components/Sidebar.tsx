
import React from 'react';
import { Home, Users, Mail, Settings, BarChart3, Zap, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', icon: Home, active: false },
  { name: 'Leads', icon: Users, active: false },
  { name: 'Campaigns', icon: Mail, active: true },
  { name: 'Analytics', icon: BarChart3, active: false },
  { name: 'Flows', icon: Zap, active: false },
  { name: 'Copilot', icon: Bot, active: false },
  { name: 'Settings', icon: Settings, active: false },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LM</span>
          </div>
          <span className="font-semibold text-gray-900">LeadMasters</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
