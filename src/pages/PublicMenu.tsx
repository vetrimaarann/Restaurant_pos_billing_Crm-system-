import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Languages, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS } from '../data/mockData';

export const PublicMenu = () => {
  const [lang, setLang] = useState<'EN' | 'KN'>('EN');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  
  // Load cart count from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('exora_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed || []);
        const count = parsed.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
        setCartCount(count);
      } catch (err) {
        console.error('Failed to load cart', err);
      }
    }
  }, []);

  // Listen for storage changes to update cart count
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('exora_cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const count = cart.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0);
          setCartCount(count);
        } catch (err) {
          console.error('Failed to load cart', err);
        }
      } else {
        setCartCount(0);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const categories = ['All', 'Breakfast', 'Meals', 'Tiffin', 'Beverages', 'Specials'];
  
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.nameEn.toLowerCase().includes(search.toLowerCase()) || 
                         item.nameKn.includes(search);
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any) => {
    // Update cart in state and localStorage (do not open drawer automatically)
    setCart(prev => {
      const copy = [...prev];
      const existing = copy.find((i: any) => i.id === item.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        copy.push({ ...item, quantity: 1 });
      }
      try {
        localStorage.setItem('exora_cart', JSON.stringify(copy));
      } catch (err) {
        console.error('Failed to save cart', err);
      }
      const newCount = copy.reduce((sum: number, i: any) => sum + (i.quantity || 0), 0);
      setCartCount(newCount);
      return copy;
    });
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between sticky top-20 bg-background/95 backdrop-blur-md z-40 py-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/80" size={20} />
          <input 
            type="text" 
            placeholder="Search our legendary flavors..." 
            className="input-field pl-12 h-14 text-lg shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'EN' ? 'KN' : 'EN')}
            className="btn-secondary rounded-xl py-3 px-6 h-14 flex items-center gap-3 shadow-sm"
          >
            <Languages size={20} />
            <span className="font-bold">{lang === 'EN' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>
          <button 
            onClick={handleCartClick}
            className="btn-primary rounded-xl py-3 px-6 h-14 relative shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
            title="View your cart"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-white rounded-full text-xs flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`px-8 py-3 rounded-2xl font-syne transition-all whitespace-nowrap border-2 ${
              activeCategory === cat 
                ? 'bg-primary border-primary text-white scale-105 shadow-lg shadow-primary/20 font-extrabold' 
                : 'bg-white border-gray-200 hover:border-primary/20 hover:shadow-md font-semibold'
            }`}
            style={activeCategory === cat ? {} : { color: '#1A1A1A', backgroundColor: '#FFFFFF' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card group hover:scale-[1.02] transition-all duration-300 overflow-hidden p-0 border-transparent hover:border-primary/20 bg-white dark:bg-charcoal shadow-xl shadow-charcoal/5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.nameEn} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 z-10">
                <div className={item.isVeg ? 'badge-veg' : 'badge-non-veg'}>
                  <div className="w-full h-full rounded-full border-2 border-white scale-110" />
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-primary shadow-lg">
                ₹{item.price}
              </div>
            </div>
            
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-syne font-extrabold uppercase tracking-tight">
                    {lang === 'EN' ? item.nameEn : item.nameKn}
                  </h3>
                  <p className="text-sm font-medium text-charcoal/80 dark:text-cream line-clamp-2">
                    {lang === 'EN' ? item.descriptionEn : item.descriptionKn}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => handleAddToCart(item)}
                className="w-full btn-primary py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 group-active:scale-95 translate-y-4 group-hover:translate-y-0 duration-300"
              >
                <ShoppingBag size={18} />
                <span>Add to Order</span>
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <UtensilsCrossed size={40} />
            </div>
            <p className="text-xl font-syne font-bold text-charcoal/80">No dishes found matching your search</p>
          </div>
        )}
      </div>
    </div>

      {/* Cart Drawer + Backdrop */}
      {isCartOpen && (
        <div className="fixed inset-0 z-40">
          <div onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}
      <div aria-hidden={!isCartOpen} className={`fixed top-0 right-0 h-full w-full max-w-[100vw] sm:w-96 sm:max-w-md transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full bg-white dark:bg-charcoal shadow-xl flex flex-col text-charcoal dark:text-cream">
          <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-bold text-charcoal dark:text-cream">Your Cart <span className="text-sm font-medium text-gray-500 dark:text-gray-300">({cartCount})</span></h3>
            <button onClick={() => setCartOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-charcoal transition-colors text-charcoal dark:text-cream">✕</button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300">Your cart is empty. Add items to begin.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b border-gray-100 dark:border-white/5">
                  <img src={item.image} alt={item.nameEn} className="w-14 h-14 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-charcoal dark:text-cream">{lang === 'EN' ? item.nameEn : item.nameKn}</h4>
                        <p className="text-sm text-charcoal/80 dark:text-cream/80">₹{item.price}</p>
                      </div>
                      <div className="text-sm font-bold text-charcoal dark:text-cream">{item.quantity}x</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-charcoal">
            <div className="flex items-center justify-between font-bold mb-3 text-charcoal dark:text-cream">
              <span>Total</span>
              <span>₹{cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0)}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { localStorage.removeItem('exora_cart'); setCart([]); setCartCount(0); }} className="btn-secondary flex-1">Clear</button>
              <button onClick={() => { setCartOpen(false); window.location.href = '/pos'; }} className="btn-primary flex-1">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
