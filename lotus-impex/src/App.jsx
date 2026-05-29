import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AdminLayout from './admin/AdminLayout';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        
        {/* Frontend Routes */}
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<div>Products List (To be implemented)</div>} />
              <Route path="/product/:id" element={<div>Product Detail (To be implemented)</div>} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
