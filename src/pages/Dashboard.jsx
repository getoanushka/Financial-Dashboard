import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Settings } from 'lucide-react';
import SummaryCards from '../components/dashboard/SummaryCards';
import TrendChart from '../components/dashboard/TrendChart';
import SpendByCategory from '../components/dashboard/SpendByCategory';
import BarMetrics from '../components/dashboard/BarMetrics';
import Insights from '../components/dashboard/Insights';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Global search initiated for: "${searchTerm}".\n\n(Note: True search functionality is located on the Transactions Log page!)`);
    } else {
      alert("Please enter a search term.");
    }
  };
  return (
    <div className="space-y-6">
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-4 h-48">
           <SummaryCards />
        </div>
        
        {/* Search & User Profile Block mimicking top center */}
        <div className="lg:col-span-4 h-48 flex flex-col gap-4">
           <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-4 flex items-center justify-between">
              <MoreVertical className="text-slate-400 w-5 h-5 cursor-pointer" />
              <div className="flex-1 mx-4 bg-[#F2F5F9] rounded-md flex items-center px-3 py-2">
                 <Search className="w-4 h-4 text-slate-400 mr-2" />
                 <input 
                   type="text" 
                   placeholder="Search" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                   className="bg-transparent border-none outline-none text-sm w-full font-medium" 
                 />
                 <button onClick={handleSearch} className="bg-sbi-blue text-white rounded p-1 ml-2 shadow-sm hover:bg-blue-600 transition-colors">
                   <Plus className="w-4 h-4" />
                 </button>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-800">USER NAME</span>
                <span className="text-[9px] text-[#94a3b8] font-bold">Admin Profile</span>
              </div>
           </div>
           
           <div className="flex-1 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6">
               <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#94a3b8] mb-4 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-sm bg-cyan-400"></div> Settings Context
               </h4>
               <p className="text-sm font-semibold text-slate-400 mt-2">Manage preferences</p>
           </div>
        </div>

        <div className="lg:col-span-4 h-96 lg:h-auto lg:row-span-2">
           <BarMetrics type="vertical" />
        </div>

        {/* Center Massive Wave */}
        <div className="lg:col-span-8 h-80">
          <TrendChart />
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-4 h-72">
            <BarMetrics type="horizontal" />
         </div>
         <div className="lg:col-span-4 h-72">
            <SpendByCategory />
         </div>
         <div className="lg:col-span-4 h-72">
            <Insights />
         </div>
      </div>

    </div>
  );
}
