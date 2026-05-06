import React from 'react';
import './Testimonials.css';

const testimonials = [
  { id: 1, text: "Lotus Impex has consistently delivered high-quality flanges for our pipeline projects. Their precision and reliability are unmatched in the industry.", author: "John Smith", role: "Procurement Manager, EnergyCorp" },
  { id: 2, text: "The fasteners we sourced from Lotus Impex withstood the most rigorous stress tests. A truly dependable partner for critical components.", author: "Sarah Jenkins", role: "Lead Engineer, BuildRight Construction" },
  { id: 3, text: "Their customer service and technical expertise helped us choose the right valves for our complex flow system. Highly recommended.", author: "Michael Chang", role: "Operations Director, FlowTech Solutions" }
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Client <span>Testimonials</span></h2>
        
        <div className="testimonials-grid">
          {testimonials.map((test) => (
            <div className="testimonial-card" key={test.id}>
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{test.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar"></div>
                <div className="author-info">
                  <h4>{test.author}</h4>
                  <p>{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
