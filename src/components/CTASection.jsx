import { ArrowUpRight, MapPin } from 'lucide-react';
import { ctaStats } from '../data/siteData';

export default function CTASection() {
  return (
    <section className="cta">
      <div className="cta__grain" />
      <div className="cta__blob cta__blob--a" />
      <div className="cta__blob cta__blob--b" />
      <div className="wrap cta__inner">
        <span className="cta__eyebrow">Cellbay · Telangana</span>
        <h2 className="cta__title">Buying Is<br /><span>An Experience</span></h2>
        <p className="cta__sub">54 stores across Hyderabad and Karimnagar, genuine products, and a team that actually knows tech. Walk in, or shop from wherever you are.</p>

        <div className="cta__actions">
          <button className="cta__btn-primary">Shop Online <ArrowUpRight size={16} /></button>
          <button className="cta__btn-outline">Find a Store <MapPin size={16} /></button>
        </div>

        <div className="cta__stats">
          {ctaStats.map((s) => (
            <div className="cta__stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}