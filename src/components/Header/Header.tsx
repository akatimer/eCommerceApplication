import './Header.css';
import React from 'react';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Navigation />
    </header>
  );
};

export default Header;
