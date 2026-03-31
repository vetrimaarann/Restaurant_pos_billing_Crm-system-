import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/mockData';
import { Utensils, Receipt, CheckCircle2, XCircle, Trash2, Printer, Plus, Minus, Search } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const BillTemplate = React.forwardRef(({ order, tableId }: any, ref: any) => (
  <div ref={ref} className="p-8 bg-white text-black font-mono text-sm max-w-[300px] border border-gray-100 shadow-sm rounded-xl">
    <div className="text-center space-y-2 mb-6">
      <h2 className="text-xl font-press-start text-violet-600 uppercase">Exora POS</h2>
      <p className="text-xs font-medium">NH Tirupati Main Road, Mulbagal</p>
      <div className="w-full border-b border-black border-dashed my-2" />
      <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500">
        <span>Table: {tableId}</span>
        <span>{new Date().toLocaleString()}</span>
      </div>
    </div>
    
    <div className="space-y-3">
      {order?.items.map((item: any) => (
        <div key={item.id} className="flex justify-between gap-4">
          <div className="flex-1">
            <span className="block font-bold">{(item.nameEn).toUpperCase()}</span>
            <span className="text-[10px] text-gray-500 italic lowercase tracking-tight">{item.quantity} x ₹{item.price}</span>
          </div>
          <span className="font-bold">₹{item.quantity * item.price}</span>
        </div>
      ))}
    </div>

    <div className="w-full border-b border-black border-dashed my-4" />
    
    <div className="space-y-1">
      <div className="flex justify-between font-bold">
        <span>SUBTOTAL</span>
        <span>₹{order?.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)}</span>
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
        <span>CGST (2.5%)</span>
        <span>₹{(order?.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) * 0.025).toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
        <span>SGST (2.5%)</span>
        <span>₹{(order?.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) * 0.025).toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-lg font-syne font-extrabold text-primary pt-2 border-t border-gray-100 mt-2">
        <span>TOTAL</span>
        <span>₹{(order?.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0) * 1.05).toFixed(0)}</span>
      </div>
    </div>

    <div className="text-center mt-8 space-y-4">
      <p className="text-[11px] font-syne font-bold uppercase tracking-widest text-gray-400">Thank you for visiting!</p>
      <div className="flex justify-center flex-col items-center gap-1 opacity-20">
        <div className="w-20 h-2 bg-black rounded" />
        <div className="w-16 h-2 bg-black rounded" />
      </div>
    </div>
  </div>
));

