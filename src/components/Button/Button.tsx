import './Button.css';
import React from 'react';

interface ButtonProps {
  label: string;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, type, disabled }) => {
  return (
    <button className={className} onClick={onClick} type={type} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
