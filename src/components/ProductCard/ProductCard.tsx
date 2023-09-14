import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardActionArea, CardContent } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './ProductCard.css';
import { CART_ROUTE, PRODUCT_ROUTE } from '../../utils/constants';
import { createCart, addLineItem, getCart, getCarts } from '../../utils/api/clientApi';

type Props = {
  product: ProductProjection;
  lineItemsId: string[] | undefined;
  setLineItemsId: Dispatch<SetStateAction<string[] | undefined>>;
};

const region = 'en-US';

const ProductCard: React.FC<Props> = ({ product, lineItemsId, setLineItemsId }) => {
  const navigate = useNavigate();
  const { name, description, masterVariant, id } = product;
  const [discount, setDiscount] = useState<number>();
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    lineItemsId?.includes(id) ? setIsInCart(true) : setIsInCart(false);
  }, [id, lineItemsId]);
  useEffect(() => {
    if (masterVariant.prices) {
      setDiscount(masterVariant.prices[0].discounted?.value.centAmount);
    }
  }, [masterVariant.prices]);

  const btnHandleClick = (): void => {
    getCarts().then((response) => {
      if (response) {
        if (response.body.count) {
          getCart().then((response) => {
            if (response) {
              addLineItem(id, response.body.id, response.body.version);
              setIsInCart(true);
              setLineItemsId(lineItemsId?.concat(id));
            }
          });
        } else {
          createCart().then((response) => {
            if (response) {
              addLineItem(id, response.body.id, response.body.version);
              setIsInCart(true);
            }
          });
        }
      }
    });
  };
  return (
    <Card sx={{ width: [300, 300, 364], maxHeight: [480, 480, 560], borderRadius: 3 }}>
      <CardActionArea>
        <Link to={`${PRODUCT_ROUTE}/${product.id}`}>
          <div className="card-image_block">
            <img
              className="card-image"
              src={masterVariant.images ? masterVariant.images[0].url : ''}
              alt={name[region]}
            />
          </div>
          <CardContent>
            <h2 className="card-title">{name[region]}</h2>
            <p className="card-description">{description ? description[region] : ''}</p>
          </CardContent>
        </Link>
      </CardActionArea>
      <div className="card-price_block">
        <span className="card-dollar">$</span>
        {discount && <div className="card_discount-price">{(discount / 100).toFixed(2)}</div>}
        <div className={!discount ? 'card_current-price' : 'card_old-price'}>
          {masterVariant.prices ? masterVariant.prices[0].value.centAmount / 100 : ''}
        </div>

        <button
          className={isInCart ? 'card-button-in-cart' : 'card-button'}
          onClick={(): void => {
            isInCart ? navigate(CART_ROUTE) : btnHandleClick();
          }}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;
