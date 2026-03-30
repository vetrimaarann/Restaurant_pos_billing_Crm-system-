export interface MenuItem {
  id: string;
  nameEn: string;
  nameKn: string;
  descriptionEn: string;
  descriptionKn: string;
  price: number;
  category: 'Breakfast' | 'Meals' | 'Tiffin' | 'Beverages' | 'Specials';
  isVeg: boolean;
  image: string;
  isAvailable: boolean;
}

export interface Table {
  id: string;
  capacity: number;
  status: 'FREE' | 'OCCUPIED' | 'BILL_PENDING';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Customer {
  id: string;
  mobile: string;
  name: string;
  points: number;
  visits: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  {
    id: 'b1',
    nameEn: 'Plain Dosa',
    nameKn: 'ಪ್ಲೇನ್ ದೋಸೆ',
    descriptionEn: 'Crispy golden crepe served with chutney and sambar',
    descriptionKn: 'ಚಟ್ನಿ ಮತ್ತು ಸಾಂಬಾರ್ ಜೊತೆ ಕ್ರಿಸ್ಪಿ ಗೋಲ್ಡನ್ ಕ್ರೇಪ್',
    price: 60,
    category: 'Breakfast',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'b2',
    nameEn: 'Masala Dosa',
    nameKn: 'ಮಸಾಲ ದೋಸೆ',
    descriptionEn: 'Golden crepe filled with spiced potato masala',
    descriptionKn: 'ಮಸಾಲೆ ತುಂಬಿದ ಆಲೂಗಡ್ಡೆಯೊಂದಿಗೆ ಗೋಲ್ಡನ್ ಕ್ರೇಪ್',
    price: 85,
    category: 'Breakfast',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'b3',
    nameEn: 'Idli Vada Set',
    nameKn: 'ಇಡ್ಲಿ ವಡೆ ಸೆಟ್',
    descriptionEn: '2 Steamed rice cakes and 1 crispy lentil donut',
    descriptionKn: '2 ಇಡ್ಲಿ ಮತ್ತು 1 ಕ್ರಿಸ್ಪಿ ವಡೆ',
    price: 70,
    category: 'Breakfast',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'b4',
    nameEn: 'Set Dosa',
    nameKn: 'ಸೆಟ್ ದೋಸೆ',
    descriptionEn: 'Soft and spongy sponge dosas (3 pieces)',
    descriptionKn: 'ಮೃದುವಾದ ಸ್ಪಾಂಜ್ ದೋಸೆಗಳು (3 ಪೀಸ್)',
    price: 75,
    category: 'Breakfast',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'b5',
    nameEn: 'Rava Idli',
    nameKn: 'ರವ ಇಡ್ಲಿ',
    descriptionEn: 'Steamed semolina cakes with nuts and carrots',
    descriptionKn: 'ತುಪ್ಪ ಮತ್ತು ತರಕಾರಿಗಳೊಂದಿಗೆ ಆವಿಯಲ್ಲಿ ಬೆಂದ ರವ ಇಡ್ಲಿ',
    price: 45,
    category: 'Breakfast',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  // Meals
  {
    id: 'm1',
    nameEn: 'South Indian Thali',
    nameKn: 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಊಟ',
    descriptionEn: 'Full meal with rice, sambar, rasam, 2 palyas, curd, and papad',
    descriptionKn: 'ಅನ್ನ, ಸಾಂಬಾರ್, ರಸಂ, 2 ಪಲ್ಯ, ಮೊಸರು ಮತ್ತು ಹಪ್ಪಳದೊಂದಿಗೆ ಪೂರ್ಣ ಊಟ',
    price: 150,
    category: 'Meals',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'm2',
    nameEn: 'Curd Rice',
    nameKn: 'ಮೊಸರನ್ನ',
    descriptionEn: 'Creamy yogurt rice tempered with mustard and chilies',
    descriptionKn: 'ಸಾಸಿವೆ ಮತ್ತು ಮೆಣಸಿನಕಾಯಿಯೊಂದಿಗೆ ಕೆನೆಯುಕ್ತ ಮೊಸರು ಅನ್ನ',
    price: 80,
    category: 'Meals',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'm3',
    nameEn: 'Lemon Rice',
    nameKn: 'ಚಿತ್ರಾನ್ನ',
    descriptionEn: 'Tangy lemon-flavored rice with peanuts',
    descriptionKn: 'ಕಡಲೆಕಾಯಿಯೊಂದಿಗೆ ಹುಳಿ ನಿಂಬೆ ರುಚಿಯ ಅನ್ನ',
    price: 75,
    category: 'Meals',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'm4',
    nameEn: 'Bisi Bele Bath',
    nameKn: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್',
    descriptionEn: 'Spicy lentil rice with mixed vegetables and ghee',
    descriptionKn: 'ಮಿಶ್ರ ತರಕಾರಿಗಳು ಮತ್ತು ತುಪ್ಪದೊಂದಿಗೆ ಮಸಾಲೆಯುಕ್ತ ಬೇಳೆ ಅನ್ನ',
    price: 90,
    category: 'Meals',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  // Beverages
  {
    id: 'v1',
    nameEn: 'Filter Coffee',
    nameKn: 'ಫಿಲ್ಟರ್ ಕಾಫಿ',
    descriptionEn: 'Traditional South Indian frothy coffee',
    descriptionKn: 'ಸಾಂಪ್ರದಾಯಿಕ ದಕ್ಷಿಣ ಭಾರತೀಯ ನೊರೆ ಕಾಫಿ',
    price: 25,
    category: 'Beverages',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'v2',
    nameEn: 'Special Tea',
    nameKn: 'ಸ್ಪೆಷಲ್ ಚಹಾ',
    descriptionEn: 'Ginger infused masala tea',
    descriptionKn: 'ಶುಂಠಿ ಮಸಾಲಾ ಚಹಾ',
    price: 20,
    category: 'Beverages',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544787210-2827251c5e94?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
  {
    id: 'v3',
    nameEn: 'Fresh Lime Soda',
    nameKn: 'ನಿಂಬೆ ಸೋಡಾ',
    descriptionEn: 'Refreshing sweet and salt lime soda',
    descriptionKn: 'ಸಿಹಿ ಮತ್ತು ಉಪ್ಪು ನಿಂಬೆ ಸೋಡಾ',
    price: 45,
    category: 'Beverages',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544787210-2827251c5e94?auto=format&fit=crop&q=80&w=400',
    isAvailable: true,
  },
];

export const TABLES = [
  { id: 'T1', capacity: 2, status: 'FREE' },
  { id: 'T2', capacity: 2, status: 'OCCUPIED' },
  { id: 'T3', capacity: 4, status: 'FREE' },
  { id: 'T4', capacity: 4, status: 'BILL_PENDING' },
  { id: 'T5', capacity: 6, status: 'FREE' },
  { id: 'T6', capacity: 4, status: 'FREE' },
  { id: 'T7', capacity: 4, status: 'OCCUPIED' },
  { id: 'T8', capacity: 8, status: 'FREE' },
];

export const STAFF = [
  { id: 'S1', name: 'Ramesh Kumar', role: 'Captain', shift: 'Morning', status: 'ACTIVE' },
  { id: 'S2', name: 'Suresh Gowda', role: 'Cook', shift: 'Morning', status: 'ACTIVE' },
  { id: 'S3', name: 'Manjunath', role: 'Helper', shift: 'Evening', status: 'INACTIVE' },
  { id: 'S4', name: 'Anitha', role: 'Cashier', shift: 'Morning', status: 'ACTIVE' },
];

export const CUSTOMERS = [
  { id: 'C1', mobile: '9876543210', name: 'Arjun', points: 450, visits: 12 },
  { id: 'C2', mobile: '8765432109', name: 'Vijay', points: 120, visits: 3 },
  { id: 'C3', mobile: '7654321098', name: 'Divya', points: 800, visits: 25 },
];
