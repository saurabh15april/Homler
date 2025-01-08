import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login state from localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(token === 'authenticated');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    alert('Logged out successfully!');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Homler</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={styles.navItem}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={styles.navItem}>About</Link>
        </li>
        <li>
          <Link to="/NotificationPage" className={styles.navItem}>Notification</Link>
        </li>
        <li>
          <Link to="/ContactPage" className={styles.navItem}>Contact</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Logout
            </Link>
          ) : (
            <Link to="/login" className={styles.navItem}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
