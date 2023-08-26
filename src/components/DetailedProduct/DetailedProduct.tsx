import './DetailedProduct.css';
import React, { useState, useEffect, useRef } from 'react';
import { getApiRoot } from '../../utils/api/clientBuilder';
import { projectKey } from '../../utils/api/clientBuilder';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Link, useParams } from 'react-router-dom';
import crossPic from '../../assets/icons/cancel_icn.svg';
import { SHOP_ROUTE } from '../../utils/constants';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const DetailedProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductProjection | null>(null);
  const carousel = useRef<AliceCarousel>(null);

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        const productResponse = await getApiRoot()
          .withProjectKey({ projectKey })
          .productProjections()
          .withKey({ key: `${id}` })
          .get()
          .execute();

        setProductData(productResponse.body);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!productData) {
    return <div className="loading">Loading...</div>;
  }
  const productName = productData.name && productData.name['en-US'];
  const description = productData.description && productData.description['en-US'];
  const price =
    productData.masterVariant.prices && productData.masterVariant.prices[0]?.value.centAmount / 100;

  const items = productData.masterVariant.images?.map((image, ordinalNumber) => (
    <img key={ordinalNumber} className="prod-photo" src={image.url} alt={productName} />
  ));

  return (
    <div className="prod-container">
      <div className="close-page">
        <Link to={SHOP_ROUTE}>
          <img className="cross-pic" src={crossPic} alt="Close page" />
        </Link>
      </div>
      <div className="prod-pic">
        <button className="btn-prev" onClick={(): void => carousel?.current?.slidePrev()}></button>
        <button className="btn-next" onClick={(): void => carousel?.current?.slideNext()}></button>
        <AliceCarousel
          key="carousel"
          mouseTracking
          disableDotsControls
          disableButtonsControls
          items={items}
          ref={carousel}
        />
      </div>
      <div className="prod-desc-container">
        <h2 className="prod-title">{productName}</h2>
        <div className="desc-wrapper">
          <h4 className="prod-desc-title">Info</h4>
          <p className="prod-desc">{description}</p>
        </div>
        <div className="price">
          $ <span className="cost">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
