import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import './FeaturedProducts.css';

const FEATURED_PRODUCTS_CACHE_KEY = 'lotus-impex-featured-products-cache';
const DESKTOP_ITEMS_PER_PAGE = 4;
const TABLET_ITEMS_PER_PAGE = 2;
const MOBILE_ITEMS_PER_PAGE = 1;

const getItemsPerPage = () => {
  if (typeof window === 'undefined') {
    return DESKTOP_ITEMS_PER_PAGE;
  }

  if (window.innerWidth <= 576) {
    return MOBILE_ITEMS_PER_PAGE;
  }

  if (window.innerWidth <= 992) {
    return TABLET_ITEMS_PER_PAGE;
  }

  return DESKTOP_ITEMS_PER_PAGE;
};

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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

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

  useEffect(() => {
    setCurrentPage(0);
  }, [featuredProducts.length]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(Math.ceil(featuredProducts.length / itemsPerPage), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages - 1);

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
          <>
            <div className="featured-carousel" aria-live="polite">
              <div
                className="featured-carousel-track"
                style={{ transform: `translateX(-${safeCurrentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => {
                  const pageItems = featuredProducts.slice(
                    pageIndex * itemsPerPage,
                    pageIndex * itemsPerPage + itemsPerPage
                  );

                  return (
                    <div
                      className="featured-carousel-page"
                      key={pageIndex}
                      style={{ '--cards-per-page': itemsPerPage }}
                    >
                      <div className="featured-grid">
                        {pageItems.map((item) => (
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
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="featured-empty">Mark products as "Featured Product" in the admin panel to show them here.</div>
        )}

        {featuredProducts.length > 0 && totalPages > 1 && (
          <div className="featured-pagination" aria-label="Featured products pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`pagination-dot ${i === safeCurrentPage ? 'active' : ''}`}
                aria-label={`Show featured products page ${i + 1}`}
                aria-pressed={i === safeCurrentPage}
                onClick={() => setCurrentPage(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
