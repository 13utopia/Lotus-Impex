import React from 'react';
import './Statistics.css';

const Statistics = () => {
  return (
    <section className="statistics" id="about">
      <div className="container">
        <div className="stats-grid">
          {/* Card 1: White by default, turns blue on hover */}
          <div className="stat-card stat-light">
            <img src="/images/logo.png" className="lotus-watermark-img" alt="" />
            <div className="stat-card-content">
              <h3>70+</h3>
              <p>Countries Served</p>
            </div>
          </div>

          {/* Card 2: White background */}
          <div className="stat-card stat-light">
            <img src="/images/logo.png" className="lotus-watermark-img" alt="" />
            <div className="stat-card-content">
              <h3>180+</h3>
              <p>Product Variants</p>
            </div>
          </div>

          {/* Card 3: White background */}
          <div className="stat-card stat-light">
            <img src="/images/logo.png" className="lotus-watermark-img" alt="" />
            <div className="stat-card-content">
              <h3>250+</h3>
              <p>Global Clients</p>
            </div>
          </div>

          {/* Card 4: White background */}
          <div className="stat-card stat-light">
            <img src="/images/logo.png" className="lotus-watermark-img" alt="" />
            <div className="stat-card-content">
              <h3>85+</h3>
              <p>Skilled Professionals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
