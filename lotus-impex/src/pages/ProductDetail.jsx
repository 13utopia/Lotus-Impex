import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import './ProductDetail.css';

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '-';
  return value;
};

const splitLines = (value) =>
  String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const activeCategoryId = useMemo(() => new URLSearchParams(location.search).get('category'), [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/products/${id}`),
          axios.get(`${API_BASE_URL}/api/categories`),
        ]);

        setProduct(productRes.data);
        setCategories(Array.isArray(categoriesRes.data) ? categoriesRes.data : []);

        if (productRes.data.images && productRes.data.images.length > 0) {
          setActiveImage(productRes.data.images[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const specRows = product
    ? [
        ['Material', product.material],
        ['Standard', product.standard],
        ['Working Temperature', product.working_temperature],
        ['Connection Ways', product.connection_ways],
        ['Size', product.size],
        ['Sales Models', product.sales_models],
        ['Valve Seal', product.valve_seal],
        ['Surface Treatment', product.surface_treatment],
        ['Pressure Value', product.pressure_value],
        ['MOQ', product.moq],
        ['Seal Material', product.seal_material],
        ['Transport Package', product.transport_package],
        ...(Array.isArray(product.specifications)
          ? product.specifications
              .filter((spec) => spec?.key || spec?.value)
              .map((spec) => [spec.key, spec.value])
          : []),
      ]
    : [];

  if (loading) return <div className="container" style={{ padding: '100px 0' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '100px 0' }}>Product not found.</div>;

  return (
    <div className="product-detail-page">
      <div className="breadcrumbs">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.category?.name || '-'} / {product.title}
        </div>
      </div>

      <div className="container">
        <div className="product-category-pills">
          {/* Category pills removed for cleaner product detail layout */}
        </div>

        <div className="product-search-bar">
          <input type="text" placeholder="Keywords" aria-label="Search product details" />
          <button type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>

        <div className="product-detail-hero">
          <div className="product-gallery">
            <div className="main-image">
              {activeImage ? (
                <img src={`${API_BASE_URL}${activeImage}`} alt={product.title} />
              ) : (
                <div className="product-main-image-empty">No image available</div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={`${API_BASE_URL}${img}`} alt={`${product.title} ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>

            <div className="product-specs-list">
              {specRows.length > 0 ? (
                specRows.map(([label, value], idx) => (
                  <React.Fragment key={`${label}-${idx}`}>
                    <div className="spec-key">{label}:</div>
                    <div className="spec-val">{formatValue(value)}</div>
                  </React.Fragment>
                ))
              ) : (
                <p>No specifications available.</p>
              )}
            </div>

            <div className="product-actions">
              <button className="btn btn-primary inquiry-btn" type="button">
                <svg className="inquiry-icon" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1.75 1.3125C1.63151 1.3125 1.52897 1.35579 1.44238 1.44238C1.35579 1.52897 1.3125 1.63151 1.3125 1.75V2.35156L6.0293 6.2207C6.31185 6.45768 6.63542 6.57617 7 6.57617C7.36458 6.57617 7.68815 6.45768 7.9707 6.2207L12.6875 2.35156V1.75C12.6875 1.63151 12.6442 1.52897 12.5576 1.44238C12.471 1.35579 12.3685 1.3125 12.25 1.3125H1.75ZM1.3125 4.04688V8.75C1.3125 8.86849 1.35579 8.97103 1.44238 9.05762C1.52897 9.14421 1.63151 9.1875 1.75 9.1875H12.25C12.3685 9.1875 12.471 9.14421 12.5576 9.05762C12.6442 8.97103 12.6875 8.86849 12.6875 8.75V4.04688L8.80469 7.24609C8.45833 7.52865 8.07096 7.71777 7.64258 7.81348C7.21419 7.90918 6.78581 7.90918 6.35742 7.81348C5.92904 7.71777 5.54167 7.52865 5.19531 7.24609L1.3125 4.04688ZM0 1.75C0 1.43099 0.077474 1.13704 0.232422 0.868164C0.38737 0.599284 0.599284 0.38737 0.868164 0.232422C1.13704 0.0774736 1.43099 0 1.75 0H12.25C12.569 0 12.863 0.0774736 13.1318 0.232422C13.4007 0.38737 13.6126 0.599284 13.7676 0.868164C13.9225 1.13704 14 1.43099 14 1.75V8.75C14 9.06901 13.9225 9.36296 13.7676 9.63184C13.6126 9.90072 13.4007 10.1126 13.1318 10.2676C12.863 10.4225 12.569 10.5 12.25 10.5H1.75C1.43099 10.5 1.13704 10.4225 0.868164 10.2676C0.599284 10.1126 0.38737 9.90072 0.232422 9.63184C0.077474 9.36296 0 9.06901 0 8.75V1.75Z" fill="white"/>
                </svg>
                <span>Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        <div className="product-tabs-section">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
              type="button"
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'download' ? 'active' : ''}`}
              onClick={() => setActiveTab('download')}
              type="button"
            >
              Download
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                {product.description && <p className="description-lead">{product.description}</p>}

                <h3>Specification</h3>
                <ul>
                  {specRows.slice(0, 8).map(([label, value], idx) => (
                    <li key={`${label}-${idx}`}>
                      {label}: {formatValue(value)}
                    </li>
                  ))}
                </ul>

                <h3>Features</h3>
                {splitLines(product.features).length > 0 ? (
                  <ul>
                    {splitLines(product.features).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>-</p>
                )}

                <h3>Application</h3>
                {product.application ? (
                  product.application.split('\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                ) : (
                  <p>-</p>
                )}
              </div>
            )}

            {activeTab === 'download' && (
              <div className="download-content">
                <p>{formatValue(product.download_link || product.download_note || product.transport_package)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
