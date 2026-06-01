import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import './FeaturedProducts.css';

const FEATURED_PRODUCTS_CACHE_KEY = 'lotus-impex-featured-products-cache';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(FEATURED_PRODUCTS_CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(() => featuredProducts.length === 0);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        const products = Array.isArray(res.data) ? res.data : [];
        const nextFeaturedProducts = products.filter((product) => product.is_featured);
        setFeaturedProducts(nextFeaturedProducts);
        localStorage.setItem(FEATURED_PRODUCTS_CACHE_KEY, JSON.stringify(nextFeaturedProducts));
      } catch (error) {
        console.error('Failed to load featured products', error);
        setFeaturedProducts([]);
        localStorage.removeItem(FEATURED_PRODUCTS_CACHE_KEY);
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
          <div className="featured-grid featured-grid--loading" aria-busy="true" aria-live="polite">
            {[...Array(4)].map((_, index) => (
              <div className="featured-card featured-card--skeleton" key={index}>
                <div className="featured-img-wrapper">
                  <div className="featured-skeleton featured-skeleton--image" />
                </div>
                <div className="featured-content">
                  <div className="featured-skeleton featured-skeleton--text" />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="featured-grid">
            {featuredProducts.map((item) => (
              <div className="featured-card" key={item.id}>
                <div className="featured-img-wrapper">
                  {item.images?.length ? (
                    <img
                      src={`${API_BASE_URL}${item.images[0]}`}
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
