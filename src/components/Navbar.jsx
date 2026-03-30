import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleAuthAction = async () => {
    if (currentUser) {
      try {
        await logout();
        navigate('/');
      } catch (error) {
        console.error("Failed to log out", error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigate('/')}>MATCHA.</div>
      
      <nav className={styles.navLinks}>
        <Link to="/" className={styles.link}>Shop</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
      </nav>

      <div className={styles.actions}>
        <button className={styles.authBtn} onClick={handleAuthAction}>
          {currentUser ? 'Logout' : 'Login'}
        </button>
        <Link to="/cart" className={styles.cartBtn}>Cart (0)</Link>
      </div>
    </header>
  );
};

export default Navbar;
