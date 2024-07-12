import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="social-links">
          <a href="#">Privacy</a>
          <a href="https://www.facebook.com/">Facebook</a>
          <a href="https://discord.com/">Discord</a>
        </div>

        <div className="personal-info">
          <p>Created by Ho Duc Hoang</p>
          <p>Email: n20dccn018@student.ptithcm.edu.vn</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
