import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = () => {
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const productRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        // Initial intro animation
        const tlIntro = gsap.timeline();

        tlIntro.to(headlineRef.current, {
            y: '0%',
            opacity: 1,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
        }).fromTo(productRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
            '-=1.2'
        );

        // Scroll animation
        const tlScroll = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom -100%',
                scrub: 1,
                pin: true,
            }
        });

        tlScroll
            // Expand mask
            .to(bgRef.current, {
                clipPath: 'circle(150% at 50% 50%)',
                ease: 'none',
            }, 0)
            // Fade and scale product
            .to(productRef.current, {
                scale: 0.8,
                opacity: 0,
                y: -100,
                ease: 'none'
            }, 0)
            // Animate headline upwards and fade out
            .to('.' + styles.textContent, {
                y: -150,
                opacity: 0,
                ease: 'none'
            }, 0);

    }, { scope: containerRef });

    return (
        <section className={styles.heroSection} ref={containerRef}>
            <div className={styles.revealBackground} ref={bgRef}>
                <div className={styles.revealOverlay}></div>
            </div>

            <div className={styles.heroContent}>
                <div className={styles.productWrapper} ref={productRef}>
                    <img
                        src="/hero-matcha.png"
                        alt="Ceremonial Matcha"
                        className={styles.productImage}
                    />
                </div>

                <div className={styles.textContent}>
                    <h1 className={styles.headline}>
                        <span className={styles.headlineLine} ref={headlineRef}>
                            Ritual, Reimagined.
                        </span>
                    </h1>
                    <p className={styles.subtext}>
                        Ceremonial-grade matcha for slow mornings.
                    </p>
                    <button className={styles.cta}>Shop Matcha</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
