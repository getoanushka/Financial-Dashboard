import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function SummaryCards() {
  const mockData = [
    { val: 10 }, { val: 25 }, { val: 15 }, { val: 40 }, { val: 35 }, { val: 56 }
  ];

  return (
    <Card className="h-full border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[1.25rem] relative overflow-hidden flex flex-col justify-center p-6">
       <div className="flex items-end gap-4 mb-4">
          <h2 className="text-4xl font-black tracking-tight text-slate-800">₹ 3,46,000</h2>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] mb-1">Total Assets</p>
       </div>
       <p className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8] absolute top-6 right-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block mr-2"></span> Peak
       </p>
       
       <div className="h-16 w-full -mx-2 -mb-2">
         <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                 <linearGradient id="tinyGradient" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                   <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                 </linearGradient>
              </defs>
              <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={2} fill="url(#tinyGradient)" />
            </AreaChart>
         </ResponsiveContainer>
       </div>
       
       <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest">
         <span>Mon</span>
         <span>Tue</span>
         <span>Wed</span>
         <span>Thu</span>
         <span>Fri</span>
       </div>
    </Card>
  );
}
