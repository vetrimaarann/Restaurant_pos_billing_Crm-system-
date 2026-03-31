import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Users, 
  UserRound, 
  Box, 
  Moon, 
  Sun, 
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Pages are now handled in App.tsx

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
          : 'text-charcoal hover:bg-primary/10 hover:text-primary dark:text-cream dark:hover:bg-primary/10'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </Link>
  );
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, toggleTheme } = useApp();
  const [isSidebarOpen, setSidebarOpen] = React.useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );
  const [publicMenuOpen, setPublicMenuOpen] = React.useState(false);
  const location = useLocation();
  const isPublic = location.pathname.startsWith('/public');

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setSidebarOpen(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  React.useEffect(() => {
    setPublicMenuOpen(false);
  }, [location.pathname]);

  if (isPublic) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
            <Link to="/public" className="flex items-center gap-2 min-w-0 shrink">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shrink-0">M</div>
              <span className="text-sm sm:text-lg font-press-start text-violet-600 truncate">Exora POS</span>
            </Link>
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link to="/public/menu" className="nav-link">Menu</Link>
              <Link to="/pos" className="btn-primary py-1.5 px-4 text-sm">Staff Login</Link>
              <button type="button" onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-charcoal" aria-label="Toggle theme">
                {state.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
            <div className="flex lg:hidden items-center gap-1">
              <button type="button" onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-charcoal" aria-label="Toggle theme">
                {state.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                type="button"
                onClick={() => setPublicMenuOpen((o) => !o)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal"
                aria-expanded={publicMenuOpen}
                aria-label="Open menu"
              >
                {publicMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </div>
          {publicMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-white/10 bg-background/95 px-4 py-3 flex flex-col gap-3 shadow-lg">
              <Link to="/public/menu" className="nav-link py-2 text-base" onClick={() => setPublicMenuOpen(false)}>
                Menu
              </Link>
              <Link to="/pos" className="btn-primary py-3 px-4 text-sm text-center" onClick={() => setPublicMenuOpen(false)}>
                Staff Login
              </Link>
            </div>
          )}
        </nav>
        <main className="pt-14 sm:pt-16">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar: off-canvas below lg; collapsed rail on lg when closed */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 h-screen shrink-0 overflow-hidden flex flex-col
          transition-[transform,width] duration-300 ease-out
          bg-white dark:bg-charcoal-light border-r border-gray-200 dark:border-white/10 text-charcoal dark:text-cream
          w-64 ${!isSidebarOpen ? 'lg:w-20' : ''}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className={`flex items-center gap-2 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
            <span className="text-lg font-press-start text-violet-600 tracking-tight">Exora POS</span>
          </Link>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal transition-all text-charcoal dark:text-cream">
            {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <nav className="px-4 space-y-2 mt-6">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label={isSidebarOpen ? "Dashboard" : ""} />
          <SidebarItem to="/pos" icon={Utensils} label={isSidebarOpen ? "POS & Billing" : ""} />
          <SidebarItem to="/crm" icon={Users} label={isSidebarOpen ? "Customers" : ""} />
          <SidebarItem to="/staff" icon={UserRound} label={isSidebarOpen ? "Staff" : ""} />
          <SidebarItem to="/inventory" icon={Box} label={isSidebarOpen ? "Inventory" : ""} />
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-4">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-charcoal transition-all text-charcoal dark:text-cream"
          >
            {state.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            {isSidebarOpen && <span className="font-semibold">{state.theme === 'light' ? "Dark Mode" : "Light Mode"}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen">
        <header className="h-14 sm:h-16 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-charcoal-light backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {!isSidebarOpen && (
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal text-charcoal dark:text-cream shrink-0"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
              >
                <MenuIcon size={22} />
              </button>
            )}
            <h2 className="text-sm sm:text-lg font-bold text-charcoal dark:text-cream truncate">
              <span className="font-press-start text-violet-600">Exora POS</span>{' '}
              <span className="hidden sm:inline">Management</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-charcoal dark:text-cream">Admin</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Owner</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
