import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Search, MessageSquare, Plus, History, Star, Smartphone, Calendar } from 'lucide-react';

export const CRM = () => {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = state.customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.mobile.includes(search)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-syne font-extrabold uppercase tracking-tight">Customer <span className="text-primary italic">Loyalty</span></h1>
          <p className="text-charcoal/80 font-medium">Manage VIPs, visit history, and rewards</p>
        </div>
        <button className="btn-primary py-3 px-6 shadow-lg shadow-primary/20 flex items-center gap-2">
          <Plus size={20} /> New Customer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: List */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col h-[700px]">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/80" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or mobile..." 
              className="input-field pl-12 h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {filteredCustomers.map(customer => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                  selectedCustomer?.id === customer.id 
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5 scale-[1.02]' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm uppercase">{customer.name}</h4>
                    <span className="text-xs text-gray-400 font-bold tracking-widest">{customer.mobile}</span>
                  </div>
                  <div className="bg-primary/10 px-2 py-1 rounded-md text-primary text-[10px] font-bold">
                    {customer.visits} VISITS
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={12} />
                  <span className="text-xs font-syne font-extrabold">{customer.points} PTS</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 glass-card p-8 flex flex-col bg-white">
          {selectedCustomer ? (
            <div className="space-y-8 animate-fade-in h-full">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary font-syne font-extrabold text-3xl shadow-inner">
                    {selectedCustomer.name[0]}
                  </div>
                  <div>
                    <h2 className="text-3xl font-syne font-extrabold uppercase tracking-tight">{selectedCustomer.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                        <Smartphone size={14} className="text-primary" /> {selectedCustomer.mobile}
                      </span>
                      <span className="text-sm font-bold text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                        <Calendar size={14} className="text-primary" /> Joined Jan 2024
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary p-3"><Plus size={20} /></button>
                  <button className="btn-primary py-3 px-6"><MessageSquare size={18} /> WhatsApp</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-charcoal-light/20 flex flex-col justify-between h-32">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Visit Streak</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-syne font-extrabold">12</span>
                    <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">Avg. once/week</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-charcoal-light/20 flex flex-col justify-between h-32">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Spend</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-syne font-extrabold">₹3,450</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">LIFETIME</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-primary/5 flex flex-col justify-between h-32 border border-primary/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80">Loyalty Points</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-syne font-extrabold text-primary">{selectedCustomer.points}</span>
                    <div className="w-full h-1 bg-primary/10 rounded-full mt-2 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: '45%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight flex items-center gap-2">
                  <History className="text-primary" /> Last Visits
                </h3>
                <div className="space-y-4">
                  {[
                    { date: 'Yesterday, 12:45 PM', order: 'Masala Dosa, Filter Coffee', bill: '₹110', points: '+55' },
                    { date: 'March 24, 08:30 AM', order: 'Idli Vada Set, Special Tea', bill: '₹95', points: '+47' },
                    { date: 'March 20, 01:15 PM', order: 'S. Indian Thali, Fresh Lime', bill: '₹195', points: '+97' },
                  ].map((visit, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl group hover:bg-primary/5 transition-colors cursor-default">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase">{visit.date}</span>
                        <h4 className="font-bold text-sm">{visit.order}</h4>
                      </div>
                      <div className="text-right">
                        <span className="block font-syne font-extrabold">{visit.bill}</span>
                        <span className="text-[10px] font-bold text-green-500">{visit.points} points earned</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <Users size={120} strokeWidth={1} />
              <p className="text-2xl font-syne font-bold uppercase tracking-widest">Select a customer to view profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
