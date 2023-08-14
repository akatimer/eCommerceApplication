import React, { useState, ChangeEvent } from 'react';
import isStreetValid from '../../utils/validationFunctions/isStreetValid';
import LogInInput from '../LogInInput/LogInInput';

const StreetInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const streetMessages = {
    valid: 'Thank you',
    invalid: 'Street is not valid',
  };

  const [streetMessage, setStreetMessage] = useState('');
  const [streetMessageColor, setStreetMessageColor] = useState('');

  function streetHandler(event: ChangeEvent<HTMLInputElement>): void {
    const date = event.target.value;
    if (isStreetValid(date)) {
      setStreetMessage(streetMessages.valid);
      setStreetMessageColor(colors.validColor);
    } else {
      setStreetMessage(streetMessages.invalid);
      setStreetMessageColor(colors.invalidColor);
    }
  }

  return (
    <>
      <div className="validation-message" style={{ color: streetMessageColor }}>
        {streetMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type="text"
          placeholder="Enter your street"
          onChange={streetHandler}
        />
      </div>
    </>
  );
};

export default StreetInput;
