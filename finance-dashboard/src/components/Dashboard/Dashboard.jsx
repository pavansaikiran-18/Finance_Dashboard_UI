import React from 'react';
import { SummaryCards } from './SummaryCards';
import { Charts } from './Charts';
import { Insights } from './Insights';
import { TransactionsView } from '../Transactions/TransactionsView';

export const Dashboard = () => {
  return (
    <div className="flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-secondary">Welcome back. Here is your financial summary.</p>
      </div>
      
      <SummaryCards />
      <Charts />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
           <TransactionsView />
        </div>
        <div>
           <div style={{ marginTop: '2rem' }}>
             <Insights />
           </div>
        </div>
      </div>
    </div>
  );
};
