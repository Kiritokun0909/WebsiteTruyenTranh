// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.target.elements;
    const apiEndpoint = isLogin ? '/auth/login' : '/auth/register';
    const body = {
      email: email.value,
      password: password.value,
      ...(isLogin ? {} : { confirmPassword: confirmPassword.value })
    };

    try {
      if (!isLogin && password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        const { token } = data;
        localStorage.setItem('authToken', token);
        // alert('Success!');
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
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

export default LoginPage;
