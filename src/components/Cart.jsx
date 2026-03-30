import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Cart.module.css';

import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const containerRef = useRef(null);
    const { cart, updateQuantity, removeFromCart, cartTotal, addToCart } = useCart();

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
                        {cart.length === 0 ? (
                            <div className={`reveal-item ${styles.emptyCart}`}>Your ritual awaits its vessels. Your cart is empty.</div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className={`reveal-item ${styles.cartItem}`}>
                                    <div className={styles.itemImageWrapper}>
                                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        {/* If meta doesn't exist on standard products, no big deal */}
                                        <p className={styles.itemMeta}>{item.meta || 'Ceremonial Canvas'}</p>
                                    </div>
                                    <div className={styles.itemControls}>
                                        <div className={styles.qtyRow}>
                                            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>−</button>
                                            <span className={styles.qtyValue}>{item.quantity}</span>
                                            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <span className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</span>
                                    </div>
                                    <div className={styles.itemPrice}>{item.price}</div>
                                </div>
                            ))
                        )}

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
                                <span>₹{cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                            <span>₹{cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                                    <button 
                                        className={styles.upsellBtn}
                                        onClick={() => addToCart({ id: 6, name: 'Fine Mesh Sifter', price: '₹900.00', image: '/mesh-sifter.png' })}
                                    >+ Add to Cart</button>
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
