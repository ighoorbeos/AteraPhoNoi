import React from 'react';
import Header from '../../components/Header';
import Amenities from '../../components/Amenities';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const AmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Amenities />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default AmenitiesPage;
