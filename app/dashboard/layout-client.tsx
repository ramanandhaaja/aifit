'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen h-full w-full bg-[#343541]">
      <Sidebar onCollapse={setIsSidebarCollapsed} />
      <main 
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  );
}