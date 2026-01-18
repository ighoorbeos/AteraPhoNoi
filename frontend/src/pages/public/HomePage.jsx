import React from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Overview from '../../components/Overview';
import Location from '../../components/Location';
import Design from '../../components/Design';
import FloorPlans from '../../components/FloorPlans';
import Amenities from '../../components/Amenities';
import Gallery from '../../components/Gallery';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Overview />
      <Location />
      <Design />
      <FloorPlans />
      <Amenities />
      <Gallery />
      <Contact />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default HomePage;
