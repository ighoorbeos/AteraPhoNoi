import React from 'react';
import Header from '../../components/Header';
import Design from '../../components/Design';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const DesignPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Design />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default DesignPage;
