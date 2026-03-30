import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Cart.module.css';

const cartItems = [
    {
        id: 1,
        name: 'Ceremonial Grade Matcha',
        meta: 'Origin: Uji, Japan · 30g Tin',
        price: '₹3,700.00',
        image: '/hero-matcha.png',
    },
];

const Cart = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.reveal-item', {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <div className={styles.page} ref={containerRef}>
            {/* Sticky top bar */}
            <header className={styles.topBar}>
                <span className={styles.topBarLabel}>Ceremony</span>
                <nav className={styles.topNav}>
                    <a href="/" className={styles.topNavLink}>Our Whisk</a>
                    <a href="/" className={styles.topNavLink}>The Ritual</a>
                    <a href="/" className={styles.topNavLink}>Journal</a>
                    <a href="/" className={styles.topNavLink}>Stockists</a>
                </nav>
            </header>

            <div className={styles.contentWrapper}>
                {/* Page heading */}
                <div className={`reveal-item ${styles.pageHeading}`}>
                    <h1 className={styles.pageTitle}>Your Ritual Vessels</h1>
                    <p className={styles.pageSubtitle}>Refining the elements of your morning ceremony</p>
                </div>

                <div className={styles.layout}>
                    {/* ── Cart Items ── */}
                    <div className={styles.cartList}>
                        {cartItems.map(item => (
                            <div key={item.id} className={`reveal-item ${styles.cartItem}`}>
                                <div className={styles.itemImageWrapper}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                </div>
                                <div className={styles.itemInfo}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <p className={styles.itemMeta}>{item.meta}</p>
                                </div>
                                <div className={styles.itemControls}>
                                    <div className={styles.qtyRow}>
                                        <button className={styles.qtyBtn}>−</button>
                                        <span className={styles.qtyValue}>1</span>
                                        <button className={styles.qtyBtn}>+</button>
                                    </div>
                                    <span className={styles.removeBtn}>Remove</span>
                                </div>
                                <div className={styles.itemPrice}>{item.price}</div>
                            </div>
                        ))}

                        {/* Editorial pull‑quote */}
                        <blockquote className={`reveal-item ${styles.pullQuote}`}>
                            "The tea ceremony is a ritual of purity, harmony, and tranquility."
                        </blockquote>
                    </div>

                    {/* ── Order Summary ── */}
                    <aside className={`reveal-item ${styles.summaryPanel}`}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>

                        <div className={styles.summaryRows}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹3,700.00</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span className={styles.muted}>Calculated at next step</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Tax</span>
                                <span className={styles.muted}>₹0.00</span>
                            </div>
                        </div>

                        <div className={styles.summaryTotal}>
                            <span>Total</span>
                            <span>₹3,700.00</span>
                        </div>

                        <button className={styles.checkoutBtn}>Proceed to Ritual</button>

                        <ul className={styles.perks}>
                            <li className={styles.perk}>
                                <span className={styles.perkIcon}>✦</span>
                                Complimentary intentional shipping
                            </li>
                            <li className={styles.perk}>
                                <span className={styles.perkIcon}>✦</span>
                                Ethically sourced from Kyoto
                            </li>
                        </ul>

                        {/* Upsell suggestion */}
                        <div className={styles.completeSet}>
                            <p className={styles.completeSetLabel}>Complete the set</p>
                            <div className={styles.upsellCard}>
                                <img
                                    src="https://images.unsplash.com/photo-1616782352864-1502bc45014c?q=80&w=200&auto=format&fit=crop"
                                    alt="Fine Mesh Sifter"
                                    className={styles.upsellImage}
                                />
                                <div>
                                    <p className={styles.upsellName}>Fine Mesh Sifter</p>
                                    <button className={styles.upsellBtn}>+ Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <span className={styles.footerBrand}>Ceremony</span>
                <nav className={styles.footerNav}>
                    <a href="#" className={styles.footerLink}>Privacy</a>
                    <a href="#" className={styles.footerLink}>Terms</a>
                    <a href="#" className={styles.footerLink}>Shipping</a>
                    <a href="#" className={styles.footerLink}>Wholesale</a>
                </nav>
                <p className={styles.footerCopy}>© The Ceremonial Canvas. Crafted with intention.</p>
            </footer>
        </div>
    );
};

export default Cart;
