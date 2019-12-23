import React from 'react';
import Logo from '../images/logo.png';

function Footer() {
  return (
    <div className="footer">
      <img className="icon" src={Logo} alt="icon" />
      <div className="social-links">
        <h1>social</h1>
      </div>
      <div className="bottom-links">
        <p className="gold-text">© 2020 Dayli. All Rights Reserved.</p>
        <a href="/TODO" className="gold-link">Terms of Service</a>
        <a href="/TODO" className="gold-link">Privacy</a>
        <a href="/TODO" className="gold-link">Contact</a>
      </div>
    </div>
  );
}

export default Footer;
