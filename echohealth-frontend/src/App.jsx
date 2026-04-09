import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Diagnosis from './pages/Diagnosis';
import EchoBuddy from './pages/EchoBuddy';
import Exercises from './pages/Exercises';
import SeekHelp from './pages/SeekHelp';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto p-6 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/echobuddy" element={<EchoBuddy />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/seekhelp" element={<SeekHelp />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;