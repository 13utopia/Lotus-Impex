import React from 'react';
import './Roadmap.css';

const Roadmap = () => {
  return (
    <section className="roadmap">
      <div className="container">
        <h2 className="section-title light">From Source To <span>Site</span></h2>
        
        <div className="roadmap-container">
          <div className="roadmap-line"></div>
          
          <div className="roadmap-step">
            <div className="step-icon">
              <span className="icon-inner"></span>
            </div>
            <h4>Source</h4>
            <p>Premium raw materials procured globally.</p>
          </div>
          
          <div className="roadmap-step">
            <div className="step-icon">
              <span className="icon-inner"></span>
            </div>
            <h4>Forge</h4>
            <p>Advanced manufacturing and shaping.</p>
          </div>
          
          <div className="roadmap-step">
            <div className="step-icon">
              <span className="icon-inner"></span>
            </div>
            <h4>Quality Check</h4>
            <p>Rigorous multi-point inspection.</p>
          </div>
          
          <div className="roadmap-step">
            <div className="step-icon">
              <span className="icon-inner"></span>
            </div>
            <h4>Site</h4>
            <p>Secure packaging and global delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
