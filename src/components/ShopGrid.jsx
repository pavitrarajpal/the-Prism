import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import styles from './ShopGrid.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
    {
        id: 1,
        name: "Everyday Matcha",
        price: "₹2,300.00",
        image: "https://images.unsplash.com/photo-1629828552174-8b6eb063d898?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Ceremonial Matcha No.01",
        price: "₹3,700.00",
        image: "/hero-matcha.png"
    }
];

const ShopGrid = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

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
                    <div 
                        key={product.id} 
                        className={styles.productCard}
                        onClick={() => {
                            if (product.id === 2) {
                                navigate('/product/ceremonial-matcha');
                            }
                        }}
                        style={{ cursor: product.id === 2 ? 'pointer' : 'default' }}
                    >
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
