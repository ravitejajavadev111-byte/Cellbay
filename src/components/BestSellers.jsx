import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { bestSellers } from '../data/siteData';

const extendedSellers = [
  ...bestSellers,
  ...bestSellers.slice(0, Math.max(0, 6 - bestSellers.length)),
].slice(0, 6);

// Named finishes — the card's chassis color IS the material swatch
const MATERIALS = [
  { name: 'Snow',     bg: '#F7F6F2', swatch: '#D8D6CC' },
  { name: 'Sand',     bg: '#EDEAE2', swatch: '#C9BFA8' },
  { name: 'Sage',     bg: '#E7E9E4', swatch: '#9FAA98' },
  { name: 'Slate',    bg: '#E3E6EA', swatch: '#8996A3' },
  { name: 'Clay',     bg: '#EAE3DD', swatch: '#B78368' },
  { name: 'Graphite', bg: '#DEDFDA', swatch: '#5B5D57' },
];

const enrichProduct = (p, index) => ({
  ...p,
  name: p.name || `Signature Series 0${index + 1}`,
  price: p.price || '$999',
  specs: p.specs || ['Aerospace Aluminum', 'A15 Silicon', 'ProMotion Display'],
  brand: p.brand || 'Premium',
  dimensions: p.dimensions || '146.7 × 71.5 × 7.4 MM',
  material: MATERIALS[index % MATERIALS.length],
});

function StackCard({ product, index, activeIndex }) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const TAB_HEIGHT = 72;
  const TOP_OFFSET_VH = 8;
  const stickyTop = `calc(${TOP_OFFSET_VH}vh + ${index * TAB_HEIGHT}px)`;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 8vh', 'start -25vh'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const imageY = useTransform(smoothProgress, [0, 1], ['0%', '14%']);
  const washOpacity = useTransform(smoothProgress, [0, 1], [0, 0.35]);

  const isActive = index === activeIndex;
  const batchCode = `${(index + 1) * 17}.${String(index * 39 + 4).padStart(3, '0')}`;

  return (
    <div className="dossier-card" ref={cardRef} style={{ top: stickyTop, zIndex: index }}>
      <motion.div
        className={`card-surface${isActive ? ' is-active' : ''}`}
        style={{
          backgroundColor: product.material.bg,
          scale: prefersReducedMotion ? 1 : scale,
        }}
      >
        <span className="reg-bracket tl" />
        <span className="reg-bracket tr" />
        <span className="reg-bracket bl" />
        <span className="reg-bracket br" />

        {/* --- TAB --- */}
        <div className="card-tab" style={{ height: `${TAB_HEIGHT}px` }}>
          <div className="tab-identity">
            <span className="tab-index">N°0{index + 1}</span>
            <span className="tab-code">{batchCode}</span>
            <h3 className="tab-heading">{product.name}</h3>
          </div>
          <div className="tab-meta">
            <span className="tab-swatch" style={{ background: product.material.swatch }} />
            <span className="tab-material">{product.material.name}</span>
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="card-body">
          <motion.div
            className="depth-wash"
            style={{ opacity: prefersReducedMotion ? 0 : washOpacity }}
          />

          <div className="body-grid">
            <div className="body-data">
              <div className="data-specs">
                {product.specs.map((spec, i) => (
                  <span key={i} className="spec-pill">{spec}</span>
                ))}
              </div>

              <div className="data-commerce">
                <div className="price-group">
                  <span className="price-label">Starting at</span>
                  <span className="price-value">{product.price}</span>
                </div>

                <button className="cta-button" aria-label={`Add ${product.name} to bag`}>
                  <span className="btn-label">Add to bag</span>
                  <span className="btn-icon">
                    <ShoppingBag size={15} strokeWidth={2} />
                  </span>
                </button>
              </div>
            </div>

            <div className="body-visual">
              <div className="visual-stage">
                <div className="visual-grid-bg" />
                <span className="visual-crosshair" />
                <motion.img
                  style={{ y: prefersReducedMotion ? 0 : imageY }}
                  src={product.image || '/placeholder-device.png'}
                  alt={product.name}
                  className="visual-render"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  draggable="false"
                />
              </div>
              <div className="dimension-line">
                <span className="dimension-tick" />
                <span className="dimension-rule" />
                <span className="dimension-value">{product.dimensions}</span>
                <span className="dimension-rule" />
                <span className="dimension-tick" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function BestSellers() {
  const runwayRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const enriched = extendedSellers.map(enrichProduct);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(enriched.length - 1, Math.max(0, Math.floor(v * enriched.length)));
    setActiveIndex(idx);
  });

  return (
    <section className="dossier-section">
      <div className="dossier-grid">
        {/* PART 1 — Pinned typographic anchor + live scan index */}
        <div className="dossier-anchor">
          <div className="dossier-eyebrow">
            <span className="eyebrow-dot" /> Inventory scan — live
          </div>

          <h2 className="dossier-heading">
            Best<br />
            <span className="heading-outline">Sellers</span>
          </h2>

          <p className="dossier-prose">
            Six units currently outperforming the rest of the catalog, ranked
            by real-time demand and pulled straight from the shop floor.
          </p>

          <a href="/all-products" className="dossier-cta">
            Explore collection <ArrowRight size={16} />
          </a>

          <div className="scan-index">
            {enriched.map((p, i) => (
              <div
                key={p.id || i}
                className={`scan-index-item${i === activeIndex ? ' is-active' : ''}`}
              >
                <span className="scan-index-code">0{i + 1}</span>
                <span className="scan-index-label">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2 — Spec dossier stack */}
        <div className="dossier-stack">
          <div className="dossier-runway" ref={runwayRef}>
            {enriched.map((p, index) => (
              <StackCard key={p.id || index} product={p} index={index} activeIndex={activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}