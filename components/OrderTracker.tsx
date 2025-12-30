
import React from 'react';
import { MOCK_ORDERS } from '../constants';

const OrderTracker: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Global Fulfillment Node</h2>
        <p className="text-slate-500">Real-time status of orders processed by automated supplier routers.</p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tracking</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900">{order.externalOrderId}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{order.customerName}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold rounded text-slate-500">{order.platform}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-indigo-600">{order.supplierUsed}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                    order.status === 'FULFILLED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {order.trackingNumber ? (
                    <span className="text-xs font-mono text-slate-400 truncate max-w-[120px] block">{order.trackingNumber}</span>
                  ) : (
                    <span className="text-xs text-slate-300 italic">Processing...</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right text-xs text-slate-400 font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTracker;
