
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductManager from './components/ProductManager';
import OrderTracker from './components/OrderTracker';
import AgentManager from './components/AgentManager';
import DesignQueue from './components/DesignQueue';
import AIChatBot from './components/AIChatBot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <ProductManager />;
      case 'orders': return <OrderTracker />;
      case 'agents': return <AgentManager />;
      case 'queue': return <DesignQueue />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 animate-pulse">
          <p className="text-6xl mb-6">🚧</p>
          <p className="text-2xl font-black uppercase italic tracking-tighter">NODE SYNCHRONIZING</p>
          <p className="text-sm font-bold mt-2 uppercase tracking-widest">Protocol handshake in progress...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-10 min-h-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <AIChatBot />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
          background-clip: content-box;
        }
      `}</style>
    </div>
  );
};

export default App;
