import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import './Products.css';

const PRODUCTS_CACHE_KEY = 'lotus-impex-products-cache';
const CATEGORIES_CACHE_KEY = 'lotus-impex-categories-cache';

const Products = () => {
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem(CATEGORIES_CACHE_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem(PRODUCTS_CACHE_KEY) || !localStorage.getItem(CATEGORIES_CACHE_KEY);
    } catch {
      return true;
    }
  });
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const location = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeCategoryId = searchParams.get('category');
  const activeCategory = useMemo(
    () => categories.find((category) => String(category.id) === String(activeCategoryId)),
    [categories, activeCategoryId]
  );

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    setLoading(productsLoading || categoriesLoading);
  }, [productsLoading, categoriesLoading]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      const nextProducts = Array.isArray(res.data) ? res.data : [];
      setProducts(nextProducts);
      localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(nextProducts));
    } catch (err) {
      console.error(err);
      setProducts([]);
      localStorage.removeItem(PRODUCTS_CACHE_KEY);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
      const nextCategories = Array.isArray(res.data) ? res.data : [];
      setCategories(nextCategories);
      localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(nextCategories));
    } catch (err) {
      console.error(err);
      setCategories([]);
      localStorage.removeItem(CATEGORIES_CACHE_KEY);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory = !activeCategoryId || String(product.category?.id) === String(activeCategoryId);
    const haystack = `${product.title || ''} ${product.description || ''} ${product.category?.name || ''}`.toLowerCase();
    const matchKeyword = !keyword.trim() || haystack.includes(keyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  const productsByCategory = categories.map((category) => ({
    ...category,
    items: filteredProducts.filter((product) => String(product.category?.id) === String(category.id)),
  }));

  const productBadges = (product) => {
    const badges = [];
    if (product.is_new_arrival) badges.push('New Arrival');
    if (product.is_best_seller) badges.push('Best Seller');
    return badges;
  };

  const pageTitle = activeCategory?.name || 'Products';
  const pageBreadcrumb = activeCategory ? (
    <>
      <Link to="/">Home</Link>
      <span>/</span>
      <Link to="/products">Products</Link>
      <span>/</span>
      <span>{activeCategory.name}</span>
    </>
  ) : (
    <>
      <Link to="/">Home</Link>
      <span>/</span>
      <span>Products</span>
    </>
  );

  return (
    <div className="products-page">
      <section className="products-shell">
        <div className="container">
          <div className="products-page-header">
            <h1>{pageTitle}</h1>
            <div className="products-breadcrumb">{pageBreadcrumb}</div>
          </div>

          <div className="products-search-bar">
            <input
              type="text"
              placeholder="Keywords"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              aria-label="Search products"
            />
            <button type="button" aria-label="Search products">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </div>

          {loading ? (
            <div className="products-loading-grid" aria-busy="true" aria-live="polite">
              <div className="products-loading-sidebar">
                <div className="products-skeleton products-skeleton--title" />
                {[...Array(4)].map((_, index) => (
                  <div className="products-skeleton products-skeleton--line" key={index} />
                ))}
              </div>
              <div className="products-loading-main">
                <div className="products-grid products-grid--category">
                  {[...Array(6)].map((_, index) => (
                    <div className="product-card product-card--skeleton" key={index}>
                      <div className="product-card-image">
                        <div className="products-skeleton products-skeleton--image" />
                      </div>
                      <div className="product-card-body">
                        <div className="products-skeleton products-skeleton--text" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeCategory ? (
            <div className="products-category-layout">
              <aside className="products-sidebar">
                <div className="products-sidebar-title">Products</div>
                <div className="products-sidebar-list">
                  {productsByCategory.map((category) => (
                    <div className={`sidebar-category ${String(category.id) === String(activeCategoryId) ? 'active' : ''}`} key={category.id}>
                      <Link className="sidebar-category-title" to={`/products?category=${category.id}`}>
                        {category.name}
                      </Link>
                      {category.items.length > 0 && (
                        <ul className="sidebar-product-list">
                          {category.items.map((item) => (
                            <li key={item.id}>
                              <Link to={`/product/${item.id}`}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="products-main">
                <div className="products-grid products-grid--category">
                    {filteredProducts.map((item) => (
                      <Link to={`/product/${item.id}`} className="product-card" key={item.id}>
                        <div className="product-card-image">
                          {productBadges(item).length > 0 && (
                            <div className="product-card-badges">
                              {productBadges(item).map((badge) => (
                                <span key={badge} className="product-card-badge">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.images?.length ? (
                            <img
                              src={`${API_BASE_URL}${item.images[0]}`}
                              alt={item.title}
                            />
                          ) : (
                            <div className="product-card-image-empty">No image</div>
                          )}
                      </div>
                      <div className="product-card-body">
                        <h3>{item.title}</h3>
                        {item.price ? <p>${item.price}</p> : null}
                      </div>
                    </Link>
                  ))}
                </div>

                {!filteredProducts.length && (
                  <div className="products-empty">No products found in this category.</div>
                )}
              </div>
            </div>
          ) : (
            <>
              {productsByCategory.map((category) => (
                <section className="category-block" key={category.id}>
                  <div className="category-block-header">
                    <h2>{category.name}</h2>
                    <Link to={`/products?category=${category.id}`}>MORE</Link>
                  </div>

                  <div className="products-grid">
                    {category.items.slice(0, 4).map((item) => (
                      <Link to={`/product/${item.id}`} className="product-card" key={item.id}>
                        <div className="product-card-image">
                          {productBadges(item).length > 0 && (
                            <div className="product-card-badges">
                              {productBadges(item).map((badge) => (
                                <span key={badge} className="product-card-badge">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.images?.length ? (
                            <img
                              src={`${API_BASE_URL}${item.images[0]}`}
                              alt={item.title}
                            />
                          ) : (
                            <div className="product-card-image-empty">No image</div>
                          )}
                        </div>
                        <div className="product-card-body">
                          <h3>{item.title}</h3>
                          {item.price ? <p>${item.price}</p> : null}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}

              {!productsByCategory.length && (
                <div className="products-empty">No categories found.</div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
