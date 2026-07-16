import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { ctaStats } from '../data/siteData';
import MagneticButton from './MagneticButton';

const title1 = 'Buying Is';
const title2 = 'An Experience';

function RevealWord({ word, i, accent = false }) {
  return (
    <motion.span
      className={`cta__word${accent ? ' cta__word--accent' : ''}`}
      initial={{ y: '110%', rotate: 4 }}
      whileInView={{ y: '0%', rotate: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {word}
    </motion.span>
  );
}

export default function CTASection() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Scroll-driven drift for the two floating "device" panels
  const scrollY1 = useTransform(scrollYProgress, [0, 1], [-30, 40]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [40, -55]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-7, 2]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [9, -3]);

  // Cursor-driven parallax, layered on top of the scroll drift
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const panel1X = useTransform(smx, (v) => v * 0.6);
  const panel1YFromPointer = useTransform(smy, (v) => v * 0.6);
  const panel2X = useTransform(smx, (v) => v * -0.9);
  const panel2YFromPointer = useTransform(smy, (v) => v * -0.9);
  const panel1Y = useTransform([scrollY1, panel1YFromPointer], ([a, b]) => a + b);
  const panel2Y = useTransform([scrollY2, panel2YFromPointer], ([a, b]) => a + b);

  const handlePointerMove = (e) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 40);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 40);
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      className="cta"
      ref={ref}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div className="cta__grid" aria-hidden="true" />

      <motion.div
        className="cta__panel cta__panel--a"
        style={{ y: panel1Y, x: panel1X, rotate: rotate1 }}
        aria-hidden="true"
      >
        <span className="cta__panel-glow" />
        <span className="cta__panel-line" />
        <span className="cta__panel-line" />
        <span className="cta__panel-line cta__panel-line--short" />
      </motion.div>

      <motion.div
        className="cta__panel cta__panel--b"
        style={{ y: panel2Y, x: panel2X, rotate: rotate2 }}
        aria-hidden="true"
      >
        <span className="cta__panel-glow cta__panel-glow--blue" />
        <span className="cta__panel-ring" />
      </motion.div>

      <div className="wrap cta__inner">
        <motion.span
          className="cta__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="cta__eyebrow-dot" />
          Cellbay · Telangana
        </motion.span>

        <h2 className="cta__title">
          <span className="cta__line">
            {title1.split(' ').map((w, i) => (
              <RevealWord word={w} i={i} key={w} />
            ))}
          </span>
          <span className="cta__line cta__line--accent">
            {title2.split(' ').map((w, i) => (
              <RevealWord word={w} i={i + 2} key={w} accent />
            ))}
          </span>
        </h2>

        <motion.p
          className="cta__sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          54 stores across Hyderabad and Karimnagar, genuine products, and a
          team that actually knows tech. Walk in, or shop from wherever you
          are.
        </motion.p>

        <motion.div
          className="cta__actions"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <MagneticButton as="button" className="cta__btn-primary" strength={0.4}>
            <span>Shop Online</span>
            <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton as="button" className="cta__btn-outline" strength={0.3}>
            <span>Find a Store</span>
            <MapPin size={16} />
          </MagneticButton>
        </motion.div>

        <div className="cta__stats">
          {ctaStats.map((s, i) => (
            <motion.div
              className="cta__stat"
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
            >
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}