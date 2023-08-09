import React from 'react';
import logo from '../../assets/images/logo.png';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <a href="#!">
        <img src={logo} alt="logo" style={{ width: '64px', height: '64px' }} />
      </a>
    </div>
  );
};

export default Logo;
