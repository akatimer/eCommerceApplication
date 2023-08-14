import React, { useState, ChangeEvent } from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import LogInInput from '../LogInInput/LogInInput';

const SityInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const sityMessages = {
    valid: 'Thank you',
    invalid: 'Please enter your sity',
  };

  const [sityMessage, setSityMessage] = useState('');
  const [sityMessageColor, setSityMessageColor] = useState('');

  function sityHandler(event: ChangeEvent<HTMLInputElement>): void {
    const name = event.target.value;
    if (isNameValid(name)) {
      setSityMessage(sityMessages.valid);
      setSityMessageColor(colors.validColor);
    } else {
      setSityMessage(sityMessages.invalid);
      setSityMessageColor(colors.invalidColor);
    }
  }

  return (
    <>
      <div className="validation-message" style={{ color: sityMessageColor }}>
        {sityMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type="text"
          placeholder="Enter your sity"
          onChange={sityHandler}
        />
      </div>
    </>
  );
};

export default SityInput;
