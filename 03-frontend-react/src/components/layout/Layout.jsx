/**
 * Layout principal: Navbar, contenido (children), Footer y Toaster global.
 * @module components/layout/Layout
 */

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página
 * @returns {JSX.Element}
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-right" />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;