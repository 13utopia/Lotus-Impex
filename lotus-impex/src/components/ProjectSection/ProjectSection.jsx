import React from 'react';
import './ProjectSection.css';

const projects = [
  { id: 1, title: 'Project One', img: '/images/project1.webp' },
  { id: 2, title: 'Project Two', img: '/images/project2.webp' },
  { id: 3, title: 'Project Three', img: '/images/project3.webp' },
  { id: 4, title: 'Project Four', img: '/images/project4.webp' },
];

const ProjectSection = () => {
  return (
    <section className="project-section">
      <div className="container">
        <div className="section-title-wrap project-title-wrap">
          <h2 className="section-title-custom">Project</h2>
          <div className="title-underline-custom"></div>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-image-wrap">
                <img src={project.img} alt={project.title} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
