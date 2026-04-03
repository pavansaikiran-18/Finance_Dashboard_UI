import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { TrendingUp, AlertCircle, Award } from 'lucide-react';
import { format } from 'date-fns';

export const Insights = () => {
  const { transactions } = useDashboard();

  const insights = useMemo(() => {
    const categorySpending = {};
    let totalExpenseThisMonth = 0;
    
    const now = new Date();
    const currentMonthStr = format(now, 'yyyy-MM');

    transactions.forEach(tx => {
      if (tx.type === 'expense') {
        categorySpending[tx.category] = (categorySpending[tx.category] || 0) + tx.amount;
        
        if (tx.date.startsWith(currentMonthStr)) {
          totalExpenseThisMonth += tx.amount;
        }
      }
    });

    const highestCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0];

    return [
      {
        id: 1,
        title: 'Highest Spending',
        description: highestCategory ? `Your highest spending category is ${highestCategory[0]} at $${highestCategory[1].toFixed(2)}.` : 'No expenses recorded yet.',
        icon: <TrendingUp style={{ color: 'var(--accent-color)' }} size={24} />,
        bgColor: 'rgba(244, 63, 94, 0.1)'
      },
      {
        id: 2,
        title: 'Monthly Snapshot',
        description: `You've spent $${totalExpenseThisMonth.toFixed(2)} so far this month.`,
        icon: <AlertCircle style={{ color: 'var(--secondary-color)' }} size={24} />,
        bgColor: 'rgba(16, 185, 129, 0.1)'
      },
      {
        id: 3,
        title: 'Savings Milestone',
        description: 'You maintained a positive cash flow in the past 7 days. Great job!',
        icon: <Award style={{ color: 'var(--primary-color)' }} size={24} />,
        bgColor: 'rgba(79, 70, 229, 0.1)'
      }
    ];
  }, [transactions]);

  return (
    <div className="card">
      <h3 className="font-semibold mb-4 text-lg">Key Insights</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {insights.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ padding: '0.75rem', backgroundColor: item.bgColor, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <div>
              <h4 className="font-medium text-primary">{item.title}</h4>
              <p className="text-sm text-secondary" style={{ marginTop: '0.25rem' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
