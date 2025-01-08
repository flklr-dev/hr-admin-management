import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { 
  BiUserPlus, BiMessageDetail, BiDotsHorizontalRounded, 
  BiTrendingUp, BiStar, BiTask, BiTime, BiFilter,
  BiSearch, BiSort, BiDownload, BiGroup, BiRocket
} from 'react-icons/bi';

const Team = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('team');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Animation springs matching Dashboard
  const statsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle
  });

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior UI Designer',
      department: 'design',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      performance: 98,
      tasks: 24,
      availability: 'Available',
      skills: ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping'],
      recentActivity: '2 hours ago',
      status: 'online',
      email: 'sarah.chen@company.com',
      location: 'San Francisco, CA',
      projects: ['Mobile App Redesign', 'Website Revamp']
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Full Stack Developer',
      department: 'development',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      performance: 95,
      tasks: 18,
      availability: 'In Meeting',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      recentActivity: '30 minutes ago',
      status: 'busy',
      email: 'michael.r@company.com',
      location: 'Austin, TX',
      projects: ['API Integration', 'Database Migration']
    },
    {
      id: 3,
      name: 'Emma Watson',
      role: 'Marketing Manager',
      department: 'marketing',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      performance: 92,
      tasks: 15,
      availability: 'Available',
      skills: ['Campaign Management', 'Social Media', 'Content Strategy'],
      recentActivity: '1 hour ago',
      status: 'online',
      email: 'emma.w@company.com',
      location: 'New York, NY',
      projects: ['Q4 Marketing Campaign', 'Brand Refresh']
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Product Manager',
      department: 'management',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      performance: 94,
      tasks: 32,
      availability: 'On Leave',
      skills: ['Product Strategy', 'Agile', 'User Research'],
      recentActivity: '1 day ago',
      status: 'offline',
      email: 'james.w@company.com',
      location: 'London, UK',
      projects: ['Product Roadmap', 'Feature Planning']
    },
    {
      id: 5,
      name: 'Sophia Kim',
      role: 'Data Scientist',
      department: 'development',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      performance: 97,
      tasks: 21,
      availability: 'Available',
      skills: ['Python', 'Machine Learning', 'Data Visualization'],
      recentActivity: '45 minutes ago',
      status: 'online',
      email: 'sophia.k@company.com',
      location: 'Seattle, WA',
      projects: ['Predictive Analytics', 'Data Pipeline']
    }
  ];

  const departments = [
    { id: 'all', name: 'All Teams', count: 45 },
    { id: 'design', name: 'Design', count: 12 },
    { id: 'development', name: 'Development', count: 18 },
    { id: 'marketing', name: 'Marketing', count: 8 },
    { id: 'management', name: 'Management', count: 7 }
  ];

  // Animation springs matching Dashboard
  const teamStatsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle
  });

  // Animated number counter for stats (matching Dashboard)
  const createNumberAnimation = (n) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: config.molasses,
    });
    return number;
  };

  const teamStats = [
    { 
      id: 1,
      title: 'Total Members',
      value: 45,
      increase: '+5%',
      icon: BiGroup,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 2,
      title: 'Active Projects',
      value: 12,
      increase: '+2%',
      icon: BiRocket,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 3,
      title: 'Avg Performance',
      value: 94,
      increase: '+3%',
      icon: BiTrendingUp,
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 4,
      title: 'Tasks Completed',
      value: 284,
      increase: '+12%',
      icon: BiTask,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Filter team members based on search and department
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
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
        
        <main className="flex-1 p-8 mt-16">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <animated.div style={statsSpring} className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Team Overview</h1>
                  <p className="text-white/60">Manage and monitor team performance</p>
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center space-x-2 transition-all">
                    <BiDownload className="w-5 h-5" />
                    <span>Export</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl flex items-center space-x-2 transition-all">
                    <BiUserPlus className="w-5 h-5" />
                    <span>Add Member</span>
                  </button>
                </div>
              </div>

              {/* Team Stats matching Dashboard style */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {teamStats.map((stat) => {
                  const animatedValue = createNumberAnimation(stat.value);

                  return (
                    <animated.div
                      key={stat.id}
                      className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 overflow-hidden"
                      style={{
                        transform: useSpring({
                          from: { scale: 1 },
                          scale: 1,
                          config: config.wobbly,
                        }).scale.to(s => `scale(${s})`),
                      }}
                    >
                      <div className="p-6 relative overflow-hidden">
                        <animated.div 
                          className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-20`}
                          style={useSpring({
                            from: { opacity: 0 },
                            to: { opacity: 0.2 },
                            config: config.gentle,
                          })}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <div>
                              <h2 className="text-xl font-semibold text-white/90 mb-2">
                                {stat.title}
                              </h2>
                              <div className="flex items-baseline">
                                <animated.p className="text-3xl font-bold text-white">
                                  {animatedValue.to(n => Math.floor(n))}
                                </animated.p>
                                <animated.p 
                                  className="ml-2 text-sm font-medium text-green-400"
                                  style={useSpring({
                                    from: { opacity: 0, x: -10 },
                                    to: { opacity: 1, x: 0 },
                                    delay: 300,
                                  })}
                                >
                                  {stat.increase}
                                </animated.p>
                              </div>
                            </div>
                            <animated.div 
                              className="p-3 bg-white/10 rounded-lg"
                              style={useSpring({
                                from: { rotate: 0 },
                                to: { rotate: 360 },
                                config: config.gentle,
                                delay: 500,
                              })}
                            >
                              <stat.icon className="w-8 h-8 text-white" />
                            </animated.div>
                          </div>
                        </div>
                      </div>
                    </animated.div>
                  );
                })}
              </div>

              {/* Search and Filter Section */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-white/40 focus:border-white/20 transition-colors"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center space-x-2 transition-colors">
                  <BiFilter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center space-x-2 transition-colors">
                  <BiSort className="w-5 h-5" />
                  <span>Sort</span>
                </button>
              </div>
            </animated.div>

            {/* Department Filters */}
            <animated.div style={useSpring({
              from: { opacity: 0, transform: 'translateX(-20px)' },
              to: { opacity: 1, transform: 'translateX(0)' },
              delay: 200,
              config: config.gentle
            })} className="mb-8">
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
                      selectedDepartment === dept.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <span>{dept.name}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                      {dept.count}
                    </span>
                  </button>
                ))}
              </div>
            </animated.div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member, index) => (
                <animated.div
                  key={member.id}
                  style={useSpring({
                    from: { opacity: 0, transform: 'scale(0.9)' },
                    to: { opacity: 1, transform: 'scale(1)' },
                    delay: index * 100,
                    config: config.gentle,
                  })}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6 group hover:bg-white/20 transition-all"
                >
                  {/* Member Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                          member.status === 'online' ? 'bg-green-500' : 
                          member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-white/60 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <BiDotsHorizontalRounded className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 rounded-xl bg-white/5">
                      <BiTrendingUp className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                      <p className="text-white text-lg font-semibold">{member.performance}%</p>
                      <p className="text-white/60 text-xs">Performance</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/5">
                      <BiTask className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                      <p className="text-white text-lg font-semibold">{member.tasks}</p>
                      <p className="text-white/60 text-xs">Tasks</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/5">
                      <BiTime className="w-5 h-5 text-green-400 mx-auto mb-1" />
                      <p className="text-white text-sm font-semibold">{member.availability}</p>
                      <p className="text-white/60 text-xs">Status</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-lg bg-white/5 text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-4 pt-4 border-t border-white/5">
                    <h4 className="text-white/60 text-sm mb-2">Current Projects</h4>
                    <div className="space-y-2">
                      {member.projects.map((project, idx) => (
                        <div key={idx} className="text-white text-sm">{project}</div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <p className="text-white/40 text-sm">
                      Active {member.recentActivity}
                    </p>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <BiMessageDetail className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <BiStar className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </animated.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Team; 