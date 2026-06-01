import React from 'react';
import './Industries.css';

const industries = [
  {
    id: 1,
    title: 'Industrial Pipes',
    tag: 'SEAMLESS & WELDED',
    desc: 'SS 304/316, Carbon Steel, Alloy Steel pipes in all schedules and sizes. Precision-engineered for high-pressure applications.',
    img: '/images/Container-3.webp',
    chips: ['SS 304/316', 'Carbon Steel', 'Alloy Steel']
  },
  {
    id: 2,
    title: 'Industrial Valves',
    tag: 'BALL, GATE & GLOBE',
    desc: 'Premium ball valves, gate valves, globe valves, and check valves. Tested for zero leakage and long service life.',
    img: '/images/Container-2.webp',
    chips: ['Ball Valves', 'Gate Valves', 'Globe Valves']
  },
  {
    id: 3,
    title: 'Pipe Fittings',
    tag: 'ELBOWS, TEES & REDUCERS',
    desc: 'Buttweld, socket weld, and threaded fittings. Manufactured to ASME B16.9 standards with full traceability.',
    img: '/images/Container-1.webp',
    chips: ['Buttweld', 'Socket Weld', 'Threaded']
  },
  {
    id: 4,
    title: 'Seamless Tubes',
    tag: 'HYDRAULIC & INSTRUMENTATION',
    desc: 'High-precision seamless tubes for hydraulic, instrumentation, and heat exchanger applications.',
    img: '/images/Container.webp',
    chips: ['Hydraulic', 'Instrumentation', 'Heat Exchanger']
  }
];

const Industries = () => {
  return (
    <section className="industries" id="industries">
      <div className="container">
        <div className="industries-header">
          <div className="industries-subtitle"><span>ENGINEERING EXCELLENCE</span></div>
          <h2 className="industries-title">
            Precision-Engineered For <br/>
            <span>Every Industry</span>
          </h2>
        </div>

        <div className="industries-grid">
          {industries.map((ind) => (
            <div className="industry-card" key={ind.id}>
              <div className="industry-bg" style={{ backgroundImage: `url("${ind.img}")` }}></div>
              <div className="industry-overlay"></div>

              {/* Top-left tag */}
              <div className="industry-card-tag">{ind.tag}</div>

              {/* Card Footer Content */}
              <div className="industry-card-footer">
                <div className="industry-card-info">
                  <h3 className="industry-card-title">{ind.title}</h3>
                  <p className="industry-card-desc">{ind.desc}</p>
                  <div className="industry-chips">
                    {ind.chips.map((chip, i) => (
                      <span className="industry-chip" key={i}>{chip}</span>
                    ))}
                  </div>
                </div>
                <a href="#" className="industry-arrow-btn" aria-label={`View details for ${ind.title}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="industries-action">
          <button className="btn industries-view-all-btn">Request Full Catalogue &rarr;</button>
        </div>
      </div>
    </section>
  );
};

export default Industries;
