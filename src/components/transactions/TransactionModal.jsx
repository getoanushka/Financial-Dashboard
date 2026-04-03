import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { categories } from '../../data/mock';
import { cn } from '../../utils/cn';

export default function TransactionModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: categories[0],
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date.split('T')[0] // Format for date input
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: categories[0],
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
      // Need a valid ISO string, but maintaining just the date part is fine for this demo 
      // or we append time from current to make it valid for date-fns parsing later
      date: new Date(formData.date).toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {initialData ? 'Edit Transaction' : 'New Transaction'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
              <div className="flex rounded-md p-1 bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, type: 'expense' }))}
                  className={cn(
                    "flex-1 text-sm py-1.5 rounded-md font-medium transition-colors",
                    formData.type === 'expense' 
                      ? "bg-white text-red-600 shadow-sm dark:bg-slate-700 dark:text-red-400" 
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  )}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, type: 'income' }))}
                  className={cn(
                    "flex-1 text-sm py-1.5 rounded-md font-medium transition-colors",
                    formData.type === 'income' 
                      ? "bg-white text-emerald-600 shadow-sm dark:bg-slate-700 dark:text-emerald-400" 
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  )}
                >
                  Income
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount (₹)</label>
              <Input 
                type="number" 
                required 
                min="0.01" 
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData(p => ({ ...p, amount: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <Input 
              type="text" 
              required 
              placeholder="e.g. Grocery shopping"
              value={formData.description}
              onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
              <Input 
                type="date" 
                required 
                value={formData.date}
                onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary">
              {initialData ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
