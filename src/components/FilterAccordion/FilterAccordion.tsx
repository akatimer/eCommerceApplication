import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CirclePicker, ColorResult } from 'react-color';
import React from 'react';
import './FilterAccordion.css';
import pink from '@mui/material/colors/pink';
import { BRANDS, COLORS, SHOP_ROUTE } from '../../utils/constants';
import {
  Category,
  FacetResults,
  ProductProjection,
  TermFacetResult,
} from '@commercetools/platform-sdk';
import convertCategory from '../../utils/convertCategory';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  colorHandleChange: (color: ColorResult) => void;
  priceHandleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
  brandHandleChange: (value: string) => () => void;
  sizeHandleChange: (value: string) => () => void;
  categoryHandleChange: (value: string) => () => void;
  subcategoryHandleChange: (value: string) => () => void;
  checkedCategory: string;
  checkedSubcategory: string;
  color: string;
  price: number[] | number;
  checkedBrand: string[];
  checkedSize: string[];
  products: ProductProjection[];
  facets: FacetResults | undefined;
  subcategories: Category[];
};
const sizesString = 'variants.attributes.size.key';

const FilterAccordion: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { facets, subcategories } = props;
  const sizes = facets ? (facets[sizesString] as TermFacetResult) : null;
  return (
    <div className="accordion-wrapper">
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontFamily: 'Mulish', fontWeight: 700 }}>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            maxHeight: 266,
            overflow: 'auto',
          }}
        >
          <List>
            {[
              '33bf067c-4760-4e2a-8921-9c4242f4f3a1',
              'db9d0198-4eda-4024-8d3a-d5876a8cba01',
              'a40115c6-8fb2-43ba-acb1-316c39463539',
            ].map((category) => {
              const labelId = `checkbox-list-label-${category}`;
              return (
                <ListItem
                  key={category}
                  disablePadding
                  onClick={(): void =>
                    navigate(`${SHOP_ROUTE}/${convertCategory(category)?.toLowerCase()}`)
                  }
                >
                  <ListItemButton onClick={props.categoryHandleChange(category)} dense>
                    <Checkbox
                      edge="start"
                      checked={props.checkedCategory.indexOf(category) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{
                        color: pink[50],
                        '&.Mui-checked': {
                          color: pink[200],
                        },
                      }}
                    />

                    <ListItemText id={labelId}>
                      <Typography sx={{ fontFamily: 'Mulish', color: '#1B2437' }}>
                        {convertCategory(category)}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
      {subcategories.length !== 0 && (
        <Accordion disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontFamily: 'Mulish', fontWeight: 700 }}>Subcategories</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              maxHeight: 266,
              overflow: 'auto',
            }}
          >
            <List>
              {subcategories.map((subcategory) => {
                const labelId = `checkbox-list-label-${subcategory.id}`;
                return (
                  <ListItem
                    key={subcategory.key}
                    disablePadding
                    onClick={(): void => {
                      if (props.checkedCategory) {
                        navigate(
                          `${location.pathname.split('/').slice(2)[0]}/${subcategory.name[
                            'en-US'
                          ].toLowerCase()}`
                        );
                      } else {
                        props.categoryHandleChange('');
                        props.subcategoryHandleChange('');
                        navigate(SHOP_ROUTE);
                      }
                    }}
                  >
                    <ListItemButton onClick={props.subcategoryHandleChange(subcategory.id)} dense>
                      <Checkbox
                        edge="start"
                        checked={props.checkedSubcategory.indexOf(subcategory.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        sx={{
                          color: pink[50],
                          '&.Mui-checked': {
                            color: pink[200],
                          },
                        }}
                      />

                      <ListItemText id={labelId}>
                        <Typography sx={{ fontFamily: 'Mulish', color: '#1B2437' }}>
                          {subcategory.name['en-US']}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontFamily: 'Mulish', fontWeight: 700 }}>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            getAriaLabel={(): string => 'Minimum distance shift'}
            value={props.price}
            min={20}
            max={110}
            onChange={props.priceHandleChange}
            valueLabelDisplay="auto"
            disableSwap
            sx={{ color: '#EDA3B5' }}
          />
          <Typography sx={{ fontFamily: 'Mulish', textAlign: 'center' }}>
            Choose price range
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontFamily: 'Mulish', fontWeight: 700 }}>Size</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            maxHeight: 266,
            overflow: 'auto',
          }}
        >
          <List>
            {sizes &&
              sizes.terms.map((value) => {
                const labelId = `checkbox-list-label-${value.term}`;
                return (
                  <ListItem key={value.term} disablePadding>
                    <ListItemButton onClick={props.sizeHandleChange(value.term)} dense>
                      <Checkbox
                        edge="start"
                        checked={props.checkedSize.indexOf(value.term) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        sx={{
                          color: pink[50],
                          '&.Mui-checked': {
                            color: pink[200],
                          },
                        }}
                      />

                      <ListItemText id={labelId}>
                        <Typography sx={{ fontFamily: 'Mulish', color: '#1B2437' }}>
                          {value.term}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontFamily: 'Mulish', fontWeight: 700 }}>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {BRANDS.map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton onClick={props.brandHandleChange(value)} dense>
                    <Checkbox
                      edge="start"
                      checked={props.checkedBrand.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      sx={{
                        color: pink[50],
                        '&.Mui-checked': {
                          color: pink[200],
                        },
                      }}
                    />

                    <ListItemText id={labelId}>
                      <Typography sx={{ fontFamily: 'Mulish', color: '#1B2437' }}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Typography sx={{ fontFamily: 'Mulish' }}></Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontFamily: 'Mulish', fontWeight: 700 }}>Color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CirclePicker colors={COLORS} onChange={props.colorHandleChange} />
          <Typography sx={{ fontFamily: 'Mulish' }}></Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
