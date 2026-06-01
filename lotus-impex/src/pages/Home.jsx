import React from 'react';
import Hero from '../components/Hero/Hero';
import ProductCategories from '../components/ProductCategories/ProductCategories';
import Statistics from '../components/Statistics/Statistics';
import Industries from '../components/Industries/Industries';
import ProjectSection from '../components/ProjectSection/ProjectSection';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Testimonials from '../components/Testimonials/Testimonials';
import BlogSection from '../components/BlogSection/BlogSection';
import Workflow from '../components/Workflow/Workflow';
import Banner from '../components/Banner/Banner';
import Enterprise from '../components/Enterprise/Enterprise';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <ProductCategories />
      <Statistics />
      <Industries />
      <ProjectSection />
      <FeaturedProducts />
      <Testimonials />
      <BlogSection />
      <Banner />
      <Workflow />
      <Enterprise />
    </div>
  );
};

export default Home;
