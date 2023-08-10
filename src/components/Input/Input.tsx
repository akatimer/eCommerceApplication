import './Input.css';
import React, { useState, ChangeEvent } from 'react';

interface InputComponentProps {
  placeholder: string;
  value: string;
  type: string;
  className: string;
  onChange: (value: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  className,
  type,
  placeholder,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default InputComponent;
