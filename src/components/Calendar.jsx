import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import { 
  BiCalendar, BiTime, BiGroup, BiPlus, 
  BiChevronLeft, BiChevronRight, BiX, BiCheck 
} from 'react-icons/bi';

const Calendar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Team Standup',
      time: '09:00 AM',
      duration: '30min',
      attendees: 8,
      type: 'meeting',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Product Review',
      time: '11:00 AM',
      duration: '1h',
      attendees: 12,
      type: 'review',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Interview: Senior Dev',
      time: '02:00 PM',
      duration: '45min',
      attendees: 3,
      type: 'interview',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  // Animation springs
  const calendarSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle
  });

  const eventsSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(30px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 200,
    config: config.gentle
  });

  // Calendar grid generation
  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
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
            {/* Calendar Header */}
            <animated.div style={calendarSpring} className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
                  <p className="text-white/60">Plan and manage your schedule</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl flex items-center space-x-2"
                >
                  <BiPlus className="w-5 h-5" />
                  <span>Add Event</span>
                </motion.button>
              </div>
            </animated.div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <animated.div style={calendarSpring} className="lg:col-span-2">
                <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">
                      {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                        onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                      >
                        <BiChevronLeft className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                        onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                      >
                        <BiChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Weekday Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-white/60 text-sm py-2">
                        {day}
                      </div>
                    ))}

                    {/* Calendar Days */}
                    {generateCalendarDays().map((day, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`
                          aspect-square rounded-xl p-2 cursor-pointer
                          ${day ? 'hover:bg-white/10' : ''}
                          ${day === selectedDate.getDate() ? 'bg-gradient-to-r from-purple-500/50 to-pink-500/50' : 'bg-white/5'}
                        `}
                      >
                        {day && (
                          <div className="h-full flex flex-col">
                            <span className="text-white/80">{day}</span>
                            {/* Event indicators */}
                            <div className="flex-1 flex items-end justify-center">
                              <div className="flex space-x-1">
                                {events.length > 0 && (
                                  <div className="w-1 h-1 rounded-full bg-purple-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </animated.div>

              {/* Events List */}
              <animated.div style={eventsSpring} className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Today's Schedule</h2>
                <div className="space-y-4">
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-medium">{event.title}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-white/60 text-sm">
                              <BiTime className="w-4 h-4 mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-white/60 text-sm">
                              <BiGroup className="w-4 h-4 mr-1" />
                              {event.attendees} attendees
                            </div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-xs bg-gradient-to-r ${event.color} text-white`}>
                          {event.duration}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </animated.div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Event Modal */}
      {showEventModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Add New Event</h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-white/60 hover:text-white"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>
            {/* Add your form fields here */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/40"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                />
                <input
                  type="date"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white"
                />
              </div>
              <textarea
                placeholder="Event Description"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/40"
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Add Event
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Calendar; 