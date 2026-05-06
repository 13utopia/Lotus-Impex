import React from 'react';
import './Statistics.css';

const stats = [
  { id: 1, number: '70+', label: 'Countries' },
  { id: 2, label: 'Orders Delivered', number: '10K+' }, // wait, the order might be different. I will stick to number then label
  { id: 3, number: '250+', label: 'Clients' },
  { id: 4, number: '50+', label: 'Employees' },
];

const Statistics = () => {
  return (
    <section className="statistics">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>70+</h3>
            <p>Countries</p>
          </div>
          <div className="stat-card stat-light">
            <h3>10K+</h3>
            <p>Orders Delivered</p>
          </div>
          <div className="stat-card">
            <h3>250+</h3>
            <p>Clients</p>
          </div>
          <div className="stat-card stat-light">
            <h3>50+</h3>
            <p>Employees</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
