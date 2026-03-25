import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
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
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' }
        );
        gsap.fromTo('.gsap-reveal',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
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
            <div className={styles.imageSection}>
                <div className={styles.imageWrapper}>
                    <img
                        src="/hero-sakura.png"
                        alt="Premium Matcha"
                        className={`gsap-image ${styles.image}`}
                    />
                    <div className={styles.overlay}>
                        <h2 className={`gsap-reveal ${styles.quote}`}>
                            "The purest pause in your day."
                        </h2>
                    </div>
                </div>
            </div>

            <div className={styles.formSection}>
                <div className={styles.formWrapper}>
                    <div className={styles.header}>
                        <h1 className={`gsap-reveal ${styles.title}`}>
                            {isLogin ? 'Welcome Back' : 'Join Our Journey'}
                        </h1>
                        <p className={`gsap-reveal ${styles.subtitle}`}>
                            {isLogin
                                ? 'Sign in to access your curated matcha selections.'
                                : 'Create an account to discover premium ceremonial grades.'}
                        </p>
                    </div>

                    {error && <div className={`gsap-reveal ${styles.error}`}>{error}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={`gsap-reveal ${styles.inputGroup}`}>
                            <label htmlFor="email">Email address</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.icon} size={20} />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={`gsap-reveal ${styles.inputGroup}`}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.icon} size={20} />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`gsap-reveal ${styles.submitBtn}`}
                            disabled={isLoading}
                        >
                            {isLogin ? (
                                <><LogIn size={20} /> {isLoading ? 'Signing In...' : 'Sign In'}</>
                            ) : (
                                <><UserPlus size={20} /> {isLoading ? 'Creating...' : 'Create Account'}</>
                            )}
                        </button>
                    </form>

                    <p className={`gsap-reveal ${styles.toggleText}`}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            className={styles.toggleBtn}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
