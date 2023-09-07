import { Category, FacetResults, ProductProjection } from '@commercetools/platform-sdk';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCategories, getProducts } from '../../utils/api/clientApi';
import ProductCard from '../ProductCard/ProductCard';
import SortDropdown from '../SortDropdown/SortDropdown';
import './Catalog.css';
import Search from '../Search/Search';
import FilterAccordion from '../FilterAccordion/FilterAccordion';
import { ColorResult } from 'react-color';
import convertColor from '../../utils/convertColor';
import { SHOP_ROUTE } from '../../utils/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { createCart } from '../../utils/api/clientBuilder';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [sorting, setSorting] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [color, setColor] = useState('');
  const [price, setPrice] = useState<number[]>([20, 110]);
  const [checkedBrand, setCheckedBrand] = useState<string[]>([]);
  const [checkedSize, setCheckedSize] = useState<string[]>([]);
  const [checkedCategory, setCheckedCategory] = useState<string>('');
  const [checkedSubcategory, setSubCheckedCategory] = useState<string>('');
  const [facets, setFacets] = useState<FacetResults>();

  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => !['shop', ''].includes(path));
  window.onload = (): void => navigate(SHOP_ROUTE);

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
  const categoryHandleChange = (value: string) => () => {
    setCheckedCategory(value);
    setSubCheckedCategory('');
  };
  const subcategoryHandleChange = (value: string) => () => {
    setSubCheckedCategory(value);
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
    createCart();
    checkedCategory &&
      getCategories(checkedCategory).then((response) => {
        if (response?.body.results) {
          setSubcategories(response.body.results);
        }
      });
    getProducts({
      queryArgs: {
        sort: sorting ? sorting : 'price asc',
        'text.en-US': searchValue.length > 3 ? searchValue : '',
        fuzzy: true,
        facet: [
          'variants.attributes.size.key',
          'variants.attributes.brand.key',
          'variants.attributes.color.key',
          `categories.id`,
        ],
        'filter.query': [
          color && `variants.attributes.color.key:"${convertColor(color)}"`,
          price && `variants.price.centAmount:range (${price[0] * 100} to ${price[1] * 100})`,
          checkedSubcategory && `categories.id: "${checkedSubcategory}"`,
          checkedCategory && !checkedSubcategory && `categories.id: subtree("${checkedCategory}")`,
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
          setFacets(response.body.facets);
        } else {
          setProducts([]);
          setNotFound(true);
        }
      })
      .catch(console.error);
  }, [
    sorting,
    searchValue,
    color,
    price,
    checkedBrand,
    checkedSize,
    checkedCategory,
    checkedSubcategory,
  ]);

  if (!products) {
    return (
      <div className="loading">
        <CircularProgress color="inherit" />
        Loading...
      </div>
    );
  }
  return (
    <div className="catalog">
      <div className="control-block">
        <Breadcrumbs
          // separator={<ArrowRightIcon fontSize="inherit" />}
          aria-label="breadcrumb"
          sx={{
            alignSelf: 'center',
            marginRight: '2em',
            fontFamily: 'Mulish',
          }}
        >
          <Link
            className="breadcrumb-link"
            to={SHOP_ROUTE}
            onClick={(): void => {
              setCheckedCategory('');
              setSubCheckedCategory('');
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Shop
          </Link>
          {pathnames.map((path, index) => {
            const isPathLast = index === pathnames.length - 1;
            return isPathLast ? (
              <Typography
                style={{ textDecoration: 'underline' }}
                key={index}
                sx={{ fontFamily: 'Mulish' }}
              >
                {path}
              </Typography>
            ) : (
              <Link
                className="breadcrumb-link"
                key={index}
                to={path}
                onClick={(): void => setSubCheckedCategory('')}
              >
                {path}
              </Link>
            );
          })}
        </Breadcrumbs>
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
            checkedCategory={checkedCategory}
            checkedSubcategory={checkedSubcategory}
            colorHandleChange={colorHandleChange}
            priceHandleChange={priceHandleChange}
            brandHandleChange={brandHandleChange}
            sizeHandleChange={sizeHandleChange}
            categoryHandleChange={categoryHandleChange}
            subcategoryHandleChange={subcategoryHandleChange}
            products={products}
            facets={facets}
            subcategories={subcategories}
          />
          <Button
            sx={{ fontFamily: 'Mulish', alignSelf: 'center', color: '#0faeae', marginTop: 2 }}
            variant="text"
            onClick={(): void => {
              setCheckedBrand([]);
              setCheckedSize([]);
              setColor('');
              setPrice([20, 110]);
              setCheckedCategory('');
              setSubCheckedCategory('');
              navigate(SHOP_ROUTE);
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
