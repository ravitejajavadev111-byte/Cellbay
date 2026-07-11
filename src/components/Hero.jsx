import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/siteData';

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const measure = () => { if (containerRef.current) setWidth(containerRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 4500);
  };

  useEffect(() => { startAutoplay(); return () => clearInterval(autoplayRef.current); }, []);

  const goTo = (i) => {
    setIndex(Math.max(0, Math.min(heroSlides.length - 1, i)));
    startAutoplay();
  };

  const handleDragEnd = (e, info) => {
    const threshold = width * 0.18;
    if (info.offset.x < -threshold) goTo(index + 1);
    else if (info.offset.x > threshold) goTo(index - 1);
    else goTo(index);
  };

  return (
    <section className="hero" ref={containerRef}>
      <div className="wrap hero__viewport">
        <motion.div
          className="hero__track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          animate={{ x: -index * width }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        >
          {heroSlides.map((slide) => (
            <div className="hero__slide" style={{ width }} key={slide.id}>
              <div className="hero__card" style={{ background: slide.grad }}>
                <div className="hero__content">
                  <div className="hero__top-row">
                    <span className="hero__tag">{slide.tag} ✦</span>
                    <span className="hero__brand-chip" style={{ background: slide.brandColor }}>{slide.brand}</span>
                  </div>
                  <h1 className="hero__title">{slide.title} <span className="hero__title-accent">{slide.titleAccent}</span></h1>
                  <p className="hero__subtitle">{slide.subtitle}</p>
                  <ul className="hero__features">{slide.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <div className="hero__price-row">
                    <span className="hero__price-label">{slide.priceLabel}</span>
                    <div className="hero__price">{slide.price}<span>{slide.priceSuffix}</span></div>
                    <span className="hero__price-note">{slide.priceNote}</span>
                  </div>
                  <button className="hero__cta">{slide.cta} <ChevronRight size={17} /></button>
                  <div className="hero__badge">
                    <span className="hero__badge-title">{slide.badge.title}</span>
                    <span className="hero__badge-line">{slide.badge.line1}</span>
                    <span className="hero__badge-line hero__badge-line--muted">{slide.badge.line2}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hero__dots">
        {heroSlides.map((s, i) => (
          <button key={s.id} className={`hero__dot ${i === index ? 'hero__dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}