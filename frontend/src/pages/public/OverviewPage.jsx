import React from 'react';
import Header from '../../components/Header';
import Overview from '../../components/Overview';
import Footer from '../../components/Footer';

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Overview />
      <Footer />
    </div>
  );
};

export default OverviewPage;
