import './CountrySelect.css';
import React, { ChangeEvent } from 'react';

interface CountrySelectProps {
  onChange: (country: string) => void;
  value?: string;
  readOnlyValue?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value, readOnlyValue }) => {
  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const country = event.target.value;
    onChange(country);
  };

  return (
    <select
      disabled={readOnlyValue}
      className="select"
      value={value}
      onChange={handleCountryChange}
    >
      <option value="US">USA</option>
      <option value="CA">CANADA</option>
    </select>
  );
};

export default CountrySelect;
