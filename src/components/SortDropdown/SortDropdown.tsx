import React from 'react';
import './SortDropdown.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  handleChange: (event: SelectChangeEvent) => void;
  sorting: string;
};

const sortMethods = {
  LOWEST_FIRST: 'price asc',
  HIGHEST_FIRST: 'price desc',
  NAME_A_Z: 'name.en-US asc',
  NAME_Z_A: 'name.en-US desc',
};

const SortDropdown: React.FC<Props> = (props) => {
  return (
    <div className="select-wrapper">
      <h2 className="select-title">Show</h2>
      <Select
        className="sort-select"
        value={props.sorting ? props.sorting : sortMethods.LOWEST_FIRST}
        onChange={props.handleChange}
        displayEmpty
      >
        <MenuItem className="select-item" value={sortMethods.LOWEST_FIRST}>
          Lowest first
        </MenuItem>
        <MenuItem className="select-item" value={sortMethods.HIGHEST_FIRST}>
          Highest first
        </MenuItem>
        <MenuItem className="select-item" value={sortMethods.NAME_A_Z}>
          Name: a-z
        </MenuItem>
        <MenuItem className="select-item" value={sortMethods.NAME_Z_A}>
          Name: z-a
        </MenuItem>
      </Select>
    </div>
  );
};

export default SortDropdown;
