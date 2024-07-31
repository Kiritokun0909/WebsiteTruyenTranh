// src/components/Header.js
import React, { useEffect, useState } from "react";
import "../../styles/Home.css";
import "../../styles/account/AccountPage.css";
import {
  getUsername,
  updateUsername,
  updatePassword,
} from "../../api/AccountService.js";

const AccountPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUsername();
      setUsername(data.username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleChangeUsername = async (event) => {
    await updateUsername(username);
    alert('Đổi username thành công.');
    window.location.reload();
  };

  const handleChangePassword = async (event) => {
    await updatePassword(password);
    alert('Đổi mật khẩu thành công.');
    window.location.reload();
  };

  return (
    <div className="home-layout">
      <div className="home-header">
        <h3>Thông tin tài khoản</h3>
      </div>
      <div className="auth-container">
        <div className="account-field">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="button" onClick={handleChangeUsername}>
            Đổi
          </button>
        </div>
        <div className="account-field">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleChangePassword}>
            Đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
