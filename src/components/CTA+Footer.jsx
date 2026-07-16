import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Headphones,
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ctaStats, footerLinks } from '../data/siteData';
import MagneticButton from './MagneticButton';

const title1 = 'Buying Is';
const title2 = 'An Experience';

const WORDMARK = ['c', 'e', 'l', 'l', 'b', 'a', 'y'];
const WORDMARK_VARS = [
  '--cb-red',
  '--cb-blue',
  '--cb-orange',
  '--cb-green',
  '--cb-red',
  '--cb-blue',
  '--cb-orange',
];

function RevealWord({ word, i, accent = false }) {
  return (
    <motion.span
      className={`finale__word${accent ? ' finale__word--accent' : ''}`}
      initial={{ y: '112%', rotate: 3 }}
      whileInView={{ y: '0%', rotate: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      {word}
    </motion.span>
  );
}

export default function Finale() {
  const stageRef = useRef(null);
  const curtainRef = useRef(null);
  const spotlightRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: stageProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });
  const blobY1 = useTransform(stageProgress, [0, 1], [-30, 30]);
  const blobY2 = useTransform(stageProgress, [0, 1], [30, -45]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 55, damping: 20, mass: 0.6 });
  const blobParX1 = useTransform(smx, (v) => v * 0.4);
  const blobParY1 = useTransform(smy, (v) => v * 0.4);
  const blobParX2 = useTransform(smx, (v) => v * -0.55);
  const blobParY2 = useTransform(smy, (v) => v * -0.55);
  const blob1Y = useTransform([blobY1, blobParY1], ([a, b]) => a + b);
  const blob2Y = useTransform([blobY2, blobParY2], ([a, b]) => a + b);

  const handleStagePointer = (e) => {
    if (reduceMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 60);
  };
  const handleStageLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const { scrollYProgress: curtainProgress } = useScroll({
    target: curtainRef,
    offset: ['start 0.92', 'start 0.3'],
  });
  const curtainRadius = useTransform(curtainProgress, [0, 1], ['72px', '0px']);
  const curtainY = useTransform(curtainProgress, [0, 1], [48, 0]);
  const wordmarkY = useTransform(curtainProgress, [0, 1], [26, -8]);

  const handleSpotlight = (e) => {
    if (reduceMotion) return;
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="finale">
      <div className="finale__grain" aria-hidden="true" />

      {/* ---------- STAGE (ivory) ---------- */}
      <div
        className="finale__stage"
        ref={stageRef}
        onMouseMove={handleStagePointer}
        onMouseLeave={handleStageLeave}
      >
        <div className="finale__gridlines" aria-hidden="true" />
        <motion.span
          className="finale__blob finale__blob--a"
          style={{ y: blob1Y, x: blobParX1 }}
          aria-hidden="true"
        />
        <motion.span
          className="finale__blob finale__blob--b"
          style={{ y: blob2Y, x: blobParX2 }}
          aria-hidden="true"
        />

        <div className="wrap finale__stage-inner">
          <div className="finale__meta">
            <motion.span
              className="finale__eyebrow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="finale__eyebrow-dot" />
              Cellbay &middot; Telangana
            </motion.span>
            <motion.span
              className="finale__counter"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              54 stores &middot; open today
            </motion.span>
          </div>

          <div className="finale__headline-row">
            <h2 className="finale__headline">
              <span className="finale__line">
                {title1.split(' ').map((w, i) => (
                  <RevealWord word={w} i={i} key={w} />
                ))}
              </span>
              <span className="finale__line finale__line--accent">
                {title2.split(' ').map((w, i) => (
                  <RevealWord word={w} i={i + 2} key={w} accent />
                ))}
              </span>
            </h2>

            <motion.div
              className="finale__aside"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <p className="finale__sub">
                54 stores across Hyderabad and Karimnagar, genuine products,
                and a team that actually knows tech. Walk in, or shop from
                wherever you are.
              </p>
              <div className="finale__actions">
                <MagneticButton
                  as="button"
                  className="finale__btn-primary"
                  strength={0.4}
                >
                  <span>Shop Online</span>
                  <ArrowUpRight size={16} />
                </MagneticButton>
                <MagneticButton
                  as="button"
                  className="finale__btn-outline"
                  strength={0.3}
                >
                  <span>Find a Store</span>
                  <MapPin size={16} />
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="finale__spec">
            {ctaStats.map((s, i) => (
              <motion.div
                className="finale__spec-item"
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              >
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- CURTAIN (ink) ---------- */}
      <motion.div
        className="finale__curtain"
        ref={curtainRef}
        style={{
          borderTopLeftRadius: curtainRadius,
          borderTopRightRadius: curtainRadius,
          y: curtainY,
        }}
        onMouseMove={handleSpotlight}
      >
        <div className="finale__spotlight" ref={spotlightRef} aria-hidden="true" />

        <div className="wrap finale__curtain-inner">
          <motion.div
            className="finale__wordmark"
            style={{ y: wordmarkY }}
            aria-hidden="true"
          >
            {WORDMARK.map((ch, i) => (
              <span key={i} style={{ color: `var(${WORDMARK_VARS[i]})` }}>
                {ch}
              </span>
            ))}
          </motion.div>

          <div className="finale__perks">
            <div className="finale__perk">
              <ShieldCheck size={16} />
              <div>
                <strong>100% Secure Payments</strong>
                <span>All major cards &amp; UPI accepted</span>
              </div>
            </div>
            <div className="finale__perk">
              <Truck size={16} />
              <div>
                <strong>Delivery Across Telangana</strong>
                <span>&#8377;99 within Telangana, varies outside</span>
              </div>
            </div>
            <div className="finale__perk">
              <Headphones size={16} />
              <div>
                <strong>24/7 Support</strong>
                <span>Call or WhatsApp +91 91120 23456</span>
              </div>
            </div>
          </div>

          <div className="finale__index">
            <div className="finale__index-brand">
              <p className="finale__desc">
                54 stores across Hyderabad &amp; Karimnagar bringing you the
                latest mobiles, laptops, TVs and electronics &mdash; with
                service that keeps people coming back.
              </p>
              <div className="finale__socials">
                <a
                  href="https://www.facebook.com/cellbaymobile"
                  className="finale__social-btn"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={14} />
                </a>
                <a
                  href="https://twitter.com/cellbay_mobiles"
                  className="finale__social-btn"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={14} />
                </a>
                <a
                  href="https://www.instagram.com/cellbay.mobiles/"
                  className="finale__social-btn"
                  aria-label="Instagram"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://www.youtube.com/@cellbaymobiles"
                  className="finale__social-btn"
                  aria-label="Youtube"
                >
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>

            <div className="finale__index-links">
              <div className="finale__index-col">
                <h4>Policy</h4>
                <ul>
                  {footerLinks.policy.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="finale__index-col">
                <h4>Categories</h4>
                <ul>
                  {footerLinks.categories.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="finale__index-contact">
              <span className="finale__contact-label">Store HQ</span>
              <span className="finale__contact-item">
                <MapPin size={14} />
                2nd Floor, Image Gardens Rd, VIP Hills, Madhapur, Telangana
                500081
              </span>
              <a
                href="tel:+919112023456"
                className="finale__contact-item finale__contact-item--link"
              >
                <Phone size={14} />
                +91 91120 23456
              </a>
            </div>
          </div>

          <div className="finale__bottom">
            <div className="finale__bottom-text">
              <p>&copy; 2026 Cellbay. All Rights Reserved.</p>
              <p className="finale__bottom-tag">
                Mobiles &middot; Electronics &middot; IT Products
              </p>
            </div>
            <MagneticButton
              as="button"
              className="finale__to-top"
              strength={0.5}
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}