import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Contact.module.css';

const Contact = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.reveal-element', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, { scope: containerRef });

    return (
        <div className={styles.pageContainer} ref={containerRef}>
            <div className={styles.contentWrapper}>
                <div className={styles.textCol}>
                    <p className={`reveal-element ${styles.label}`}>Inquiries</p>
                    <h1 className={`reveal-element ${styles.title}`}>Get in Touch</h1>
                    <p className={`reveal-element ${styles.bodyText}`}>
                        Whether you are looking to become a wholesale partner or simply have questions about our ceremonial grades, we would love to hear from you.
                    </p>
                </div>

                <div className={`reveal-element ${styles.formCol}`}>
                    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Name</label>
                            <input type="text" className={styles.inputField} />
                        </div>
                        
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Email Address</label>
                            <input type="email" className={styles.inputField} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Message</label>
                            <textarea className={styles.inputArea} rows="4"></textarea>
                        </div>

                        <button className={styles.primaryButton}>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Contact;
