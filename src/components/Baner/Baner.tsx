import './Baner.css';
import React from 'react';
import mainPhoto from '../../assets/images/baner.png';

const Baner: React.FC = () => {
  return (
    <div className="main-baner">
      <div className="baner">
        <h1 className="baner-text">A shirt for every occasion</h1>
        <p className="baner-desc">
          Casual relaxed silhouette, spacious model, suitable for people of any age, both men and
          women.
        </p>
        <button className="button button-baner">Shopping</button>
      </div>
      <div className="baner-pic">
        <img src={mainPhoto} alt="shirt" />
      </div>
    </div>
  );
};

export default Baner;
