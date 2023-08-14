import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

const NameInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your name"
      validator={isNameValid}
      placeholder="Your name"
      type="text"
    />
  );
};

export default NameInput;
