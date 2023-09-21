import React, { useState } from 'react';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  readOnlyValue?: boolean;
}

const PasswordInput: React.FC<InputProps> = ({ onChange, readOnlyValue, placeholder }) => {
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordType = (): void => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <>
      <CustomInput
        validColor="#00A000"
        invalidColor="#FF0000"
        validMessage="Thank you"
        invalidMessage="Please minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
        validator={isPasswordValid}
        placeholder={placeholder ? placeholder : 'Enter your password'}
        type={passwordType}
        onToggle={togglePasswordType}
        onChange={onChange}
        readOnlyValue={readOnlyValue}
      />
    </>
  );
};

export default PasswordInput;
