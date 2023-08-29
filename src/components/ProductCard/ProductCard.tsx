import { ProductProjection } from '@commercetools/platform-sdk';
import { Card, CardActionArea, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { PRODUCT_ROUTE } from '../../utils/constants';

type Props = {
  product: ProductProjection;
};

const region = 'en-US';

const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, description, masterVariant } = product;
  const [discount, setDiscount] = useState<number>();
  useEffect(() => {
    if (masterVariant.prices) {
      setDiscount(masterVariant.prices[0].discounted?.value.centAmount);
    }
  }, [masterVariant.prices]);
  return (
    <Card sx={{ width: [300, 300, 364], maxHeight: [480, 480, 560], borderRadius: 3 }}>
      <CardActionArea>
        <Link to={`${PRODUCT_ROUTE}/${product.key}`}>
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
        <button className="card-button">Shop Now</button>
      </div>
    </Card>
  );
};

export default ProductCard;
