import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import './ProductCategories.css';

const PRODUCTS_CACHE_KEY = 'lotus-impex-home-products-cache';

const ProductCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(() => products.length === 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        const nextProducts = Array.isArray(res.data) ? res.data : [];
        setProducts(nextProducts);
        localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(nextProducts));
      } catch (error) {
        console.error('Failed to load homepage products', error);
        setProducts([]);
        localStorage.removeItem(PRODUCTS_CACHE_KEY);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const haystack = [
      product.title,
      product.description,
      product.features,
      product.category?.name,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(searchQuery.toLowerCase());
  });

  const getProductDescription = (product) => {
    const fallbackText = product.category?.name || 'View the product details and specifications.';
    const sourceText = product.description || product.features || fallbackText;
    return sourceText.length > 110 ? `${sourceText.slice(0, 107)}...` : sourceText;
  };

  const getProductImage = (product) => {
    const imagePath = product.images?.[0];
    return imagePath ? `${API_BASE_URL}${imagePath}` : '/images/Link.png';
  };

  const getCardBackground = (index) => (
    `/images/product-bg${(index % 2) + 1}.webp`
  );

  return (
    <section className="product-categories" id="products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Product Categories</h2>
          <div className="title-underline"></div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Products Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="categories-grid" aria-busy="true" aria-live="polite">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="category-card" key={index}>
                <div className="category-img-wrapper" style={{ backgroundImage: `url(/images/product-bg${(index % 2) + 1}.webp)` }}>
                  <div className="product-img category-card-skeleton" />
                </div>
                <div className="category-content">
                  <div className="category-skeleton category-skeleton--title" />
                  <div className="category-skeleton category-skeleton--line" />
                  <div className="category-skeleton category-skeleton--line category-skeleton--short" />
                  <div className="category-skeleton category-skeleton--button" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="categories-grid">
            {filteredProducts.map((product, index) => (
              <div className="category-card" key={product.id}>
                <div 
                  className="category-img-wrapper"
                  style={{ 
                    backgroundImage: `url(${getCardBackground(index)})` 
                  }}
                >
                  {product.images?.length ? (
                    <img src={getProductImage(product)} alt={product.title} className="product-img" />
                  ) : (
                    <div className="product-img product-img--empty">No image</div>
                  )}
                </div>
                <div className="category-content">
                  <h3>{product.title}</h3>
                  <p>{getProductDescription(product)}</p>
                  <Link className="btn btn-outline category-btn" to={`/product/${product.id}`}>READ MORE</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>{searchQuery ? `No products found matching "${searchQuery}"` : 'No products found.'}</p>
          </div>
        )}
        
        <div className="categories-actions">
           <Link className="btn view-all-btn" to="/products">View All</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
