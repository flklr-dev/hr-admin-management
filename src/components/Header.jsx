import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BiMenu, BiEdit, BiBell, BiChevronRight, 
  BiLogOut, BiUser, BiCog, BiHelpCircle 
} from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/hr') return ['Dashboard', 'Overview'];
    if (path === '/hr/analytics') return ['Dashboard', 'Analytics'];
    if (path === '/hr/projects') return ['Dashboard', 'Projects'];
    if (path === '/hr/messages') return ['Dashboard', 'Messages'];
    if (path === '/hr/profile') return ['Dashboard', 'Profile'];
    return ['Dashboard', 'Overview'];
  };

  const [primary, secondary] = getBreadcrumbs();

  const notifications = [
    { id: 1, text: "New project assigned", time: "2m ago" },
    { id: 2, text: "Meeting in 30 minutes", time: "30m ago" },
    { id: 3, text: "Task deadline approaching", time: "1h ago" }
  ];

  const quickActions = [
    { id: 1, text: "New Task", icon: BiEdit },
    { id: 2, text: "New Project", icon: BiEdit },
    { id: 3, text: "New Message", icon: BiEdit }
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-20 backdrop-blur-lg bg-white/10 border-b border-white/10">
      <div className={`${isSidebarOpen ? 'pl-0 lg:pl-64' : 'pl-0'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="mr-4 text-white/70 hover:text-white lg:hidden"
              >
                <BiMenu className="w-6 h-6" />
              </button>
              {/* Breadcrumb - Hide on small screens */}
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-white/70">{primary}</span>
                <BiChevronRight className="w-5 h-5 text-white/50" />
                <span className="text-white">{secondary}</span>
              </div>
            </div>

            {/* Right side header content */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Quick Actions */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                >
                  <BiEdit className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {showQuickActions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/50 py-1"
                    >
                      {quickActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => {
                            setShowQuickActions(false);
                            // Add action handling here
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                        >
                          <action.icon className="w-4 h-4 mr-2" />
                          {action.text}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white relative"
                >
                  <BiBell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500" />
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-800/95 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/50 py-1"
                    >
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          <p className="text-sm text-white font-medium">{notification.text}</p>
                          <p className="text-xs text-white/70 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    HP
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm text-white">Harry Potter</p>
                    <p className="text-xs text-white/50">Admin</p>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-lg border border-white/20 shadow-lg shadow-black/50 py-1"
                    >
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('/hr/profile');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                      >
                        <BiUser className="w-4 h-4 mr-2" />
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('/hr/settings');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                      >
                        <BiCog className="w-4 h-4 mr-2" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          navigate('/hr/help');
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                      >
                        <BiHelpCircle className="w-4 h-4 mr-2" />
                        Help
                      </button>
                      <div className="border-t border-white/20 my-1" />
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          // Add logout handling here
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-400/20 transition-colors"
                      >
                        <BiLogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 