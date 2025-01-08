import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { BiSend, BiSmile, BiPaperclip, BiSearch, BiDotsHorizontalRounded } from 'react-icons/bi';

const Messages = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('messages');
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const navigate = useNavigate();

  const contacts = [
    {
      id: 1,
      name: 'Sarah Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'UI/UX Designer',
      status: 'online',
      lastMessage: 'The new dashboard looks great!',
      time: '2m ago',
      unread: 3,
    },
    {
      id: 2,
      name: 'John Mitchell',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'Frontend Developer',
      status: 'offline',
      lastMessage: "I'll check the PR tomorrow",
      time: '1h ago',
      unread: 0,
    },
    {
      id: 3,
      name: 'Emily Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      role: 'Product Manager',
      status: 'online',
      lastMessage: 'Meeting at 3 PM?',
      time: '30m ago',
      unread: 1,
    },
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      text: "Hi! I've finished the UI mockups for the analytics dashboard.",
      time: '10:30 AM',
      attachments: ['dashboard-mock.png'],
    },
    {
      id: 2,
      senderId: 'me',
      text: "That's great! Can you walk me through the main features?",
      time: '10:32 AM',
    },
    {
      id: 3,
      senderId: 1,
      text: "Sure! I've focused on making the data visualization more intuitive and added some new interactive elements.",
      time: '10:35 AM',
    },
  ];

  const containerSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: config.gentle,
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    // Add message handling logic here
    setMessageInput('');
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
        
        <main className="flex-1 p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <animated.div 
              style={containerSpring}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]"
            >
              {/* Contacts List */}
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <div className="relative">
                    <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                </div>
                
                <div className="overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                  {contacts.map((contact) => (
                    <animated.button
                      key={contact.id}
                      onClick={() => setActiveChat(contact)}
                      className={`w-full p-4 flex items-center space-x-4 hover:bg-white/5 transition-colors
                        ${activeChat?.id === contact.id ? 'bg-white/10' : ''}`}
                    >
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900
                          ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-white font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-white/50">{contact.time}</span>
                        </div>
                        <p className="text-white/70 text-sm truncate">{contact.lastMessage}</p>
                      </div>
                      
                      {contact.unread > 0 && (
                        <div className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          {contact.unread}
                        </div>
                      )}
                    </animated.button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-2 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                {activeChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={activeChat.avatar}
                          alt={activeChat.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h3 className="text-white font-medium">{activeChat.name}</h3>
                          <p className="text-white/50 text-sm">{activeChat.role}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <BiDotsHorizontalRounded className="w-6 h-6 text-white/70" />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <animated.div
                          key={message.id}
                          className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${message.senderId === 'me' ? 'bg-purple-500/20' : 'bg-white/5'} 
                            rounded-2xl px-4 py-2`}
                          >
                            <p className="text-white">{message.text}</p>
                            <span className="text-xs text-white/50 mt-1">{message.time}</span>
                          </div>
                        </animated.div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-slate-900/50">
                      <div className="flex items-center space-x-4">
                        <button type="button" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <BiPaperclip className="w-6 h-6 text-white/70" />
                        </button>
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <button type="button" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <BiSmile className="w-6 h-6 text-white/70" />
                        </button>
                        <button 
                          type="submit"
                          className="p-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
                        >
                          <BiSend className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-white/50">Select a conversation to start messaging</p>
                  </div>
                )}
              </div>
            </animated.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Messages; 