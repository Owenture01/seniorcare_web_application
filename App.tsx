import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { MOCK_PATIENTS } from './services/dataService';
import { Patient } from './types';

const App: React.FC = () => {
  // Default to the first patient
  const [selectedPatient, setSelectedPatient] = useState<Patient>(MOCK_PATIENTS[0]);

  return (
    <Layout selectedPatient={selectedPatient} onSelectPatient={setSelectedPatient}>
      <Dashboard patient={selectedPatient} />
    </Layout>
  );
};

export default App;
