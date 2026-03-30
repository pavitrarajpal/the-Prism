import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';

import Hero from './components/Hero';
import MaskSection from './components/MaskSection';
import ScrollSequence from './components/ScrollSequence';
import ProductShowcase from './components/ProductShowcase';
import ImmersiveTransition from './components/ImmersiveTransition';
import ShopGrid from './components/ShopGrid';
import Footer from './components/Footer';
import Login from './components/Login';
import ProductPage from './components/ProductPage';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Cart from './components/Cart';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

gsap.registerPlugin(ScrollTrigger);



function App() {
  const lenis = useLenis(({ scroll }) => {
    // ScrollTrigger.update is automatically handled by the lenis hook when integrated,
    // but we can manually trigger it here if necessary.
  });

  useEffect(() => {
    // Optional: connect Lenis to ScrollTrigger manually if not using react-lenis integration
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ReactLenis root>
          <div className="app-container">
            <Navbar />

            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <MaskSection />
                  <ScrollSequence />
                  <ProductShowcase />
                  <ImmersiveTransition />
                  <ShopGrid />
                </main>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/product/ceremonial-matcha" element={<ProductPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>

            <Footer />
          </div>


        </ReactLenis>
      </AuthProvider>
    </Router>
  );
}

export default App;
