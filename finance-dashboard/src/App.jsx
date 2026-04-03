import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  return (
    <DashboardProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </DashboardProvider>
  );
}

export default App;
