import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';

import Hero from './components/Hero';
import MaskSection from './components/MaskSection';
import ProductShowcase from './components/ProductShowcase';
import ImmersiveTransition from './components/ImmersiveTransition';
import ShopGrid from './components/ShopGrid';
import Footer from './components/Footer';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleAuthAction = async () => {
    if (currentUser) {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error("Failed to log out", error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="fixed-header">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>MATCHA.</div>
      <button className="cart-btn" onClick={handleAuthAction}>
        {currentUser ? 'Log Out' : 'Login / Cart (0)'}
      </button>
    </header>
  );
}

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
            <Header />

            <Routes>
              <Route path="/" element={
                <main>
                  <Hero />
                  <MaskSection />
                  <ProductShowcase />
                  <ImmersiveTransition />
                  <ShopGrid />
                </main>
              } />
              <Route path="/login" element={<Login />} />
            </Routes>

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
            pointer-events: auto;
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
      </AuthProvider>
    </Router>
  );
}

export default App;
