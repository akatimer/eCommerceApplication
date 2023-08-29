import { ProductProjection } from '@commercetools/platform-sdk';
import { Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../utils/api/clientApi';
import ProductCard from '../ProductCard/ProductCard';
import SortDropdown from '../SortDropdown/SortDropdown';
import './Catalog.css';
import Search from '../Search/Search';
import FilterAccordion from '../FilterAccordion/FilterAccordion';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [sorting, setSorting] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleChange = (event: SelectChangeEvent): void => {
    setSorting(event.target.value);
  };
  const searchHandler = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setSearchValue(target.value);
    target.value.length < 4 && target.value.length > 0 ? setShowModal(true) : setShowModal(false);
  };

  useEffect(() => {
    getProducts({
      queryArgs: {
        sort: sorting ? sorting : 'price asc',
        'text.en-US': searchValue.length > 3 ? searchValue : '',
        fuzzy: true,
      },
    })
      .then((response) => {
        if (response?.body.count) {
          setProducts(response.body.results);
          setNotFound(false);
        } else {
          setProducts([]);
          setNotFound(true);
        }
      })
      .catch(console.error);
  }, [sorting, searchValue]);

  if (!products) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="catalog">
      <div className="control-block">
        <Search searchHandler={searchHandler} showModal={showModal} />
        <SortDropdown handleChange={handleChange} sorting={sorting} />
      </div>
      {notFound && (
        <div className="not-found">
          Sorry, we couldn&apos;t find any matching result for your query.
        </div>
      )}
      <></>
      <div className="catalog-wrapper">
        <div className="side-panel">{<FilterAccordion />}</div>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: 'center' }}>
          {products &&
            products.map((product) => (
              <Grid item key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Catalog;
