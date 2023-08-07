import React from 'react';
import './main-section.css';
import mainPhoto from '../../assets/images/baner.png';

const Main: React.FC = () => {
  return (
    <main className="main">
      <div className="main__baner">
        <div className="baner">
          <h1 className="baner__text">A shirt for every occasion</h1>
          <p className="baner__desc">
            Casual relaxed silhouette, spacious model, suitable for people of any age, both men and
            women.
          </p>
          <button className="button button__baner">Shopping</button>
        </div>
        <div className="baner__pic">
          <img src={mainPhoto} alt="shirt" />
        </div>
      </div>
    </main>
  );
};

export default Main;
