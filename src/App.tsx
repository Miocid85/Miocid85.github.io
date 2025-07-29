import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ShoppingCart } from './components/ShoppingCart';
import { About } from './pages/About';
import Contact from './pages/Contact';
import Delivery from './pages/Delivery';
import Consultation from './pages/Consultation';
import { Design } from './pages/Design';
import { Search } from './pages/Search';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { useCart } from './hooks/useCart';

export function App() {
  const { isCartOpen, toggleCart } = useCart();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={
            <main className="flex-grow">
              <Hero />
              <ProductSection />
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/design" element={<Design />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
        <ShoppingCart isOpen={isCartOpen} onClose={toggleCart} />
      </div>
    </BrowserRouter>
  );
}