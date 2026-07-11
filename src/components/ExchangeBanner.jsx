import { Repeat } from 'lucide-react';

export default function ExchangeBanner() {
  return (
    <section className="exban">
      <div className="wrap">
        <div className="exban__card">
          <div className="exban__text">
            <p className="exban__label">Exchange</p>
            <h3 className="exban__title">OFFER</h3>
            <p className="exban__desc">Exchange your old device &amp; get up to ₹20,000 off</p>
          </div>
          <div className="exban__icon"><Repeat size={30} strokeWidth={1.6} color="var(--cb-blue)" /></div>
          <div className="exban__phones">
            {['#2E4A6B', '#4A7A5E', '#C98F6B', '#7C93AE', '#D9DCE0'].map((c, i) => (
              <div key={i} className="exban__phone" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}