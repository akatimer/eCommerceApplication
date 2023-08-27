import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  readOnlyValue?: boolean;
  value?: string;
}

const NameInput: React.FC<InputProps> = ({ onChange, readOnlyValue, value }) => {
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
      readOnlyValue={readOnlyValue}
      value={value}
    />
  );
};

export default NameInput;
