import { brands } from '../data/siteData';

export default function ShopByBrand() {
  const loop = [...brands, ...brands];

  return (
    <section className="brands">
      <div className="wrap brands__head">
        <h2>Shop by Brand</h2>
        <a href="#allbrands">View All →</a>
      </div>

      <div className="brands__marquee">
        <div className="brands__track">
          {loop.map((b, i) => (
            <a key={`${b.name}-${i}`} href={`#${b.name.toLowerCase()}`} className="brands__pill">
              <span className="brands__logo">{b.name.charAt(0)}</span>
              <span className="brands__name">{b.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}