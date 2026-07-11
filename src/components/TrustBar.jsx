import { ShieldCheck, CreditCard, Repeat } from 'lucide-react';
import { trustBadges } from '../data/siteData';

const iconMap = { ShieldCheck, CreditCard, Repeat };

export default function TrustBar() {
  return (
    <section className="trustbar">
      <div className="wrap trustbar__card">
        {trustBadges.map((b) => {
          const Icon = iconMap[b.icon];
          return (
            <div key={b.title} className="trustbar__item">
              <Icon size={19} strokeWidth={1.8} color={b.color} />
              <div><p className="trustbar__title">{b.title}</p><p className="trustbar__sub">{b.sub}</p></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}