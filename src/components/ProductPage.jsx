import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductPage.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProductPage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    // Initial hero reveal
    gsap.fromTo('.reveal-hero',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );

    // Parallax on hero image
    gsap.to('.parallax-bg', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-trigger',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Scroll-triggered reveals for all sections
    gsap.utils.toArray('.scroll-reveal').forEach(el => {
      gsap.from(el, {
        y: 35,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  }, { scope: containerRef });

  return (
    <div className={styles.page} ref={containerRef}>

      {/* ── Sticky Navbar ── */}
      <header className={styles.navbar}>
        <span className={styles.navBrand}>Ceremony</span>
        <nav className={styles.navLinks}>
          <a href="#" className={styles.navLink}>Our Whisk</a>
          <a href="#" className={styles.navLink}>The Ritual</a>
          <a href="#" className={styles.navLink}>Journal</a>
          <a href="#" className={styles.navLink}>Stockists</a>
        </nav>
      </header>

      {/* ── Hero: dark full-bleed image + pink serif title ── */}
      <section className={`${styles.hero} hero-trigger`}>
        <div className={styles.heroImageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=1400&auto=format&fit=crop"
            alt="Ceremonial Matcha"
            className={`parallax-bg ${styles.heroImage}`}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <p className={`reveal-hero ${styles.heroEyebrow}`}>The Botanical Curator</p>
          <h1 className={`reveal-hero ${styles.heroTitle}`}>
            Ceremonial<br />Matcha
          </h1>
          <p className={`reveal-hero ${styles.heroDesc}`}>
            A whisper of the mountain. Hand-picked from the rolling hills of Uji.
          </p>
          <div className={`reveal-hero ${styles.heroCta}`}>
            <span className={styles.heroPrice}>₹3,700.00</span>
            <button className={styles.primaryBtn}>Add to Ritual</button>
          </div>
        </div>
      </section>

      {/* ── Product Info + Specs ── */}
      <section className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          {/* Left: description */}
          <div className={`scroll-reveal ${styles.descCol}`}>
            <p className={styles.eyebrow}>Stone-Ground · Uji, Japan</p>
            <h2 className={styles.sectionTitle}>The Profile</h2>
            <p className={styles.bodyText}>
              Stone-ground slowly to preserve the delicate chlorophyll and L-theanine content. 
              Experience a profile of deep umami, sweet vegetal notes, and a finish as clean as 
              a morning mist. This is not just tea; it is a canvas for your morning ritual.
            </p>
            <p className={styles.shippingNote}>✦ Complimentary shipping on orders over ₹5,000</p>
          </div>

          {/* Right: spec card */}
          <div className={`scroll-reveal ${styles.specCard}`}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Cultivar</span>
              <span className={styles.specValue}>Okumidori &amp; Yabukita</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Terroir</span>
              <span className={styles.specValue}>Shaded Uji Slopes</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Weight</span>
              <span className={styles.specValue}>30g (approx. 25 servings)</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Harvest</span>
              <span className={styles.specValue}>Spring 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product image gallery ── */}
      <section className={styles.gallerySection}>
        <div className={`scroll-reveal ${styles.galleryGrid}`}>
          <div className={styles.galleryMain}>
            <img
              src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=900&auto=format&fit=crop"
              alt="Matcha tin"
              className={styles.galleryImg}
            />
          </div>
          <div className={styles.galleryStack}>
            <img
              src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop"
              alt="Matcha bowl"
              className={styles.galleryImg}
            />
            <img
              src="https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=600&auto=format&fit=crop"
              alt="Matcha ingredients"
              className={styles.galleryImg}
            />
          </div>
        </div>
      </section>

      {/* ── Ritual Steps ── */}
      <section className={styles.ritualSection}>
        <h2 className={`scroll-reveal ${styles.ritualTitle}`}>The Preparation</h2>
        <div className={styles.ritualGrid}>
          {[
            {
              heading: 'The Temperature',
              body: 'Never use boiling water. Aim for 80°C (176°F) to unlock the sweet umami without bitterness.'
            },
            {
              heading: 'The Whisk',
              body: "Use a bamboo chasen. Move in a brisk 'W' motion until a thick, creamy froth forms."
            },
            {
              heading: 'The Intention',
              body: 'Sip slowly. Allow the botanical energy to center your focus and ground your spirit.'
            },
          ].map(step => (
            <div key={step.heading} className={`scroll-reveal ${styles.ritualStep}`}>
              <h3 className={styles.ritualStepTitle}>{step.heading}</h3>
              <p className={styles.ritualStepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span className={styles.footerBrand}>© 2024 The Ceremonial Canvas. Crafted with Intention.</span>
        <nav className={styles.footerNav}>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Terms</a>
          <a href="#" className={styles.footerLink}>Shipping</a>
          <a href="#" className={styles.footerLink}>Wholesale</a>
        </nav>
      </footer>
    </div>
  );
};

export default ProductPage;
