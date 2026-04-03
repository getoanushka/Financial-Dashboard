import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, LayoutDashboard, Receipt, Menu, X, Plus, Bell, ChevronDown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { cn } from '../../utils/cn';

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const links = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions Log', path: '/transactions', icon: Receipt }, 
  ];

  const subLinks = [
    'Income History', 'Expense Reports', 'Tax Statements'
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-20 xl:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar matching the bright white design */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-slate-900 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-in-out xl:translate-x-0 xl:static xl:inset-auto flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-20 px-8">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-slate-800 dark:text-white">
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white text-sm">
              Gr
            </div>
            <span>GROOT</span>
          </div>
          <button className="xl:hidden text-slate-400" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="mb-6 px-4">
            <p className="text-xs font-semibold text-sbi-blue uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-sbi-blue inline-block rounded-sm"></span>
              Main Menu
            </p>
          </div>
          
          <div className="space-y-1">
            <div onClick={() => alert("This metric is simulated for visual layout only.")} className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-3 transition-colors">
              <span className="w-4 h-4 rounded-sm border border-slate-300"></span> Summary View
            </div>

            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.includes(link.path);
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-slate-50 text-sbi-dark shadow-sm translate-x-1" 
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 hover:bg-slate-50"
                  )}
                >
                  {isActive ? (
                     <div className="w-5 h-5 rounded-full bg-sbi-blue flex items-center justify-center text-white p-1">
                        <Icon strokeWidth={2.5} />
                     </div>
                  ) : (
                     <Icon className="w-5 h-5" strokeWidth={1.5} />
                  )}
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pt-2 pl-12 space-y-3">
              {subLinks.map(sub => (
                 <div key={sub} onClick={() => alert("This advanced view requires a connected backend.")} className="text-xs font-medium text-slate-400 hover:text-slate-700 cursor-pointer flex items-center gap-2">
                   <ChevronDown className="w-3 h-3 -rotate-90 opacity-50" /> {sub}
                 </div>
              ))}
            </div>

             <div onClick={() => alert("Help modal under construction.")} className="px-4 py-2.5 mt-2 text-sm font-medium text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-3 transition-colors">
              <span className="w-4 h-4 rounded-full border border-slate-300 grid place-items-center"><span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span></span> Help & Support
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Integrated Header into the Dashboard view directly
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F2F5F9] dark:bg-[#0b1120]">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10 relative">
           {/* Top bar floating UI matching the image */}
           <div className="w-full flex items-center justify-between xl:hidden mb-6 bg-white p-4 rounded-xl shadow-sm">
             <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-slate-800">
               <Menu className="w-6 h-6" />
             </button>
           </div>

          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
