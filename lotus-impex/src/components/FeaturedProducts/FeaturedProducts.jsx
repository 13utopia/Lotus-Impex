import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const products = Array.isArray(res.data) ? res.data : [];
        setFeaturedProducts(products.filter((product) => product.is_featured));
      } catch (error) {
        console.error('Failed to load featured products', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-title-wrap">
          <h2 className="section-title-custom">Hot Products</h2>
          <div className="title-underline-custom" />
        </div>

        {loading ? (
          <div className="featured-empty">Loading featured products...</div>
        ) : featuredProducts.length > 0 ? (
          <div className="featured-grid">
            {featuredProducts.map((item) => (
              <div className="featured-card" key={item.id}>
                <div className="featured-img-wrapper">
                  {item.images?.length ? (
                    <img
                      src={`http://localhost:5000${item.images[0]}`}
                      alt={item.title}
                    />
                  ) : (
                    <div className="featured-img-empty">No image</div>
                  )}
                </div>
                <div className="featured-content">
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="featured-empty">Mark products as "Featured Product" in the admin panel to show them here.</div>
        )}

        <div className="featured-pagination">
          {[...Array(Math.max(featuredProducts.length, 1))].map((_, i) => (
            <span key={i} className={`pagination-dot ${i === 0 ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
