import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Not placed separately
export default function HeaderFooter({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
