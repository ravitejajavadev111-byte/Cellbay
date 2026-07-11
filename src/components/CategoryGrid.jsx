import { Smartphone, Headphones, Watch, Tablet, Cable, Laptop, Grid2x2 } from 'lucide-react';
import { categories } from '../data/siteData';

const iconMap = { Smartphone, Headphones, Watch, Tablet, Cable, Laptop, Grid2x2 };

export default function CategoryGrid() {
  return (
    <section className="catgrid">
      <div className="wrap catgrid__row">
        {categories.map((c) => {
          const Icon = iconMap[c.icon];
          return (
            <a key={c.label} href={`#${c.label.toLowerCase()}`} className="catgrid__item">
              <span className="catgrid__icon" style={{ background: c.bg }}><Icon size={22} strokeWidth={1.7} color="var(--ink)" /></span>
              <span className="catgrid__label">{c.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}