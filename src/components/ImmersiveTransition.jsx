import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ImmersiveTransition.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ImmersiveTransition = () => {
    const containerRef = useRef(null);
    const maskRef = useRef(null);
    const bgRef = useRef(null);

    useGSAP(() => {
        // Parallax background slightly for more immersion
        gsap.to(bgRef.current, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Animate the mask to slide upwards
        gsap.to(maskRef.current, {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
                end: 'bottom 80%',
                scrub: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.background} ref={bgRef}></div>
            <div className={styles.textContainer}>
                MATCHA
                <div className={styles.maskedText} ref={maskRef}>
                    MATCHA
                </div>
            </div>
        </section>
    );
};

export default ImmersiveTransition;
