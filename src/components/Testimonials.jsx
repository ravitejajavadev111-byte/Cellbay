import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../data/siteData';

const avatarColors = ['var(--cb-red)', 'var(--cb-blue)', 'var(--cb-green)', 'var(--cb-orange)'];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
  };
  useEffect(() => { startAutoplay(); return () => clearInterval(autoplayRef.current); }, []);

  const goTo = (i) => { setIndex((i + testimonials.length) % testimonials.length); startAutoplay(); };

  const t = testimonials[index];
  const initials = t.name.split(' ').map((w) => w[0]).join('').slice(0, 2);

  return (
    <section className="testi">
      <span className="testi__quote-mark">&rdquo;</span>

      <div className="wrap testi__head">
        <span>Testimonials</span>
        <h2>What Hyderabad &amp; Karimnagar Say</h2>
      </div>

      <div className="wrap testi__stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="testi__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill="var(--cb-orange)" color="var(--cb-orange)" />
              ))}
            </div>
            <p className="testi__text">&ldquo;{t.quote}&rdquo;</p>
            <div className="testi__person">
              <span className="testi__avatar" style={{ background: avatarColors[index % avatarColors.length] }}>{initials}</span>
              <span className="testi__name">{t.name}</span>
              <span className="testi__loc">{t.location}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="testi__nav">
        <button className="testi__arrow" onClick={() => goTo(index - 1)} aria-label="Previous"><ArrowLeft size={15} /></button>
        <div className="testi__dots">
          {testimonials.map((s, i) => (
            <span key={s.id} className={`testi__dot ${i === index ? 'testi__dot--active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button className="testi__arrow" onClick={() => goTo(index + 1)} aria-label="Next"><ArrowRight size={15} /></button>
      </div>
    </section>
  );
}