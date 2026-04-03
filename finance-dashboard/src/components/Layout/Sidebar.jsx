import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Wallet } from 'lucide-react';
import './Layout.css';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Wallet className="icon" size={28} />
        <span>FinDash</span>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div className="nav-item">
          <Receipt size={20} />
          <span>Transactions</span>
        </div>
        <div className="nav-item">
          <PieChart size={20} />
          <span>Insights</span>
        </div>
      </nav>
      
      <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
        <p className="text-sm font-medium">Pro Plan active</p>
        <p className="text-xs text-secondary mt-1" style={{ marginTop: '0.25rem' }}>Full access to all features</p>
      </div>
    </aside>
  );
};
