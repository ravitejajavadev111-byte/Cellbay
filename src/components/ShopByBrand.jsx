import { brands } from '../data/siteData';

export default function ShopByBrand() {
  return (
    <section className="brands">
      <div className="wrap brands__head">
        <h2>Shop by Brand</h2>
        <a href="#allbrands">View All →</a>
      </div>
      <div className="brands__scroller wrap">
        {brands.map((b) => (
          <a key={b.name} href={`#${b.name.toLowerCase()}`} className="brands__pill">
            <span className="brands__logo">{b.name.charAt(0)}</span>
            <span className="brands__name">{b.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}