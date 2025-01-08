import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { 
  BiUser, BiEnvelope, BiPhone, BiMap, BiCalendar, 
  BiGitBranch, BiCodeAlt, BiTrophy, BiLineChart,
  BiEdit, BiDownload
} from 'react-icons/bi';

const Profile = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const userProfile = {
    name: "Alexandra Morrison",
    role: "Senior Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra",
    email: "alex.morrison@company.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "March 2022",
    bio: "Passionate frontend developer with expertise in React and modern web technologies. Love creating beautiful and intuitive user interfaces.",
    department: "Engineering",
    team: "Product Development",
    manager: "Sarah Chen",
  };

  const skills = [
    { name: "React", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "GraphQL", level: 70 },
  ];

  const achievements = [
    { 
      id: 1, 
      title: "Employee of the Month",
      date: "February 2024",
      description: "Recognized for exceptional contribution to the Analytics Dashboard project"
    },
    { 
      id: 2, 
      title: "Innovation Award",
      date: "December 2023",
      description: "Developed a new component library that reduced development time by 40%"
    },
    { 
      id: 3, 
      title: "Perfect Attendance",
      date: "2023",
      description: "Maintained 100% attendance and punctuality throughout the year"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "project",
      action: "Completed",
      target: "Analytics Dashboard Phase 2",
      date: "2 days ago",
      icon: BiLineChart,
      color: "bg-purple-500"
    },
    {
      id: 2,
      type: "code",
      action: "Merged",
      target: "Feature: User Authentication",
      date: "1 week ago",
      icon: BiGitBranch,
      color: "bg-blue-500"
    },
    {
      id: 3,
      type: "achievement",
      action: "Earned",
      target: "Advanced React Certification",
      date: "2 weeks ago",
      icon: BiTrophy,
      color: "bg-yellow-500"
    }
  ];

  // Animations
  const profileSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: config.gentle
  });

  const skillSpring = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: 200,
    config: config.gentle
  });

  const activitySpring = useSpring({
    from: { opacity: 0, x: 20 },
    to: { opacity: 1, x: 0 },
    delay: 400,
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
            {/* Profile Header */}
            <animated.div 
              style={profileSpring}
              className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-32 h-32 rounded-full border-4 border-purple-500/20"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-colors">
                    <BiEdit className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white mb-2">{userProfile.name}</h1>
                  <p className="text-purple-300 mb-4">{userProfile.role}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center space-x-2 text-white/70">
                      <BiEnvelope className="w-5 h-5" />
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <BiPhone className="w-5 h-5" />
                      <span>{userProfile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <BiMap className="w-5 h-5" />
                      <span>{userProfile.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white text-sm font-medium transition-colors">
                    Edit Profile
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 transition-colors">
                    <BiDownload className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </animated.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Skills & Info */}
              <animated.div 
                style={skillSpring}
                className="lg:col-span-1 space-y-6"
              >
                {/* Basic Info */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/50">Department</span>
                      <span className="text-white">{userProfile.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Team</span>
                      <span className="text-white">{userProfile.team}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Manager</span>
                      <span className="text-white">{userProfile.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Join Date</span>
                      <span className="text-white">{userProfile.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-white/50">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <animated.div
                            style={{
                              width: `${skill.level}%`,
                              height: '100%',
                            }}
                            className="bg-gradient-to-r from-purple-500 to-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </animated.div>

              {/* Activity & Achievements */}
              <animated.div 
                style={activitySpring}
                className="lg:col-span-2 space-y-6"
              >
                {/* Recent Activity */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`p-2 ${activity.color} rounded-xl`}>
                          <activity.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white">
                            <span className="text-purple-300">{activity.action}</span>
                            {" "}{activity.target}
                          </p>
                          <p className="text-sm text-white/50">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
                  <div className="space-y-6">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start space-x-4">
                        <div className="p-2 bg-yellow-500 rounded-xl">
                          <BiTrophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{achievement.title}</p>
                          <p className="text-sm text-white/70 mb-1">{achievement.description}</p>
                          <p className="text-sm text-white/50">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </animated.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile; 