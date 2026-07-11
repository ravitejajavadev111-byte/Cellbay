import { useState } from 'react';
import Navbar from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ShopByBrand from './components/ShopByBrand';
import TrustBar from './components/TrustBar';
import DealsOfDay from './components/DealsOfDay';
import ExchangeBanner from './components/ExchangeBanner';
import TopPicks from './components/TopPicks';
import './index.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <CategoryGrid />
        <ShopByBrand />
        <TrustBar />
        <DealsOfDay />
        <ExchangeBanner />
        <TopPicks />
      </main>
      <MobileBottomNav />
      <div className="only-mobile-flex" style={{ height: 70 }} />
    </div>
  );
}