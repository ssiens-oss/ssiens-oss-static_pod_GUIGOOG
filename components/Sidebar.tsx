
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Product Manager', icon: '📦' },
    { id: 'queue', label: 'Design Queue', icon: '🎞️' },
    { id: 'orders', label: 'Order Tracker', icon: '🚚' },
    { id: 'agents', label: 'AI Agents', icon: '🤖' },
    { id: 'health', label: 'Supplier Health', icon: '❤️' },
    { id: 'ads', label: 'Ads Manager', icon: '📢' },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-white flex flex-col z-50">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold">N</div>
        <h1 className="text-xl font-bold tracking-tight">NexusCommerce</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Admin Operator</p>
            <p className="text-xs text-slate-500 truncate">SaaS Enterprise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
