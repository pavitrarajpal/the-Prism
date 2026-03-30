import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Contact = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Initial reveal
        gsap.fromTo('.reveal-up',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
        );

        // Scroll reveals
        gsap.utils.toArray('.scroll-fade').forEach(el => {
            gsap.from(el, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            });
        });
    }, { scope: containerRef });

    return (
        <div className={styles.pageContainer} ref={containerRef}>
            
            {/* ── Sticky Navbar ── */}
            <header className={styles.navbar}>
                <span className={styles.navBrand}>Ceremony</span>
                <nav className={styles.navLinks}>
                    <a href="#" className={styles.navLink}>Shop</a>
                    <a href="#" className={styles.navLink}>The Ritual</a>
                    <a href="#" className={styles.navLink}>Journal</a>
                    <a href="#" className={styles.navLink}>About</a>
                </nav>
            </header>

            {/* ── Hero Intro ── */}
            <section className={styles.heroSection}>
                <div className={styles.heroLeft}>
                    <p className={`reveal-up ${styles.eyebrow}`}>Connect With The Source</p>
                    <h1 className={`reveal-up ${styles.title}`}>Inquiry &<br/>Ritual</h1>
                    <p className={`reveal-up ${styles.subtitle}`}>
                        Whether you are seeking guidance on ceremonial preparation or looking to partner with our studio, we welcome your presence.
                    </p>
                </div>
                
                <div className={`reveal-up ${styles.heroRight}`}>
                    <div className={styles.imageStack}>
                        <img 
                            src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop" 
                            alt="Matcha bowl" 
                            className={styles.heroImage}
                        />
                        <div className={styles.quoteCard}>
                            <p>"The way of tea is a practice of stillness."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Studio & Form Grid ── */}
            <section className={styles.contactGrid}>
                {/* Left: Studio Info */}
                <div className={`scroll-fade ${styles.infoCol}`}>
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>Kyoto Studio</h3>
                        <p className={styles.infoText}>
                            12-4 Rengeyama-cho, Uji-city<br/>
                            Kyoto-fu, 611-0021<br/>
                            Japan
                        </p>
                        <a href="#" className={styles.mapLink}>⚲ View on map</a>
                    </div>

                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>Service Hours</h3>
                        <div className={styles.hoursRow}>
                            <span>Monday — Friday</span>
                            <span>10:00 — 17:00</span>
                        </div>
                        <div className={styles.hoursRow}>
                            <span>Saturday</span>
                            <span>10:00 — 14:00</span>
                        </div>
                        <div className={styles.hoursRow}>
                            <span>Sunday</span>
                            <span>Closed for Ritual</span>
                        </div>
                    </div>

                    <div className={styles.zenImageWrapper}>
                        <img 
                            src="https://images.unsplash.com/photo-1598289421884-a15d0fac0985?q=80&w=600&auto=format&fit=crop" 
                            alt="Zen garden" 
                            className={styles.zenImage}
                        />
                    </div>
                </div>

                {/* Right: Form */}
                <div className={`scroll-fade ${styles.formCol}`}>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Full Name</label>
                                <input type="text" className={styles.inputField} placeholder="E.g. Jane Doe" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Email Address</label>
                                <input type="email" className={styles.inputField} placeholder="jane@example.com" />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Inquiry Type</label>
                            <select className={styles.inputField}>
                                <option>General Inquiry</option>
                                <option>Wholesale</option>
                                <option>Press</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Your Message</label>
                            <textarea 
                                className={styles.inputArea} 
                                rows="5" 
                                placeholder="How may we assist in your journey?"
                            ></textarea>
                        </div>

                        <button className={styles.primaryBtn}>Send Inquiry</button>
                    </form>
                </div>
            </section>

            {/* ── Closing Quote ── */}
            <section className={`scroll-fade ${styles.closingSection}`}>
                <div className={styles.closingLeaf}>❦</div>
                <h2 className={styles.closingQuote}>
                    "We do not just curate leaves;<br/>
                    we curate the moments of<br/>
                    pause that make life worth<br/>
                    living."
                </h2>
                <p className={styles.closingAuthor}>— CHIEF TEA MASTER</p>
            </section>

        </div>
    );
};

export default Contact;
