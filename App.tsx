import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Setting } from './pages/Setting';   
import Chat from './pages/Chats';
import { Call } from './components/Call';
import { MOCK_PATIENTS } from './services/dataService';
import { Patient } from './types';

// Helper to find patient by ID or name
const findPatient = (identifier: string): Patient | undefined => {
  return MOCK_PATIENTS.find(
    p => p.id === identifier || p.name.toLowerCase().replace(/\s+/g, '-') === identifier.toLowerCase()
  );
};

// Dashboard Route Component
const DashboardRoute: React.FC<{
  onStartCall: (patient: Patient) => void;
}> = ({ onStartCall }) => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  
  const patient = patientId ? findPatient(patientId) : MOCK_PATIENTS[0];
  
  if (!patient) {
    return <Navigate to={`/dashboard/${MOCK_PATIENTS[0].name.toLowerCase().replace(/\s+/g, '-')}`} replace />;
  }

  const handleOpenChat = (targetPatientId: string) => {
    const targetPatient = MOCK_PATIENTS.find(p => p.id === targetPatientId);
    if (targetPatient) {
      const patientSlug = targetPatient.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/chat/${patientSlug}`);
    }
  };

  return <Dashboard patient={patient} onOpenChat={handleOpenChat} onStartCall={onStartCall} />;
};

// Chat Route Component
const ChatRoute: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  
  const patient = patientId ? findPatient(patientId) : MOCK_PATIENTS[0];
  
  if (!patient) {
    return <Navigate to={`/chat/${MOCK_PATIENTS[0].name.toLowerCase().replace(/\s+/g, '-')}`} replace />;
  }

  return <Chat initialContactId={patient.id} />;
};

// Main App Component
const AppContent: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [callingPatient, setCallingPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  const handleStartCall = (patient: Patient) => {
    setCallingPatient(patient);
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCallingPatient(null);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={`/dashboard/${MOCK_PATIENTS[0].name.toLowerCase().replace(/\s+/g, '-')}`} replace />} />
        <Route path="/dashboard" element={<Navigate to={`/dashboard/${MOCK_PATIENTS[0].name.toLowerCase().replace(/\s+/g, '-')}`} replace />} />
        <Route path="/dashboard/:patientId" element={
          <Layout>
            <DashboardRoute onStartCall={handleStartCall} />
          </Layout>
        } />
        <Route path="/chat" element={<Navigate to={`/chat/${MOCK_PATIENTS[0].name.toLowerCase().replace(/\s+/g, '-')}`} replace />} />
        <Route path="/chat/:patientId" element={
          <Layout>
            <ChatRoute />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <Setting />
          </Layout>
        } />
        <Route path="*" element={<Navigate to={`/dashboard/${MOCK_PATIENTS[0].name.toLowerCase().replace(/\s+/g, '-')}`} replace />} />
      </Routes>
      {isInCall && callingPatient && (
        <Call patient={callingPatient} onEndCall={handleEndCall} />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
