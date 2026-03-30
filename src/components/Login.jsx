import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './Login.module.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const { currentUser } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef(null);

    React.useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    useGSAP(() => {
        gsap.fromTo('.gsap-image',
            { scale: 1.08, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2.2, ease: 'power3.out' }
        );
        gsap.fromTo('.gsap-reveal',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
        );
    }, { scope: containerRef });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {/* Left — editorial image panel */}
            <div className={styles.imagePanel}>
                <img
                    src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop"
                    alt="Ceremonial matcha bowl"
                    className={`gsap-image ${styles.heroImage}`}
                />
                <div className={styles.imageOverlay}>
                    <p className={styles.eyebrow}>The Botanical Curator</p>
                    <h1 className={`gsap-reveal ${styles.heroHeadline}`}>
                        A Ritual<br />
                        Defined by<br />
                        Presence.
                    </h1>
                    <blockquote className={`gsap-reveal ${styles.quote}`}>
                        "The way of tea is a way of life. It is the simple act of preparing a bowl of tea and drinking it with awareness."
                    </blockquote>
                </div>
            </div>

            {/* Right — form panel */}
            <div className={styles.formPanel}>
                <div className={styles.formInner}>
                    <div className={`gsap-reveal ${styles.formHeader}`}>
                        <h2 className={styles.formTitle}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className={styles.formSubtitle}>
                            {isLogin
                                ? 'Enter your sanctuary to continue the ritual.'
                                : 'Begin your ceremonial journey.'}
                        </p>
                    </div>

                    {error && <div className={`gsap-reveal ${styles.errorBox}`}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={`gsap-reveal ${styles.fieldGroup}`}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                className={styles.input}
                            />
                        </div>

                        <div className={`gsap-reveal ${styles.fieldGroup}`}>
                            <div className={styles.passwordHeader}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                {isLogin && (
                                    <button type="button" className={styles.forgotLink}>Forgotten?</button>
                                )}
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className={styles.input}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`gsap-reveal ${styles.primaryBtn}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entering...' : isLogin ? 'Begin Ceremony' : 'Join the Ritual'}
                        </button>
                    </form>

                    <p className={`gsap-reveal ${styles.switchText}`}>
                        {isLogin ? "New to the ceremony? " : "Already initiated? "}
                        <button
                            type="button"
                            className={styles.switchLink}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Create Account' : 'Sign In'}
                        </button>
                    </p>

                    <nav className={`gsap-reveal ${styles.footerNav}`}>
                        <a href="#" className={styles.footerLink}>Wholesale</a>
                        <span className={styles.footerDot} />
                        <a href="#" className={styles.footerLink}>Sourcing</a>
                        <span className={styles.footerDot} />
                        <a href="#" className={styles.footerLink}>Support</a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Login;
