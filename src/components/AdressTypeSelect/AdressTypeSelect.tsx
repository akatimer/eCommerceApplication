import React, { ChangeEvent } from 'react';

interface AdressTypeSelectProps {
  onChange: (type: string) => void;
  value?: string;
  readOnlyValue?: boolean;
}

const AdressTypeSelect: React.FC<AdressTypeSelectProps> = ({ onChange, value, readOnlyValue }) => {
  const handleAdressTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const type = event.target.value;
    onChange(type);
  };

  return (
    <select
      disabled={readOnlyValue}
      className="select"
      value={value}
      onChange={handleAdressTypeChange}
    >
      <option value="Shipping">Shipping</option>
      <option value="Billing">Billing</option>
      <option value="Both">Both</option>
    </select>
  );
};

export default AdressTypeSelect;
