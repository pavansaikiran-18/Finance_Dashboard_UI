import React, { createContext, useContext, useState, useEffect } from 'react';

const mockData = [
  { id: '1', date: '2026-03-28', amount: 3500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2026-03-29', amount: 85, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: '2026-03-30', amount: 120, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '4', date: '2026-04-01', amount: 50, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: '5', date: '2026-04-02', amount: 200, category: 'Freelance', type: 'income', description: 'Web Design' },
  { id: '6', date: '2026-04-03', amount: 45, category: 'Transport', type: 'expense', description: 'Gas' },
];

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_tx_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return mockData;
      }
    }
    return mockData;
  });

  const [role, setRole] = useState('Admin');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem('finance_tx_data', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Math.random().toString(36).substring(2, 9) };
    setTransactions([newTx, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const editTransaction = (tx) => {
    setTransactions(transactions.map(t => t.id === tx.id ? tx : t));
  };

  return (
    <DashboardContext.Provider value={{
      transactions, role, theme, setRole, toggleTheme,
      addTransaction, deleteTransaction, editTransaction
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
};
