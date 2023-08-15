import './ErrorPage.css';
import React from 'react';
import error from '../../assets/images/error.svg';
import { NavLink } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/constants';

const ErrorPage: React.FC = () => {
  return (
    <div className="error">
      <h2 className="error-title">Error: 404 Page Not Found </h2>
      <img src={error} alt="404" className="error-pic" />
      <p className="error-desc">
        Sorry, the page you&apos;re looking for cannot be accessed. Either check the URL, or{' '}
        <NavLink to={HOME_ROUTE} className="error-link">
          go home
        </NavLink>
      </p>
    </div>
  );
};
export default ErrorPage;
