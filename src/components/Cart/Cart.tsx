import React, { useEffect, useState } from 'react';
import './Cart.css';
import CartItem from './CartItem/CartItem';
import { SHOP_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { addPromoCode, getCart, getCarts } from '../../utils/api/clientApi';
import { Cart } from '@commercetools/platform-sdk';
import { CircularProgress } from '@mui/material';
import EmptyCart from './EmptyCart/EmptyCart';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart>();
  const [isFetching, setIsFetching] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [oldAmount, setOldAmount] = useState(0);
  const totalAmount = cart?.totalPrice ? cart.totalPrice.centAmount / 100 : 0;

  useEffect(() => {
    getCarts().then((response) => {
      if (response) {
        if (response.body.count) {
          getCart().then((response) => {
            if (response) {
              setCart(response.body);
              setIsFetching(true);
            }
          });
        } else {
          setIsFetching(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    cart?.lineItems.length ? setIsEmpty(false) : setIsEmpty(true);
  }, [cart]);

  useEffect(() => {
    if (cart?.discountCodes.length) {
      const amount = +cart.lineItems
        .reduce((acc, value) => {
          const oldPrice = value.price.discounted?.value?.centAmount
            ? value.price.discounted?.value?.centAmount / 100
            : value.price.value.centAmount / 100;
          return oldPrice * value.quantity + acc;
        }, 0)
        .toFixed(2);
      setOldAmount(amount);
    }
  }, [cart]);

  if (!isFetching) {
    return (
      <div className="loading">
        <CircularProgress color="inherit" />
        Loading...
      </div>
    );
  }
  return (
    <div className="cart-page">
      {isEmpty === true ? (
        <EmptyCart />
      ) : (
        <div className="cart-wrapper">
          <div className="cart-title">Cart</div>
          <div className="cart-body">
            {cart?.lineItems.map((item) => (
              <CartItem
                lineItem={item}
                setCart={setCart}
                cartId={cart.id}
                cartVersion={cart.version}
                key={item.id}
              />
            ))}
          </div>
          <div className="amount-block">
            Total amount
            <span className="amount-block__dollar">$</span>
            <span className="amount-block__total-price">
              {totalAmount}
              {cart?.discountCodes.length ? '/' + oldAmount : ''}
            </span>
          </div>
          <button className="cart-button" onClick={(): void => navigate(SHOP_ROUTE)}>
            To shop
          </button>
          <button
            className="cart-button"
            onClick={(): void => {
              getCart().then((response) => {
                if (response) {
                  addPromoCode('BOGO', response.body.id, response.body.version).then((response) => {
                    if (response) {
                      setCart(response.body);
                    }
                  });
                }
              });
            }}
          >
            PROMO CODE
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
