import React from 'react';
import Hero from '../components/Hero/Hero';
import ProductCategories from '../components/ProductCategories/ProductCategories';
import Statistics from '../components/Statistics/Statistics';
import Industries from '../components/Industries/Industries';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import Testimonials from '../components/Testimonials/Testimonials';
import Workflow from '../components/Workflow/Workflow';
import Banner from '../components/Banner/Banner';
import Roadmap from '../components/Roadmap/Roadmap';
import Enterprise from '../components/Enterprise/Enterprise';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <ProductCategories />
      <Statistics />
      <Industries />
      <FeaturedProducts />
      <Testimonials />
      <Workflow />
      <Banner />
      <Roadmap />
      <Enterprise />
    </div>
  );
};

export default Home;
