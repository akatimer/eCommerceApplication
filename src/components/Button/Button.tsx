import './Button.css';
import React from 'react';

interface ButtonProps {
  label: string;
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  dataValue?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type,
  disabled,
  dataValue,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-value={dataValue}
    >
      {label}
    </button>
  );
};

export default Button;
