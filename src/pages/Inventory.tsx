import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  FileText, 
  Clock, 
  TrendingDown, 
  BarChart3,
  FlaskConical,
  ShoppingCart,
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';

export const Inventory = () => {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  
  const inventoryItems = Object.entries(state.inventory).map(([name, stock]) => ({
    name,
    stock,
    unit: name.includes('Oil') || name.includes('Milk') ? 'L' : 'kg',
    reorder: 15,
    status: stock < 15 ? 'LOW_STOCK' : 'HEALTHY'
  })).filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-syne font-extrabold uppercase tracking-tight text-charcoal">Kitchen <span className="text-primary italic">Inventory</span></h1>
          <p className="text-charcoal/50 font-medium">Monitor stock levels, reorders, and wastage</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary py-3 px-6 shadow-sm flex items-center gap-2">
            <Plus size={20} /> Add Item
          </button>
          <button className="btn-primary py-3 px-6 shadow-lg shadow-primary/20 flex items-center gap-2">
            <ShoppingCart size={20} /> Purchase Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Summary Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-red-50 border-red-100">
             <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Action Required</span>
            </div>
            <h3 className="text-3xl font-syne font-extrabold text-red-600">3 Items</h3>
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mt-1">Below Reorder Level</p>
          </div>

          <div className="glass-card p-6 border-transparent shadow-xl h-40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <TrendingDown className="text-primary" size={24} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Waste</span>
            </div>
            <div>
              <h3 className="text-3xl font-syne font-extrabold text-charcoal">4.2%</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Total Consumption</p>
            </div>
          </div>

          <div className="glass-card p-8 bg-primary/5 space-y-4">
            <h4 className="text-lg font-syne font-extrabold uppercase tracking-tight">Suppliers</h4>
            <div className="space-y-3">
              {[
                { name: 'Kolar Groceries', contact: '876...98', type: 'Primary' },
                { name: 'Mulbagal Dairy', contact: '982...12', type: 'Daily' },
              ].map(s => (
                <div key={s.name} className="flex flex-col p-3 rounded-xl bg-white/50 border border-primary/10">
                  <span className="text-xs font-bold font-syne uppercase tracking-tight">{s.name}</span>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{s.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Inventory List */}
        <div className="lg:col-span-3 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input type="text" placeholder="Search stock..." className="input-field pl-12 h-12" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
               <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100"><FileText size={20}/></button>
               <button className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100"><Clock size={20}/></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 uppercase text-[10px] tracking-widest font-bold text-gray-400">
                  <th className="pb-4">Stock Name</th>
                  <th className="pb-4 text-center">Category</th>
                  <th className="pb-4 text-center">Current Stock</th>
                  <th className="pb-4 text-center">Reorder Level</th>
                  <th className="pb-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inventoryItems.map(item => (
                  <tr key={item.name} className="group hover:bg-primary/5 transition-colors">
                    <td className="py-5 font-bold text-sm uppercase tracking-tight">{item.name}</td>
                    <td className="py-5 text-center">
                       <span className="px-3 py-1 rounded-full bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Essentials</span>
                    </td>
                    <td className="py-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-lg font-syne font-extrabold ${item.status === 'LOW_STOCK' ? 'text-red-500' : 'text-charcoal'}`}>
                          {item.stock} {item.unit}
                        </span>
                        <div className="w-20 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className={`h-full ${item.status === 'LOW_STOCK' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(item.stock/50)*100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-center font-bold text-xs text-gray-400 font-syne uppercase tracking-widest">{item.reorder} {item.unit}</td>
                    <td className="py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'LOW_STOCK' && <AlertTriangle size={14} className="text-red-500" />}
                        <span className={`text-[10px] font-bold uppercase tracking-tight py-1 px-3 rounded-full ${item.status === 'LOW_STOCK' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {item.status === 'LOW_STOCK' ? 'CRITICAL' : 'SUFFICIENT'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-syne font-extrabold uppercase mb-6 flex items-center gap-2">
            <FlaskConical className="text-primary" /> Daily Wastage Log
          </h3>
          <div className="space-y-4">
             {[
               { reason: 'Over-preparation', item: 'Boiled Rice', weight: '2.5kg', cost: '₹120' },
               { reason: 'Spillage', item: 'Cooking Oil', weight: '0.4L', cost: '₹65' },
               { reason: 'Quality Issue', item: 'Milk', weight: '1.5L', cost: '₹80' },
             ].map((waste, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-bold text-sm">{waste.item}</h4>
                    <span className="text-[10px] uppercase font-bold text-gray-400">{waste.reason}</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold">{waste.weight}</span>
                    <span className="text-[10px] font-bold text-red-500">{waste.cost} Loss</span>
                  </div>
                </div>
             ))}
          </div>
          <button className="w-full btn-secondary mt-6 py-4 uppercase font-bold text-xs tracking-widest">Entry Wastage</button>
        </div>

        <div className="glass-card p-8 flex flex-col justify-between">
           <div>
            <h3 className="text-xl font-syne font-extrabold uppercase mb-2 flex items-center gap-2">
              <BarChart3 className="text-primary" /> Consumption Insight
            </h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 whitespace-pre-wrap">Real-time usage vs scheduled deliveries</p>
           </div>
           <div className="flex-1 min-h-[150px] flex items-center justify-center border-2 border-dashed border-primary/10 rounded-2xl grayscale opacity-30 italic font-medium p-8 text-center text-sm">
             Consumption graph visualization processing... (Available in full production)
           </div>
           <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <ArrowDownCircle className="text-green-500" />
                <span className="text-xs font-bold uppercase tracking-tighter">Inflow: 450kg</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowUpCircle className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-tighter">Outflow: 380kg</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
