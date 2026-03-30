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
    const canvasRef = useRef(null);

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

        // Scroll animation setup
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Handle High-DPI displays for crisp rendering
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        const frameCount = 300;
        const currentFrame = index => (
            `/hero-sequence/frame_${index.toString().padStart(3, '0')}_delay-0.033s.jpg`
        );

        const images = [];
        const seq = { frame: 0 };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        const render = () => {
            const img = images[Math.round(seq.frame)];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        };

        images[0].onload = render;

        // Debounced resize handler for canvas
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setCanvasSize();
                render();
            }, 150);
        };
        window.addEventListener('resize', handleResize);

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
            // Scrub canvas frame
            .to(seq, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                onUpdate: render
            }, 0)
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

        return () => window.removeEventListener('resize', handleResize);
    }, { scope: containerRef });

    return (
        <section className={styles.heroSection} ref={containerRef}>
            <div className={styles.revealBackground} ref={bgRef}>
                <canvas ref={canvasRef} className={styles.heroCanvas}></canvas>
                <div className={styles.revealOverlay}></div>
            </div>

            <div className={styles.heroContent}>
                <div className={styles.productWrapper} ref={productRef}>
                    <img
                        src="/premium-sakura-latte.jpeg"
                        alt="Premium Sakura Latte"
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
                        Premium, soft-pink sakura lattes for slow mornings.
                    </p>
                    <button className={styles.cta}>Shop Sakura</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
