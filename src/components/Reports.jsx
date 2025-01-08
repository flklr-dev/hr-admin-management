import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell
} from 'recharts';
import { 
  BiDownload, BiFilter, BiRefresh, BiBarChart,
  BiPieChart, BiLineChart, BiRadar, BiCalendar
} from 'react-icons/bi';

const Reports = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const navigate = useNavigate();

  // Sample data for various charts
  const performanceData = [
    { month: 'Jan', productivity: 85, engagement: 78, satisfaction: 82 },
    { month: 'Feb', productivity: 88, engagement: 80, satisfaction: 85 },
    { month: 'Mar', productivity: 92, engagement: 85, satisfaction: 88 },
    { month: 'Apr', productivity: 90, engagement: 87, satisfaction: 86 },
    { month: 'May', productivity: 95, engagement: 89, satisfaction: 90 },
    { month: 'Jun', productivity: 93, engagement: 88, satisfaction: 89 }
  ];

  const departmentMetrics = [
    { name: 'Engineering', value: 35, color: '#8884d8' },
    { name: 'Marketing', value: 25, color: '#82ca9d' },
    { name: 'Sales', value: 20, color: '#ffc658' },
    { name: 'HR', value: 10, color: '#ff7c43' },
    { name: 'Support', value: 10, color: '#f44336' }
  ];

  const skillsRadarData = [
    { skill: 'Technical', value: 85 },
    { skill: 'Leadership', value: 75 },
    { skill: 'Communication', value: 90 },
    { skill: 'Problem Solving', value: 88 },
    { skill: 'Teamwork', value: 92 },
    { skill: 'Innovation', value: 78 }
  ];

  const retentionData = [
    { month: 'Jan', retained: 95, turnover: 5 },
    { month: 'Feb', retained: 94, turnover: 6 },
    { month: 'Mar', retained: 96, turnover: 4 },
    { month: 'Apr', retained: 93, turnover: 7 },
    { month: 'May', retained: 95, turnover: 5 },
    { month: 'Jun', retained: 97, turnover: 3 }
  ];

  // Animation springs
  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle
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
            <animated.div style={headerSpring} className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">HR Analytics Reports</h1>
                  <p className="text-white/60">Comprehensive insights and performance metrics</p>
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center space-x-2 transition-all">
                    <BiDownload className="w-5 h-5" />
                    <span>Export Report</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl flex items-center space-x-2 transition-all">
                    <BiRefresh className="w-5 h-5" />
                    <span>Refresh Data</span>
                  </button>
                </div>
              </div>

              {/* Period Selector */}
              <div className="flex space-x-4 mb-8">
                {['week', 'month', 'quarter', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      selectedPeriod === period
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </animated.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trends */}
              <animated.div
                style={useSpring({
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                  delay: 200,
                  config: config.gentle,
                })}
                className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Performance Trends</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
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
                      <Line type="monotone" dataKey="productivity" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="engagement" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="satisfaction" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </animated.div>

              {/* Department Distribution */}
              <animated.div
                style={useSpring({
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                  delay: 300,
                  config: config.gentle,
                })}
                className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Department Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentMetrics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {departmentMetrics.map((entry, index) => (
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
                </div>
              </animated.div>

              {/* Skills Assessment */}
              <animated.div
                style={useSpring({
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                  delay: 400,
                  config: config.gentle,
                })}
                className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Skills Assessment</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsRadarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="skill" stroke="rgba(255,255,255,0.7)" />
                      <PolarRadiusAxis stroke="rgba(255,255,255,0.7)" />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </animated.div>

              {/* Retention Analysis */}
              <animated.div
                style={useSpring({
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                  delay: 500,
                  config: config.gentle,
                })}
                className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Retention Analysis</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={retentionData}>
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
                        dataKey="retained"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="turnover"
                        stackId="1"
                        stroke="#ff7c43"
                        fill="#ff7c43"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </animated.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports; 