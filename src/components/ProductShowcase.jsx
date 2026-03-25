import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Minus, Plus } from 'lucide-react';
import styles from './ProductShowcase.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProductShowcase = () => {
    const [qty, setQty] = useState(1);
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const cardRef = useRef(null);

    useGSAP(() => {
        // Parallax background effect
        gsap.to(bgRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Reveal card
        gsap.from(cardRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    const increase = () => setQty(q => q + 1);
    const decrease = () => setQty(q => Math.max(1, q - 1));

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.background} ref={bgRef}></div>

            <div className={styles.card} ref={cardRef}>
                <div className={styles.imageWrapper}>
                    <img
                        src="https://images.unsplash.com/photo-1582787019842-8c116bb867ff?q=80&w=800&auto=format&fit=crop"
                        alt="Premium Sakura Latte"
                        className={styles.productImage}
                    />
                </div>

                <div className={styles.details}>
                    <h3 className={styles.title}>Premium Sakura Latte</h3>
                    <p className={styles.price}>$45.00</p>

                    <div className={styles.controls}>
                        <div className={styles.qtySelector}>
                            <button className={styles.qtyBtn} onClick={decrease}>
                                <Minus size={16} />
                            </button>
                            <span className={styles.qtyValue}>{qty}</span>
                            <button className={styles.qtyBtn} onClick={increase}>
                                <Plus size={16} />
                            </button>
                        </div>

                        <button className={styles.addBtn}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
