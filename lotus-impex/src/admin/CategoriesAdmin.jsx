import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Admin.css';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/categories/${editingId}`, { name });
      } else {
        await axios.post('http://localhost:5000/api/categories', { name });
      }
      setName('');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving category');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-page">
      <h2>Manage Categories</h2>
      
      <div className="admin-card">
        <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-inline-form">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="admin-input"
          />
          <button type="submit" className="admin-btn-primary">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="admin-btn-secondary"
              onClick={() => { setEditingId(null); setName(''); }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-card mt-20">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.name}</td>
                <td>
                  <button onClick={() => handleEdit(cat)} className="admin-action-btn edit-btn">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="admin-action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
