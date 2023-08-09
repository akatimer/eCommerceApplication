import './Navigation.css';
import React from 'react';
import signinIcon from '../../assets/icons/user_icn.svg';
import cartIcon from '../../assets/icons/cart_icn.svg';
import Logo from '../Logo/Logo';

const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <Logo />
      <ul className="nav-list">
        <li className="nav-item">
          <a className="nav-link crutch" href="#!">
            Home
          </a>
        </li>
      </ul>
      <ul className="nav-list customer-nav">
        <li className="nav-item">
          <a className="nav-link" href="#!">
            <img src={signinIcon} alt="signin" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#!">
            <img src={cartIcon} alt="cart" />
          </a>
        </li>
        <li className="nav-item sign-up">
          <a className="nav-link" href="#!">
            sign up
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;