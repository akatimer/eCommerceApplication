import './MainInfo.css';
import React from 'react';
import mainPhoto from '../../assets/images/item-shirt.png';

const MainInfo: React.FC = () => {
  return (
    <div className="main-info">
      <div className="main-item">
        <h1 className="item-title">A shirt for every occasion</h1>
        <p className="item-desc">
          Casual relaxed silhouette, spacious model, suitable for people of any age, both men and
          women.
        </p>
        <button className="button button-item">Shopping</button>
      </div>
      <div className="item-pic">
        <img src={mainPhoto} alt="shirt" />
      </div>
    </div>
  );
};

export default MainInfo;
