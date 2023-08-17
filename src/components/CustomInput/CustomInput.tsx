import './CustomInput.css';
import React, { useState, ChangeEvent } from 'react';
import PasswordToggle from '../PasswordToggle/PasswordToggle';

interface InputProps {
  validColor: string;
  invalidColor: string;
  validMessage: string;
  invalidMessage: string;
  validator: (value: string) => boolean | null;
  placeholder: string;
  type: string;
  onToggle?: () => void;
  className?: string;
  onChange: (value: string) => void;
  value?: string;
}

const CustomInput: React.FC<InputProps> = ({
  validColor,
  invalidColor,
  validMessage,
  invalidMessage,
  validator,
  placeholder,
  type,
  onToggle,
  onChange,
  value,
}) => {
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  function inputHandler(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    if (validator(value)) {
      setMessage(validMessage);
      setMessageColor(validColor);
    } else {
      setMessage(invalidMessage);
      setMessageColor(invalidColor);
    }

    onChange(value);
  }

  return (
    <>
      <div className="validation-message" style={{ color: messageColor }}>
        {message}
      </div>
      <div className="input-wrapper">
        <input
          className="input-form"
          type={type}
          placeholder={placeholder}
          onChange={inputHandler}
          value={value}
        />
        {placeholder === 'Enter your password' && <PasswordToggle onClick={onToggle} />}
      </div>
    </>
  );
};

export default CustomInput;
