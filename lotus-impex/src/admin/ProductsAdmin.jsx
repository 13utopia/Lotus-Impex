import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Admin.css';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('In Stock');
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  const [images, setImages] = useState([]); // For display of existing images
  const [imageFiles, setImageFiles] = useState(null); // For new uploads

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
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

  const handleAddSpec = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const handleSpecChange = (index, field, val) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = val;
    setSpecifications(newSpecs);
  };

  const handleRemoveSpec = (index) => {
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    setSpecifications(newSpecs);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setPrice('');
    setCategory('');
    setStockStatus('In Stock');
    setDescription('');
    setSpecifications([{ key: '', value: '' }]);
    setImages([]);
    setImageFiles(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let uploadedImageUrls = [...images];
      
      // Handle Image Upload if there are new files
      if (imageFiles && imageFiles.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < imageFiles.length; i++) {
          formData.append('images', imageFiles[i]);
        }
        const uploadRes = await axios.post('http://localhost:5000/api/products/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedImageUrls = [...uploadedImageUrls, ...uploadRes.data.imagePaths];
      }

      const productData = {
        title,
        price: Number(price),
        category,
        stock_status: stockStatus,
        description,
        specifications: specifications.filter(s => s.key && s.value),
        images: uploadedImageUrls
      };

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${currentId}`, productData);
      } else {
        await axios.post('http://localhost:5000/api/products', productData);
      }
      
      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category?._id || '');
    setStockStatus(product.stock_status);
    setDescription(product.description || '');
    setSpecifications(product.specifications?.length ? product.specifications : [{ key: '', value: '' }]);
    setImages(product.images || []);
    setImageFiles(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-page">
      <h2>Manage Products</h2>
      
      <div className="admin-card">
        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="admin-form-group">
              <label>Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
          </div>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category...</option>
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Stock Status</label>
              <select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)}>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label>Images</label>
            <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(e.target.files)} />
            {images.length > 0 && (
              <div className="admin-image-preview">
                {images.map((img, idx) => (
                  <img key={idx} src={`http://localhost:5000${img}`} alt="Preview" width="50" />
                ))}
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label>Description</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label>Specifications</label>
            {specifications.map((spec, index) => (
              <div key={index} className="admin-spec-row">
                <input 
                  type="text" 
                  placeholder="Key (e.g. Material)" 
                  value={spec.key} 
                  onChange={(e) => handleSpecChange(index, 'key', e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="Value (e.g. 304L)" 
                  value={spec.value} 
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)} 
                />
                {specifications.length > 1 && (
                  <button type="button" onClick={() => handleRemoveSpec(index)} className="admin-btn-danger">X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddSpec} className="admin-btn-secondary mt-10">+ Add Spec</button>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="admin-btn-secondary ml-10">Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card mt-20">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>
                  {prod.images && prod.images.length > 0 && (
                    <img src={`http://localhost:5000${prod.images[0]}`} alt={prod.title} width="40" height="40" style={{ objectFit: 'cover' }} />
                  )}
                </td>
                <td>{prod.title}</td>
                <td>${prod.price}</td>
                <td>{prod.category?.name}</td>
                <td>
                  <button onClick={() => handleEdit(prod)} className="admin-action-btn edit-btn">Edit</button>
                  <button onClick={() => handleDelete(prod._id)} className="admin-action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;
