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
  FiMenu,
} from "react-icons/fi";

const Header = ({
  onMenuClick,
  onToggleSidebar,
  isSidebarCollapsed,
  isMobile,
}) => {
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
  const displayInitial = displayName?.charAt(0)?.toUpperCase() || "U";

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-30 bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">

          {/* Mobile menu */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            disabled={isMobile}
            className={`hidden lg:flex w-10 h-10 items-center justify-center rounded-lg transition ${
              isMobile
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {isSidebarCollapsed ? (
              <FiChevronRight className="w-5 h-5" />
            ) : (
              <FiChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* Notification */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
            <FiBell className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-blue-50 transition"
            >
              {/* Avatar */}
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {displayInitial}
                </span>
              </div>

              {/* User Info */}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-800">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500">
                  {displayRole}
                </p>
              </div>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />

                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {displayEmail}
                    </p>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;