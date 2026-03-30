import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Utensils, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  LayoutDashboard 
} from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 45000, covers: 120 },
  { name: 'Tue', revenue: 52000, covers: 145 },
  { name: 'Wed', revenue: 48000, covers: 130 },
  { name: 'Thu', revenue: 61000, covers: 160 },
  { name: 'Fri', revenue: 85000, covers: 240 },
  { name: 'Sat', revenue: 120000, covers: 350 },
  { name: 'Sun', revenue: 110000, covers: 320 },
];

const categoryData = [
  { name: 'Breakfast', value: 35 },
  { name: 'Meals', value: 45 },
  { name: 'Beverages', value: 15 },
  { name: 'Specials', value: 5 },
];

const COLORS = ['#D85A30', '#FFB74D', '#FFF176', '#81C784'];

const StatCard = ({ title, value, sub, trend, icon: Icon, color }: any) => (
  <div className="glass-card flex flex-col justify-between p-6 h-44 overflow-hidden relative group">
    <div className="absolute -right-4 -top-4 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600 dark:bg-charcoal`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-sm font-bold uppercase tracking-widest text-charcoal/80">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-syne font-extrabold">{value}</h3>
        <span className="text-xs font-bold text-charcoal/80">{sub}</span>
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-syne font-extrabold uppercase tracking-tight">Executive <span className="text-primary italic">Dashboard</span></h1>
          <p className="text-charcoal/80 font-medium">Real-time performance analytics for Mo 22</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary py-2 px-4 text-xs font-bold uppercase tracking-widest">Last 7 Days</button>
          <button className="btn-primary py-2 px-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">Export PDF</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Revenue" value="₹84,250" sub="vs ₹72,100" trend={16.8} icon={DollarSign} color="orange" />
        <StatCard title="Total Covers" value="284" sub="vs 240" trend={18.3} icon={Users} color="blue" />
        <StatCard title="Avg. Ticket Size" value="₹296" sub="vs ₹305" trend={-3.2} icon={TrendingUp} color="green" />
        <StatCard title="Peak Occupancy" value="94%" sub="at 1:30 PM" trend={4.5} icon={Clock} color="purple" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 min-h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight flex items-center gap-2">
              <TrendingUp className="text-primary" /> Revenue Growth
            </h3>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs font-bold text-charcoal/70 uppercase tracking-widest">This Week</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D85A30" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D85A30" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '16px'
                  }}
                  cursor={{ stroke: '#D85A30', strokeWidth: 2, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D85A30" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col">
          <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight mb-8 flex items-center gap-2">
            <Utensils className="text-primary" /> Category Sales
          </h3>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal/70">{cat.name}</span>
                </div>
                <span className="text-xl font-syne font-extrabold leading-none">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass-card p-8 space-y-6">
          <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight mb-2">Inventory <span className="text-primary italic">Health</span></h3>
          <div className="space-y-5">
            {[
              { item: 'Basmati Rice', stock: 45, unit: 'kg', status: 'Healthy' },
              { item: 'Coffee Beans', stock: 12, unit: 'kg', status: 'Reorder Soon' },
              { item: 'Cooking Oil', stock: 8, unit: 'L', status: 'CRITICAL' },
              { item: 'Lentils (Dal)', stock: 32, unit: 'kg', status: 'Healthy' },
            ].map(inv => (
              <div key={inv.item} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="font-bold text-sm uppercase">{inv.item}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-tighter ${inv.status === 'Healthy' ? 'text-green-500' : inv.status === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'}`}>
                      {inv.status}
                    </span>
                  </div>
                  <span className="font-syne font-bold">{inv.stock} {inv.unit}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${inv.status === 'Healthy' ? 'bg-green-500' : inv.status === 'CRITICAL' ? 'bg-red-500' : 'bg-orange-500'}`} 
                    style={{ width: `${(inv.stock / 50) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full btn-secondary py-3 text-xs uppercase tracking-widest font-bold">Manage Stock</button>
        </div>

        <div className="lg:col-span-2 glass-card p-8">
          <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight mb-6 flex items-center gap-2">
            <LayoutDashboard className="text-primary" /> Top Performing Staff
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 uppercase text-[10px] tracking-widest font-bold text-charcoal/70">
                  <th className="pb-4">Staff Member</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Total Sales</th>
                  <th className="pb-4">Covers</th>
                  <th className="pb-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Ramesh Kumar', role: 'Captain', sales: '₹2,45,000', covers: 340, rating: 4.9 },
                  { name: 'Suresh Gowda', role: 'Kitchen Lead', sales: '₹2,10,000', covers: 290, rating: 4.7 },
                  { name: 'Anitha', role: 'Cashier', sales: '₹1,95,000', covers: 280, rating: 4.8 },
                ].map(staff => (
                  <tr key={staff.name} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-bold text-sm">{staff.name}</td>
                    <td className="py-4 text-xs font-medium text-charcoal/70">{staff.role}</td>
                    <td className="py-4 font-syne font-bold text-primary">{staff.sales}</td>
                    <td className="py-4 font-bold text-sm">{staff.covers}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="font-bold text-sm">{staff.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
