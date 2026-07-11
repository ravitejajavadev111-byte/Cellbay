import { Smartphone, Headphones, Laptop, Watch, Tablet, Camera } from 'lucide-react';

export const heroSlides = [
  {
    id: 1, tag: 'New Launch', brand: 'MI',
    headlineTop: 'XIAOMI', headlineAccent: '14 CIVI', sub: 'A 50MP Leica lens, 12GB RAM and a slab of glass engineered to feel like nothing else in your pocket.',
    price: '₹2,999/mo*', badgeTitle: 'FREE 120W BAR', badgeSub: 'worth ₹12,999',
    blobA: '#EADFFB', blobB: '#F6DCE8', panelA: '#c9c3e0', panelB: '#3a3557', satA: '#E7B6CF', satB: '#B7C8EE',
  },
  {
    id: 2, tag: 'Best Seller', brand: 'SAMSUNG',
    headlineTop: 'GALAXY', headlineAccent: 'S25 ULTRA', sub: 'Galaxy AI, a 200MP sensor and a titanium frame — built for people who expect more from a phone.',
    price: '₹3,499/mo*', badgeTitle: '₹15,000 OFF', badgeSub: 'on exchange',
    blobA: '#DCE9FB', blobB: '#EDE4FB', panelA: '#9db4e0', panelB: '#233a63', satA: '#B7C8EE', satB: '#D6C9F2',
  },
  {
    id: 3, tag: 'Trending', brand: 'APPLE',
    headlineTop: 'MACBOOK', headlineAccent: 'AIR M4', sub: 'M4 chip, 18-hour battery and silence — the machine that disappears so your work doesn’t have to.',
    price: '₹6,999/mo*', badgeTitle: 'FREE APPLECARE+', badgeSub: 'worth ₹9,900',
    blobA: '#EFEAE0', blobB: '#E4EBF5', panelA: '#9a9a9c', panelB: '#232326', satA: '#D8D2C0', satB: '#C7D3E5',
  },
];

export const tickerItems = [
  'Free Delivery Pan-India', '100% Original Products', 'No Cost EMI Available',
  '14-Day Easy Returns', 'Upto ₹20,000 Exchange Bonus', 'Authorized Multi-Brand Retailer',
];
export const categories = [
  { label: 'Mobiles', icon: 'Smartphone', bg: '#E8F0FE' },
  { label: 'Audio', icon: 'Headphones', bg: '#E7F5E9' },
  { label: 'Wearables', icon: 'Watch', bg: '#FCEFE0' },
  { label: 'Tablets', icon: 'Tablet', bg: '#F1E9FB' },
  { label: 'Accessories', icon: 'Cable', bg: '#FBE9EC' },
  { label: 'Laptops', icon: 'Laptop', bg: '#E6EEFB' },
  { label: 'More', icon: 'Grid2x2', bg: '#EFF0F2' },
];

export const trustBadges = [
  { icon: 'ShieldCheck', title: '100%', sub: 'Original Products', color: 'var(--cb-red)' },
  { icon: 'Truck', title: 'Free', sub: 'Fast Delivery', color: 'var(--cb-blue)' },
  { icon: 'CreditCard', title: 'Easy', sub: 'EMI Options', color: 'var(--cb-green)' },
  { icon: 'RotateCcw', title: '14 Days', sub: 'Easy Returns', color: 'var(--cb-red)' },
];

export const navLinks = [
  { label: 'Mobiles', icon: Smartphone },
  { label: 'Audio', icon: Headphones },
  { label: 'Laptops', icon: Laptop },
  { label: 'Wearables', icon: Watch },
  { label: 'Tablets', icon: Tablet },
  { label: 'Cameras', icon: Camera },
];