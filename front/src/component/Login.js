import React, { useState } from 'react';
import styles from './Login.module.css';

import { useNavigate } from 'react-router-dom';
const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // const handleLogin = async (e) => {
  //   e.preventDefault();
  
  //   const credentials = {
  //     username: 'user',
  //     password: 'password',
  //   };
  
  //   try {
  //     const response = await fetch('http://localhost:8080/Signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(credentials),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     }
  
  //     const data = await response.json();
  //     localStorage.setItem('token', data.token); // Save token to localStorage
  //     alert('Login successful!');
  //     window.location.href = '/HomePage'; // Redirect after login
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     alert('Login failed. Please try again.');
  //   }
  // };





  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.username === 'admin' && formData.password === 'hope') {
      localStorage.setItem('token', 'authenticated'); // Save login token
    
      alert('Login successful!');
      navigate('/'); // Redirect to the form page
    } else {
      alert('Invalid username or password!');
    }
  };

  // const validate = () => {
  //   let errors = {};
  //   if (!formData.username) errors.username = 'Username is required';
  //   if (!formData.password) errors.password = 'Password is required';
  //   return errors;
  // };





  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validate();
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     // Log username and password to the console
  //     console.log({'Username:': formData.username ,
  //       'Password:': formData.password  });
      
     

  //     // Simulate login success
  //     if (formData.username === 'admin' && formData.password === 'password') {
  //       setLoginStatus('Login successful!');
  //     } else {
  //       setLoginStatus('Invalid username or password');
  //     }
  //   }
  // };







  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? styles.errorInput : ''}
          />
          {errors.username && <span className={styles.errorText}>{errors.username}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? styles.errorInput : ''}
          />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>

        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
      {loginStatus && <p className={styles.statusMessage}>{loginStatus}</p>}
    </div>
  );
};

export default Login;
