import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
}

const NameInput: React.FC<InputProps> = ({ onChange }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your name"
      validator={isNameValid}
      placeholder="Your name"
      type="text"
      onChange={onChange}
    />
  );
};

export default NameInput;
