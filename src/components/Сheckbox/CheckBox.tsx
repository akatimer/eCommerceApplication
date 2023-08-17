import './CheckBox.css';
import React, { useState } from 'react';

interface CheckboxProps {
  onChange: (checked: boolean) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, label }) => {
  const [checked, setChecked] = useState(false);

  const toggle = (): void => {
    setChecked((prev) => !prev);
    onChange(!checked);
  };

  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={toggle} />
      {label}
    </label>
  );
};

export default Checkbox;
