'use client';

import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
      />

      {/* Right side */}
      <div className="flex-1 flex flex-col">

        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          isSidebarCollapsed={sidebarCollapsed}
        />

        <MainContent>
          {children}
        </MainContent>

      </div>
    </div>
  );
};

export default MainLayout;