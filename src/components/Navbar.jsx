import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();

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
      <div className={styles.logoWrapper} onClick={() => navigate('/')}>
        <img src="/logo.jpg" alt="Sakura Matcha Logo" className={styles.logoImage} />
      </div>
      
      <nav className={styles.navLinks}>
        <Link to="/shop" className={styles.link}>Shop</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
      </nav>

      <div className={styles.actions}>
        <button className={styles.authBtn} onClick={handleAuthAction}>
          {currentUser ? 'Logout' : 'Login'}
        </button>
        <Link to="/cart" className={styles.cartBtn}>Cart ({cart.length})</Link>
      </div>
    </header>
  );
};

export default Navbar;
