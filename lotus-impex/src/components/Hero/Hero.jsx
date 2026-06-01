import React from 'react';
import './Hero.css';

const tickerItems = ['Flanges', 'Fasteners', 'Pipes', 'Valves', 'Fittings', 'Tubes'];

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background" />
      <div className="hero-overlay" />
      <div className="hero-fade" />
      <div className="hero-sheen hero-sheen-left" />
      <div className="hero-sheen hero-sheen-right" />

      <div className="container hero-content">
        <div className="hero-copy">
          <h1>
            POWERING GLOBAL FLOW<br />
            SYSTEM WITH <span className="highlight-blue">PRECISION</span><br />
            ENGINEERING RELIABILITY
          </h1>
          <p className="hero-desc">
            Leading manufacturers and exporters of sanitary valves, fittings, and piping solutions designed for hygiene-critical industries worldwide.
          </p>

          <div className="hero-buttons">
            <a className="hero-btn hero-btn-primary" href="#contact">
              Get A Quote <span className="btn-arrow">→</span>
            </a>
            <a className="hero-btn hero-btn-outline" href="#products">
              Explore Products
            </a>
          </div>

          <div className="hero-service-card">
            <div className="card-content">
              <h3>Request Services Today!</h3>
              <p>Our professional team is always ready to serve you anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-ticker" aria-label="Product ticker">
        <div className="hero-ticker-track">
          {Array.from({ length: 4 }).map((_, blockIndex) => (
            <React.Fragment key={blockIndex}>
              {tickerItems.map((item) => (
                <React.Fragment key={`${blockIndex}-${item}`}>
                  <span className="hero-ticker-item">{item}</span>
                  <span className="hero-ticker-dot" aria-hidden="true" />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
