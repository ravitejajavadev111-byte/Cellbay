import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Smartphone, Headphones, Laptop, Watch, Tablet, Camera } from 'lucide-react';

const links = [
  { label: 'Mobiles', icon: Smartphone },
  { label: 'Audio', icon: Headphones },
  { label: 'Laptops', icon: Laptop },
  { label: 'Wearables', icon: Watch },
  { label: 'Tablets', icon: Tablet },
  { label: 'Cameras', icon: Camera },
];

export default function MenuOverlay({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <motion.div className="menu-overlay__panel" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <div className="menu-overlay__top">
              <span className="menu-overlay__brand">cell<span style={{ color: 'var(--cb-blue)' }}>bay</span></span>
              <button onClick={onClose} className="menu-overlay__close" aria-label="Close menu"><X size={22} strokeWidth={1.8} /></button>
            </div>

            <nav className="menu-overlay__links">
              {links.map((l, i) => (
                <motion.a key={l.label} href={`#${l.label.toLowerCase()}`} onClick={onClose}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <l.icon size={20} strokeWidth={1.6} />
                  <span>{l.label}</span>
                  <ArrowUpRight size={16} className="menu-overlay__arrow" />
                </motion.a>
              ))}
            </nav>

            <div className="menu-overlay__footer">
              <p>Mobiles · Electronics · IT Products</p>
              <div className="menu-overlay__swatches">
                <span style={{ background: 'var(--cb-red)' }} />
                <span style={{ background: 'var(--cb-orange)' }} />
                <span style={{ background: 'var(--cb-green)' }} />
                <span style={{ background: 'var(--cb-blue)' }} />
              </div>
            </div>
          </motion.div>
          <motion.div className="menu-overlay__scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}