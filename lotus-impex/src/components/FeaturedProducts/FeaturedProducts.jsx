import React from 'react';
import './FeaturedProducts.css';

const featured = [
  { id: 1, title: 'Titanium Flanges', desc: 'Corrosion resistant and lightweight', img: '/images/Link.png' },
  { id: 2, title: 'Alloy Fasteners', desc: 'High tensile strength for critical joints', img: '/images/Link-1.png' },
  { id: 3, title: 'Seamless Pipes', desc: 'Built for high-pressure fluid transfer', img: '/images/Link-2.png' },
  { id: 4, title: 'Gate Valves', desc: 'Precision control for varied flow rates', img: '/images/Link-3.png' }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="section-title">Our <span>Products</span></h2>
        
        <div className="featured-grid">
          {featured.map((item) => (
            <div className="featured-card" key={item.id}>
              <div className="featured-img-wrapper">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="featured-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <button className="btn btn-outline small-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
