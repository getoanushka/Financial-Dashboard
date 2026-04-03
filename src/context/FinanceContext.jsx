import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mock';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('yono_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialTransactions;
      }
    }
    return initialTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('yono_role') || 'viewer'; // 'viewer' or 'admin'
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('yono_theme') === 'dark' || false;
  });

  useEffect(() => {
    localStorage.setItem('yono_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('yono_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('yono_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction) => {
    if (role !== 'admin') return;
    setTransactions(prev => [{ ...transaction, id: Date.now().toString() }, ...prev]);
  };

  const updateTransaction = (updatedTransaction) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  };

  const deleteTransaction = (id) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const toggleRole = () => setRole(prev => prev === 'viewer' ? 'admin' : 'viewer');
  
  const toggleTheme = () => setDarkMode(prev => !prev);

  // Computed values
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      darkMode,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      toggleRole,
      toggleTheme,
      totalIncome,
      totalExpenses,
      totalBalance
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
