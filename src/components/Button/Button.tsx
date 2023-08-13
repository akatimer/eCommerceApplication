import './Button.css';
import React from 'react';

interface ButtonProps {
  label: string;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, type }) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
