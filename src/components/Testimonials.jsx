import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import { testimonials } from '../data/siteData';

const ACCENTS = ['var(--cb-blue)', 'var(--cb-red)', 'var(--cb-green)', 'var(--cb-orange)'];
const AUTOPLAY_MS = 7000;

function initialsOf(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  const timerRef = useRef(null);
  const stageRef = useRef(null);
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);

  const t = testimonials[index];
  const accent = ACCENTS[index % ACCENTS.length];

  const goTo = useCallback((i) => {
    setIndex(prev => {
      const next = (i + testimonials.length) % testimonials.length;
      return next === prev ? prev : next;
    });
    setTick(k => k + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.45 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (paused || !isVisible || !pageVisible) return;

    timerRef.current = setTimeout(() => {
      goTo(index + 1);
    }, AUTOPLAY_MS);

    return () => clearTimeout(timerRef.current);
  }, [index, tick, paused, isVisible, pageVisible, goTo]);

  useEffect(() => {
    const row = rowRefs.current[index];
    row?.scrollIntoView?.({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index]);

  const handleStageMove = (e) => {
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${px * 4}deg`);
    el.style.setProperty('--rx', `${py * -4}deg`);
  };

  const resetStage = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <section
      ref={sectionRef}
      className="testi"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wrap testi__top">
        <div className="testi__label">
          <span className="testi__eyebrow">Testimonials</span>
          <span className="testi__tally">
            {String(index + 1).padStart(3, '0')} / {String(testimonials.length).padStart(3, '0')}
          </span>
        </div>
        <h2 className="testi__heading">What Hyderabad &amp; Karimnagar Say</h2>
      </div>

      <div className="wrap testi__body">
        <nav className="testi__directory" aria-label="Select a testimonial">
          {testimonials.map((s, i) => {
            const active = i === index;

            return (
              <button
                key={s.id}
                ref={(el) => (rowRefs.current[i] = el)}
                type="button"
                className={`testi__row ${active ? 'testi__row--active' : ''}`}
                style={{ '--row-accent': ACCENTS[i % ACCENTS.length] }}
                onClick={() => goTo(i)}
                aria-current={active}
              >
                <span className="testi__row-index">{String(i + 1).padStart(2, '0')}</span>

                <span className="testi__row-copy">
                  <span className="testi__row-name">{s.name}</span>
                  <span className="testi__row-loc">{s.location}</span>
                </span>

                <span className="testi__row-track">
                  {active && (
                    <motion.span
                      key={`${tick}-${i}-${paused}-${isVisible}-${pageVisible}`}
                      className="testi__row-fill"
                      initial={{ width: '0%' }}
                      animate={{
                        width:
                          paused || !isVisible || !pageVisible
                            ? '0%'
                            : '100%'
                      }}
                      transition={{
                        duration: AUTOPLAY_MS / 1000,
                        ease: 'linear'
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className="testi__stage"
          ref={stageRef}
          onMouseMove={handleStageMove}
          onMouseLeave={resetStage}
        >
          <span className="testi__stage-rule" style={{ background: accent }} />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              className="testi__panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="testi__sweep-mask">
                <motion.span
                  className="testi__sweep"
                  style={{
                    background: `linear-gradient(100deg, transparent, color-mix(in srgb, ${accent} 55%, transparent) 45%, transparent 85%)`
                  }}
                  initial={{ x: '-30%' }}
                  animate={{ x: '130%' }}
                  transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                />

                <div className="testi__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={accent} color={accent} />
                  ))}
                </div>

                <motion.p
                  className="testi__text"
                  initial={{ filter: 'blur(6px)' }}
                  animate={{ filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {t.quote}
                </motion.p>
              </div>

              <footer className="testi__person">
                <span className="testi__avatar" style={{ background: accent }}>
                  {initialsOf(t.name)}
                </span>

                <span className="testi__person-copy">
                  <span className="testi__name">{t.name}</span>
                  <span className="testi__loc">{t.location}</span>
                </span>

                <motion.span
                  className="testi__stamp"
                  initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.35 }}
                  style={{ color: accent, borderColor: accent }}
                >
                  <BadgeCheck size={13} strokeWidth={2.4} />
                  Verified buyer
                </motion.span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
