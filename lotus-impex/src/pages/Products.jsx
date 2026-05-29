import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/FeaturedProducts/FeaturedProducts.css'; // Reuse styles

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [location.search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      const params = new URLSearchParams(location.search);
      const categoryId = params.get('category');
      
      let fetchedProducts = res.data;
      if (categoryId) {
        fetchedProducts = fetchedProducts.filter(p => p.category?._id === categoryId);
      }
      setProducts(fetchedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container" style={{ padding: '100px 0', minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <h2 className="section-title text-center">All <span>Products</span></h2>
        
        <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
          {/* Sidebar Filters */}
          <aside style={{ width: '250px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#0b1a30' }}>Categories</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <Link to="/products" style={{ color: '#4a5568', textDecoration: 'none', fontWeight: !new URLSearchParams(location.search).get('category') ? 'bold' : 'normal' }}>
                  All Products
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat._id} style={{ marginBottom: '10px' }}>
                  <Link 
                    to={`/products?category=${cat._id}`} 
                    style={{ 
                      color: '#4a5568', 
                      textDecoration: 'none',
                      fontWeight: new URLSearchParams(location.search).get('category') === cat._id ? 'bold' : 'normal'
                    }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="featured-grid">
                {products.map((item) => (
                  <div className="featured-card" key={item._id}>
                    <div className="featured-img-wrapper">
                      <img src={item.images?.length ? `http://localhost:5000${item.images[0]}` : '/images/Link.png'} alt={item.title} />
                    </div>
                    <div className="featured-content">
                      <h4>{item.title}</h4>
                      <p style={{ color: '#0056b3', fontWeight: 'bold' }}>${item.price}</p>
                      <Link to={`/product/${item._id}`} className="btn btn-outline small-btn mt-10">View Details</Link>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <p>No products found in this category.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
