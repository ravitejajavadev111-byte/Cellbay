import { useState, useEffect } from 'react';
import { Search, Menu, User, ScanLine, Sparkles } from 'lucide-react';

export default function Navbar({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="wrap nav__top">
        <button className="nav__iconbtn" onClick={onMenuOpen} aria-label="Open menu">
          <Menu size={23} strokeWidth={1.8} />
        </button>

        <a href="/" className="nav__logo">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="8" r="3.2" fill="var(--cb-red)"/>
            <circle cx="30" cy="11" r="2.4" fill="var(--cb-orange)"/>
            <circle cx="35" cy="19" r="2.8" fill="var(--cb-blue)"/>
            <circle cx="32" cy="28" r="2" fill="var(--cb-green)"/>
            <circle cx="12" cy="6" r="2" fill="var(--cb-blue)"/>
            <circle cx="6" cy="14" r="2.6" fill="var(--cb-green)"/>
            <circle cx="5" cy="24" r="2.4" fill="var(--cb-orange)"/>
            <circle cx="10" cy="32" r="2.8" fill="var(--cb-red)"/>
            <circle cx="19" cy="36" r="2.2" fill="var(--cb-blue)"/>
            <path d="M28 14a11 11 0 1 0 0 12" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
          </svg>
          <div className="nav__logo-text">
            <span className="nav__wordmark">
              <span style={{ color: 'var(--cb-red)' }}>c</span>
              <span style={{ color: 'var(--cb-blue)' }}>e</span>
              <span style={{ color: 'var(--cb-orange)' }}>l</span>
              <span style={{ color: 'var(--cb-green)' }}>l</span>
              <span style={{ color: 'var(--cb-red)' }}>b</span>
              <span style={{ color: 'var(--cb-blue)' }}>a</span>
              <span style={{ color: 'var(--cb-orange)' }}>y</span>
            </span>
            <span className="nav__tagline">Mobiles | Electronics | IT Products</span>
          </div>
        </a>

        <div className="nav__actions">
          <button className="nav__iconbtn" aria-label="Search"><Search size={21} strokeWidth={1.8} /></button>
          <button className="nav__iconbtn only-desktop" aria-label="Account"><User size={21} strokeWidth={1.8} /></button>
        </div>
      </div>

    </header>
  );
}