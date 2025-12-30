
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { optimizeDescription, generateAdCopy } from '../geminiService';

const ProductManager: React.FC = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [adCopies, setAdCopies] = useState<Record<string, { hooks: string[], primaryText: string[] }>>({});

  const handleOptimize = async (id: string, title: string, desc: string) => {
    setLoadingId(`opt-${id}`);
    try {
      const newDesc = await optimizeDescription(title, desc);
      alert(`✨ Nexus AI Result: ${newDesc.substring(0, 150)}...`);
    } catch {
      alert("Nexus API Error.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleGenerateAdCopy = async (id: string, title: string) => {
    setLoadingId(`ad-${id}`);
    try {
      const copy = await generateAdCopy(title);
      setAdCopies(prev => ({ ...prev, [id]: copy }));
    } catch {
      alert("Failed to generate ad copy.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tight">CATALOG REGISTRY</h2>
          <p className="text-slate-500 font-medium">Orchestrating {MOCK_PRODUCTS.length} live product nodes.</p>
        </div>
        <button className="px-7 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 uppercase tracking-widest">
          SOURCE NEW NODE
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover transition-transform hover:scale-110 duration-700" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 uppercase tracking-tighter italic">{product.title}</h3>
                  <div className="flex gap-2">
                    {product.platforms.map(p => (
                      <span key={p} className="px-2.5 py-1 bg-slate-100 rounded-lg text-[9px] font-black text-slate-500 tracking-widest border border-slate-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-indigo-600 leading-none">${product.basePrice}</p>
                  <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">{product.monthlySales} YIELD / MO</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm mt-5 leading-relaxed font-medium line-clamp-2">{product.description}</p>
              
              {adCopies[product.id] && (
                <div className="mt-6 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl animate-fadeIn text-xs space-y-4">
                  <div>
                    <span className="font-black text-indigo-700 uppercase tracking-widest mb-2 block">✨ VIRAL HOOKS</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 font-bold">
                      {adCopies[product.id].hooks.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="font-black text-indigo-700 uppercase tracking-widest mb-2 block">📝 PRIMARY TEXT</span>
                    <p className="text-slate-600 italic font-medium">"{adCopies[product.id].primaryText[0]}"</p>
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8 flex flex-wrap gap-4 border-t border-slate-50 mt-8">
                <button 
                  onClick={() => handleOptimize(product.id, product.title, product.description)}
                  disabled={!!loadingId}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loadingId === `opt-${product.id}` ? 'PROCESSING...' : '✨ OPTIMIZE CONTENT'}
                </button>
                <button 
                  onClick={() => handleGenerateAdCopy(product.id, product.title)}
                  disabled={!!loadingId}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {loadingId === `ad-${product.id}` ? 'GENERATING...' : '📢 VIRAL AD COPY'}
                </button>
                <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
                  🎞️ CAPCUT EXPORT
                </button>
                <button className="ml-auto px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                  VARIANTS ({product.variants.length})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
