import React from 'react';
import './ProductCategories.css';

const categories = [
  { id: 1, title: 'Flanges', desc: 'Explore our extensive range of Flanges for various industrial applications.', img: '/images/Link.png' },
  { id: 2, title: 'Fasteners', desc: 'High-strength fasteners designed for durability and precision.', img: '/images/Link-1.png' },
  { id: 3, title: 'Pipes', desc: 'Seamless and welded pipes meeting global engineering standards.', img: '/images/Link-2.png' },
  { id: 4, title: 'Valves', desc: 'Reliable flow control valves for critical infrastructure.', img: '/images/Link-3.png' },
  { id: 5, title: 'Fittings', desc: 'Premium fittings ensuring secure and leak-proof connections.', img: '/images/Link.png' },
  { id: 6, title: 'Filters', desc: 'Advanced filtration systems for industrial fluid purity.', img: '/images/Link-1.png' },
  { id: 7, title: 'Forged', desc: 'Heavy-duty forged components for maximum structural integrity.', img: '/images/Link-2.png' },
  { id: 8, title: 'CNC Machined', desc: 'Precision CNC machined parts tailored to exact specifications.', img: '/images/Link-3.png' },
];

const ProductCategories = () => {
  return (
    <section className="product-categories" id="products">
      <div className="container">
        <h2 className="section-title">Explore <span>Our Products</span></h2>
        
        <div className="categories-grid">
          {categories.map((cat) => (
            <div className="category-card" key={cat.id}>
              <div className="category-img-wrapper">
                <img src={cat.img} alt={cat.title} />
              </div>
              <div className="category-content">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <button className="btn btn-outline category-btn">View More</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="categories-actions">
           <button className="btn">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
