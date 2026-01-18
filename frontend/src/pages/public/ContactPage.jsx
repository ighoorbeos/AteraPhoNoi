import React from 'react';
import Header from '../../components/Header';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import FloatingContact from '../../components/FloatingContact';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Contact />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ContactPage;
