import { Heart } from 'lucide-react';
import { topPicks } from '../data/siteData';

export default function TopPicks() {
  return (
    <section className="picks">
      <div className="wrap picks__head">
        <h2>✦ Top Picks for You</h2>
        <a href="#all">View All →</a>
      </div>
      <div className="picks__scroller wrap">
        {topPicks.map((p) => (
          <div key={p.id} className="picks__card">
            <button className="picks__fav"><Heart size={15} strokeWidth={1.8} /></button>
            <div className="picks__thumb" style={{ background: p.color }} />
            <span className="picks__brand">{p.brand}</span>
            <p className="picks__name">{p.name}</p>
            <div className="picks__price-row">
              <span className="picks__price">{p.price}</span>
              <span className="picks__mrp">{p.mrp}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}