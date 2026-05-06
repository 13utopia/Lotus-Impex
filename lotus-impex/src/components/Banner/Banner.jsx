import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <section className="history-banner">
      <div className="container banner-container">
        <div className="banner-content">
          <h2 className="banner-title">Our Successful History</h2>
          <p>
            With over two decades of experience, Lotus Impex has established itself as a premier global supplier of industrial fluid control components. Our commitment to precision engineering and unwavering reliability has made us the trusted partner for major infrastructure projects worldwide.
          </p>
          <button className="btn banner-btn">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
