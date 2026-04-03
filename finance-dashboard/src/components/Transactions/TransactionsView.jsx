import React, { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { TransactionModal } from './TransactionModal';

export const TransactionsView = () => {
  const { transactions, role, deleteTransaction } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(undefined);

  const filteredAndSorted = useMemo(() => {
    let result = [...transactions];
    
    if (filterType !== 'all') {
      result = result.filter(tx => tx.type === filterType);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(tx => 
        tx.description.toLowerCase().includes(term) || 
        tx.category.toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

    return result;
  }, [transactions, filterType, searchTerm, sortBy]);

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTx(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        {role === 'Admin' && (
          <button className="btn btn-primary" onClick={handleAddNew}>
            <Plus size={18} />
            Add Transaction
          </button>
        )}
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div className="flex items-center gap-4 w-full md:w-auto" style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Search size={18} />
              </div>
              <input 
                type="text" 
                className="input" 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            
            <select className="input" style={{ width: '150px' }} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex items-center gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
            <Filter size={18} className="text-secondary" />
            <select className="input" style={{ width: '150px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>Transaction</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '1rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Amount</th>
                {role === 'Admin' && <th style={{ padding: '1rem 0.5rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map(tx => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-subtle)' }} className="hover:bg-opacity-50 transition-colors">
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <p className="font-medium text-primary">{tx.description}</p>
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span className="badge" style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                        {tx.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>
                      {format(parseISO(tx.date), 'MMM dd, yyyy')}
                    </td>
                    <td className={tx.type === 'income' ? 'text-income' : 'text-expense'} style={{ color: tx.type === 'income' ? 'var(--income-color)' : 'var(--expense-color)', padding: '1rem 0.5rem', textAlign: 'right', fontWeight: 600 }}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </td>
                    {role === 'Admin' && (
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button className="btn-icon" onClick={() => handleEdit(tx)}>
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-icon" onClick={() => deleteTransaction(tx.id)} style={{ color: 'var(--expense-color)' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'Admin' ? 5 : 4} style={{ padding: '3rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={editingTx} 
      />
    </div>
  );
};
