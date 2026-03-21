"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getNavigation } from "./navigation";
import { cn } from "@/lib/utils";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleSidebar, isMobile }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigation = getNavigation(userRole, router.pathname);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-zinc-900/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-screen",
          "bg-white border-r border-zinc-200",
          "transition-transform duration-300 ease-in-out lg:translate-x-0 will-change-transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header with collapse button */}
        <div className="relative flex items-center h-16 px-4">
          <div className={cn("flex items-center w-full", isCollapsed ? "justify-center" : "justify-between")}>
            {/* Menu Items Text */}
            {!isCollapsed && (
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-2">
                Menu
              </h2>
            )}

            {/* Collapse Toggle Button */}
            <button
              onClick={onToggleSidebar}
              disabled={isMobile}
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-md transition-colors",
                isMobile
                  ? "text-zinc-300 cursor-not-allowed hidden"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              {isCollapsed ? (
                <FiChevronRight className="w-4 h-4" />
              ) : (
                <FiChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = item.current;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    title={isCollapsed ? item.name : undefined}
                    className={cn(
                      "group flex items-center rounded-md transition-colors duration-200",
                      isCollapsed ? "justify-center h-10 w-10 mx-auto" : "px-3 py-2",
                      isActive
                        ? "bg-zinc-100/80 text-zinc-900 font-medium"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    )}
                  >
                    <span
                      className={cn(
                        "flex-shrink-0 transition-colors duration-200",
                        isCollapsed ? "text-lg" : "text-base",
                        isActive ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-600"
                      )}
                    >
                      {item.icon}
                    </span>

                    {/* Text */}
                    {!isCollapsed && (
                      <span className="ml-3 text-sm flex-1 truncate">
                        {item.name}
                      </span>
                    )}

                    {!isCollapsed && isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mr-1" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;