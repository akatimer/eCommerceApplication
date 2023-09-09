import React from 'react';
import './CartItem.css';
import { LineItem } from '@commercetools/platform-sdk';
import closeImg from '../../../assets/icons/cancel_icn.svg';
import minusImg from '../../../assets/icons/arrow_icn_small.svg';
import plusImg from '../../../assets/icons/plus_icn_pink.svg';

type Props = {
  lineItem: LineItem;
};
const CartItem: React.FC<Props> = ({ lineItem }) => {
  const itemName = lineItem.name['en-US'];
  const itemImg = lineItem.variant.images ? lineItem.variant.images[0].url : '';
  const itemPrice = lineItem.totalPrice.centAmount / 100;
  const itemQuantity = lineItem.quantity;
  return (
    <div className="cart-item">
      <div className="cart-item__image-block">
        <img className="cart-item__image" src={itemImg} alt={itemName} />
      </div>
      <div className="cart-item__body">
        <h3 className="cart-item__title">{itemName}</h3>
      </div>
      <div className="cart-item__quantity-block">
        <button className="cart-item__less-button">
          <img
            className="cart-item__minus"
            src={minusImg}
            alt="reduce the number of items by one"
          />
        </button>
        <span className="cart-item__quantity">{itemQuantity}</span>
        <button className="cart-item__plus-button">
          <img
            className="cart-item__plus"
            src={plusImg}
            alt="increase the number of items by one"
          />
        </button>
      </div>
      <div className="cart-item__price-block">
        <span className="cart-item__dollar">$</span>
        <span className="cart-item__price">{itemPrice}</span>
      </div>
      <div className="cart-item__delete-block">
        <button className="cart-item__delete-button">
          <img src={closeImg} alt="delete item" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;