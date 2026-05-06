import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container container">
        <div className="navbar-logo">
          {/* Using text for logo if we don't have the logo asset, or simple CSS logo */}
          <div className="logo-icon"></div>
          <span className="logo-text">LOTUS IMPEX</span>
        </div>
        
        <nav className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="#products" onClick={() => setIsOpen(false)}>Products</a>
          <a href="#industries" onClick={() => setIsOpen(false)}>Industries</a>
          <a href="#quality" onClick={() => setIsOpen(false)}>Quality</a>
          <div className="navbar-cta-mobile">
            <button className="btn">Contact Us</button>
          </div>
        </nav>

        <div className="navbar-actions">
          <button className="btn desktop-btn">Contact Us</button>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
