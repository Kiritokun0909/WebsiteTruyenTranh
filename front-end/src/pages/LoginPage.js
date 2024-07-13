// src/components/Header.js
import React, { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
      setIsLogin(!isLogin);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle login or registration logic here
      const { email, password } = event.target.elements;
      console.log('Email:', email.value);
      console.log('Password:', password.value);
      if (!isLogin) {
        const { confirmPassword } = event.target.elements;
        if (password.value !== confirmPassword.value) {
          alert("Passwords do not match");
          return;
        }
        console.log('Confirm Password:', confirmPassword.value);
      }
    };
  
    return (
        <div className="auth-container">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input type="email" name="email" required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" required />
            </div>
            {!isLogin && (
              <div>
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" required />
              </div>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          </form>

          <button className="toggle-button" onClick={toggleAuthMode}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
    );
};

export default Login;
