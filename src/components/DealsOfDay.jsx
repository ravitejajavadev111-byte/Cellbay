import { useState, useEffect } from 'react';
import { Zap, ChevronRight, Percent, CreditCard, Repeat } from 'lucide-react';

function useCountdown(hours = 8, mins = 45, secs = 32) {
  const [t, setT] = useState(hours * 3600 + mins * 60 + secs);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(t / 3600)).padStart(2, '0');
  const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
  const s = String(t % 60).padStart(2, '0');
  return { h, m, s };
}

export default function DealsOfDay() {
  const { h, m, s } = useCountdown();

  return (
    <section className="deals">
      <div className="wrap">
        <div className="deals__head">
          <h2><Zap size={18} fill="var(--cb-orange)" color="var(--cb-orange)" /> Deals of the Day</h2>
          <div className="deals__timer">
            <div className="deals__timebox"><span>{h}</span><small>HRS</small></div>
            <span className="deals__colon">:</span>
            <div className="deals__timebox"><span>{m}</span><small>MINS</small></div>
            <span className="deals__colon">:</span>
            <div className="deals__timebox"><span>{s}</span><small>SECS</small></div>
          </div>
        </div>

        <div className="deals__card">
          <div className="deals__left">
            <span className="deals__brand">SAMSUNG</span>
            <h3 className="deals__product">Galaxy S25 Ultra</h3>
            <p className="deals__ai">Galaxy AI ✨ is here</p>
            <p className="deals__spec">12GB | 256GB</p>
            <div className="deals__price-row">
              <span className="deals__price">₹1,29,999</span>
              <span className="deals__mrp">₹1,44,999</span>
            </div>
            <span className="deals__off">10% OFF</span>
          </div>

          <div className="deals__image">
            <div className="deals__image-glow" />
            <div className="deals__phone-mock" />
          </div>

          <div className="deals__right">
            <ul className="deals__perks">
              <li><Percent size={15} strokeWidth={1.8} /><div><strong>₹5,000 Instant</strong><span>Bank Discount</span></div></li>
              <li><CreditCard size={15} strokeWidth={1.8} /><div><strong>No Cost EMI</strong><span>Up to 18 Months</span></div></li>
              <li><Repeat size={15} strokeWidth={1.8} /><div><strong>Exchange Bonus</strong><span>Up to ₹8,000</span></div></li>
            </ul>
            <button className="deals__buy">Buy Now <ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}