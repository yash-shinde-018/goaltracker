import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, User, LogOut, Home, Info, Settings, Flower, Trophy } from 'lucide-react';

const TopNavbar = ({ 
  currentPage, 
  onPageChange, 
  isDarkMode, 
  toggleDarkMode, 
  user, 
  onLogout 
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    ...(user ? [
      { id: 'dashboard', label: 'Dashboard', icon: null },
      { id: 'garden', label: 'My Garden', icon: Flower },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
    ] : []),
    ...(user ? [] : [
      { id: 'login', label: 'Login', icon: null },
      { id: 'signup', label: 'Sign Up', icon: null }
    ]),
    { id: 'about', label: 'About Us', icon: Info },
  ].filter(item => item.label); // Filter out items with null labels

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      {/* Center the entire navigation group */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-lg">
          {/* Main Navigation Items */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-white' 
                      : isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    {Icon && <Icon size={16} />}
                    <span>{item.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className={`
              p-2 rounded-full transition-all duration-300
              ${isDarkMode 
                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
              }
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </motion.button>

          {/* User Menu */}
          {user && (
            <div className="relative" ref={userMenuRef}>
              <motion.button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`
                  p-2 rounded-full transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50' 
                    : 'bg-gray-200/50 text-gray-700 hover:bg-gray-300/50'
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User size={18} />
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border
                      ${isDarkMode 
                        ? 'bg-gray-800/90 border-gray-700/50' 
                        : 'bg-white/90 border-gray-200/50'
                      }
                      backdrop-blur-md
                    `}
                  >
                    <div className="p-4 border-b border-gray-200/20">
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {user.email}
                      </p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          onPageChange('profile');
                          setIsUserMenuOpen(false);
                        }}
                        className={`
                          w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors
                          ${isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700/50' 
                            : 'text-gray-700 hover:bg-gray-100/50'
                          }
                        `}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          onPageChange('dashboard');
                          setIsUserMenuOpen(false);
                        }}
                        className={`
                          w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors
                          ${isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700/50' 
                            : 'text-gray-700 hover:bg-gray-100/50'
                          }
                        `}
                      >
                        <Settings size={16} />
                        <span>Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className={`
                          w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors
                          ${isDarkMode 
                            ? 'text-red-400 hover:bg-red-500/10' 
                            : 'text-red-600 hover:bg-red-50'
                          }
                        `}
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavbar;