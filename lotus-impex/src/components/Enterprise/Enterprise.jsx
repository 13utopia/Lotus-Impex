import React from 'react';
import './Enterprise.css';

const Enterprise = () => {
  return (
    <section className="enterprise-section" id="enterprise">
      <div className="container">
        <div className="enterprise-wrapper">
          
          {/* Left Column - Content and Grid */}
          <div className="enterprise-left">
            <div className="enterprise-subtitle">
              <span className="subtitle-line"></span>
              <span className="subtitle-text">Why Lotus Impex</span>
              <span className="subtitle-line"></span>
            </div>
            
            <h2 className="enterprise-title">
              Enterprise Supply,<br />
              <span className="blue-text">Enterprise Speed.</span>
            </h2>
            
            <p className="enterprise-desc">
              We understand that industrial projects run on tight schedules. Our B2B supply chain is optimized for speed, reliability, and scale.
            </p>
            
            <div className="enterprise-feature-grid">
              
              {/* Card 1 */}
              <div className="enterprise-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Bulk Pricing</h4>
                </div>
                <p className="feature-card-desc">
                  Competitive rates for large volume orders with transparent costing.
                </p>
              </div>

              {/* Card 2 */}
              <div className="enterprise-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Fast Turnaround</h4>
                </div>
                <p className="feature-card-desc">
                  Express delivery for urgent requirements with dedicated support.
                </p>
              </div>

              {/* Card 3 */}
              <div className="enterprise-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Pan India Supply</h4>
                </div>
                <p className="feature-card-desc">
                  Nationwide logistics network ensuring timely delivery to any site.
                </p>
              </div>

              {/* Card 4 */}
              <div className="enterprise-feature-card">
                <div className="feature-card-header">
                  <div className="feature-card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h4 className="feature-card-title">Custom Orders</h4>
                </div>
                <p className="feature-card-desc">
                  Non-standard sizes and specifications manufactured to your drawings.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column - Lab Image and Bulk Quote Card */}
          <div className="enterprise-right">
            <div className="enterprise-image-wrapper">
              <img src="/images/image 32.webp" alt="Quality Control Lab" className="enterprise-image" />
              
              {/* Floating absolute bulk quote card */}
              <div className="bulk-quote-card">
                <h3 className="bulk-quote-title">Need a Bulk Quote?</h3>
                <p className="bulk-quote-desc">
                  Share your Bill of Materials and we will respond with competitive pricing within 24 hours. Dedicated account manager for orders above 50 tons.
                </p>
                <button className="bulk-quote-btn">
                  <span>Get Bulk Quote</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="quote-btn-arrow">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Enterprise;
