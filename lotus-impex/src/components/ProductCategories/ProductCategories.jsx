import React, { useState } from 'react';
import './ProductCategories.css';

const categories = [
  { 
    id: 1, 
    title: 'Sanitary Butterfly Valve', 
    desc: 'manufacturer, supplier and exporter for Sanitary Stainless Steel Butte...', 
    img: '/images/Link.png' 
  },
  { 
    id: 2, 
    title: 'Sanitary Ball Valve', 
    desc: 'Group Equipment Products Sanitary Ball Valves classified by valve body', 
    img: '/images/Link-1.png' 
  },
  { 
    id: 3, 
    title: 'Sanitary Check Valve', 
    desc: 'Stainless Steel Sanitary Check valves are typically installed to prevent the rev...', 
    img: '/images/Link-2.png' 
  },
  { 
    id: 4, 
    title: 'Sanitary Fittings', 
    desc: 'manufacturer and supplier of sanitary pipe fittings, sanitary', 
    img: '/images/Link-3.png' 
  },
  { 
    id: 5, 
    title: 'Sanitary Clamped Fittings', 
    desc: 'Qili Group Equipment Products Sanitary Clamp Fittings were origin...', 
    img: '/images/Link-2.png' 
  },
  { 
    id: 6, 
    title: 'BioPharm (BPE) Fittings', 
    desc: 'Certified fittings manufaturer by ASME BPE Org. China QILI ASME BPE-189 certific...', 
    img: '/images/Link-1.png' 
  },
  { 
    id: 7, 
    title: 'Sanitary Clamp', 
    desc: 'Sanitary Clamp Fittings are available with a variety of I.D. and O.D.&...', 
    img: '/images/Link-3.png' 
  },
  { 
    id: 8, 
    title: 'Sanitary Hose Fittings', 
    desc: 'Qili Holding Group is a professional Sanitary Hose Fittings, hygienic pipe fitti...', 
    img: '/images/Link.png' 
  },
];

const ProductCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="product-categories" id="products">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Product Categories</h2>
          <div className="title-underline"></div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Products Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        {filteredCategories.length > 0 ? (
          <div className="categories-grid">
            {filteredCategories.map((cat, index) => (
              <div className="category-card" key={cat.id}>
                <div 
                  className="category-img-wrapper"
                  style={{ 
                    backgroundImage: `url(/images/product-bg${(index % 2) + 1}.webp)` 
                  }}
                >
                  <img src={cat.img} alt={cat.title} className="product-img" />
                </div>
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <button className="btn btn-outline category-btn">READ MORE</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No products found matching "{searchQuery}"</p>
          </div>
        )}
        
        <div className="categories-actions">
           <button className="btn view-all-btn">View All</button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
