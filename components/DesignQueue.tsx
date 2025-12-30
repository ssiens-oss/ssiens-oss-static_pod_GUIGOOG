
import React from 'react';
import { MOCK_QUEUE } from '../constants';

const DesignQueue: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Autonomous Design Queue</h2>
          <p className="text-slate-500">Tracking ComfyUI generation, mockup rendering, and Printify publishing.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            GPU Worker: Online
          </div>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Queue Processing Status</span>
          <span className="text-xs font-medium text-slate-400">{MOCK_QUEUE.length} Items Pending</span>
        </div>
        <div className="divide-y divide-slate-100">
          {MOCK_QUEUE.map((item) => (
            <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-colors">
              <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                {item.thumbnail ? (
                  <img src={item.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
                ) : (
                  <span className="text-2xl">⏳</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-slate-900 truncate pr-4">{item.prompt}</p>
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{item.timestamp}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        item.status === 'FAILED' ? 'bg-rose-500' : 'bg-indigo-500'
                      }`} 
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 w-8 text-right">{item.progress}%</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    item.status === 'DONE' ? 'text-green-500' : 
                    item.status === 'FAILED' ? 'text-rose-500' : 'text-indigo-400'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">Step: {
                    item.status === 'GENERATING' ? 'GPU Inference' :
                    item.status === 'MOCKUP' ? 'Compositing Assets' :
                    item.status === 'UPLOADING' ? 'API Push to Printify' : 'Complete'
                  }</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Clear Completed Items</button>
        </div>
      </div>
    </div>
  );
};

export default DesignQueue;
