import { tickerItems } from '../data/siteData';

export default function Ticker() {
  const loop = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {loop.map((t, i) => (
          <span key={i} className="ticker__item"><span className="ticker__dot" />{t}</span>
        ))}
      </div>
    </div>
  );
}