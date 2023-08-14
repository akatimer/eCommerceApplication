import React, { useState, ChangeEvent } from 'react';
import isPostalCodeValid from '../../utils/validationFunctions/isPostalCodeValid';
import LogInInput from '../LogInInput/LogInInput';

const PostalCodeInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const postalCodeMessages = {
    valid: 'Thank you',
    invalid: 'Please enter your postal code in the correct format',
  };

  const [postalCodeMessage, setPostalCodeMessage] = useState('');
  const [postalCodeMessageColor, setPostalCodeMessageColor] = useState('');

  function postalCodeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const code = event.target.value;
    if (isPostalCodeValid(code)) {
      setPostalCodeMessage(postalCodeMessages.valid);
      setPostalCodeMessageColor(colors.validColor);
    } else {
      setPostalCodeMessage(postalCodeMessages.invalid);
      setPostalCodeMessageColor(colors.invalidColor);
    }
  }

  return (
    <>
      <div className="validation-message" style={{ color: postalCodeMessageColor }}>
        {postalCodeMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type="text"
          placeholder="Enter your postal code"
          onChange={postalCodeHandler}
        />
      </div>
    </>
  );
};

export default PostalCodeInput;
