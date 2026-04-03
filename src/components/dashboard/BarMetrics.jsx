import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function BarMetrics({ type = "vertical" }) {
  const data = [
    { name: 'Mon', val1: 400, val2: 240 },
    { name: 'Tue', val1: 300, val2: 139 },
    { name: 'Wed', val1: 200, val2: 980 },
    { name: 'Thu', val1: 278, val2: 390 },
    { name: 'Fri', val1: 189, val2: 480 },
    { name: 'Sat', val1: 239, val2: 380 },
  ];

  if (type === "horizontal") {
    return (
      <Card className="h-full border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[1.25rem] flex flex-col justify-center p-6">
        <div className="flex items-center justify-between">
           <div className="w-1/2">
             <div className="flex text-xs space-y-4 font-semibold text-slate-400 flex-col">
               <div className="flex items-center gap-3">01 <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-sbi-dark rounded-full w-3/4"></div></div></div>
               <div className="flex items-center gap-3">02 <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-sbi-dark rounded-full w-1/2"></div></div></div>
               <div className="flex items-center gap-3">03 <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-sbi-blue rounded-full w-2/3"></div></div></div>
               <div className="flex items-center gap-3">04 <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-cyan-400 rounded-full w-[40%]"></div></div></div>
               <div className="flex items-center gap-3">05 <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-purple-400 rounded-full w-[80%]"></div></div></div>
               <div className="flex items-center gap-3">06 <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-slate-200 rounded-full w-[30%]"></div></div></div>
             </div>
           </div>
           
           <div className="flex flex-col items-center">
             <h4 className="font-bold text-slate-800 text-lg mb-4">KPI Targets</h4>
             <div className="relative w-16 h-16 rounded-full border-[6px] border-cyan-400 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-sbi-blue"></div>
             </div>
           </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[1.25rem] flex flex-col overflow-hidden">
      <CardContent className="flex-1 p-6 relative">
      <div className="absolute top-6 left-6 font-bold text-slate-800 text-xl tracking-tight hidden lg:block">₹ 55,656</div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="val1" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={6} />
            <Bar dataKey="val2" fill="#38BDF8" radius={[4, 4, 0, 0]} barSize={6} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="h-20 bg-slate-50 mt-auto flex items-center justify-around px-2 border-t border-slate-100">
        <div className="text-center">
          <p className="text-xs font-bold text-slate-800">₹ 12,364</p>
          <div className="w-4 h-4 bg-sbi-blue rounded-full mx-auto mt-2"></div>
        </div>
        <div className="text-center">
           <p className="text-xs font-bold text-slate-800">₹ 5,947</p>
           <div className="w-4 h-4 bg-sbi-dark rounded-full mx-auto mt-2 ring-4 ring-white"></div>
        </div>
        <div className="text-center">
           <p className="text-xs font-bold text-slate-800">₹ 17,490</p>
           <div className="w-5 h-5 bg-sbi-blue rounded-full mx-auto mt-2"></div>
        </div>
      </div>
    </Card>
  );
}
