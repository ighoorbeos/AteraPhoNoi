import React from 'react';
import Header from '../../components/Header';
import Gallery from '../../components/Gallery';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Gallery />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default GalleryPage;
