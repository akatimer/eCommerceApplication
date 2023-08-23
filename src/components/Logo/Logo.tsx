import React from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <NavLink to="/">
        <img src={logo} alt="logo" style={{ width: '64px', height: '64px' }} />
      </NavLink>
    </div>
  );
};

export default Logo;
