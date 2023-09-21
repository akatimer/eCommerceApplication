import './RsLogo.css';
import React from 'react';
import rsLogo from '../../assets/icons/rs-logo.svg';
import { Link } from 'react-router-dom';

const RsLogo: React.FC = () => {
  return (
    <div className="rs-logo">
      <div className="rights">© code witchers 2023</div>
      <Link to="https://rs.school/js/">
        <img src={rsLogo} alt="Rs Logo" style={{ width: '120px' }} />
      </Link>
    </div>
  );
};

export default RsLogo;
