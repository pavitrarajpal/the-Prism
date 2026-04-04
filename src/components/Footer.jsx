import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.brand}>
                    <div className={styles.footerLogoWrapper}>
                        <img src="/logo.jpg" alt="Sakura Matcha Logo" className={styles.footerLogoImage} />
                    </div>
                    <p className={styles.mission}>
                        Sourced ethically from Japan.<br />
                        Bringing mindfulness to your daily ritual.
                    </p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Shop</h4>
                        <Link to="/shop" className={styles.link}>All Products</Link>
                        <a className={styles.link}>Premium Sakura Latte</a>
                        <a className={styles.link}>Accessories</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>About</h4>
                        <a className={styles.link}>Our Story</a>
                        <a className={styles.link}>Sourcing</a>
                        <a className={styles.link}>Journal</a>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Support</h4>
                        <a className={styles.link}>FAQ</a>
                        <a className={styles.link}>Shipping & Returns</a>
                        <a className={styles.link}>Contact Us</a>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <p>&copy; {new Date().getFullYear()} Sakura Co. All rights reserved.</p>
                <p>Designed with intentionality.</p>
            </div>
        </footer>
    );
};

export default Footer;
