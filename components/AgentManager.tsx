
import React, { useState } from 'react';
import { MOCK_AGENTS } from '../constants';
import { askNexusPro } from '../geminiService';

const AgentManager: React.FC = () => {
  const [strategy, setStrategy] = useState<string | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleStrategyBuild = async () => {
    setIsBuilding(true);
    try {
      const result = await askNexusPro("Design a high-yield agent orchestration strategy for a Q4 holiday rush campaign. Focus on rapid keyword scraping and automated TikTok ad scaling.");
      setStrategy(result);
    } catch {
      alert("Nexus Core link failed.");
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tight uppercase">Agent Orchestration</h2>
          <p className="text-slate-500 font-medium">Autonomous nodes executing research, prompts, and revenue optimization.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleStrategyBuild}
            disabled={isBuilding}
            className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isBuilding ? 'CALCULATING...' : '🧠 AI STRATEGY BUILD'}
          </button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-95">
            DEPLOY NEW AGENT
          </button>
        </div>
      </header>

      {strategy && (
        <div className="bg-slate-900 text-indigo-100 p-8 rounded-3xl border border-slate-700 shadow-2xl animate-fadeIn relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <h4 className="text-indigo-400 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="animate-pulse">✨</span> OPTIMIZED FLEET STRATEGY
          </h4>
          <p className="text-sm leading-relaxed font-bold whitespace-pre-wrap">{strategy}</p>
          <button onClick={() => setStrategy(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_AGENTS.map((agent) => (
          <div key={agent.id} className="bg-white p-7 rounded-[2.5rem] border border-slate-200 flex flex-col shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 duration-500 ${
                agent.status === 'RUNNING' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                agent.status === 'PAUSED' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
              }`}>
                {agent.type === 'research' ? '🌐' : agent.type === 'prompt' ? '🎨' : agent.type === 'optimization' ? '📈' : '🤖'}
              </div>
              <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${
                agent.status === 'RUNNING' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                agent.status === 'PAUSED' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {agent.status}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{agent.name}</h3>
            <p className="text-slate-500 text-xs mt-3 flex-grow font-bold leading-relaxed">{agent.description}</p>
            
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <span>LAST ACTIVE: {agent.lastRun}</span>
              <span className="text-indigo-600">HEALTH: {(agent.successRate * 100).toFixed(0)}%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors border border-slate-100">
                AUDIT LOGS
              </button>
              <button className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${
                agent.status === 'RUNNING' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
              }`}>
                {agent.status === 'RUNNING' ? 'HALT NODE' : 'BOOT NODE'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentManager;
