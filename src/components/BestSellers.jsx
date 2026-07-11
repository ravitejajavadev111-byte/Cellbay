import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { bestSellers } from '../data/siteData';

export default function BestSellers() {
  return (
    <section className="bsell">
      <div className="wrap bsell__head">
        <div>
          <span className="bsell__eyebrow"><span className="bsell__pulse" />Most Loved This Week</span>
          <h2>Best Sellers</h2>
        </div>
        <a href="#allbestsellers" className="bsell__viewall">More Products <ArrowUpRight size={14} /></a>
      </div>

      <div className="bsell__scroller wrap">
        {bestSellers.map((p, i) => (
          <motion.div
            key={p.id}
            className="bsell__card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="bsell__index">{String(i + 1).padStart(2, '0')}</span>
            {p.off && <span className="bsell__off">{p.off}</span>}
            <button className="bsell__fav"><Heart size={15} strokeWidth={1.8} /></button>
            <div className="bsell__thumb" style={{ background: p.color }} />
            <div className="bsell__info">
              <span className="bsell__brand">{p.brand}</span>
              <p className="bsell__name">{p.name}</p>
              <div className="bsell__price-row">
                <span className="bsell__price">{p.price}</span>
                {p.mrp && <span className="bsell__mrp">{p.mrp}</span>}
              </div>
              <button className="bsell__add">Add to Bag</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}