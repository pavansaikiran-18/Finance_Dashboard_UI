import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

export const SummaryCards = () => {
  const { transactions } = useDashboard();

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, tx) => {
        if (tx.type === 'income') {
          acc.income += tx.amount;
          acc.balance += tx.amount;
        } else {
          acc.expense += tx.amount;
          acc.balance -= tx.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4" style={{ marginBottom: '1rem' }}>
          <span className="text-secondary font-medium">Total Balance</span>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)', borderRadius: 'var(--radius-md)' }}>
            <DollarSign size={20} />
          </div>
        </div>
        <h3 className="text-2xl font-bold">{formatCurrency(summary.balance)}</h3>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4" style={{ marginBottom: '1rem' }}>
          <span className="text-secondary font-medium">Total Income</span>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--income-color)', borderRadius: 'var(--radius-md)' }}>
            <ArrowUpRight size={20} />
          </div>
        </div>
        <h3 className="text-2xl font-bold">{formatCurrency(summary.income)}</h3>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4" style={{ marginBottom: '1rem' }}>
          <span className="text-secondary font-medium">Total Expenses</span>
          <div style={{ padding: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--expense-color)', borderRadius: 'var(--radius-md)' }}>
            <ArrowDownRight size={20} />
          </div>
        </div>
        <h3 className="text-2xl font-bold">{formatCurrency(summary.expense)}</h3>
      </div>
    </div>
  );
};
