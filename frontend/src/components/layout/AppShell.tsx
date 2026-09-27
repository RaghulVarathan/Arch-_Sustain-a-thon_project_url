import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { ScrollToTop } from '../ui/ScrollToTop';

export const AppShell: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0e0c] text-[#e3e8e5] relative selection:bg-[#1f593b] selection:text-[#f4f7f5]">
      {/* Precision Trailing Custom Cursor */}
      <CustomCursor />

      {/* Real-time Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Back to Top */}
      <ScrollToTop />

      {/* Sidebar for Desktop and Drawer for Mobile/Tablet */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0 bg-[#0a0e0c]">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
