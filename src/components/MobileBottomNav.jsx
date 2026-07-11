import { useState } from 'react';
import { Home, Grid2x2, ShoppingCart, MapPin } from 'lucide-react';

export default function MobileBottomNav() {
  const [active, setActive] = useState('Home');

  return (
    <nav className="bnav only-mobile-flex">
      <button className={`bnav__item ${active === 'Home' ? 'bnav__item--active' : ''}`} onClick={() => setActive('Home')}>
        <Home size={21} strokeWidth={active === 'Home' ? 2.2 : 1.7} /><span className="bnav__label">Home</span>
      </button>
      <button className={`bnav__item ${active === 'Categories' ? 'bnav__item--active' : ''}`} onClick={() => setActive('Categories')}>
        <Grid2x2 size={21} strokeWidth={active === 'Categories' ? 2.2 : 1.7} /><span className="bnav__label">Categories</span>
      </button>
      <button className={`bnav__item bnav__item--center ${active === 'Offers' ? 'bnav__item--active' : ''}`} onClick={() => setActive('Offers')}>
        <span className="bnav__center-icon">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="8" r="3.2" fill="var(--cb-red)"/>
            <circle cx="35" cy="19" r="2.8" fill="var(--cb-blue)"/>
            <circle cx="6" cy="14" r="2.6" fill="var(--cb-green)"/>
            <circle cx="10" cy="32" r="2.8" fill="var(--cb-orange)"/>
            <path d="M28 14a11 11 0 1 0 0 12" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          </svg>
        </span>
        <span className="bnav__label">Offers</span>
      </button>
      <button className={`bnav__item ${active === 'Cart' ? 'bnav__item--active' : ''}`} onClick={() => setActive('Cart')}>
        <span className="bnav__icon-badge"><ShoppingCart size={21} strokeWidth={active === 'Cart' ? 2.2 : 1.7} /><span className="bnav__dot">2</span></span>
        <span className="bnav__label">Cart</span>
      </button>
      <button className={`bnav__item ${active === 'Stores' ? 'bnav__item--active' : ''}`} onClick={() => setActive('Stores')}>
        <MapPin size={21} strokeWidth={active === 'Stores' ? 2.2 : 1.7} /><span className="bnav__label">Stores</span>
      </button>
    </nav>
  );
}