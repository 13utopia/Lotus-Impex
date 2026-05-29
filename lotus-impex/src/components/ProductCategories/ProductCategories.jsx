import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductCategories.css';

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="product-categories" id="products">
      <div className="container">
        <h2 className="section-title">Explore <span>Our Categories</span></h2>
        
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div className="category-card" key={cat._id}>
              <div className="category-img-wrapper">
                <img src={`/images/Link${index % 4 === 0 ? '' : '-' + (index % 4)}.png`} alt={cat.name} />
              </div>
              <div className="category-content">
                <h3>{cat.name}</h3>
                <Link to={`/products?category=${cat._id}`} className="btn btn-outline category-btn">View More</Link>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-center" style={{ width: '100%' }}>No categories found.</p>
          )}
        </div>
        
        <div className="categories-actions">
           <Link to="/products" className="btn">View All Products</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
