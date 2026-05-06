import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background" style={{ backgroundImage: "url('/images/Background.png')" }}></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <h1>Powering Global Flow Systems With <span>Precision Engineering Reliability</span></h1>
        <p>A comprehensive range of industrial fluid control solutions for the world's most demanding environments.</p>
        <div className="hero-buttons">
          <button className="btn">Explore Products</button>
          <button className="btn btn-outline" style={{ borderColor: 'var(--white)', color: 'var(--white)' }}>Company Profile</button>
        </div>
      </div>

      <div className="hero-subnav">
        <div className="container subnav-container">
          <a href="#flanges">Flanges</a>
          <span className="separator">•</span>
          <a href="#fasteners">Fasteners</a>
          <span className="separator">•</span>
          <a href="#pipes">Pipes</a>
          <span className="separator">•</span>
          <a href="#valves">Valves</a>
          <span className="separator">•</span>
          <a href="#fittings">Fittings</a>
          <span className="separator">•</span>
          <a href="#filters">Filters</a>
          <span className="separator">•</span>
          <a href="#forged">Forged</a>
          <span className="separator">•</span>
          <a href="#cnc">CNC Machined</a>
          <span className="separator">•</span>
          <a href="#spares">Spares</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
