import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserRound, 
  Clock, 
  Plus, 
  MoreVertical, 
  Briefcase, 
  DollarSign,
  Search,
  Wallet
} from 'lucide-react';

export const Staff = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'ATTENDANCE' | 'PAYROLL'>('ROSTER');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-syne font-extrabold uppercase tracking-tight">Staff <span className="text-primary italic">Operations</span></h1>
          <p className="text-charcoal/50 font-medium">Manage shifts, attendance, and payroll</p>
        </div>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl dark:bg-charcoal-light/10">
          {(['ROSTER', 'ATTENDANCE', 'PAYROLL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-white text-primary shadow-lg dark:bg-charcoal' : 'text-charcoal/40 hover:text-charcoal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'ROSTER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.staff.map(member => (
            <div key={member.id} className="glass-card flex flex-col p-8 group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-3xl ${member.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'} dark:bg-charcoal`}>
                  <UserRound size={32} />
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors"><MoreVertical size={20}/></button>
              </div>
              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight">{member.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <Briefcase size={14} className="text-primary" /> {member.role}
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shift</span>
                  <span className="text-sm font-bold flex items-center gap-1"><Clock size={12} className="text-primary" /> {member.shift}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${member.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {member.status}
                </div>
              </div>
            </div>
          ))}
          <button className="glass-card flex flex-col items-center justify-center border-dashed border-2 p-8 text-charcoal/30 hover:text-primary hover:border-primary/50 transition-all gap-4">
            <div className="p-4 rounded-full bg-gray-50"><Plus size={32} /></div>
            <span className="font-bold uppercase tracking-widest text-xs">Add Staff Member</span>
          </button>
        </div>
      )}

      {activeTab === 'ATTENDANCE' && (
        <div className="glass-card overflow-hidden">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight flex items-center gap-2">
              <Clock className="text-primary" /> Live Attendance <span className="text-xs text-gray-400 bg-gray-100 px-2 rounded-md py-1 ml-2">{new Date().toDateString()}</span>
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search staff..." className="input-field pl-10 py-2 text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 uppercase text-[10px] tracking-widest font-bold text-gray-400">
                  <th className="px-8 py-4">Employee</th>
                  <th className="px-8 py-4">Role</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Check-in</th>
                  <th className="px-8 py-4">Duration</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Ramesh Kumar', role: 'Captain', status: 'PRESENT', in: '05:45 AM', duration: '10h 15m' },
                  { name: 'Anitha', role: 'Cashier', status: 'PRESENT', in: '05:55 AM', duration: '10h 05m' },
                  { name: 'Suresh Gowda', role: 'Cook', status: 'SHIFT_END', in: '05:00 AM', duration: '8h 00m' },
                  { name: 'Manjunath', role: 'Helper', status: 'ABSENT', in: '-', duration: '-' },
                ].map((att, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm tracking-tight">{att.name}</td>
                    <td className="px-8 py-5 text-xs font-medium text-gray-500">{att.role}</td>
                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        att.status === 'PRESENT' ? 'bg-green-100 text-green-600' : 
                        att.status === 'ABSENT' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {att.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-syne font-bold text-sm">{att.in}</td>
                    <td className="px-8 py-5 font-medium text-xs text-gray-500">{att.duration}</td>
                    <td className="px-8 py-5 text-right">
                      <button className="btn-secondary py-1.5 px-4 text-[10px] uppercase tracking-widest leading-none">View Logs</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'PAYROLL' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-8 min-h-[500px]">
             <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight mb-8 flex items-center gap-2">
              <Wallet className="text-primary" /> Recent Payouts
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Suresh Gowda', amount: '₹18,500', type: 'Monthly Salary', date: 'Mar 28, 2024' },
                { name: 'Manjunath', amount: '₹2,400', type: 'Advance Payment', date: 'Mar 25, 2024' },
                { name: 'Ramesh Kumar', amount: '₹21,000', type: 'Monthly Salary', date: 'Feb 28, 2024' },
              ].map((pay, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl group hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">{pay.name}</h4>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pay.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-syne font-extrabold text-lg">{pay.amount}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pay.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-8 bg-primary/5 border-primary/10">
            <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight mb-6">Summary</h3>
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Daily Wage Cost</span>
                <span className="text-3xl font-syne font-extrabold">₹4,200</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pending Advances</span>
                <span className="text-3xl font-syne font-extrabold text-orange-500">₹12,400</span>
              </div>
              <div className="pt-6 border-t border-primary/20 space-y-4">
                <button className="w-full btn-primary py-4 text-xs uppercase tracking-widest font-bold">Process Month-end</button>
                <button className="w-full btn-secondary py-4 text-xs uppercase tracking-widest font-bold">Download Reports</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
