import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Setting } from './pages/Setting';   
import Chat from './pages/Chats';
import { Call } from './components/Call';
import { MOCK_PATIENTS } from './services/dataService';
import { Patient } from './types';

type Page = 'dashboard' | 'chat' | 'care-team' | 'settings';

const App: React.FC = () => {
  // Default to the first patient
  const [selectedPatient, setSelectedPatient] = useState<Patient>(MOCK_PATIENTS[0]);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedChatContact, setSelectedChatContact] = useState<string>(MOCK_PATIENTS[0].id);
  const [isInCall, setIsInCall] = useState(false);
  const [callingPatient, setCallingPatient] = useState<Patient | null>(null);

  const handleOpenChat = (patientId: string) => {
    setSelectedChatContact(patientId);
    setCurrentPage('chat');
  };

  const handleStartCall = (patient: Patient) => {
    setCallingPatient(patient);
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCallingPatient(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard patient={selectedPatient} onOpenChat={handleOpenChat} onStartCall={handleStartCall} />;
      case 'chat':
        return <Chat initialContactId={selectedChatContact} />;
      case 'care-team':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm px-12">
              <h2 className="text-3xl font-bold text-slate-700 mb-3">Care Team</h2>
              <p className="text-slate-500">Coming Soon</p>
            </div>
          </div>
        );
      case 'settings':
        return <Setting />;
      default:
        return <Dashboard patient={selectedPatient} onOpenChat={handleOpenChat} onStartCall={handleStartCall} />;
    }
  };

  return (
    <>
      <Layout 
        selectedPatient={selectedPatient} 
        onSelectPatient={setSelectedPatient}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      >
        {renderPage()}
      </Layout>
      {isInCall && callingPatient && (
        <Call patient={callingPatient} onEndCall={handleEndCall} />
      )}
    </>
  );
};

export default App;
