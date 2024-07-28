// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { login, register } from "../../api/AuthService.js";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.target.elements;

    try {
      if (!isLogin && password.value !== confirmPassword.value) {
        alert("Password không trùng khớp");
        return;
      }

      const response = await (isLogin
        ? login(email.value, password.value)
        : register(email.value, password.value));

      if (response.ok) {
        const data = await response.json();
        const { token, roleId } = data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("roleId", roleId);

        navigate("/");
        window.location.reload();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
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
            <label>Nhập lại mật khẩu:</label>
            <input type="password" name="confirmPassword" required />
          </div>
        )}
        <button type="submit">{isLogin ? "Đăng nhập" : "Đăng ký"}</button>
      </form>

      <button className="toggle-button" onClick={toggleAuthMode}>
        {isLogin ? "Đăng ký" : "Đăng nhập"}
      </button>
    </div>
  );
};

export default LoginPage;
