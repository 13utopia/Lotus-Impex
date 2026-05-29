import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import Dashboard from './Dashboard';
import ProductsAdmin from './ProductsAdmin';
import CategoriesAdmin from './CategoriesAdmin';
import './Admin.css';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" />;
  return children;
};

const AdminLayout = () => {
  const { admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!admin) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">Lotus Admin</div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
          <Link to="/admin/products" className="admin-nav-link">Products</Link>
          <Link to="/admin/categories" className="admin-nav-link">Categories</Link>
        </nav>
        <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsAdmin />} />
          <Route path="/categories" element={<CategoriesAdmin />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
