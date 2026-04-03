import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Sun, Moon, Bell } from 'lucide-react';
import './Layout.css';

export const Header = () => {
  const { theme, toggleTheme, role, setRole } = useDashboard();

  return (
    <header className="header">
      <div>
        <h2 className="text-xl font-semibold">Overview</h2>
      </div>
      
      <div className="header-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--border-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-full)' }}>
          <button 
            onClick={() => setRole('Viewer')}
            className={`btn ${role === 'Viewer' ? 'btn-primary' : ''}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.375rem 1rem', background: role === 'Viewer' ? 'var(--primary-color)' : 'transparent', color: role === 'Viewer' ? '#fff' : 'var(--text-primary)' }}
          >
            Viewer
          </button>
          <button 
            onClick={() => setRole('Admin')}
            className={`btn ${role === 'Admin' ? 'btn-primary' : ''}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.375rem 1rem', background: role === 'Admin' ? 'var(--primary-color)' : 'transparent', color: role === 'Admin' ? '#fff' : 'var(--text-primary)' }}
          >
            Admin
          </button>
        </div>

        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button className="btn-icon" aria-label="Notifications">
          <Bell size={20} />
        </button>
        
        <div style={{ marginLeft: '0.5rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {role === 'Admin' ? 'A' : 'V'}
          </div>
        </div>
      </div>
    </header>
  );
};
