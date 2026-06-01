import React from 'react';
import './BlogSection.css';

const blogs = [
  {
    id: 1,
    img: '/images/blog1.webp',
    title: 'How to Choose the Right Sanitary Valves for Your Industry',
  },
  {
    id: 2,
    img: '/images/blog2.webp',
    title: 'Complete Guide to Sanitary Pipe Fittings for Food & Pharma Industries',
  },
  {
    id: 3,
    img: '/images/blog3.webp',
    title: 'Top 5 Mistakes to Avoid When Buying Stainless Steel Fittings',
  },
  {
    id: 4,
    img: '/images/blog4.webp',
    title: "Sanitary vs Industrial Valves: What's the Real Difference?",
  },
  {
    id: 5,
    img: '/images/blog5.webp',
    title: 'Why Stainless Steel is the Best Choice for Hygienic Piping Systems',
  },
  {
    id: 6,
    img: '/images/blog6.webp',
    title: 'How to Select the Right Pipe Size for Your Processing Plant',
  },
  {
    id: 7,
    img: '/images/blog7.webp',
    title: 'Everything You Need to Know About Hygienic Flow Systems',
  },
  {
    id: 8,
    img: '/images/blog8.webp',
    title: 'Key Factors to Consider Before Purchasing Sanitary Valves',
  },
];

const BlogSection = () => {
  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-title-wrap">
          <h2 className="blog-title">Articles and Blogs</h2>
          <div className="blog-title-underline" />
        </div>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog.id}>
              <div className="blog-image-wrap">
                <img src={blog.img} alt={blog.title} />
              </div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
