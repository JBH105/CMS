"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getNavigation } from "./navigation";

const Sidebar = ({ isOpen, onClose, isCollapsed }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAdmin = userRole === "admin";
  const effectiveIsAdmin = isHydrated && isAdmin;

  const navigation = isHydrated ? getNavigation(userRole, router.pathname) : [];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white flex flex-col h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:transform-none shadow-xl lg:shadow-lg ${
          isCollapsed ? "w-20" : "w-60"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="relative flex items-center justify-center h-16 px-4 ">
            <div className="absolute bottom-0 left-5 right-5 h-px bg-gray-200" />
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
              
                <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent whitespace-nowrap">
                  CMS
                </h2>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 px-3 py-6 overflow-y-auto">
            <ul className="space-y-1.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    title={isCollapsed ? item.name : undefined}
                    className={`
            group flex items-center
            ${isCollapsed ? "justify-center px-2" : "px-4"}
            py-3 rounded-xl
            transition-all duration-200

            ${
              item.current
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
            }
          `}
                  >
                    {/* Icon */}
                    <span
                      className={`
              transition-all duration-200
              ${isCollapsed ? "text-xl" : "mr-3 text-lg"}
              ${
                item.current
                  ? "text-white"
                  : "text-gray-400 group-hover:text-blue-600"
              }
            `}
                    >
                      {item.icon}
                    </span>

                    {/* Text */}
                    {!isCollapsed && (
                      <>
                        <span
                          className={`
                  font-medium
                  transition-all duration-200
                  ${item.current ? "text-white" : "group-hover:translate-x-0.5"}
                `}
                        >
                          {item.name}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          
        </div>
      </div>
    </>
  );
};

export default Sidebar;
