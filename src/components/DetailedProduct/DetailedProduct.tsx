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
  const [discount, setDiscount] = useState<number>();
  const carousel = useRef<AliceCarousel>(null);
  const modalCarousel = useRef<AliceCarousel>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProductAndDiscount = async (): Promise<void> => {
      try {
        const productResponse = await getApiRoot()
          .withProjectKey({ projectKey })
          .productProjections()
          .withKey({ key: `${id}` })
          .get()
          .execute();

        setProductData(productResponse.body);

        if (productResponse.body && productResponse.body.masterVariant.prices) {
          const calculatedDiscount =
            productResponse.body.masterVariant.prices[0].discounted?.value.centAmount;
          setDiscount(calculatedDiscount);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductAndDiscount();
  }, [id]);

  if (!productData) {
    return <div className="loading">Loading...</div>;
  }
  const isModalVisible = (): void => {
    setModalVisible(!modalVisible);
  };
  const productName = productData.name && productData.name['en-US'];
  const description = productData.description && productData.description['en-US'];
  const price =
    productData.masterVariant.prices && productData.masterVariant.prices[0]?.value.centAmount / 100;

  const items = productData.masterVariant.images?.map((image, ordinalNumber) => (
    <img key={ordinalNumber} className="prod-photo" src={image.url} alt={productName} />
  ));
  return (
    <div className="prod-wrapper">
      <div className="prod-container">
        <div className="close-page">
          <Link to={SHOP_ROUTE}>
            <img className="cross-pic" src={crossPic} alt="Close page" />
          </Link>
        </div>
        <div className="prod-pic">
          <button
            className="btn-prev"
            onClick={(): void => {
              carousel?.current?.slidePrev();
            }}
          ></button>
          <button
            className="btn-next"
            onClick={(): void => {
              carousel?.current?.slideNext();
            }}
          ></button>
          <div onClick={isModalVisible}>
            <AliceCarousel
              key="carousel"
              mouseTracking
              disableDotsControls
              disableButtonsControls
              items={items}
              ref={carousel}
            />
          </div>
        </div>
        <div className="prod-desc-container">
          <h2 className="prod-title">{productName}</h2>
          <div className="desc-wrapper">
            <h4 className="prod-desc-title">Info</h4>
            <p className="prod-desc">{description}</p>
          </div>
          <div className="card-price_block">
            <span className="card-dollar">$</span>
            {discount ? (
              <div className="card_discount-price">{(discount / 100).toFixed(2)}</div>
            ) : (
              ''
            )}
            {price !== undefined && (
              <div className={!discount ? 'card_current-price' : 'card_old-price'}>{price}</div>
            )}
          </div>
        </div>
      </div>
      <div className={`full-screen ${modalVisible ? 'visible' : ''}`}>
        <div className="modal-content">
          <div className="close-page" onClick={isModalVisible}>
            <img className="cross-pic" src={crossPic} alt="Close page" />
          </div>
          <div className="prod-pic-modal">
            <button
              className="btn-prev btn-prev-modal"
              onClick={(): void => modalCarousel?.current?.slidePrev()}
            ></button>
            <button
              className="btn-next btn-next-modal"
              onClick={(): void => modalCarousel?.current?.slideNext()}
            ></button>
            <AliceCarousel
              key="carousel-modal"
              mouseTracking
              disableDotsControls
              disableButtonsControls
              items={items}
              ref={modalCarousel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProduct;
