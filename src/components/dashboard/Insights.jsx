import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { useFinance } from '../../context/FinanceContext';
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Insights() {
  const { transactions } = useFinance();

  const insights = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) return [];

    let highestSpend = { category: '', amount: 0 };
    const categoryTotals = {};
    
    expenses.forEach(t => {
      const amt = parseFloat(t.amount);
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
      if (categoryTotals[t.category] > highestSpend.amount) {
        highestSpend = { category: t.category, amount: categoryTotals[t.category] };
      }
    });

    return [
      {
        id: 1,
        title: "Highest Spending Area",
        desc: `You spent most on ${highestSpend.category} (₹${highestSpend.amount}). Consider setting a budget.`,
        icon: TrendingUp,
        color: "text-amber-500",
        bg: "bg-amber-100 dark:bg-amber-500/20"
      },
      {
        id: 2,
        title: "Smart Observation",
        desc: expenses.length > 5 ? "You have frequent small transactions. Try consolidating purchases." : "Your transaction frequency is looking healthy.",
        icon: Lightbulb,
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-500/20"
      },
      {
        id: 3,
        title: "Upcoming Reminders",
        desc: "Ensure sufficient balance for upcoming EMIs based on past trends.",
        icon: AlertTriangle,
        color: "text-emerald-500",
        bg: "bg-emerald-100 dark:bg-emerald-500/20"
      }
    ];

  }, [transactions]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>GROOT Smart Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {insights.length === 0 ? (
           <p className="text-slate-500 text-sm">Gathering data for insights...</p>
        ) : (
          insights.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  );
}
