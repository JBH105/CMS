"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "@/features/auth/services/authSlice";
import {
  FiBell,
  FiLogOut,
  FiMenu,
  FiSearch,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const Header = ({ onMenuClick, isSidebarCollapsed, isMobile }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const displayName = user?.username || user?.name || "User";
  const displayRole = user?.role || "Admin";
  const displayEmail = user?.email || "user@example.com";
  const displayInitial = displayName.charAt(0).toUpperCase();

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div className="hidden sm:flex items-center">
              <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">
                CMS
              </h2>
            </div>
          </div>

          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          {/* Search Bar - hidden on small mobile */}
          {/* <div className="hidden md:flex items-center relative ml-4">
            <FiSearch className="w-4 h-4 text-zinc-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-1.5 w-64 bg-zinc-50 border border-zinc-200 rounded-md text-sm text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all"
            />
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors">
            <FiBell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 rounded-full sm:rounded-md hover:bg-zinc-100 transition-colors focus:outline-none focus:bg-zinc-100"
            >
              <div className="w-8 h-8 bg-zinc-100 border border-zinc-200 rounded-full flex items-center justify-center">
                <span className="text-zinc-700 text-xs font-semibold">
                  {displayInitial}
                </span>
              </div>
              <div className="hidden lg:block text-left mr-1">
                <p className="text-sm font-medium text-zinc-900 leading-none">
                  {displayName}
                </p>
                <p className="text-xs text-zinc-500 mt-1 leading-none capitalize">
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
                <div className="absolute right-0 mt-2 w-56 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
                    <p className="text-sm font-medium text-zinc-900 truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {displayEmail}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
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