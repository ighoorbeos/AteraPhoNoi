import React from 'react';
import Header from '../../components/Header';
import FloorPlans from '../../components/FloorPlans';
import Footer from '../../components/Footer';

const FloorPlansPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FloorPlans />
      <Footer />
    </div>
  );
};

export default FloorPlansPage;
