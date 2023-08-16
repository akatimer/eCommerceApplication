import './CountrySelect.css';
import React, { useState, ChangeEvent } from 'react';

interface CountrySelectProps {
  onChange: (country: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const country = event.target.value;
    setSelectedCountry(country);
    onChange(country);
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
