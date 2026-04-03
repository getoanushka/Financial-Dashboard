import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { categories } from '../data/mock';
import TransactionsTable from '../components/transactions/TransactionsTable';
import TransactionModal from '../components/transactions/TransactionModal';

export default function Transactions() {
  const { role, addTransaction, updateTransaction } = useFinance();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleOpenNew = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSave = (transactionData) => {
    if (editingTransaction) {
      updateTransaction(transactionData);
    } else {
      addTransaction(transactionData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Transactions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and view your transaction history</p>
        </div>
        
        {role === 'admin' && (
          <Button onClick={handleOpenNew} className="shrink-0 gap-2">
            <Plus className="w-4 h-4" />
            New Transaction
          </Button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 md:w-auto">
          <Select 
            className="w-32 md:w-40"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          
          <Select 
            className="w-32 md:w-48"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </div>
      </div>

      <TransactionsTable 
        searchQuery={searchQuery}
        filterType={filterType}
        filterCategory={filterCategory}
        onEdit={handleOpenEdit}
      />

      {role === 'admin' && (
        <TransactionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={editingTransaction}
        />
      )}
    </div>
  );
}
