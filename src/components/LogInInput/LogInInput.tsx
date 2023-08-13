import './LogInInput.css';
import React, { ChangeEvent } from 'react';

interface InputComponentProps {
  placeholder?: string;
  type: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  className,
  type,
  placeholder,
  onChange,
}) => {
  return <input className={className} type={type} placeholder={placeholder} onChange={onChange} />;
};

export default InputComponent;
