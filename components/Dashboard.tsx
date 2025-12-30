
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_HEALTH } from '../constants';
import { getQuickInsights } from '../geminiService';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFlashInsight = async () => {
    setIsGenerating(true);
    const stats = { revenue: 45231, orders: 142, averageHealth: 9.2, currentRoas: 3.4 };
    const result = await getQuickInsights(stats);
    setInsight(result);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">COMMAND CENTER</h2>
          <p className="text-slate-500 font-medium">Global fleet operations at scale.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleFlashInsight}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold border border-indigo-100 hover:bg-indigo-100 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isGenerating ? <div className="w-4 h-4 border-2 border-indigo-700 border-t-transparent rounded-full animate-spin"></div> : '⚡ FLASH INSIGHT'}
          </button>
          <div className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-sm font-bold flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AUTOMATION ENGINE: LIVE
          </div>
        </div>
      </header>

      {insight && (
        <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-xl shadow-indigo-600/20 border border-indigo-400 animate-fadeIn flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <span className="text-2xl animate-bounce">💡</span>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-1">Nexus Insight</p>
              <p className="font-bold text-lg">{insight}</p>
            </div>
          </div>
          <button onClick={() => setInsight(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'GROSS REVENUE', value: '$45,231', trend: '+12.5%', color: 'indigo' },
          { label: 'FLEET ORDERS', value: '142', trend: '+4.3%', color: 'blue' },
          { label: 'HEALTH INDEX', value: '9.2', trend: '-0.2', color: 'emerald' },
          { label: 'AD ROAS', value: '3.4x', trend: '+0.8%', color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <span className={`text-xs font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-slate-800">Growth Trajectory (7D)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="text-lg font-black mb-8 uppercase tracking-widest text-slate-800">Node Reliability</h3>
          <div className="space-y-8">
            {MOCK_HEALTH.map((health) => (
              <div key={health.name}>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-xs text-slate-700 uppercase tracking-tighter">{health.name} PROTOCOL</span>
                  <span className="text-xs font-black text-slate-400">{health.healthScore}/10</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-1000" 
                    style={{ width: `${(health.healthScore / 10) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                  <span>Ship: {health.avgShipDays}D</span>
                  <span>OOS: {(health.oosRate * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-indigo-900 rounded-2xl border border-indigo-700 shadow-lg">
            <p className="text-[10px] text-indigo-300 font-black tracking-widest uppercase mb-2">SYSTEM ADVISORY</p>
            <p className="text-xs text-indigo-100 font-bold leading-relaxed">
              ZENDROP NODE is yielding 12% higher profit yield via reliability coefficient optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
