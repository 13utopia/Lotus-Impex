import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('lotus_admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      // Set default auth header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(storedAdmin).token}`;
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
      setAdmin(res.data);
      localStorage.setItem('lotus_admin', JSON.stringify(res.data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('lotus_admin');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
