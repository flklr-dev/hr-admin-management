import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Analytics from './components/Analytics'
import Calendar from './components/Calendar'
import Reports from './components/Reports'
import Tasks from './components/Tasks'
import Team from './components/Team'
import Projects from './components/Projects'
import Messages from './components/Messages'
import Profile from './components/Profile'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to HR dashboard */}
        <Route path="/" element={<Navigate to="/hr" replace />} />
        
        {/* HR Routes */}
        <Route path="/hr" element={<Dashboard />} />
        <Route path="/hr/analytics" element={<Analytics />} />
        <Route path="/hr/calendar" element={<Calendar />} />
        <Route path="/hr/reports" element={<Reports />} />
        <Route path="/hr/tasks" element={<Tasks />} />
        <Route path="/hr/team" element={<Team />} />
        <Route path="/hr/projects" element={<Projects />} />
        <Route path="/hr/messages" element={<Messages />} />
        <Route path="/hr/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
