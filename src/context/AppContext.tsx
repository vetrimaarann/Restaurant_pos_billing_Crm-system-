import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MenuItem } from '../data/mockData';
import { TABLES, STAFF, CUSTOMERS } from '../data/mockData';

interface OrderItem extends MenuItem {
  quantity: number;
}

interface Order {
  tableId: string;
  items: OrderItem[];
  status: 'PENDING' | 'KITCHEN' | 'SERVED' | 'BILL_PENDING' | 'PAID';
  timestamp: number;
}

interface AppState {
  orders: Order[];
  tables: typeof TABLES;
  staff: typeof STAFF;
  customers: typeof CUSTOMERS;
  inventory: Record<string, number>;
  theme: 'light' | 'dark';
}

interface AppContextType {
  state: AppState;
  addOrder: (tableId: string, items: OrderItem[]) => void;
  updateOrderStatus: (tableId: string, status: Order['status']) => void;
  clearOrder: (tableId: string) => void;
  toggleTheme: () => void;
  updateInventory: (itemId: string, diff: number) => void;
  addPoints: (mobile: string, points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_STATE: AppState = {
  orders: [],
  tables: TABLES,
  staff: STAFF,
  customers: CUSTOMERS,
  inventory: {
    'Rice': 50,
    'Dal': 30,
    'Oil': 20,
    'Coffee Powder': 10,
    'Tea Powder': 5,
    'Milk': 40,
  },
  theme: 'light',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('exora_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('exora_state', JSON.stringify(state));
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const addOrder = (tableId: string, items: OrderItem[]) => {
    setState(prev => ({
      ...prev,
      orders: [...prev.orders.filter(o => o.tableId !== tableId), {
        tableId,
        items,
        status: 'KITCHEN',
        timestamp: Date.now(),
      }],
      tables: prev.tables.map(t => t.id === tableId ? { ...t, status: 'OCCUPIED' } : t),
    }));
  };

  const updateOrderStatus = (tableId: string, status: Order['status']) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.tableId === tableId ? { ...o, status } : o),
      tables: prev.tables.map(t => t.id === tableId ? { ...t, status: status === 'PAID' ? 'FREE' : status } : t),
    }));
  };

  const clearOrder = (tableId: string) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.filter(o => o.tableId !== tableId),
      tables: prev.tables.map(t => t.id === tableId ? { ...t, status: 'FREE' } : t),
    }));
  };

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const updateInventory = (name: string, diff: number) => {
    setState(prev => ({
      ...prev,
      inventory: { ...prev.inventory, [name]: (prev.inventory[name] || 0) + diff }
    }));
  };

  const addPoints = (mobile: string, points: number) => {
    setState(prev => ({
      ...prev,
      customers: prev.customers.map(c => c.mobile === mobile ? { ...c, points: c.points + points } : c)
    }));
  };

  return (
    <AppContext.Provider value={{ state, addOrder, updateOrderStatus, clearOrder, toggleTheme, updateInventory, addPoints }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
