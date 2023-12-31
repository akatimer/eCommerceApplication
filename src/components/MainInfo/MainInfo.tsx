import './MainInfo.css';
import React from 'react';
import mainPhoto from '../../assets/images/item-shirt.png';
import { SHOP_ROUTE } from '../../utils/constants';
import { Link } from 'react-router-dom';
import CouponsHeader from './CouponsHeader/CouponsHeader';

const MainInfo: React.FC = () => {
  return (
    <>
      <CouponsHeader />
      <div className="main-info">
        <div className="main-item">
          <h1 className="item-title">A shirt for every occasion</h1>
          <p className="item-desc">
            Casual relaxed silhouette, spacious model, suitable for people of any age, both men and
            women.
          </p>
          <Link to={SHOP_ROUTE}>
            <button className="button button-item">Shopping</button>
          </Link>
        </div>
        <div className="item-pic">
          <img src={mainPhoto} alt="shirt" />
        </div>
      </div>
    </>
  );
};

export default MainInfo;
