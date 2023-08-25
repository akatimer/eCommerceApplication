import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  readOnlyValue?: boolean;
}

const LastNameInput: React.FC<InputProps> = ({ onChange, readOnlyValue }) => {
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
    />
  );
};

export default LastNameInput;
