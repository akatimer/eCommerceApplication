import React, { useEffect, useState } from 'react';
import './CouponsHeader.css';
import { getPromoCodes } from '../../../utils/api/clientApi';
import { DiscountCode } from '@commercetools/platform-sdk';
import Coupon from './Coupon/Coupon';

const CouponsHeader: React.FC = () => {
  const [coupons, setCoupons] = useState<DiscountCode[]>();
  useEffect(() => {
    getPromoCodes().then((response) => {
      if (response) {
        setCoupons(response.body.results);
      }
    });
  }, []);
  return (
    <div className="coupons__wrapper">
      {coupons?.map((coupon) => (
        <Coupon
          key={coupon.id}
          name={coupon.name && coupon.name['en-US']}
          description={coupon.description && coupon.description['en-US']}
          code={coupon.code}
        ></Coupon>
      ))}
    </div>
  );
};

export default CouponsHeader;
