import React from 'react';
import './Coupon.css';
import couponIcon from '../../../../assets/icons/coupon.svg';

type Props = {
  name: string | undefined;
  description: string | undefined;
  code: string;
};
const Coupon: React.FC<Props> = ({ name, description, code }) => {
  return (
    <div className="coupon__wrapper">
      <div className="coupon__image">
        <img src={couponIcon} alt={name}></img>
      </div>
      <div className="coupon-body">
        <span className="coupon__name">{name}</span>
        <span className="coupon__description">{description}</span>
        <span className="coupon__code">Use Code: {code}</span>
      </div>
    </div>
  );
};

export default Coupon;
