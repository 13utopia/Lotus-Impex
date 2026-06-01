import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const recommendedProducts = [
  'DIN 11851 nut',
  'DIN 11851 male-male-bend',
  'DIN 11851 nut aerator tube',
  'DIN 11851 male T',
  'DIN 11851 male-liner bend',
  'DIN 11851 male reducer',
  'DIN 11851 liner-male reducer',
  'DIN 11851 liner reducer',
];

const hotProducts = [
  '3A DIN SMS Sanitary Dairy & Milk Pneumatic Customized High Platform Actuator Butterfly Valve',
  'DN50 sanitary ball valves for bear industry',
  'clamp end diaphragm valves with pneumatic actuator',
  'hygienic 3 PCS Stainless Steel hygienic encapsulated Ball',
];

const productCategories = [
  'Sanitary Valves',
  'Sanitary Fittings',
  'Sanitary Hose Fittings',
  'Sanitary Tank Accessories',
  'Sanitary Tube',
  'Sanitary Pumps',
  'Customized Products',
  'Sanitary Gaskets',
];

const Footer = () => {
  const [openSection, setOpenSection] = useState('recommended');
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/products');

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? '' : section));
  };

  return (
    <footer className={`footer ${isProductPage ? 'footer--product-page' : ''}`} id="contact">
      <div className="container footer-top">
        <div className="footer-brand-mark">
          <img src="/images/logo-white.webp" alt="Lotus Impex" className="footer-logo-image" />
        </div>

        <div className="footer-help-copy">
          <h3>Do not know how to choose the right products?</h3>
          <p>Our professional sales engineers are here to consult and help you to offer with suitable solutions.</p>
        </div>

        <a className="footer-help-btn" href="#contact">
          <span>ASK FOR HELP</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            <path d="M8 10h8" />
            <path d="M8 14h5" />
          </svg>
        </a>
      </div>

      <div className={`container footer-divider-wrap ${isProductPage ? 'footer-divider-wrap--hidden' : ''}`}>
        <div className="footer-divider" />
      </div>

      <div className="container footer-links">
        <div className="footer-column">
          <button
            type="button"
            className="footer-column-toggle"
            aria-expanded={openSection === 'recommended'}
            onClick={() => toggleSection('recommended')}
          >
            <span>RECOMMENDED PRODUCTS</span>
            <span className="footer-toggle-icon" aria-hidden="true" />
          </button>
          <h4>RECOMMENDED PRODUCTS</h4>
          <ul className={openSection === 'recommended' ? 'is-open' : ''}>
            {recommendedProducts.map((item) => (
              <li key={item}>
                <a href="#products">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <button
            type="button"
            className="footer-column-toggle"
            aria-expanded={openSection === 'hot'}
            onClick={() => toggleSection('hot')}
          >
            <span>HOT PRODUCTS</span>
            <span className="footer-toggle-icon" aria-hidden="true" />
          </button>
          <h4>HOT PRODUCTS</h4>
          <ul className={openSection === 'hot' ? 'is-open' : ''}>
            {hotProducts.map((item) => (
              <li key={item}>
                <a href="#products">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <button
            type="button"
            className="footer-column-toggle"
            aria-expanded={openSection === 'categories'}
            onClick={() => toggleSection('categories')}
          >
            <span>PRODUCT CATEGORIES</span>
            <span className="footer-toggle-icon" aria-hidden="true" />
          </button>
          <h4>PRODUCT CATEGORIES</h4>
          <ul className={openSection === 'categories' ? 'is-open' : ''}>
            {productCategories.map((item) => (
              <li key={item}>
                <a href="#categories">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h4>CONTACT US</h4>
          <button type="button" className="footer-column-toggle footer-column-toggle-static">
            <span>CONTACT US</span>
          </button>
          <ul>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>Address : 9 jain bhavan , DR BHAJEKAR LANE, S.V.P.ROAD, MUMBAI 400004</span>
            </li>
           
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 8V6a2 2 0 0 1 2-2h2" />
                <path d="M16 6h2a2 2 0 0 1 2 2v2" />
                <path d="M18 16v2a2 2 0 0 1-2 2h-2" />
                <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
                <path d="m9 9 6 6" />
              </svg>
              <span>Phone Number: +919930430789</span>
            </li>
           
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 18.1c-.3.8-1.3 1.6-2.2 1.8-1.2.3-2.7.1-4.6-.7-2.4-1-4.3-2.4-6-4.1s-3.1-3.6-4.1-6C3.1 7.2 3 5.7 3.2 4.5c.2-.9 1-1.9 1.8-2.2.5-.2 1-.1 1.4.3l2 2c.4.4.5 1 .3 1.5L8 7.8c-.2.6 0 1.2.4 1.7l2.1 2.1c.5.5 1.1.6 1.7.4l1.7-.7c.5-.2 1.1-.1 1.5.3l2 2c.4.4.5.9.3 1.5Z" />
              </svg>
              <span>Whatsapp : +919930430789</span>
            </li>
            <li>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <span>E-mail :  INFO@LOTUSIMPEX.CO.IN</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>Copyright © 2026 Lotus Impex All Right Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
