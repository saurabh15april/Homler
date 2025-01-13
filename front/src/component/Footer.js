import React, { useState } from 'react';
import './Footer.css'; // Import the CSS for styling
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for scroll events
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top Section */}
        <div className="footer-top">
          <div className="footer-column">
            <h4>About Us</h4>
            <p>
              We are committed to providing exceptional services and innovative
              solutions. Your satisfaction is our priority.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/PNF">Services</a></li>
              <li><a href="/About">About</a></li>
              <li><a href="/ContactPage">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>Name: Assistant Manager Aasif Malik </p>
            <p>Email: aasif.malik@adityabirla.com</p>
           
            <p>Address: Aditya Aluminium Coal Handling Plant, Odisha, India</p>
          </div>

          <div className="footer-column">
            <h4>Newsletter</h4>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                required
                aria-label="Enter your email"
              />
              <button type="submit" aria-label="Subscribe">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>

          <div className="terms-privacy">
            <a href="/PNF/PNF" aria-label="Terms and Conditions">Terms</a> | 
            <a href="/PNF/PNF" aria-label="Privacy Policy">Privacy</a>
          </div>

          <p>© 2025 Your Website. All rights reserved.</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to Top">
          <FaChevronUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
