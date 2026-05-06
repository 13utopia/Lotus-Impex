import React from 'react';
import './Industries.css';

const industries = [
  { id: 1, title: 'Oil & Gas', desc: 'High-pressure containment and flow control solutions.', img: '/images/Container.png' },
  { id: 2, title: 'Chemicals', desc: 'Corrosion-resistant materials for aggressive environments.', img: '/images/Container-1.png' },
  { id: 3, title: 'Power Generation', desc: 'Critical components for thermal and nuclear power plants.', img: '/images/Container-2.png' },
  { id: 4, title: 'Water Treatment', desc: 'Reliable systems for municipal and industrial water management.', img: '/images/Container-3.png' }
];

const Industries = () => {
  return (
    <section className="industries" id="industries">
      <div className="container">
        <h2 className="section-title light">Precision-Engineered For <br/><span>Every Industry</span></h2>
        
        <div className="industries-grid">
          {industries.map((ind) => (
            <div className="industry-card" key={ind.id}>
              <div className="industry-bg" style={{ backgroundImage: `url(${ind.img})` }}></div>
              <div className="industry-overlay"></div>
              <div className="industry-content">
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
                <a href="#" className="industry-link">Explore Solutions &rarr;</a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="industries-action">
          <button className="btn">View All Industries</button>
        </div>
      </div>
    </section>
  );
};

export default Industries;
