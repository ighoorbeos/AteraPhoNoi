import React from 'react';
import Header from '../../components/Header';
import Location from '../../components/Location';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const LocationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Location />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default LocationPage;