export const POS = () => {
  const { state, addOrder, updateOrderStatus, clearOrder } = useApp();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'MAP' | 'ORDER'>('MAP');

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('exora_cart');
    const savedTable = localStorage.getItem('exora_selected_table');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to load cart from localStorage', err);
      }
    }
    if (savedTable) {
      setSelectedTable(savedTable);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exora_cart', JSON.stringify(cart));
  }, [cart]);

  // Save selected table to localStorage
  useEffect(() => {
    if (selectedTable) {
      localStorage.setItem('exora_selected_table', selectedTable);
    }
  }, [selectedTable]);

  const billRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: billRef,
  });

  const activeOrder = state.orders.find(o => o.tableId === selectedTable);

  const addToCart = (item: any) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const handlePlaceOrder = () => {
    if (!selectedTable) return;
    addOrder(selectedTable, cart);
    setCart([]);
    localStorage.removeItem('exora_cart');
    setView('MAP');
    setSelectedTable(null);
    localStorage.removeItem('exora_selected_table');
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('exora_cart');
  };

  return (
    <div className="space-y-8 animate-fade-in px-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-syne font-extrabold uppercase tracking-tight text-charcoal">POS <span className="text-primary italic">& Billing</span></h1>
          <p className="text-charcoal/80 font-medium">Manage tables, orders, and real-time billing</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setView('MAP')} 
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${view === 'MAP' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-charcoal text-charcoal/80 hover:bg-gray-50'}`}
          >
            <Utensils size={18} /> Floor Map
          </button>
          <button 
            disabled={!selectedTable}
            onClick={() => setView('ORDER')} 
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${view === 'ORDER' ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-charcoal text-charcoal/80 hover:bg-gray-50 disabled:opacity-50'}`}
          >
            <Plus size={18} /> New Order
          </button>
        </div>
      </div>

      {view === 'MAP' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {state.tables.map(table => {
            const order = state.orders.find(o => o.tableId === table.id);
            return (
              <button
                key={table.id}
                onClick={() => setSelectedTable(table.id)}
                className={`p-8 group relative transition-all duration-300 border-2 rounded-2xl cursor-pointer ${
                  selectedTable === table.id ? 'border-primary ring-4 ring-primary/10 scale-105' : 'border-transparent'
                } ${
                  table.status === 'OCCUPIED' ? 'bg-orange-100 border-orange-300' : 
                  table.status === 'BILL_PENDING' ? 'bg-yellow-100 border-yellow-300' : 
                  'bg-white border-gray-200'
                }`}
              >
                <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform">
                  {table.status === 'FREE' ? <CheckCircle2 className="text-green-500" size={24} /> : 
                   table.status === 'OCCUPIED' ? <Utensils className="text-primary" size={24} /> : 
                   <Receipt className="text-yellow-500" size={24} />}
                </div>
                <div className="space-y-1 text-left text-charcoal dark:text-cream">
                  <span className="text-3xl font-syne font-extrabold" style={{ color: '#1A1A1A', textShadow: '0 1px 0 rgba(255,255,255,0.6)' }}>{table.id}</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-charcoal/80" style={{ color: '#333' }}>{table.capacity} SEATER</p>
                  {order && <p className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1 uppercase tracking-tighter"><Plus size={10} /> {order.items.length} Items</p>}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input 
                type="text" 
                placeholder="Search menu items..." 
                className="input-field pl-12 h-14 text-lg shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {MENU_ITEMS.filter(i => i.nameEn.toLowerCase().includes(search.toLowerCase())).map(item => (
                <button 
                  key={item.id} 
                  onClick={() => addToCart(item)}
                  className="bg-white border border-gray-200 flex p-4 gap-4 items-center hover:bg-primary/5 transition-all group rounded-2xl"
                >
                  <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="text-left flex-1">
                    <h4 className="font-syne font-bold uppercase text-sm text-charcoal">{item.nameEn}</h4>
                    <span className="text-primary font-bold text-lg">₹{item.price}</span>
                  </div>
                  <Plus className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-0 flex flex-col h-[750px] bg-white border-2 border-primary/10 shadow-2xl">
            <div className="p-6 border-b border-gray-100 bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-syne font-extrabold uppercase">Order Summary</h3>
                  <p className="text-xs font-bold text-primary/60 tracking-wider">TABLE: {selectedTable}</p>
                </div>
                <div className="flex gap-2">
                  {cart.length > 0 && (
                    <button 
                      onClick={handleClearCart}
                      className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-50"
                      title="Clear cart"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button onClick={() => setView('MAP')} className="text-charcoal/40 hover:text-red-500"><XCircle size={24}/></button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 group">
                  <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase">{item.nameEn}</h4>
                    <span className="text-xs text-gray-500">₹{item.price} per unit</span>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary transition-colors"><Minus size={14} /></button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary transition-colors"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-4 grayscale">
                  <Utensils size={64} />
                  <p className="font-bold uppercase tracking-widest text-sm">Cart is Empty</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-white/5 space-y-4 border-t border-gray-100">
              <div className="flex justify-between text-xl font-syne font-extrabold">
                <span>Total</span>
                <span className="text-primary">₹{cart.reduce((acc, i) => acc + i.price * i.quantity, 0)}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full btn-primary py-4 text-lg rounded-xl shadow-xl shadow-primary/30 disabled:opacity-50"
              >
                Send KOT to Kitchen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Action Modal/Section */}
      {selectedTable && activeOrder && view === 'MAP' && (
        <div className="fixed inset-0 z-50 bg-charcoal/20 backdrop-blur-sm flex items-center justify-end p-8">
          <div className="w-full max-w-lg bg-white h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-syne font-extrabold uppercase tracking-tight">Table {selectedTable} <span className="text-primary italic">Bill</span></h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Status: {activeOrder.status}</p>
                </div>
                <button onClick={() => setSelectedTable(null)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><XCircle size={24} /></button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center gap-8 bg-gray-50 custom-scrollbar">
              <BillTemplate ref={billRef} order={activeOrder} tableId={selectedTable} />
            </div>

            <div className="p-8 bg-white border-t border-gray-100 grid grid-cols-2 gap-4">
              <button 
                onClick={handlePrint}
                className="btn-secondary py-4 text-lg rounded-xl shadow-lg"
              >
                <Printer size={20} /> Print Invoice
              </button>
              <button 
                onClick={() => {
                  updateOrderStatus(selectedTable, 'PAID');
                  setSelectedTable(null);
                }}
                className="btn-primary py-4 text-lg rounded-xl shadow-xl shadow-primary/30"
              >
                Confirm Payment
              </button>
              <button 
                onClick={() => clearOrder(selectedTable)}
                className="col-span-2 text-red-500 font-bold text-sm uppercase tracking-widest hover:underline text-center mt-2"
              >
                Cancel Entire Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
