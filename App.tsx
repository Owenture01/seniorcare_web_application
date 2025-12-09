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
      // case 'care-team':
      //   return <div className="text-center py-12"><h2 className="text-2xl font-bold text-slate-700">Care Team - Coming Soon</h2></div>;
      case 'settings':
        // return <div className="text-center py-12"><h2 className="text-2xl font-bold text-slate-700">Settings - Coming Soon</h2></div>;
        return <Setting />;
      default:
        return <Dashboard patient={selectedPatient} />;
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
