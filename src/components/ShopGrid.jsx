import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from './ShopGrid.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const products = [
    {
        id: 1,
        name: "Everyday Matcha",
        price: "₹2,300.00",
        image: "/everyday-matcha.png"
    },
    {
        id: 2,
        name: "Ceremonial Matcha No.01",
        price: "₹3,700.00",
        image: "/ceremonial-no1.png"
    },
    {
        id: 3,
        name: "Kyoto Hojicha Roast",
        price: "₹2,800.00",
        image: "/hojicha-tin.png"
    },
    {
        id: 4,
        name: "Artisan Bamboo Chasen",
        price: "₹1,500.00",
        image: "/bamboo-whisk.png"
    },
    {
        id: 5,
        name: "Wabi-Sabi Pink Chawan",
        price: "₹4,200.00",
        image: "/ceramic-bowl.png"
    },
    {
        id: 6,
        name: "Fine Mesh Sifter",
        price: "₹900.00",
        image: "/mesh-sifter.png"
    },
    {
        id: 7,
        name: "Premium Sakura Latte",
        price: "₹3,200.00",
        image: "/sakura-latte.png"
    },
    {
        id: 8,
        name: "Matcha Travel Kit",
        price: "₹5,400.00",
        image: "/travel-kit.png"
    }
];

const ShopGrid = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState(null);

    const handleAdd = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

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
                        <button 
                            onClick={(e) => handleAdd(e, product)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1rem',
                                marginTop: '1rem',
                                fontFamily: "'Manrope', sans-serif",
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                backgroundColor: addedId === product.id ? '#7f525d' : '#1a1f1b',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'block',
                                textAlign: 'center',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {addedId === product.id ? 'Added To Cart ✓' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopGrid;
