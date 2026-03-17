"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "@/features/auth/services/authSlice";
import {
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiUser,
  FiMenu,
  FiSettings,
} from "react-icons/fi";

const Header = ({ onMenuClick, onToggleSidebar, isSidebarCollapsed }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const displayName = user?.username || user?.name;
  const displayRole = user?.role;
  const displayEmail = user?.email;
  const displayInitial = displayName;

  if (!mounted) return null;

  return (
    <header className="bg-white border-b border-blue-100 flex-shrink-0 sticky top-0 z-30 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)] ">
      <div className="flex items-center justify-between h-20 px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-5 h-5 transition-all duration-200 group-hover:scale-110 group-hover:text-blue-600" />
          </button>

          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex relative w-10 h-10 items-center justify-center rounded-xl text-gray-600 hover:bg-blue-50 transition-all duration-200 group cursor-pointer"
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isSidebarCollapsed ? (
              <FiChevronRight className="w-5 h-5 transition-all duration-200 group-hover:scale-110" />
            ) : (
              <FiChevronLeft className="w-5 h-5 transition-all duration-200 group-hover:scale-110" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
            <FiBell className="w-5 h-5 transition-all duration-200 group-hover:scale-110 group-hover:text-blue-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md shadow-blue-100 group-hover:shadow-lg group-hover:shadow-blue-200 transition-all duration-200">
                  <span className="text-sm font-semibold text-white">
                    {displayInitial}
                  </span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500">{displayRole}</p>
              </div>
            </button>

            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-blue-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                        <span className="text-sm font-semibold text-white">
                          {displayInitial}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {displayEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 group">
                      <FiUser className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                      <span className="group-hover:text-blue-600 transition-colors duration-200">
                        Profile Settings
                      </span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 group">
                      <FiSettings className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                      <span className="group-hover:text-blue-600 transition-colors duration-200">
                        Account Settings
                      </span>
                    </button>
                  </div>

                  <div className="border-t border-blue-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 group"
                    >
                      <FiLogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subtle gradient line at bottom matching sidebar style */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
    </header>
  );
};

export default Header;
