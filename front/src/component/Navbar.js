



// src/components/Navbar.js
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
    // navigate('/login'); // Redirect to login page
    window.location.href = '/login'; // Redirect to login page
  };
  


  // const handleLogout = () => {
  //   localStorage.removeItem('token'); // Remove login token
  //   setIsLoggedIn(false); // Update login state
  //   alert('Logged out successfully!');
  //   navigate('/login'); // Redirect to login page
  // };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Homler</div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/NotificationPage">Notification</Link>
        </li>
        <li>
          <Link to="/ContactPage">Contact</Link>
        </li>
        <li>
        
          {isLoggedIn ? (
            <Link
              onClick={handleLogout}
              className={styles.logoutButton}
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                border: 'none',
                background: '#ffeeee',
                color: 'red',
                borderRadius: '5px',
              }}
            >
              Logout
            </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
