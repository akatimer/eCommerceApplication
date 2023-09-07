import React from 'react';
import './Cart.css';
import { LineItem } from '@commercetools/platform-sdk';
import CartItem from './CartItem/CartItem';
import { SHOP_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const cartItems: LineItem[] = [
  {
    id: '9fc7c5f8-19c0-4c5d-88ec-4c5ca328d34b',
    productId: '91102c97-e2eb-4115-ab88-a6e347e58e51',
    productKey: 'oversize_linen_shirt',
    name: {
      'en-US': 'Oversize linen shirt',
    },
    productType: {
      typeId: 'product-type',
      id: '7b71b5da-3f54-4568-afbd-4ee97471565b',
    },
    productSlug: {
      'en-US': 'oversize-linen-shirt',
    },
    variant: {
      id: 1,
      sku: '2048',
      key: '2048',
      prices: [
        {
          id: '6861e7b2-2746-4842-a568-d44b764900fc',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 9900,
            fractionDigits: 2,
          },
        },
      ],
      images: [
        {
          url: 'https://d287b6511a5630ad74c0-a97338aee6dc4c6287c453861c1919e2.ssl.cf1.rackcdn.com/ma37-CRObaly4.jpg',
          label: '',
          dimensions: {
            w: 2400,
            h: 3200,
          },
        },
        {
          url: 'https://d287b6511a5630ad74c0-a97338aee6dc4c6287c453861c1919e2.ssl.cf1.rackcdn.com/ma35-R8eGzMIO.jpg',
          label: '',
          dimensions: {
            w: 2400,
            h: 3200,
          },
        },
        {
          url: 'https://d287b6511a5630ad74c0-a97338aee6dc4c6287c453861c1919e2.ssl.cf1.rackcdn.com/ma47-IsbdJDaM.jpg',
          label: '',
          dimensions: {
            w: 2400,
            h: 3200,
          },
        },
      ],
      attributes: [
        {
          name: 'size',
          value: {
            key: '38-40',
            label: '38-40',
          },
        },
        {
          name: 'color',
          value: {
            key: 'creamy',
            label: 'creamy',
          },
        },
        {
          name: 'brand',
          value: {
            key: 'koska',
            label: 'koska',
          },
        },
      ],
      assets: [],
    },
    price: {
      id: '6861e7b2-2746-4842-a568-d44b764900fc',
      value: {
        type: 'centPrecision',
        currencyCode: 'USD',
        centAmount: 9900,
        fractionDigits: 2,
      },
    },
    quantity: 1,
    discountedPricePerQuantity: [],
    perMethodTaxRate: [],
    addedAt: '2023-09-07T09:11:37.848Z',
    lastModifiedAt: '2023-09-07T09:11:37.848Z',
    state: [
      {
        quantity: 1,
        state: {
          typeId: 'state',
          id: '80245cf7-1267-43a9-bd13-442ea08d2afe',
        },
      },
    ],
    priceMode: 'Platform',
    lineItemMode: 'Standard',
    totalPrice: {
      type: 'centPrecision',
      currencyCode: 'USD',
      centAmount: 9900,
      fractionDigits: 2,
    },
    taxedPricePortions: [],
  },
];
const Cart: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="cart-page">
      <div className="cart-wrapper">
        <div className="cart-title">Cart</div>
        <div className="cart-body">
          {[...cartItems, ...cartItems].map((item, index) => (
            <CartItem lineItem={item} key={index} />
          ))}
        </div>
        <div className="amount-block">
          Total amount
          <span className="amount-block__dollar">$</span>
          <span className="amount-block__total-price">623</span>
        </div>
        <button className="cart-button" onClick={(): void => navigate(SHOP_ROUTE)}>
          To shop
        </button>
      </div>
    </div>
  );
};

export default Cart;
