import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  readOnlyValue?: boolean;
  value?: string;
}

const LastNameInput: React.FC<InputProps> = ({ onChange, readOnlyValue, value }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your last name"
      validator={isNameValid}
      placeholder="Your last name"
      type="text"
      onChange={onChange}
      readOnlyValue={readOnlyValue}
      value={value}
    />
  );
};

export default LastNameInput;
