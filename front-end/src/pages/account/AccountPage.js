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

  // const addImageField = () => {
  //   setImages([...images, null]);
  //   setOrderNumbers([...orderNumbers, images.length + 1]);
  //   setPreviews([...previews, null]);
  // };

  const handleChangeUsername = async (event) => {
    await updateUsername(username);
    window.location.reload();
  };

  const handleChangePassword = async (event) => {
    await updatePassword(password);
    window.location.reload();
  };

  return (
    <div className="home-layout">
      <div className="home-item__sidebar-one"></div>

      <div className="home-item__main-column">
        <h1>Thông tin tài khoản</h1>
        <div className="change-username">
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
        <div className="change-password">
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

      <div className="home-item__sidebar-two"></div>
    </div>
  );
};

export default AccountPage;
