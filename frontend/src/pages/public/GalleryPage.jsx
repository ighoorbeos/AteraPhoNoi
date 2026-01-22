import React from 'react';
import Header from '../../components/Header';
import Gallery from '../../components/Gallery';
import Footer from '../../components/Footer';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;
