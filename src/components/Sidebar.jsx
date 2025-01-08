import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BiHomeAlt, BiAnalyse, BiLayer, BiCalendarEvent,
  BiGroup, BiCheckCircle, BiChart, BiMessageSquare,
  BiUserCircle, BiCog, BiHelpCircle, BiDiamond,
  BiSearch, BiX
} from 'react-icons/bi';

const Sidebar = ({ isSidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const mainNavItems = [
    { id: 'dashboard', icon: BiHomeAlt, label: 'Dashboard', path: '/hr' },
    { id: 'analytics', icon: BiAnalyse, label: 'Analytics', path: '/hr/analytics' },
    { id: 'projects', icon: BiLayer, label: 'Projects', path: '/hr/projects' },
    { id: 'calendar', icon: BiCalendarEvent, label: 'Calendar', path: '/hr/calendar' }
  ];

  const resourceNavItems = [
    { id: 'team', icon: BiGroup, label: 'Team Members', path: '/hr/team' },
    { id: 'tasks', icon: BiCheckCircle, label: 'Tasks', path: '/hr/tasks' },
    { id: 'reports', icon: BiChart, label: 'Reports', path: '/hr/reports' },
    { id: 'messages', icon: BiMessageSquare, label: 'Messages', path: '/hr/messages' },
    { id: 'profile', icon: BiUserCircle, label: 'Profile', path: '/hr/profile' }
  ];

  const handleNavigation = (item) => {
    if (item.path) {
      setActiveTab(item.id);
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className={`fixed top-0 left-0 h-screen w-64 backdrop-blur-lg bg-white/10 border-r border-white/10 z-30
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <BiDiamond className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  HR Vision
                </h1>
                <p className="text-xs text-white/60">Management Dashboard</p>
              </div>
            </motion.div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="text-white/70 hover:text-white lg:hidden"
            >
              <BiX className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full bg-white/10 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
              />
              <BiSearch className="absolute left-3 top-2.5 text-white/50 w-5 h-5" />
            </div>
          </div>

          {/* Navigation Sections */}
          <NavSection 
            title="Main Menu" 
            items={mainNavItems} 
            activeTab={activeTab} 
            onItemClick={handleNavigation} 
          />
          <NavSection 
            title="Resources" 
            items={resourceNavItems} 
            activeTab={activeTab} 
            onItemClick={handleNavigation} 
          />
        </div>
      </motion.div>
    </>
  );
};

const NavSection = ({ title, items, activeTab, onItemClick }) => (
  <div className="mb-8">
    <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4 px-3">
      {title}
    </h2>
    <div className="space-y-1">
      {items.map((item) => (
        <motion.button
          key={item.id}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onItemClick(item)}
          className={`w-full flex items-center p-3 rounded-xl transition-all ${
            activeTab === item.id 
              ? 'bg-gradient-to-r from-pink-500/80 to-purple-500/80 text-white' 
              : 'text-white/70 hover:bg-white/10'
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </motion.button>
      ))}
    </div>
  </div>
);

export default Sidebar; 