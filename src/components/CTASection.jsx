import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { ctaStats } from '../data/siteData';

const title1 = "Buying Is";
const title2 = "An Experience";

function RevealWord({ word, i, total }) {
  return (
    <motion.span
      className="cta__word"
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [30, -50]);

  return (
    <section className="cta" ref={ref}>
      <div className="cta__grid" />
      <motion.div className="cta__blob cta__blob--a" style={{ y: blobY }} />
      <motion.div className="cta__blob cta__blob--b" style={{ y: blobY2 }} />

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
              <RevealWord word={w} i={i + 2} key={w} />
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
          54 stores across Hyderabad and Karimnagar, genuine products, and a team that actually knows tech. Walk in, or shop from wherever you are.
        </motion.p>

        <motion.div
          className="cta__actions"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <button className="cta__btn-primary">
            <span>Shop Online</span>
            <ArrowUpRight size={16} />
          </button>
          <button className="cta__btn-outline">
            <span>Find a Store</span>
            <MapPin size={16} />
          </button>
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