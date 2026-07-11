import { Smartphone, Headphones, Laptop, Watch, Tablet, Camera } from 'lucide-react';

export const heroSlides = [
  {
    id: 1,
    tag: 'NEW LAUNCH',
    brand: 'MI',
    brandColor: '#FF6900',
    title: 'XIAOMI',
    titleAccent: '14 CIVI',
    subtitle: 'cinematic. iconic.',
    features: ['50MP Leica Professional Camera', '12GB RAM | 256GB Storage', 'Ultra Slim. Ultra Powerful.'],
    priceLabel: 'Starting at',
    price: '₹2,999',
    priceSuffix: '/month*',
    priceNote: '*T&C Apply',
    cta: 'Explore Now',
    badge: { title: 'FREE', line1: '120W Sound Bar', line2: 'worth ₹12,999' },
    grad: 'linear-gradient(120deg,#E9E4FB 0%,#F7DCEA 55%,#DCEBFB 100%)',
  },
  {
    id: 2,
    tag: 'BEST SELLER',
    brand: 'SAMSUNG',
    brandColor: '#1428A0',
    title: 'GALAXY',
    titleAccent: 'S25 ULTRA',
    subtitle: 'Galaxy AI is here.',
    features: ['200MP Pro-Grade Camera', '12GB RAM | 512GB Storage', 'Titanium Frame'],
    priceLabel: 'Starting at',
    price: '₹3,499',
    priceSuffix: '/month*',
    priceNote: '*T&C Apply',
    cta: 'Explore Now',
    badge: { title: 'UPTO', line1: '₹15,000', line2: 'Exchange Bonus' },
    grad: 'linear-gradient(120deg,#DCE9FB 0%,#E4E4FB 55%,#F7ECDC 100%)',
  },
  {
    id: 3,
    tag: 'TRENDING',
    brand: 'APPLE',
    brandColor: '#1D1D1F',
    title: 'MACBOOK',
    titleAccent: 'AIR M4',
    subtitle: 'supercharged.',
    features: ['Apple M4 Chip', '16GB RAM | 512GB SSD', '18 Hr Battery Life'],
    priceLabel: 'Starting at',
    price: '₹6,999',
    priceSuffix: '/month*',
    priceNote: '*T&C Apply',
    cta: 'Explore Now',
    badge: { title: 'FREE', line1: 'AppleCare+', line2: 'worth ₹9,900' },
    grad: 'linear-gradient(120deg,#EAEAEA 0%,#F5EEDD 55%,#E4EBF5 100%)',
  },
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