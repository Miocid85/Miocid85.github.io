import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import { About } from './pages/About';
import Contact from './pages/Contact';
import Delivery from './pages/Delivery';
import Consultation from './pages/Consultation';

export function App() {
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<main className="flex-grow">
                <Hero />
                <ProductSection />
              </main>} />
          <Route path="/about" element={<About />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>;
}