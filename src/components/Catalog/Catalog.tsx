import { ProductProjection } from '@commercetools/platform-sdk';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../utils/api/clientApi';
import ProductCard from '../ProductCard/ProductCard';
import SortDropdown from '../SortDropdown/SortDropdown';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>();
  useEffect(() => {
    getProducts()
      .then((response) => {
        if (response) {
          setProducts(response.body.results);
        }
      })
      .catch(console.error);
  }, []);

  if (!products) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      <SortDropdown />
      <Grid container alignItems={'center'} spacing={6} sx={{ margin: 'auto' }}>
        {products &&
          products.map((product) => (
            <Grid item key={product.id}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Catalog;
