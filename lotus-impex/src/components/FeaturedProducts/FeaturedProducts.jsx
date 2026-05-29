import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        // Get up to 4 featured products
        setProducts(res.data.filter(p => p.is_featured).slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="featured-products">
      <div className="container">
        <h2 className="section-title">Our <span>Products</span></h2>
        
        <div className="featured-grid">
          {products.map((item) => (
            <div className="featured-card" key={item._id}>
              <div className="featured-img-wrapper">
                <img src={item.images?.length ? `http://localhost:5000${item.images[0]}` : '/images/Link.png'} alt={item.title} />
              </div>
              <div className="featured-content">
                <h4>{item.title}</h4>
                <p>{item.description ? item.description.substring(0, 60) + '...' : ''}</p>
                <Link to={`/product/${item._id}`} className="btn btn-outline small-btn">View Details</Link>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center" style={{ width: '100%' }}>No featured products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
