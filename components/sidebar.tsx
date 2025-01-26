'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar = ({ onCollapse }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { title: 'Dashboard', path: '/dashboard', icon: '📊' },
    { title: 'Workouts', path: '/dashboard/workouts', icon: '💪' },
    { title: 'Progress', path: '/dashboard/progress', icon: '📈' },
    { title: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ];

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <div
      className={`h-screen bg-[#202123] text-white fixed left-0 top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          {!isCollapsed && 'AiFit'}
        </h1>
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-lg hover:bg-[#2A2B32] transition-colors"
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg hover:bg-[#2A2B32] transition-colors ${
                  pathname === item.path ? 'bg-[#2A2B32]' : ''
                }`}
                title={isCollapsed ? item.title : ''}
              >
                <span className="mr-3">{item.icon}</span>
                <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                  {!isCollapsed && item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;