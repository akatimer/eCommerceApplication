import React from 'react';
import './header.css';
import logo from '../../assets/images/logo.png';
import signinIcon from '../../assets/icons/user_icn.svg';
import cartIcon from '../../assets/icons/cart_icn.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="/">Home</a>
            </li>
            <li className="header__nav-item">
              <a href="/shop">Shop</a>
            </li>
          </ul>
        </nav>
        <div className="customer__block">
          <div className="signin">
            <a href="/signin">
              <img src={signinIcon} alt="signin" />
            </a>
          </div>
          <div className="cart">
            <a href="/cart">
              <img src={cartIcon} alt="cart" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
