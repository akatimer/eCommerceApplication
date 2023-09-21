import React from 'react';
import emptyCart from '../../../assets/icons/empty-cart.svg';
import './EmptyCart.css';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../../../utils/constants';

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-cart">
      <div className="empty-cart__image-block">
        <img src={emptyCart} alt="empty-cart" />
      </div>
      <h3 className="empty-cart__title">Your cart is empty</h3>
      <p className="empty-cart__description">
        Looks like you haven&apos;t added anything to your cart yet
      </p>
      <button className="empty-cart__button" onClick={(): void => navigate(SHOP_ROUTE)}>
        Start shopping
      </button>
    </div>
  );
};

export default EmptyCart;
