import React from 'react';
import Header from '../../components/Header';
import Amenities from '../../components/Amenities';
import Footer from '../../components/Footer';

const AmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Amenities />
      <Footer />
    </div>
  );
};

export default AmenitiesPage;
