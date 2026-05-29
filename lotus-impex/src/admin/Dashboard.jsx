import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Admin.css';

const Dashboard = () => {
  const { admin } = useContext(AuthContext);

  return (
    <div className="admin-page">
      <h2>Welcome back, {admin?.username}!</h2>
      <div className="admin-dashboard-stats">
        <div className="admin-stat-card">
          <h4>Manage Products</h4>
          <p>Add, edit, or remove products and update their specifications.</p>
        </div>
        <div className="admin-stat-card">
          <h4>Manage Categories</h4>
          <p>Organize your products into categories.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
