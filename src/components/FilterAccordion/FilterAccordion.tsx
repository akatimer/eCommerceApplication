import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CirclePicker, ColorResult } from 'react-color';
import React from 'react';
import './FilterAccordion.css';

type Props = {
  colorHandleChange: (color: ColorResult) => void;
  color: string;
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
          <Typography sx={{ fontFamily: 'Mulish' }}>Text goes here ...</Typography>
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
        <AccordionDetails>
          <Typography sx={{ fontFamily: 'Mulish' }}>Text goes here ...</Typography>
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
          <Typography sx={{ fontFamily: 'Mulish' }}>Text goes here ...</Typography>
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
          <CirclePicker
            colors={['#8bc34a', '#ff9800', '#ff7f50 ', '#f5f196', '#795548', '#000000']}
            onChange={props.colorHandleChange}
          />
          <Typography sx={{ fontFamily: 'Mulish' }}></Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
