"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MainContent from "../MainContent";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarCollapsed(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        isCollapsed={sidebarCollapsed && !isMobile}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onToggleSidebar={() => {
            if (!isMobile) {
              setSidebarCollapsed((prev) => {
                const newValue = !prev;
                localStorage.setItem("sidebar-collapsed", newValue);
                return newValue;
              });
            }
          }}
          isSidebarCollapsed={sidebarCollapsed && !isMobile}
          isMobile={isMobile}
        />

        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default MainLayout;
