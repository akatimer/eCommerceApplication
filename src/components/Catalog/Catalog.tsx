import { ProductProjection } from '@commercetools/platform-sdk';
import { Button, Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../utils/api/clientApi';
import ProductCard from '../ProductCard/ProductCard';
import SortDropdown from '../SortDropdown/SortDropdown';
import './Catalog.css';
import Search from '../Search/Search';
import FilterAccordion from '../FilterAccordion/FilterAccordion';
import { ColorResult } from 'react-color';
import convertColor from '../../utils/convertColor';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [sorting, setSorting] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [color, setColor] = useState('');
  const [price, setPrice] = useState<number[]>([20, 110]);
  const [checkedBrand, setCheckedBrand] = useState<string[]>([]);
  const [checkedSize, setCheckedSize] = useState<string[]>([]);

  const brandHandleChange = (value: string) => () => {
    const index = checkedBrand.indexOf(value);
    const newCheckedValue = [...checkedBrand];
    if (index === -1) {
      newCheckedValue.push(value);
    } else {
      newCheckedValue.splice(index, 1);
    }
    setCheckedBrand(newCheckedValue);
  };
  const sizeHandleChange = (value: string) => () => {
    const index = checkedSize.indexOf(value);
    const newCheckedValue = [...checkedSize];
    if (index === -1) {
      newCheckedValue.push(value);
    } else {
      newCheckedValue.splice(index, 1);
    }
    setCheckedSize(newCheckedValue);
  };

  const handleChange = (event: SelectChangeEvent): void => {
    setSorting(event.target.value);
  };
  const searchHandler = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setSearchValue(target.value);
    target.value.length < 4 && target.value.length > 0 ? setShowModal(true) : setShowModal(false);
  };
  const colorHandleChange = (color: ColorResult): void => {
    setColor(color.hex);
  };
  const MIN_PRICE = 20;

  const priceHandleChange = (event: Event, newValue: number | number[], active: number): void => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < MIN_PRICE) {
      if (active === 0) {
        const grip = Math.min(newValue[0], 100 - MIN_PRICE);
        setPrice([grip, grip + MIN_PRICE]);
      } else {
        const grip = Math.max(newValue[1], MIN_PRICE);
        setPrice([grip - MIN_PRICE, grip]);
      }
    } else {
      setPrice(newValue as number[]);
    }
  };

  useEffect(() => {
    getProducts({
      queryArgs: {
        sort: sorting ? sorting : 'price asc',
        'text.en-US': searchValue.length > 3 ? searchValue : '',
        fuzzy: true,
        filter: [
          color && `variants.attributes.color.key:"${convertColor(color)}"`,
          price && `variants.price.centAmount:range (${price[0] * 100} to ${price[1] * 100})`,
          checkedBrand.length &&
            `variants.attributes.brand.key: ${checkedBrand.map((el) => `"${el}"`)}`,
          checkedSize.length &&
            `variants.attributes.size.key: ${checkedSize.map((el) => `"${el}"`)}`,
        ],
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
  }, [sorting, searchValue, color, price, checkedBrand, checkedSize]);

  if (!products) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="catalog">
      <div className="control-block">
        <Search searchHandler={searchHandler} showModal={showModal} />
        <SortDropdown handleChange={handleChange} sorting={sorting} />
      </div>
      <div className="catalog-wrapper">
        <div className="side-panel">
          <FilterAccordion
            color={color}
            price={price}
            checkedBrand={checkedBrand}
            checkedSize={checkedSize}
            colorHandleChange={colorHandleChange}
            priceHandleChange={priceHandleChange}
            brandHandleChange={brandHandleChange}
            sizeHandleChange={sizeHandleChange}
          />
          <Button
            sx={{ fontFamily: 'Mulish', alignSelf: 'center', color: '#0faeae', marginTop: 2 }}
            variant="text"
            onClick={(): void => {
              setCheckedBrand([]);
              setCheckedSize([]);
              setColor('');
              setPrice([20, 110]);
            }}
          >
            reset filters
          </Button>
        </div>
        <Grid container spacing={{ xs: 2, md: 3 }} className="grid-container">
          {notFound && (
            <div className="not-found">
              Sorry, we couldn&apos;t find any matching result for your query.
            </div>
          )}
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
