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
import { BRANDS, COLORS, SIZES } from '../../utils/constants';

type Props = {
  colorHandleChange: (color: ColorResult) => void;
  priceHandleChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
  brandHandleChange: (value: string) => () => void;
  sizeHandleChange: (value: string) => () => void;
  color: string;
  price: number[] | number;
  checkedBrand: string[];
  checkedSize: string[];
};

const FilterAccordion: React.FC<Props> = (props) => {
  return (
    <div className="accordion-wrapper">
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
            {SIZES.map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton onClick={props.sizeHandleChange(value)} dense>
                    <Checkbox
                      edge="start"
                      checked={props.checkedSize.indexOf(value) !== -1}
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
                        {value}
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
