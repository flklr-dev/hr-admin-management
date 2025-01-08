import React from 'react';
import { motion } from 'framer-motion';
import { 
  BiMenu, 
  BiEdit, 
  BiBell, 
  BiChevronRight 
} from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

const Header = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/hr') return ['Dashboard', 'Overview'];
    if (path === '/hr/analytics') return ['Dashboard', 'Analytics'];
    // Add more paths as needed
    return ['Dashboard', 'Overview'];
  };

  const [primary, secondary] = getBreadcrumbs();

  return (
    <nav className="fixed top-0 right-0 left-0 z-20 backdrop-blur-lg bg-white/10 border-b border-white/10">
      <div className={`${isSidebarOpen ? 'pl-64' : 'pl-0'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {!isSidebarOpen && (
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 text-white/70 hover:text-white"
                >
                  <BiMenu className="w-6 h-6" />
                </button>
              )}
              {/* Breadcrumb */}
              <div className="flex items-center space-x-4">
                <span className="text-white/70">{primary}</span>
                <BiChevronRight className="w-5 h-5 text-white/50" />
                <span className="text-white">{secondary}</span>
              </div>
            </div>

            {/* Right side header content */}
            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
              >
                <BiEdit className="w-5 h-5" />
              </motion.button>
              
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white relative"
              >
                <BiBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pink-500" />
              </motion.button>

              {/* Profile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 