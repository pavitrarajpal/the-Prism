import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';

import Hero from './components/Hero';
import MaskSection from './components/MaskSection';
import ProductShowcase from './components/ProductShowcase';
import ImmersiveTransition from './components/ImmersiveTransition';
import ShopGrid from './components/ShopGrid';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = useLenis(({ scroll }) => {
    // ScrollTrigger.update is automatically handled by the lenis hook when integrated,
    // but we can manually trigger it here if necessary.
  });

  useEffect(() => {
    // Optional: connect Lenis to ScrollTrigger manually if not using react-lenis integration
    // But react-lenis usually works well out of the box.
  }, []);

  return (
    <ReactLenis root>
      <div className="app-container">
        {/* Sticky Header with Navigation / Logo */}
        <header className="fixed-header">
          <div className="logo">MATCHA.</div>
          <button className="cart-btn">Cart (0)</button>
        </header>

        <main>
          <Hero />
          <MaskSection />
          <ProductShowcase />
          <ImmersiveTransition />
          <ShopGrid />
        </main>

        <Footer />
      </div>

      <style jsx="true">{`
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          mix-blend-mode: difference;
          color: white;
          pointer-events: none;
        }

        .logo {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .cart-btn {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          pointer-events: auto;
          mix-blend-mode: normal;
        }

        @media (max-width: 768px) {
          .fixed-header {
            padding: 1.5rem 2rem;
          }
        }
      `}</style>
    </ReactLenis>
  );
}

export default App;
