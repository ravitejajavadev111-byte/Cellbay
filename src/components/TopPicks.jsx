import { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from 'framer-motion';
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { newArrivals } from '../data/siteData';

const PHONES = newArrivals.slice(0, 5);
const SLIDES = [...PHONES, { id: '__more', isCta: true }];
const TOTAL = SLIDES.length;

const GEO_DESKTOP = { xStep: 168, yStep: 42, rotateStep: 22, fadeAt: 3.4, minScale: 0.5 };
const GEO_MOBILE = { xStep: 74, yStep: 18, rotateStep: 13, fadeAt: 3.2, minScale: 0.56 };

function discountPct(price, mrp) {
  const p = Number(String(price).replace(/[^\d.]/g, ''));
  const m = Number(String(mrp).replace(/[^\d.]/g, ''));
  if (!p || !m || m <= p) return null;
  return Math.round(((m - p) / m) * 100);
}

function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

function PhoneScreen({ accent }) {
  return (
    <div className="wheel-card__screen" style={{ '--accent': accent }}>
      <div className="wheel-card__statusbar">
        <span>9:41</span>
        <span className="wheel-card__dots">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="wheel-card__appgrid">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="wheel-card__app" style={{ animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>
      <div className="wheel-card__dock">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="wheel-card__dockicon" />
        ))}
      </div>
      <div className="wheel-card__home" />
    </div>
  );
}

function WheelCard({ data, index, focus, geo }) {
  const relative = useTransform(focus, (f) => index - f);
  const rotate = useTransform(relative, (r) => r * geo.rotateStep);
  const x = useTransform(relative, (r) => r * geo.xStep);
  const y = useTransform(relative, (r) => Math.min(Math.abs(r), 4) * geo.yStep);
  const scale = useTransform(relative, (r) => Math.max(geo.minScale, 1 - Math.abs(r) * 0.18));
  const opacity = useTransform(relative, (r) => (Math.abs(r) > geo.fadeAt ? 0 : 1));
  const blurPx = useTransform(relative, (r) => Math.min(Math.abs(r) * 2.2, 6));
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);
  const zIndex = useTransform(relative, (r) => Math.round(100 - Math.abs(r) * 10));
  const glow = useTransform(relative, (r) => Math.max(0, 1 - Math.abs(r) / 0.55));
  const transform = useMotionTemplate`translate(-50%, -50%) translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`;

  if (data.isCta) {
    return (
      <motion.div
        className="wheel-card wheel-card--cta"
        style={{ top: '50%', left: '50%', transform, opacity, filter, zIndex }}
      >
        <motion.div
          className="wheel-card__glow"
          style={{ opacity: glow, background: 'radial-gradient(circle, rgba(20,22,26,0.35), transparent 70%)' }}
        />
        <Sparkles size={22} strokeWidth={1.6} />
        <span>More Just Landed</span>
        <button className="wheel-card__cta-btn">
          View All <ArrowUpRight size={13} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div className="wheel-card" style={{ top: '50%', left: '50%', transform, opacity, filter, zIndex }}>
      <motion.div
        className="wheel-card__glow"
        style={{ opacity: glow, background: `radial-gradient(circle, ${data.color}33, transparent 70%)` }}
      />
      <div className="wheel-card__body">
        <div className="wheel-card__notch" />
        <PhoneScreen accent={data.color} />
        <span className="wheel-card__btn wheel-card__btn--power" />
        <span className="wheel-card__btn wheel-card__btn--vol1" />
        <span className="wheel-card__btn wheel-card__btn--vol2" />
      </div>
    </motion.div>
  );
}

const HEAD_WORDS = ['Fresh', 'Off', 'The', 'Shelf'];

export default function NewArrivals() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState({});
  const isMobile = useIsMobile();
  const geo = isMobile ? GEO_MOBILE : GEO_DESKTOP;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const focusRaw = useTransform(scrollYProgress, [0, 1], [0, TOTAL - 1]);
  const focus = useSpring(focusRaw, { stiffness: 110, damping: 28, mass: 0.45 });

  useEffect(() => {
    const unsub = focusRaw.on('change', (v) => {
      const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(v)));
      setActive((prev) => (prev === idx ? prev : idx));
    });
    return unsub;
  }, [focusRaw]);

  const current = SLIDES[active];
  const off = current && !current.isCta ? discountPct(current.price, current.mrp) : null;

  return (
    <section className="arrivals-wrap" ref={wrapRef} style={{ height: `${TOTAL * 100}svh` }}>
      <div className="arrivals-pin">
        <div className="wrap arrivals-inner">
          <div className="arrivals-text">
            <motion.span
              className="arrivals-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="arrivals-eyebrow-dot" />
              New Arrivals
            </motion.span>

            <h2 className="arrivals-title">
              <span className="arrivals-line">
                {HEAD_WORDS.slice(0, 2).map((w, i) => (
                  <motion.span
                    className="arrivals-word"
                    key={w}
                    initial={{ y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="arrivals-line arrivals-line--accent">
                {HEAD_WORDS.slice(2).map((w, i) => (
                  <motion.span
                    className="arrivals-word"
                    key={w}
                    initial={{ y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h2>

            <AnimatePresence mode="wait">
              {current && !current.isCta ? (
                <motion.div
                  key={current.id}
                  className="arrivals-specs"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="arrivals-specs__top">
                    <span className="arrivals-specs__brand" style={{ color: current.color }}>
                      {current.brand}
                    </span>
                    <button
                      className={`arrivals-specs__fav ${liked[current.id] ? 'is-liked' : ''}`}
                      onClick={() => setLiked((prev) => ({ ...prev, [current.id]: !prev[current.id] }))}
                      aria-label="Save to wishlist"
                    >
                      <Heart size={14} strokeWidth={1.8} fill={liked[current.id] ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <h3 className="arrivals-specs__name">{current.name}</h3>
                  <div className="arrivals-specs__price-row">
                    <span className="arrivals-specs__price">{current.price}</span>
                    {current.mrp && <span className="arrivals-specs__mrp">{current.mrp}</span>}
                    {off && <span className="arrivals-specs__off">{off}% OFF</span>}
                  </div>
                  <button className="arrivals-specs__btn" style={{ background: current.color }}>
                    View Details <ArrowUpRight size={13} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="cta-text"
                  className="arrivals-specs"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="arrivals-specs__brand">Cellbay</span>
                  <h3 className="arrivals-specs__name">And That&apos;s Not All</h3>
                  <p className="arrivals-specs__sub">
                    Explore the full lineup in store and online, across every brand we carry.
                  </p>
                  <button className="arrivals-specs__btn arrivals-specs__btn--dark">
                    Browse All <ArrowUpRight size={13} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="arrivals-rail">
              {SLIDES.map((s, i) => (
                <span key={s.id} className={`arrivals-rail__dot ${i === active ? 'is-active' : ''}`}>
                  <em>{String(i + 1).padStart(2, '0')}</em>
                </span>
              ))}
            </div>
          </div>

          <div className="arrivals-stage">
            {SLIDES.map((s, i) => (
              <WheelCard key={s.id} data={s} index={i} focus={focus} geo={geo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}