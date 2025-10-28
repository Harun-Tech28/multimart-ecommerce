import React from 'react';
import Header from './common/Header';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const Layout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
