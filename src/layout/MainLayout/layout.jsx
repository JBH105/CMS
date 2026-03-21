"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import MainContent from "../MainContent";
import { Spinner } from "@/shared/ui/spinner";

const MainLayout = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-zinc-50">
        <Spinner className="w-8 h-8 text-zinc-900 mb-4" />
        <p className="text-zinc-500 text-sm font-medium animate-pulse">Loading interface...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white selection:bg-zinc-900 selection:text-white text-zinc-900 antialiased font-sans">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        isSidebarCollapsed={sidebarCollapsed && !isMobile}
        isMobile={isMobile}
      />

      <div className="flex-1 flex min-h-0 bg-white">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          isCollapsed={sidebarCollapsed && !isMobile}
          onToggleSidebar={() => {
            if (!isMobile) {
              setSidebarCollapsed((prev) => {
                const newValue = !prev;
                localStorage.setItem("sidebar-collapsed", newValue);
                return newValue;
              });
            }
          }}
          isMobile={isMobile}
        />

        <main className="flex-1 overflow-auto bg-zinc-50 border-l border-zinc-200 shadow-inner relative">
          <MainContent>{children}</MainContent>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;