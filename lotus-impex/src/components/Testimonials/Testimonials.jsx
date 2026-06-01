import React from 'react';
import './Testimonials.css';

const testimonials = [
  { 
    id: 1, 
    text: "Lotus Impex has been a dependable partner for our sanitary fittings requirements. The product quality is consistent, and deliveries are always on time. Highly recommended for industrial use.", 
    author: "Procurement Manager", 
    role: "Food Processing Company" 
  },
  { 
    id: 2, 
    text: "We were impressed with the finish and precision of their valves and fittings. The products perfectly meet our hygiene and compliance requirements.", 
    author: "Operations Head", 
    role: "Pharmaceutical Unit" 
  },
  { 
    id: 3, 
    text: "Their team understands technical requirements well and provides the right solutions. Customization and support from Lotus Impex have been exceptional.", 
    author: "Project Engineer", 
    role: "Dairy Industry" 
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header-container">
        <div className="testimonials-subtitle">
          <span className="subtitle-line"></span>
          <span className="subtitle-text">MATERIAL EXCELLENCE</span>
          <span className="subtitle-line"></span>
        </div>
        <h2 className="testimonials-title">TESTIMONIALS</h2>
      </div>

      <div className="testimonials-blue-banner">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((test) => (
              <div className="testimonial-card" key={test.id}>
                <div className="testimonial-quote">&ldquo;&ldquo;</div>
                <p className="testimonial-text">"{test.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4 className="author-name">{test.author}</h4>
                    <p className="author-company">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
