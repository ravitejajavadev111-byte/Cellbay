import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { heroSlides } from '../data/siteData';

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [panelWidth, setPanelWidth] = useState(0);
  const autoplayRef = useRef(null);
  const btnRef = useRef(null);
  const panelWrapRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-40, 40], [6, -6]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-40, 40], [-6, 6]), { stiffness: 150, damping: 18 });

  useEffect(() => {
    const measure = () => { if (panelWrapRef.current) setPanelWidth(panelWrapRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 5200);
  };
  useEffect(() => { startAutoplay(); return () => clearInterval(autoplayRef.current); }, []);

  const goTo = (i) => { setIndex((i + heroSlides.length) % heroSlides.length); startAutoplay(); };

  const handleDragEnd = (e, info) => {
    const threshold = panelWidth * 0.16;
    if (info.offset.x < -threshold) goTo(index + 1);
    else if (info.offset.x > threshold) goTo(index - 1);
    else goTo(index);
  };

  const handlePanelMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetPanel = () => { mx.set(0); my.set(0); };

  const handleBtnMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btnRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const resetBtn = () => { if (btnRef.current) btnRef.current.style.transform = 'translate(0,0)'; };

  const slide = heroSlides[index];

  return (
    <section className="hero">
      <div className="hero__grain" />
      <motion.div
        className="hero__blob"
        animate={{ background: `radial-gradient(circle at 70% 30%, ${slide.blobA} 0%, ${slide.blobB} 45%, transparent 72%)` }}
        transition={{ duration: 0.8 }}
      />

      <div className="wrap hero__inner">
        <div className="hero__text">
          <span className="hero__eyebrow">{slide.tag} · {slide.brand}</span>

          <motion.h1
            key={slide.id}
            className="hero__headline"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <em>{slide.headlineTop}</em>
            <b>{slide.headlineAccent}</b>
          </motion.h1>

          <motion.p
            key={slide.id + '-sub'}
            className="hero__sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.4 }}
          >
            {slide.sub}
          </motion.p>

          <div className="hero__bottom-row">
            <button ref={btnRef} className="hero__magnetic" onMouseMove={handleBtnMove} onMouseLeave={resetBtn}>
              Explore <ArrowUpRight size={14} />
            </button>
            <div className="hero__price-tag">
              <small>Starting at</small>
              <strong>{slide.price}</strong>
            </div>
          </div>
        </div>

        <div>
          <div className="hero__panel-wrap" ref={panelWrapRef} onMouseMove={handlePanelMove} onMouseLeave={resetPanel}>
            <motion.div
              className="hero__panel-track"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              animate={{ x: -index * panelWidth }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              {heroSlides.map((s) => (
                <div className="hero__panel-slide" style={{ width: panelWidth }} key={s.id}>
                  <motion.div
                    className="hero__panel"
                    style={{
                      background: `linear-gradient(160deg, ${s.panelA}, ${s.panelB})`,
                      rotateX: s.id === slide.id ? rotX : 0,
                      rotateY: s.id === slide.id ? rotY : 0,
                    }}
                  >
                    <div className="hero__satellite hero__satellite--1" style={{ background: s.satA }} />
                    <div className="hero__satellite hero__satellite--2" style={{ background: s.satB }} />
                    <div className="hero__panel-sheen" />
                    <span className="hero__panel-brand">{s.brand}</span>
                    <div className="hero__panel-badge">
                      <strong>{s.badgeTitle}</strong>
                      <span>{s.badgeSub}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hero__dots-bar">
            {heroSlides.map((s, i) => (
              <span
                key={s.id}
               className={`hero__dot ${i === index ? 'hero__dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}