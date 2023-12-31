import './Navigation.css';
import logOutIcon from '../../assets/icons/logout.svg';
import profile from '../../assets/icons/user_icn.svg';
import cartIcon from '../../assets/icons/cart_icn.svg';
import Logo from '../Logo/Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  CART_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LS_LOGIN,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  TOKEN_NAME,
  ABOUT_US,
} from '../../utils/constants';
import { useAuth } from '../AuthUse/AuthUse';

const Navigation: React.FC = () => {
  const lsLogin = localStorage.getItem(LS_LOGIN);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogOut = (): void => {
    localStorage.removeItem(LS_LOGIN);
    localStorage.removeItem(TOKEN_NAME);
    setIsLoggedIn(false);
    navigate(HOME_ROUTE);
  };

  return (
    <nav className="nav">
      <Logo />
      <ul className="nav-list navigation">
        <li className="nav-item">
          <NavLink to={HOME_ROUTE} className="nav-link home">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={SHOP_ROUTE} className="nav-link">
            Shop
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ABOUT_US} className="nav-link">
            About Us
          </NavLink>
        </li>
      </ul>
      <ul className="nav-list customer-nav">
        <li className="nav-item">
          <NavLink to={CART_ROUTE} className="nav-link cart">
            <img src={cartIcon} alt="cart" />
          </NavLink>
        </li>
        {isLoggedIn || lsLogin ? (
          <>
            <li className="nav-item">
              <NavLink to={PROFILE_ROUTE} className="nav-link profile">
                <img src={profile} alt="profile" />
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!" onClick={handleLogOut}>
                <img src={logOutIcon} alt="logout" />
              </a>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
