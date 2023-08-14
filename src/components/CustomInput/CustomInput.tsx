import React, { useState, ChangeEvent } from 'react';
import LogInInput from '../LogInInput/LogInInput';
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
  }

  return (
    <>
      <div className="validation-message" style={{ color: messageColor }}>
        {message}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type={type}
          placeholder={placeholder}
          onChange={inputHandler}
        />
        {placeholder === 'Enter your password' && <PasswordToggle onClick={onToggle} />}
      </div>
    </>
  );
};

export default CustomInput;
