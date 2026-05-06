import React from 'react';
import './Enterprise.css';

const Enterprise = () => {
  return (
    <section className="enterprise">
      <div className="container enterprise-container">
        <div className="enterprise-content">
          <h2 className="enterprise-title">ENTERPRISE SUPPLY.<br/><span>ENTERPRISE SPEED.</span></h2>
          <p>
            Our global distribution network ensures that critical components reach your site exactly when you need them. We understand that in industrial operations, time is a critical asset.
          </p>
          
          <div className="enterprise-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h5>Global Logistics</h5>
                <p>Streamlined supply chain for rapid deployment.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h5>Vast Inventory</h5>
                <p>Extensive stock of standard and specialized components.</p>
              </div>
            </div>
          </div>
          
          <button className="btn">Partner With Us</button>
        </div>
        
        <div className="enterprise-image">
          <img src="/images/Industrial inventory.png" alt="Industrial Inventory and Supply" />
        </div>
      </div>
    </section>
  );
};

export default Enterprise;
