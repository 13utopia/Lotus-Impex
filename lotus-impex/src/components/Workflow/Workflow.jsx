import React from 'react';
import './Workflow.css';

const steps = [
  { id: 1, title: 'Material Sourcing', desc: 'Sourcing premium grade steel and alloys' },
  { id: 2, title: 'Forging & Casting', desc: 'Precision forming under controlled temperatures' },
  { id: 3, title: 'Heat Treatment', desc: 'Enhancing mechanical properties' },
  { id: 4, title: 'CNC Machining', desc: 'Exact dimensional accuracy' },
  { id: 5, title: 'Surface Finishing', desc: 'Anti-corrosion coatings and polishing' },
  { id: 6, title: 'Quality Inspection', desc: 'Rigorous NDT and dimensional checks' },
  { id: 7, title: 'Assembly & Testing', desc: 'Hydrostatic and pneumatic testing' },
  { id: 8, title: 'Packaging & Dispatch', desc: 'Secure transit preparation' }
];

const Workflow = () => {
  return (
    <section className="workflow" id="workflow">
      <div className="container">
        <h2 className="section-title">Manufacturing <span>Workflow</span></h2>
        
        <div className="workflow-grid">
          {steps.map((step) => (
            <div className="workflow-step" key={step.id}>
              <div className="step-number">0{step.id}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
