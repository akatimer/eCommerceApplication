import './CountrySelect.css';
import React, { useState, ChangeEvent } from 'react';

const CountrySelect: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  return (
    <select className="select" value={selectedCountry} onChange={handleCountryChange}>
      <option value="">Your Country</option>
      <option value="USA">USA</option>
      <option value="CA">CANADA</option>
    </select>
  );
};

export default CountrySelect;
