import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { BiTrendingUp, BiGroup, BiTime, BiDollar } from 'react-icons/bi';

const Analytics = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');
  const navigate = useNavigate();

  // Sample data for various charts
  const employeeGrowthData = [
    { month: 'Jan', employees: 200, hired: 15, left: 5 },
    { month: 'Feb', employees: 210, hired: 20, left: 8 },
    { month: 'Mar', employees: 222, hired: 18, left: 6 },
    { month: 'Apr', employees: 234, hired: 25, left: 10 },
    { month: 'May', employees: 249, hired: 22, left: 7 },
    { month: 'Jun', employees: 264, hired: 30, left: 12 }
  ];

  const departmentPerformance = [
    { department: 'Engineering', performance: 85, satisfaction: 90, retention: 95 },
    { department: 'Marketing', performance: 78, satisfaction: 85, retention: 88 },
    { department: 'Sales', performance: 92, satisfaction: 88, retention: 90 },
    { department: 'HR', performance: 88, satisfaction: 92, retention: 94 },
    { department: 'Support', performance: 82, satisfaction: 87, retention: 89 }
  ];

  const salaryDistribution = [
    { range: '20-30k', count: 45, department: 'Support' },
    { range: '30-40k', count: 85, department: 'Operations' },
    { range: '40-50k', count: 65, department: 'Marketing' },
    { range: '50-60k', count: 95, department: 'Engineering' },
    { range: '60k+', count: 35, department: 'Management' }
  ];

  const metrics = [
    { 
      id: 1, 
      title: 'Employee Growth', 
      value: '+32%', 
      increase: '+12%',
      icon: BiGroup,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 2, 
      title: 'Time to Hire', 
      value: '18 days', 
      increase: '-3d',
      icon: BiTime,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 3, 
      title: 'Cost per Hire', 
      value: '$4.2K', 
      increase: '-8%',
      icon: BiDollar,
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 4, 
      title: 'ROI', 
      value: '189%', 
      increase: '+12%',
      icon: BiTrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Add spring animations
  const metricsSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle
  });

  const chartSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.gentle,
    delay: 200
  });

  const radarSpring = useSpring({
    from: { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
    to: { opacity: 1, transform: 'rotate(0deg) scale(1)' },
    config: config.gentle,
    delay: 300
  });

  const barChartSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
    delay: 400
  });

  // Animated number counter for metrics
  const createNumberAnimation = (value) => {
    let numberValue;
    
    if (typeof value === 'string') {
      // Handle different string formats
      if (value.includes('%')) {
        numberValue = parseFloat(value.replace('%', ''));
      } else if (value.includes('$')) {
        numberValue = parseFloat(value.replace(/[$,K]/g, ''));
      } else if (value.includes('days')) {
        numberValue = parseFloat(value.replace(' days', ''));
      } else {
        numberValue = parseFloat(value);
      }
    } else {
      numberValue = value;
    }

    const { number } = useSpring({
      from: { number: 0 },
      number: numberValue || 0,
      delay: 200,
      config: config.molasses,
    });
    
    return number;
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
        
        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Metrics Overview */}
              <animated.div 
                style={metricsSpring}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                {metrics.map((metric) => {
                  const animatedValue = createNumberAnimation(
                    typeof metric.value === 'string' 
                      ? parseFloat(metric.value.replace(/[^0-9.-]/g, ''))
                      : metric.value
                  );

                  return (
                    <animated.div
                      key={metric.id}
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
                          className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-20`}
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
                                {metric.title}
                              </h2>
                              <div className="flex items-baseline">
                                <animated.p className="text-3xl font-bold text-white">
                                  {metric.value.includes('%') 
                                    ? animatedValue.to(n => `${n.toFixed(0)}%`)
                                    : metric.value.includes('$')
                                    ? animatedValue.to(n => `$${n.toFixed(1)}K`)
                                    : metric.value.includes('days')
                                    ? animatedValue.to(n => `${n.toFixed(0)} days`)
                                    : animatedValue.to(n => n.toFixed(0))}
                                </animated.p>
                                <animated.p 
                                  className="ml-2 text-sm font-medium text-green-400"
                                  style={useSpring({
                                    from: { opacity: 0, x: -10 },
                                    to: { opacity: 1, x: 0 },
                                    delay: 300,
                                  })}
                                >
                                  {metric.increase}
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
                              <metric.icon className="w-8 h-8 text-white" />
                            </animated.div>
                          </div>
                        </div>
                      </div>
                    </animated.div>
                  );
                })}
              </animated.div>

              {/* Employee Growth Chart */}
              <animated.div
                style={chartSpring}
                className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Employee Growth Trends</h2>
                <animated.div 
                  className="h-80"
                  style={useSpring({
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0px)' },
                    delay: 300,
                    config: config.gentle,
                  })}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={employeeGrowthData}>
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
                      <Area 
                        type="monotone" 
                        dataKey="employees" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="hired" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="left" 
                        stroke="#ffc658" 
                        fill="#ffc658" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </animated.div>
              </animated.div>

              {/* Department Performance and Salary Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <animated.div
                  style={radarSpring}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-6">Department Performance</h2>
                  <animated.div 
                    className="h-80"
                    style={useSpring({
                      from: { opacity: 0, transform: 'scale(0.8) rotate(-10deg)' },
                      to: { opacity: 1, transform: 'scale(1) rotate(0deg)' },
                      delay: 400,
                      config: config.gentle,
                    })}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={departmentPerformance}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="department" stroke="rgba(255,255,255,0.7)" />
                        <PolarRadiusAxis stroke="rgba(255,255,255,0.7)" />
                        <Radar 
                          name="Performance" 
                          dataKey="performance" 
                          stroke="#8884d8" 
                          fill="#8884d8" 
                          fillOpacity={0.6} 
                        />
                        <Radar 
                          name="Satisfaction" 
                          dataKey="satisfaction" 
                          stroke="#82ca9d" 
                          fill="#82ca9d" 
                          fillOpacity={0.6} 
                        />
                        <Radar 
                          name="Retention" 
                          dataKey="retention" 
                          stroke="#ffc658" 
                          fill="#ffc658" 
                          fillOpacity={0.6} 
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </animated.div>
                </animated.div>

                <animated.div
                  style={barChartSpring}
                  className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-6">Salary Distribution</h2>
                  <animated.div 
                    className="h-80"
                    style={useSpring({
                      from: { opacity: 0, transform: 'translateX(20px)' },
                      to: { opacity: 1, transform: 'translateX(0px)' },
                      delay: 500,
                      config: config.gentle,
                    })}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salaryDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="range" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </animated.div>
                </animated.div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics; 