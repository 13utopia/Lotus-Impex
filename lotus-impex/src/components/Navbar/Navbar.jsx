import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProductPage = location.pathname.startsWith('/products') || location.pathname.startsWith('/product/');
  const logoSrc = isHome
    ? '/images/logo.png'
    : isProductPage
      ? '/images/logo-product.webp'
      : '/images/logo-white.webp';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`navbar ${isHome ? 'navbar--home' : 'navbar--inner'}`}>
      <div className="navbar-container container">
        <Link className="navbar-logo" to="/" aria-label="Lotus Impex home">
          <img src={logoSrc} alt="Lotus Impex" className="navbar-logo-image" />
        </Link>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="#about" onClick={() => setIsOpen(false)}>About Us</a>
          <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
          <div className="navbar-cta-mobile">
            <a className="navbar-enquire" href="#contact" onClick={() => setIsOpen(false)}>Enquire Now</a>
          </div>
        </nav>

        <div className="navbar-actions">
          <a className="navbar-enquire desktop-btn" href="#contact">Enquire Now</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
