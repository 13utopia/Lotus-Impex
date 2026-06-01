import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';
import './Admin.css';

const DRAFT_STORAGE_KEY = 'lotus-impex-admin-product-draft';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [draftReady, setDraftReady] = useState(false);
  const skipNextDraftSave = useRef(false);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('In Stock');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [standard, setStandard] = useState('');
  const [workingTemperature, setWorkingTemperature] = useState('');
  const [connectionWays, setConnectionWays] = useState('');
  const [size, setSize] = useState('');
  const [salesModels, setSalesModels] = useState('');
  const [valveSeal, setValveSeal] = useState('');
  const [surfaceTreatment, setSurfaceTreatment] = useState('');
  const [pressureValue, setPressureValue] = useState('');
  const [moq, setMoq] = useState('');
  const [sealMaterial, setSealMaterial] = useState('');
  const [transportPackage, setTransportPackage] = useState('');
  const [features, setFeatures] = useState('');
  const [application, setApplication] = useState('');
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  const [images, setImages] = useState([]); // For display of existing images
  const [imageFiles, setImageFiles] = useState(null); // For new uploads
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);

        setIsEditing(Boolean(draft.isEditing));
        setCurrentId(draft.currentId ?? null);
        setTitle(draft.title || '');
        setPrice(draft.price || '');
        setCategory(draft.category || '');
        setStockStatus(draft.stockStatus || 'In Stock');
        setDescription(draft.description || '');
        setMaterial(draft.material || '');
        setStandard(draft.standard || '');
        setWorkingTemperature(draft.workingTemperature || '');
        setConnectionWays(draft.connectionWays || '');
        setSize(draft.size || '');
        setSalesModels(draft.salesModels || '');
        setValveSeal(draft.valveSeal || '');
        setSurfaceTreatment(draft.surfaceTreatment || '');
        setPressureValue(draft.pressureValue || '');
        setMoq(draft.moq || '');
        setSealMaterial(draft.sealMaterial || '');
        setTransportPackage(draft.transportPackage || '');
        setFeatures(draft.features || '');
        setApplication(draft.application || '');
        setSpecifications(Array.isArray(draft.specifications) && draft.specifications.length ? draft.specifications : [{ key: '', value: '' }]);
        setImages(Array.isArray(draft.images) ? draft.images : []);
        setIsFeatured(Boolean(draft.isFeatured));
        setIsNewArrival(Boolean(draft.isNewArrival));
        setIsBestSeller(Boolean(draft.isBestSeller));
      }
    } catch (err) {
      console.error('Failed to restore product draft', err);
    } finally {
      setDraftReady(true);
    }
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    if (skipNextDraftSave.current) {
      skipNextDraftSave.current = false;
      return;
    }

    try {
      const draft = {
        isEditing,
        currentId,
        title,
        price,
        category,
        stockStatus,
        description,
        material,
        standard,
        workingTemperature,
        connectionWays,
        size,
        salesModels,
        valveSeal,
        surfaceTreatment,
        pressureValue,
        moq,
        sealMaterial,
        transportPackage,
        features,
        application,
        specifications,
        images,
        isFeatured,
        isNewArrival,
        isBestSeller,
      };

      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (err) {
      console.error('Failed to save product draft', err);
    }
  }, [
    draftReady,
    isEditing,
    currentId,
    title,
    price,
    category,
    stockStatus,
    description,
    material,
    standard,
    workingTemperature,
    connectionWays,
    size,
    salesModels,
    valveSeal,
    surfaceTreatment,
    pressureValue,
    moq,
    sealMaterial,
    transportPackage,
    features,
    application,
    specifications,
    images,
    isFeatured,
    isNewArrival,
    isBestSeller,
  ]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories`);
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
    skipNextDraftSave.current = true;
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setPrice('');
    setCategory('');
    setStockStatus('In Stock');
    setDescription('');
    setMaterial('');
    setStandard('');
    setWorkingTemperature('');
    setConnectionWays('');
    setSize('');
    setSalesModels('');
    setValveSeal('');
    setSurfaceTreatment('');
    setPressureValue('');
    setMoq('');
    setSealMaterial('');
    setTransportPackage('');
    setFeatures('');
    setApplication('');
    setSpecifications([{ key: '', value: '' }]);
    setImages([]);
    setImageFiles(null);
    setIsFeatured(false);
    setIsNewArrival(false);
    setIsBestSeller(false);
    setError('');
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let uploadedImageUrls = [...images];
      if (uploadedImageUrls.length === 0 && (!imageFiles || imageFiles.length === 0)) {
        throw new Error('Please add at least one product image');
      }
      
      // Handle Image Upload if there are new files
      if (imageFiles && imageFiles.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < imageFiles.length; i++) {
          formData.append('images', imageFiles[i]);
        }
        const uploadRes = await axios.post(`${API_BASE_URL}/api/products/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        uploadedImageUrls = [...uploadedImageUrls, ...uploadRes.data.imagePaths];
      }

      const productData = {
        title,
        price: Number(price),
        categoryId: category,
        stock_status: stockStatus,
        description,
        material,
        standard,
        working_temperature: workingTemperature,
        connection_ways: connectionWays,
        size,
        sales_models: salesModels,
        valve_seal: valveSeal,
        surface_treatment: surfaceTreatment,
        pressure_value: pressureValue,
        moq,
        seal_material: sealMaterial,
        transport_package: transportPackage,
        features,
        application,
        specifications: specifications.filter(s => s.key && s.value),
        images: uploadedImageUrls,
        is_featured: isFeatured,
        is_new_arrival: isNewArrival,
        is_best_seller: isBestSeller
      };

      if (isEditing) {
        await axios.put(`${API_BASE_URL}/api/products/${currentId}`, productData);
      } else {
        await axios.post(`${API_BASE_URL}/api/products`, productData);
      }
      
      resetForm();
      fetchProducts();
      skipNextDraftSave.current = true;
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setCategory(product.category?.id || '');
    setStockStatus(product.stock_status);
    setDescription(product.description || '');
    setMaterial(product.material || '');
    setStandard(product.standard || '');
    setWorkingTemperature(product.working_temperature || '');
    setConnectionWays(product.connection_ways || '');
    setSize(product.size || '');
    setSalesModels(product.sales_models || '');
    setValveSeal(product.valve_seal || '');
    setSurfaceTreatment(product.surface_treatment || '');
    setPressureValue(product.pressure_value || '');
    setMoq(product.moq || '');
    setSealMaterial(product.seal_material || '');
    setTransportPackage(product.transport_package || '');
    setFeatures(product.features || '');
    setApplication(product.application || '');
    setSpecifications(product.specifications?.length ? product.specifications : [{ key: '', value: '' }]);
    setImages(product.images || []);
    setImageFiles(null);
    setIsFeatured(product.is_featured || false);
    setIsNewArrival(product.is_new_arrival || false);
    setIsBestSeller(product.is_best_seller || false);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/products/${id}`);
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
                  <option key={c.id} value={c.id}>{c.name}</option>
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
            <label>Images <span style={{ color: '#c2410c' }}>*</span></label>
            <p style={{ margin: '6px 0 10px', fontSize: '0.9rem', color: '#6b7280' }}>
              Add at least one product image. Products without images cannot be saved.
            </p>
            <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(e.target.files)} />
            {images.length > 0 && (
              <div className="admin-image-preview">
                {images.map((img, idx) => (
                  <img key={idx} src={`${API_BASE_URL}${img}`} alt="Preview" width="50" />
                ))}
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label>Description</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Material</label>
              <input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Standard</label>
              <input type="text" value={standard} onChange={(e) => setStandard(e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Working Temperature</label>
              <input type="text" value={workingTemperature} onChange={(e) => setWorkingTemperature(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Connection Ways</label>
              <input type="text" value={connectionWays} onChange={(e) => setConnectionWays(e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Size</label>
              <input type="text" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Sales Models</label>
              <input type="text" value={salesModels} onChange={(e) => setSalesModels(e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Valve Seal</label>
              <input type="text" value={valveSeal} onChange={(e) => setValveSeal(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Surface Treatment</label>
              <input type="text" value={surfaceTreatment} onChange={(e) => setSurfaceTreatment(e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Pressure Value</label>
              <input type="text" value={pressureValue} onChange={(e) => setPressureValue(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>MOQ</label>
              <input type="text" value={moq} onChange={(e) => setMoq(e.target.value)} />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Seal Material</label>
              <input type="text" value={sealMaterial} onChange={(e) => setSealMaterial(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label>Transport Package</label>
              <input type="text" value={transportPackage} onChange={(e) => setTransportPackage(e.target.value)} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Features</label>
            <textarea rows="5" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="One feature per line or as paragraphs" />
          </div>

          <div className="admin-form-group">
            <label>Application</label>
            <textarea rows="6" value={application} onChange={(e) => setApplication(e.target.value)} placeholder="Write application text here" />
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

          <div className="admin-form-group">
            <label>Product Badges / Flags</label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} style={{ width: 'auto' }} />
                Featured Product (Shows on Home Page)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} style={{ width: 'auto' }} />
                New Arrival
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} style={{ width: 'auto' }} />
                Best Seller
              </label>
            </div>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="admin-btn-secondary ml-10">Cancel</button>
            )}
          </div>
          {error && <div className="admin-error">{error}</div>}
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
              <tr key={prod.id}>
                <td>
                  {prod.images && prod.images.length > 0 && (
                    <img src={`${API_BASE_URL}${prod.images[0]}`} alt={prod.title} width="40" height="40" style={{ objectFit: 'cover' }} />
                  )}
                </td>
                <td>{prod.title}</td>
                <td>${prod.price}</td>
                <td>{prod.category?.name}</td>
                <td>
                  <button onClick={() => handleEdit(prod)} className="admin-action-btn edit-btn">Edit</button>
                  <button onClick={() => handleDelete(prod.id)} className="admin-action-btn delete-btn">Delete</button>
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
