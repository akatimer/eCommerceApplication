import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

const LastNameInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your last name"
      validator={isNameValid}
      placeholder="Your last name"
      type="text"
    />
  );
};

export default LastNameInput;
