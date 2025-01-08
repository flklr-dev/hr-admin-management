import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { 
  BiTask, BiPlus, BiFilter, BiSearch, BiSort,
  BiCheckCircle, BiTime, BiCalendar, BiFlag,
  BiUser, BiDotsVerticalRounded, BiChevronDown,
  BiListCheck, BiAlarm
} from 'react-icons/bi';

const Tasks = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

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

  const taskStats = [
    {
      id: 1,
      title: 'Total Tasks',
      value: 124,
      increase: '+8%',
      icon: BiListCheck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'In Progress',
      value: 45,
      increase: '+12%',
      icon: BiTime,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Completed',
      value: 68,
      increase: '+15%',
      icon: BiCheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'Pending Review',
      value: 11,
      increase: '-2%',
      icon: BiAlarm,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Update Employee Handbook',
      description: 'Review and update company policies and procedures',
      assignee: {
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-03-25',
      progress: 75,
      tags: ['Documentation', 'HR']
    },
    {
      id: 2,
      title: 'Quarterly Performance Reviews',
      description: 'Conduct performance evaluations for Q1',
      assignee: {
        name: 'Michael Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-03-30',
      progress: 30,
      tags: ['HR', 'Reviews']
    },
    {
      id: 3,
      title: 'Training Program Development',
      description: 'Create new onboarding materials for technical staff',
      assignee: {
        name: 'Emma Watson',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      priority: 'high',
      status: 'completed',
      dueDate: '2024-03-20',
      progress: 100,
      tags: ['Training', 'Development']
    }
  ];

  // Animation springs
  const statsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

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
                  <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
                  <p className="text-white/60">Manage and track team tasks</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl flex items-center space-x-2 transition-all">
                  <BiPlus className="w-5 h-5" />
                  <span>New Task</span>
                </button>
              </div>

              {/* Task Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {taskStats.map((stat) => {
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
                                  className={`ml-2 text-sm font-medium ${stat.increase.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
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

              {/* Filters and Search */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
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

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <animated.div
                  key={task.id}
                  style={useSpring({
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0px)' },
                    delay: index * 100,
                    config: config.gentle,
                  })}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-white/60 mb-4">{task.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {task.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-lg bg-white/5 text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="text-white/60 hover:text-white">
                      <BiDotsVerticalRounded className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-white/80 text-sm">{task.assignee.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <BiCalendar className="w-5 h-5" />
                        <span className="text-sm">{task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-white/80 text-sm">{task.progress}%</span>
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

export default Tasks; 