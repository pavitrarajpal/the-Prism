import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ShopGrid.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
    {
        id: 1,
        name: "Everyday Matcha",
        price: "$28.00",
        image: "https://images.unsplash.com/photo-1629828552174-8b6eb063d898?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ceremonial Matcha No.01",
        price: "$45.00",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Bamboo Whisk",
        price: "$18.00",
        image: "https://images.unsplash.com/photo-1616782352864-1502bc45014c?q=80&w=600&auto=format&fit=crop"
    }
];

const ShopGrid = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Reveal grid items gently
        gsap.from('.' + styles.productCard, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.headingWrapper}>
                <h2 className={styles.heading}>Shop the Collection</h2>
            </div>

            <div className={styles.grid}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.productInfo}>
                            <h4 className={styles.productName}>{product.name}</h4>
                            <p className={styles.productPrice}>{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopGrid;
