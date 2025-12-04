import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CognitiveReport from './pages/CognitiveReport';
import AIChatbot from './pages/AIChatbot';
import Chat from './pages/Chat';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cognitive-report" element={<CognitiveReport />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
