import React, { useState } from 'react';
import './CartItem.css';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import closeImg from '../../../assets/icons/cancel_icn.svg';
import minusImg from '../../../assets/icons/minus_icn_pink.svg';
import plusImg from '../../../assets/icons/plus_icn_pink.svg';
import { changeLineItemQuantity, removeLineItem } from '../../../utils/api/clientApi';

type Props = {
  lineItem: LineItem;
  cartId: string;
  cartVersion: number;
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};
const CartItem: React.FC<Props> = ({ lineItem, cartId, cartVersion, setCart }) => {
  const [isDisabledMinusBtn, setIsDisabledMinusBtn] = useState(false);
  const [isDisabledPlusBtn, setIsDisabledPlusBtn] = useState(false);
  const itemName = lineItem.name['en-US'];
  const itemImg = lineItem.variant.images ? lineItem.variant.images[0].url : '';
  const itemPrice = lineItem.totalPrice.centAmount / 100;
  const itemQuantity = lineItem.quantity;
  const itemId = lineItem.id;
  const decreaseQuantity = (): void => {
    setIsDisabledMinusBtn(true);
    changeLineItemQuantity(itemId, itemQuantity - 1, cartId, cartVersion).then((response) => {
      if (response) {
        setCart(response.body);
        setIsDisabledMinusBtn(false);
      }
    });
  };
  const increaseQuantity = (): void => {
    setIsDisabledPlusBtn(true);
    changeLineItemQuantity(itemId, itemQuantity + 1, cartId, cartVersion).then((response) => {
      if (response) {
        setCart(response.body);
        setIsDisabledPlusBtn(false);
      }
    });
  };
  const deleteHandleClick = (): void => {
    removeLineItem(itemId, itemQuantity, cartId, cartVersion).then((response) => {
      if (response) {
        setCart(response.body);
      }
    });
  };
  return (
    <div className="cart-item">
      <div className="cart-item__image-block">
        <img className="cart-item__image" src={itemImg} alt={itemName} />
      </div>
      <div className="cart-item__body">
        <h3 className="cart-item__title">{itemName}</h3>
      </div>
      <div className="cart-item__quantity-block">
        <button
          className="cart-item__less-button"
          disabled={isDisabledMinusBtn}
          onClick={decreaseQuantity}
        >
          <img
            className="cart-item__minus"
            src={minusImg}
            alt="reduce the number of items by one"
          />
        </button>
        <span className="cart-item__quantity">{itemQuantity}</span>
        <button
          className="cart-item__plus-button"
          onClick={increaseQuantity}
          disabled={isDisabledPlusBtn}
        >
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
        <button className="cart-item__delete-button" onClick={deleteHandleClick}>
          <img src={closeImg} alt="delete item" style={{ width: '35px' }} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
