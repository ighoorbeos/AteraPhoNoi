import React from 'react';
import Header from '../../components/Header';
import Overview from '../../components/Overview';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Overview />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default OverviewPage;
