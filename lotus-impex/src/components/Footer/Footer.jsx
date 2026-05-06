import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon white"></div>
            <span className="logo-text">LOTUS IMPEX</span>
          </div>
          <p className="footer-tagline">Powering Global Flow Systems With Precision Engineering Reliability.</p>
          <div className="footer-social">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter">tw</a>
            <a href="#" aria-label="Facebook">fb</a>
          </div>
        </div>
        
        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="#">Flanges</a></li>
              <li><a href="#">Fasteners</a></li>
              <li><a href="#">Pipes</a></li>
              <li><a href="#">Valves</a></li>
              <li><a href="#">Fittings</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Manufacturing</a></li>
              <li><a href="#">Quality Assurance</a></li>
              <li><a href="#">Global Reach</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>123 Industrial Park, Engineering Zone, TX 75001</li>
              <li>info@lotusimpex.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Lotus Impex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
