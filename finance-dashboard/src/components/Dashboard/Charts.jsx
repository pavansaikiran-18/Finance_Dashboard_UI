import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { format, parseISO } from 'date-fns';

export const Charts = () => {
  const { transactions, theme } = useDashboard();

  const trendData = useMemo(() => {
    const grouped = transactions.reduce((acc, tx) => {
      const dateStr = format(parseISO(tx.date), 'MMM dd');
      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, income: 0, expense: 0, sortKey: tx.date };
      }
      if (tx.type === 'income') acc[dateStr].income += tx.amount;
      else acc[dateStr].expense += tx.amount;
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => new Date(a.sortKey).getTime() - new Date(b.sortKey).getTime());
  }, [transactions]);

  const categoryData = useMemo(() => {
    const grouped = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
      }, {});

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const COLORS = ['#4f46e5', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4'];
  const textColor = theme === 'dark' ? '#94a3b8' : '#6b7280';
  const gridColor = theme === 'dark' ? '#334155' : '#e5e7eb';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="card lg:col-span-2">
        <h3 className="font-semibold mb-4 text-lg">Income vs Expenses</h3>
        <div style={{ height: '300px', width: '100%' }}>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f3f4f6' }}
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', border: `1px solid ${gridColor}`, borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="income" name="Income" fill="var(--income-color)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill="var(--expense-color)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="flex items-center justify-center h-full text-secondary">
              No transactions recorded
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4 text-lg">Spending by Category</h3>
        <div style={{ height: '300px', width: '100%' }}>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value}`}
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', border: `1px solid ${gridColor}`, borderRadius: '8px', zIndex: 10 }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-secondary">
              No expenses recorded
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
