import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight, ArrowDownRight, Edit2, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';

export default function TransactionsTable({ 
  searchQuery, 
  filterType, 
  filterCategory, 
  onEdit 
}) {
  const { transactions, role, deleteTransaction } = useFinance();

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchQuery, filterType, filterCategory]);

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (filteredTransactions.length === 0) {
    return (
      <Card className="flex items-center justify-center h-64 text-slate-500">
        <p>No transactions found matching your criteria.</p>
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Transaction</th>
              <th className="px-6 py-4 font-medium hidden sm:table-cell">Category</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Date</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 font-medium text-center w-24">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                      {tx.type === 'income' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">{tx.description}</p>
                      <p className="text-xs text-slate-500 sm:hidden mt-0.5">{tx.category} • {format(parseISO(tx.date), 'dd MMM yyyy')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 hidden sm:table-cell text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800">
                    {tx.category}
                  </span>
                </td>
                <td className="px-6 py-3 hidden md:table-cell text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  {format(parseISO(tx.date), 'dd MMM yyyy')}
                </td>
                <td className={`px-6 py-3 text-right font-semibold whitespace-nowrap ${
                  tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => onEdit(tx)}
                        className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                        title="Edit transaction"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
