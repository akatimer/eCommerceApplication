import React, { useState, ChangeEvent } from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import LogInInput from '../LogInInput/LogInInput';

const NameInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const nameMessages = {
    valid: 'Thank you',
    invalid: 'Please enter your name',
  };

  const [nameMessage, setNameMessage] = useState('');
  const [nameMessageColor, setNameMessageColor] = useState('');

  function nameHandler(event: ChangeEvent<HTMLInputElement>): void {
    const name = event.target.value;
    if (isNameValid(name)) {
      setNameMessage(nameMessages.valid);
      setNameMessageColor(colors.validColor);
    } else {
      setNameMessage(nameMessages.invalid);
      setNameMessageColor(colors.invalidColor);
    }
  }

  return (
    <>
      <div className="validation-message" style={{ color: nameMessageColor }}>
        {nameMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type="text"
          placeholder="Your name"
          onChange={nameHandler}
        />
      </div>
    </>
  );
};

export default NameInput;
