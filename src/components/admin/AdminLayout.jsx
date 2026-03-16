'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100 text-gray-900 flex overflow-hidden">
      {/* Sidebar - Left Side */}
      <div className="flex-shrink-0">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose}
          isCollapsed={sidebarCollapsed}
        />
      </div>

      {/* Right Side Content - Header and Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          onMenuClick={handleMenuClick}
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={sidebarCollapsed}
        />

        {/* Main Content */}
        <MainContent>
          {children}
        </MainContent>
      </div>
    </div>
  );
};

export default AdminLayout;