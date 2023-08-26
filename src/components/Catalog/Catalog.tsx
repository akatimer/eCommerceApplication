import { ProductProjection } from '@commercetools/platform-sdk';
import { Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../utils/api/clientApi';
import ProductCard from '../ProductCard/ProductCard';
import SortDropdown from '../SortDropdown/SortDropdown';
import './Catalog.css';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [sorting, setSorting] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setSorting(event.target.value);
  };
  useEffect(() => {
    getProducts(sorting ? sorting : 'price asc')
      .then((response) => {
        if (response) {
          setProducts(response.body.results);
        }
      })
      .catch(console.error);
  }, [sorting]);

  if (!products) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      <div className="control-block">
        <SortDropdown handleChange={handleChange} sorting={sorting} />
      </div>
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
