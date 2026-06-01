import React from 'react';
import './Workflow.css';

const steps = [
  {
    id: 1,
    title: 'Source',
    desc: 'Premium raw materials sourced from certified mills with full traceability and mill test certificates.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Test',
    desc: 'Rigorous chemical composition analysis, mechanical testing, and dimensional verification at every stage.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6M10 9h4M10 3v6l-4 8a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-8V3" />
        <path d="M8 14h8" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Quality Check',
    desc: 'Multi-point inspection including hydrostatic testing, ultrasonic testing, and visual examination.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Deliver',
    desc: 'Secure packaging with proper documentation, on-time delivery, and complete after-sales support.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7v14Z" />
        <path d="M14 8h4l3 3v5a2 2 0 0 1-2 2h-5" />
        <path d="M5 18h14" />
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    )
  }
];

const Workflow = () => {
  return (
    <section className="process-section" id="workflow">
      <div className="process-overlay"></div>
      
      {/* Huge watermarked background text */}
      <div className="process-watermark">LOTUS IMPEX</div>
      
      <div className="container process-content-container">
        
        {/* Header Block */}
        <div className="process-header">
          <div className="process-subtitle">
            <span className="subtitle-line"></span>
            <span className="subtitle-text">OUR PROCESS</span>
            <span className="subtitle-line"></span>
          </div>
          <h2 className="process-title">
            FROM SOURCE TO <span className="blue-text">SITE</span>
          </h2>
        </div>
        
        {/* Process Timeline Grid */}
        <div className="process-grid-wrapper">
          {/* Horizontal connecting line */}
          <div className="process-timeline-line"></div>
          
          <div className="process-grid">
            {steps.map((step) => (
              <div className="process-step-card" key={step.id}>
                
                {/* Step Icon Wrapper */}
                <div className="step-icon-container">
                  <div className="step-icon-box">
                    {step.icon}
                  </div>
                  {/* Step Number Circle */}
                  <div className="step-number-circle">
                    {step.id}
                  </div>
                </div>
                
                {/* Step Text Details */}
                <h4 className="step-card-title">{step.title}</h4>
                <p className="step-card-desc">{step.desc}</p>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Workflow;
