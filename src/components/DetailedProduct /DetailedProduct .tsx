import './DetailedProduct.css';
import React, { useState, useEffect } from 'react';
import { getApiRoot } from '../../utils/api/clientBuilder';
import { projectKey } from '../../utils/api/clientBuilder';
import { ProductProjection } from '@commercetools/platform-sdk';

const DetailedProduct: React.FC = () => {
  const [productData, setProductData] = useState<ProductProjection | null>(null);

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        const productResponse = await getApiRoot()
          .withProjectKey({ projectKey })
          .productProjections()
          .withKey({ key: 'hoodie_kropka' })
          .get()
          .execute();

        setProductData(productResponse.body);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, []);

  if (!productData) {
    return <div className="loading">Loading...</div>;
  }

  const image = productData.masterVariant.images && productData.masterVariant.images[0]?.url;
  const productName = productData.name && productData.name['en-US'];
  const description = productData.description && productData.description['en-US'];
  const price =
    productData.masterVariant.prices && productData.masterVariant.prices[0]?.value.centAmount / 100;

  return (
    <div className="prod-container">
      <div className="prod-pic">
        <img src={image} alt={productName} />
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
