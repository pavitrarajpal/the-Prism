import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MaskSection.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MaskSection = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
                end: 'bottom 80%',
                toggleActions: 'play none none reverse',
            }
        });

        // Vertical mask reveal for text
        tl.to('.' + styles.heading, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.5,
            ease: 'power4.inOut'
        })
            .to('.' + styles.paragraph, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=1.0')
            // Reveal image with mask and scale down slightly
            .to('.' + styles.image, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                scale: 1,
                duration: 1.8,
                ease: 'power4.out'
            }, '-=1.5');
    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.leftCol}>
                <div className={styles.headingWrapper}>
                    <h2 className={styles.heading}>Stone-Ground.<br />Shade-Grown.</h2>
                </div>
                <div className={styles.paragraphWrapper}>
                    <p className={styles.paragraph}>
                        Cultivated in the serene gardens of Japan.
                        Our blossoms are carefully selected at peak freshness to preserve
                        the vibrant pink color and delicate floral flavor.
                    </p>
                </div>
                <div className={styles.paragraphWrapper}>
                    <p className={styles.paragraph}>
                        A daily ritual that calms the mind and delights the senses.
                        Experience the purest form of spring in a cup.
                    </p>
                </div>
            </div>

            <div className={styles.rightCol}>
                <img
                    src="/hero-sakura.png"
                    alt="Sakura Preparation"
                    className={styles.image}
                />
            </div>
        </section>
    );
};

export default MaskSection;
