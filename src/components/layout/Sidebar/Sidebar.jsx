'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getNavigation } from './navigation';

const Sidebar = ({ isOpen, onClose, isCollapsed }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role;

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAdmin = userRole === 'admin';
  const effectiveIsAdmin = isHydrated && isAdmin;

  const navigation = getNavigation(effectiveIsAdmin, router.pathname);

  return (
    <>
      {/* Mobile overlay with smoother opacity */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white flex flex-col h-screen transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:transform-none shadow-xl lg:shadow-lg ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo only - toggle button removed from here */}
          <div className="relative flex items-center h-20 px-4">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            
            {!isCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent whitespace-nowrap">
                  CMS Admin
                </h2>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation with refined spacing and smooth transitions */}
          <nav className="flex-1 px-3 py-6 overflow-y-auto">
            <ul className="space-y-1.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center ${
                      isCollapsed ? 'justify-center px-2' : 'px-4'
                    } py-3 rounded-xl transition-all duration-200 ease-in-out ${
                      isCollapsed ? 'hover:scale-105' : 'hover:scale-[1.02]'
                    } ${
                      item.current
                        ? 'bg-gradient-to-br from-blue-600 to-blue-400'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                    onClick={onClose}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <span className={`transition-all duration-200 ${
                      isCollapsed ? 'text-xl' : 'mr-3'
                    } ${
                      item.current 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-blue-600'
                    }`}>
                      {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                      <>
                        <span className={`font-medium transition-all duration-200 ${
                          item.current
                            ? 'text-white'
                            : 'group-hover:translate-x-0.5'
                        }`}>
                          {item.name}
                        </span>
                        
                        {/* Active indicator */}
                        {item.current && (
                          <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        )}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer with elegant styling */}
          <div className="relative px-4 py-6">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            
            {/* User profile section - collapsed or expanded */}
            {isHydrated && user && (
              <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center space-x-3'}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center border border-blue-200 flex-shrink-0">
                  <span className="text-blue-600 font-semibold">
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </span>
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user?.name || user?.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;