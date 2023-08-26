import React, { useState } from 'react';
import './SortDropdown.css';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const SortDropdown: React.FC = () => {
  const [sorting, setSorting] = useState('');
  const handleChange = (event: SelectChangeEvent): void => {
    setSorting(event.target.value);
    console.log(sorting);
  };
  return (
    <div className="select-wrapper">
      <h2 className="select-title">Show</h2>
      <Select className="sort-select" value={sorting} onChange={handleChange} displayEmpty>
        <MenuItem className="select-item" value={'lowest'}>
          Price: lowest first
        </MenuItem>
        <MenuItem className="select-item" value={'highest'}>
          Price: highest first
        </MenuItem>
        <MenuItem className="select-item" value={'name'}>
          By name
        </MenuItem>
      </Select>
    </div>
  );
};

export default SortDropdown;
