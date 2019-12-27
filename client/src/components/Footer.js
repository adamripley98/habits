import React from 'react';
import Logo from '../images/logo.png';
import Instagram from '../images/icons/instagram-white.png';
import LinkedIn from '../images/icons/linkedin-white.png';
import Facebook from '../images/icons/facebook-white.png';
import Twitter from '../images/icons/twitter-white.png';


function Footer() {
  return (
    <div className="footer mt-5">
      <div className="upper-links">
        <img className="bottom-logo" src={Logo} alt="icon" />
        <div className="social-links">
          <a href="/TODO">
            <img src={Facebook} alt="Dayli Facebook" className="social-icon" />
          </a>
          <a href="/TODO">
            <img src={Instagram} alt="Dayli Instagram" className="social-icon" />
          </a>
          <a href="/TODO">
            <img src={LinkedIn} alt="Dayli LinkedIn" className="social-icon" />
          </a>
          <a href="/TODO">
            <img src={Twitter} alt="Dayli Twitter" className="social-icon" />
          </a>
        </div>
      </div>
      <div className="bottom-links">
        <p className="bottom-links-left">© 2020 Dayli. All Rights Reserved.</p>
        <div className="bottom-links-right">
          <a href="/TODO" className="gold-link-bottom">Terms of Service</a>
          <a href="/TODO" className="gold-link-bottom">Privacy</a>
          <a href="/TODO" className="gold-link-bottom">Contact</a>
        </div>
        <div className="clear-float" />
      </div>
    </div>
  );
}

export default Footer;
