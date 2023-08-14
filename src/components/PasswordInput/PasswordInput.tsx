import React, { useState } from 'react';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import CustomInput from '../CustomInput/CustomInput';

const PasswordInput: React.FC = () => {
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
        placeholder="Enter your password"
        type={passwordType}
        onToggle={togglePasswordType}
      />
    </>
  );
};

export default PasswordInput;
