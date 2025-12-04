import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import Chat from './pages/Chats';
import { MOCK_PATIENTS } from './services/dataService';
import { Patient } from './types';

type Page = 'dashboard' | 'chat' | 'care-team' | 'settings';

const App: React.FC = () => {
  // Default to the first patient
  const [selectedPatient, setSelectedPatient] = useState<Patient>(MOCK_PATIENTS[0]);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard patient={selectedPatient} />;
      case 'chat':
        return <Chat />;
      case 'care-team':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-slate-700">Care Team - Coming Soon</h2></div>;
      case 'settings':
        return <div className="text-center py-12"><h2 className="text-2xl font-bold text-slate-700">Settings - Coming Soon</h2></div>;
      default:
        return <Dashboard patient={selectedPatient} />;
    }
  };

  return (
    <Layout 
      selectedPatient={selectedPatient} 
      onSelectPatient={setSelectedPatient}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
