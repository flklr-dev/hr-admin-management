import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiGitBranch, BiTime, BiUser, BiFlag, BiTrendingUp, BiCodeAlt, BiDollar, BiChart } from 'react-icons/bi';
import Header from './Header';
import Sidebar from './Sidebar';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  const projectCategories = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'critical', label: 'Critical' },
    { id: 'onHold', label: 'On Hold' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Neural Network Integration',
      category: 'active',
      priority: 'High',
      completion: 75,
      team: 8,
      deadline: '2024-06-15',
      budget: '$120,000',
      roi: '+25%',
      techStack: ['Python', 'TensorFlow', 'AWS'],
      color: 'from-violet-500 to-fuchsia-500',
      description: 'Implementation of advanced neural networks for predictive analytics',
      milestones: ['Data Collection', 'Model Training', 'Integration Testing'],
    },
    {
      id: 2,
      title: 'Quantum Computing Research',
      category: 'critical',
      priority: 'Critical',
      completion: 30,
      team: 12,
      deadline: '2024-07-01',
      budget: '$450,000',
      roi: '+40%',
      techStack: ['Q#', 'Python', 'CUDA'],
      color: 'from-rose-500 to-red-500',
      description: 'Exploring quantum algorithms for optimization problems',
      milestones: ['Algorithm Design', 'Quantum Circuit Implementation', 'Performance Analysis'],
    },
    {
      id: 3,
      title: 'Blockchain Implementation',
      category: 'active',
      priority: 'Medium',
      completion: 45,
      team: 6,
      deadline: '2024-08-30',
      budget: '$180,000',
      roi: '+15%',
      techStack: ['Solidity', 'Web3.js', 'React'],
      color: 'from-cyan-500 to-blue-500',
      description: 'Development of smart contracts and DApp infrastructure',
      milestones: ['Smart Contract Development', 'Frontend Integration', 'Security Audit'],
    },
    {
      id: 4,
      title: 'Cloud Migration',
      category: 'completed',
      priority: 'Completed',
      completion: 100,
      team: 10,
      deadline: '2024-05-01',
      budget: '$250,000',
      roi: '+30%',
      techStack: ['AWS', 'Docker', 'Kubernetes'],
      color: 'from-emerald-500 to-teal-500',
      description: 'Complete infrastructure migration to cloud platform',
      milestones: ['Architecture Planning', 'Data Migration', 'Performance Optimization'],
    },
    {
      id: 5,
      title: 'AI-Powered Analytics Platform',
      category: 'onHold',
      priority: 'Medium',
      completion: 60,
      team: 7,
      deadline: '2024-09-15',
      budget: '$200,000',
      roi: '+20%',
      techStack: ['Python', 'React', 'PostgreSQL'],
      color: 'from-amber-500 to-orange-500',
      description: 'Building an analytics platform with AI-driven insights',
      milestones: ['Data Pipeline Setup', 'AI Model Integration', 'Dashboard Development'],
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'all' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className={`flex flex-col min-h-screen ${isSidebarOpen ? 'pl-64' : 'pl-0'} transition-all duration-300`}>
        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-8 mt-20">
          {/* Search and Filter Section */}
          <div className="max-w-7xl mx-auto mb-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search projects or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                
                {/* Filter Buttons */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {projectCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFilter(category.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                        ${selectedFilter === category.id 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 overflow-hidden"
                >
                  {/* Project Header */}
                  <div className={`bg-gradient-to-r ${project.color} p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <p className="text-white/70 mt-1 text-sm">{project.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${project.category === 'critical' ? 'bg-red-500/20 text-red-200' :
                          project.category === 'completed' ? 'bg-green-500/20 text-green-200' :
                          project.category === 'onHold' ? 'bg-yellow-500/20 text-yellow-200' :
                          'bg-blue-500/20 text-blue-200'}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-white/80">
                        <span>Progress</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.completion}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${project.color}`}
                        />
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-white/70">
                        <BiUser className="w-5 h-5" />
                        <span>{project.team} team members</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <BiTime className="w-5 h-5" />
                        <span>{new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <BiDollar className="w-5 h-5" />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <BiChart className="w-5 h-5" />
                        <span>ROI: {project.roi}</span>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="space-y-2">
                      <h4 className="text-white/80 font-medium">Milestones</h4>
                      <div className="space-y-2">
                        {project.milestones.map((milestone, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center space-x-2 text-white/70"
                          >
                            <BiFlag className="w-4 h-4" />
                            <span className="text-sm">{milestone}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/70"
                        >
                          <BiCodeAlt className="inline-block w-4 h-4 mr-1" />
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-200 text-sm font-medium"
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 text-sm font-medium"
                      >
                        <BiGitBranch className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects; 