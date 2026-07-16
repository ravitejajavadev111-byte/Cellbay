import { useState } from 'react';
import Navbar from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import CategoryGrid from './components/CategoryGrid';
import ShopByBrand from './components/ShopByBrand';
import TrustBar from './components/TrustBar';
import DealsOfDay from './components/DealsOfDay';
import ExchangeBanner from './components/ExchangeBanner';
import BestSellers from './components/BestSellers';
import TopPicks from './components/TopPicks';
import Testimonials from './components/Testimonials';
import Finale from './components/CTA+Footer';
import './index.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <Ticker />
        <CategoryGrid />
        <ShopByBrand />
        <TrustBar />
        <DealsOfDay />
        <ExchangeBanner />
        <BestSellers />
        <TopPicks />
        <Testimonials />
        <Finale />
      </main>

      <MobileBottomNav />
      <div className="only-mobile-flex" style={{ height: 70 }} />
    </div>
  );
}