import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setActiveImage(res.data.images[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '100px 0' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '100px 0' }}>Product not found.</div>;

  return (
    <div className="product-detail-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.category?.name} / {product.title}
        </div>
      </div>

      <div className="container">
        <div className="product-detail-hero">
          {/* Left: Images */}
          <div className="product-gallery">
            <div className="main-image">
              {activeImage ? (
                <img src={`http://localhost:5000${activeImage}`} alt={product.title} />
              ) : (
                <img src="/images/Link.png" alt="Fallback" />
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnails">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={`http://localhost:5000${img}`} alt={`${product.title} ${idx}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-specs-list">
              {product.specifications && product.specifications.length > 0 ? (
                product.specifications.map((spec, idx) => (
                  <div className="spec-item" key={idx}>
                    <span className="spec-key">{spec.key}:</span>
                    <span className="spec-val">{spec.value}</span>
                  </div>
                ))
              ) : (
                <p>No specifications available.</p>
              )}
            </div>

            <div className="product-actions">
              <button className="btn btn-primary inquiry-btn">Inquiry</button>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'download' ? 'active' : ''}`}
              onClick={() => setActiveTab('download')}
            >
              Download
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                {product.description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />
                ) : (
                  <p>No description available.</p>
                )}
              </div>
            )}
            {activeTab === 'download' && (
              <div className="download-content">
                <p>No downloads available for this product.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
