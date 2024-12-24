// src/components/Navbar.js
import React from 'react';
import styles from './Navbar.module.css';
import { Link  } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Homler</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Create</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/NotificationPage">Notification</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/ContactPage">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
