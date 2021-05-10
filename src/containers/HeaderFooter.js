import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ORIGINALLY CREATED HERE INSTEAD OF OUTSIDE THE ROUTER SINCE THE HEADER RENDERS AN ADDITIONAL LINK FOR ADMINS AND THE ADMIN STATUS IS NOT DEFINED UNTIL LOWER IN THE COMPONENT TREE
export default function HeaderFooter({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
