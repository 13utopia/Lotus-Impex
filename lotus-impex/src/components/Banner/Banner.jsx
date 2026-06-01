import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <section className="success-story-section">
      <div className="container success-story-container">
        <div className="success-story-card">
          <div className="success-story-visual">
            <div className="success-story-visual-overlay" />
            <div className="success-story-visual-copy">
              <span className="success-story-kicker">WHO WE ARE</span>
              <h3>
                Expert in Import
                <br />
                Quality Products You
                <br />
                Can Trust
              </h3>
            </div>
          </div>

          <div className="success-story-content">
            <h2 className="success-story-title">Our Successful History</h2>
            <p className="success-story-description">
              The Lotus Impex is in business since 50+ years and has been seeing immense growth ever since. And with the same excitement and empathy we tend to grow with all our strength and with increase in innovation and technology.
            </p>
            <a className="success-story-link" href="#about">
              Read More
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
