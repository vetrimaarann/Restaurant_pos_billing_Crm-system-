import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/AppLayout';

import { PublicMenu } from './pages/PublicMenu';
import { Dashboard } from './pages/Dashboard';
import { POS } from './pages/POS';
import { CRM } from './pages/CRM';
import { Staff } from './pages/Staff';
import { Inventory } from './pages/Inventory';

const PublicHome = () => (
  <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>
    
    <div className="relative z-10 space-y-6 max-w-3xl">
      <h1 className="text-6xl lg:text-8xl font-syne font-extrabold tracking-tighter" style={{ color: '#1A1A1A' }}>
        MO <span className="text-primary italic">22</span>
      </h1>
      <p className="text-xl lg:text-2xl font-medium max-w-2xl mx-auto" style={{ color: '#2D2D2D' }}>
        Legendary South Indian Flavors on the NH Tirupati Main Road. Experience the authentic taste of highway dining.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
        <Link to="/public/menu" className="btn-primary px-8 py-3 text-lg">Digital Menu</Link>
        <button className="btn-secondary px-8 py-3 text-lg">Locate Us</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
        <div className="space-y-1">
          <span className="block text-3xl font-bold text-primary">5:00 AM</span>
          <span className="text-sm font-medium uppercase tracking-widest" style={{ color: '#9A9A9A' }}>Opening Time</span>
        </div>
        <div className="space-y-1">
          <span className="block text-3xl font-bold text-primary">4.8</span>
          <span className="text-sm font-medium uppercase tracking-widest" style={{ color: '#9A9A9A' }}>Google Rating</span>
        </div>
        <div className="space-y-1">
          <span className="block text-3xl font-bold text-primary">30+</span>
          <span className="text-sm font-medium uppercase tracking-widest" style={{ color: '#9A9A9A' }}>Special Dishes</span>
        </div>
        <div className="space-y-1">
          <span className="block text-3xl font-bold text-primary">10K+</span>
          <span className="text-sm font-medium uppercase tracking-widest" style={{ color: '#9A9A9A' }}>Travelers Served</span>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/public" element={<PublicHome />} />
            <Route path="/public/menu" element={<PublicMenu />} />
            
            {/* Admin Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/inventory" element={<Inventory />} />
            
            {/* Default Redirects */}
            <Route path="/" element={<Navigate to="/public" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

