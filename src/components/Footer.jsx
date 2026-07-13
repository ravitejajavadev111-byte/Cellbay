import {ShieldCheck,Truck,Headphones,MapPin,Phone,} from "lucide-react";
import {FaFacebookF,FaInstagram,FaYoutube,} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { footerLinks } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__perks">
        <div className="footer__perks-row">
          <div className="footer__perk">
            <span className="footer__perk-icon"><ShieldCheck size={18} color="var(--cb-green)" /></span>
            <div><strong>100% Secure Payments</strong><span>All major cards &amp; UPI accepted</span></div>
          </div>
          <div className="footer__perk">
            <span className="footer__perk-icon"><Truck size={18} color="var(--cb-blue)" /></span>
            <div><strong>Delivery Across Telangana</strong><span>₹99 within Telangana, varies outside</span></div>
          </div>
          <div className="footer__perk">
            <span className="footer__perk-icon"><Headphones size={18} color="var(--cb-orange)" /></span>
            <div><strong>24/7 Support</strong><span>Call or WhatsApp +91 91120 23456</span></div>
          </div>
        </div>
      </div>

      <div className="wrap footer__grid">
        <div className="footer__brand-col">
          <span className="footer__wordmark">
            <span style={{ color: 'var(--cb-red)' }}>c</span>
            <span style={{ color: 'var(--cb-blue)' }}>e</span>
            <span style={{ color: 'var(--cb-orange)' }}>l</span>
            <span style={{ color: 'var(--cb-green)' }}>l</span>
            <span style={{ color: 'var(--cb-red)' }}>b</span>
            <span style={{ color: 'var(--cb-blue)' }}>a</span>
            <span style={{ color: 'var(--cb-orange)' }}>y</span>
          </span>
          <p className="footer__desc">54 stores across Hyderabad &amp; Karimnagar bringing you the latest mobiles, laptops, TVs and electronics — with service that keeps people coming back.</p>
          <div className="footer__socials">
            <a href="https://www.facebook.com/cellbaymobile" className="footer__social-btn" aria-label="Facebook"><FaFacebookF  size={16} /></a>
            <a href="https://twitter.com/cellbay_mobiles" className="footer__social-btn" aria-label="Twitter"><FaXTwitter  size={16} /></a>
            <a href="https://www.instagram.com/cellbay.mobiles/" className="footer__social-btn" aria-label="Instagram"><FaInstagram  size={16} /></a>
            <a href="https://www.youtube.com/@cellbaymobiles" className="footer__social-btn" aria-label="Youtube"><FaYoutube size={16} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Policy</h4>
          <ul>{footerLinks.policy.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>

        <div className="footer__col">
          <h4>Categories</h4>
          <ul>{footerLinks.categories.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
        </div>

        <div className="footer__col">
          <h4>Get In Touch</h4>
          <div className="footer__contact">
            <span className="footer__contact-item"><MapPin size={15} style={{ flexShrink: 0, marginTop: 2 }} /> 2nd Floor, Image Gardens Rd, VIP Hills, Madhapur, Telangana 500081</span>
            <span className="footer__contact-item"><Phone size={15} style={{ flexShrink: 0, marginTop: 2 }} /> +91 91120 23456</span>
          </div>
        </div>
      </div>

      <div className="wrap footer__bottom">
        <p>© 2026 Cellbay. All Rights Reserved.</p>
        <p>Mobiles · Electronics · IT Products</p>
      </div>
    </footer>
  );
}