import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

export const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="main-scroll-area animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
