import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { BiGroup, BiBuilding, BiCheckCircle, BiTrendingUp } from 'react-icons/bi';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const stats = [
    { 
      id: 1, 
      title: 'Total Employees', 
      value: 245, 
      increase: '+12%',
      icon: BiGroup,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 2, 
      title: 'Active Projects', 
      value: 15, 
      increase: '+5%',
      icon: BiBuilding,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 3, 
      title: 'Tasks Completed', 
      value: 1234, 
      increase: '+18%',
      icon: BiCheckCircle,
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 4, 
      title: 'Revenue Growth', 
      value: '$84.5K', 
      increase: '+24%',
      icon: BiTrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // New sample data for charts
  const projectTimeline = [
    { month: 'Jan', completed: 12, ongoing: 8, delayed: 3 },
    { month: 'Feb', completed: 15, ongoing: 10, delayed: 2 },
    { month: 'Mar', completed: 18, ongoing: 7, delayed: 4 },
    { month: 'Apr', completed: 14, ongoing: 12, delayed: 1 },
    { month: 'May', completed: 20, ongoing: 9, delayed: 2 },
    { month: 'Jun', completed: 17, ongoing: 11, delayed: 3 },
  ];

  const teamPerformance = [
    { name: 'Frontend', value: 30, color: '#8884d8' },
    { name: 'Backend', value: 25, color: '#82ca9d' },
    { name: 'DevOps', value: 15, color: '#ffc658' },
    { name: 'Design', value: 20, color: '#ff7c43' },
    { name: 'QA', value: 10, color: '#f44336' },
  ];

  // Add spring animations for stats cards
  const statsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle
  });

  // Animated number counter for stats
  const createNumberAnimation = (n) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: config.molasses,
    });
    return number;
  };

  // Chart animation
  const chartSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.gentle,
    delay: 300
  });

  // Activities animation
  const activitiesSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-30px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: config.gentle,
    delay: 400
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
        
        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <animated.div 
              style={statsSpring}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat) => {
                const animatedValue = createNumberAnimation(
                  typeof stat.value === 'number' ? stat.value : parseInt(stat.value.replace(/\D/g, ''))
                );

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
                    <div className={`p-6 relative overflow-hidden`}>
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
                                {typeof stat.value === 'number' 
                                  ? animatedValue.to(n => Math.floor(n))
                                  : animatedValue.to(n => `$${Math.floor(n)}K`)}
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
            </animated.div>

            {/* Charts Section */}
            <animated.div
              style={chartSpring}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
              {/* Project Timeline Chart */}
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Project Timeline</h2>
                <animated.div 
                  className="h-80"
                  style={useSpring({
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0px)' },
                    config: config.gentle,
                    delay: 200,
                  })}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="ongoing" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="delayed" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </animated.div>
              </div>

              {/* Team Distribution */}
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Team Distribution</h2>
                <animated.div 
                  className="h-80"
                  style={useSpring({
                    from: { opacity: 0, transform: 'scale(0.8)' },
                    to: { opacity: 1, transform: 'scale(1)' },
                    config: config.gentle,
                    delay: 300,
                  })}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={teamPerformance}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {teamPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </animated.div>
              </div>
            </animated.div>

            {/* Recent Activities */}
            <animated.div
              style={activitiesSpring}
              className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <animated.div
                    key={item}
                    style={useSpring({
                      from: { opacity: 0, x: -20 },
                      to: { opacity: 1, x: 0 },
                      delay: item * 200,
                      config: config.gentle,
                    })}
                    className="flex items-center p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center">
                      <BiCheckCircle className="w-5 h-5 text-purple-300" />
                    </div>
                    <div className="ml-4">
                      <p className="text-white font-medium">Project milestone completed</p>
                      <p className="text-white/60 text-sm">2 hours ago</p>
                    </div>
                  </animated.div>
                ))}
              </div>
            </animated.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Create Project', 'Add Team Member', 'Schedule Meeting'].map((action, index) => (
                <animated.button
                  key={action}
                  style={useSpring({
                    from: { opacity: 0, y: 20 },
                    to: { opacity: 1, y: 0 },
                    delay: index * 200,
                    config: config.gentle,
                  })}
                  className="p-4 backdrop-blur-lg bg-white/10 rounded-xl border border-white/10 text-white font-medium"
                >
                  {action}
                </animated.button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 