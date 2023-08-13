import './Navigation.css';
import React from 'react';
import signinIcon from '../../assets/icons/user_icn.svg';
import cartIcon from '../../assets/icons/cart_icn.svg';
import Logo from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';

const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <Logo />
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to={HOME_ROUTE} className="nav-link home">
            Home
          </NavLink>
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
        <li className="nav-item">
          <NavLink to={LOGIN_ROUTE} className="nav-link sign">
            sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={REGISTRATION_ROUTE} className="nav-link sign">
            sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
