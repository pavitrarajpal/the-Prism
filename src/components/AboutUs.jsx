import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './AboutUs.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutUs = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Hero entrance
    gsap.fromTo('.reveal-hero',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );

    // All scroll-triggered elements
    gsap.utils.toArray('.scroll-reveal').forEach(el => {
      gsap.from(el, {
        y: 35,
        opacity: 0,
        duration: 1.1,
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

      {/* ── Hero: asymmetric split ── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={`reveal-hero ${styles.eyebrow}`}>Born in Uji · Founded on Intention</p>
          <h1 className={`reveal-hero ${styles.heroTitle}`}>
            The Quiet Art<br />of Stillness.
          </h1>
          <p className={`reveal-hero ${styles.heroSubtitle}`}>
            Born in the misty hills of Uji, Ceremony is a return to the intentional pause. 
            We believe the preparation of matcha is not a task, but a sanctuary.
          </p>
        </div>
        <div className={`reveal-hero ${styles.heroImageWrapper}`}>
          <img
            src="https://images.unsplash.com/photo-1599577963383-f61b17a151b7?q=80&w=900&auto=format&fit=crop"
            alt="Matcha tea fields Uji Japan"
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* ── Heritage Section ── */}
      <section className={styles.heritageSection}>
        <div className={styles.heritageGrid}>
          <div className={`scroll-reveal ${styles.heritageImageWrapper}`}>
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=900&auto=format&fit=crop"
              alt="Stone grinding matcha"
              className={styles.heritageImage}
            />
          </div>
          <div className={styles.heritageText}>
            <p className={`scroll-reveal ${styles.eyebrow}`}>Since the 12th Century</p>
            <h2 className={`scroll-reveal ${styles.sectionTitle}`}>
              Eight Centuries of Stone-Ground Heritage.
            </h2>
            <p className={`scroll-reveal ${styles.bodyText}`}>
              Since the 12th century, the artisans of Kyoto have perfected the slow grinding of 
              Tencha leaves. Using traditional granite mills, we produce only 30 grams of vibrant 
              powder per hour.
            </p>
            <p className={`scroll-reveal ${styles.bodyText}`}>
              This friction-less process preserves the delicate chlorophyll and L-theanine, ensuring 
              a profile that is velvety, umami-rich, and void of bitterness.
            </p>
            <blockquote className={`scroll-reveal ${styles.pullQuote}`}>
              "True matcha is felt before it is tasted."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Ritual Flow Steps ── */}
      <section className={styles.ritualSection}>
        <h2 className={`scroll-reveal ${styles.ritualTitle}`}>The Ritual Flow</h2>
        <div className={styles.ritualSteps}>
          {[
            {
              num: '01',
              title: 'The Sift',
              body: 'Breaking the clumps with a fine mesh, preparing the powder for its transformation into silk.'
            },
            {
              num: '02',
              title: 'The Temper',
              body: 'Adding water cooled to precisely 175°F. Never boiling, always respectful of the leaf.'
            },
            {
              num: '03',
              title: 'The Aeration',
              body: "A vigorous 'W' motion with the bamboo whisk until a micro-foam landscape emerges."
            },
          ].map(step => (
            <div key={step.num} className={`scroll-reveal ${styles.ritualStep}`}>
              <span className={styles.stepNum}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sustainability Section ── */}
      <section className={styles.sustainSection}>
        <div className={styles.sustainInner}>
          <div className={`scroll-reveal ${styles.sustainText}`}>
            <p className={styles.eyebrow}>Our Commitment</p>
            <h2 className={styles.sustainTitle}>
              Sustainability as a<br />Ceremonial Commitment.
            </h2>
            <p className={styles.bodyText}>
              We partner exclusively with fifth-generation family farms that practice organic 
              shading and natural pest management. Each tin of Ceremony is fully compostable, 
              reflecting our reverence for the earth that nurtures us.
            </p>
            <button className={`scroll-reveal ${styles.primaryBtn}`}>
              Learn Our Sourcing
            </button>
          </div>
          <div className={`scroll-reveal ${styles.sustainImageWrapper}`}>
            <img
              src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop"
              alt="Sustainable tea farming"
              className={styles.sustainImage}
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <span className={styles.footerBrand}>Ceremony</span>
        <nav className={styles.footerNav}>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Terms</a>
          <a href="#" className={styles.footerLink}>Shipping</a>
          <a href="#" className={styles.footerLink}>Wholesale</a>
        </nav>
        <p className={styles.footerCopy}>© 2024 The Ceremonial Canvas and and and and Crafted with Intention.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
